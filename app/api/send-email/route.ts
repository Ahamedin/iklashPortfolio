import { NextResponse, NextRequest } from "next/server";
import { resolveMx } from "dns/promises";
import nodemailer from "nodemailer";
import { applyCors, corsMiddleware } from "@/lib/cors";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BLOCKED_DOMAINS = new Set([
  "example.com",
  "example.net",
  "example.org",
  "localhost",
  "invalid",
  "test",
]);

async function hasMxRecords(domain: string) {
  try {
    const mxRecords = await resolveMx(domain);
    return mxRecords.length > 0;
  } catch {
    return false;
  }
}

async function handler(req: NextRequest) {
  try {
    const { content, prompt, senderName, senderEmail, subject } =
      await req.json();

    // Verify email if provided.
    if (senderEmail) {
      if (!EMAIL_REGEX.test(senderEmail)) {
        return NextResponse.json(
          { error: "Invalid email address" },
          { status: 400 }
        );
      }

      const domain = senderEmail.split("@").pop()?.toLowerCase() || "";
      if (!domain || BLOCKED_DOMAINS.has(domain) || !(await hasMxRecords(domain))) {
        return NextResponse.json(
          { error: "Invalid email address" },
          { status: 400 }
        );
      }

      if (!process.env.ABSTRACT_API_KEY) {
        return NextResponse.json(
          { error: "Email verification not configured on server" },
          { status: 400 }
        );
      }

      try {
        const response = await fetch(
          `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${encodeURIComponent(
            senderEmail
          )}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          return NextResponse.json(
            { error: "Email verification failed" },
            { status: 400 }
          );
        }

        const data = await response.json();
        const hasValidFormat = Boolean(data?.is_valid_format?.value);
        const isDisposable = Boolean(data?.is_disposable_email?.value);
        const isDeliverable = data?.deliverability === "DELIVERABLE";

        if (!hasValidFormat || isDisposable || !isDeliverable) {
          return NextResponse.json(
            { error: "Invalid email address" },
            { status: 400 }
          );
        }
      } catch (verificationError) {
        console.error("Abstract email verification failed:", verificationError);
        return NextResponse.json(
          { error: "Email verification failed" },
          { status: 400 }
        );
      }
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const emailSubject =
      subject || `AI Generated Email: ${(prompt || "No prompt").substring(0, 50)}...`;

    // Keep the authenticated account as the sender, but preserve the user's address in Reply-To.
    const fromAddress = `"AI Email Generator" <${process.env.EMAIL_USER}>`;

    const mailOptions: any = {
      from: fromAddress,
      to: process.env.EMAIL_USER,
      subject: emailSubject,
      text: content,
      replyTo: senderEmail || undefined,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #333;">Email Received</h2>
          ${senderName ? `<p><strong>From:</strong> ${senderName}</p>` : ""}
          ${senderEmail ? `<p><strong>Email:</strong> ${senderEmail}</p>` : ""}
          <p><strong>Subject:</strong> ${emailSubject}</p>
          ${prompt ? `<p><strong>Prompt:</strong> ${prompt}</p>` : ""}
          <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 5px;">
            ${content.replace(/\n/g, "<br>")}
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    // Return more detailed information about the sent email
    return NextResponse.json(
      {
        message: "Email sent successfully",
        id: info.messageId,
        details: {
          from: fromAddress,
          subject: emailSubject,
          content: content,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to send email", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to send email", details: "Unknown error" },
      { status: 500 }
    );
  }
}

export const POST = (req: NextRequest) => applyCors(req, handler);
export const OPTIONS = (req: NextRequest) =>
  corsMiddleware(req);

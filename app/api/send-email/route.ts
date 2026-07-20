import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { applyCors, corsMiddleware } from "@/lib/cors";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

      // If the Abstract API is configured, use it for stronger validation.
      if (process.env.ABSTRACT_API_KEY) {
        try {
          const response = await fetch(
            `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${encodeURIComponent(
              senderEmail
            )}`,
            { cache: "no-store" }
          );

          if (response.ok) {
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
          }
        } catch (verificationError) {
          console.warn(
            "Abstract email verification failed, proceeding with format validation:",
            verificationError
          );
        }
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

    await transporter.verify();

    const emailSubject =
      subject || `AI Generated Email: ${(prompt || "No prompt").substring(0, 50)}...`;

    // Keep the previous visible sender style while sending through the authenticated account.
    const fromAddress = senderEmail
      ? senderName
        ? `"${senderName}" <${process.env.EMAIL_USER}>`
        : `"${senderEmail}" <${process.env.EMAIL_USER}>`
      : `"AI Email Generator" <${process.env.EMAIL_USER}>`;

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

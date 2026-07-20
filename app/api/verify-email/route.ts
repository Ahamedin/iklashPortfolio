import { NextResponse } from "next/server";
import { resolveMx } from "dns/promises";

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

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Basic format check
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ isValid: false, error: "Invalid email address" }, { status: 200 });
    }

    const domain = email.split("@").pop()?.toLowerCase() || "";
    if (!domain || BLOCKED_DOMAINS.has(domain) || !(await hasMxRecords(domain))) {
      return NextResponse.json({ isValid: false, error: "Invalid email address" }, { status: 200 });
    }

    if (!process.env.ABSTRACT_API_KEY) {
      return NextResponse.json({ isValid: true });
    }

    try {
      const response = await fetch(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${encodeURIComponent(
          email
        )}`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        console.warn(`Abstract API verification returned ${response.status}; falling back to local validation`);
        return NextResponse.json({ isValid: true });
      }

      const data = await response.json();

      const isValid =
        data.is_valid_format?.value &&
        data.deliverability === "DELIVERABLE" &&
        !data.is_disposable_email?.value;

      return NextResponse.json({ isValid, error: isValid ? undefined : "Invalid email address" });
    } catch (error) {
      console.warn("Abstract API verification failed, falling back to local validation:", error);
      return NextResponse.json({ isValid: true });
    }
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      { isValid: false, error: "Invalid email address" },
      { status: 500 }
    );
  }
}

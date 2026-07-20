import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Basic format check
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ isValid: false, error: "Invalid email address" }, { status: 200 });
    }

    // If no ABSTRACT_API_KEY is configured, fall back to basic format validation.
    if (!process.env.ABSTRACT_API_KEY) {
      return NextResponse.json({ isValid: true });
    }

    const response = await fetch(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${encodeURIComponent(
        email
      )}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      // If the external service is unavailable, don't fail closed — accept basic format.
      console.warn("Abstract API unavailable, falling back to regex validation");
      return NextResponse.json({ isValid: true });
    }

    const data = await response.json();

    // Rich validation from Abstract API
    const isValid =
      data.is_valid_format?.value &&
      data.deliverability === "DELIVERABLE" &&
      !data.is_disposable_email?.value;

    return NextResponse.json({ isValid, error: isValid ? undefined : "Invalid email address" });
  } catch (error) {
    console.error("Error verifying email:", error);
    // On unexpected errors, fall back to not blocking the user (assume invalid).
    return NextResponse.json({ isValid: false, error: "Invalid email address" }, { status: 500 });
  }
}

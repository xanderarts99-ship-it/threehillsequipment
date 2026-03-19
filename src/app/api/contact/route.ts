import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/contact.schema";
import { ContactEmail } from "@/emails/ContactEmail";
import * as React from "react";
import { render } from "@react-email/render";

const resend = new Resend(process.env.RESEND_API_KEY);

// The client's email address that receives enquiries
const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL_TO ?? "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Server-side validation using the shared Zod schema
    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid form data.",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    if (!RECIPIENT_EMAIL) {
      console.error("[contact/route] CONTACT_EMAIL_TO is not set.");
      return NextResponse.json(
        {
          success: false,
          error: "Server misconfiguration. Please try again later.",
        },
        { status: 500 }
      );
    }

    const { data } = parsed;

    const html = await render(React.createElement(ContactEmail, { data }));

    const { error } = await resend.emails.send({
      // Resend requires a verified sender domain.
      // Using Resend's shared sandbox address for now;
      // replace with a verified custom domain address before going live.
      from: "Three Hills Equipment <onboarding@resend.dev>",
      replyTo: "swankylex@gmail.com",
      to: [RECIPIENT_EMAIL],
      subject: `New Machine Enquiry – ${data.machineType} (${
        data.numberOfUnits
      } unit${data.numberOfUnits > 1 ? "s" : ""})`,
      html,
    });

    if (error) {
      console.error("[contact/route] Resend error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send email. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[contact/route] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

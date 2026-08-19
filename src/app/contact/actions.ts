"use server";

import { z } from "zod";

import { enquirySchema, type EnquiryInput, type EnquiryResult } from "@/lib/enquiry";

/**
 * Receives a project enquiry.
 *
 * Delivery is intentionally pluggable: drop in Resend, Postmark or a Sanity
 * document write where the TODO sits. Validation, honeypot and error shape stay
 * the same regardless of transport.
 */
export async function submitEnquiry(input: EnquiryInput): Promise<EnquiryResult> {
  const parsed = enquirySchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors as Record<string, string[]>,
    };
  }

  // Silently accept honeypot hits so bots get no signal to retry against.
  if (parsed.data.website) return { ok: true };

  try {
    // TODO: wire an email provider or CMS write here.
    console.info("[enquiry]", {
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company,
      budget: parsed.data.budget,
      length: parsed.data.message.length,
    });

    return { ok: true };
  } catch (error) {
    console.error("[enquiry] delivery failed", error);
    return {
      ok: false,
      message: "Something went wrong on our side. Email us directly and we will pick it up.",
    };
  }
}

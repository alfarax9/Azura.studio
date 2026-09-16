import { z } from "zod";

/**
 * Enquiry contract, shared by the client form and the server action.
 *
 * It lives outside the `"use server"` module on purpose: a server-action file
 * may only export async functions, so a schema exported from there is rewritten
 * into an RPC stub and stops behaving like a Zod object.
 */
export const enquirySchema = z.object({
  name: z.string().min(2, "Tell me who you are.").max(80),
  email: z.email("That does not look like an email address."),
  company: z.string().max(120).optional().or(z.literal("")),
  budget: z.enum(["<25k", "25–60k", "60–120k", "120k+", "not sure"]),
  message: z.string().min(20, "A couple of sentences helps me reply properly.").max(4000),
  // Honeypot: bots fill hidden fields, humans never see this one.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export type EnquiryResult =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: Record<string, string[]> };

export const BUDGET_OPTIONS = enquirySchema.shape.budget.options;

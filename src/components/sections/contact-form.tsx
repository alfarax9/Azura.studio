"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { submitEnquiry } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { BUDGET_OPTIONS, enquirySchema, type EnquiryInput } from "@/lib/enquiry";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full border-b border-hairline bg-transparent py-3 text-[1.0625rem] outline-none transition-colors duration-300 placeholder:text-muted/70 focus:border-ink";

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { budget: "not sure", company: "", website: "" },
  });

  const budget = watch("budget");

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
      const result = await submitEnquiry(values);

      if (result.ok) {
        setSent(true);
        reset();
        toast.success("Thanks — I'll reply within two working days.");
      } else {
        toast.error(result.message);
      }
    });
  });

  if (sent) {
    return (
      <div className="border-t border-hairline py-14">
        <p className="text-title">
          Message received.
        </p>
        <p className="mt-4 max-w-[46ch] text-[1.0625rem] text-ink/70">
          I read every message myself and reply within two working days — usually with a couple
          of questions before anything else.
        </p>
        <Button className="mt-8" variant="outline" onClick={() => setSent(false)}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-10">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Your name" error={errors.name?.message}>
          <input
            {...register("name")}
            id="name"
            autoComplete="name"
            placeholder="Jane Doe"
            className={fieldClass}
          />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            id="email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            className={fieldClass}
          />
        </Field>
      </div>

      <Field label="Company (optional)" error={errors.company?.message}>
        <input
          {...register("company")}
          id="company"
          autoComplete="organization"
          placeholder="Company name"
          className={fieldClass}
        />
      </Field>

      <fieldset>
        <legend className="section-tag text-muted">Indicative budget</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {BUDGET_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              data-cursor="hover"
              aria-pressed={budget === option}
              onClick={() => setValue("budget", option, { shouldValidate: true })}
              className={cn(
                "rounded-full border px-4 py-2 text-[0.875rem] transition-colors duration-400",
                budget === option
                  ? "border-ink bg-ink text-cream"
                  : "border-hairline text-ink/70 hover:border-ink/40",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <Field label="What are you building?" error={errors.message?.message}>
        <textarea
          {...register("message")}
          id="message"
          rows={5}
          placeholder="A few sentences about the product, the timeline, and what is currently in the way."
          className={cn(fieldClass, "resize-none")}
        />
      </Field>

      {/* Honeypot — visually and programmatically hidden from people. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="website">Website</label>
        <input {...register("website")} id="website" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="section-tag text-muted">{label}</span>
      <span className="mt-2 block">{children}</span>
      {error && (
        <span role="alert" className="mt-2 block text-[0.8125rem] text-ember">
          {error}
        </span>
      )}
    </label>
  );
}

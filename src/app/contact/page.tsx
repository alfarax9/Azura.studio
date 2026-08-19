import type { Metadata } from "next";
import { Toaster } from "sonner";

import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { PageHeader } from "@/components/sections/page-header";
import { SectionTag } from "@/components/ui/section-tag";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with AZURA. Tell us what you are building and we will reply within two working days.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHeader
        label="Contact"
        title="Tell us what you are building"
        lead="Skip the brief if you do not have one. A paragraph about the problem is a better starting point than a spec."
      />

      <section data-nav-bg="light" className="section-pad bg-cream text-ink">
        <div className="padding-global grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionTag label="Direct" />

            <Reveal className="mt-8 space-y-8" delay={0.1}>
              <div>
                <p className="section-tag text-muted">Email</p>
                <a
                  href={`mailto:${settings.email}`}
                  data-cursor="hover"
                  className="group mt-2 inline-block text-[1.0625rem]"
                >
                  {settings.email}
                  <span className="mt-0.5 block h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-600 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
                </a>
              </div>

              <div>
                <p className="section-tag text-muted">Where</p>
                <p className="mt-2 text-[1.0625rem]">{settings.location}</p>
              </div>

              <div>
                <p className="section-tag text-muted">Availability</p>
                <p className="mt-2 text-[1.0625rem]">{settings.availability}</p>
              </div>

              <div>
                <p className="section-tag text-muted">Elsewhere</p>
                <ul className="mt-2 space-y-1">
                  {settings.socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        data-cursor="hover"
                        className="text-[1.0625rem] text-ink/70 transition-colors hover:text-ink"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <SectionTag label="Project enquiry" />
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#121212",
            color: "#fdfbf8",
            border: "1px solid rgba(255,255,255,0.16)",
            borderRadius: "9999px",
          },
        }}
      />
    </>
  );
}

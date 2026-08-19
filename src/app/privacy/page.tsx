import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/page-header";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How AZURA handles the data you share with us.",
  robots: { index: false, follow: true },
};

const sections = [
  {
    heading: "What we collect",
    body: "Only what you send us. If you submit the enquiry form, we receive your name, email address, optional company name, an indicative budget band, and your message. We do not run advertising trackers and we do not sell data.",
  },
  {
    heading: "Why we hold it",
    body: "To reply to you and, if we end up working together, to run the engagement. That is the entire purpose. We have a legitimate interest in responding to enquiries addressed to us.",
  },
  {
    heading: "How long we keep it",
    body: "Enquiries that do not turn into projects are deleted after twelve months. Project correspondence is kept for the duration of the engagement plus the retention period our accountants require.",
  },
  {
    heading: "Analytics",
    body: "We measure page performance and aggregate traffic without cookies or cross-site identifiers. Individual visitors are not profiled and no personal data leaves the request.",
  },
  {
    heading: "Third parties",
    body: "The site is hosted on a cloud platform, content is managed in a hosted CMS, and media is served from a content delivery network. Each processes data solely to deliver the site.",
  },
  {
    heading: "Your rights",
    body: "You can ask for a copy of what we hold, ask us to correct it, or ask us to delete it. Email us and we will action it within thirty days.",
  },
];

export default async function PrivacyPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHeader
        label="Legal"
        title="Privacy Policy"
        lead="Short, because we collect very little."
      />

      <section data-nav-bg="light" className="section-pad bg-cream text-ink">
        <div className="padding-global max-w-[68ch]">
          {sections.map((section) => (
            <article key={section.heading} className="border-t border-hairline py-8">
              <h2 className="text-title">
                {section.heading}
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink/70">{section.body}</p>
            </article>
          ))}

          <article className="border-t border-hairline py-8">
            <h2 className="text-title">
              Contact
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink/70">
              Questions about any of this go to{" "}
              <a href={`mailto:${settings.email}`} className="text-azure underline-offset-4 hover:underline">
                {settings.email}
              </a>
              .
            </p>
          </article>

          <p className="section-tag mt-10 text-muted">
            This template is a starting point, not legal advice — have counsel review it before you
            publish.
          </p>
        </div>
      </section>
    </>
  );
}

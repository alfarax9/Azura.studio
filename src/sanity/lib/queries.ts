import { defineQuery } from "next-sanity";

const imageProjection = `{
  "url": asset->url,
  "alt": coalesce(alt, ""),
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`;

const summaryProjection = `{
  _id,
  title,
  "slug": slug.current,
  year,
  discipline,
  headline,
  "accent": coalesce(accent, "#2d62ff"),
  "cover": cover ${imageProjection},
  "preview": previewVideo
}`;

export const projectSummariesQuery = defineQuery(
  `*[_type == "project" && defined(slug.current)] | order(order asc, year desc) ${summaryProjection}`,
);

export const projectSlugsQuery = defineQuery(
  `*[_type == "project" && defined(slug.current)].slug.current`,
);

export const projectBySlugQuery = defineQuery(
  `*[_type == "project" && slug.current == $slug][0]{
    ...${summaryProjection},
    client,
    intro,
    services,
    deliverables,
    timeline,
    liveUrl,
    stats[]{ value, label },
    chapters[]{ heading, body, "media": media ${imageProjection} },
    "gallery": gallery[] ${imageProjection}
  }`,
);

export const testimonialsQuery = defineQuery(
  `*[_type == "testimonial"] | order(order asc) {
    _id, quote, author, role, company, "projectSlug": project->slug.current
  }`,
);

export const servicesQuery = defineQuery(
  `*[_type == "service"] | order(order asc) { _id, title, body, capabilities }`,
);

export const processQuery = defineQuery(
  `*[_type == "processStep"] | order(order asc) { _id, title, body }`,
);

export const siteSettingsQuery = defineQuery(
  `*[_type == "siteSettings"][0]{
    brand, tagline, email, location, availability, socials[]{ label, href }
  }`,
);

import type { SchemaTypeDefinition } from "sanity";

import { processStepType } from "./processStep";
import { projectType } from "./project";
import { serviceType } from "./service";
import { siteSettingsType } from "./siteSettings";
import { testimonialType } from "./testimonial";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettingsType,
    projectType,
    testimonialType,
    serviceType,
    processStepType,
  ],
};

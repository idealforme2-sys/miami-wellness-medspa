import { type SchemaTypeDefinition } from "sanity";
import { announcementType } from "./documents/announcement";
import { faqItemType } from "./documents/faqItem";
import { galleryItemType } from "./documents/galleryItem";
import { heroBlockType } from "./documents/heroBlock";
import { serviceCategoryType } from "./documents/serviceCategory";
import { serviceItemType } from "./documents/serviceItem";
import { siteSettingsType } from "./documents/siteSettings";
import { testimonialType } from "./documents/testimonial";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettingsType,
    heroBlockType,
    serviceCategoryType,
    serviceItemType,
    testimonialType,
    faqItemType,
    galleryItemType,
    announcementType,
  ],
};

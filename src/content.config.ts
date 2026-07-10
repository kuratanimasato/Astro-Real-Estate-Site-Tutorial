import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
const news = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./content/news" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
  }),
});
export const collections = { news };

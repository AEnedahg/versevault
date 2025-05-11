import { z } from "zod";

export const bibleDataSchema = z.object({
  data: z.object({
    id: z.string(),
    dblId: z.string(),
    abbreviation: z.string(),
    abbreviationLocal: z.string(),
    copyright: z.string(),
    language: z.object({
      id: z.string(),
      name: z.string(),
      nameLocal: z.string(),
      script: z.string(),
      scriptDirection: z.string(),
    }),
    countries: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        nameLocal: z.string(),
      })
    ),
    name: z.string(),
    nameLocal: z.string(),
    description: z.string(),
    descriptionLocal: z.string(),
    info: z.string(),
    type: z.string(),
    updatedAt: z.string(),
    relatedDbl: z.string(),
    audioBibles: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        nameLocal: z.string(),
        description: z.string(),
        descriptionLocal: z.string(),
      })
    ),
  }),
});

import { z } from "zod";

export const bibleSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      dblId: z.string(),
      abbreviation: z.string(),
      abbreviationLocal: z.string(),
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
      relatedDbl: z.string(),
      type: z.string(),
      updatedAt: z.string(),
      audioBibles: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          nameLocal: z.string(),
          description: z.string(),
          descriptionLocal: z.string(),
        })
      ),
    })
  ),
});

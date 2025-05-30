import { z } from "zod";

const VerseSchema = z.object({
  id: z.string(),
  orgId: z.string(),
  bibleId: z.string(),
  bookId: z.string(),
  chapterId: z.string(),
  number: z.string(),
  text: z.string(),
  reference: z.string(),
  copyright: z.string().optional(),
  next: z
    .object({
      id: z.string(),
      number: z.string(),
    })
    .optional(),
  previous: z
    .object({
      id: z.string(),
      number: z.string(),
    })
    .optional(),
  content: z.string(),
});

const VersesDataSchema = z.object({
  data: z.array(VerseSchema),
  meta: z.object({
    fums: z.string().optional(),
    fumsId: z.string().optional(),
    fumsJsInclude: z.string().optional(),
    fumsJs: z.string().optional(),
    fumsNoScript: z.string().optional(),
  }),
});

export const BibleChapterVersesResponseSchema = z.object({
  data: VersesDataSchema,
  meta: z.object({
    pagination: z
      .object({
        currentPage: z.number(),
        perPage: z.number(),
        totalPages: z.number(),
        totalResults: z.number(),
      })
      .optional(),
  }),
});

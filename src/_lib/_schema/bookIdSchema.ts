import { z } from "zod";

const ChapterSchema = z.object({
  id: z.string(),
  bibleId: z.string(),
  number: z.string(),
  bookId: z.string(),
  reference: z.string(),
});

const BookSchema = z.object({
  id: z.string(),
  bibleId: z.string(),
  abbreviation: z.string(),
  name: z.string(),
  nameLong: z.string(),
  chapters: z.array(ChapterSchema),
});

export const BibleDataSchema = z.object({
  data: z.array(BookSchema),
});

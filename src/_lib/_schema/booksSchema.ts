import { z } from "zod";

export const booksSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      bibleId: z.string(),
      abbreviation: z.string(),
      name: z.string(),
      nameLong: z.string(),
      chapters: z.array(
        z.object({
          id: z.string(),
          bibleId: z.string(),
          number: z.string(),
          bookId: z.string(),
          reference: z.string(),
        })
      ),
    })
  ),
});


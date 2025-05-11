import axios from "axios";
import { BibleChapterVersesResponseSchema } from "../_schema/BibleChapterVersesResponseSchema";
const BASE_URL = "https://api.scripture.api.bible/v1";
const API_KEY = process.env.NEXT_PUBLIC_BIBLE_API_KEY;

export const biblesApi = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/bibles`, {
      headers: {
        "api-key": API_KEY,
      },
      params: {
        language: "eng",
        "include-full-details": true,
      },
    });

    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching Bibles:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch Bibles");
  }
};

export const bibleApi = async (query: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/bibles/${query}`,
      {
        headers: { "api-key": API_KEY },
      }
    );
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch Bible");
  }
};

export const bookApi = async (query: string) => {
   try {
     const response = await axios.get(`${BASE_URL}/bibles/${query}/books`, {
       headers: { "api-key": API_KEY },
       params: {
        "include-chapters": true,
        "include-chapters-and-sections": false,
       }
     });
     return response.data.data;
   } catch (error: any) {
     throw new Error(error.message || "Failed to fetch Bible");
   }
}
// @/_lib/_api/api.ts

export async function fetchChapters(bibleId: string, bookId: string) {
  try {
    const response = await axios.get(
      `${BASE_URL}/${bibleId}/books/${bookId}/chapters`
    ,{
       headers: { "api-key": API_KEY }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch chapters");
    }

    const data = await response.json();

    // Assuming the response contains an array of chapters with an id and number
    return data.chapters || [];
  } catch (error) {
    console.error("Error fetching chapters:", error);
    throw new Error("Error fetching chapters");
  }
}

export async function fetchChapterVerses(bibleId: string, chapterId: string) {
  const res = await fetch(
    `https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${chapterId}`,
    {
      headers: {
        "api-key": API_KEY!,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch chapter verses");
  }

  const data = await res.json();

  // Optionally, extract verses from HTML content
  const htmlContent = data.data.content;

  return htmlContent; // or parse it if needed
}

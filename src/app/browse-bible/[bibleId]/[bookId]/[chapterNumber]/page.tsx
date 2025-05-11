"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchChapterVerses } from "@/_lib/_api/api";
import Link from "next/link";
type Verse = {
  id: string;
  number: string;
  content: string;
  reference?: string;
  bookId?: string;
  chapterId?: string;
};
export default function ChapterPage() {
  
  const params = useParams();
  const bibleId = params.bibleId as string;
  const bookId = params.bookId as string;
  const chapterNumber = params.chapterNumber as string;

  // Construct proper chapter ID (BOOK.CHAPTERNUMBER)
  const chapterId = `${bookId}.${chapterNumber}`;

  console.log("Route Parameters:", {
    bibleId,
    bookId,
    chapterNumber,
    chapterId,
  });

  const {
    data: verses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["verses", bibleId, chapterId],
    queryFn: () => fetchChapterVerses(bibleId, chapterId),
    enabled: !!bibleId && !!chapterId,
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow p-6">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between mb-6">
            <div className="h-8 w-40 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Verses Skeleton */}
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  console.log("Rendered Verses:", verses);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            {bookId} {chapterNumber}
          </h1>
          <Link
            href={`/browse-bible/${bibleId}/${bookId}`}
            className="text-blue-600 hover:underline"
          >
            ← Back to chapters
          </Link>
        </div>

        {verses.length > 0 ? (
          <div className="block space-y-4">
            {/* Wrapper for each verse */}
            <div
              className="verse-content text-gray-700 space-y-4"
              dangerouslySetInnerHTML={{ __html: verses }}
            />
          </div>
        ) : (
          <div className="text-gray-500">No verses found for this chapter</div>
        )}
      </div>
    </div>
  );
}

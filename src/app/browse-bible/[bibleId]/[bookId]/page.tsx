"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchChapters } from "@/_lib/_api/api";

export default function BackToChaptersPage() {
  const params = useParams();
  const bibleId = params.bibleId as string;
  const bookId = params.bookId as string;

  const {
    data: chapters = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["chapters", bibleId, bookId],
    queryFn: () => fetchChapters(bibleId, bookId),
    enabled: !!bibleId && !!bookId,
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="h-8 w-40 bg-gray-200 rounded animate-pulse"></div>
          <div className="space-y-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-6 w-full bg-gray-200 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Chapters in {bookId}</h1>
          <Link
            href={`/browse-bible/${bibleId}`}
            className="text-blue-600 hover:underline"
          >
            ← Back to Bible
          </Link>
        </div>

        {chapters.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {chapters
              .filter(
                (chapter: { number: string }) =>
                  chapter.number.toLowerCase() !== "intro"
              )
              .map((chapter: { number: string; id: string }) => (
                <Link
                  key={chapter.id}
                  href={`/browse-bible/${bibleId}/${bookId}/${chapter.number}`}
                  className="block text-center p-2 bg-black text-white rounded-md hover:bg-gray-900"
                >
                  Chapter {chapter.number}
                </Link>
              ))}
          </div>
        ) : (
          <div className="text-gray-500">No chapters found for this book.</div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { biblesApi, bookApi } from "@/_lib/_api/api";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Chapter = {
  id: string;
  number: string;
  reference: string;
  bookId: string;
  bibleId: string;
};

type Book = {
  id: string;
  abbreviation: string;
  name: string;
  nameLong: string;
  language?: {
    name: string;
  };
  version?: string;
  updatedAt?: string;
  description?: string;
  chapters: Chapter[];
};

interface XCircleIconProps {
  className?: string;
}

const BibleDetailsSkeleton = () => (
  <div className="flex-1 bg-white rounded-lg shadow p-6 space-y-4 animate-pulse">
    <div className="h-8 w-24 bg-gray-200 rounded" />
    <div className="h-6 w-48 bg-gray-200 rounded" />
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div className="h-4 w-32 bg-gray-200 rounded" />
      <div className="h-4 w-32 bg-gray-200 rounded" />
      <div className="h-4 w-32 bg-gray-200 rounded" />
      <div className="h-4 w-32 bg-gray-200 rounded" />
    </div>
    <div className="bg-gray-100 p-4 rounded space-y-2 mt-4">
      <div className="h-4 w-3/4 bg-gray-200 rounded" />
      <div className="h-4 w-full bg-gray-200 rounded" />
      <div className="h-4 w-5/6 bg-gray-200 rounded" />
    </div>
  </div>
);

const BooksListSkeleton = () => (
  <div className="w-full md:w-64 bg-white rounded-lg shadow p-4 space-y-3 animate-pulse">
    <div className="h-6 w-1/2 bg-gray-200 rounded" />
    {[...Array(8)].map((_, i) => (
      <div key={i} className="h-4 w-full bg-gray-200 rounded" />
    ))}
  </div>
);



export default function BibleDetails() {
  const { bibleId } = useParams();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const chaptersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chaptersRef.current &&
        !chaptersRef.current.contains(event.target as Node)
      ) {
        setSelectedBook(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const {
    data: bibles,
    error: bibleError,
    isLoading: isBibleLoading,
  } = useQuery<Book[]>({
    queryKey: ["bibles", bibleId],
    queryFn: biblesApi,
    enabled: !!bibleId,
  });

  const {
    data: books,
    error: booksError,
    isLoading: isBooksLoading,
  } = useQuery({
    queryKey: ["books", bibleId],
    queryFn: () => bookApi(bibleId as string),
    enabled: !!bibleId,
  });

  const isLoading = isBibleLoading || isBooksLoading;

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-4 flex flex-col md:flex-row gap-6">
        <BibleDetailsSkeleton />
        <BooksListSkeleton />
      </div>
    );
  }

  if (bibleError) return <ErrorDisplay message={bibleError.message} />;
  if (booksError) return <ErrorDisplay message={booksError.message} />;

  const bible = bibles?.find((b) => b.id === bibleId);
  if (!bible) return <ErrorDisplay message="Bible version not found" />;

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col md:flex-row gap-6 relative">
      <div className="w-full md:flex-1 bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex items-start flex-col gap-4">
          <div className="bg-blue-50 rounded-lg p-3 text-center min-w-16">
            <span className="text-2xl font-bold text-blue-700">
              {bible.abbreviation}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{bible.nameLong}</h1>
            <p className="text-gray-600">{bible.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Language</h3>
            <p className="font-medium">{bible.language?.name || "English"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Version</h3>
            <p className="font-medium">{bible.version || "Standard Version"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Books</h3>
            <p className="font-medium">{books?.length || 66}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
            <p className="font-medium">{bible.updatedAt || "2023"}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium mb-2">Description</h3>
          <p className="text-gray-600 text-sm">
            {bible.description ||
              "This Bible translation is widely used and recognized for its accuracy and readability."}
          </p>
        </div>
      </div>

      <div className="w-full md:w-64 bg-white rounded-lg shadow p-4 order-1 md:order-none">
        <h2 className="font-bold text-lg mb-4">Books</h2>
        <div className="space-y-2">
          {books?.map((book: Book) => (
            <BookButton
              key={book.id}
              book={book}
              isSelected={selectedBook?.id === book.id}
              onClick={() => setSelectedBook(book)}
            />
          ))}
        </div>
      </div>

      {selectedBook && selectedBook.chapters && (
        <div
          ref={chaptersRef}
          className="fixed md:absolute inset-0 md:inset-auto md:left-120 md:transform md:-translate-x-1/2 mt-4 w-full md:max-w-2xl bg-white rounded-lg shadow p-6 z-10"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">
              Chapters in {selectedBook.name}
            </h3>
            <button
              onClick={() => setSelectedBook(null)}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {selectedBook.chapters.map((chapter) => (
              <ChapterLink
                key={chapter.id}
                bibleId={bibleId as string}
                bookId={selectedBook.id}
                chapter={chapter} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Components (unchanged)
const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="max-w-6xl mx-auto p-4">
    <div className="bg-red-50 border-l-4 border-red-500 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">{message}</p>
        </div>
      </div>
    </div>
  </div>
);

const BookButton = ({
  book,
  isSelected,
  onClick,
}: {
  book: Book;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-2 rounded transition-colors ${
      isSelected ? "bg-blue-50 text-blue-700 font-medium" : "hover:bg-gray-100"
    }`}
  >
    {book.name}
  </button>
);

interface ChapterLinkProps {
  bibleId: string;
  bookId: string;
  chapter: Chapter; // Accept the full chapter object
}

const ChapterLink = ({ bibleId, bookId, chapter }: ChapterLinkProps) => (
  <Link
    href={`/browse-bible/${bibleId}/${bookId}/${chapter.number}`}
    className="p-2 text-center border rounded hover:bg-gray-50 transition-colors"
    onClick={(e) => e.stopPropagation()} // Prevent parent click handlers
  >
    {chapter.number}
  </Link>
);

const XCircleIcon = ({ className }: XCircleIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
      clipRule="evenodd"
    />
  </svg>
);

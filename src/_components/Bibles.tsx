
"use client"
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { biblesApi } from "@/_lib/_api/api";
import Link from "next/link";

type Bible = {
  id: string;
  abbreviation: string;
  name: string;
  description: string;
  updatedAt: string;
  language: {
    name: string;
  };
  audioBibles: {
    id: string;
    name: string;
  }[];
};
const BiblesSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-lg shadow-md overflow-hidden p-6 space-y-4"
      >
        <div className="h-6 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-1/4 bg-gray-300 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-300 rounded" />
        <div className="flex justify-between items-center mt-4">
          <div className="h-4 w-1/3 bg-gray-200 rounded" />
          <div className="h-8 w-20 bg-gray-300 rounded" />
        </div>
      </div>
    ))}
  </div>
);
function Bibles() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const {
    data = [],
    error,
    isLoading,
  } = useQuery<Bible[]>({
    queryKey: ["bibles"],
    queryFn: () => biblesApi(),
    enabled: true,
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredBibles = data?.filter((bible) => {
    return (
      bible.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bible.abbreviation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bible.language.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (isLoading) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Available Bible Versions
          </h1>
          <BiblesSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Available Bible Versions
        </h1>

        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Bible versions..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-4 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBibles?.map((bible) => (
            <div
              key={bible.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    <Link href={`/browse-bible/${bible.id}`}>{bible.name}</Link>
                  </h2>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {bible.abbreviation}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{bible.description}</p>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  {bible.language.name}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Last updated:{" "}
                    {new Date(bible.updatedAt).toLocaleDateString()}
                  </span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    <Link href={`/browse-bible/${bible.id}`}>Select</Link>
                    
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Bibles;

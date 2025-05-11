import React from 'react'
import Link from 'next/link';

function SectionTwo() {
  return (
    <section className="flex justify-between lg:flex-row flex-col mt-1 gap-y-10 mt-10 
    max-w-120 mx-auto lg:max-w-full
    lg:w-full">
      <div
        className="h-120 bg-[url('/pexels-alem-sanchez-182647-977657.jpg')] bg-cover lg:bg-center
        lg:w-1/2 w-full bg-right
      "
      ></div>
      <div className="w-full lg:w-1/2 flex flex-col gap-y-5 items-start px-4 lg:pl-10">
        <h1 className="text-5xl lg:text-7xl">
          Discover the Power of God's Word
        </h1>
        <p className="text-3xl w-full lg:max-w-120">
          Search, read, and reflect on your favorite Bible verses anytime,
          anywhere.
        </p>
        <Link href="/browse-bible">
          <button className="bg-black text-white text-2xl px-6 py-4 rounded-lg">
            Start Exploring
          </button>
        </Link>
      </div>
    </section>
  );
}

export default SectionTwo;
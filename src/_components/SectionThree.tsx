import React from "react";
import Link from "next/link";

function SectionThree() {
  return (
    <section
      className="flex justify-between lg:flex-row flex-col mt-1 gap-y-10 mt-10
    max-w-120 mx-auto lg:max-w-full
    lg:w-full
    "
    >
      <div
        className="h-120 bg-[url('/pexels-tara-winstead-8383666.jpg')] bg-cover bg-center
        lg:w-1/3
      "
      ></div>
      <div className="lg:w-1/3 h-60 lg:h-120 flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-3xl font-semibold text-black mb-4">
          Grow in Faith
        </h2>
        <p className="text-black text-lg">
          Dive into scripture, reflect on daily verses, and strengthen your walk
          with God.
          <br />
          <span className="italic">
            “But grow in the grace and knowledge of our Lord and Savior Jesus
            Christ.”
          </span>{" "}
          — 2 Peter 3:18
        </p>
        <Link href="/verses">
          <button className="mt-6 bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition">
            Explore Verses
          </button>
        </Link>
      </div>
      <div
        className="h-120 bg-[url('/pexels-tara-winstead-8383679.jpg')] bg-center bg-cover
        lg:w-1/3
      "
      ></div>
    </section>
  );
}

export default SectionThree;

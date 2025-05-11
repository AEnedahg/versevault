import React from 'react'

function Hero() {
  return (
    <main className="lg:px-40 md:px-30 sm:px-20 bg-black/85 px-2 py-10 lg:py-30">
      <section
        className="w-full h-120 bg-[url('/pexels-jibarofoto-1771219.jpg')] bg-cover bg-center
        flex justify-center items-center flex-col gap-y-10
    "
      >
        <h1 className="text-black bg-white/90 px-6 py-4 backdrop-blur-sm rounded">
          BIBLE WEBSITE
        </h1>

        <h3 className="text-white text-2xl lg:text-4xl max-w-160">
          "Your word is a lamp to my feet and a light to my path." — Psalm
          119:105
        </h3>
      </section>
    </main>
  );
}

export default Hero
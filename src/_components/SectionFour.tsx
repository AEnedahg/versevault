import React from 'react'
import BibleIcon from '../../public/bible-icon-set-isolated-holy-bible-icon-design-free-vector.jpg';
import Image from 'next/image';
function SectionFour() {
  return (
    <section
      className="mt-10 max-w-120 mx-auto lg:max-w-full
    lg:w-full"
    >
      <div className="w-full lg:h-60 h-120 flex flex-col lg:flex-row">
        <div className="lg:w-2/3 bg-[#F9A8D4] flex justify-center lg:justify-end">
          <div
            className="bg-[url('/pexels-tara-winstead-8383412.jpg')] w-full lg:w-4/5 
          bg-cover bg-center lg:h-full h-60"
          ></div>
        </div>
        <div className="w-full lg:w-1/3 bg-[#D1D5DB] flex flex-col gap-y-2 p-10">
          <Image src={BibleIcon} alt="bibleIcon" width={75} height={75} />
          <h3 className="text-3xl">The Holy Bible</h3>
          <p className="text-lg">Strengthen your walk with God.</p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row px-4 lg:px-0">
        <div className="w-full lg:w-2/3 flex justify-center items-center h-60">
          <h5 className="italic text-2xl">
            "And now these three remain:
            <br />
            Faith, hope and love. But the greatest of these is love."
          </h5>
        </div>
        <div className="w-full lg:w-1/3 flex items-center pr-5">
          <p className="text-sm mb-4">
            "The Lord is my shepherd; I shall not want. He makes me lie down in
            green pastures. He leads me beside still waters. He restores my
            soul. He leads me in paths of righteousness for His name's sake.
            Even though I walk through the valley of the shadow of death, I will
            fear no evil, for You are with me; Your rod and Your staff, they
            comfort me. You prepare a table before me in the presence of my
            enemies,
          </p>
        </div>
      </div>
    </section>
  );
}

export default SectionFour
"use client";
import React, { useState } from 'react';
import { LiaBibleSolid } from "react-icons/lia";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

const NAVITEMS = [
  {
    id: 1,
    text: "Home",
    href:"/"
  },
  {
    id: 2,
    text: "Browse Bible",
    href:"/browse-bible"
  },
  {
    id: 3,
    text: "Search",
    href: "/search"
  },
  {
    id: 4,
    text: "About",
    href: "/about"
  },
  {
    id: 5,
    text: "Contact",
    href: "/contact",
  },
];

function Nav() {
  const [showNav, setShowNav] = useState(false);

  const mobileNav = () => {
    setShowNav(!showNav);
  }

  return (
    <header className="flex justify-between py-10 px-4 items-center lg:px-40 md:px-30 sm:px-20
    max-w-[1440px] mx-auto
    ">
      <LiaBibleSolid className="size-15 cursor-pointer" />
      <GiHamburgerMenu
        className="size-10 cursor-pointer lg:hidden"
        onClick={mobileNav}
      />
      <AnimatePresence>
        {showNav && (
          <motion.nav
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5 }}
            exit={{ width: 0 }}
            className="absolute w-full top-0 right-0 z-100 pt-10 px-10 bg-[#BA55D3] 
            flex flex-col gap-y-5 h-screen lg:hidden
          "
          >
            <div className="flex gap-x-5" onClick={() => setShowNav(!showNav)}>
              <IoClose className="text-white text-5xl" />
            </div>
            <div className="*:text-white *:text-2xl flex flex-col font-semibold *:cursor-pointer gap-y-5">
              {NAVITEMS.map((item) => {
                return (
                  <Link key={item.href} href={item.href} onClick={mobileNav}>
                    {item.text}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <nav
        className="*:text-black *:text-xl w-2/4 lg:flex justify-between items-center
      hidden
      "
      >
        {NAVITEMS.map((item) => {
          return <Link key={item.href} href={item.href}>{item.text}</Link>;
        })}
      </nav>
    </header>
  );
}

export default Nav
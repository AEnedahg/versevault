import React from 'react'

function Footer() {
  return (
    <footer className="mt-10 flex justify-between lg:px-40 md:px-30 sm:px-20 
    bg-gray-200 px-2 py-4 *:text-gray-500">
      <h3 className='text-2xl'>VerseVault &copy;</h3>
      <p className='text-2xl'>{ new Date().getFullYear() }</p>
    </footer>
  );
}

export default Footer
"use client";
import React from "react";

function ContactPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const message = formData.get("message");

    alert(
      `Message sent!\nName: ${fullName}\nEmail: ${email}\nMessage: ${message}`
    );

    e.currentTarget.reset();
  };

  return (
    <div className="grid grid-cols-12 min-h-screen">
    
      <div
        className="col-span-12 lg:col-span-6 bg-cover bg-center"
        style={{
          backgroundImage: "url('/pexels-mart-production-7219067.jpg')",
        }}
      ></div>

      <div className="col-span-12 lg:col-span-6 flex items-center justify-center p-8 bg-white">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Contact Me</h2>

          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              required
              className="mt-1 block w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 block w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              required
              className="mt-1 block w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;

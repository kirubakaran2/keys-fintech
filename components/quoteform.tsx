import React from 'react';

export default function QuoteForm() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-10 text-black max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">Get Your Life Insurance Quote</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Your Name */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-sm">Your Name *</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Contact */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-sm">Contact *</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Age */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-sm">Your Age *</label>
          <input
            type="number"
            min="1"
            placeholder="Enter your age"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-sm">Gender *</label>
          <select
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-sm">Email *</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Submit */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-purple-700 text-white font-semibold px-6 py-3 rounded-md hover:bg-purple-800 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

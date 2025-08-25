

import React from "react";

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Under development banner */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
        <p className="font-bold">Page Under Development</p>
        <p>This page is currently under development. Content will be added soon.</p>
      </div>

      {/* Example content */}
      <h2 className="text-2xl font-bold mb-3">About Us</h2>
      <p className="text-gray-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis animi laudantium ut cumque neque temporibus quas accusantium? Eaque mollitia quisquam vitae laborum est voluptates perspiciatis. Eos quia quo et sed.
      </p>
    </div>
  );
}

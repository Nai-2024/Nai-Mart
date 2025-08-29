import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function UserAuth() {
  const location = useLocation();

  // Initialize with state from navigation (default = login)
  const [isLogin] = useState(location.state?.isLogin ?? true);

  const message = (
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis animi
      laudantium ut cumque neque temporibus quas accusantium? Eaque mollitia
      quisquam vitae laborum est voluptates perspiciatis. Eos quia quo et sed.
    </p>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div
        className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6"
        role="alert"
      >
        <p className="font-bold">Page Under Development</p>
        <p>This page is currently under development. Content will be added soon.</p>
      </div>

      <div>
        {isLogin ? (
          <>
            <h2 className="text-2xl font-bold pt-3">Login</h2>
            {message}
          </>
        ) : (
          <>
              <h2 className="text-2xl font-bold pt-3">Sign Up</h2>
            {message}
          </>
        )}
      </div>
    </div>
  );
}

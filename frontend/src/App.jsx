import React from "react";
import { useEffect, useState } from "react";

function App() {
  const [apiStatus, setApiStatus] = useState("Loading...");

  useEffect(() => {
    // Test the API connection
    fetch(`${import.meta.env.VITE_API_URL}/test`)
      .then((response) => response.json())
      .then((data) => {
        setApiStatus(data.message);
      })
      .catch((error) => {
        setApiStatus("Error connecting to API");
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold text-primary mb-4">
                  Todo List App
                </h1>
                <p>API Status: {apiStatus}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

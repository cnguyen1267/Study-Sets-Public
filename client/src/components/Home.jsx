import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [setId, setSetID] = useState("");

    const handleInputChange = (event) => {
        setSetID(event.target.value);
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Flashcard App
                </h1>
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                            placeholder="Enter Set ID"
                            value={setId}
                            onChange={handleInputChange}
                        />
                        <Link
                            to={setId ? `/set/${setId}` : "#"}
                            className={`p-2 rounded-full transition-all duration-300 ease-in-out ${
                                setId
                                    ? "bg-blue-500 text-white hover:bg-blue-600"
                                    : "bg-gray-300 text-gray-500 cursor-default"
                            }`}
                            onClick={(e) => !setId && e.preventDefault()}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                        </Link>
                    </div>
                    <Link
                        to="/create"
                        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        Create New Set
                    </Link>
                </div>
            </div>
        </section>
    );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [setId, setSetID] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setSetID(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (setId.trim()) {
            navigate(`/set/${setId}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="max-w-md w-full space-y-8 text-center">
                <h1 className="text-4xl font-bold text-gray-900">
                    Flashcard Study Sets
                </h1>
                
                <p className="mt-2 text-gray-600">
                    Create your own flashcards, or search other study sets.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <input
                            type="text"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Enter Set ID"
                            value={setId}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-400 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Go to Set
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    <a
                        href="/create"
                        className="font-medium text-neutral-600 hover:text-neutral-500"
                    >
                        Or create a new set
                    </a>
                </div>
            </div>
        </div>
    );
}
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateSet() {
    const [setName, setSetName] = useState("");
    const [flashcards, setFlashcards] = useState([{ front: "", back: "" }]);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:4000/createSet", {
                set_name: setName,
                flashcards: flashcards,
            })
            .then((res) => {
                console.log(res)
                navigate(`/set/${res.data.data}`);
            })
            .catch((error) => console.error("Error creating set:", error));
    };

    const addFlashcard = () => {
        setFlashcards([...flashcards, { front: "", back: "" }]);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Create New Flashcard Set
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="setName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Set Name
                            </label>
                            <input
                                type="text"
                                id="setName"
                                value={setName}
                                onChange={(e) => setSetName(e.target.value)}
                                placeholder="Enter Set Name"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        {flashcards.map((card, index) => (
                            <div key={index} className="space-y-2">
                                <input
                                    type="text"
                                    value={card.front}
                                    onChange={(e) => {
                                        const newFlashcards = [...flashcards];
                                        newFlashcards[index].front =
                                            e.target.value;
                                        setFlashcards(newFlashcards);
                                    }}
                                    placeholder="Front of card"
                                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <input
                                    type="text"
                                    value={card.back}
                                    onChange={(e) => {
                                        const newFlashcards = [...flashcards];
                                        newFlashcards[index].back =
                                            e.target.value;
                                        setFlashcards(newFlashcards);
                                    }}
                                    placeholder="Back of card"
                                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        ))}
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={addFlashcard}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Add Flashcard
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Create Set
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

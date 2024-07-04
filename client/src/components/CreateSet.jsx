import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateSet() {
    const [setTitle, setSetTitle] = useState("");
    const [description, setDescription] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [course, setCourse] = useState("");
    const [flashcards, setFlashcards] = useState([
        { front: "", back: "" },
        { front: "", back: "" },
    ]);
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(""); // Clear any previous errors

        // Check if title is empty
        if (!setTitle.trim()) {
            setError("Please enter a title for the flashcard set.");
            return;
        }

        // Filter out completely empty flashcards
        const nonEmptyFlashcards = flashcards.filter(
            (card) => card.front.trim() !== "" || card.back.trim() !== ""
        );

        // Check if there are any non-empty flashcards
        if (nonEmptyFlashcards.length === 0) {
            setError("Please add at least one flashcard with a front or back.");
            return;
        }

        // Check for partially filled flashcards
        const incompleteFlashcards = nonEmptyFlashcards.filter(
            (card) => card.front.trim() === "" || card.back.trim() === ""
        );

        if (incompleteFlashcards.length > 0) {
            setError(
                "Please complete all flashcards. Each card should have both a front and a back."
            );
            return;
        }

        // If all checks pass, proceed with submission
        axios
            .post("http://localhost:4000/createSet", {
                set_name: setTitle,
                description,
                school_name: schoolName,
                course,
                flashcards: nonEmptyFlashcards,
            })
            .then((res) => navigate(`/set/${res.data.data}`))
            .catch((error) => {
                console.error("Error creating set:", error);
                console.log(flashcards);
                setError(
                    "An error occurred while creating the set. Please try again."
                );
            });
    };

    const addFlashcard = () => {
        setFlashcards([...flashcards, { front: "", back: "" }]);
    };

    const updateFlashcard = (index, field, value) => {
        const updatedFlashcards = [...flashcards];
        updatedFlashcards[index][field] = value;
        setFlashcards(updatedFlashcards);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                Create a new flashcard set
            </h1>
            {error && (
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                    role="alert"
                >
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <input
                    type="text"
                    value={setTitle}
                    onChange={(e) => setSetTitle(e.target.value)}
                    placeholder="Enter a title, like Biology - Chapter 22: Evolution"
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add a description..."
                    className="w-full p-2 border border-gray-300 rounded h-24"
                />
                <div className="flex space-x-4">
                    <input
                        type="text"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="School name"
                        className="w-1/2 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        placeholder="Course"
                        className="w-1/2 p-2 border border-gray-300 rounded"
                    />
                </div>
                {flashcards.map((card, index) => (
                    <div key={index} className="flex space-x-4 items-start">
                        <div className="font-bold text-gray-500 mt-2">
                            {index + 1}
                        </div>
                        <div className="flex-grow space-y-2">
                            <input
                                type="text"
                                value={card.front}
                                onChange={(e) =>
                                    updateFlashcard(
                                        index,
                                        "front",
                                        e.target.value
                                    )
                                }
                                placeholder="Enter term"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                value={card.back}
                                onChange={(e) =>
                                    updateFlashcard(
                                        index,
                                        "back",
                                        e.target.value
                                    )
                                }
                                placeholder="Enter definition"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addFlashcard}
                    className="w-full p-2 border border-dashed border-gray-300 rounded text-gray-500 hover:bg-gray-50"
                >
                    + Add card
                </button>
                <div className="flex justify-end">
                    <div className="space-x-2">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded"
                        >
                            Create
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

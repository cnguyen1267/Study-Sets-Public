import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AllSets() {
    const [sets, setSets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSets();
    }, []);

    const fetchSets = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:4000/sets');
            setSets(response.data.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch sets. Please try again later.');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this set? This action cannot be undone.')) {
            try {
                await axios.delete(`http://localhost:4000/deleteSet/${id}`);
                fetchSets(); // Refresh the list after deletion
            } catch (err) {
                setError('Failed to delete set. Please try again.');
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">All Flashcard Sets</h1>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-600">ID</th>
                            <th className="px-4 py-2 text-left text-gray-600">Name</th>
                            <th className="px-4 py-2 text-left text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {sets.map((set) => (
                            <tr key={set.id}>
                                <td className="px-4 py-2">{set.id}</td>
                                <td className="px-4 py-2">{set.set_name}</td>
                                <td className="px-4 py-2 flex gap-8">
                                    <Link 
                                        to={`/set/${set.id}`}
                                        className="text-blue-500 hover:text-blue-700 mr-2"
                                    >
                                        View
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(set.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
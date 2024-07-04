import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-neutral-900 text-white shadow-lg">
            <div className="w-full mx-auto px-4">
                <div className="flex justify-between">
                    <div>
                        <Link to="/" className="flex items-center py-2 px-2">
                            <span className="font-semibold text-lg">
                                Study Sets
                            </span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-1">
                        <Link
                            to="/"
                            className="py-2 px-2 hover:bg-blue-700 transition duration-300"
                        >
                            Home
                        </Link>
                        <Link
                            to="/create"
                            className="py-2 px-2 hover:bg-blue-700 transition duration-300"
                        >
                            Create Set
                        </Link>
                        <Link
                            to="/sets"
                            className="py-2 px-2 hover:bg-blue-700 transition duration-300"
                        >
                            All Sets
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

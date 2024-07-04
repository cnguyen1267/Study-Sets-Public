import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import CreateSet from "./components/CreateSet.jsx";
import ViewSet from "./components/ViewSet.jsx";
import AllSets from './components/AllSets';


export default function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create" element={<CreateSet />} />
                        <Route path="/set/:id" element={<ViewSet />} />
                        <Route path="/sets" element={<AllSets />} />
                        {/* Add other routes as needed */}
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

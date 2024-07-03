import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewSet from "./components/ViewSet";
import Home from "./components/Home";
import CreateSet from "./components/CreateSet";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/set/:id" element={<ViewSet />} />
                <Route path="/create" element={<CreateSet />} />
            </Routes>
        </Router>
    );
}

export default App;

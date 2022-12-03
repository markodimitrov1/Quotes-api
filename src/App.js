import React from "react";
import "./App.css";
import AvailableQuotes from "./components/Quotes/AvailableQuotes";
import RandomQote from "./components/Quotes/RandomQuote";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes className="routes">
          <Route exact path="/" element={<AvailableQuotes />} />
          <Route path="/quote" element={<RandomQote />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

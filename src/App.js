import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NavBar from "./components/NavBar/NavBar";
import News from "./components/News/News";
import NewsDetails from "./components/News/NewsDetails"; // Import NewsDetails component
import Search from "./components/Search/Search";
import { router } from "./config/config";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {router.map((path) => (
          <Route
            exact
            key={uuidv4()}
            path={path.path}
            element={<News newscategory={path.category} country={path.country} />}
          />
        ))}
        <Route path="/search/:query" element={<Search />} />
        <Route path="/details/:id" element={<NewsDetails />} /> {/* Route for NewsDetails */}
      </Routes>
    </Router>
  );
}

export default App;
import "./App.css";

// Import fonts
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faChevronRight,
  faChevronLeft,
  faChevronUp,
  faStar,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faHeart,
  faChevronRight,
  faChevronLeft,
  faChevronUp,
  faStar,
  faBars
);

//Import packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

// Import components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Import pages
import HomePage from "./pages/HomePage/HomePage";
import Personnages from "./pages/Personnages/Personnages";
import PersonnageDetails from "./pages/Personnages/PersonnageDetails";
import Comics from "./pages/Comics/Comics";
import Favoris from "./pages/Favoris/Favoris";
import ComicDetails from "./pages/Comics/ComicDetails";
import NotFountPage from "./pages/NotFound/NotFoundPage";

function App() {
  // const urlBack = "https://site--marvel-backend--lkcrzmx4xyh5.code.run"; // Backend prod
  const urlBack = "http://localhost:3000"; // Backend dev
  const [myFavorites, setMyFavorites] = useState(Cookies.get() || null);

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage urlBack={urlBack} />} />
          <Route
            path="/characters"
            element={
              <Personnages
                urlBack={urlBack}
                myFavorites={myFavorites}
                setMyFavorites={setMyFavorites}
              />
            }
          />
          <Route
            path="/character/:characterId"
            element={
              <PersonnageDetails
                urlBack={urlBack}
                myFavorites={myFavorites}
                setMyFavorites={setMyFavorites}
              />
            }
          />
          <Route
            path="/comics"
            element={
              <Comics
                urlBack={urlBack}
                myFavorites={myFavorites}
                setMyFavorites={setMyFavorites}
              />
            }
          />
          <Route
            path="/comic/:comicId"
            element={
              <ComicDetails
                urlBack={urlBack}
                myFavorites={myFavorites}
                setMyFavorites={setMyFavorites}
              />
            }
          />
          <Route path="/favoris" element={<Favoris urlBack={urlBack} />} />
          <Route path="*" element={<NotFountPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

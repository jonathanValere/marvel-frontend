import "./App.css";

// Import fonts
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faKey, faListAlt } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart, faKey, faListAlt);

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
            element={<PersonnageDetails urlBack={urlBack} />}
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
            element={<ComicDetails urlBack={urlBack} />}
          />
          <Route path="/favoris" element={<Favoris urlBack={urlBack} />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

import "./App.css";

//Import packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Import pages
import HomePage from "./pages/HomePage/HomePage";
import Personnages from "./pages/Personnages/Personnages";
import PersonnageDetails from "./pages/Personnages/PersonnageDetails";
import Comics from "./pages/Comics/Comics";

function App() {
  const urlBack = "https://site--marvel-backend--lkcrzmx4xyh5.code.run"; // Backend prod
  // const urlBack = "http://localhost:3000"; // Backend dev

  return (
    <Router>
      <Header />
      <main>
        <section>
          <Routes>
            <Route path="/" element={<HomePage urlBack={urlBack} />} />
            <Route
              path="/characters"
              element={<Personnages urlBack={urlBack} />}
            />
            <Route
              path="/character/:characterId"
              element={<PersonnageDetails urlBack={urlBack} />}
            />
            <Route path="/comics" element={<Comics urlBack={urlBack} />} />
          </Routes>
        </section>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

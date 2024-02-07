import "./App.css";

//Import packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
import Header from "./components/Header/Header";

// Import pages
import HomePage from "./pages/HomePage/HomePage";
import Personnages from "./pages/Personnages/Personnages";
import PersonnageDetails from "./pages/Personnages/PersonnageDetails";
import Comics from "./pages/Comics/Comics";

function App() {
  const urlBack = "https://site--marvel-backend--lkcrzmx4xyh5.code.run";

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage urlBack={urlBack} />} />
          <Route path="/characters" element={<Personnages />} />
          <Route
            path="/character/:characterId"
            element={<PersonnageDetails urlBack={urlBack} />}
          />
          <Route path="/comics" element={<Comics />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

// Import CSS
import "./BuildingPage.css";

// Import packages
import { useNavigate } from "react-router-dom";

export default function BuildingPage(props) {
  const navigate = useNavigate();

  // Handler
  const handleClick = () => {
    console.log("yes");
    navigate("/characters");
  };
  return (
    <section className="section-building-page">
      <div className="container">
        <div className="bloc">
          <p>Your superhero is on a mission to save this page from boredom!</p>
          <button onClick={handleClick}>Visit my colleagues' page</button>
        </div>
      </div>
    </section>
  );
}

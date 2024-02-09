// Import packages
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav>
      <Link to="/characters">Personnages</Link>
      <Link to="/comics">Comics</Link>
      <Link to="/favoris">Favoris</Link>
    </nav>
  );
}

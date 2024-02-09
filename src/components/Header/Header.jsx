import Logo from "../../assets/img/Marvel_Logo.svg";

// Import packages
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <img src={Logo} alt="Logo Marvel" width={150} />
      </Link>
      <nav>
        <Link to="/characters">Personnages</Link>
        <Link to="/comics">Comics</Link>
        <Link to="/favoris">Favoris</Link>
      </nav>
    </header>
  );
}

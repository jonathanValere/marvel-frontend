import Logo from "../../assets/img/Marvel_Logo.svg";

// Import packages
import { Link } from "react-router-dom";

// Import components
import Navigation from "../Navigation/Navigation";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <img src={Logo} alt="Logo Marvel" width={150} />
      </Link>
      <Navigation />
    </header>
  );
}

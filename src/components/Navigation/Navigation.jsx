//Import styles
import styles from "./Navigation.module.css";

// Import packages
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <Link to="/characters">Characters</Link>
      <Link to="/comics">Comics</Link>
      <Link to="/favoris">Favorites</Link>
      <Link to="/favoris" className={styles.signup}>
        SignUp
      </Link>
    </nav>
  );
}

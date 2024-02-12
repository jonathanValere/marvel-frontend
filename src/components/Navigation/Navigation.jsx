//Import styles
import styles from "./Navigation.module.css";

// Import packages
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Navigation() {
  const [displayMenu, setdisplayMenu] = useState(false);

  const handleDisplayMenu = () => {
    setdisplayMenu(!displayMenu);
    return console.log("display menu");
  };

  return (
    <>
      <div className={styles["icon-menu"]}>
        <FontAwesomeIcon icon="bars" onClick={handleDisplayMenu} />
      </div>
      <nav
        className={`${styles.navigation} ${
          !displayMenu && styles["display-menu"]
        }`}
      >
        <Link to="/characters">Characters</Link>
        <Link to="/comics">Comics</Link>
        <Link to="/favoris">Favorites</Link>
        <Link to="/favoris" className={styles.signup}>
          SignUp
        </Link>
      </nav>
    </>
  );
}

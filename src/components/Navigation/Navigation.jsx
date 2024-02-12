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
  };

  return (
    <>
      <div className={styles["icon-menu"]}>
        {!displayMenu ? (
          <FontAwesomeIcon icon="bars" onClick={handleDisplayMenu} />
        ) : (
          <FontAwesomeIcon icon="xmark" onClick={handleDisplayMenu} />
        )}
      </div>
      <nav
        className={`${styles.navigation} ${
          !displayMenu && styles["display-menu"]
        }`}
      >
        <Link to="/characters">Characters</Link>
        <Link to="/comics">Comics</Link>
        <Link to="/favoris">Favorites</Link>
        <Link to="/signup" className={styles.signup}>
          SignUp
        </Link>
      </nav>
    </>
  );
}

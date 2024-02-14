//Import styles
import styles from "./Navigation.module.css";

// Import packages
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Navigation({ token, setUser }) {
  const [displayMenu, setdisplayMenu] = useState(false);
  const navigate = useNavigate();

  const handleDisplayMenu = () => {
    setdisplayMenu(!displayMenu);
  };

  const logout = () => {
    setUser(null); // Supprimer le token donc déconnecte l'utilisateur
    navigate("/");
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

        {token ? (
          <>
            <Link to="/favoris">Favorites</Link>
            <Link className={styles.signup} onClick={logout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.signup}>
              Login
            </Link>
            <Link to="/signup" className={styles.signup}>
              SignUp
            </Link>
          </>
        )}
      </nav>
    </>
  );
}

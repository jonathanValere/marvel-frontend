// Import packages --
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import CSS
import styles from "./ButtonsFavorites.module.css";

export default function ButtonsFavorites({
  comic,
  character,
  item,
  setMyFavorites,
  token,
}) {
  const navigate = useNavigate();

  // Gestion  de l'ajout et de la suppression ---
  const addToFavorites = async (id, nameItem) => {
    if (token) {
      if (item === "character") {
        Cookies.set(id, `character-${nameItem}`);
        setMyFavorites(Cookies.get());
        console.log(`Character ${nameItem} add to favorites!`);
      }

      if (item === "comic") {
        Cookies.set(id, `comic-${nameItem}`);
        setMyFavorites(Cookies.get());
        console.log(`Comic ${nameItem} add to favorites!`);
      }
    } else {
      navigate("/login");
    }
  };

  // ---

  return (
    <button
      className={styles.button}
      onClick={() =>
        addToFavorites(
          item === "character" ? character._id : comic._id,
          item === "character" ? character.name : comic.title
        )
      }
    >
      Add to my favorites
    </button>
  );
}

// Import packages --
import { useState } from "react";
import Cookies from "js-cookie";

export default function ButtonsFavorites({
  comic,
  character,
  item,
  myFavorites,
  setMyFavorites,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Gestion  de l'ajout et de la suppression ---
  const addToFavorites = (id, nameItem) => {
    console.log(id, nameItem);
    if (item === "character") {
      Cookies.set(id, `character-${nameItem}`);
      // console.log(Cookies.get());
      setMyFavorites(Cookies.get());
      console.log(`Character ${nameItem} add to favorites!`);
    }

    if (item === "comic") {
      Cookies.set(id, `comic-${nameItem}`);
      // console.log(Cookies.get());
      setMyFavorites(Cookies.get());
      console.log(`Comic ${nameItem} add to favorites!`);
    }

    return setIsFavorite(true);
  };

  const removeToFavorites = (nameItem) => {
    if (item === "character") {
      Cookies.remove(`character-${nameItem}`);
      setMyFavorites(Cookies.get());
      console.log(`Character ${nameItem} removed to favorites!`);
    }
    return setIsFavorite(false);
  };
  // ---

  // console.log("my favorites comp.button >>>", myFavorites);

  return isFavorite ? (
    <button
      onClick={() =>
        removeToFavorites(item === "character" ? character.name : comic.title)
      }
    >
      Supprimer des favoris
    </button>
  ) : (
    <button
      onClick={() =>
        addToFavorites(
          item === "character" ? character._id : comic._id,
          item === "character" ? character.name : comic.title
        )
      }
    >
      Ajouter en favoris
    </button>
  );
}

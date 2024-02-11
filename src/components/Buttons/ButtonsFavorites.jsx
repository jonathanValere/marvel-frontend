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

  // console.log(comic, character, item, myFavorites, setMyFavorites);
  // Gestion  de l'ajout et de la suppression ---
  const addToFavorites = (id, nameItem) => {
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

    return setIsFavorite(true);
  };

  const removeToFavorites = (id) => {
    if (item === "character") {
      Cookies.remove(id);
      setMyFavorites(Cookies.get());
      console.log(`Character removed to favorites!`);
    }

    if (item === "comic") {
      Cookies.remove(id);
      setMyFavorites(Cookies.get());
      console.log(`Comic removed to favorites!`);
    }
    return setIsFavorite(false);
  };
  // ---

  return isFavorite ? (
    <button
      onClick={() =>
        removeToFavorites(item === "character" ? character._id : comic._id)
      }
    >
      Remove to my favorites
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
      Add to my favorites
    </button>
  );
}

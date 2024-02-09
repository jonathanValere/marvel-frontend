// Import packages
import Cookies from "js-cookie";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ItemFavorite({ character, comic, item, setFavoris }) {
  const [isFavorite, setIsFavorite] = useState(true);

  // Retirer le character des favoris --
  const removeToFavorites = (id) => {
    if (item === "character") {
      Cookies.remove(id);
      setFavoris(Cookies.get());
      setIsFavorite(false);
      return console.log(`Character ${character.name} removed to favorites!`);
    }
    if (item === "comic") {
      Cookies.remove(id);
      setFavoris(Cookies.get());
      setIsFavorite(false);
      return console.log(`Comic ${comic.title} removed to favorites!`);
    }
  };

  return (
    isFavorite && (
      <li>
        {item === "character" ? (
          <>
            <Link to={`/character/${character._id}`}>
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                width={100}
                height={150}
              />
              <p>{character.name}</p>
            </Link>
            <button onClick={() => removeToFavorites(character._id)}>
              Retirer des favoris
            </button>
          </>
        ) : (
          <>
            <Link to={`/comic/${comic._id}`}>
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                width={100}
                height={150}
              />
              <p>{comic.title}</p>
            </Link>
            <button onClick={() => removeToFavorites(comic._id)}>
              Retirer des favoris
            </button>
          </>
        )}
      </li>
    )
  );
}

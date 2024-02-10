// Import packages
import Cookies from "js-cookie";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ItemFavorite({ ...props }) {
  const [isFavorite, setIsFavorite] = useState(true);

  // Retirer le character des favoris --
  const removeToFavorites = (id) => {
    if (props.item === "character") {
      Cookies.remove(id);
      props.setCounter((prev) => prev - 1);
      setIsFavorite(false);
      return console.log(`Character ${props.data.name} removed to favorites!`);
    }
    if (props.item === "comic") {
      Cookies.remove(id);
      props.setCounter((prev) => prev - 1);
      setIsFavorite(false);
      return console.log(`Comic ${props.data.title} removed to favorites!`);
    }
  };

  return (
    isFavorite && (
      <li>
        {props.item === "character" ? (
          <>
            <Link to={`/character/${props.data._id}`}>
              <img
                src={`${props.data.thumbnail.path}.${props.data.thumbnail.extension}`}
                width={100}
                height={150}
              />
              <p>{props.data.name}</p>
            </Link>
            <button onClick={() => removeToFavorites(props.data._id)}>
              Retirer des favoris
            </button>
          </>
        ) : (
          <>
            <Link to={`/comic/${props.data._id}`}>
              <img
                src={`${props.data.thumbnail.path}.${props.data.thumbnail.extension}`}
                width={100}
                height={150}
              />
              <p>{props.data.title}</p>
            </Link>
            <button onClick={() => removeToFavorites(props.data._id)}>
              Retirer des favoris
            </button>
          </>
        )}
      </li>
    )
  );
}

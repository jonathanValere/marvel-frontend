// Import packages
import Cookies from "js-cookie";
import { useState } from "react";
import { Link } from "react-router-dom";

// Import CSS
import styles from "./ItemFavorite.module.css";

export default function ItemFavorite({ ...props }) {
  const [isFavorite, setIsFavorite] = useState(true);
  const thumbnail = `${props.data.thumbnail.path}.${props.data.thumbnail.extension}`;

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
      <li className={styles["item-favorite"]}>
        <>
          <Link
            to={
              props.item === "character"
                ? `/character/${props.data._id}`
                : `/comic/${props.data._id}`
            }
          >
            <img src={thumbnail} width={165} height={252} />
          </Link>
          <button onClick={() => removeToFavorites(props.data._id)}>
            Remove to favorites
          </button>
        </>
      </li>
    )
  );
}

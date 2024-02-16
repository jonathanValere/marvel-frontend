// Import packages
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Import CSS
// import styles from "./ItemFavorite.module.css";
import "./ItemFavorite.css";
import axios from "axios";

export default function ItemFavorite(props) {
  const [isFavorite, setIsFavorite] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [thumbnail, setThumbnail] = useState(null);
  // console.log(`${props.urlBack}/${props.item}/${props.data}`);
  console.log(props);
  // Gestion image par default ---
  const imageDefault =
    "https://res.cloudinary.com/dmgktp9qs/image/upload/v1707599775/Marvel/ezbqe3yghr6laoi4ezte.png";

  // ---

  // Récupérer l'Item
  useEffect(() => {
    const getItem = async () => {
      const { data } = await axios.get(
        `${props.urlBack}/${props.item}/${props.data}`
      );
      setData(data.data);
      setThumbnail(
        `${data.data.thumbnail.path}.${data.data.thumbnail.extension}`
      );
      setIsLoading(false);
    };
    getItem();
  }, []);

  // Retirer le character des favoris --
  const removeToFavorites = async () => {
    try {
      const { data } = await axios.delete(
        `${props.urlBack}/favoris/${props.item}s/remove/${props.data}`,
        {
          headers: {
            Authorization: "Bearer " + props.token,
          },
        }
      );
      setIsFavorite(false);
      props.setCounter((prev) => prev - 1);
      console.log(data.message);
    } catch (error) {
      console.log("something wrong!");
    }
  };

  return !isLoading ? (
    isFavorite && (
      <li className="item-favorite">
        <>
          <Link
            to={
              props.item === "character"
                ? `/character/${data._id}`
                : `/comic/${data._id}`
            }
          >
            <img
              src={
                thumbnail.includes("image_not_available")
                  ? imageDefault
                  : thumbnail
              }
              width={165}
              height={252}
            />
          </Link>
          <button onClick={() => removeToFavorites(data._id)}>
            Remove to favorites
          </button>
        </>
      </li>
    )
  ) : (
    <></>
  );
}

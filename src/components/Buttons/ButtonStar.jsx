import styles from "./ButtonStar.module.css";
import Cookies from "js-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ButtonStar(props) {
  // Handler favorites
  const handleRemoveToFavorites = () => {
    Cookies.remove(props.id);
    props.setMyFavorites(Cookies.get());
    console.log("Removed!");
  };

  return (
    <FontAwesomeIcon
      icon={"star"}
      onClick={handleRemoveToFavorites}
      className={styles["button-star"]}
    />
  );
}

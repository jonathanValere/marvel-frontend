// Import CSS
import styles from "./ButtonStar.module.css";

// import packages
import axios from "axios";
// import Cookies from "js-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ButtonStar(props) {
  // Handler favorites
  const handleRemoveToFavorites = async () => {
    //---------
    try {
      const { data } = await axios.delete(
        `${props.urlBack}/favoris/${props.item}/remove/${props.id}`,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        }
      );

      if (data) {
        props.setToggle(!props.toggle);
        console.log(data.message);
      } else {
        console.log("Something wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FontAwesomeIcon
      icon={"star"}
      onClick={handleRemoveToFavorites}
      className={styles["button-star"]}
    />
  );
}

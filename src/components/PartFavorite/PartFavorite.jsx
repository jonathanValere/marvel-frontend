// Import packages
import { useState } from "react";

// Import CSS
import styles from "./PartFavorite.module.css";

// Import components
import ItemFavorite from "../ItemFavorite/ItemFavorite";

export default function PartFavorite(props) {
  const [counter, setCounter] = useState(props.datas.length);
  return (
    <div className={styles["part-favorite"]}>
      {/* La partie characters ou comics */}
      <h2>
        {props.namePart}
        <span className={styles.counter}>{counter}</span>
      </h2>
      <ul className={styles["list-favorites"]}>
        {props.datas.map((data) => (
          // Item représente soit un character soit un comic
          <ItemFavorite
            key={data}
            item={props.item} // "character" ou "comic"
            data={data} // id d'un character ou comic
            setCounter={setCounter}
            urlBack={props.urlBack}
            token={props.token}
          />
        ))}
      </ul>
    </div>
  );
}

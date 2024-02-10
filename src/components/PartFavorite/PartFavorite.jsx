// Import packages
import { useState } from "react";

// Import components
import ItemFavorite from "../ItemFavorite/ItemFavorite";

export default function PartFavorite({ ...props }) {
  const [counter, setCounter] = useState(props.datas.length);
  return (
    <>
      {/* La partie characters ou comics */}
      <h2>
        {props.namePart}
        <span>{counter}</span>
      </h2>
      <ul>
        {props.datas.map((data) => (
          // Item représente soit un character soit un comic
          <ItemFavorite
            key={data._id}
            item={props.item} // "character" ou "comic"
            data={data} // données d'un character ou comic
            setCounter={setCounter}
          />
        ))}
      </ul>
    </>
  );
}

import styles from "./Card.module.css";

// Import packages
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Import components
import ButtonStar from "../Buttons/ButtonStar";

export default function Card({
  thumbnail,
  name,
  description,
  favorites,
  token,
  id,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  // Pour les comics le name est égale au title
  useEffect(() => {
    if (token && favorites.includes(id)) {
      setIsFavorite(true);
    }
  }, []);

  // Gestion image par default
  const imageDefault =
    "https://res.cloudinary.com/dmgktp9qs/image/upload/v1707599775/Marvel/ezbqe3yghr6laoi4ezte.png";
  const imageThumbnail = `${thumbnail.path}.${thumbnail.extension}`;

  // Réduction de la description ---
  let descriptionCut = "";
  if (description && description.length !== 0) {
    for (let index = 0; index < description.length / 1.2; index++) {
      descriptionCut += description[index];
    }
  }
  // ---

  // Animation ---
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  //----------

  return (
    <motion.div variants={item} className={styles.card}>
      {isFavorite && <ButtonStar />}
      <div>
        <img
          src={
            imageThumbnail.includes("image_not_available")
              ? imageDefault
              : imageThumbnail
          }
          alt={`Comic: ${name}`}
          title={`Comic: ${name}`}
        />
        <div className="informations">
          <p>{name}</p>
          <p>{descriptionCut ? descriptionCut + "..." : "No information"}</p>
        </div>
      </div>
    </motion.div>
  );
}

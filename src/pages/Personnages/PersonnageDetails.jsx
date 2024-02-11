// Import CSS
import styles from "./PersonnageDetails.module.css";

// Import packages
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Import components --
import Card from "../../components/Card/Card";
import ButtonsFavorites from "../../components/Buttons/ButtonsFavorites";

export default function PersonnageDetails({
  urlBack,
  myFavorites,
  setMyFavorites,
}) {
  const { characterId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState(); // Données sur le super-héros
  const [listComicsOfCharacter, setListComicsOfCharacter] = useState([]); // Liste des comics
  const [thumbnail, setThumbnail] = useState(""); // Récupérer l'image du super héros

  useEffect(() => {
    getCharacter();
  }, []);

  useEffect(() => {
    isLoading && getDataComics();
  }, [character]);

  const getCharacter = async () => {
    try {
      const { data } = await axios.get(`${urlBack}/character/${characterId}`);
      // const { data } = await axios.get(urlBack + "/character/" + characterId);
      setCharacter(data.data);
      // Créer le chemin de l'image et la stocker
      setThumbnail(
        `${data.data.thumbnail.path}.${data.data.thumbnail.extension}`
      );
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Récupérer les comics ---
  const getDataComics = async () => {
    try {
      const { data } = await axios.get(`${urlBack}/comics/${characterId}`);
      setListComicsOfCharacter(data.data.comics);
    } catch (error) {
      console.log(error.response);
    }
  };

  // Liste des comics ---
  const list = listComicsOfCharacter.map((comic) => (
    <li key={comic._id}>
      <Link to={`/comic/${comic._id}`}>
        <Card
          thumbnail={comic.thumbnail}
          name={comic.title}
          description={comic.description ? comic.description : "No information"}
        />
      </Link>
    </li>
  ));
  // ----

  return (
    <section className={styles["personnage-details"]}>
      <div className={styles["background-character"]}></div>
      <div className="container">
        <div className={styles.bloc}>
          <div className={styles.details}>
            {isLoading ? (
              <p>En chargement...</p>
            ) : (
              <>
                <div className={styles["character"]}>
                  <img
                    src={thumbnail}
                    alt={character.name}
                    className={styles["image-character"]}
                  />
                  <ButtonsFavorites
                    item="character"
                    character={character}
                    myFavorites={myFavorites}
                    setMyFavorites={setMyFavorites}
                  />
                </div>
                <aside>
                  <div className={styles["details-character"]}>
                    <h1>{character.name}</h1>
                    <p>{character.description}</p>
                  </div>
                  <div className={styles["list-comics"]}>
                    <ul>{list}</ul>
                  </div>
                </aside>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

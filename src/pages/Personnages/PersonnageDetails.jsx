// Import CSS
import styles from "./PersonnageDetails.module.css";

// Import packages
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Import components --
import Card from "../../components/Card/Card";
import ButtonsFavorites from "../../components/Buttons/ButtonsFavorites";
import Loading from "../../components/Loading/Loading";

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

  // Gestion image par default ---
  const imageDefault =
    "https://res.cloudinary.com/dmgktp9qs/image/upload/v1707599775/Marvel/ezbqe3yghr6laoi4ezte.png";
  // ---

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
              <Loading secondaryColor="#fff" />
            ) : (
              <>
                <div className={styles["character"]}>
                  <img
                    src={
                      thumbnail.includes("image_not_available")
                        ? imageDefault
                        : thumbnail
                    }
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
                    <p>
                      {character.description
                        ? character.description
                        : "No information"}
                    </p>
                  </div>
                  <div className={styles["list-comics"]}>
                    <h2>{list.length > 0 && "Comics"}</h2>
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

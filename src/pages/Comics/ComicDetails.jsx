// Import packages --
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Import CSS
import styles from "./ComicDetails.module.css";

// Import components
import ButtonsFavorites from "../../components/Buttons/ButtonsFavorites";
import Loading from "../../components/Loading/Loading";

export default function ComicDetails({ urlBack, myFavorites, setMyFavorites }) {
  const { comicId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [comic, setComic] = useState(); // Données sur le comic
  const [thumbnail, setThumbnail] = useState(""); // Récupérer l'image du super héros

  useEffect(() => {
    getComic();
  }, []);

  const getComic = async () => {
    try {
      const { data } = await axios.get(`${urlBack}/comic/${comicId}`);
      setComic(data.data);
      // Créer le chemin de l'image et la stocker
      setThumbnail(
        `${data.data.thumbnail.path}.${data.data.thumbnail.extension}`
      );
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className={styles["comic-details"]}>
      <div className={styles["background-comic"]}></div>
      <div className="container">
        <div className={styles.bloc}>
          <div className={styles.details}>
            {isLoading ? (
              <Loading secondaryColor="#fff" />
            ) : (
              <>
                <div className={styles["comic"]}>
                  <img
                    className={styles["image-comic"]}
                    src={thumbnail}
                    alt={comic.title}
                  />
                  <ButtonsFavorites
                    item="comic"
                    comic={comic}
                    myFavorites={myFavorites}
                    setMyFavorites={setMyFavorites}
                  />
                </div>
                <aside>
                  <div className={styles["details-comic"]}>
                    <h1>{comic.title}</h1>
                    <p>{comic.description}</p>
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

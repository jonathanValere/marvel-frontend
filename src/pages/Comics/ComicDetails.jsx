// Import packages --
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Import CSS
import styles from "./ComicDetails.module.css";

// Import components
import ButtonsFavorites from "../../components/Buttons/ButtonsFavorites";
import Loading from "../../components/Loading/Loading";
import ButtonStar from "../../components/Buttons/ButtonStar";

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
    <section className="section-details-item">
      <div className="section-details-item-background"></div>
      <div className="container">
        <div className="section-details-item-bloc">
          <div className="all-details">
            {isLoading ? (
              <Loading secondaryColor="#fff" />
            ) : (
              <>
                <div>
                  <img
                    className="item-image"
                    src={thumbnail}
                    alt={comic.title}
                  />
                  {!myFavorites[comic._id] && (
                    <ButtonsFavorites
                      item="comic"
                      comic={comic}
                      myFavorites={myFavorites}
                      setMyFavorites={setMyFavorites}
                    />
                  )}
                </div>
                <aside>
                  <div className="details-item">
                    <div className="details-title">
                      <h1>{comic.title}</h1>
                      {myFavorites[comic._id] && (
                        <ButtonStar
                          setMyFavorites={setMyFavorites}
                          id={comicId}
                        />
                      )}
                    </div>
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

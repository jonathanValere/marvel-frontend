// Import packages --
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Import components
import Loading from "../../components/Loading/Loading";
import ButtonStar from "../../components/Buttons/ButtonStar";

export default function ComicDetails({ urlBack, setMyFavorites, token }) {
  const { comicId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [comic, setComic] = useState(); // Données sur le comic
  const [thumbnail, setThumbnail] = useState(""); // Récupérer l'image du super héros

  const [favoritesUser, setFavoritesUser] = useState([]);
  const [toggle, setToggle] = useState(false); // Permet de remonter le composant après ajout ou suppression des favoris
  const navigate = useNavigate();

  // Gestion image par default ---
  const imageDefault =
    "https://res.cloudinary.com/dmgktp9qs/image/upload/v1707599775/Marvel/ezbqe3yghr6laoi4ezte.png";

  // ---

  useEffect(() => {
    getComic();
    getFavoritesUser();
  }, [toggle]);

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

  const getFavoritesUser = async () => {
    if (token) {
      try {
        const response = await axios.get(`${urlBack}/user/${token}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavoritesUser(response.data.favorites.comics);
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  //---------
  const addToFavorites = async () => {
    if (token) {
      try {
        const { data } = await axios.post(
          `${urlBack}/favoris/comics/add/${comicId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.favorites.comics) {
          setToggle(!toggle);
          console.log(`${comic.title} added to favorites`);
        } else {
          console.log("Something wrong!");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/login");
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
                    src={
                      thumbnail.includes("image_not_available")
                        ? imageDefault
                        : thumbnail
                    }
                    alt={comic.title}
                  />
                  {!favoritesUser.includes(comicId) && (
                    <button
                      onClick={addToFavorites}
                      className="button-add-favorites"
                    >
                      Add to my favorites
                    </button>
                  )}
                </div>
                <aside>
                  <div className="details-item">
                    <div className="details-title">
                      <h1>{comic.title}</h1>
                      {favoritesUser.includes(comicId) && (
                        <ButtonStar
                          setMyFavorites={setMyFavorites}
                          id={comicId}
                          token={token}
                          toggle={toggle}
                          setToggle={setToggle}
                          item="comics"
                          urlBack={urlBack}
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

// Import packages
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Import components --
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import ButtonStar from "../../components/Buttons/ButtonStar";
import Button from "../../components/Buttons/Button";

export default function PersonnageDetails({ urlBack, token }) {
  const { characterId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState(); // Données sur le super-héros
  const [listComicsOfCharacter, setListComicsOfCharacter] = useState([]); // Liste des comics
  const [thumbnail, setThumbnail] = useState(""); // Récupérer l'image du super héros
  const [favoritesUser, setFavoritesUser] = useState([]);
  const [toggle, setToggle] = useState(false); // Permet de remonter le composant après ajout ou suppression des favoris

  // Gestion image par default ---
  const imageDefault =
    "https://res.cloudinary.com/dmgktp9qs/image/upload/v1707599775/Marvel/ezbqe3yghr6laoi4ezte.png";
  // ---

  useEffect(() => {
    getCharacter();
    getFavoritesUser();
  }, [toggle]);

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

  const getFavoritesUser = async () => {
    if (token) {
      try {
        const response = await axios.get(`${urlBack}/user/${token}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavoritesUser(response.data.favorites.characters);
      } catch (error) {
        console.log(error.response);
      }
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
    <section className="section-details-item">
      <div className="section-details-item-background"></div>
      <div className="container">
        <div className="section-details-item-bloc">
          <div className="all-details">
            {isLoading ? (
              <Loading secondaryColor="#fff" />
            ) : (
              <>
                <div className="image-and-btnAdd">
                  <img
                    src={
                      thumbnail.includes("image_not_available")
                        ? imageDefault
                        : thumbnail
                    }
                    alt={character.name}
                    className="item-image"
                  />
                  {!favoritesUser.includes(characterId) && (
                    <Button
                      id={characterId}
                      token={token}
                      text="Add to my favorites"
                      urlBack={urlBack}
                      item="characters"
                      toggle={toggle}
                      setToggle={setToggle}
                    />
                  )}
                </div>
                <aside>
                  <div className="details-item">
                    <div className="details-title">
                      <h1>{character.name}</h1>
                      {/* Si character fait partie des favoris, afficher étoile */}
                      {favoritesUser.includes(characterId) && (
                        <ButtonStar
                          id={characterId}
                          token={token}
                          toggle={toggle}
                          setToggle={setToggle}
                          item="characters"
                          urlBack={urlBack}
                        />
                      )}
                    </div>
                    <p>
                      {character.description
                        ? character.description
                        : "No information"}
                    </p>
                  </div>
                  <div className="list-comics">
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

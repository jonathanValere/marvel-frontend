// Import packages --
import { useEffect, useState } from "react";
import axios from "axios";

// Import CSS
import styles from "./Favoris.module.css";

// Import components
import PartFavorite from "../../components/PartFavorite/PartFavorite";
import Loading from "../../components/Loading/Loading";

export default function Favoris({ urlBack, token }) {
  // const [favoris, setFavoris] = useState(Cookies.get() || null); // Liste des favoris
  // Pourquoi mettre dans un state ????!!! Ca fonctionne dans une variable classique

  const [dataCharacters, setDataCharacters] = useState([]); // Array qui contiendra uniquement toutes les données des characters
  const [dataComics, setDataComics] = useState([]); // Array qui contiendra uniquement toutes les données des comics
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFavorites();
  }, []);
  // Obtenir tous les favoris --
  const getFavorites = async () => {
    // let dataCharactersCopy = [...dataCharacters];
    // let dataComicsCopy = [...dataComics];
    try {
      const { data } = await axios.get(`${urlBack}/favoris`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setDataCharacters(data.favorites.characters);
      setDataComics(data.favorites.comics);

      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  // --

  return (
    <section className={styles["section-favorites"]}>
      <div className="container">
        <div className={styles["bloc-favorites"]}>
          <h1>My favorites</h1>
          {isLoading ? (
            <Loading secondaryColor="#fff" />
          ) : (
            <>
              <PartFavorite
                namePart="Characters"
                item="character"
                datas={dataCharacters}
                urlBack={urlBack}
                token={token}
              />
              <PartFavorite
                namePart="Comics"
                item="comic"
                datas={dataComics}
                urlBack={urlBack}
                token={token}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

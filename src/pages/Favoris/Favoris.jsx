// Import packages --
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// Import components
import ItemFavorite from "../../components/ItemFavorite/ItemFavorite";

export default function Favoris({ urlBack }) {
  const [favoris, setFavoris] = useState(Cookies.get() || null); // Liste des favoris
  const [dataCharacters, setDataCharacters] = useState([]); // Array qui contiendra uniquement toutes les données des characters
  const [dataComics, setDataComics] = useState([]); // Array qui contiendra uniquement toutes les données des comics
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFavorites();
  }, []);

  // Obtenir tous les favoris --
  const getFavorites = async () => {
    const dataCharactersCopy = [...dataCharacters];
    const dataComicsCopy = [...dataComics];
    try {
      for (let key in favoris) {
        const item = Cookies.get(key);
        // console.log(item); // name ou title
        if (item.includes("character")) {
          const { data } = await axios.get(`${urlBack}/character/${key}`);
          dataCharactersCopy.push(data.data);
          setDataCharacters(dataCharactersCopy);
        }

        if (item.includes("comic")) {
          const { data } = await axios.get(`${urlBack}/comic/${key}`);
          dataComicsCopy.push(data.data);
          setDataComics(dataComicsCopy);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  // --

  console.log("dataChar >>>", dataCharacters);

  return isLoading ? (
    <p>En chargement...</p>
  ) : (
    <div>
      <h1>My favorites</h1>
      <h2>Characters</h2>
      <ul>
        {dataCharacters.map((character) => (
          <ItemFavorite
            key={character._id}
            item="character"
            character={character}
            setFavoris={setFavoris}
          />
        ))}
      </ul>
      <h2>Comics</h2>
      <ul>
        {dataComics.map((comic) => (
          <ItemFavorite
            key={comic._id}
            item="comic"
            comic={comic}
            setFavoris={setFavoris}
          />
        ))}
      </ul>
    </div>
  );
}

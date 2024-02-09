// Import packages
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Import components --
import Card from "../../components/Card/Card";

export default function PersonnageDetails({ urlBack }) {
  const { characterId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
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
        data.data.thumbnail.path + "." + data.data.thumbnail.extension
      );
      setIsLoading(true);
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
      <Card
        thumbnail={comic.thumbnail}
        name={comic.title}
        description={comic.description ? comic.description : "No information"}
      />
    </li>
  ));
  // ----

  return (
    <section>
      <div>
        {!isLoading ? (
          <p>En chargement...</p>
        ) : (
          <>
            <img src={thumbnail} alt={character.name} />
            <aside>
              <div>
                <p>{character.name}</p>
                <p>{character.description}</p>
              </div>
              <div>
                <ul>{list}</ul>
              </div>
            </aside>
          </>
        )}
      </div>
    </section>
  );
}

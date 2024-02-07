// Import packages
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PersonnageDetails({ urlBack }) {
  const { characterId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [character, setCharacter] = useState(); // Données sur le super-héros
  // A FAIRE !!!!!!!!!!
  const [comics, setComics] = useState([]); // Liste des comics
  // ---------
  const [thumbnail, setThumbnail] = useState(""); // Récupérer l'image du super héros

  useEffect(() => {
    getCharacter();
  }, []);

  const getCharacter = async () => {
    try {
      const { data } = await axios.get(urlBack + "/character/" + characterId);
      setCharacter(data.data);
      setComics(data.data.comics);
      setThumbnail(
        data.data.thumbnail.path + "." + data.data.thumbnail.extension
      );
      setIsLoading(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log("Character >>>>", character);
  console.log("Comics >>>>", comics);
  console.log("Thumbnail >>>>", thumbnail);
  return (
    <section>
      <div>
        {!isLoading ? (
          <p>En chargement...</p>
        ) : (
          <>
            <img src={thumbnail} alt={character.name} />
            <aside>
              <p>{character.name}</p>
              <p>{character.description}</p>
              <div>{"comics"}</div>
            </aside>
          </>
        )}
      </div>
    </section>
  );
}

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
    isLoading && getDataComics(character.comics);
  }, [character]);

  const getCharacter = async () => {
    try {
      const { data } = await axios.get(urlBack + "/character/" + characterId);
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
  const getDataComics = async (tab) => {
    const listComicsOfCharacterCopy = [...listComicsOfCharacter];
    try {
      // Boucle sur le tableau contenant les Id des comics
      for (let index = 0; index < tab.length; index++) {
        // Récupérer l'Id
        const comicId = tab[index];
        //Faire une requête pour récupérer le comic
        const response = await axios.get(urlBack + "/comic/" + comicId);
        const comic = response.data.data;
        // Ajouter le comic à la copie du tableau
        listComicsOfCharacterCopy.push(comic);
        // Mettre à jour la liste des comics du character
        setListComicsOfCharacter(listComicsOfCharacterCopy);
      }
    } catch (error) {
      console.log(error.message);
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

  // console.log("Character >>>>", character);
  // console.log("list >>>>", listComicsOfCharacter);

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

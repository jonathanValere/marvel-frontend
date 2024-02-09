// Import packages --
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ComicDetails({ urlBack }) {
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
    <div>
      {isLoading ? (
        <p>En chargement...</p>
      ) : (
        <>
          <img src={thumbnail} alt={comic.title} />
          <aside>
            <div>
              <p>{comic.name}</p>
              <p>{comic.description}</p>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}

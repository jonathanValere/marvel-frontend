// Import packages
import axios from "axios";
import { useState, useEffect } from "react";

//Import components
import Card from "../../components/Card/Card";

export default function Comics({ dataComics, setDataComics, urlBack }) {
  const [listComics, setListComics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Récupération de données sur les comics --
  useEffect(() => {
    getDataComics();
  }, []);

  const getDataComics = async () => {
    try {
      const response = await axios.get(urlBack + "/comics");
      setDataComics(response.data.data);
      setListComics(response.data.data.results);
      setIsLoading(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  // -----
  console.log("Data >>>", dataComics);
  console.log("List >>>", listComics);
  return !isLoading ? (
    <p>En chargement...</p>
  ) : (
    <div>
      {listComics.map((com) => (
        <Card
          key={com._id}
          thumbnail={com.thumbnail}
          name={com.title}
          description={com.description}
        />
      ))}
    </div>
  );
}

// Import packages
import axios from "axios";
import { useState, useEffect } from "react";

//Import components
import Card from "../../components/Card/Card";
import SearchBar from "../../components/Searchbar/Searchbar";

export default function Comics({ urlBack }) {
  const [isLoading, setIsLoading] = useState(false);
  const [dataComics, setDataComics] = useState({});
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Récupération des données sur les comics --
  useEffect(() => {
    getDataComics();
  }, []);

  const getDataComics = async () => {
    try {
      const { data } = await axios.get(urlBack + "/comics");
      setDataComics(data.data);
      setIsLoading(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  // -----

  // --

  console.log("dataComics >>>", dataComics);

  return !isLoading ? (
    <p>En chargement...</p>
  ) : (
    <section>
      <SearchBar item="comics" setSearch={setSearch} search={search} />
      {currentPage}
      <button>Précédent</button>
      <button>Suivant</button>
      <div>
        {dataComics.results
          .filter((comic) => comic.title.toLowerCase().includes(search))
          .map((com) => (
            <Card
              key={com._id}
              thumbnail={com.thumbnail}
              name={com.title}
              description={com.description}
            />
          ))}
      </div>
    </section>
  );
}

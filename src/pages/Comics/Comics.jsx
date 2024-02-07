// Import packages
import axios from "axios";
import { useState, useEffect } from "react";

//Import components
import Card from "../../components/Card/Card";
import SearchBar from "../../components/Searchbar/Searchbar";

export default function Comics({ dataComics, setDataComics, urlBack }) {
  const [listComics, setListComics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

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
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
  };

  return !isLoading ? (
    <p>En chargement...</p>
  ) : (
    <section>
      <SearchBar item="Comics" handleSearch={handleSearch} search={search} />
      <div>
        {listComics
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

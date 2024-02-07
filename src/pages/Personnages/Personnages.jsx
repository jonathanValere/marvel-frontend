// import packages
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Import components --
import Card from "../../components/Card/Card";
import SearchBar from "../../components/Searchbar/Searchbar";

export default function Personnages({ urlBack }) {
  const [characters, setCharacters] = useState([]); // List of characters
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllCharacters();
  }, []);

  const getAllCharacters = async () => {
    try {
      const { data } = await axios.get(`${urlBack}/characters`);
      setCharacters(data.data.results);
      setIsLoading(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
  };

  console.log(search);
  return !isLoading ? (
    <p>En chargement...</p>
  ) : (
    <section>
      <SearchBar item="Character" handleSearch={handleSearch} search={search} />
      <div>
        {characters
          .filter((character) => character.name.toLowerCase().includes(search))
          .map((character) => (
            <Link to={`/character/${character._id}`} key={character._id}>
              <Card
                thumbnail={character.thumbnail}
                name={character.name}
                description={character.description}
              />
            </Link>
            // <Personnage character={character} key={character._id} />
          ))}
      </div>
    </section>
  );
}

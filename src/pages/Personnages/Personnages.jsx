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

  // Liste des characters ---
  const listCharacters = characters
    .filter((character) => character.name.toLowerCase().includes(search))
    .map((character) => (
      <Link to={`/character/${character._id}`} key={character._id}>
        <Card
          thumbnail={character.thumbnail}
          name={character.name}
          description={character.description}
        />
      </Link>
    ));
  // ---

  return !isLoading ? (
    <p>En chargement...</p>
  ) : (
    <section>
      <SearchBar item="character" setSearch={setSearch} search={search} />
      <div>{listCharacters}</div>
    </section>
  );
}

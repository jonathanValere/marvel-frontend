// import packages
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Import components --
import Card from "../../components/Card/Card";

export default function Personnages({ urlBack }) {
  const [characters, setCharacters] = useState([]); // List of characters
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllCharacters();
  }, []);

  const getAllCharacters = async () => {
    try {
      const { data } = await axios.get(`${urlBack}/characters`);
      setCharacters(data.data.results);
      console.log(data);
      setIsLoading(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  //   console.log(characters);
  return !isLoading ? (
    <p>En chargement...</p>
  ) : (
    <section>
      <div>
        {characters.map((character) => (
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

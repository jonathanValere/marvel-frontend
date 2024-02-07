import { useState, useEffect } from "react";
import axios from "axios";

// Import components --
import Personnage from "../../components/personnage/Personnage";

export default function HomePage({ urlBack }) {
  const [characters, setCharacters] = useState([]); // List of characters
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    getAllCharacters();
  }, []);

  const getAllCharacters = async () => {
    try {
      const { data } = await axios.get(`${urlBack}/characters`);
      setCharacters(data.data.results);
      setisLoading(true);
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
          <Personnage character={character} key={character._id} />
          //   <div key={character._id}>
          //     <img
          //       src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          //       width={200}
          //       height={250}
          //     />
          //     <p>{character.name}</p>
          //     <p>{character.description}</p>
          //   </div>
        ))}
      </div>
    </section>
  );
}

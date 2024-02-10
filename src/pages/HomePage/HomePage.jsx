// import packages
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Import components --
import Card from "../../components/Card/Card";
import Banner from "../../components/Banner/Banner";

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
    <>
      <Banner />
      <section>
        <ul>
          {characters.map((character) => (
            <li key={character._id}>
              <Link to={`/character/${character._id}`}>
                <Card
                  thumbnail={character.thumbnail}
                  name={character.name}
                  description={character.description}
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

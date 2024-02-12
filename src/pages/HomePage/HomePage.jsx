// import packages
import { useState, useEffect } from "react";
import axios from "axios";

// Import components --
import Banner from "../../components/Banner/Banner";
import MainHomepage from "../../components/MainHomepage/MainHomepage";

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

  return !isLoading ? (
    <p>En chargement...</p>
  ) : (
    <>
      <Banner />
      <MainHomepage characters={characters} />
    </>
  );
}

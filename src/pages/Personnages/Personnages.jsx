// Import styles
import styles from "./Personnages.module.css";

// import packages
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

// Import components --
import Character from "../../components/Character/Character";
import LayoutItems from "../../components/Layouts/LayoutItems";
import Loading from "../../components/Loading/Loading";

export default function Personnages({ urlBack, token }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [characters, setCharacters] = useState([]); // List of characters
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("name") || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(searchParams.get("skip") || 0);
  const [countTotal, setCountTotal] = useState(1); // Total de Personnages, sert à calculer le nombre de page
  const [favoritesCharacters, setFavoritesCharacters] = useState([]);

  useEffect(() => {
    getAllCharacters();
    if (token) {
      checkIsFavoris();
    }
  }, [currentPage, search]);

  const getAllCharacters = async () => {
    try {
      const { data } = await axios.get(
        `${urlBack}/characters?page=${currentPage}&name=${search}`
      );
      setCharacters(data.data);
      setCountTotal(data.data.count);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

  const checkIsFavoris = async () => {
    try {
      const { data } = await axios.get(`${urlBack}/favoris`, {
        headers: { authorization: "Bearer " + token },
      });
      setFavoritesCharacters(data.favorites.characters);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="section-all-items">
      <div className="container">
        <div className="section-all-items-bloc">
          <h1>Characters</h1>
          {isLoading ? (
            <Loading secondaryColor="#000" />
          ) : (
            <LayoutItems
              title="Characters"
              countTotal={countTotal}
              setSearch={setSearch}
              setSearchParams={setSearchParams}
              skip={skip}
              setSkip={setSkip}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              searchParams={searchParams}
            >
              {characters.results
                .filter((character) =>
                  character.name.toLowerCase().includes(search)
                )
                .map((character) => (
                  <Character
                    key={character._id}
                    character={character}
                    token={token}
                    favorites={favoritesCharacters}
                  />
                ))}
            </LayoutItems>
          )}
        </div>
      </div>
    </section>
  );
}

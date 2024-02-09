// import packages
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

// Import components --
import SearchBar from "../../components/Searchbar/Searchbar";
import Pagination from "../../components/Pagination/Pagination";
import Character from "../../components/Character/Character";

export default function Personnages({ urlBack, myFavorites, setMyFavorites }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [characters, setCharacters] = useState([]); // List of characters
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(searchParams.get("skip") || 0);
  const [countTotal, setCountTotal] = useState(1); // Total de Personnages, sert à calculer le nombre de page

  useEffect(() => {
    getAllCharacters();
  }, [skip]);

  const getAllCharacters = async () => {
    try {
      const { data } = await axios.get(`${urlBack}/characters?skip=${skip}`);
      setCharacters(data.data);
      setCountTotal(data.data.count);
      setIsLoading(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return !isLoading ? (
    <p>En chargement...</p>
  ) : (
    <section>
      <SearchBar item="character" setSearch={setSearch} search={search} />
      <p>
        <span>{countTotal} characters found</span>
      </p>
      <Pagination
        countTotal={countTotal}
        currentPage={currentPage}
        skip={skip}
        setSkip={setSkip}
        setSearchParams={setSearchParams}
        setCurrentPage={setCurrentPage}
      />
      <div>
        {characters.results
          .filter((character) => character.name.toLowerCase().includes(search))
          .map((character) => (
            <Character
              key={character._id}
              character={character}
              myFavorites={myFavorites}
              setMyFavorites={setMyFavorites}
            />
          ))}
      </div>
    </section>
  );
}

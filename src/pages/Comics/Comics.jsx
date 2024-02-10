// Import packages
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

// Import components
import SearchBar from "../../components/Searchbar/Searchbar";
import Pagination from "../../components/Pagination/Pagination";
import Comic from "../../components/Comic/Comic";

export default function Comics({ urlBack, myFavorites, setMyFavorites }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [dataComics, setDataComics] = useState({});
  //searchParams.get("title") || "" permet de prendre la valeur dans l'URL
  const [search, setSearch] = useState(searchParams.get("title") || "");
  const [currentPage, setCurrentPage] = useState(searchParams.get("skip") || 1);
  const [skip, setSkip] = useState(searchParams.get("skip") || 0);
  const [countTotal, setCountTotal] = useState(0); // Total de Comics, sert à calculer le nombre de page

  // Récupération des données sur les comics --
  useEffect(() => {
    getDataComics();
  }, [skip, search]);

  // Récupérer tous les comics
  const getDataComics = async () => {
    try {
      const { data } = await axios.get(
        `${urlBack}/comics?skip=${skip}&title=${search}`
      );
      setCountTotal(data.data.count);
      setDataComics(data.data);
      setIsLoading(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  // -----

  return !isLoading ? (
    <p>En chargement...</p>
  ) : (
    <section>
      <SearchBar
        item="comics"
        setSearch={setSearch}
        search={search}
        setSearchParams={setSearchParams}
      />
      <p>
        <span>{countTotal} comics found</span>
      </p>
      <Pagination
        currentPage={currentPage}
        countTotal={countTotal}
        skip={skip}
        setSkip={setSkip}
        setSearchParams={setSearchParams}
        setCurrentPage={setCurrentPage}
      />
      <div>
        {dataComics.results
          .filter((comic) => comic.title.toLowerCase().includes(search))
          .sort()
          .map((comic) => (
            <Comic
              key={comic._id}
              comic={comic}
              setMyFavorites={setMyFavorites}
              myFavorites={myFavorites}
            />
          ))}
      </div>
    </section>
  );
}

// Import packages
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

// Import CSS
import styles from "./Comics.module.css";

// Import components
import SearchBar from "../../components/Searchbar/Searchbar";
import Pagination from "../../components/Pagination/Pagination";
import Comic from "../../components/Comic/Comic";
import LayoutItems from "../../components/Layouts/LayoutItems";

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
  }, [currentPage, search]);

  // Récupérer tous les comics
  const getDataComics = async () => {
    try {
      const { data } = await axios.get(
        `${urlBack}/comics?page=${currentPage}&title=${search}`
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
    <LayoutItems
      title="Comics"
      countTotal={countTotal}
      setSearch={setSearch}
      setSearchParams={setSearchParams}
      skip={skip}
      setSkip={setSkip}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    >
      <ul className={styles["list-comics"]}>
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
      </ul>
    </LayoutItems>
  );
}

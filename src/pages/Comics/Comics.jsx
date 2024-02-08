// Import packages
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

//Import components
import Card from "../../components/Card/Card";
import SearchBar from "../../components/Searchbar/Searchbar";
import Pagination from "../../components/Pagination/Pagination";

export default function Comics({ urlBack }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [dataComics, setDataComics] = useState({});
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(searchParams.get("skip") || 0);
  const [countTotal, setCountTotal] = useState(0); // Total de Comics, sert à calculer le nombre de page

  // Récupération des données sur les comics --
  useEffect(() => {
    getDataComics();
  }, [skip]);

  const getDataComics = async () => {
    try {
      const { data } = await axios.get(`${urlBack}/comics?skip=${skip}`);
      setCountTotal(data.data.count);
      setDataComics(data.data);
      // console.log(data);
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
        urlBack={urlBack}
      />

      <p>
        <span>
          {currentPage * 100} sur {countTotal} comics
        </span>
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
          .map((com) => (
            <Card
              key={com._id}
              thumbnail={com.thumbnail}
              name={com.title}
              description={com.description}
            />
          ))}
      </div>
    </section>
  );
}

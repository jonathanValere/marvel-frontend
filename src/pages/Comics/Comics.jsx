// Import packages
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

// Import CSS
import styles from "./Comics.module.css";

// Import components
import Comic from "../../components/Comic/Comic";
import LayoutItems from "../../components/Layouts/LayoutItems";
import Loading from "../../components/Loading/Loading";

export default function Comics({ urlBack, token }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [dataComics, setDataComics] = useState({});
  //searchParams.get("title") || "" permet de prendre la valeur dans l'URL
  const [search, setSearch] = useState(searchParams.get("title") || "");
  const [currentPage, setCurrentPage] = useState(searchParams.get("skip") || 1);
  const [skip, setSkip] = useState(searchParams.get("skip") || 0);
  const [countTotal, setCountTotal] = useState(0); // Total de Comics, sert à calculer le nombre de page
  const [favoritesComics, setFavoritesComics] = useState({});

  // Récupération des données sur les comics --
  useEffect(() => {
    getDataComics();
    if (token) {
      checkIsFavoris();
    }
  }, [currentPage, search]);

  // Récupérer tous les comics
  const getDataComics = async () => {
    try {
      const { data } = await axios.get(
        `${urlBack}/comics?page=${currentPage}&title=${search}`
      );
      setCountTotal(data.data.count);
      setDataComics(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkIsFavoris = async () => {
    try {
      const { data } = await axios.get(`${urlBack}/favoris`, {
        headers: { authorization: "Bearer " + token },
      });
      setFavoritesComics(data.favorites.comics);
    } catch (error) {
      console.log(error);
    }
  };
  // -----

  return (
    <section className="section-all-items">
      <div className="container">
        <div className="section-all-items-bloc">
          <h1>Comics</h1>
          {isLoading ? (
            <Loading secondaryColor="#black" />
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
              searchParams={searchParams}
            >
              <ul className="list-items">
                {dataComics.results
                  .filter((comic) => comic.title.toLowerCase().includes(search))
                  .sort()
                  .map((comic) => (
                    <Comic
                      key={comic._id}
                      comic={comic}
                      token={token}
                      favorites={favoritesComics}
                    />
                  ))}
              </ul>
            </LayoutItems>
          )}
        </div>
      </div>
    </section>
  );
}

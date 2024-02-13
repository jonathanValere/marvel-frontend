import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Pagination.module.css";

export default function Pagination({
  countTotal,
  currentPage,
  setSkip,
  setSearchParams,
  setCurrentPage,
}) {
  // Gérer la dernière page
  const maxPage = Math.floor(countTotal / 100 + 1);
  // Gestion de la pagination --
  const handleClickPage = (option) => {
    // La page suivante
    if (option === "next") {
      if (currentPage < maxPage) {
        setSkip((prev) => prev + 100);
        setSearchParams({ page: currentPage + 1 }); //ce qui s'affiche dans l'url
        setCurrentPage((prev) => prev + 1);
      }
    }
    // La page précédente
    if (option === "previous") {
      if (currentPage > 1) {
        setSkip((prev) => prev - 100);
        setSearchParams({ page: currentPage - 1 }); //ce qui s'affiche dans l'url
        setCurrentPage((prev) => prev - 1);
      }
    }
  };
  // ----

  return (
    countTotal !== 0 && (
      <div className={styles.pagination}>
        <button
          onClick={() => handleClickPage("previous")}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon="chevron-left" />
        </button>
        <span className={styles.counter}>
          {currentPage < 10 ? `0${currentPage}` : currentPage}
          <span>/{maxPage === 1 ? `0${maxPage}` : maxPage}</span>
        </span>
        <button
          onClick={() => handleClickPage("next")}
          disabled={currentPage === maxPage}
        >
          <FontAwesomeIcon icon="chevron-right" />
        </button>
      </div>
    )
  );
}

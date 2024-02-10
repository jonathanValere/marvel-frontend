export default function Pagination({
  countTotal,
  currentPage,
  skip,
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
    <div>
      <button
        onClick={() => handleClickPage("previous")}
        disabled={currentPage === 1}
      >
        Précédent
      </button>
      <span>{`Page ${currentPage}/${maxPage}`}</span>
      <button
        onClick={() => handleClickPage("next")}
        disabled={currentPage === maxPage}
      >
        Suivant
      </button>
    </div>
  );
}

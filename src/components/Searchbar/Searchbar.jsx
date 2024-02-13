import styles from "./Searchbar.module.css";

export default function SearchBar({
  item,
  search,
  setSearch,
  setSearchParams,
  setCurrentPage,
}) {
  // Gestion de la recherche ----
  const handleSearch = (event) => {
    setCurrentPage(1);
    const value = event.target.value.toLowerCase();
    setSearch(value);
    // Gestion des query dans l'URL --
    if (value.length !== 0) {
      if (item === "comics") {
        // Comics
        setSearchParams({ title: value });
      } else {
        // Character
        setSearchParams({ name: value });
      }
    } else {
      // Efface la query de l'URL
      setSearchParams("");
    }
  };

  return (
    <div className={styles.searchbar}>
      <input
        type="search"
        placeholder={`Search ${item}`}
        value={search}
        onChange={(event) => handleSearch(event)}
      />
    </div>
  );
}

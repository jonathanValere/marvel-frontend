export default function SearchBar({
  item,
  search,
  setSearch,
  setSearchParams,
}) {
  // Gestion de la recherche ----
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    // Gestion des query dans l'URL --
    if (value.length !== 0) {
      if (item === "comics") {
        // COmics
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
    <div>
      <input
        type="search"
        placeholder={`Search ${item}`}
        value={search}
        onChange={(event) => handleSearch(event)}
      />
    </div>
  );
}

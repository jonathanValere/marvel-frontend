export default function SearchBar({ item, search, setSearch }) {
  // Gestion de la recherche ----
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
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

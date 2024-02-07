export default function SearchBar({ item, handleSearch, search }) {
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

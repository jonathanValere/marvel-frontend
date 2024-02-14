import styles from "./LayoutItems.module.css";

// Import components
import Pagination from "../Pagination/Pagination";
import SearchBar from "../Searchbar/Searchbar";
import ButtonScroll from "../Buttons/ButtonScroll";

export default function LayoutItems(props) {
  const getName = props.searchParams.get("name");
  const getTitle = props.searchParams.get("title");
  return (
    <>
      <ButtonScroll />
      <div className={styles["bloc-search-pagination"]}>
        <SearchBar
          item={props.title}
          setSearch={props.setSearch}
          search={props.search}
          setSearchParams={props.setSearchParams}
          setCurrentPage={props.setCurrentPage}
          currentPage={props.currentPage}
        />
        <Pagination
          countTotal={props.countTotal}
          currentPage={props.currentPage}
          skip={props.skip}
          setSkip={props.setSkip}
          setSearchParams={props.setSearchParams}
          setCurrentPage={props.setCurrentPage}
        />
      </div>
      <p className={styles.paragraph}>
        {props.countTotal === 0 ? (
          `No matches for "${getName || getTitle}"`
        ) : (
          <>
            <span>{props.countTotal} </span>
            {props.title} found
          </>
        )}
      </p>
      {props.children}
    </>
  );
}

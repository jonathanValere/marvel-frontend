import styles from "./LayoutItems.module.css";

// Import components
import Pagination from "../Pagination/Pagination";
import SearchBar from "../Searchbar/Searchbar";

export default function LayoutItems({ ...props }) {
  return (
    <>
      <div className={styles["bloc-search-pagination"]}>
        <SearchBar
          item={props.title}
          setSearch={props.setSearch}
          search={props.search}
          setSearchParams={props.setSearchParams}
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
        <span>{props.countTotal} </span>
        {props.title} found
      </p>
      {props.children}
    </>
  );
}

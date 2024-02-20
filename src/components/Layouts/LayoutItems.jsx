import styles from "./LayoutItems.module.css";

// Import packages
import { motion } from "framer-motion";

// Import components
import Pagination from "../Pagination/Pagination";
import SearchBar from "../Searchbar/Searchbar";
import ButtonScroll from "../Buttons/ButtonScroll";

export default function LayoutItems(props) {
  const getName = props.searchParams.get("name");
  const getTitle = props.searchParams.get("title");

  // Animation ---
  const containerAnimation = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  // ----

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
      <motion.ul
        className="list-items"
        variants={containerAnimation}
        initial="hidden"
        animate="visible"
      >
        {props.children}
      </motion.ul>
    </>
  );
}

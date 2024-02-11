import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./ButtonScroll.module.css";

export default function ButtonScroll() {
  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <FontAwesomeIcon
      icon="chevron-up"
      onClick={handleScrollUp}
      className={styles["button-scroll"]}
    />
  );
}

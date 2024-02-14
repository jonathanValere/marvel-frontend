// Import CSS
import styles from "./LayoutConnexion.module.css";

export default function LayoutConnexion({ children }) {
  return (
    <section className={styles["section-signup-page"]}>
      <div className={styles["bloc-image"]}></div>
      <div className={styles["bloc-form"]}>{children}</div>
    </section>
  );
}

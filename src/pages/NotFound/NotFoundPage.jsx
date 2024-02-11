// Image
import LogoLarge from "../../assets/img/marvel_logo_large.png";

// Import CSS
import styles from "./NotFoundPage.module.css";

export default function NotFountPage() {
  return (
    <section className={styles["page-not-found"]}>
      <div className="container">
        <div className={styles.bloc}>
          <img src={LogoLarge} alt="Logo Marvel Format XL" height={170} />
          <p>Page not found...</p>
        </div>
      </div>
    </section>
  );
}

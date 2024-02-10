import BannerImg from "../../assets/img/banner-homepage.jpg";

import styles from "./Banner.module.css";

export default function Banner() {
  return (
    <section className={styles.banner}>
      <div className={styles.information}>
        <h1>L'univers de Marvel</h1>
        <p>Retrouvez tous vos super-héros !</p>
      </div>
      {/* <img src={BannerImg} /> */}
    </section>
  );
}

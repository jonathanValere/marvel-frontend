import styles from "./MainHomepage.module.css";

// Import packages
import { Link } from "react-router-dom";

// Import Components
import Card from "../Card/Card";

export default function MainHomepage({ ...props }) {
  return (
    <section className={styles.mainHomepage}>
      <div className="container">
        <div className={styles.bloc}>
          <div className={styles["title-bloc"]}>
            <h2>
              <span>|</span> Characters
            </h2>
            <Link to="/characters" className={styles["view-all"]}>
              View all
            </Link>
          </div>
          <ul className={styles["list-characters"]}>
            {props.characters.map((character) => (
              <li key={character._id} className={styles.card}>
                <Link to={`/character/${character._id}`}>
                  <Card
                    thumbnail={character.thumbnail}
                    name={character.name}
                    description={character.description}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

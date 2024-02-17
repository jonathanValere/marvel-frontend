// Import components
import Card from "../Card/Card";
import { Link } from "react-router-dom";

export default function Comic({ comic, token, favorites }) {
  return (
    <li>
      <Link to={`/comic/${comic._id}`}>
        <Card
          key={comic._id}
          id={comic._id}
          thumbnail={comic.thumbnail}
          name={comic.title}
          description={comic.description}
          token={token}
          favorites={favorites}
        />
      </Link>
    </li>
  );
}

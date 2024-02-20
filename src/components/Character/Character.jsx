// Import packages
import { Link } from "react-router-dom";

// Import components
import Card from "../Card/Card";

export default function Character({ character, favorites, token }) {
  return (
    <li>
      <Link to={`/character/${character._id}`}>
        <Card
          id={character._id}
          thumbnail={character.thumbnail}
          name={character.name}
          description={character.description}
          token={token}
          favorites={favorites}
        />
      </Link>
    </li>
  );
}

// Import packages
import { Link } from "react-router-dom";
// import Cookies from "js-cookie";

// Import components
import Card from "../Card/Card";

export default function Character({ character, myFavorites, setMyFavorites }) {
  return (
    <li>
      <Link to={`/character/${character._id}`}>
        <Card
          id={character._id}
          thumbnail={character.thumbnail}
          name={character.name}
          description={character.description}
        />
      </Link>
    </li>
  );
}

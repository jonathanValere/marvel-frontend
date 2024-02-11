// Import packages
import { Link } from "react-router-dom";
// import Cookies from "js-cookie";

// Import components
import Card from "../Card/Card";
import ButtonsFavorites from "../Buttons/ButtonsFavorites";

export default function Character({ character, myFavorites, setMyFavorites }) {
  return (
    <li>
      <Link to={`/character/${character._id}`}>
        <Card
          thumbnail={character.thumbnail}
          name={character.name}
          description={character.description}
        />
      </Link>
      <ButtonsFavorites
        item="character"
        character={character}
        setMyFavorites={setMyFavorites}
        myFavorites={myFavorites}
      />
    </li>
  );
}

// Import packages
import { Link } from "react-router-dom";
import Card from "../Card/Card";

export default function Personnage({ character }) {
  return (
    <Link to={`/character/${character._id}`}>
      <Card
        thumbnail={character.thumbnail}
        name={character.name}
        description={character.description}
      />
    </Link>
  );
}

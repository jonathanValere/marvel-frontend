import { Link } from "react-router-dom";

export default function Personnage({ character }) {
  console.log(character);
  return (
    <Link to={`/character/${character._id}`}>
      <div>
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          width={200}
          height={250}
        />
        <p>{character.name}</p>
        <p>{character.description}</p>
      </div>
    </Link>
  );
}

// Import components
import Card from "../Card/Card";
import ButtonsFavorites from "../Buttons/ButtonsFavorites";

export default function Comic({ comic, setMyFavorites, myFavorites }) {
  return (
    <div>
      <Card
        key={comic._id}
        thumbnail={comic.thumbnail}
        name={comic.title}
        description={comic.description}
      />
      <ButtonsFavorites
        item="comic"
        comic={comic}
        setMyFavorites={setMyFavorites}
        myFavorites={myFavorites}
      />
    </div>
  );
}

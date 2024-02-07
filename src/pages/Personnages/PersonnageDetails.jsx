// Import packages
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PersonnageDetails({ urlBack }) {
  const { characterId } = useParams();
  const [character, setCharacter] = useState();

  useEffect(() => {
    getCharacter();
  }, []);

  const getCharacter = async () => {
    try {
      const { data } = await axios.get(urlBack + "/character/" + characterId);
      setCharacter(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log("Character >>>>", character);
  return <div>PersonnageDetails</div>;
}

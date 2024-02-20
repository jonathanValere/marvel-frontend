// Import packages
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Button({
  text,
  token,
  setToggle,
  urlBack,
  item,
  id,
  toggle,
}) {
  const navigate = useNavigate();

  //---------
  const addToFavorites = async () => {
    if (token) {
      try {
        const { data } = await axios.post(
          `${urlBack}/favoris/${
            item === "characters" ? "characters" : "comics"
          }/add/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.favorites[item]) {
          setToggle(!toggle);
        } else {
          console.log("Something wrong!");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        backgroundColor: `#ED1C24`,
        color: "#fff",
      }}
      whileTap={{ scale: 1.1 }}
      onClick={addToFavorites}
      className="button-add-favorites"
    >
      {text}
    </motion.button>
  );
}

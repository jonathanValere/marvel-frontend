// Import CSS
import styles from "./Login.module.css";

// Import packages
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//
import LayoutConnexion from "../../components/Layouts/LayoutConnexion";

export default function Login({ setUser, urlBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // permet d'afficher l'erreur (ex: mot de passe oublié)
  const navigate = useNavigate();

  const handleChangeEmail = (event) => {
    setError(null);
    return setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    return setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${urlBack}/user/login`, {
        email: email,
        password: password,
      });

      if (response.data.token) {
        setError(null);
        setUser(response.data.token); // Permet de créer un cookie
        navigate("/");
      } else {
        console.log("Une erreur est survenue");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <LayoutConnexion>
      <div className={styles["title-and-form"]}>
        <div>
          <h1>Login</h1>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            placeholder="email"
            value={email}
            onChange={handleChangeEmail}
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={handleChangePassword}
          />
          <button>Submit</button>
        </form>

        <p className={styles["not-account"]}>
          <Link to="/signup">You don't have an account yet ?</Link>
        </p>
      </div>
    </LayoutConnexion>
  );
}

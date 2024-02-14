// Import CSS
import styles from "./SignUp.module.css";

// Import packages
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Layout
import LayoutConnexion from "../../components/Layouts/LayoutConnexion";

export default function SignUpPage({ setUser, urlBack }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // permet d'afficher l'erreur (ex: mot de passe oublié)
  const navigate = useNavigate();

  const handleChangeUsername = (event) => {
    setError(null);
    return setUsername(event.target.value);
  };

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
      const response = await axios.post(`${urlBack}/user/signup`, {
        username: username,
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
          <h1>Sign up</h1>
          <p>Devenez membre des super-héros!</p>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            placeholder="username"
            value={username}
            onChange={handleChangeUsername}
          />
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
      </div>
    </LayoutConnexion>
  );
}

// Import CSS
import styles from "./SignUp.module.css";

// Import packages
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp({ setUser, urlBack }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChangeUsername = (event) => {
    return setUsername(event.target.value);
  };

  const handleChangeEmail = (event) => {
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
        setUser(response.data.token);
        navigate("/");
      } else {
        console.log("Une erreur est survenue");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className={styles["section-signup-page"]}>
      <div className={styles["bloc-image"]}></div>
      <div className={styles["bloc-form"]}>
        <div className={styles["title-and-form"]}>
          <div>
            <h1>SignUp</h1>
            <p>Devenez membre des super-héros!</p>
          </div>
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
              placeholder="Email"
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
      </div>
    </section>
  );
}

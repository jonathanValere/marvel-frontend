import styles from "./Footer.module.css";

export default function Footer() {
  const currentDate = new Date();

  return (
    <footer>
      ©{currentDate.getFullYear()} | Marvel |{" "}
      <a
        href="https://www.linkedin.com/in/jonathan-valere/"
        title="Lien vers mon profil Linkedin"
        target="_blank"
      >
        Jonathan Valere
      </a>
    </footer>
  );
}

import styles from "./Footer.module.css";

export default function Footer() {
  const currentDate = new Date();

  return (
    <footer>
      ©{currentDate.getFullYear()} | Marvel |{" "}
      <a
        href="https://github.com/jonathanValere"
        title="Lien vers mon compte Github"
        target="_blank"
      >
        Jonathan Valere
      </a>
    </footer>
  );
}

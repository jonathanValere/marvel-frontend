import styles from "./Footer.module.css";

export default function Footer() {
  const currentDate = new Date();

  return (
    <footer>{currentDate.getFullYear()} | Marvel | Jonathan Valere</footer>
  );
}

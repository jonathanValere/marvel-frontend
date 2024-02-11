// Import packages
import { MutatingDots } from "react-loader-spinner";

// Import CSS
import styles from "./Loading.module.css";

export default function Loading({ secondaryColor }) {
  return (
    // Loading animation
    <div className={styles.loading}>
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#f0141e"
        secondaryColor={secondaryColor}
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <p>In progress</p>
    </div>
  );
}

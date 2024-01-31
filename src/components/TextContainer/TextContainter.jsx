import React from "react";
import styles from "./TextContainer.module.css"; // Import the module stylesheet

const TextContainer = ({ title }) => {
  return (
    <div className={styles.textContainer}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </div>
  );
};

export default TextContainer;

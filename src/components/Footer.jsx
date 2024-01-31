import React, { useState } from "react";

const proverbs = [
  "The early bird catches the worm.",
  "Actions speak louder than words.",
  "Where there is a will, there is a way.",
  "Don’t count your chickens before they hatch.",
  "A picture is worth a thousand words.",
];

const Footer = () => {
  const [selectedProverb, setSelectedProverb] = useState(null);

  const handleFooterClick = () => {
    const randomIndex = Math.floor(Math.random() * proverbs.length);
    setSelectedProverb(proverbs[randomIndex]);
  };

  return (
    <footer onClick={handleFooterClick} style={{ cursor: "pointer" }}>
      {selectedProverb ? (
        <p style={{ userSelect: "none" }}>{selectedProverb}</p>
      ) : (
        <p>Click to reveal a proverb</p>
      )}
    </footer>
  );
};

export default Footer;

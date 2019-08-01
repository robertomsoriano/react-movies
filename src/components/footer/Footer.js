import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <div>
      <footer>
        <span
          onClick={e => window.location.replace("https://robertmsoriano.com")}
          style={{ cursor: "pointer" }}
        >
          Roberto Soriano, Copyright © 2019
        </span>
      </footer>
    </div>
  );
}

export default Footer;

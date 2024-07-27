import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 60,
          marginBottom: 50,
        }}
      >
        <p style={{ fontSize: "30px", textAlign: "center" }}>
          Built with 🤍 by{" "}
          <span>
            <span className="nav-link">Razak</span>
          </span>
        </p>

        <p style={{ textAlign: "center" }}>
          <span>
            <Link
              className="nav-link text-gray-500"
              to={"https://github.com/razak571"}
            >
              Github
            </Link>
          </span>{" "}
          x
          <span>
            {" "}
            <Link
              className="nav-link text-gray-500"
              to={"https://www.linkedin.com/in/razakattar/"}
            >
              LinkedIN
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

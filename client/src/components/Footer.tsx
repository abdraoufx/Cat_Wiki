import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="main-footer fx-center-between">
      <img
        src="/images/logo.svg"
        alt="Logo"
        className="main-footer__logo white-logo"
      />

      <div className="main-footer__copyright-text fx-center">
        <span className="copy-icon">&copy;</span>
        <span className="text">
          created by{" "}
          <a
            href="https://devchallenges.io/portfolio/abdraoufx"
            target="_blank"
            rel="noopener noreferrer"
          >
            abdraoufx
          </a>{" "}
          - devChallenge.io 2021
        </span>
      </div>
    </footer>
  );
};

export default Footer;

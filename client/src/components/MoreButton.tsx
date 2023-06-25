import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  propsClassNames?: string;
  textContent: string;
  redirTo: string;
};

const MoreButton = ({ propsClassNames, textContent, redirTo }: Props) => {
  const navigate = useNavigate();

  const redirectionMechanism = () => {
    const httpLinkRe = /^(http:\/\/|https:\/\/)/i;

    if (httpLinkRe.test(redirTo)) {
      window.open(redirTo, "__blank");
    } else {
      navigate(redirTo);
    }
  };

  return (
    <button
      className={`${propsClassNames ?? ""} more-btn fx-center`}
      onClick={redirectionMechanism}
    >
      <span className="more-btn__text">{textContent}</span>
      <i className="fa-solid fa-right-long"></i>
    </button>
  );
};

export default MoreButton;

import React, { useEffect, useRef } from "react";
import { DECREASE_VALUE_TO_MAKE_ELEMENT_FULL_HEIGHT } from "../constants/stylesConstants";

type Props = {
  propsClassNames?: string;
  message?: string;
  makeFullHeight?: boolean;
};

const NoBreedFound = ({ propsClassNames, message, makeFullHeight }: Props) => {
  const container = useRef<HTMLDivElement>(null);

  const customMessage = message ?? "Sorry, Can't load breeds images.";

  useEffect(() => {
    if (makeFullHeight === true && container.current) {
      container.current.style.height = `calc(100vh - ${DECREASE_VALUE_TO_MAKE_ELEMENT_FULL_HEIGHT}px)`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`no-breed-found fx-center ${propsClassNames ?? ""}`}
      ref={container}
    >
      <img
        src="/images/cats_images/no-breed-to-show.gif"
        alt="No breed to show"
      />
      <span className="error-msg">{customMessage}</span>
    </div>
  );
};

export default NoBreedFound;

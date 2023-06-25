import React from "react";
import MoreButton from "./MoreButton";

type Props = {};

const WhyNeedCat = (props: Props) => {
  return (
    <section className="why-you-need-cat fx-center-between">
      <div className="why-you-need-cat__text-side fx-col">
        <h1 className="brown-title-with-line bold line-up title">
          Why should you have a cat?
        </h1>
        <p className="description">
          Having a cat around you can actually trigger the release of calming
          chemicals in your body which lower your stress and anxiety leves
        </p>
        <MoreButton
          propsClassNames="read-more-btn"
          textContent="read more"
          redirTo="https://www.singlecare.com/blog/benefits-of-having-a-cat/"
        />
      </div>
      <div className="why-you-need-cat__images-side">
        <div className="left-side">
          <img
            src="/images/cats_images/why-you-need-cat-1.png"
            alt="why you need cat 1"
            className="why-you-need-cat__images-side__first-img"
          />
          <img
            src="/images/cats_images/why-you-need-cat-2.png"
            alt="why you need cat 2"
            className="why-you-need-cat__images-side__second-img"
          />
        </div>
        <img
          src="/images/cats_images/why-you-need-cat-3.png"
          alt="Why you need cat 3"
          className="why-you-need-cat__images-side__third-img"
        />
      </div>
    </section>
  );
};

export default WhyNeedCat;

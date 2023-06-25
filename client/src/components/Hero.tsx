import React, { useContext, useEffect, useRef, useState } from "react";
import MoreButton from "./MoreButton";
import { CatBreed } from "../types/catBreedTypes";
import { useNavigate } from "react-router-dom";
import NoBreedFound from "./NoBreedFound";
import { AllCatsBreedsContextAPI } from "../contexts/AllCatsBreedsContext";
import { handleImageNotLoaded } from "../functions/handleImageNotLoaded";

type Props = {};

const Hero = (props: Props) => {
  const {
    catsBreeds,
    introSectionCatBreedsimages,
    setSelectedCatBreed,
    topOneCatBreed,
  } = useContext(AllCatsBreedsContextAPI);

  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const allCatsBreedsNamesBoxContainer = useRef<HTMLDivElement>(null);
  const searchForBreedInput = useRef<HTMLInputElement>(null);
  const mobileSearchWrapperContainer = useRef<HTMLDivElement>(null);
  const introSection = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const [clonedCatsBreeds, setClonedCatsBreeds] = useState<CatBreed[] | []>([
    ...catsBreeds,
  ]);

  const renderCatsBreedsNamesAsJSX = (): JSX.Element | JSX.Element[] => {
    if (!clonedCatsBreeds.length)
      return <span className="no-breeds-names">No breeds names found</span>;

    return clonedCatsBreeds.map((breed) => (
      <span
        key={breed.id}
        className="breed-name"
        onClick={() => clickingBreedElement(breed)}
      >
        {breed.name}
      </span>
    ));
  };

  const clickingBreedElement = (catBreed: CatBreed): void => {
    setSelectedCatBreed(catBreed);

    navigate(`/catbreed/${catBreed.id}`);

    resetClonedBreedsNames();

    changeAllBreedsBoxContainerVisibility("hide");

    if (searchForBreedInput.current) searchForBreedInput.current.value = "";

    removeFocusOnMobileClass();
  };

  const setAllBreedsBoxContainerTop = (): void => {
    if (!searchWrapperRef.current || !allCatsBreedsNamesBoxContainer.current)
      return;

    allCatsBreedsNamesBoxContainer.current.style.top = `${
      searchWrapperRef.current.clientHeight + 8
    }px`;
  };

  const handleSearchInput = (e: React.ChangeEvent): void => {
    const inputElement = e.target as HTMLInputElement;
    const searchValue = inputElement.value.toLowerCase();

    const foundedValue = clonedCatsBreeds.filter((breed) =>
      breed.name.toLowerCase().includes(searchValue)
    );

    setClonedCatsBreeds(foundedValue ?? []);

    if (searchValue.length === 0) {
      changeAllBreedsBoxContainerVisibility("hide");
      resetClonedBreedsNames();
    } else if (
      searchValue.length >= 1 &&
      !allCatsBreedsNamesBoxContainer.current?.classList.contains(
        "visible-by-opacity"
      )
    ) {
      changeAllBreedsBoxContainerVisibility("show");
      resetClonedBreedsNames();
    }
  };

  let blurTimeout: NodeJS.Timer;

  // I Make this function to prevent blur immediately and wait to pass the breed arg to the clickingBreedElement
  const handleBlur = () => {
    // Delay execution of the function by 200 milliseconds
    blurTimeout = setTimeout(() => {
      changeAllBreedsBoxContainerVisibility("hide");
    }, 200);
  };

  const handleFocus = () => {
    // Clear the timeout if the input gains focus again before the timeout completes
    clearTimeout(blurTimeout);
    changeAllBreedsBoxContainerVisibility("show");
  };

  const submitIfBreedFound = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const inputElement = e.target as HTMLInputElement;

      const isValueAValidBreed: boolean = clonedCatsBreeds.length === 1;

      if (isValueAValidBreed) {
        inputElement.value = "";

        changeAllBreedsBoxContainerVisibility("hide");
        resetClonedBreedsNames();
      }
    }
  };

  const resetClonedBreedsNames = () => {
    setClonedCatsBreeds([...catsBreeds]);
  };

  const changeAllBreedsBoxContainerVisibility = (
    visibility: "show" | "hide"
  ): void => {
    if (!allCatsBreedsNamesBoxContainer.current) return;

    const showClass =
      visibility === "show" ? "visible-by-opacity" : "unvisible-by-opacity";

    const hideClass =
      visibility === "show" ? "unvisible-by-opacity" : "visible-by-opacity";

    if (allCatsBreedsNamesBoxContainer.current.classList.contains(hideClass)) {
      allCatsBreedsNamesBoxContainer.current.classList.replace(
        hideClass,
        showClass
      );
    } else {
      allCatsBreedsNamesBoxContainer.current.classList.add(showClass);
    }
  };

  const renderCatsBreedsPictures = (): JSX.Element | JSX.Element[] => {
    if (!introSectionCatBreedsimages.length) {
      return (
        <NoBreedFound message="Apologies, unable to retrieve breed images at the moment" />
      );
    }

    return introSectionCatBreedsimages.map(({ id, breedName, imageUrl }) => {
      return (
        <div
          key={id}
          className={`img-wrapper fx-col ${
            breedName === topOneCatBreed?.name ? "top-one-breed" : ""
          }`}
        >
          <img
            src={imageUrl}
            alt={breedName}
            className="global-border-raid"
            onError={(e) => handleImageNotLoaded(e.currentTarget)}
          />
          <span className="breed-name">{breedName}</span>
        </div>
      );
    });
  };

  const addFocusOnMobileClass = (): void => {
    introSection.current?.classList.add("search-showed-on-mobile");

    mobileSearchWrapperContainer.current?.classList.add("show");

    searchForBreedInput.current?.parentElement?.classList.add(
      "focus-on-mobile"
    );

    document.body.style.overflowY = "hidden";
  };

  const removeFocusOnMobileClass = (): void => {
    introSection.current?.classList.remove("search-showed-on-mobile");

    mobileSearchWrapperContainer.current?.classList.remove("show");

    searchForBreedInput.current?.parentElement?.classList.remove(
      "focus-on-mobile"
    );

    document.body.style.overflowY = "auto";

    setAllBreedsBoxContainerTop();
  };

  useEffect(() => {
    const mobileBreakPoint = window.matchMedia("(max-width: 651px)");
    const mediumBreakPoint = window.matchMedia("(min-width: 652px)");

    const changeSearchInputPlaceHolderText = (): void => {
      if (!searchForBreedInput.current) return;

      if (mobileBreakPoint.matches) {
        searchForBreedInput.current.placeholder = "Search";
        searchForBreedInput.current.addEventListener(
          "focus",
          addFocusOnMobileClass
        );
      } else if (mediumBreakPoint.matches) {
        searchForBreedInput.current.placeholder = "Enter your breed";
        searchForBreedInput.current.removeEventListener(
          "focus",
          addFocusOnMobileClass
        );

        removeFocusOnMobileClass();
      }
    };

    changeSearchInputPlaceHolderText();

    window.addEventListener("resize", changeSearchInputPlaceHolderText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAllBreedsBoxContainerTop();

    setClonedCatsBreeds(catsBreeds);
  }, [catsBreeds]);

  return (
    <section className="hero-section global-border-raid">
      <div className="intro" ref={introSection}>
        <div className="intro__content-container fx-col">
          <img
            className="intro__logo white-logo"
            src="/images/logo.svg"
            alt="logo"
          />
          <span className="intro__text">
            Get to know more about your cat breed
          </span>
          <div
            className={"intro__search-wrapper global-border-raid fx-center"}
            ref={searchWrapperRef}
          >
            <input
              type="search"
              name="breed-name"
              id="search-for-breed"
              className="intro__search-bar"
              placeholder="Enter your breed"
              onChange={handleSearchInput}
              onKeyUp={submitIfBreedFound}
              ref={searchForBreedInput}
              onFocus={handleFocus}
              onBlur={handleBlur}
              autoComplete="off"
            />
            <i className="fa-solid fa-magnifying-glass search-icon"></i>

            <div
              className={`intro__all-cats-breeds-names-box-container global-border-raid unvisible-by-opacity`}
              ref={allCatsBreedsNamesBoxContainer}
            >
              <div className="intro__all-cats-breeds-names-box fx-col app-scrollbar">
                {renderCatsBreedsNamesAsJSX()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="mobile-search-wrapper-container"
        ref={mobileSearchWrapperContainer}
      >
        <div className="close-icon-wrapper">
          <i
            className="fa-solid fa-xmark close-icon-wrapper__icon"
            onClick={removeFocusOnMobileClass}
          ></i>
        </div>
      </div>
      <div className="popular-cats-breeds-names">
        <h4 className="brown-title-with-line semi-bold line-down most-searched-title">
          Most Searched Breeds
        </h4>
        <div className="discover-breeds fx-between">
          <h1 className="discover-breeds__title">
            66+ Breeds For you to discover
          </h1>
          <MoreButton
            propsClassNames="discover-breeds__see-more-btn"
            textContent="see more"
            redirTo="/topten"
          />
        </div>
        <div className="discover-breeds__cats-images fx-center-between">
          {renderCatsBreedsPictures()}
        </div>
      </div>
    </section>
  );
};

export default Hero;

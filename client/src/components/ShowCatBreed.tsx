import React, { useContext, useEffect, useRef, useState } from "react";
import {
  GET_BREEDS_API_PARAMS,
  GET_BREEDS_FILE_PATH,
  MAIN_API_URL,
} from "../constants/apiConstants";
import NoBreedFound from "./NoBreedFound";
import { DECREASE_VALUE_TO_MAKE_ELEMENT_FULL_HEIGHT } from "../constants/stylesConstants";
import { AllCatsBreedsContextAPI } from "../contexts/AllCatsBreedsContext";
import { handleImageNotLoaded } from "../functions/handleImageNotLoaded";

type Props = {};

interface CatBreedOneLineInformation {
  name: string;
  content: string | number;
}

interface CatBreedProperty {
  name: string;
  jsxElement: JSX.Element;
}

interface BreedImageData {
  id: string;
  url: string;
}

const ShowCatBreed = (props: Props) => {
  const { selectedCatBreed, topOneCatBreed } = useContext(
    AllCatsBreedsContextAPI
  );

  const breedFirstImage = useRef<HTMLImageElement>(null!);

  const [breedImages, setBreedImages] = useState<BreedImageData[]>([]);

  const catBreedOneLineInfo: CatBreedOneLineInformation[] = [
    {
      name: "Temperament",
      content: selectedCatBreed?.temperament || "No temperament",
    },
    { name: "Origin", content: selectedCatBreed?.origin || "No origin" },
    {
      name: "Life Span",
      content: selectedCatBreed?.life_span || "No life span",
    },
  ];

  const renderCatBreedOneLineInfo = (): JSX.Element[] => {
    return catBreedOneLineInfo.map(({ name, content }) => {
      return (
        <div
          className="breed-info__one-line-property-container fx-center"
          key={name}
        >
          <span className="breed-info__one-line-property-container__name">
            {name}:
          </span>

          <span className="breed-info__one-line-property-container__content">
            {content} {name === "Life Span" && "years"}
          </span>
        </div>
      );
    });
  };

  const createCatBreedAbilityCount = (abilityRate: number): JSX.Element => {
    const MAX_ELEMENTS_COUNT: number = 5;
    const abilityContainer: JSX.Element[] = [];

    for (let i = 0; i < MAX_ELEMENTS_COUNT; i++) {
      const abilitySpan: JSX.Element = (
        <span
          className={`breed-info__property-rate__rate-container__rate-span ${
            i <= abilityRate ? "active" : ""
          }`}
          key={i}
        ></span>
      );

      abilityContainer.push(abilitySpan);
    }

    return (
      <div className="breed-info__property-rate__rate-container fx-center">
        {abilityContainer}
      </div>
    );
  };

  const renderCatBreedInfoRates = (): JSX.Element[] | JSX.Element => {
    if (!selectedCatBreed) return <span className="no-breed">no breed</span>;

    const properties: CatBreedProperty[] = [
      {
        name: "Adaptability",
        jsxElement: createCatBreedAbilityCount(selectedCatBreed.adaptability),
      },
      {
        name: "Affection Level",
        jsxElement: createCatBreedAbilityCount(
          selectedCatBreed.affection_level
        ),
      },
      {
        name: "Child Friendly",
        jsxElement: createCatBreedAbilityCount(selectedCatBreed.child_friendly),
      },
      {
        name: "Grooming",
        jsxElement: createCatBreedAbilityCount(selectedCatBreed.grooming),
      },
      {
        name: "Intelligence",
        jsxElement: createCatBreedAbilityCount(selectedCatBreed.intelligence),
      },
      {
        name: "Health Issues",
        jsxElement: createCatBreedAbilityCount(selectedCatBreed.health_issues),
      },
      {
        name: "Social Needs",
        jsxElement: createCatBreedAbilityCount(selectedCatBreed.social_needs),
      },
      {
        name: "Stranger Friendly",
        jsxElement: createCatBreedAbilityCount(
          selectedCatBreed.stranger_friendly
        ),
      },
    ];

    return properties.map(({ name, jsxElement }) => {
      return (
        <div className="breed-info__property-rate fx-center-between" key={name}>
          <span className="breed-info__property-rate__name">{name}:</span>
          {jsxElement}
        </div>
      );
    });
  };

  const fetchSelectedBreedImages = async (): Promise<string> => {
    try {
      const requestParams: GET_BREEDS_API_PARAMS = {
        type: "get-breed-images",
      };

      const response = await fetch(
        `${MAIN_API_URL}/${GET_BREEDS_FILE_PATH}?type=${requestParams.type}&breed-id=${selectedCatBreed?.id}`
      );
      const imagesData: Promise<string> = response.json();

      return imagesData;
    } catch (error) {
      throw new Error(`Something went wrong: ${error}`);
    }
  };

  const renderBreedImages = (): JSX.Element[] | JSX.Element => {
    if (!breedImages.length)
      return (
        <NoBreedFound message="This breed does not have any available images." />
      );

    return breedImages.map(({ url, id }) => {
      return (
        <img
          src={url}
          alt="Breed"
          key={id}
          className="global-border-raid"
          onError={(e) => handleImageNotLoaded(e.currentTarget)}
        />
      );
    });
  };

  const extractFirstImageFromBreedImages = (
    imagesData: BreedImageData[]
  ): {
    firstImage: BreedImageData;
    remainingImages: BreedImageData[];
  } => {
    const firstImage: BreedImageData = imagesData[0];

    const remainingImages = imagesData.filter(
      (image) => image.id !== firstImage.id
    );

    return { firstImage, remainingImages };
  };

  const setShowCatBreedSectionHeight = (): void => {
    if (selectedCatBreed) return;

    const showCatBreedSection =
      document.querySelector<HTMLDivElement>(".show-cat-breed");

    if (showCatBreedSection)
      showCatBreedSection.style.height = `calc(100vh - ${DECREASE_VALUE_TO_MAKE_ELEMENT_FULL_HEIGHT}px)`;
  };

  useEffect(() => {
    const loadBreedImages = async () => {
      if (!selectedCatBreed) return;

      const imageData = await fetchSelectedBreedImages();

      const parsedImages: BreedImageData[] = JSON.parse(imageData);

      if (!parsedImages.length) return;

      const { firstImage, remainingImages } =
        extractFirstImageFromBreedImages(parsedImages);

      breedFirstImage.current.src = firstImage.url ?? "";

      const MAX_IMAGES_TO_SHOW: number = 8;

      if (remainingImages.length > MAX_IMAGES_TO_SHOW) {
        remainingImages.length = MAX_IMAGES_TO_SHOW;
      }

      setBreedImages(remainingImages);
    };

    setShowCatBreedSectionHeight();

    loadBreedImages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className={`show-cat-breed ${!selectedCatBreed ? "fx-full-center" : ""}`}
    >
      {selectedCatBreed ? (
        <>
          <div className="info-content-container">
            <div
              className={`img-wrapper ${
                selectedCatBreed.name === topOneCatBreed?.name
                  ? "top-one-breed"
                  : ""
              }`}
            >
              <img
                src=""
                className="breed-first-img global-border-raid"
                ref={breedFirstImage}
                alt="breed"
                onError={(e) => handleImageNotLoaded(e.currentTarget)}
              />
            </div>
            <div className="breed-info">
              <h2 className="breed-info__name">{selectedCatBreed.name}</h2>
              <p className="breed-info__description">
                {selectedCatBreed.description}
              </p>
              <div className="one-line-and-rate-properties-container fx-col">
                {renderCatBreedOneLineInfo()}
                {renderCatBreedInfoRates()}
              </div>
            </div>
          </div>
          <div className="other-photos">
            <h3 className="other-photos__title">Other photos</h3>
            <div className="other-photos__images-container fx-center-between">
              {renderBreedImages()}
            </div>
          </div>
        </>
      ) : (
        <NoBreedFound message="No information available for this breed" />
      )}
    </section>
  );
};

export default ShowCatBreed;

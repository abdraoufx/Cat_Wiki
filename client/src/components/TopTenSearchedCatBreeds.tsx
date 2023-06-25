import React, { useContext, useEffect, useState } from "react";
import {
  GET_BREEDS_API_PARAMS,
  GET_BREEDS_FILE_PATH,
  MAIN_API_URL,
} from "../constants/apiConstants";
import NoBreedFound from "./NoBreedFound";
import { AllCatsBreedsContextAPI } from "../contexts/AllCatsBreedsContext";
import { CatBreed } from "../types/catBreedTypes";
import { handleImageNotLoaded } from "../functions/handleImageNotLoaded";

export interface TopTenCatBreed {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  score: number;
}

type Props = {};

const TopTenSearchCatBreeds = (props: Props) => {
  const { catsBreeds, setTopOneCatBreed, topOneCatBreed } = useContext(
    AllCatsBreedsContextAPI
  );

  const [topTenCatsBreeds, setTopTenCatsBreeds] = useState<
    (TopTenCatBreed | CatBreed)[]
  >([]);

  const [catsBreedsWithoutTopTen, setCatsBreedsWithoutTopTen] = useState<
    CatBreed[] | []
  >([]);

  const fetchTopTenCatBreeds = async (): Promise<TopTenCatBreed[]> => {
    try {
      const requestParameters: GET_BREEDS_API_PARAMS = {
        type: "get-top-ten",
      };

      const response = await fetch(
        `${MAIN_API_URL}/${GET_BREEDS_FILE_PATH}?type=${requestParameters.type}`
      );

      const fetchedCatsBreed = await response.json();

      return fetchedCatsBreed;
    } catch (err) {
      throw new Error(`Something went wrong ${err}`);
    }
  };

  const renderTopTenCatsBreeds = (): JSX.Element | JSX.Element[] => {
    if (!topTenCatsBreeds.length)
      return (
        <NoBreedFound
          message="Sorry, can't show top ten breeds right now"
          makeFullHeight={true}
        />
      );

    return topTenCatsBreeds.map((breed, idx) => {
      let breedImageUrl: string = "";

      if ((breed as TopTenCatBreed).imageUrl) {
        breedImageUrl = (breed as TopTenCatBreed)?.imageUrl;
      } else if ((breed as CatBreed)?.image?.url) {
        breedImageUrl = (breed as CatBreed).image.url;
      }

      return (
        <div
          className={`top-ten-searched-breeds__breed-info ${
            breed.name === topOneCatBreed?.name ? "top-one-breed" : ""
          }`}
          key={breed.id}
        >
          <div className="img-wrapper">
            <img
              src={breedImageUrl}
              alt={breed.name}
              className="top-ten-searched-breeds__breed-info__image global-border-raid"
              onError={(e) => handleImageNotLoaded(e.currentTarget)}
            />
          </div>
          <div className="top-ten-searched-breeds__breed-info__text-content fx-col">
            <h3 className="top-ten-searched-breeds__breed-info__name">
              <span className="number">{idx + 1}.</span>
              <span className="text">{breed.name}</span>
            </h3>
            <p className="top-ten-searched-breeds__breed-info__description">
              {breed.description}
            </p>
          </div>
        </div>
      );
    });
  };

  const filterCatsBreedsWithoutTopTen = (): void => {
    if (!catsBreeds) return;

    setCatsBreedsWithoutTopTen(
      catsBreeds.filter(
        (breed) =>
          !topTenCatsBreeds.some((topTenBreed) => breed.id === topTenBreed.id)
      ) // remove the top ten breeds from the catsBreeds
    );
  };

  const addMoreBreeds = () => {
    const breedsToAdd: CatBreed[] = catsBreedsWithoutTopTen.slice(0, 10);

    setTopTenCatsBreeds([...topTenCatsBreeds, ...breedsToAdd]);

    catsBreedsWithoutTopTen.splice(0, 10);

    setCatsBreedsWithoutTopTen(catsBreedsWithoutTopTen);
  };

  useEffect(() => {
    const fetchBreeds = async () => {
      if (topTenCatsBreeds.length) return;

      const fetchedData: TopTenCatBreed[] = await fetchTopTenCatBreeds();

      setTopTenCatsBreeds(fetchedData);

      setTopOneCatBreed(fetchedData[0]);
    };

    fetchBreeds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (catsBreeds && topTenCatsBreeds) {
      filterCatsBreedsWithoutTopTen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topTenCatsBreeds, catsBreeds]);

  return (
    <section className="top-ten-searched-breeds">
      <h2 className="top-ten-searched-breeds__title">
        Top 10 most searched breeds
      </h2>
      {renderTopTenCatsBreeds()}
      {topTenCatsBreeds.length !== catsBreeds.length ||
      catsBreedsWithoutTopTen.length ? (
        <div
          className="view-more-seperator fx-center-between"
          onClick={addMoreBreeds}
        >
          <span className="line line-before"></span>
          <span className="text">view more</span>
          <span className="line line-after"></span>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default TopTenSearchCatBreeds;

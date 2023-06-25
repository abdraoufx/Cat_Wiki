import React, { useContext, useEffect } from "react";
import "./sass/main.scss";
import Hero from "./components/Hero";
import WhyNeedCat from "./components/WhyNeedCat";
import Footer from "./components/Footer";
import { CatBreed, CatBreedImage } from "./types/catBreedTypes";
import { Route, Routes } from "react-router-dom";
import ShowCatBreed from "./components/ShowCatBreed";
import NoBreedFound from "./components/NoBreedFound";
import TopTenSearchCatBreeds from "./components/TopTenSearchedCatBreeds";
import { AllCatsBreedsContextAPI } from "./contexts/AllCatsBreedsContext";
import {
  GET_BREEDS_API_PARAMS,
  GET_BREEDS_FILE_PATH,
  MAIN_API_URL,
} from "./constants/apiConstants";

function App() {
  const { setCatsBreeds, setIntroSectionCatBreedsImages } = useContext(
    AllCatsBreedsContextAPI
  );

  useEffect(() => {
    const getRequiredData = async () => {
      const fetchCatsBreedsNames = async (): Promise<CatBreed[]> => {
        try {
          const requestParameters: GET_BREEDS_API_PARAMS = {
            type: "get-breeds",
          };

          const response = await fetch(
            `${MAIN_API_URL}/${GET_BREEDS_FILE_PATH}?type=${requestParameters["type"]}`
          );

          const breedsData: CatBreed[] = await response.json();

          return breedsData;
        } catch (err) {
          throw new Error(`Something went wrong`);
        }
      };

      const fetchIntroSectionCatsBreedsImages = async (): Promise<
        CatBreedImage[]
      > => {
        try {
          const requestParameters: GET_BREEDS_API_PARAMS = {
            type: "get-intro-breeds-images",
          };

          const response = await fetch(
            `${MAIN_API_URL}/${GET_BREEDS_FILE_PATH}?type=${requestParameters["type"]}`
          );

          const breedsImages: CatBreedImage[] = await response.json();

          return breedsImages;
        } catch (err) {
          throw new Error(`Something went wrong ${err}`);
        }
      };

      const breeds = await fetchCatsBreedsNames();
      setCatsBreeds(breeds);

      const introSectionImages = await fetchIntroSectionCatsBreedsImages();
      setIntroSectionCatBreedsImages(introSectionImages);
    };

    getRequiredData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="main-page app-parent-scrollbar">
      <div className="main-page__main-container main-container">
        <img
          src="/images/logo.svg"
          alt="Logo"
          className="main-page__logo logo"
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <WhyNeedCat />
              </>
            }
          />
          <Route path="/catbreed/:breedId" element={<ShowCatBreed />} />
          <Route path="/topten" element={<TopTenSearchCatBreeds />} />
          <Route
            path="*"
            element={
              <NoBreedFound
                message="Oops! This page does not exist."
                makeFullHeight={true}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </main>
  );
}

export default App;

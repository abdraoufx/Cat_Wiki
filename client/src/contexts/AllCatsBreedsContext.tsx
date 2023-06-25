import { AllCatsBreedsContextType } from "../types/allCatsBreedsContextType";
import { contextProviderProps } from "../types/contextProvidedPropsTypes";
import { useState, createContext } from "react";
import { CatBreed, CatBreedImage } from "../types/catBreedTypes";
import { TopTenCatBreed } from "../components/TopTenSearchedCatBreeds";

const contextDefaultValues = {
  catsBreeds: [],
  setCatsBreeds: () => {},

  selectedCatBreed: null,
  setSelectedCatBreed: () => {},

  introSectionCatBreedsimages: [],
  setIntroSectionCatBreedsImages: () => {},

  topOneCatBreed: null,
  setTopOneCatBreed: () => {},
};

export const AllCatsBreedsContextAPI =
  createContext<AllCatsBreedsContextType>(contextDefaultValues);

const AllCatsBreedContext = ({ children }: contextProviderProps) => {
  const [catsBreeds, setCatsBreeds] = useState<CatBreed[] | []>([]);
  const [selectedCatBreed, setSelectedCatBreed] = useState<CatBreed | null>(
    null
  );

  const [introSectionCatBreedsimages, setIntroSectionCatBreedsImages] =
    useState<CatBreedImage[]>([]);

  const [topOneCatBreed, setTopOneCatBreed] = useState<TopTenCatBreed | null>(
    null
  );

  return (
    <AllCatsBreedsContextAPI.Provider
      value={{
        catsBreeds,
        setCatsBreeds,
        selectedCatBreed,
        setSelectedCatBreed,
        introSectionCatBreedsimages,
        setIntroSectionCatBreedsImages,
        topOneCatBreed,
        setTopOneCatBreed,
      }}
    >
      {children}
    </AllCatsBreedsContextAPI.Provider>
  );
};

export default AllCatsBreedContext;

import { TopTenCatBreed } from "../components/TopTenSearchedCatBreeds";
import { CatBreed, CatBreedImage } from "./catBreedTypes";

export interface AllCatsBreedsContextType {
  catsBreeds: CatBreed[] | [];
  setCatsBreeds: React.Dispatch<React.SetStateAction<CatBreed[] | []>>;

  selectedCatBreed: CatBreed | null;
  setSelectedCatBreed: React.Dispatch<React.SetStateAction<CatBreed | null>>;

  introSectionCatBreedsimages: CatBreedImage[] | [];
  setIntroSectionCatBreedsImages: React.Dispatch<
    React.SetStateAction<CatBreedImage[] | []>
  >;

  topOneCatBreed: TopTenCatBreed | null;
  setTopOneCatBreed: React.Dispatch<
    React.SetStateAction<TopTenCatBreed | null>
  >;
}

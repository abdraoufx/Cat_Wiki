export type CatBreed = {
  id: string;
  name: string;
  description: string;
  image: {
    url: string;
  };
  temperament: string;
  origin: string;
  life_span: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  grooming: number;
  intelligence: number;
  health_issues: number;
  social_needs: number;
  stranger_friendly: number;
};

export type CatBreedImage = {
  id: string;
  breedName: string;
  imageUrl: string;
};

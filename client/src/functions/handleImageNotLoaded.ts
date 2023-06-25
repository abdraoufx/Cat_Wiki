export const handleImageNotLoaded = (imgElement: HTMLImageElement): void => {
  imgElement.src = "/images/cats_images/no-breed-to-show.gif";

  imgElement.style.border = "1px solid #291507";
};

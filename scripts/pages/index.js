import { getData } from "../utils/getData.js";

const displayPhotographers = (photographers) => {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    let photographerModel = new Photographer(photographer);
    photographersSection.innerHTML += photographerModel.createHTML;
  });
};

const init = async () => {
  const { photographers } = await getData();
  displayPhotographers(photographers);
};

init();

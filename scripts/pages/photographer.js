import { getData } from "../utils/getData.js";
import { MediaFactory } from "../factories/mediaFactory.js";

const getPhotographerId = async () => {
  const url = new URL(location.toString());
  const id = url.searchParams.get("id");
  return id;
};

const displayPhotograph = (name, city, country, tagline, portrait) => {
  const photographHeader = document.querySelector(".photograph-header");
  const contactButton = document.querySelector(".contact_button");

  const photographInformations = document.createElement("div");
  photographInformations.innerHTML += `<h1>${name}</h1><h3>${city}, ${country}</h3><p>${tagline}</p>`;

  const photographPortrait = document.querySelector(".photographer-portrait");
  //@ts-ignore
  photographPortrait.src = "assets/photographers/" + portrait;

  photographHeader.insertBefore(photographInformations, contactButton);
  photographHeader.appendChild(photographPortrait);
};

const mediaGalery = (mediaArray) => {
  const mainElement = document.getElementById("main");

  const galerySection = document.createElement("div");
  galerySection.classList.add("galery-section");
  //   const galerySection = document.querySelector(".galery-section");// POURQUOI ?

  mainElement.appendChild(galerySection);

  const mediaElements = mediaArray.map((media) => {
    let currentMedia = new MediaFactory(media);

    //@ts-ignore
    galerySection.innerHTML += currentMedia.createHTML;
    return currentMedia;
  });

  /////// Ajout d'un événement au clic de l'icone coeur
  mediaElements.forEach((currentMedia) => {
    //@ts-ignore
    const mediaElement = document.getElementById(`${currentMedia._id}`);
    const likeButton = mediaElement.querySelector(".like-button");
    const likeNumber = mediaElement.querySelector(".like-number");

    likeButton.addEventListener("click", () => {
      let number = parseInt(likeNumber.innerHTML);

      //@ts-ignore
      let isButtonActive = likeButton.dataset.active;

      if (isButtonActive == "true") {
        // likeButton.setAttribute("active", false);
        isButtonActive = "false";
        console.log(isButtonActive);
        number--;
      } else {
        isButtonActive = "true";
        console.log(isButtonActive);
        number++;
      }

      likeNumber.innerHTML = number.toString();
    });
  });
};

const dataBanner = (likes, price) => {
  const totalLikes = document.querySelector(".total-likes");
  totalLikes.innerHTML = likes;

  const dailyPrice = document.querySelector(".daily-price");
  dailyPrice.innerHTML = price + "€/jour";
};

const main = async () => {
  const data = await getData();
  const photographerId = await getPhotographerId();

  const photographers = data.photographers;
  const photograph = photographers.find(
    (photograph) => photograph.id.toString() == photographerId
  );

  displayPhotograph(
    photograph.name,
    photograph.city,
    photograph.country,
    photograph.tagline,
    photograph.portrait
  );

  const medias = data.media;
  const filteredMedias = medias.filter(
    (media) => media.photographerId == photographerId
  );

  mediaGalery(filteredMedias);

  const temporaryTotal = 324;
  dataBanner(temporaryTotal, photograph.price);
};

main();

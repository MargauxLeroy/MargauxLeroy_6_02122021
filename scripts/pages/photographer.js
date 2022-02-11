import { getData } from "../utils/getData.js";
import { MediaFactory } from "../factories/mediaFactory.js";

//// RÉCUPÉRATION DE L'ID DU PHOTOGRAPHE
const getPhotographerId = async () => {
  const url = new URL(location.toString());
  const id = url.searchParams.get("id");
  return id;
};

//// GESTION DE L'AFFICHAGE DU PHOTOGRAPHE (HEADER)
const displayPhotograph = (name, city, country, tagline, portrait) => {
  const photographHeader = document.querySelector(".photograph-header");
  const contactButton = document.querySelector(".contact_button");

  const photographInformations = document.createElement("div");
  photographInformations.innerHTML += `<h1>${name}</h1><h3>${city}, ${country}</h3><q>${tagline}</q>`;

  const photographPortrait = document.querySelector(".photographer-portrait");
  photographPortrait.src = "assets/photographers/" + portrait;

  photographHeader.insertBefore(photographInformations, contactButton);
  photographHeader.appendChild(photographPortrait);
};

const photographerContact = (photograph) => {
  const contactButton = document.querySelector(".contact_button");
  contactButton.addEventListener("click", () => {
    displayModal(photograph);
  });
};

//// OUVERTURE DE LA LIGHT-BOX
const displayLightBox = () => {
  const lightBoxSection = document.querySelector(".light-box-section");
  const medias = document.querySelectorAll(".media");

  medias.forEach((media) =>
    media.addEventListener("click", () => {
      lightBoxSection.style.display = "grid";

      const titleElement = lightBoxSection.querySelector("figcaption");
      titleElement.innerHTML = media.alt;

      const imgElement = lightBoxSection.querySelector(".media");
      imgElement.src = media.src;
      imgElement.alt = media.alt;
    })
  );
};

//// GESTION DE LA NAVIGATION LIGHT-BOX
const handleLightBoxNavigation = () => {
  const chevronRight = lightBoxSection.querySelector(".fa-chevron-right");
  const chevronLeft = lightBoxSection.querySelector(".fa-chevron-left");

  chevronRight.addEventListener("click", () => {});
};

//// CRÉATION DE LA GALLERIE
const createMediaGalery = (mediaArray) => {
  const galerySection = document.getElementById("galery-section");

  galerySection.innerHTML = "";

  const mediaElements = mediaArray.map((media) => {
    let currentMedia = new MediaFactory(media);

    galerySection.innerHTML += currentMedia.createHTML;
    return currentMedia;
  });
};

//// ÉVÊNEMENT DU BOUTTON COEUR
const installEventLikeButton = () => {
  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach((likeButton) =>
    likeButton.addEventListener("click", (e) => {
      const likeNumber = e.target.parentNode.previousElementSibling;
      let number = parseInt(likeNumber.innerHTML);
      let isButtonActive = likeButton.dataset.active;

      if (isButtonActive == "true") {
        likeButton.dataset.active = "false";
        number--;
      } else {
        likeButton.dataset.active = "true";
        number++;
      }

      likeNumber.innerHTML = number.toString();
      computeTotalLikes();
    })
  );
};

//// GESTION DU TRI (Popularité / Date / Tri)
const handleSelect = (filteredMedias) => {
  const mediaSelect = document.getElementById("media-select");

  mediaSelect.addEventListener("change", function () {
    let selectedChoice = mediaSelect.value;

    const byDate = (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime();
    const byTrend = (a, b) => b.likes - a.likes;
    const byTitle = (a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    };

    switch (selectedChoice) {
      case "trend":
        filteredMedias.sort(byTrend);
        createMediaGalery(filteredMedias);
        break;
      case "date":
        filteredMedias.sort(byDate);
        createMediaGalery(filteredMedias);
        break;
      case "title":
        filteredMedias.sort(byTitle);
        createMediaGalery(filteredMedias);
        break;
      // case "default":
      //   mediaGalery(filteredMedias);
      //   break;
      default:
        createMediaGalery(filteredMedias);
        break;
    }
  });
};

//// GESTION DE LA BANNIÈRE
const computeTotalLikes = () => {
  const likeNumbers = document.querySelectorAll(".like-number");
  let total = 0;

  likeNumbers.forEach((number) => (total += parseInt(number.innerHTML)));

  const totalLikes = document.querySelector(".total-likes");
  totalLikes.innerHTML = total;
};

const setDailyPrice = (price) => {
  const dailyPrice = document.querySelector(".daily-price");
  dailyPrice.innerHTML = price + "€/jour";
};

//// INITIALISATION
const main = async () => {
  const data = await getData();
  const photographerId = await getPhotographerId();

  // Gestion du.des photographe.s
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

  photographerContact(photograph);

  // Gestion de la galerie
  const medias = data.media;
  const filteredMedias = medias.filter(
    (media) => media.photographerId == photographerId
  );

  createMediaGalery(filteredMedias);
  handleSelect(filteredMedias);

  installEventLikeButton();
  displayLightBox();

  // Récupération des données de la bannière
  computeTotalLikes();
  setDailyPrice(photograph.price);
};

main();

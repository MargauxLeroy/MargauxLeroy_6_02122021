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
  photographInformations.tabIndex = 2;
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

//// GESTION DE LA LIGHT-BOX
const lightBoxSection = document.querySelector(".light-box-section");

const initMediasListeners = () => {
  const medias = document.querySelectorAll(".media");

  medias.forEach((media) =>
    media.addEventListener("click", () => {
      lightBoxSection.style.display = "grid";
      loadMediaInLightBox(media);
    })
  );
};

const loadMediaInLightBox = (media) => {
  if (!media) return;
  lightBoxSection.dataset.selectedMedia = media.parentElement.id;

  const isImage = media.tagName === "IMG";
  const titleElement = lightBoxSection.querySelector("figcaption");
  titleElement.innerHTML = media.getAttribute("alt");

  const imgElement = lightBoxSection.querySelector("img.media");
  const videoElement = lightBoxSection.querySelector("video.media");

  if (isImage) {
    imgElement.src = media.src;
    imgElement.alt = media.alt;

    videoElement.style.display = "none";
    imgElement.style.display = "initial";
  } else {
    const videoSource = media.querySelector("source");
    const source = document.createElement("source");
    const sourceElement = lightBoxSection.querySelector("video.media source");
    source.src = videoSource.src;
    source.alt = media.alt;

    sourceElement.replaceWith(source);

    imgElement.style.display = "none";
    videoElement.style.display = "initial";
  }

  handleLightBoxNavigation();

  // + .removeEventListener (au moment de fermer la lightbox)
};

const getSiblingsMedia = () => {
  // Trouver l'index du media chargé
  const galerySection = document.getElementById("galery-section");

  const medias = Array.from(galerySection.querySelectorAll(".media"));
  const mediaId = lightBoxSection.dataset.selectedMedia;
  const mediaIndex = medias.findIndex(
    (media) => media.parentElement.id.toString() === mediaId
  );

  const previousMedia = medias[mediaIndex - 1];
  const nextMedia = medias[mediaIndex + 1];

  return { nextMedia, previousMedia };
};

//// GESTION DE LA NAVIGATION LIGHT-BOX
const handleLightBoxNavigation = () => {
  const chevronRight = document.querySelector(".fa-chevron-right");
  const chevronLeft = document.querySelector(".fa-chevron-left");

  const { previousMedia, nextMedia } = getSiblingsMedia();

  // Si le media à droite est nul...
  if (nextMedia == null) {
    chevronRight.style.color = "transparent";
  } else {
    chevronRight.style.color = "#901c1c";
    chevronRight.onclick = () => loadMediaInLightBox(nextMedia);
  }

  // Si le media à gauche est nul...
  if (previousMedia == null) {
    chevronLeft.style.color = "transparent";
  } else {
    chevronLeft.style.color = "#901c1c";
    chevronLeft.onclick = () => loadMediaInLightBox(previousMedia);
  }
};

const handleKeyboardNavigation = () => {
  document.addEventListener("keydown", (e) => {
    const { previousMedia, nextMedia } = getSiblingsMedia();

    if (e.key === "ArrowRight") {
      e.preventDefault();
      loadMediaInLightBox(nextMedia);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      loadMediaInLightBox(previousMedia);
    }
    if (e.key === "Escape") {
      closeLightBox();
    }
  });
};

// const openLightBox = () => {
//   lightBoxSection.style.display = "grid";
//   loadMediaInLightBox(media);
// };

const closeLightBox = () => {
  lightBoxSection.style.display = "none";
};

lightBoxSection
  .querySelector(".close")
  .addEventListener("click", closeLightBox);

//// CRÉATION DE LA GALLERIE
const createMediaGalery = (mediaArray) => {
  const galerySection = document.getElementById("galery-section");

  galerySection.innerHTML = "";

  mediaArray.forEach((media) => {
    let currentMedia = new MediaFactory(media);
    galerySection.innerHTML += currentMedia.createHTML;
  });
};

//// ÉVÊNEMENT DU BOUTTON COEUR
const installEventLikeButton = () => {
  const likesContainers = document.querySelectorAll(".likes");

  likesContainers.forEach((likesContainer) =>
    likesContainer.addEventListener("click", () => {
      const likeNumber = likesContainer.querySelector(".like-number");
      const likeButton = likesContainer.querySelector(".like-button");

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

  // Gestion de la lightbox
  initMediasListeners();

  handleKeyboardNavigation();

  // Récupération des données de la bannière
  computeTotalLikes();
  setDailyPrice(photograph.price);
};

main();

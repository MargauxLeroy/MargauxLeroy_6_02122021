import { getData } from "../utils/getData.js";
import { MediaFactory } from "../factories/mediaFactory.js";

//// RÉCUPÉRATION DE L'ID DU PHOTOGRAPHE
const getPhotographerId = async () => {
  // Création / Extraction de l'URL
  const url = new URL(location.toString());
  // Récupération de la valeur du paramètre ID
  const id = url.searchParams.get("id");
  return id;
};

//// GESTION DE L'AFFICHAGE DU PHOTOGRAPHE (HEADER)
// Déclaration des constantes
const photographHeader = document.querySelector(".photograph-header");
const contactButton = document.querySelector(".contact_button");
const photographPortrait = document.querySelector(".photographer-portrait");

const displayPhotograph = (photograph) => {
  // Création et injection des infos du photographe
  const photographInformations = document.createElement("div");
  photographInformations.innerHTML += `<h1>${photograph.name}</h1><h3>${photograph.city}, ${photograph.country}</h3><q>${photograph.tagline}</q>`;
  photographInformations.tabIndex = 2;

  // Injection du path de la photo du photographe
  photographPortrait.src = "assets/photographers/" + photograph.portrait;
  photographPortrait.alt += " " + photograph.name;

  // Insertion dans le HTML
  photographHeader.insertBefore(photographInformations, contactButton);
  photographHeader.appendChild(photographPortrait);
};

//// AJOUT DE L'ACTION AU CLIC DU BOUTON CONTACT (OUVERTURE DU FORM)
/**
 * @param {Photographer} photograph
 */
const photographerContact = (photograph) => {
  // Au clic du bouton...
  contactButton.addEventListener("click", () => {
    // On affiche la modale formulaire
    displayModal(photograph);
  });
};

//// CRÉATION DE LA GALLERIE
const createMediaGalery = (mediaArray) => {
  const galerySection = document.getElementById("galery-section");
  galerySection.innerHTML = "";

  // Pour chaque média...
  mediaArray.forEach((media) => {
    // On crée un nouvel objet à l'aide de la MediaFactory
    let currentMedia = new MediaFactory(media);
    // On l'injecte dans le HTML
    galerySection.innerHTML += currentMedia.createHTML;
  });

  installEventLikeButton();
  initMediasListeners();
};

//// ÉVÊNEMENT DU BOUTTON COEUR
const installEventLikeButton = () => {
  const likesContainers = document.querySelectorAll(".likes");

  // Pour chaque élément HTML de likes...
  likesContainers.forEach((likesContainer) =>
    likesContainer.addEventListener("click", () => {
      const likeNumber = likesContainer.querySelector(".like-number");
      const likeButton = likesContainer.querySelector(".like-button");

      // On transforme le texte HTML en nombre
      let number = parseInt(likeNumber.innerHTML);
      // Récupération de l'attribut dataset-active
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

//// GESTION DE LA LIGHT-BOX
const lightBoxSection = document.querySelector(".light-box-section");

// Initialisation des events au clic des medias
const initMediasListeners = () => {
  const medias = document.querySelectorAll(".media");

  medias.forEach((media) => {
    media.addEventListener("click", () => {
      openLightBox(media);
    });
    media.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        openLightBox(media);
      }
    });
  });
};

// Charger le média dans la lightbox
const loadMediaInLightBox = (media) => {
  if (!media) return;

  // On donne un attribut à la lightbox qui correspond à l'id de l'image cliquée
  lightBoxSection.dataset.selectedMedia = media.parentElement.id;

  const isImage = media.tagName === "IMG";
  const titleElement = lightBoxSection.querySelector("figcaption");
  titleElement.innerHTML = media.getAttribute("alt");

  // Récupération des noeuds HTML (image et vidéo)
  const imgElement = lightBoxSection.querySelector("img.media");
  const videoElement = lightBoxSection.querySelector("video.media");

  // Si le noeud est une image...
  if (isImage) {
    imgElement.src = media.src;
    imgElement.alt += " " + media.alt;

    // On affiche uniquement la balise Image
    videoElement.style.display = "none";
    imgElement.style.display = "initial";
  } else {
    const videoSource = media.querySelector("source");
    const videoElement = lightBoxSection.querySelector("video.media");

    // Clone l'ensemble de l'élément video pour forcer les navigateur à recharger la vidéo
    const clonedVideo = videoElement.cloneNode(true);
    const clonedSource = clonedVideo.querySelector("source");

    clonedSource.src = videoSource.src;
    clonedSource.alt += " " + media.alt;

    // Remplace l'ancien élément vidéo par son clone modifié (remplace aussi les enfants)
    videoElement.replaceWith(clonedVideo);

    imgElement.style.display = "none";
    clonedVideo.style.display = "initial";
  }

  handleLightBoxNavigation();
};

// Trouver les images précédentes et suivantes
const getSiblingsMedia = () => {
  const galerySection = document.getElementById("galery-section");

  // On récupère tous les medias de la page
  const medias = Array.from(galerySection.querySelectorAll(".media"));
  // On récupère l'id de l'image chargée
  const mediaId = lightBoxSection.dataset.selectedMedia;

  // On compare l'id de l'image chargé à tous ceux de la galerie
  const mediaIndex = medias.findIndex(
    (media) => media.parentElement.id.toString() === mediaId
  );

  // Une fois situé, on peut retrouver le précédent et le suivant
  const previousMedia = medias[mediaIndex - 1];
  const nextMedia = medias[mediaIndex + 1];

  return { previousMedia, nextMedia };
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

//// GESTION DE LA NAVIGATION AU CLAVIER
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

//// OUVERTURE ET FERMETURE DE LA LIGHTBOX
const openLightBox = (media) => {
  lightBoxSection.style.display = "grid";
  loadMediaInLightBox(media);
};

const closeLightBox = () => {
  lightBoxSection.style.display = "none";
};

lightBoxSection
  .querySelector(".close")
  .addEventListener("click", closeLightBox);

//// INITIALISATION
const main = async () => {
  const data = await getData();

  // Récupération des photographes
  const photographers = data.photographers;

  // Comparaison des id (dans l'URL et dans la classe)
  const photographerId = await getPhotographerId();
  const photograph = photographers.find(
    (photograph) => photograph.id.toString() == photographerId
  );

  displayPhotograph(photograph);
  photographerContact(photograph);

  // Gestion de la galerie
  const medias = data.media;
  const filteredMedias = medias.filter(
    (media) => media.photographerId == photographerId
  );

  createMediaGalery(filteredMedias);
  handleSelect(filteredMedias);

  // Gestion de la lightbox
  handleKeyboardNavigation();

  // Récupération des données de la bannière
  computeTotalLikes();
  setDailyPrice(photograph.price);
};

main();

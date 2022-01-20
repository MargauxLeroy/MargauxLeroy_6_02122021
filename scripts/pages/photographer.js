import { getData } from "../models/Photographer.js";

const getPhotographerId = async () => {
  const url = new URL(location);
  const id = url.searchParams.get("id");
  return id;
};

const displayPhotograph = (name, city, country, tagline, portrait) => {
  const photographHeader = document.querySelector(".photograph-header");
  const contactButton = document.querySelector(".contact_button");

  const photographInformations = document.createElement("div");
  photographInformations.innerHTML += `<h1>${name}</h1><h3>${city}, ${country}</h3><p>${tagline}</p>`;

  const photographPortrait = document.createElement("img");
  photographPortrait.classList.add("photographer-portrait");
  photographPortrait.src = "assets/photographers/" + portrait;

  photographHeader.insertBefore(photographInformations, contactButton);
  photographHeader.appendChild(photographPortrait);
};

async function main() {
  const data = await getData();
  const photographerId = await getPhotographerId();

  const photographers = data["photographers"];
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
}

main();

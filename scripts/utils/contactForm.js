export const displayModal = (photograph) => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";

  // Adaptation du nom en fonction du photographe
  const title = modal.querySelector("h2");
  title.innerHTML = "Contactez-moi <br>" + photograph.name;

  // Affichage de la valeur des inputs dans la console
  const form = modal.querySelector("form");
  const inputs = modal.querySelectorAll("input");
  const textarea = modal.querySelector("textarea");

  form.onsubmit = (event) => {
    let inputValues = [];

    inputs.forEach((input) => inputValues.push(input.value));
    inputValues.push(textarea.value);

    event.preventDefault();
    console.log(inputValues);
    modal.style.display = "none";
  };

  // Fermeture de la modale (Echap)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
};

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

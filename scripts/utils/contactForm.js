const modal = document.getElementById("contact_modal");

const displayModal = (photograph) => {
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

    // Si les valeurs des champs ne sont pas nulles...
    if (inputValues.every((inputValue) => inputValue != "")) {
      event.preventDefault();
      console.log(inputValues);
      closeModal();
      // Sinon... empêcher la modale de se fermer
    } else {
      event.preventDefault();
    }
  };

  // Fermeture de la modale (Echap)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
};

function closeModal() {
  modal.style.display = "none";
}

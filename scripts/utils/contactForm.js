const modal = document.getElementById("contact_modal");

// Création et affichage des messages d'erreurs
function displayErrorFeedback() {
  const errorMessages = modal.querySelectorAll(".error-message");

  errorMessages.forEach((errorMessage) => {
    console.log("test");
    errorMessage.style.display = "initial";
  });
}

// VERIFICATION DES VALEURS DE CHAMPS
const isFormValid = () => {
  const firstName = data.get("firstName");
  const lastName = data.get("lastName");
  const email = data.get("email");
  const message = data.get("message");
};

// OUVERTURE DE LA MODALE DE CONTACT
const displayModal = (photograph) => {
  modal.style.display = "block";

  // Adaptation du nom en fonction du photographe
  const title = modal.querySelector("h2");
  title.innerHTML = "Contactez-moi <br>" + photograph.name;

  // Affichage de la valeur des inputs dans la console
  const form = modal.querySelector("form");
  const inputs = modal.querySelectorAll("input");
  const textarea = modal.querySelector("textarea");

  // Une fois le formulaire soumis...
  form.onsubmit = (event) => {
    // Pour chaque input... on ajoute la valeur dans la liste initialisée
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
      displayErrorFeedback();
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

// FERMETURE DE MODALE
function closeModal() {
  modal.style.display = "none";
}

const displayModal = (photograph) => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";

  // Adaptation du nom en fonction du photographe
  const title = modal.querySelector("h2");
  title.innerHTML = "Contactez-moi <br>" + photograph.name;

  // Affichage de la valeur des inputs dans la console
  const form = modal.querySelector("form");
  const inputs = modal.querySelectorAll("input");

  let inputValues = [];

  inputs.forEach((input) => inputValues.push(input.value));

  form.onsubmit = (event) => {
    event.preventDefault();
    console.log(inputValues);
    modal.style.display = "none";
  };
};

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";

  const lightBox = document.querySelector(".light-box-section");
  lightBox.style.display = "none";
}

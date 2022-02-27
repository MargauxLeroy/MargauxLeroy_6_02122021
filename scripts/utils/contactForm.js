// Instanciation des constantes
const modal = document.getElementById('contact_modal')

const firstNameInput = document.querySelector('.input-firstName')
const lastNameInput = document.querySelector('.input-lastName')
const emailInput = document.querySelector('.input-email')
const messageInput = document.querySelector('.input-message')

// Création et affichage des messages d'erreurs
const displayErrorFeedback = (input) => {
  const errorMessage = input.querySelector('.error-message')
  errorMessage.style.display = 'initial'
}

const hideErrorFeedback = () => {
  const errorMessages = document.querySelectorAll('.error-message')
  errorMessages.forEach((errorMessage) => {
    errorMessage.style.display = 'none'
  })
}

// VERIFICATION DES VALEURS DE CHAMPS
const isFormValid = (form) => {
  const data = new FormData(form)

  // Récupération des champs
  const firstName = data.get('first-name')
  const lastName = data.get('last-name')
  const email = data.get('email')
  const message = data.get('your-message')

  // const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  // Conditions pour que le formulaire soit valide
  if (firstName.length < 1) {
    displayErrorFeedback(firstNameInput)
    return false
  }

  if (lastName.length < 1) {
    displayErrorFeedback(lastNameInput)
    return false
  }

  if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    displayErrorFeedback(emailInput)
    return false
  }

  if (message.length < 1) {
    displayErrorFeedback(messageInput)
    return false
  }

  // Si toutes les conditions sont passées...
  return true
}

// OUVERTURE DE LA MODALE DE CONTACT
export const displayModal = (photograph) => {
  modal.style.display = 'block'

  const formCloseButton = modal.querySelector('#form-close-button')
  formCloseButton.addEventListener('click', closeModal)

  // Adaptation du nom en fonction du photographe
  const title = modal.querySelector('h2')
  title.innerHTML = 'Contactez-moi <br>' + photograph.name

  // Affichage de la valeur des inputs dans la console
  const form = modal.querySelector('form')
  const inputs = modal.querySelectorAll('input')
  const textarea = modal.querySelector('textarea')

  // Une fois le formulaire soumis...
  form.onsubmit = (event) => {
    event.preventDefault()
    hideErrorFeedback() // Supprime les feebacks qui ne sont plus nécessaires

    // Pour chaque input... on ajoute la valeur dans la liste initialisée
    const inputValues = []
    inputs.forEach((input) => inputValues.push(input.value))
    inputValues.push(textarea.value)
    // Si les valeurs des champs ne sont pas nulles...
    if (isFormValid(form)) {
    // if (inputValues.every((inputValue) => inputValue !== '')) {
      console.log(inputValues)
      closeModal()
    }
  }

  // Fermeture de la modale (Echap)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  })
}

// FERMETURE DE MODALE
function closeModal () {
  modal.style.display = 'none'
}

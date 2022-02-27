import { getData } from '../utils/getData.js'
import { Photographer } from '../models/Photographer.js'

/**
 *
 * @param {Photograph []} photographers
 */
const displayPhotographers = (photographers) => {
  const photographersSection = document.querySelector('.photographer_section')

  // Instanciation d'une liste vide en prévision de la création du HTML des photographes
  const photographElements = []

  // Pour chaque photographe...
  photographers.forEach((photographer) => {
    // On créer un nouvel objet basé sur notre modèle
    const photographerModel = new Photographer(photographer)
    photographElements.push(photographerModel.createHTML)
  })

  // Injection en une seule fois dans le HTML
  photographersSection.innerHTML += photographElements.join('') // Le .join sert à ne pas injecter les virgules de la liste
}

// Fonction d'initialisation
const init = async () => {
  // Récupération et affichage des photographes dans la page
  const { photographers } = await getData()
  displayPhotographers(photographers)
}

init()

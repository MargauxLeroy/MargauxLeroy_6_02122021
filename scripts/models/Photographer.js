export class Photographer {
  constructor (data) {
    this._name = data.name
    this._id = data.id
    this._city = data.city
    this._country = data.country
    this._tagline = data.tagline
    this._price = data.price
    this._portrait = data.portrait
  }

  // Création d'une méthode pour créer le HTML
  get createHTML () {
    return `
        <a href="photographer.html?id=${this._id}" tabindex="1"> 
          <article>
            <img 
              src="assets/photographers/${this._portrait}" 
              class="photographer-portrait" 
              alt="Photo du photographe"
            >
            <h2 aria-label="Nom du photographe">${this._name}</h2>
            <h3 aria-label="Localisation">${this._city}, ${this._country}</h3> 
            <q>${this._tagline}</q>
            <span aria-label="Prix journalier">${this._price}€/jour</span>
          </article>
        </a>
      `
  }
}

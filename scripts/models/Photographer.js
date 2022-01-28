class Photographer {
  constructor(data) {
    this._name = data.name;
    this._id = data.id;
    this._city = data.city;
    this._country = data.country;
    this._tagline = data.tagline;
    this._price = data.price;
    this._portrait = data.portrait;
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  get location() {
    return `${this._city}, ${this._country}`;
  }

  get tagline() {
    return this._tagline;
  }

  get price() {
    return `${this._price}€/jour`;
  }

  get portrait() {
    return `/assets/photographers/${this._portrait}`;
  }

  get createHTML() {
    return `
        <a href="photographer.html?id=${this._id}"> 
          <article>
            <img src="assets/photographers/${this._portrait}" class="photographer-portrait" alt="Photo du photographe">
            <h2 aria-label="Nom du photographe">${this._name}</h2>
            <h3 aria-label="Localisation">${this._city}, ${this._country}</h3> 
            <p>${this._tagline}</p>
            <span>${this._price}€/jour</span>
          </article>
        </a>
      `;
  }
}

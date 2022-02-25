export class Image {
  constructor(data) {
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this._image = data.image;
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;
  }

  get createHTML() {
    return `
        <figure id="${this._id}" > 
          <img src="assets/images/${this._photographerId}/${this._image}" 
               class="media" 
               alt="${this._title}" 
               tabindex="5"
          >
          <figcaption class="media-informations">
            <h2 aria-label="Nom de la photo : ${this._title}">${this._title}</h2>
            <div class="likes">             
              <p class="like-number" aria-label="Nombre de likes ${this._likes}">${this._likes}</p>
              <button class="like-button" data-active="false" tabindex="5" aria-label="Icône de coeur">
                <i class="fas fa-heart"></i>
              </button>    
            </div>
          </figcaption>
        </figure>
      `;
  }
}

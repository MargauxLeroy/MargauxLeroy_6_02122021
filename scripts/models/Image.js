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
        <figure id="${this._id}" tabindex="4"> 
          <img src="assets/images/${this._photographerId}/${this._image}" 
               class="media" 
               alt="${this._title}" 
               height="300" width="350"
          >
          <figcaption class="media-informations">
            <h2 aria-label="Nom de la photo">${this._title}</h2>
            <div class="likes">             
              <p class="like-number">${this._likes}</p>
              <button class="like-button" data-active='false'><i class="fas fa-heart"></i></button>    
            </div>
          </figcaption>
        </figure>
      `;
  }
}

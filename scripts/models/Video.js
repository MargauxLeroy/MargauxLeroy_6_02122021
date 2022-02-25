export class Video {
  constructor(data) {
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this._video = data.video;
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;
  }

  get createHTML() {
    return `
            <figure id="${this._id}"> 
              <video class="media" controls alt="${this._title}" tabindex="5">
                <source src="assets/images/${this._photographerId}/${this._video}" type="video/webm" >
              </video>
              <figcaption class="media-informations">
                <h2 aria-label="Nom de la photo">${this._title}</h2>
                <div class="likes">             
                  <p class="like-number">${this._likes}</p>
                  <button class="like-button" data-active="false" tabindex="5" aria-label="Icône de coeur">
                    <i class="fas fa-heart"></i>
                  </button>    
                </div>
              </figcaption>
             </figure>
          `;
  }
}

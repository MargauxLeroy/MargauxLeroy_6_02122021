import { Image } from '../models/Image.js'
import { Video } from '../models/Video.js'

// Mise en place d'un factory pattern
// Création d'une classe mère
export class MediaFactory {
  constructor (data) {
    // Si le média est une image...
    if (data.type === 'image') {
      return new Image(data)
    // Si c'est une vidéo...
    } else {
      return new Video(data)
    }
  }
}

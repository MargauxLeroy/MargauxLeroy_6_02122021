import { Image } from "../models/Image.js";
import { Video } from "../models/Video.js";

export class MediaFactory {
  constructor(data) {
    if (data.type == "image") {
      return new Image(data);
    } else {
      return new Video(data);
    }
  }
}

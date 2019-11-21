import {Sprite} from "../base/Sprite"
import {DataStore} from "../base/DataStore"

export class BeginButton extends Sprite{
  constructor(){
    const image = Sprite.getImage('begin');
    super(image,0,0,image.width,image.height,(DataStore.getInstance().canvas.width-image.width/3)/2,(DataStore.getInstance().canvas.height-image.height/3)/2,image.width/3,image.height/3);
  }
}
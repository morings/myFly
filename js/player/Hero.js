import {Sprite} from "../base/Sprite"
import {DataStore} from "../base/DataStore"

export class Hero extends Sprite{
  constructor(){
    const image = Sprite.getImage('hero');
    super(image,0,0,image.width,image.height,(DataStore.getInstance().canvas.width-image.width/2)/2,DataStore.getInstance().canvas.height-150,image.width/2,image.height/2);   
  }
}
import {Sprite} from "../base/Sprite"
import {DataStore} from "../base/DataStore"

export class Enemy extends Sprite{
  constructor(){
    const image = Sprite.getImage('enemy');
    var x = Math.random()*(DataStore.getInstance().canvas.width-image.width/2);
    
    super(image,0,0,image.width,image.height,x,-image.height/2,image.width/2,image.height/2);   
    console.log(this.x)
  }
  update(){
    this.y = this.y + 6;
    if(this.y>DataStore.getInstance().canvas.height){
      DataStore.getInstance().get('enemys').shift()
    }
  }
}
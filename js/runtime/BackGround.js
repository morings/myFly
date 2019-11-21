import {Sprite} from "../base/Sprite"
import {DataStore} from "../base/DataStore"

export class BackGround extends Sprite{
  constructor(){
    const image = Sprite.getImage('bg');
    super(image);
    this.top = 0;
  }
  draw(){
    this.ctx.drawImage(
      this.img,
      0,
      0,
      this.img.width,
      this.img.height,
      0,
      this.top-DataStore.getInstance().canvas.height,
      DataStore.getInstance().canvas.width,
      DataStore.getInstance().canvas.height
    );
    this.ctx.drawImage(
      this.img,
      0,
      0,
      this.img.width,
      this.img.height,
      0,
      this.top,
      DataStore.getInstance().canvas.width,
      DataStore.getInstance().canvas.height
    )
    this.top = this.top + 5
    if(this.top>=DataStore.getInstance().canvas.height){
      this.top = 0;
    }
  }
}
import {DataStore} from "../base/DataStore.js";
import {Sprite} from "../base/Sprite"
export class GameOver {
  constructor(){
    this.ctx = DataStore.getInstance().ctx;
    this.canvans = DataStore.getInstance().canvas;
  }
  draw(){
    var image =Sprite.getImage("Common");
    this.ctx.drawImage(
      image,
      0,
      0,
      119,
      108,
      this.canvans.width/2 - 150,
      this.canvans.height/2 - 150,
      300,
      300
    )
    this.ctx.drawImage(
      image,
      120, 6, 39, 24,
      this.canvans.width / 2 - 60,
      this.canvans.height / 2,
      120, 40
    )
    this.ctx.fillText(
      '重新开始',
      this.canvans.width / 2,
      this.canvans.height / 2 + 20 
    )
    this.ctx.fillText(
      DataStore.getInstance().get('score').scoreNum,
      this.canvans.width / 2,
      this.canvans.height / 2 + 80 
    )
  }
  
}
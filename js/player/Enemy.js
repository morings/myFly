import {Sprite} from "../base/Sprite"
import {DataStore} from "../base/DataStore"

export class Enemy extends Sprite{
  constructor(){
    const image = Sprite.getImage('enemy');
    var x = Math.random()*(DataStore.getInstance().canvas.width-image.width/2);
    
    super(image,0,0,image.width,image.height,x,-image.height/2,image.width/2,image.height/2); 
    this.activeIndex = 0;  
    
  }
  update(){
    this.y = this.y + 6;
    if(this.y>DataStore.getInstance().canvas.height){
      DataStore.getInstance().get('enemys').shift()
    }
  }
  draw(img = this.img,
        srcX = this.srcX,
        srcY = this.srcY,
        srcW = this.srcW,
        srcH = this.srcH,
        x = this.x,
        y = this.y,
        width = this.width,
        height = this.height) {
    if(this.noShow){
      if(this.activeIndex<12){
        this.activeIndex++
        let img = Sprite.getImage('explosion'+this.activeIndex);
        return this.ctx.drawImage(
          img,
          srcX,
          srcY,
          srcW,
          srcH,
          x,
          y,
          width,
          height
        );
        
      }
      
    }else{
      this.ctx.drawImage(
          img,
          srcX,
          srcY,
          srcW,
          srcH,
          x,
          y,
          width,
          height
      );
    }
    
  }
}
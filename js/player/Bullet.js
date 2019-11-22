import {DataStore} from "../base/DataStore.js";
import {Sprite} from "../base/Sprite"
export class Bullet extends Sprite{
  constructor() {
    var dataStore = DataStore.getInstance();
    var image = dataStore.res.get('bullet');
    var hero = dataStore.get('hero')
    super(image,0,0,image.width,image.height,hero.x+hero.width/2-image.width/8,hero.y-10,image.width/4,image.height/4)
    this.noShow = false;
  }
  update(){
    this.y = this.y - 10;
    if(this.y<-this.height){
      DataStore.getInstance().get('bullets').shift()
    }
  }
}


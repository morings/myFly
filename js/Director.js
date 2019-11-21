//导演类，控制游戏的逻辑

import {DataStore} from "./base/DataStore.js";
import {Bullet} from "./player/Bullet"
import {Enemy} from "./player/Enemy"

export class Director {
  static getInstance() {
    if (!Director.instance) {
        Director.instance = new Director();
    }
    return Director.instance;
  }
  createBullet(){
    let bullet = new Bullet();
    this.dataStore.get("bullets").push(bullet);
    //this.playShoot()
  }
  createEnemy(){
    let enemy = new Enemy();
    this.dataStore.get("enemys").push(enemy);
  }
  constructor() {
    this.dataStore = DataStore.getInstance();
    this.moveSpeed = 2;
  }
  playShoot(){
    let audio = wx.createInnerAudioContext();
    audio.src="/audio/bullet.mp3";
    audio.play()
  }
  playBoom(){
    let audio = wx.createInnerAudioContext();
    audio.src="/audio/boom.mp3";
    audio.play()
  }
  run() {
    this.check()//监测碰撞
    if(!this.isGameOver){
      this.dataStore.get('background').draw();
      this.dataStore.get('hero').draw();
       this.dataStore.get('bullets').forEach((item)=>{
        item.draw()
      })
      this.dataStore.get('enemys').forEach((item)=>{
        item.draw()
      })
      this.timer = requestAnimationFrame(() => this.run());
      this.dataStore.get('bullets').forEach((item)=>{
        item.update()
      })
      this.dataStore.get('enemys').forEach((item)=>{
        item.update()
      })
      this.collisionDetection()
    }else{
      cancelAnimationFrame(this.timer);
      clearInterval(this.time1);
      clearInterval(this.time2);
      
    }
    
  }
  check(){
    var enemys = this.dataStore.get('enemys').filter(item=>!item.noShow);
    var hero = this.dataStore.get('hero');
    for(let enemy of enemys){
      if((hero.x+hero.width)>enemy.x && hero.x<(enemy.x+enemy.width) && (hero.y+hero.height)>enemy.y && hero.y<(enemy.y+enemy.height) && !enemy.noShow && !hero.noShow){
        this.isGameOver = true;
      }
    }
    
  }
  checkOnAir(touch){
    var hero = this.dataStore.get('hero')
    if(touch.clientX >= hero.x && touch.clientX <= (hero.x+hero.width) && touch.clientY >= hero.y && touch.clientY <= (hero.y+hero.height)){
      this.onAir = true
    }
  }
  collisionDetection(){
    var bullets = this.dataStore.get('bullets');
    var enemys = this.dataStore.get('enemys');
    for(let bullet of bullets){
      for(let enemy of enemys){
        if((bullet.x+bullet.width)>enemy.x && bullet.x<(enemy.x+enemy.width) && (bullet.y+bullet.height)>enemy.y && bullet.y<(enemy.y+enemy.height) && !enemy.noShow && !bullet.noShow){
          bullet.noShow = true;
          enemy.noShow = true;
          this.playBoom()
        }else{

        }
      }
    }
  }
}

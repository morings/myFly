import {ResourceLoader} from "./js/base/ResourceLoader"
import {DataStore} from "./js/base/DataStore"
import {BackGround} from "./js/runtime/BackGround.js"
import {BeginButton} from "./js/player/BeginButton.js"
import {Hero} from "./js/player/Hero.js"
import {Director} from "./js/Director.js"

export class Main{
  constructor(){ 
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    this.dataStore = DataStore.getInstance();
    this.director = Director.getInstance()
    const loader = ResourceLoader.create();
    loader.onLoaded((map)=>{
      this.onResourceFirstLoaded(map)
    });
    //this.createBackgroundMusic()
  }
  createBackgroundMusic(){
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.src = "/audio/bgm.mp3";
    this.innerAudioContext.loop = true;
    this.innerAudioContext.play()

  }
  onResourceFirstLoaded(map){
    this.director.isGameOver = true;
    this.director.onAir = false;
    this.dataStore.res = map;
    this.dataStore.canvas = this.canvas;
    this.dataStore.ctx = this.ctx;
    this.dataStore
        .put('background', BackGround)
        .put('beginButton', BeginButton);
    this.dataStore.get('background').draw();  
    this.dataStore.get('beginButton').draw();
    this.initEvent()   
  }
  init(){
    this.director.isGameOver = false;
    this.dataStore.put('background', BackGround);
    this.dataStore.put('hero', Hero);
    this.dataStore.put('bullets', []);
    this.dataStore.put('enemys', []);
    this.director.run() 
    this.director.time1 = setInterval(() => {
      this.director.createBullet()
    }, 200);
    this.director.time2 = setInterval(() => {
      this.director.createEnemy()
    }, 200);
  }   
  initEvent(){
    wx.onTouchStart((res)=>{
      if(this.director.isGameOver){
        this.init()
      }else{
        var touch = res.touches[0];
        this.director.checkOnAir(touch)
      }
    })    
    wx.onTouchMove((res)=>{
      if(this.director.onAir && !this.director.isGameOver){
        var current = res.changedTouches[0];
        var hero = this.dataStore.get('hero')      
        var x = current.clientX-hero.width/2;
        var y = current.clientY-hero.height/2;
        //边界判定
        if(x<0){
          hero.x = 0;
        }else if((x+hero.width)>this.canvas.width){
          hero.x = this.canvas.width - hero.width;
        }else{
          hero.x = x;
        }
        
        if(y<0){
          hero.y = 0;
        }else if((y+hero.height)>this.canvas.height){
          hero.y = this.canvas.height - hero.height;
        }else{
          hero.y = y;
        }
        
      }
    })
    wx.onTouchEnd(res=>{
      this.onAir = false;
    })
  }
        
}

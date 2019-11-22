import {DataStore} from "../base/DataStore.js";
export class Score {
  constructor(){
    // 设置字体
    this.ctx = DataStore.getInstance().ctx
    this.ctx.font = "20px bold 黑体";
    // 设置颜色
    this.ctx.fillStyle = "#ffffff";
    // 设置水平对齐方式
    this.ctx.textAlign = "center";
    // 设置垂直对齐方式
    this.ctx.textBaseline = "middle";
    //设置分数
    this.scoreNum = 0
  }
  draw(){
    this.ctx.fillText(this.scoreNum,40,40)
  }
}
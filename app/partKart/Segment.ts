//O package com.partkart{

//O import flash.geom.Point;
//O import flash.display.*;

import { Graphics } from 'pixi.js';
import { Point } from 'pixi.js';
import { Global }  from "./Global";

//O public class Segment extends Sprite
export class Segment extends Graphics
{
   //O public var p1:Point;
   public p1:Point;
   //O public var p2:Point;
   public p2:Point;

   //O public var active:Boolean = false;
   public active:boolean = false;

   //O public var linestyle:int = 0;
   public linestyle: number = 0;

   //O public function Segment(point1:Point, point2:Point):void
   constructor(point1:Point, point2:Point)
   {
      //New
      super();

      //O p1 = point1;
      this.p1 = point1;
      //O p2 = point2;
      this.p2 = point2;
   }

   //O public function setLineStyle(style:int):void
   public setLineStyle(style: number):void
   {
      //O linestyle = style;
      this.linestyle = style;
      //O switch(style)
      switch(style)
      {
         //O case 0: // default black line
         case 0: // default black line
            //O graphics.lineStyle(2,0x333333,1,true,LineScaleMode.NONE);
            //N See Grid.ts for conversion
            this.lineStyle(2,0x333333,1,0.5,true);
         //O break;
         break;
         //O case 1: // highlight line
         case 1: // highlight line
            //O graphics.lineStyle(3,0xee4500,1,true,LineScaleMode.NONE);
            //N See Grid.ts for conversion
            this.lineStyle(3,0xee4500,1,0.5,true);
         //O break;
         break;
         //O case 2: // semi-transparent guide line
         case 2: // semi-transparent guide line
            //O graphics.lineStyle(1, 0x000000, 0.3, false, LineScaleMode.NONE);
            //N See Grid.ts for conversion
            this.lineStyle(1, 0x000000, 0.3, 0, true);
         //O break;
         break;
         /*
//O      case 3: // transparent collision line
//O         this.lineStyle(16, 0xff0000, 0, false, LineScaleMode.NONE, CapsStyle.ROUND);
//O      break;
         */
         //O case 3: // green cut line
         case 3: // green cut line
            //O graphics.lineStyle(1,0x007700,1,true,LineScaleMode.NONE);
            //N See Grid.ts for conversion
            this.lineStyle(1,0x007700,1,0.5,true);
         //O break;
         break;
         //O case 4: // thick highlighted green cut line
         case 4: // thick highlighted green cut line
            //O graphics.lineStyle(2,0x009911,1,true,LineScaleMode.NONE);
            //N See Grid.ts for conversion
            this.lineStyle(2,0x009911,1,0.5,true);
         //O break;
         break;
         //O case 5: // blue biarc line
         case 5: // blue biarc line
            //O graphics.lineStyle(1,0x2266ee,1,true,LineScaleMode.NONE);
            //N See Grid.ts for conversion
            this.lineStyle(1,0x2266ee,1,0.5,true);
         //O break;
         break;
         //O case 6: // thick hightlighted blue biarc line
         case 6: // thick hightlighted blue biarc line
            //O graphics.lineStyle(2,0x3366ff,1,true,LineScaleMode.NONE);
            //N See Grid.ts for conversion
            this.lineStyle(2,0x3366ff,1,0.5,true);
         //O break;
         break;
      }
   }

   //O public function offset(radius:Number):Boolean
   public offset(radius:number):boolean
   {

      //O var delta:Point = new Point(p2.x-p1.x,p2.y-p1.y);
      var delta:Point = new Point(this.p2.x-this.p1.x,this.p2.y-this.p1.y);
      //O var normal:Point = new Point(-delta.y,delta.x);
      var normal:Point = new Point(-delta.y,delta.x);

      //O normal.normalize(radius);
      //normal.normalize(radius);
      //H normalize does not exist on point.  it was created on Global
      normal = Global.normalize(normal, radius);
      //O p1.x += normal.x; p2.x += normal.x;
      this.p1.x += normal.x; this.p2.x += normal.x;
      //O p1.y += normal.y; p2.y += normal.y;
      this.p1.y += normal.y; this.p2.y += normal.y;

      //O return true;
      return true;
   }

   //O public function clone():Segment
   public clone():Segment
   {
      //O var p1clone:Point = p1.clone();
      var p1clone:Point = this.p1.clone();
      //O var p2clone:Point = p2.clone();
      var p2clone:Point = this.p2.clone();

      //O return new Segment(p1clone,p2clone);
      return new Segment(p1clone,p2clone);
   }

   //O returns the normal direction
   //O public function getNormal():Point
   public getNormal():Point
   {
      //O return new Point(-p2.y+p1.y,p2.x-p1.x);
      return new Point(-this.p2.y+this.p1.y,this.p2.x-this.p1.x);
   }

   //O returns the length of this segment
   //O public function getLength():Number
   public getLength():number
   {
      //O return Math.sqrt(Math.pow(p2.x-p1.x,2) + Math.pow(p2.y-p1.y,2));
      return Math.sqrt(Math.pow(this.p2.x-this.p1.x,2) + Math.pow(this.p2.y-this.p1.y,2));
   }

   //O public function getPointFromLength(length:Number):Point
   public getPointFromLength(length:number):Point
   {
      //O var tlength:Number = getLength();
      let tlength:number = this.getLength();
      //O var t:Number = length/tlength;
      let t:number = length/tlength;
      //O return new Point((1-t)*p1.x + t*p2.x, (1-t)*p1.y + t*p2.y);
      return new Point((1-t)*this.p1.x + t*this.p2.x, (1-t)*this.p1.y + t*this.p2.y);
   }

   //O public function splitByLength(length:Number):Array
   public splitByLength(length:number):Array<Segment>
   {
      //O if(length == 0)
      if(length == 0)
      {
         //O return new Array(this);
         return new Array(this);
      }
      //O var splitpoint:Point = getPointFromLength(length);
      let splitpoint:Point = this.getPointFromLength(length);

      //O var seg1:Segment = new Segment(p1,splitpoint);
      let seg1:Segment = new Segment(this.p1,splitpoint);
      //O var seg2:Segment = new Segment(splitpoint,p2);
      let seg2:Segment = new Segment(splitpoint,this.p2);

      //O return new Array(seg1,seg2);
      return new Array(seg1,seg2);
   }

   //O public function reverse():*
   public reverse(): Segment
   {
      //O return new Segment(p2, p1);
      return new Segment(this.p2, this.p1);
   }
}
//O }

//O package com.partkart{


//O import flash.display.Sprite;
//O import flash.geom.Point;

import * as PIXI from 'pixi.js';
//N Unused
// import { Point }  from "pixi.js";
import { Global }  from "./Global";


//O public class Tab extends Sprite
export default class Tab extends PIXI.Graphics
{
   //O public var location:Number;
   public location: number;
   //O public var tabwidth:Number;
   public tabwidth: number;
   //O public var tabheight:Number;
   public tabheight: number;


   //O tool diameter
   //O public var diameter:Number;
   diameter: number;

   //O public var active:Boolean = false;
   active:Boolean = false;

   //O public var p1:Point;
   //H Unused?
   //p1:Point;
   //O public var p2:Point;
   //H Unused?
   //p2:Point;

   //O public function Tab(inputlocation:Number, inputwidth:Number, inputheight:Number, inputdiameter:Number):void
   constructor (inputlocation: number, inputwidth: number, inputheight: number, inputdiameter: number)
   {
      //New
      super();

      //O location = inputlocation;
      this.location = inputlocation;
      //O tabwidth = inputwidth;
      this.tabwidth = inputwidth;
      //O tabheight = inputheight;
      this.tabheight = inputheight;
      //O diameter = inputdiameter;
      this.diameter = inputdiameter;
   }

   //O public function redraw():void
   public redraw():void
   {
      //O graphics.clear();
      this.clear();
      //O if (active)
      if (this.active)
      {
         //O graphics.beginFill(0x0099ff);
         this.beginFill(0x0099ff);
      } else
      {
         //O graphics.lineStyle(2,0x0099ff,1);
         this.lineStyle(2,0x0099ff,1);
         //O graphics.beginFill(0xffffff,0);
         this.beginFill(0xffffff,0);
      }


      //O graphics.drawRoundRect(-(diameter/2)*Global.zoom, -(tabwidth/2)*Global.zoom,diameter*Global.zoom,tabwidth*Global.zoom, diameter*Global.zoom);
      this.drawRoundedRect(-(this.diameter/2)*Global.zoom, -(this.tabwidth/2)*Global.zoom,this.diameter*Global.zoom,this.tabwidth*Global.zoom, this.diameter*Global.zoom);

      //O graphics.endFill();
      this.endFill();
   }


   //O public function setActive():void
   public setActive():void
   {
      //O var changed:Boolean = (active == false);
      let changed:Boolean = (this.active == false);
      //O active = true;
      this.active = true;

      //O if (changed)
      if (changed)
      {
         //O redraw();
         this.redraw();
      }
   }

   //O public function setInactive():void
   public setInactive():void
   {
      //O var changed:Boolean = (active == true);
      let changed:Boolean = (this.active == true);
      //O active = false;
      this.active = false;


      //O if (changed)
      if (changed)
      {
         //O redraw();
         this.redraw();
      }
   }
}
//O}

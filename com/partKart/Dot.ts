//O package com.partkart

//O   import flash.display.*;
//O   import com.partkart.Segment;
//O   import flash.geom.Point;
//O   import com.partkart.Path;

import * as PIXI from "pixi.js";
import { Segment } from "./Segment";
//import { Path } from "./Path";

//O public class Dot extends Sprite
export class Dot extends PIXI.Sprite
{
   // the dot keeps track of which two segments it controls
   public s1: Segment;
   public s2: Segment;

   // and a reference to the segment point that it controls
   //O public var point:Point;
   public point: PIXI.Point;

   // and which segments for which it is a bezier control point
   //O public var c1:Segment;
   public c1: Segment;
   //O public var c2:Segment;
   public c2: Segment;

   // active means the dot is red
   public active: boolean;
   // current means the dot was the most recently clicked
   public current: boolean = false;
   // whether the dot is currently circled
   public loop: boolean = false;

   public looppoint: PIXI.Point;
   // merge with this path after dragging
   public looppath:Path;

   //O private loopshape: PIXI.Shape;
   private loopshape: PIXI.Graphics;

   //O private hitshape: PIXI.Shape;
   private hitshape: PIXI.Graphics;

   //O public function Dot():void
   public Dot( ): void
   {
      //O setInactive();
      this.setInactive( );
   }

   //O public function setActive():void
   public setActive(  ): void
   {
      //O active = true;
      this.active = true;

      //O clearChildren();
      this.clearChildren(  );
      //O let dot1 = new PIXI.Shape(  );
      let dot1 = new PIXI.Graphics(  );
      //O dot1.graphics.beginFill( 0x000000 );
      dot1.beginFill( 0x000000 );
      //O dot1.graphics.drawRect( 0,0,30,30 );
      dot1.drawRect( 0,0,30,30 );
      //O dot1.graphics.endFill(  );
      dot1.endFill(  );
      //O dot1.x = -15;
      dot1.x = -15;
      //O dot1.y = -15;
      dot1.y = -15;

      //O dot1.alpha = 0;
      dot1.alpha = 0;

      //O let dot3 = new PIXI.Shape(  );
      let dot3 = new PIXI.Graphics(  );
      //O dot3.graphics.beginFill( 0xff0000 );
      dot3.beginFill( 0xff0000 );
      //O dot3.graphics.drawCircle( 0,0,5 );
      dot3.drawCircle( 0,0,5 );
      //O dot3.graphics.endFill(  );
      dot3.endFill(  );

      //NC Unused
      //O let dotsprite = new PIXI.Sprite(  );

      //O addChild(dot1);
      this.addChild( dot1 );
      //O addChild(dot3);
      this.addChild( dot3 );
   }

   //O public function setInactive():void
   public setInactive(  ): void
   {
      //O active = false;
      this.active = false;

      //O clearChildren();
      this.clearChildren(  );
      //O let dot1 = new PIXI.Shape(  );
      let dot1 = new PIXI.Graphics(  );
      //O dot1.graphics.beginFill( 0x000000 );
      dot1.beginFill( 0x000000 );
      //O dot1.graphics.drawRect( 0,0,30,30 );
      dot1.drawRect( 0,0,30,30 );
      //O dot1.graphics.endFill(  );
      dot1.endFill(  );
      //O dot1.x = -15;
      dot1.x = -15;
      //O dot1.y = -15;
      dot1.y = -15;

      //O dot1.alpha = 0;
      dot1.alpha = 0;

      //O,let dot2 = new PIXI.Shape(  );
      let dot2 = new PIXI.Graphics(  );
      //O dot2.graphics.beginFill( 0x000000 );
      dot2.beginFill( 0x000000 );
      //O dot2.graphics.drawCircle( 0,0,5 );
      dot2.drawCircle( 0,0,5 );
      //O dot2.graphics.endFill(  );
      dot2.endFill(  );

      //O let dot3 = new PIXI.Shape(  );
      let dot3 = new PIXI.Graphics(  );
      //O dot3.graphics.beginFill( 0xff0000 );
      dot3.beginFill( 0xff0000 );
      //O dot3.graphics.drawCircle( 0,0,3 );
      dot3.drawCircle( 0,0,3 );
      //O dot3.graphics.endFill(  );
      dot3.endFill(  );

      //NC Unused
      //O let dotsprite = new PIXI.Sprite(  );

      //O addChild(dot1);
      this.addChild( dot1 );
      //O addChild(dot2);
      this.addChild( dot2 );
      //O addChild(dot3);
      this.addChild( dot3 );
   }

   //O public function setLoop():void
   public setLoop(  ): void
   {
      //O loop = true;
      this.loop = true;
      //O if ( this.loopshape == null || ( this.loopshape != null && !contains( this.loopshape ) ) )
      if ( this.loopshape == null || ( this.loopshape != null && ! this.hitArea.contains(this.loopshape.x, this.loopshape.y ) ) )
      {
         //O,this.loopshape = new PIXI.Shape(  );
         this.loopshape = new PIXI.Graphics(  );
         //O this.loopshape.graphics.beginFill( 0xff0000 );
         this.loopshape.beginFill( 0xff0000 );
         //O this.loopshape.graphics.beginFill( 0xff0000 );
         this.loopshape.beginFill( 0xff0000 );
         //O this.loopshape.graphics.drawCircle( 0,0,15 );
         this.loopshape.drawCircle( 0,0,15 );
         //O this.loopshape.graphics.drawCircle( 0,0,13 );
         this.loopshape.drawCircle( 0,0,13 );
         //O this.loopshape.graphics.endFill(  );
         this.loopshape.endFill(  );

         //O addChild(loopshape);
         this.addChild( this.loopshape );
      }
   }

   //O public function unsetLoop():void
   public unsetLoop( ): void
   {
      //O loop = false;
      this.loop = false;
      //O if( this.loopshape != null && contains( this.loopshape ) )
      if( this.loopshape != null && this.hitArea.contains(this.loopshape.x, this.loopshape.y ) )
      {
         //O removeChild(loopshape);
         this.removeChild( this.loopshape );
      }
   }

   private clearChildren(  ): void
   {
      //O while( numChildren > 0 )
      while( this.children.length > 0 )
      {
         //O removeChildAt(0);
         this.removeChildAt( 0 );
      }
   }

   //O public function setCurrent():void
   public setCurrent(  ): void
   {
      //O current = true;
      this.current = true;
   }

   //O public function unsetCurrent():void
   public unsetCurrent(  ): void
   {
      //O current = false;
      this.current = false;
   }

   //O public function setDragging():void
   public setDragging(  ): void
   {
      // we need a larger hit area for the current dot in order for the mouse to "stay on the dot" during snapping operations
      //O if ( this.hitshape == null || ( this.hitshape != null && !contains( this.hitshape ) ) )
      if ( this.hitshape == null || ( this.hitshape != null && ! this.hitArea.contains(this.hitshape.x, this.hitshape.y ) ) )
      {
         //O this.hitshape = new PIXI.Shape(  );
         this.hitshape = new PIXI.Graphics(  );
         //O this.hitshape.graphics.beginFill( 0xff0000 );
         this.hitshape.beginFill( 0xff0000 );
         //O this.hitshape.graphics.drawCircle( 0,0,80 );
         this.hitshape.drawCircle( 0,0,80 );
         //O this.hitshape.graphics.endFill(  );
         this.hitshape.endFill(  );
         //O hitshape.alpha = 0;
         this.hitshape.alpha = 0;
         //O addChild(hitshape);
         this.addChild( this.hitshape );
      }
   }

   //O public function unsetDragging():void
   public unsetDragging(  ): void
   {
      //O if ( this.hitshape != null && contains( this.hitshape ) )
      if ( this.hitshape != null && this.hitArea.contains(this.hitshape.x, this.hitshape.y ) )
      {
         //O removeChild(hitshape);
         this.removeChild( this.hitshape );
      }
   }

   // identifies this dot as a sketch dot
   //O public function setSketch():void
   public setSketch(  ): void
   {
      //O clearChildren();
      this.clearChildren(  );
      //O let sketchshape = new PIXI.Shape(  );
      let sketchshape = new PIXI.Graphics(  );
      //O sketchshape.graphics.beginFill( 0xffdd00 );
      sketchshape.beginFill( 0xffdd00 );
      //O sketchshape.graphics.drawCircle( 0,0,22 );
      sketchshape.drawCircle( 0,0,22 );
      //O sketchshape.graphics.endFill( );
      sketchshape.endFill( );

      //O addChild(sketchshape);
      this.addChild( sketchshape );
   }

}

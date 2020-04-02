//O package com.partkart{

//O import flash.geom.Point
//O import flash.display.*

import { Graphics } from 'pixi.js'
import { Point } from 'pixi.js'
import { Global }  from "./Global"

//O public class Segment extends Sprite
export class Segment extends Graphics
{
   public p1: PIXI.Point
   public p2: PIXI.Point

   public active: boolean = false

   public linestyle: number = 0

   constructor( point1: PIXI.Point, point2: PIXI.Point )
   {
      //New
      super(  )

      this.p1 = point1
      this.p2 = point2
   }

   public setLineStyle( style: number ):void
   {
      this.linestyle = style
      switch( style )
      {
         case 0: // default black line
            //O graphics.lineStyle( 2, 0x333333, 1, true, LineScaleMode.NONE )
            //N See Grid.ts for conversion
            this.lineStyle( 2, 0x333333, 1, 0.5, true )
         break
         case 1: // highlight line
            //O graphics.lineStyle( 3, 0xee4500, 1, true, LineScaleMode.NONE )
            //N See Grid.ts for conversion
            this.lineStyle( 3, 0xee4500, 1, 0.5, true )
         break
         case 2: // semi-transparent guide line
            //O graphics.lineStyle( 1, 0x000000, 0.3, false, LineScaleMode.NONE )
            //N See Grid.ts for conversion
            this.lineStyle( 1, 0x000000, 0.3, 0, true )
         break
         /*
//O      case 3: // transparent collision line
//O         this.lineStyle( 16, 0xff0000, 0, false, LineScaleMode.NONE, CapsStyle.ROUND )
//O      break
         */
         case 3: // green cut line
            //O graphics.lineStyle( 1, 0x007700, 1, true, LineScaleMode.NONE )
            //N See Grid.ts for conversion
            this.lineStyle( 1, 0x007700, 1, 0.5, true )
         break
         case 4: // thick highlighted green cut line
            //O graphics.lineStyle( 2, 0x009911, 1, true, LineScaleMode.NONE )
            //N See Grid.ts for conversion
            this.lineStyle( 2 , 0x009911, 1, 0.5, true )
         break
         case 5: // blue biarc line
            //O graphics.lineStyle( 1, 0x2266ee, 1, true, LineScaleMode.NONE )
            //N See Grid.ts for conversion
            this.lineStyle( 1,0x2266ee,1,0.5,true )
         break
         case 6: // thick hightlighted blue biarc line
            //O graphics.lineStyle( 2,0x3366ff, 1, true, LineScaleMode.NONE )
            //N See Grid.ts for conversion
            this.lineStyle( 2,0x3366ff, 1 , 0.5, true )
         break
      }
   }

   public offset( radius: number ):boolean
   {

      var delta: PIXI.Point = new Point( this.p2.x - this.p1.x, this.p2.y - this.p1.y )
      var normal: PIXI.Point = new Point( -delta.y, delta.x )

      //O normal.normalize( radius )
      //H normalize does not exist on point.  it was created on Global
      normal = Global.normalize( normal, radius )
      this.p1.x += normal.x; this.p2.x += normal.x
      this.p1.y += normal.y; this.p2.y += normal.y

      return true
   }

   public clone(  ):Segment
   {
      var p1clone: PIXI.Point = this.p1.clone(  )
      var p2clone: PIXI.Point = this.p2.clone(  )

      return new Segment( p1clone, p2clone )
   }

   // returns the normal direction
   public getNormal(  ): PIXI.Point
   {
      //O return new Point( -p2.y + p1.y , p2.x-p1.x )
      return new Point( -this.p2.y + this.p1.y, this.p2.x - this.p1.x )
   }

   // returns the length of this segment
   public getLength(  ): number
   {
      return Math.sqrt( Math.pow( this.p2.x - this.p1.x,2 ) + Math.pow( this.p2.y - this.p1.y,2 ) )
   }

   public getPointFromLength( length: number ): PIXI.Point
   {
      let tlength: number = this.getLength(  )
      let t: number = length/tlength
      return new Point( ( 1 - t ) * this.p1.x + t * this.p2.x, ( 1 - t ) * this.p1.y + t * this.p2.y )
   }

   public splitByLength( length: number ): Array<Segment>
   {
      //O if ( length == 0 )
      if ( length == 0 )
      {
         return new Array( this )
      }
      let splitpoint: PIXI.Point = this.getPointFromLength( length )

      let seg1:Segment = new Segment( this.p1, splitpoint )
      let seg2:Segment = new Segment( splitpoint, this.p2 )

      return new Array( seg1, seg2 )
   }

   //O public function reverse( ):*
   //fixme star
   public reverse( ): Segment
   {
      return new Segment( this.p2, this.p1 )
   }
}

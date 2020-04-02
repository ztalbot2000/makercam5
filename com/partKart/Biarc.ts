//O package com.partkart
//O {
//O    import flash.geom.Point
import * as PIXI from 'pixi.js'
import { Global }  from './Global'
import { CircularArc }  from './CircularArc'

export class Biarc
{
   // a biarc is composed of two circular arcs that are tangential at their joint
   // a biarc is a good way of approximating bezier splines for cnc machining
   // as many controllers only accept curves in the form of G02 and G03 codes ( circular motion )

   // each of the points the biarc travels through, p1 and p3 are endpoints of the bezier
   // p2 is the incenter of the bezier triangle

   public p1: PIXI.Point
   public p2: PIXI.Point
   public p3: PIXI.Point

   // center points of each arc segment
   public c1: PIXI.Point
   public c2: PIXI.Point

   // radius values of each arc segment
   public r1: number
   public r2: number

   // error flag when the circle is too flat
   public flat: boolean = false

   // the constructor takes the coordinates of a bezier triangle
   // note: pb != p2
   constructor ( pa: PIXI.Point, pb: PIXI.Point, pc: PIXI.Point )
   {
      this.p1 = pa
      this.p3 = pc

      this.p2 = this.incenter( pa, pb, pc )

      //O let t1: PIXI.Point = pb.subtract( pa )
      let t1: PIXI.Point = Global.subtract(pb, pa )

      // this is a property of the incenter biarc division method - that the tangent at the joint is
      // equal to the vector from pa to pc
      //O let t2: PIXI.Point = pc.subtract( pa )
      let t2: PIXI.Point = Global.subtract(pc, pa )

      let circ1:Array< number | PIXI.Point > = this.arc( this.p1, this.p2, t1 )
      let circ2:Array< number | PIXI.Point > = this.arc( this.p2, this.p3, t2 )

      // Cast is valid as array is of mixed types
      this.r1 = < number > circ1[ 0 ]
      this.c1 = < PIXI.Point > circ1[ 1 ]

      this.r2 = < number > circ2[ 0 ]
      this.c2 = < PIXI.Point > circ2[ 1 ]
   }

   // returns the incenter point, given the bounding bezier triangle
   private incenter( pa: PIXI.Point, pb: PIXI.Point, pc: PIXI.Point ): PIXI.Point
   {
      //H distance does not exist on point.  it was created on Global
      let a: number = Global.distance( pb, pc )
      let b: number = Global.distance( pa, pc )
      let c: number = Global.distance( pa, pb )

      let sum: number = a + b + c

      let x: number = ( a * pa.x + b * pb.x + c * pc.x ) / sum
      let y: number = ( a * pa.y + b * pb.y + c * pc.y ) / sum

      return new PIXI.Point( x, y )
   }

   // calculates center and radius from 2 points and initial tangent vector
   private arc( point1: PIXI.Point, point2: PIXI.Point, tangent: PIXI.Point ):Array< number | PIXI.Point >
   {
      //O tangent.normalize( 1 )
      //H normalize does not exist on point.  it was created on Global
      tangent = Global.normalize( tangent, 1 )
      let x: number = point2.x - point1.x
      let y: number = point2.y - point1.y

      let r: number = -( Math.pow( x, 2 ) + Math.pow( y, 2 ) ) / ( 2 * ( y * tangent.x - x * tangent.y ) )
      let center: PIXI.Point = new PIXI.Point( tangent.y * r + point1.x, -tangent.x * r + point1.y )

      // ignore is valid as this is a typescript issue
      // @ts-ignore TS2345: Argument of type 'Point' is not assignable to parameter of type 'number'
      return new Array( r, center )
   }

   public getArcs( ):Array< CircularArc >
   {

      let arc1: CircularArc = new CircularArc( this.p1, this.p2, this.c1, this.r1 )
      let arc2: CircularArc = new CircularArc( this.p2, this.p3, this.c2, this.r2 )

      return new Array( arc1,arc2 )
   }
}

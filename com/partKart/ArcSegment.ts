//Opackage com.partkart
//O{
//O   import flash.geom.Point

import * as PIXI from 'pixi.js'
import { Segment } from './Segment'
import { QuadBezierSegment } from './QuadBezierSegment'

export interface ArcObject
{
   x: number,
   y: number,
   startAngle: number,
   arc: number,
   radius: number,
   yRadius: number,
   xAxisRotation: number,
   cx: number,
   cy: number,
}

export class ArcSegment extends Segment
{

   public rx: number
   public ry: number
   public angle: number

   public lf: boolean
   public sf: boolean

   constructor ( point1: PIXI.Point, point2: PIXI.Point,
                 radiusx: number, radiusy: number, axisangle: number,
                 largeflag: boolean, sweepflag: boolean )
   {
      super( point1, point2 )

      this.rx = radiusx
      this.ry = radiusy
      this.angle = axisangle
      this.lf = largeflag
      this.sf = sweepflag
   }

   //
   // Functions from degrafa
   // com.degrafa.geometry.utilities.ArcUtils
   //
   //O public computeSvgArc( ): Object
   public computeSvgArc( ): ArcObject
   {
      let largeArcFlag: boolean = this.lf
      let sweepFlag: boolean = ! this.sf

      //store before we do anything with it
      let xAxisRotation: number = this.angle

      // Compute the half distance between the current and the final point
      let dx2: number = ( this.p2.x - this.p1.x ) / 2.0
      let dy2: number = ( this.p2.y - this.p1.y ) / 2.0

      // Convert angle from degrees to radians
      this.angle = ArcSegment.degreesToRadians( this.angle )
      let cosAngle: number = Math.cos( this.angle )
      let sinAngle: number = Math.sin( this.angle )

      //Compute ( x1, y1 )
      let x1: number = (  cosAngle * dx2 + sinAngle * dy2 )
      let y1: number = ( -sinAngle * dx2 + cosAngle * dy2 )

      // Ensure radii are large enough
      this.rx = Math.abs( this.rx )
      this.ry = Math.abs( this.ry )
      let Prx: number = this.rx * this.rx
      let Pry: number = this.ry * this.ry
      let Px1: number = x1 * x1
      let Py1: number = y1 * y1

      // check that radii are large enough
      let radiiCheck: number = Px1 / Prx + Py1 / Pry
      if ( radiiCheck > 1 )
      {
         this.rx = Math.sqrt( radiiCheck ) * this.rx
         this.ry = Math.sqrt( radiiCheck ) * this.ry
         Prx = this.rx * this.rx
         Pry = this.ry * this.ry
      }

      //Compute ( cx1, cy1 )
      let sign: number = ( largeArcFlag == sweepFlag ) ? -1 : 1
      let sq: number = ( ( Prx*Pry ) - ( Prx*Py1 ) - ( Pry*Px1 ) ) / ( ( Prx*Py1 ) + ( Pry*Px1 ) )
      sq = ( sq < 0 ) ? 0 : sq
      let coef: number = ( sign * Math.sqrt( sq ) )
      let cx1: number = coef *  ( ( this.rx * y1 ) / this.ry )
      let cy1: number = coef * -( ( this.ry * x1 ) / this.rx )

      //Compute ( cx, cy ) from ( cx1, cy1 )
      let sx2: number = ( this.p2.x + this.p1.x ) / 2.0
      let sy2: number = ( this.p2.y + this.p1.y ) / 2.0
      let cx: number = sx2 + ( cosAngle * cx1 - sinAngle * cy1 )
      let cy: number = sy2 + ( sinAngle * cx1 + cosAngle * cy1 )

      //Compute the angleStart ( angle1 ) and the angleExtent ( dangle )
      let ux: number = (  x1 - cx1 ) / this.rx
      let uy: number = (  y1 - cy1 ) / this.ry
      let vx: number = ( -x1 - cx1 ) / this.rx
      let vy: number = ( -y1 - cy1 ) / this.ry
      let p: number
         let n: number

      //Compute the angle start
         n = Math.sqrt( ( ux * ux ) + ( uy * uy ) )
      p = ux

      sign = ( uy < 0 ) ? -1.0 : 1.0

      let angleStart: number = ArcSegment.radiansToDegrees( sign * Math.acos( p / n ) )

      // Compute the angle extent
      n = Math.sqrt( ( ux * ux + uy * uy ) * ( vx * vx + vy * vy ) )
      p = ux * vx + uy * vy
      sign = ( ux * vy - uy * vx < 0 ) ? -1.0 : 1.0
      let angleExtent: number = ArcSegment.radiansToDegrees( sign * Math.acos( p / n ) )

      if( !sweepFlag && angleExtent > 0 )
      {
         angleExtent -= 360
      }
      else if ( sweepFlag && angleExtent < 0 )
      {
         angleExtent += 360
      }

      angleExtent %= 360
      angleStart %= 360

      return Object( {x: this.p2.x,y: this.p2.y, startAngle: angleStart,
                      arc: angleExtent, radius: this.rx, yRadius: this.ry,
                      xAxisRotation: xAxisRotation, cx: cx, cy: cy}
       )
   }

   // note: current implementation merely linearizes the bezier approximations. This is not very accurate - must be improved in the future!
   public linearize( circle: boolean = false ): Array< QuadBezierSegment >
   {

      let ellipticalArc: ArcObject  = this.computeSvgArc( )

      let startpoint: PIXI.Point = this.p2
      let x: number = ellipticalArc.cx
      let y: number = ellipticalArc.cy

      let startAngle: number = ellipticalArc.startAngle
      let arc: number = ellipticalArc.arc

      let radius: number = ellipticalArc.radius
      let yRadius: number = ellipticalArc.yRadius

      let xAxisRotation = ellipticalArc.xAxisRotation

      // Circumvent drawing more than is needed
      if ( Math.abs( arc ) > 360 )
      {
         arc = 360
      }

      // Draw in a maximum of 45 degree segments. First we calculate how many
      // segments are needed for our arc.
      let segs: number = Math.ceil( Math.abs( arc ) / 45 )

      // Now calculate the sweep of each segment
      let segAngle: number = arc / segs

      let theta: number = ArcSegment.degreesToRadians( segAngle )
      // this dtheta ensures that the segments never deviate past the global tolerance values
      //O let theta: number = Math.sqrt( Global.tolerance/Math.max( Math.abs( radius ),Math.abs( yRadius ) ) );
      let angle: number = ArcSegment.degreesToRadians( startAngle )

      //let segs:int = Math.ceil( Math.abs( arc/radiansToDegrees( theta ) ) )
      //theta = degreesToRadians( arc/segs )

      let seglist: Array< QuadBezierSegment > = new Array( )

      // Draw as 45 degree segments
      if ( segs > 0  )
      {
         let beta: number = ArcSegment.degreesToRadians( xAxisRotation )
         let sinbeta: number = Math.sin( beta )
         let cosbeta: number = Math.cos( beta )

         let cx: number
         let cy: number
         let x1: number
         let y1: number

         // note that we start at the "end" of the arc as defined in arcSegment
         let tp1: PIXI.Point = startpoint
         let tp2: PIXI.Point
         let tc1: PIXI.Point

         // Loop for drawing arc segments
         for ( let i = 0; i < segs; i++ )
         {
            angle += theta

            let sinangle: number = Math.sin( angle - ( theta / 2 ) )
            let cosangle: number = Math.cos( angle - ( theta / 2 ) )

            let div: number = Math.cos( theta / 2 )
            cx= x + ( radius * cosangle * cosbeta - yRadius * sinangle * sinbeta )/div
            cy= y + ( radius * cosangle * sinbeta + yRadius * sinangle * cosbeta )/div

            sinangle = Math.sin( angle )
            cosangle = Math.cos( angle )

            x1 = x + ( radius * cosangle * cosbeta - yRadius * sinangle * sinbeta )
            y1 = y + ( radius * cosangle * sinbeta + yRadius * sinangle * cosbeta )

            tp2 = new PIXI.Point( x1, y1 )
            tc1 = new PIXI.Point( cx, cy )

            if ( i == segs-1  )
            {
               seglist.push( new QuadBezierSegment( tp1, this.p1, tc1 ) )
            }
            else
            {
               seglist.push( new QuadBezierSegment( tp1, tp2, tc1 ) )
            }

            tp1 = tp2
         }
      }

      //seglist.reverse( )

      let newseglist: Array< QuadBezierSegment > = new Array(  )

      for( let i = 0; i < seglist.length; i++ )
      {
         newseglist = newseglist.concat( seglist[ i ].linearize( circle ) )
      }

      return this.reversePath( newseglist )
   }

   protected reversePath( seglist: Array< QuadBezierSegment > ): Array< QuadBezierSegment >
   {
      for( let i = 0; i < seglist.length; i++ )
      {
         seglist[i] = seglist[i].reverse(  )
      }
      seglist.reverse(  )

      return seglist
   }

   protected static degreesToRadians( angle: number ): number
   {
      return angle*( Math.PI / 180 )
   }

   protected static radiansToDegrees( angle: number ): number
   {
      return angle * ( 180 / Math.PI )
   }

   //O public override reverse( ):*
   //Fixme star
   //override is default behaviour
   public reverse( ): ArcSegment
   {
      let newarc: ArcSegment = new ArcSegment( this.p2, this.p1, this.rx, this.ry, this.angle, this.lf, !this.sf )
      return newarc
   }
}

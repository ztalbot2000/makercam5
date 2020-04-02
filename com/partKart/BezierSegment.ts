import * as PIXI from 'pixi.js'

export class BezierSegment
{
   public a: PIXI.Point
   public b: PIXI.Point
   public c: PIXI.Point
   public d: PIXI.Point

   constructor( a: PIXI.Point, b: PIXI.Point, c: PIXI.Point, d: PIXI.Point )
   {
      this.a = a
      this.b = b
      this.c = c
      this.d = d
   }

   //
   // Calculates the value of a one dimensional cubic Bezier equation at a given time.
   //
   public static getSingleValue( a: number=0, b: number=0, c: number=0, d: number=0, t: number ): number
   {
      return ( t * t * ( d - a ) + 3 * ( 1 - t ) * ( t * ( c - a ) + ( 1 - t ) * ( b - a ) ) ) * t + a
   }

   //
   // Calculates the point of a two dimensional cubic Bezier curve at a given time.
   //
   public getValue( t: number ): PIXI.Point
   {
      let ax = this.a.x
      let x = ( t * t * ( this.d.x - ax ) + 3 * ( 1 - t ) * ( t * ( this.c.x - ax ) + ( 1 - t ) * ( this.b.x - ax ) ) ) * t + ax
      let ay = this.a.y
      let y = ( t * t * ( this.d.y - ay ) + 3 * ( 1 - t ) * ( t * ( this.c.y - ay ) + ( 1 - t ) * ( this.b.y - ay ) ) ) * t + ay
      return new PIXI.Point( x, y )
   }

   //
   // Finds the y value of a cubic Bezier curve at a given x coordinate.
   //
   public getYForX( x: number, coef: Array< number > = null ): number
   {
      // Clamp to range between end points.
      if ( this.a.x < this.d.x )
      {
         if ( x <= this.a.x ) return this.a.y
         if ( x >= this.d.x ) return this.d.y
      }
      else
      {
         if ( x >= this.a.x ) return this.a.y
         if ( x <= this.d.x ) return this.d.y
      }

      if ( !coef )
      {
         coef = BezierSegment.getCubicCoefficients( this.a.x, this.b.x, this.c.x, this.d.x )
      }

      let roots:Array< number > = BezierSegment.getCubicRoots( coef[0], coef[1], coef[2], coef[3] - x )
      let t: number = NaN

      if ( roots.length == 0 )
         t = 0
      else if ( roots.length == 1 )
         t = roots[0]
      else
      {
         //Typescript not happy with for in
         for ( let i = 0; i < roots.length; i++ )
         {
            let root = roots[ i ]

            if ( 0 <= root && root <= 1 )
            {
               t = root
               break
            }
         }
      }

      if ( isNaN( t ) )
         return NaN

      let yValue = BezierSegment.getSingleValue( this.a.y, this.b.y, this.c.y, this.d.y, t )
      return yValue
   }

   //
   // Calculates the coefficients for a cubic equation,
   //
   public static getCubicCoefficients( a: number, b: number, c: number, d: number ):Array< number >
   {
      let result: Array< number > = new Array( )
      result.push( -a + 3 * b - 3 * c + d )
      result.push( 3 * a - 6 * b + 3 * c )
      result.push( -3 * a + 3 * b )
      result.push( a )
      return result
   }

   // Quadratic roots
   // Calculate where the parabola crosses th X-axis. ( X Intercepts )
   // Solve for my grade 12 math. Thank-you Mr. Mcleod
   // b2 −4ac < 0 There are no real roots.
   // b2 −4ac = 0 There is one real root.
   // b2 −4ac > 0 There are two real roots.
   static getQuadraticRoots( x: number, y: number, z: number ): Array < number >
   {
      let a = z
      let b = y / a
      let c = x / a
      let discriminant = b * b - 4 * c
      let roots: Array< number > = new Array( )

      if ( discriminant > 0 )
      {
         // Parabola crosses the X-Axis at two points
         let s = Math.sqrt( discriminant )
         roots.push ( .5 * ( -b + s) )
         roots.push ( .5 * ( -b - s) )
      }
      else if ( discriminant == 0 )
      {
         // Parabola just touches the X-Axis, thus only one real root
         roots.push( 0.5 * -b )
      }
      // return the result, which could be 1,2 or no X intercepts.
      return roots
   }

   //
   // Finds the roots of a cubic equation
   //
   public static getCubicRoots( a: number=0, b: number=0, c: number=0, d: number=0 ):Array< number >
   {
      let roots: Array< number > = new Array( )

      // Handle Quadratic
      if ( !a )
         return BezierSegment.getQuadraticRoots( b, c, d )

      // Normalize the coefficients so the cubed term is 1 and then we can ignore it
      if ( a != 1 )
      {
         b /= a
         c /= a
         d /= a
      }

      let quotiant = ( b * b - 3 * c ) / 9
      let quotiantCubed = quotiant * quotiant * quotiant
      let r = ( 2 * b * b * b - 9 * b * c + 27 * d ) / 54
      let diff = quotiantCubed - r * r
      if ( diff >= 0 )
      {
         // handle division by zero
         if ( !quotiant )
            return [ 0 ]

         // three roots
         let theta = Math.acos( r / Math.sqrt( quotiantCubed ) )
         let quotiantSqrt = Math.sqrt( quotiant )

         roots.push( -2 * quotiantSqrt * Math.cos( theta / 3 ) - b / 3 )
         roots.push( -2 * quotiantSqrt * Math.cos( ( theta + 2 * Math.PI ) / 3 ) - b / 3 )
         roots.push( -2 * quotiantSqrt * Math.cos( ( theta + 4 * Math.PI ) / 3 ) - b / 3 )
      }
      else
      {
         // one root
         let tmp = Math.pow( Math.sqrt( -diff ) + Math.abs( r ), 1 / 3 )
         let rSign = ( r > 0 ) ?  1 : r < 0  ? -1 : 0

         let root = -rSign * ( tmp + quotiant / tmp ) - b / 3
         roots.push( root )
      }
      return roots
   }
}

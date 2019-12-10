var Helpers = {
   // lerp stands for linear interpolation (A method of curve fitting).
   // It means that the value will change from your from value to your
   // to value over t. The t parameter is set within a range of 0 to 1,
   // 0 being your from value, 1 being your to value.
   // Therefore, 0.5 will be halfway between

   // Possibly change callers to mathf.lerp ???
   Lerp: function (start: number, stop: number, amt: number): number
   {
      if ( amt > 1 )
         amt = 1;
      else if ( amt < 0 )
         amt = 0;

      return start + ( stop - start ) * amt;
   },
   Round: function(num: number, decimals: number): number
   {
      var pow = Math.pow( 10, decimals );

      return Math.round( num * pow ) / pow;
   },
   componentToHex: function(c: number): string
   {
      let hex = c.toString( 16 );

      return hex.length == 1 ? "0" + hex : hex;
   },
   rgbToHex: function( r: number, g: number, b: number): string
   {
      return "#" + this.componentToHex( r ) + this.componentToHex( g ) + this.componentToHex( b );
   },
   rgbToNumber: function ( r: number, g: number, b: number): number
   {
      return r * 65536 + g * 256 + b;
   },
   numberToRgb: function (c: number): object
   {
      return {
         r: Math.floor( c / (256 * 256) ),
         g: Math.floor( c / 256 ) % 256,
         b: c % 256,
      };
   },
   hexToRgb: function ( hex: number): object
   {
      if ( hex === null )
          hex = 0xffffff;

      if ( ! isNaN( hex ) )
         return this.numberToRgb( hex );

      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      let shorthandRegex: RegExp  = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      var hexS = this.componentToHex( hex );
      hexS = hexS.replace( shorthandRegex,
                function (_m, r, g, b) : string
                {
                   return (r + r + g + g + b + b);
                });

      let result: Array<string> = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexS);

      return result ? {
          r: parseInt( result[1], 16 ),
          g: parseInt( result[2], 16 ),
          b: parseInt (result[3], 16 )
      } : null;
   }
};

export default Helpers;

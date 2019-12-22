//O var Helpers =
export class Helpers
{
   // lerp stands for linear interpolation (A method of curve fitting).
   // It means that the value will change from your from value to your
   // to value over t. The t parameter is set within a range of 0 to 1,
   // 0 being your from value, 1 being your to value.
   // Therefore, 0.5 will be halfway between

   //O Lerp: function (start, stop, amt)
   //Hmmm Possibly change callers to mathf.lerp ???
   static Lerp = (start: number, stop: number, amt: number): number =>
   {
      if ( amt > 1 )
         amt = 1;
      else if ( amt < 0 )
         amt = 0;

      return start + ( stop - start ) * amt;
   }

   //O Round: function(number, decimals)
   static Round = (num: number, decimals: number): number =>
   {
      var pow = Math.pow( 10, decimals );

      return Math.round( num * pow ) / pow;
   }

   //O componentToHex: function(c)
   static componentToHex = (c: number): string =>
   {
      let hex = c.toString( 16 );

      return hex.length == 1 ? "0" + hex : hex;
   }

   //O rgbToHex: function(r, g, b)
   static rgbToHex = ( r: number, g: number, b: number): string =>
   {
      return "#" + Helpers.componentToHex( r ) + Helpers.componentToHex( g ) + Helpers.componentToHex( b );
   }

   //O rgbToNumber: function (r, g, b)
   static rgbToNumber = ( r: number, g: number, b: number): number =>
   {
      return r * 65536 + g * 256 + b;
   }

   //O numberToRgb: function (c)
   static numberToRgb = (c: number): object =>
   {
      return {
         r: Math.floor( c / (256 * 256) ),
         g: Math.floor( c / 256 ) % 256,
         b: c % 256,
      };
   }

   //O hexToRgb: function (hex)
   static hexToRgb = ( hex: ( string | number ) ): object =>
   {
      if ( hex === null )
          hex = 0xffffff;

      //O if ( ! isNaN( hex ) )
      //N Typescript checks that flowing through we can handle either type.
      if ( typeof hex === 'number' )
      {
         //O return this.numberToRgb( hex );
         return Helpers.numberToRgb( hex );
      }

      //N at this point Typescript thinks hex is a string type

      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      //O let shorthandRegex: RegExp  = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      let shorthandRegex: RegExp  = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

      //N convert string to number so that componentToHex can be called as it originally did.
      let hexNum = parseInt(hex);

      //O let hexS = this.componentToHex( hex );
      let hexS = Helpers.componentToHex( hexNum );

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

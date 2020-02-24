//package com.lorentz.SVG
//{

export class StringUtil
{
   /**
    *       Removes whitespace from the front and the end of the specified
    *       string.
    *
    *       @param input The String whose beginning and ending whitespace will
    *       will be removed.
    *
    *       @returns A String with whitespace removed from the begining and end
    *
    *       @langversion ActionScript 3.0
    *       @playerversion Flash 9.0
    *       @tiptext
    */
   public static trim( input:string, char:string = " " ):string
   {
      return StringUtil.ltrim(StringUtil.rtrim( input, char ), char );
   }

   /**
    *       Removes whitespace from the front of the specified string.
    *
    *       @param input The String whose beginning whitespace will will be removed.
    *
    *       @returns A String with whitespace removed from the begining
    *
    *       @langversion ActionScript 3.0
    *       @playerversion Flash 9.0
    *       @tiptext
    */
   public static ltrim( input:string, char:string=" " ):string
   {
      let size = input.length;
      for ( let i = 0; i < size; i++ )
      {
         if ( input.charAt( i ) != char )
         {
            return input.substring( i );
         }
      }
      return "";
   }

   /**
    *       Removes whitespace from the end of the specified string.
    *
    *       @param input The String whose ending whitespace will will be removed.
    *
    *       @returns A String with whitespace removed from the end
    *
    *       @langversion ActionScript 3.0
    *       @playerversion Flash 9.0
    *       @tiptext
    */
   public static rtrim( input:string, char:string = " " ):string
   {
      let size = input.length;
      for ( let i = size; i > 0; i-- )
      {
         if ( input.charAt( i-1 ) != char )
         {
            return input.substring( 0, i );
         }
      }

      return "";
   }

   /**
    *       Removes all instances of the remove string in the input string.
    *
    *       @param input The string that will be checked for instances of remove
    *       string
    *
    *       @param remove The string that will be removed from the input string.
    *
    *       @returns A String with the remove string removed.
    *
    *       @langversion ActionScript 3.0
    *       @playerversion Flash 9.0
    *       @tiptext
    */
   public static remove( input:string, remove:string ):string
   {
      return StringUtil.replace( input, remove, "" );
   }

   /**
    *       Replaces all instances of the replace string in the input string
    *       with the replaceWith string.
    *
    *       @param input The string that instances of replace string will be
    *       replaces with removeWith string.
    *
    *       @param replace The string that will be replaced by instances of
    *       the replaceWith string.
    *
    *       @param replaceWith The string that will replace instances of replace
    *       string.
    *
    *       @returns A new String with the replace string replaced with the
    *       replaceWith string.
    *
    *       @langversion ActionScript 3.0
    *       @playerversion Flash 9.0
    *       @tiptext
    */
   public static replace( input:string, replace:string, replaceWith:string ):string
   {
      //change to StringBuilder
      let sb = "";
      let found = false;

      let sLen = input.length;
      let rLen = replace.length;

      for ( let i = 0; i < sLen; i++ )
      {
         if ( input.charAt( i ) == replace.charAt( 0 ) )
         {
            found = true;
            for ( let j = 0; j < rLen; j++ )
            {
               if ( !( input.charAt( i + j ) == replace.charAt( j ) ) )
               {
                  found = false;
                  break;
               }
            }

            if ( found )
            {
               sb += replaceWith;
               i = i + ( rLen - 1 );
               continue;
            }
         }
         sb += input.charAt( i );
      }
      //TODO : if the string is not found, should we return the original
      //string?
      return sb;
   }

   /**
    * @method shrinkSequencesOf (Groleau)
    * @description Shrinks all sequences of a given character in a string to one
    * @param s (string) original string
    * @param ch (string) character to be found
    * @returns (string) string with sequences shrunk
    */
   public static shrinkSequencesOf( s:string, ch:string ):string
   {
      let len = s.length;
      let idx = 0;
      let idx2 = 0;
      let rs = "";

      while ( ( idx2 = s.indexOf( ch, idx ) + 1 ) != 0 )
      {
         // include string up to first character in sequence
         rs += s.substring( idx, idx2 );
         idx = idx2;

         // remove all subsequent characters in sequence
         while ( ( s.charAt( idx ) == ch ) && ( idx < len ) ) idx++;
      }
      return rs + s.substring( idx, len );
   }
}

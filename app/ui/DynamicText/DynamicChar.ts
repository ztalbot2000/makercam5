interface INameToValueMap
{
    [key: string]: any;
}

//N for style data
//import { DynamicTextStyle } from './DynamicTextStyle';
import DynamicTextStyle from './DynamicTextStyle';

//O function DynamicChar( )
export default class DynamicChar
{
   //O styledata (texture, orig width, orig height)
   //O this.style = null;
   public style: DynamicTextStyle;

   //O this.data = null;
   public data: INameToValueMap;

   //O this.space = false;
   public space: boolean;

   //O is this char newline?
   //O this.newline = false;
   public newline: boolean;

   //O this.emoji = false;
   public emoji: boolean;

   //O charcode
   //O this.charcode = 0;
   public charcode: number;

   //O char string value
   //O this.value = "";
   public value: string;

   //O word index
   //O this.wordIndex = -1;
   public wordIndex: number;

   //O line index of char
   //O this.lineIndex = -1;
   public lineIndex: number;

   //New x & y are used by DynamicText and undefined here
   public x: number;
   public y: number;

   constructor()
   {
      //O styledata (texture, orig width, orig height)
      //O this.style = null;
      this.style = null;

      //O char data
      //O this.data = null;
      this.data = null;

      //O is this char space?
      //O this.space = false;
      this.space = false;

      //O is this char newline?
      //O this.newline = false;
      this.newline = false;

      //O this.emoji = false;
      this.emoji = false;

      //O charcode
      //O this.charcode = 0;
      this.charcode = 0;

      //O char string value
      //O this.value = "";
      this.value = "";

      //O word index
      //O this.wordIndex = -1;
      this.wordIndex = -1;

      //O line index of char
      //O this.lineIndex = -1;
      this.lineIndex = -1;

      //New used by DynamicText and undefined here
      this.x = this.y = 0;
   }
}

//O DynamicChar.prototype.constructor = DynamicChar;
//O module.exports = DynamicChar;
//module.exports = DynamicChar;

//O function DynamicChar( )
class DynamicChar
{
   //O this.style = null;
   public style: string;

   //O this.data = null;
   public data: number;

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

   constructor()
   {
      //O styledata (texture, orig width, orig height)
      //O this.style = null;
      this.style = null;

      //O char data
      //O this.data = null;
      this.data = -1;

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
   }
}

//O DynamicChar.prototype.constructor = DynamicChar;
//O module.exports = DynamicChar;
module.exports = DynamicChar;

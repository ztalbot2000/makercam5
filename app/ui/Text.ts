//O var UIBase = require( './UIBase' );
import { UIBase } from './UIBase';

//
// An UI text object
//
// @class
// @extends PIXI.UI.UIBase
// @memberof PIXI.UI
// @param Text {String} Text content
// @param TextStyle {PIXI.TextStyle} Style used for the Text
//

//O function Text( text, PIXITextStyle )
export class Text extends UIBase
{
   private _text: PIXI.Text;

   constructor( text: string, PIXITextStyle: PIXI.TextStyle )
   {
      //Hmm Hack to get around super must be called first
      super();

      //O this._text = new PIXI.Text( text, PIXITextStyle );
      this._text = new PIXI.Text( text, PIXITextStyle );

      //O UIBase.call( this, this._text.width, this._text.height );
      //N call super instead of UIBase prototype constructor
      super(this._text.width, this._text.height);

      //O this.container.addChild( this._text );
      this.container.addChild( this._text );

   }

   //O this.baseupdate = function( )
   public baseupdate = ( ): void =>
   {
      //O // force original text width unless using anchors
      //O if ( this._anchorLeft === null || this._anchorRight === null )
      if ( this._anchorLeft === null || this._anchorRight === null )
      {
         //O this.setting.width = this._text.width;
         this.setting.width = this._text.width;
         //O this.setting.widthPct = null;
         this.setting.widthPct = null;
      }
      //O else
      else
      {
         //O this._text.width = this._width;
         this._text.width = this._width;
      }

      //O // force original text height unless using anchors
      //O if ( this._anchorTop === null || this._anchorBottom === null )
      if ( this._anchorTop === null || this._anchorBottom === null )
      {
         //O this.setting.height = this._text.height;
         this.setting.height = this._text.height;
         //O this.setting.heightPct = null;
         this.setting.heightPct = null;
      }
      //O else
      else
      {
         //O this._text.width = this._width;
         this._text.width = this._width;
      }

      //O UIBase.prototype.baseupdate.call( this );
      UIBase.prototype.baseupdate.call( this );
   };

   //O this.update = function( )
   public update = ( ): void =>
   {
      //O set tint
      //O if ( this.tint !== null )
      if ( this.tint !== null )
      {
         //O this._text.tint = this.tint;
         this._text.tint = this.tint;
      }

      //O // set blendmode
      //O if ( this.blendMode !== null )
      if ( this.blendMode !== null )
      {
         //O this._text.blendMode = this.blendMode;
         this._text.blendMode = this.blendMode;
      }
   };

   //O Object.defineProperties( Text.prototype,
   //O // value:
   //O get: function( )
   get  value ( ): string
   {
      //O return this._text.text;
      return this._text.text;
   }
   //O set: function( val )
   set value ( val: string )
   {
      //O this._text.text = val;
      this._text.text = val;
      //O this.updatesettings( true );
      this.updatesettings( true );
   }

   //O // text:
   //O get: function( ): PIXI.Text
   //N I believe this is what is wanted
   get text ( ): PIXI.Text
   {
      //O return this.value;
      return this._text;
   }
   //O set: function( val )
   //N I believe this is what is wanted
   set text ( val: PIXI.Text )
   {
      //O this.value = val;
      this._text = val;
   }
}

//O Text.prototype = Object.create( UIBase.prototype );
//O Text.prototype.constructor = Text;
//O module.exports = Text;

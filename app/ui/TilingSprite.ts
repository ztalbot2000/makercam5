//O var UIBase = require( './UIBase' );
import { UIBase } from './UIBase';

import * as PIXI from 'pixi.js';
/**
 * An UI sprite object
 *
 * @class
 * @extends PIXI.UI.UIBase
 * @memberof PIXI.UI
 * @param Texture {PIXI.Texture} The texture for the sprite
 * @param [Width=Texture.width] {number} Width of tilingsprite
 * @param [Height=Texture.height] {number} Height of tiling sprite
 */
//O function TilingSprite( t, width, height )
export class TilingSprite extends UIBase
{
   private sprite: PIXI.TilingSprite;

   //New  Added as it is defined within
   // It takes effect when update is called
   public tint: number;
   public blendmode: number;

   constructor ( t: PIXI.Texture, width: number, height: number )
   {
      //O UIBase.call( this, width || this.sprite.width, height || this.sprite.height );
      super( width || t.width, height || t.height );

      //O this.sprite = new PIXI.extras.TilingSprite( t );
      this.sprite = new PIXI.TilingSprite( t );

      //O this.container.addChild( this.sprite );
      this.container.addChild( this.sprite );

      //New Added as it is used within
      this.tint = null;
      this.blendmode = null;
   }

   //
   // Updates the text
   //
   // @private
   //
   //O TilingSprite.prototype.update = function( )
   //New. Changed to public or never called.
   public update = ( ) =>
   {
      //O if ( this.tint !== null )
      if ( this.tint !== null )
      {
         //O this.sprite.tint = this.tint;
         this.sprite.tint = this.tint;
      }

      //O if ( this.blendMode !== null )
      if ( this.blendMode !== null )
      {
         //O this.sprite.blendMode = this.blendMode;
         this.sprite.blendMode = this.blendMode;
      }

      //O this.sprite.width = this._width;
      this.sprite.width = this._width;
      //O this.sprite.height = this._height;
      this.sprite.height = this._height;
   };

   //O Object.defineProperties( TilingSprite.prototype,
   //O tilePosition:
   //O get: function( )
   get tilePosition ( ): PIXI.ObservablePoint
   {
      //O return this.sprite.tilePosition;
      return this.sprite.tilePosition;
   }
   //O set: function( val )
   set tilePosition ( val: PIXI.ObservablePoint )
   {
      //O this.sprite.tilePosition = val;
      this.sprite.tilePosition = val;
   }

   //O tileScale:
   //O get: function( )
   get tileScale ( ): PIXI.ObservablePoint
   {
      //O return this.sprite.tileScale;
      return this.sprite.tileScale;
   }
   //O set: function( val )
   set tileScale ( val: PIXI.ObservablePoint )
   {
      //O this.sprite.tileScale = val;
      this.sprite.tileScale = val;
   }
}

//O TilingSprite.prototype = Object.create( UIBase.prototype );
//O TilingSprite.prototype.constructor = TilingSprite;
//O module.exports = TilingSprite;

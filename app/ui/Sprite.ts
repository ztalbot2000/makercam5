//O var UIBase = require( './UIBase' );
import { UIBase } from './UIBase';

//
// An UI sprite object
//
// @class
// @extends PIXI.UI.UIBase
// @memberof PIXI.UI
// @param Texture {PIXI.Texture} The texture for the sprite
//
//O function Sprite( t )
export class Sprite extends UIBase
{
   private sprite:PIXI.Sprite;

   constructor ( t: PIXI.Texture )
   {
      //Hack to call super first
      super( );

      //O this.sprite = new PIXI.Sprite( t );
      this.sprite = new PIXI.Sprite( t );

      //O UIBase.call( this, this.sprite.width, this.sprite.height );
      super( this.sprite.width, this.sprite.height );

      //O this.container.addChild( this.sprite );
      this.container.addChild( this.sprite );
   }

   //N  Use these to deprecate all the Texture from* methods
   //N function textureFrom(name, source, crossorigin, scaleMode)
            //N resourceOptions: {
            //N     mipmap:
            //N     scale:
            //N     scaleMode: PIXI.SCALE_MODES.LINEAR,
            //N     crossorigin,
            //N }
            //N });

   //N I declared them static as they seemed to be only used as
   //N convenience functions, if they are actually used at all.
   //O Sprite.fromFrame = function( frameId )
   public static fromFrame = ( frameId: string ): PIXI.Sprite =>
   {
      //N  Split to fix stupid typescript error: 'new' expression,s
      //N  whose target lacks a construct signature, implicitly has
      //N  an 'any' type.
      let texture = PIXI.Texture.from( frameId );

      //O return new Sprite( new PIXI.Texture.fromFrame( frameId ) );
      return new PIXI.Sprite( texture );
   };

   //N I declared them static as they seemed to be only used as
   //N convenience functions, if they are actually used at all.
   //O Sprite.fromImage = function( imageUrl )
   public static fromImage = ( imageUrl: string ): PIXI.Sprite =>
   {
      //N  Split to fix stupid typescript error: 'new' expression,s
      //N  whose target lacks a construct signature, implicitly has
      //N  an 'any' type.
      let texture = PIXI.Texture.from(imageUrl);

      //O return new Sprite( new PIXI.Texture.fromImage( imageUrl ) );
      return new PIXI.Sprite( texture );
   };

   //
   // Updates the text
   //
   // @private
   //
   //O Sprite.prototype.update = function( )
   public update = ( ): void =>
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
   }
}

//O Sprite.prototype = Object.create( UIBase.prototype );
//O Sprite.prototype.constructor = Sprite;
//O module.exports = Sprite;

//O Sprite.fromFrame = function( frameId )

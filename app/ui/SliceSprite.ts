//O var UIBase = require( './UIBase' );
import { UIBase } from './UIBase';

import * as PIXI from 'pixi.js';

/**
 * A sliced sprite with dynamic width and height.
 *
 * @class
 * @memberof PIXI.UI
 * @param Texture {PIXI.Texture} the texture for this SliceSprite
 * @param BorderWidth {Number} Width of the sprite borders
 * @param horizontalSlice {Boolean} Slice the sprite horizontically
 * @param verticalSlice {Boolean} Slice the sprite vertically
 * @param [tile=false] {Boolean} tile or streach
 */
//O function SliceSprite( texture, borderWidth, horizontalSlice, verticalSlice, tile )
export class SliceSprite extends UIBase
{
   //New, now this is just Stupid!!!
   public ftl:PIXI.Rectangle; public ftr:PIXI.Rectangle; public fbl:PIXI.Rectangle; public fbr:PIXI.Rectangle; public ft:PIXI.Rectangle; public fb:PIXI.Rectangle; public fl:PIXI.Rectangle; public fr:PIXI.Rectangle; public ff:PIXI.Rectangle;
   public stl:PIXI.Sprite; public str:PIXI.Sprite; public sbl:PIXI.Sprite; public sbr:PIXI.Sprite;
   public st:PIXI.TilingSprite | PIXI.Sprite;
   public sb:PIXI.TilingSprite | PIXI.Sprite;
   public sl:PIXI.TilingSprite | PIXI.Sprite;
   public sr:PIXI.TilingSprite | PIXI.Sprite;
   public sf:PIXI.TilingSprite | PIXI.Sprite;
   private bw: number;
   private vs: boolean;
   private hs: boolean;
   private t: PIXI.BaseTexture;
   private f: PIXI.Rectangle;

   private tile: boolean;

   constructor ( texture: PIXI.Texture, borderWidth: number, horizontalSlice: boolean, verticalSlice: boolean, tile: boolean)
   {
      //O UIBase.call( this, texture.width, texture.height );
      super( texture.width, texture.height );

      //O var ftl, ftr, fbl, fbr, ft, fb, fl, fr, ff, stl, str, sbl, sbr, st, sb, sl, sr, sf,
      this.ftl = this.ftr = this.fbl = this.fbr = this.ft = this.fb = this.fl = this.fr = this.ff = this.stl = this.str = this.sbl = this.sbr = this.st = this.sb = this.sl = this.sr = this.sf = null;
      //O bw = borderWidth || 5,
      this.bw = borderWidth || 5,
      //O vs = typeof verticalSlice !== "undefined" ? verticalSlice : true,
      this.vs = typeof verticalSlice !== "undefined" ? verticalSlice : true,
      //O hs = typeof horizontalSlice !== "undefined" ? horizontalSlice : true,
      this.hs = typeof horizontalSlice !== "undefined" ? horizontalSlice : true,
      //O t = texture.baseTexture,
      this.t = texture.baseTexture,
      //O f = texture.frame;
      this.f = texture.frame;

      //O if ( hs ) this.setting.minWidth = borderWidth * 2;
      if ( this.hs ) this.setting.minWidth = borderWidth * 2;
      //O if ( vs ) this.setting.minHeight = borderWidth * 2;
      if ( this.vs ) this.setting.minHeight = borderWidth * 2;

      //New tile was not saved
      this.tile = tile;
   }

   //O this.initialize = function( )
   //New made public to match UIBase
   public initialize = ( ) =>
   {
      //O UIBase.prototype.initialize.apply( this );
      UIBase.prototype.initialize.apply( this );

      //O get frames
      //O if ( vs && hs )
      if ( this.vs && this.hs )
      {
         //O ftl = new PIXI.Rectangle( f.x, f.y, bw, bw );
         this.ftl = new PIXI.Rectangle( this.f.x, this.f.y, this.bw, this.bw );
         //O ftr = new PIXI.Rectangle( f.x + f.width - bw, f.y, bw, bw );
         this.ftr = new PIXI.Rectangle( this.f.x + this.f.width - this.bw, this.f.y, this.bw, this.bw );
         //O fbl = new PIXI.Rectangle( f.x, f.y + f.height - bw, bw, bw );
         this.fbl = new PIXI.Rectangle( this.f.x, this.f.y + this.f.height - this.bw, this.bw, this.bw );
         //O fbr = new PIXI.Rectangle( f.x + f.width - bw, f.y + f.height - bw, bw, bw );
         this.fbr = new PIXI.Rectangle( this.f.x + this.f.width - this.bw, this.f.y + this.f.height - this.bw, this.bw, this.bw );
         //O ft = new PIXI.Rectangle( f.x + bw, f.y, f.width - bw * 2, bw );
         this.ft = new PIXI.Rectangle( this.f.x + this.bw, this.f.y, this.f.width - this.bw * 2, this.bw );
         //O fb = new PIXI.Rectangle( f.x + bw, f.y + f.height - bw, f.width - bw * 2, bw );
         this.fb = new PIXI.Rectangle( this.f.x + this.bw, this.f.y + this.f.height - this.bw, this.f.width - this.bw * 2, this.bw );
         //O fl = new PIXI.Rectangle( f.x, f.y + bw, bw, f.height - bw * 2 );
         this.fl = new PIXI.Rectangle( this.f.x, this.f.y + this.bw, this.bw, this.f.height - this.bw * 2 );
         //O fr = new PIXI.Rectangle( f.x + f.width - bw, f.y + bw, bw, f.height - bw * 2 );
         this.fr = new PIXI.Rectangle( this.f.x + this.f.width - this.bw, this.f.y + this.bw, this.bw, this.f.height - this.bw * 2 );
         //O ff = new PIXI.Rectangle( f.x + bw, f.y + bw, f.width - bw * 2, f.height - bw * 2 );
         this.ff = new PIXI.Rectangle( this.f.x + this.bw, this.f.y + this.bw, this.f.width - this.bw * 2, this.f.height - this.bw * 2 );
      }
      //O else if ( hs )
      else if ( this.hs )
      {
         //O fl = new PIXI.Rectangle( f.x, f.y, bw, f.height );
         this.fl = new PIXI.Rectangle( this.f.x, this.f.y, this.bw, this.f.height );
         //O fr = new PIXI.Rectangle( f.x + f.width - bw, f.y, bw, f.height );
         this.fr = new PIXI.Rectangle( this.f.x + this.f.width - this.bw, this.f.y, this.bw, this.f.height );
         //O ff = new PIXI.Rectangle( f.x + bw, f.y, f.width - bw * 2, f.height );
         this.ff = new PIXI.Rectangle( this.f.x + this.bw, this.f.y, this.f.width - this.bw * 2, this.f.height );
      }                                                     //vs
      //O else
      else
      {
         //O ft = new PIXI.Rectangle( f.x, f.y, f.width, bw );
         this.ft = new PIXI.Rectangle( this.f.x, this.f.y, this.f.width, this.bw );
         //O fb = new PIXI.Rectangle( f.x, f.y + f.height - bw, f.width, bw );
         this.fb = new PIXI.Rectangle( this.f.x, this.f.y + this.f.height - this.bw, this.f.width, this.bw );
         //O ff = new PIXI.Rectangle( f.x, f.y + bw, f.width, f.height - bw * 2 );
         this.ff = new PIXI.Rectangle( this.f.x, this.f.y + this.bw, this.f.width, this.f.height - this.bw * 2 );
      }

      //O //TODO: swap frames if rotation
      //TODO: swap frames if rotation

      //O make sprites
      //O sf = tile ? new PIXI.TilingSprite( new PIXI.Texture( t, ff ) ) : new PIXI.Sprite( new PIXI.Texture( t, ff ) );
      this.sf = this.tile ? new PIXI.TilingSprite( new PIXI.Texture( this.t, this.ff ) ) : new PIXI.Sprite( new PIXI.Texture( this.t, this.ff ) );
      //O this.container.addChildAt( sf, 0 );
      this.container.addChildAt( this.sf, 0 );
      //O if ( vs && hs )
      if ( this.vs && this.hs )
      {
         //O stl = new PIXI.Sprite( new PIXI.Texture( t, ftl ) );
         this.stl = new PIXI.Sprite( new PIXI.Texture( this.t, this.ftl ) );
         //O str = new PIXI.Sprite( new PIXI.Texture( t, ftr ) );
         this.str = new PIXI.Sprite( new PIXI.Texture( this.t, this.ftr ) );
         //O sbl = new PIXI.Sprite( new PIXI.Texture( t, fbl ) );
         this.sbl = new PIXI.Sprite( new PIXI.Texture( this.t, this.fbl ) );
         //O sbr = new PIXI.Sprite( new PIXI.Texture( t, fbr ) );
         this.sbr = new PIXI.Sprite( new PIXI.Texture( this.t, this.fbr ) );
         //O this.container.addChildAt( stl, 0 );
         this.container.addChildAt( this.stl, 0 );
         //O this.container.addChildAt( str, 0 );
         this.container.addChildAt( this.str, 0 );
         //O this.container.addChildAt( sbl, 0 );
         this.container.addChildAt( this.sbl, 0 );
         //O this.container.addChildAt( sbr, 0 );
         this.container.addChildAt( this.sbr, 0 );

      }
      //O if ( hs )
      if ( this.hs )
      {
         //O sl = tile ? new PIXI.TilingSprite( new PIXI.Texture( t, fl ) ) : new PIXI.Sprite( new PIXI.Texture( t, fl ) );
         this.sl = this.tile ? new PIXI.TilingSprite( new PIXI.Texture( this.t, this.fl ) ) : new PIXI.Sprite( new PIXI.Texture( this.t, this.fl ) );
         //O sr = tile ? new PIXI.TilingSprite( new PIXI.Texture( t, fr ) ) : new PIXI.Sprite( new PIXI.Texture( t, fr ) );
         this.sr = this.tile ? new PIXI.TilingSprite( new PIXI.Texture( this.t, this.fr ) ) : new PIXI.Sprite( new PIXI.Texture( this.t, this.fr ) );
         //O this.container.addChildAt( sl, 0 );
         this.container.addChildAt( this.sl, 0 );
         //O this.container.addChildAt( this.sr, 0 );
         this.container.addChildAt( this.sr, 0 );
      }
      //O if ( vs )
      if ( this.vs )
      {
         //O st = tile ? new PIXI.extras.TilingSprite( new PIXI.Texture( t, ft ) ) : new PIXI.Sprite( new PIXI.Texture( t, ft ) );
         this.st = this.tile ? new PIXI.TilingSprite( new PIXI.Texture( this.t, this.ft ) ) : new PIXI.Sprite( new PIXI.Texture( this.t, this.ft ) );
         //O sb = tile ? new PIXI.extras.TilingSprite( new PIXI.Texture( t, fb ) ) : new PIXI.Sprite( new PIXI.Texture( t, fb ) );
         this.sb = this.tile ? new PIXI.TilingSprite( new PIXI.Texture( this.t, this.fb ) ) : new PIXI.Sprite( new PIXI.Texture( this.t, this.fb ) );
         //O this.container.addChildAt( st, 0 );
         this.container.addChildAt( this.st, 0 );
         //O this.container.addChildAt( this.sb, 0 );
         this.container.addChildAt( this.sb, 0 );
      }

      //O set constant position and sizes
      //O if ( vs && hs ) st.x = sb.x = sl.y = sr.y = stl.width = str.width = sbl.width = sbr.width = stl.height = str.height = sbl.height = sbr.height = bw;
      if ( this.vs && this.hs ) this.st.x = this.sb.x = this.sl.y = this.sr.y = this.stl.width = this.str.width = this.sbl.width = this.sbr.width = this.stl.height = this.str.height = this.sbl.height = this.sbr.height = this.bw;
      //O if ( hs ) sf.x = sl.width = sr.width = bw;
      if ( this.hs ) this.sf.x = this.sl.width = this.sr.width = this.bw;
      //O if ( vs ) sf.y = st.height = sb.height = bw;
      if ( this.vs ) this.sf.y = this.st.height = this.sb.height = this.bw;
   };

   //
   // Updates the sliced sprites position and size
   //
   // @private
   //
   //O this.update = function( )
   public update = ( ) =>
   {
      //O if ( !this.initialized ) return;
      if ( !this.initialized ) return;

      //O if ( vs && hs )
      if ( this.vs && this.hs )
      {
         //O str.x = sbr.x = sr.x = this._width - bw;
         this.str.x = this.sbr.x = this.sr.x = this._width - this.bw;
         //O sbl.y = sbr.y = sb.y = this._height - bw;
         this.sbl.y = this.sbr.y = this.sb.y = this._height - this.bw;
         //O sf.width = st.width = sb.width = this._width - bw * 2;
         this.sf.width = this.st.width = this.sb.width = this._width - this.bw * 2;
         //O sf.height = sl.height = sr.height = this._height - bw * 2;
         this.sf.height = this.sl.height = this.sr.height = this._height - this.bw * 2;
      }
      //O else if ( hs )
      else if ( this.hs )
      {
         //O sr.x = this._width - bw;
         this.sr.x = this._width - this.bw;
         //O sl.height = sr.height = sf.height = this._height;
         this.sl.height = this.sr.height = this.sf.height = this._height;
         //O sf.width = this._width - bw * 2;
         this.sf.width = this._width - this.bw * 2;
      }                                                     //vs
      //O else
      else
      {
         //O sb.y = this._height - bw;
         this.sb.y = this._height - this.bw;
         //O st.width = sb.width = sf.width = this._width;
         this.st.width = this.sb.width = this.sf.width = this._width;
         //O sf.height = this._height - bw * 2;
         this.sf.height = this._height - this.bw * 2;
      }

      //O if ( this.tint !== null )
      if ( this.tint !== null )
      {
         //O sf.tint = this.tint;
         this.sf.tint = this.tint;
         //O if ( vs && hs ) stl.tint = str.tint = sbl.tint = sbr.tint = this.tint;
         if ( this.vs && this.hs ) this.stl.tint = this.str.tint = this.sbl.tint = this.sbr.tint = this.tint;
         //O if ( hs ) sl.tint = sr.tint = this.tint;
         if ( this.hs ) this.sl.tint = this.sr.tint = this.tint;
         //O if ( vs ) st.tint = sb.tint = this.tint;
         if ( this.vs ) this.st.tint = this.sb.tint = this.tint;
      }

      //O if ( this.blendMode !== null )
      if ( this.blendMode !== null )
      {
         //O sf.blendMode = this.blendMode;
         this.sf.blendMode = this.blendMode;
         //O if ( vs && hs ) stl.blendMode = str.blendMode = sbl.blendMode = sbr.blendMode = this.blendMode;
         if ( this.vs && this.hs ) this.stl.blendMode = this.str.blendMode = this.sbl.blendMode = this.sbr.blendMode = this.blendMode;
         //O if ( hs ) sl.blendMode = sr.blendMode = this.blendMode;
         if ( this.hs ) this.sl.blendMode = this.sr.blendMode = this.blendMode;
         //O if ( vs ) st.blendMode = sb.blendMode = this.blendMode;
         if ( this.vs ) this.st.blendMode = this.sb.blendMode = this.blendMode;
      }
   };
}

//O SliceSprite.prototype = Object.create( UIBase.prototype );
//O SliceSprite.prototype.constructor = SliceSprite;
//O module.exports = SliceSprite;

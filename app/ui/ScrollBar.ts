//O var Slider = require( './Slider' );
import { Slider } from './Slider';
//O var Tween = require( './Tween' );
//NC No brackets, imports the default created Tween Instance from new.
import Tween from './Tween';
//O var Ease = require( './Ease/Ease' );

//N ScrollingContainer is used, but never imported
import { ScrollingContainer } from './ScrollingContainer';

interface INameToValueMap
{
    [key: string]: any;
}

type XOrY = 'x' | 'y';
type WidthOrHeight = 'width' | 'height';
type _WidthOr_Height = '_width' | '_height';
type TopOrLeft = 'top' | 'left';

//
// An UI scrollbar to control a ScrollingContainer
//
// @class
// @extends PIXI.UI.Slider
// @memberof PIXI.UI
// @param options {Object} ScrollBar settings
// @param options.track {(PIXI.UI.SliceSprite|PIXI.UI.Sprite)}  Any type of UIOBject, will be used for the scrollbar track
// @param options.handle {(PIXI.UI.SliceSprite|PIXI.UI.Sprite)} will be used as scrollbar handle
// @param options.scrollingContainer {PIXI.UI.ScrollingContainer} The container to control
// @param [options.vertical=false] {boolean} Direction of the scrollbar
// @param [options.autohide=false] {boolean} Hides the scrollbar when not needed
//
//
//O function ScrollBar( options )
export class ScrollBar extends Slider
{
   private _hidden: boolean;
   private autohide: boolean | number;
   private scrollingContainer: ScrollingContainer;

   constructor ( options: INameToValueMap )
   {

      //O Slider.call( this,
      super({
               //O track: options.track,
               track: options.track,
               //O handle: options.handle,
               handle: options.handle,
               //O fill: null,
               fill: null,
               //O vertical: options.vertical
               vertical: options.vertical
           }
      );

      //O this.scrollingContainer = options.scrollingContainer;
      this.scrollingContainer = options.scrollingContainer;
      //O this.autohide = options.autohide;
      //N autohide is set to false if not passed in.
      this.autohide = options.autohide || false;
      //O this._hidden = false;
      this._hidden = false;

   }


   public initialize = ( ): void =>
   {
      //O Slider.prototype.initialize.call( this );
      //NC Only public and protected methods of the base class are accessible
      //   via the 'super' keyword.  BUT IT IS !!!
      // super.initialize( );
      Slider.prototype.initialize.call( this );
      //O //up decimals to trigger ValueChanging more often
      //O this.decimals = 3;
      this.decimals = 3;

      //O this._onValueChanging = function( val )
      this._onValueChanging = this.onValueChanging;

      //N To break the dependancy loop set the function in the
      //  scrollingContainer to alignToContainer;
      this.scrollingContainer.alignToContainer = this.alignToContainer;

      //O this.scrollingContainer._scrollBars.push( this );
      this.scrollingContainer._scrollBars.push( this as any as ScrollingContainer);
   };

   //O this._onValueChanging = function( val )
   public onValueChanging = ( val: number ):void =>
   {
      //N handle val not being read;
      val = val;
      //O var sizeAmt = this.scrollingContainer._height / this.scrollingContainer.innerContainer.height || 0.001;
      var sizeAmt = this.scrollingContainer._height / this.scrollingContainer.innerContainer.height || 0.001;
      //O if ( sizeAmt < 1 )
      if ( sizeAmt < 1 )
         //O this.scrollingContainer.forcePctPosition( this.vertical ? "y" : "x", this._amt );
         this.scrollingContainer.forcePctPosition( this.vertical ? "y" : "x", this._amt );
   };

   public alignToContainer = ( ): void =>
   {
      //O var newPos,
      let newPos: number;
      //O  varsize;
      let size: number = 0;
      //O  varx_y = this.vertical ? "y" : "x";
      let x_y: XOrY = this.vertical ? "y" : "x";
      //O  varwidth_height = this.vertical ? 'height" : "width";
      let width_height: WidthOrHeight = this.vertical ? "height" : "width";

      //N for indexing with underscore
      let _width_height: _WidthOr_Height = this.vertical ? "_height" : "_width";

      //O  vartop_left = this.vertical ? "top" : "left";
      let top_left: TopOrLeft = this.vertical ? 'top' : 'left';
      //O  var_posAmt = !this.scrollingContainer.innerContainer[ width_height ] ? 0 : -( this.scrollingContainer.innerContainer[ x_y ] / this.scrollingContainer.innerContainer[ width_height ] );
      let _posAmt = !this.scrollingContainer.innerContainer[ width_height ] ? 0 : -( this.scrollingContainer.innerContainer[ x_y ] / this.scrollingContainer.innerContainer[ width_height ] );
      //O var sizeAmt = !this.scrollingContainer.innerContainer[ width_height ] ? 1 : this.scrollingContainer[ "_" + width_height ] / this.scrollingContainer.innerContainer[ width_height ];
      let sizeAmt = !this.scrollingContainer.innerContainer[ width_height ] ? 1 : this.scrollingContainer[ _width_height ] / this.scrollingContainer.innerContainer[ width_height ];

      //O //update amt
      //O var diff = this.scrollingContainer.innerContainer[ width_height ] - this.scrollingContainer[ "_" + width_height ];
      let diff = this.scrollingContainer.innerContainer[ width_height ] - this.scrollingContainer[ _width_height ];
      //O this._amt = !this.scrollingContainer[ "_" + width_height ] || !diff ? 0 : -( this.scrollingContainer.innerContainer[ x_y ] / diff );
      this._amt = !this.scrollingContainer[ _width_height ] || !diff ? 0 : -( this.scrollingContainer.innerContainer[ x_y ] / diff );
   
      //O if ( sizeAmt >= 1 )
      if ( sizeAmt >= 1 )
      {
         //O size = this[ "_" + width_height ];
         size = this[ _width_height ];
         //O this.handle[ top_left ] = size * 0.5;
         this.handle[ top_left ] = size * 0.5;
         //O this.toggleHidden( true );
         this.toggleHidden( true );
      }
      //O else
      else
      {
         //O size = this[ "_" + width_height ] * sizeAmt;
         size = this[ _width_height ] * sizeAmt;
         //O if ( this._amt > 1 ) size -= ( this[ "_" + width_height ] - size ) * ( this._amt - 1 );
         if ( this._amt > 1 ) size -= ( this[ _width_height ] - size ) * ( this._amt - 1 );
         //O else if ( this._amt < 0 ) size -= ( this[ _width_height ] - size ) * -this._amt;
         else if ( this._amt < 0 ) size -= ( this[ _width_height ] - size ) * -this._amt;
         //O if ( this._amt < 0 ) newPos = size * 0.5;
         if ( this._amt < 0 ) newPos = size * 0.5;
         //O else if ( this._amt > 1 ) newPos = this[ "_" + width_height ] - size * 0.5;
         else if ( this._amt > 1 ) newPos = this[ _width_height ] - size * 0.5;
         //O else newPos = ( _posAmt * this.scrollingContainer[ "_" + width_height ] ) + ( size * 0.5 );
         else newPos = ( _posAmt * this.scrollingContainer[ _width_height ] ) + ( size * 0.5 );
         //O this.handle[ top_left ] = newPos;
         this.handle[ top_left ] = newPos;
         //O this.toggleHidden( false );
         this.toggleHidden( false );
      }
      //O this.handle[ width_height ] = size;
      this.handle[ width_height ] = size;
   };

   private toggleHidden = ( hidden: boolean ): void =>
   {
      //O if ( this.autohide )
      if ( this.autohide )
      {
         //O if ( hidden && !this._hidden )
         if ( hidden && !this._hidden )
         {
            //O Tween.to( this, 0.2,
            Tween.to( this, 0.2,
            {
               //O alpha: 0
               alpha: 0
            } );
            //O this._hidden = true;
            this._hidden = true;
         }
         //O else if ( !hidden && this._hidden )
         else if ( !hidden && this._hidden )
         {
            //O Tween.to( this, 0.2,
            Tween.to( this, 0.2,
            {
               //O alpha: 1
               alpha: 1
            } );
            //O this._hidden = false;
            this._hidden = false;
         }
      }
   }
};

//O ScrollBar.prototype = Object.create( Slider.prototype );
//O ScrollBar.prototype.constructor = ScrollBar;
//O module.exports = ScrollBar;

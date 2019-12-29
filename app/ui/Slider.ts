//O var UIBase = require( './UIBase' );
import { UIBase } from './UIBase';
//O var DragEvent = require( './Interaction/DragEvent' );
import { DragEvent } from  './Interaction/DragEvent';
//O var ClickEvent = require( './Interaction/ClickEvent' );
//O var Tween = require( './Tween' );
//N No brackets, imports the default created Tween Instance from new.
import  Tween  from './Tween';

//O var Ease = require( './Ease/Ease' );
//N No brackets, imports the default created Ease Instance from new.
import Ease from './Ease/Ease';

//O var Helpers = require( './Helpers' );
import { Helpers } from './Helpers';

//N imported SliceSprite as it was needed
import { SliceSprite } from './SliceSprite';

interface INameToValueMap
{
    [key: string]: any;
}

//
// An UI Slider, the default width/height is 90%
//
// @class
// @extends UIBase
// @memberof PIXI.UI
// @param options {Object} Slider settings
// @param options.track {(PIXI.UI.SliceSprite|PIXI.UI.Sprite)}  Any type of UIOBject, will be used for the slider track
// @param options.handle {(PIXI.UI.SliceSprite|PIXI.UI.Sprite)} will be used as slider handle
// @param [options.fill=null] {(PIXI.UI.SliceSprite|PIXI.UI.Sprite)} will be used for slider fill
// @param [options.vertical=false] {boolean} Direction of the slider
// @param [options.value=0] {number} value of the slider
// @param [options.minValue=0] {number} minimum value
// @param [options.maxValue=100] {number} max value
// @param [options.decimals=0] {boolean} the decimal precision (use negative to round tens and hundreds)
// @param [options.onValueChange=null] {callback} Callback when the value has changed
// @param [options.onValueChanging=null] {callback} Callback while the value is changing
//

//O function Slider( options )
export class Slider extends UIBase
{
   //O this._amt = 0;
   protected _amt: number;
   //O this._disabled = false;
   private _disabled: boolean;

   //O // set options
   //O this.track = options.track;
   private track: SliceSprite;
   //O this.handle = options.handle;
   protected handle: SliceSprite;
   //O this.fill = options.fill || null;
   private fill: SliceSprite;
   //O this._minValue = options.minValue || 0;
   private _minValue: number;
   //O this._maxValue = options.maxValue || 100;
   private _maxValue: number;
   //O this.decimals = options.decimals || 0;
   protected decimals: number;
   //O this.vertical = options.vertical || false;
   protected vertical: boolean;
   //O this._onValueChange = options.onValueChange || null;
   protected _onValueChange: Function;
   //O this._onValueChanging = options.onValueChanging || null;
   protected _onValueChanging: Function;

   //N Keep track of drag event
   private _dragEventID: number;

   protected context: Slider;

   //N maxPosition is never defined
   private dragMaxPosition: number;
   private dragLocalMousePosition: PIXI.Point;
   private dragStartValue: number;
   private _lastChange:number;
   private _lastChanging:number;

   constructor ( options: INameToValueMap )
   {
      //O UIBase.call( this );
      //N call super instead of UIBase constructor
      super ( );

      //O this._amt = 0;
      this._amt = 0;
      //O this._disabled = false;
      this._disabled = false;

      //O //set options
      //O this.track = options.track;
      this.track = options.track;
      //O this.handle = options.handle;
      this.handle = options.handle;
      //O this.fill = options.fill || null;
      this.fill = options.fill || null;
      //O this._minValue = options.minValue || 0;
      this._minValue = options.minValue || 0;
      //O this._maxValue = options.maxValue || 100;
      this._maxValue = options.maxValue || 100;
      //O this.decimals = options.decimals || 0;
      this.decimals = options.decimals || 0;
      //O this.vertical = options.vertical || false;
      this.vertical = options.vertical || false;
      //O this._onValueChange = options.onValueChange || null;
      this._onValueChange = options.onValueChange || null;
      //O this._onValueChanging = options.onValueChanging || null;
      this._onValueChanging = options.onValueChanging || null;
      //O this.value = options.value || 50;
      this.value = options.value || 50;
      //O this.handle.pivot = 0.5;
      this.handle.pivot = new PIXI.Point(0.5, 0.5);;

      //O this.addChild( this.track );
      this.addChild( this.track );
      //O if ( this.fill ) this.track.addChild( this.fill );
      if ( this.fill ) this.track.addChild( this.fill );
      //O this.addChild( this.handle );
      this.addChild( this.handle );
      //O this.handle.container.buttonMode = true;
      this.handle.container.buttonMode = true;

      //O if ( this.vertical )
      if ( this.vertical )
      {
         //O this.height = "100%";
         this.height = "100%";
         //O this.width = this.track.width;
         this.width = this.track.width;
         //O this.track.height = "100%";
         this.track.height = "100%";
         //O this.handle.horizontalAlign = "center";
         this.handle.horizontalAlign = "center";
         //O if ( this.fill ) this.fill.horizontalAlign = "center";
         if ( this.fill ) this.fill.horizontalAlign = "center";
      }
      //O else
      else
      {
         //O this.width = "100%";
         this.width = "100%";
         //O this.height = this.track.height;
         this.height = this.track.height;
         //O this.track.width = "100%";
         this.track.width = "100%";
         //O this.handle.verticalAlign = "middle";
         this.handle.verticalAlign = "middle";
         //O if ( this.fill ) this.fill.verticalAlign = "middle";
         if ( this.fill ) this.fill.verticalAlign = "middle";
      }

      //N dragMaxPosition is never defined
      this.dragMaxPosition = null;
      this.dragLocalMousePosition = null;
      this.dragStartValue = null;
      this._lastChange = null;
      this._lastChanging = null;
   }

   //O Slider.prototype.update = function( soft )
   public update = ( soft?: boolean ) =>
   {
      //O val handleSize;
      let handleSize: number = 0;
      //O  val;
      let  val: number = 0;

      //O if ( this.vertical )
      if ( this.vertical )
      {
         //O handleSize = this.handle._height || this.handle.container.height;
         handleSize = this.handle._height || this.handle.container.height;
         //O val = ( ( this._height - handleSize ) * this._amt ) + ( handleSize * 0.5 );
         val = ( ( this._height - handleSize ) * this._amt ) + ( handleSize * 0.5 );
         //O if ( soft )
         if ( soft )
         {
            //O Tween.to( this.handle, 0.3,
            Tween.to( this.handle, 0.3,
            {
               //O top: val
               top: val
            }, Ease.Power2.easeOut );
            //O if ( this.fill ) Tween.to( this.fill, 0.3,
            if ( this.fill ) Tween.to( this.fill, 0.3,
            {
               //O height: val
               height: val
            }, Ease.Power2.easeOut );
         }
         //O else
         else
         {
            //O Tween.set( this.handle,
            Tween.set( this.handle,
            {
               //O top: val
               top: val
            } );
            //O if ( this.fill ) Tween.set( this.fill,
            if ( this.fill ) Tween.set( this.fill,
            {
               //O height: val
               height: val
            } );
         }
      }
      //O else
      else
      {
         //O handleSize = this.handle._width || this.handle.container.width;
         handleSize = this.handle._width || this.handle.container.width;
         //O val = ( ( this._width - handleSize ) * this._amt ) + ( handleSize * 0.5 );
         val = ( ( this._width - handleSize ) * this._amt ) + ( handleSize * 0.5 );
         //O if ( soft )
         if ( soft )
         {
            //O Tween.to( this.handle, 0.3,
            Tween.to( this.handle, 0.3,
            {
               //O left: val
               left: val
            }, Ease.Power2.easeOut );
            //O if ( this.fill ) Tween.to( this.fill, 0.3,
            if ( this.fill ) Tween.to( this.fill, 0.3,
            {
               //O width: val
               width: val
            }, Ease.Power2.easeOut );
         }
         //O else
         else
         {
            //O Tween.set( this.handle,
            Tween.set( this.handle,
            {
               //O left: val
               left: val
            } );
            //O if ( this.fill ) Tween.set( this.fill,
            if ( this.fill ) Tween.set( this.fill,
            {
               //O width: val
               width: val
            } );
         }
      }
   };

   //O Slider.prototype.initialize = function( )
   public initialize = ( ) =>
   {
      //O UIBase.prototype.initialize.call( this );
      //hmm Only public and protected methods of the base class are
      //    accessible via the 'super' keyword.  BUT IT IS!
      //super.initialize();
      UIBase.prototype.initialize.call( this );

      //O var self = this;
      this.context = this;
      //O var startValue = 0;
      this.dragStartValue = 0;

      //O // Handle dragging
      //O var handleDrag = new DragEvent( this.handle );
      let handleDrag = new DragEvent( this.handle );

      //O handleDrag.onPress = function( event, isPressed )
      handleDrag.onPress = this.handleDragOnPress;

      //O handleDrag.onDragStart = function( event )
      handleDrag.onDragStart = this.handleDragOnDragStart;

      //O handleDrag.onDragMove = function( event, offset )
      handleDrag.onDragMove = this.handleDragOnDragMove;

      //O handleDrag.onDragEnd = function( )
      handleDrag.onDragEnd = this.handleDragOnDragEnd;

      //O // Bar pressing/dragging
      //O var localMousePosition = new PIXI.Point( );
      this.dragLocalMousePosition = new PIXI.Point( );
      //O var trackDrag = new DragEvent( this.track );
      let trackDrag = new DragEvent( this.track );

      //O trackDrag.onPress = function( event, isPressed )
      trackDrag.onPress = this.trackDragOnPress;

      //O trackDrag.onDragMove = function( event )
      trackDrag.onDragMove = this.trackDragOnDragMove;

      //O trackDrag.onDragEnd = function( )
      trackDrag.onDragEnd = this.onDragEnd;

      //O var updatePositionToMouse = function( mousePosition, soft )

      //O var triggerValueChange = function( )

      //O var triggerValueChanging = function( )
   }

   //O var updatePositionToMouse = function( mousePosition, soft )
   public updatePositionToMouse = ( mousePosition: PIXI.Point, soft:boolean ):void =>
   {
      //O self.track.container.toLocal( mousePosition, null, localMousePosition, true );
      this.context.track.container.toLocal( mousePosition, null, this.dragLocalMousePosition, true );

      //O var newPos = self.vertical ? localMousePosition.y - self.handle._height * 0.5 : localMousePosition.x - self.handle._width * 0.5;
      let newPos = this.context.vertical ? this.dragLocalMousePosition.y - this.context.handle._height * 0.5 : this.dragLocalMousePosition.x - this.context.handle._width * 0.5;
      //O var maxPos = self.vertical ? self._height - self.handle._height : self._width - self.handle._width;
      let maxPos = this.context.vertical ? this.context._height - this.context.handle._height : this.context._width - this.context.handle._width;
      //O self._amt = !maxPos ? 0 : Math.max( 0, Math.min( 1, newPos / maxPos ) );
      this.context._amt = !maxPos ? 0 : Math.max( 0, Math.min( 1, newPos / maxPos ) );
      //O self.update( soft );
      this.context.update( soft );
      //O triggerValueChanging( );
      this.triggerValueChanging( );
   };

   //O var triggerValueChange = function( )
   public triggerValueChange = ( ):void =>
   {
      //O self.emit( "change", self.value );
      this.context.emit( "change", this.context.value );
      //O if ( self._lastChange != self.value )
      if ( this.context._lastChange != this.context.value )
      {
         //O self._lastChange = self.value;
         this.context._lastChange = this.context.value;
         //O if ( typeof self.onValueChange === "function" )
         if ( typeof this.context.onValueChange === "function" )
         {
            //O self.onValueChange( self.value );
            this.context.onValueChange( this.context.value );
         }
      }
   };

   //O let triggerValueChanging = function( )
   public triggerValueChanging = ( ):void =>
   {
      //O self.emit( "changing", self.value );
      this.context.emit( "changing", this.context.value );
      //O if ( self._lastChanging != self.value )
      if ( this.context._lastChanging != this.context.value )
      {
         //O self._lastChanging = self.value;
         this.context._lastChanging = this.context.value;
         //O if ( typeof self._onValueChanging === "function" )
         if ( typeof this.context._onValueChanging === "function" )
         {
            //O self._onValueChanging( self.value );
            this.context._onValueChanging( this.context.value );
         }
      }
   };

   public trackDragOnPress = (event: PIXI.interaction.InteractionEvent, isPressed: boolean): void =>
   {
      //O if (isPressed)
      if (isPressed)
      {
         //O this.updatePositionToMouse(event.data.global, true);
         this.updatePositionToMouse(event.data.global, true);
      }

      //O event.stopPropagation();
      event.stopPropagation();
   };
   public trackDragOnDragMove = (event: PIXI.interaction.InteractionEvent): void =>
   {
      //O this.updatePositionToMouse(event.data.global, false);
      this.updatePositionToMouse(event.data.global, false);
   };
   public trackDragOnDragEnd = (): void =>
   {
      //O this.triggerValueChange();
      this.triggerValueChange();
   };

   //O handleDragOnPress = function ( event, isPressed)
   //N isPressed is not read and can be omitted
   public handleDragOnPress = ( event: PIXI.interaction.InteractionEvent ): void =>
   {
      //O event.stopPropagation( );
      event.stopPropagation( );
   };

   //O handleDrag.onDragStart = function( event )
   //N event is not read and can be omitted
   public handleDragOnDragStart = ( event: PIXI.interaction.InteractionEvent): void =>
   {
      //New Solves event parameter not being read
      this._dragEventID =  event.data.identifier;

      //O startValue = self._amt;
      this.dragStartValue = this.context._amt;
      //O maxPosition = self.vertical ? self._height - self.handle._height : self._width - self.handle._width;
      this.dragMaxPosition = this.context.vertical ? this.context._height - this.context.handle._height : this.context._width - this.context.handle._width;
   };

   //O handleDrag.onDragMove = function( event, offset )
   //N event is not read and can be omitted
   public handleDragOnDragMove = ( event: PIXI.interaction.InteractionEvent, offset: PIXI.Point ): void =>
   {
      //New Solves event parameter not being read and then
      //    offset required to be second parameter
      if ( event.data.identifier !== this._dragEventID )
      {
         return;
      }

      //O self._amt = !maxPosition ? 0 : Math.max( 0, Math.min( 1, startValue + ( ( self.vertical ? offset.y : offset.x ) / this.maxPosition ) ) );
      this.context._amt = !this.dragMaxPosition ? 0 : Math.max( 0, Math.min( 1, this.dragStartValue + ( ( this.context.vertical ? offset.y : offset.x ) / this.dragMaxPosition ) ) );

      //O triggerValueChanging( );
      this.triggerValueChanging( );
      //O self.update( );
      this.context.update( );
   };

   //O handleDrag.onDragEnd = function( )
   public handleDragOnDragEnd = ( ): void =>
   {
      //O triggerValueChange( );
      this.triggerValueChange( );
      //O self.update( );
      this.context.update( );
   };

   //O Object.defineProperties( Slider.prototype,
   //O // value:
   //O get: function( )
   get value( ): number
   {
      //O return Helpers.Round( Helpers.Lerp( this._minValue, this._maxValue, this._amt ), this.decimals );
      return Helpers.Round( Helpers.Lerp( this._minValue, this._maxValue, this._amt ), this.decimals );
   };
   //O set: function( val )
   set value( val: number )
   {
      //O this._amt = ( Math.max( this._minValue, Math.min( this._maxValue, val ) ) - this._minValue ) / ( this._maxValue - this._minValue );
      this._amt = ( Math.max( this._minValue, Math.min( this._maxValue, val ) ) - this._minValue ) / ( this._maxValue - this._minValue );

      //O if ( typeof this.onValueChange === "function" )
      if ( typeof this.onValueChange === "function" )
      {
         //O self.onValueChange( this.value );
         this.context.onValueChange( this.value );
      }
      //O if ( typeof this._onValueChanging === "function" )
      if ( typeof this._onValueChanging === "function" )
      {
         //O this._onValueChanging( this.value );
         this._onValueChanging( this.value );
      }
      //O this.update( );
      this.update( );
   };

   //O // onValueChange:
   //O get: function( )
   get onValueChange( ): Function
   {
      //O return this._onValueChange;
      return this._onValueChange;
   };
   //O set: function( val )
   set onValueChange( val: Function )
   {
      //O this._onValueChange = val;
      this._onValueChange = val;
   };

   //O // onValueChanging:
   //O get: function( )
   get onValueChanging( ): Function
   {
      //O return this._onValueChanging;
      return this._onValueChanging;
   };
   //O set: function( val )
   set onValueChanging( val: Function )
   {
      //O this._onValueChanging = val;
      this._onValueChanging = val;
   };

   //O // minValue:
   //O get: function( )
   get minValue( ): number
   {
      //O return this._minValue;
      return this._minValue;
   };
   //O set: function( val )
   set minValue( val: number )
   {
      //O this._minValue = val;
      this._minValue = val;
      //O this.update( );
      this.update( );
   };

   //O // maxValue:
   //O get: function( )
   get maxValue( ): number
   {
      //O return this._maxValue;
      return this._maxValue;
   };
   //O set: function( val )
   set maxValue( val: number )
   {
      //O this._maxValue = val;
      this._maxValue = val;
      //O this.update( );
      this.update( );
   };
 
   //O // disabled:
   //O get: function( )
   get disabled( ): boolean
   {
      //O return this._disabled;
      return this._disabled;
   };
   //O set: function( val )
   set disabled( val: boolean )
   {
      //O if ( val !== this._disabled )
      if ( val !== this._disabled )
      {
         //O this._disabled = val;
         this._disabled = val;
         //O this.handle.container.buttonMode = !val;
         this.handle.container.buttonMode = !val;
         //O this.handle.container.interactive = !val;
         this.handle.container.interactive = !val;
         //O this.track.container.interactive = !val;
         this.track.container.interactive = !val;
      }
   };
}

//O Slider.prototype = Object.create( UIBase.prototype );
//O Slider.prototype.constructor = Slider;
//O Slider.prototype.update = function( soft )
//O module.exports = Slider;

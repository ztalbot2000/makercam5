import * as PIXI from 'pixi.js';
import
{
   UIBase
} from '../UIBase';

//O var ClickEvent = function (obj, includeHover, rightMouseButton, doubleClick)
class ClickEvent
{
   //New as obj is used by class methods
   private objO: UIBase;
   private bound: boolean;
   //New context was originally named self.
   //Hmm Change ClickEvent to Arrow functions would solve this
   public context: ClickEvent;
   private id: number;
   private ishover: boolean;
   private mouse: PIXI.Point;
   private offset: PIXI.Point;
   private movementX: number;
   private movementY: number;
   private right: boolean;
   private hover: boolean;
   private double: boolean;
   private eventname_mousedown: string;
   private eventname_mouseup: string;
   private eventname_mouseupoutside: string;
   private time: number;

   constructor( obj: UIBase, includeHover: boolean, rightMouseButton: boolean, doubleClick: boolean )
   {
      //New as obj is used by class methods
      this.objO = obj;

      //O var bound = false,
      this.bound = false;
      //O self = this,
      //Hmm. Change self to context fixes typescript compile
      this.context = this;
      //O id = 0,
      this.id = 0;
      //O ishover = false,
      this.ishover = false;
      //O mouse = new PIXI.Point(),
      this.mouse = new PIXI.Point( );
      //O offset = new PIXI.Point(),
      this.offset = new PIXI.Point( );
      //O movementX = 0,
      this.movementX = 0;
      //O movementY = 0,
      this.movementY = 0;
      //O right = typeof rightMouseButton === 'undefined' ? false : rightMouseButton,
      this.right = typeof rightMouseButton === 'undefined' ? false : rightMouseButton;
      //O hover = typeof includeHover === 'undefined' ? true : includeHover,
      this.hover = typeof includeHover === 'undefined' ? true : includeHover;
      //O double = typeof doubleClick === 'undefined' ? false : doubleClick;
      this.double = typeof doubleClick === 'undefined' ? false : doubleClick;

      //O var eventname_mousedown = right ? "rightdown" : "mousedown";
      this.eventname_mousedown = this.right ? "rightdown" : "mousedown";
      //O var eventname_mouseup = right ? "rightup" : "mouseup";
      this.eventname_mouseup = this.right ? "rightup" : "mouseup";
      //O var eventname_mouseupoutside = right ? "rightupoutside" : "mouseupoutside";
      this.eventname_mouseupoutside = this.right ? "rightupoutside" : "mouseupoutside";

      //O obj.container.interactive = true;
      obj.container.interactive = true;

      //O var time = 0;
      this.time = 0;

      //O this.startEvent();
      this.startEvent( );
   }

   //O var _onMouseDown = function (event)
   private _onMouseDown( event: PIXI.interaction.InteractionEvent )
   {
      //O mouse.copy(event.data.global);
      this.mouse.copyTo( event.data.global );
      //O id = event.data.identifier;
      this.id = event.data.identifier;
      //O self.onPress.call(obj, event, true);
      this.context.onPress.call( this.objO, event, true );
      //O if (!bound)
      if ( ! this.bound )
      {
         //O obj.container.on(eventname_mouseup, _onMouseUp);
         this.objO.container.on( this.eventname_mouseup, this._onMouseUp );
         //O obj.container.on(eventname_mouseupoutside, _onMouseUpOutside);
         this.objO.container.on( this.eventname_mouseupoutside, this._onMouseUpOutside );
         //O if (!right)
         if ( ! this.right )
         {
            //O obj.container.on('touchend', _onMouseUp);
            this.objO.container.on( 'touchend', this._onMouseUp );
            //O obj.container.on('touchendoutside', _onMouseUpOutside);
            this.objO.container.on( 'touchendoutside', this._onMouseUpOutside );
         }
         //O bound = true;
         this.bound = true;
      }

      //O if (double)
      if ( this.double )
      {
         //O var now = performance.now();
         let now = performance.now( );
         //O if (now - time < 210)
         if ( now - this.time < 210 )
         {
            //O self.onClick.call(obj, event);
            this.context.onClick.call( this.objO, event );
         }
         else
         {
            //O time = now;
            this.time = now;
         }
      }

      //O event.data.originalEvent.preventDefault();
      event.data.originalEvent.preventDefault( );
   };

   //O var _mouseUpAll = function (event)
   private _mouseUpAll( event: PIXI.interaction.InteractionEvent )
   {
      //O if (event.data.identifier !== id)
      if ( event.data.identifier !== this.id )
         //O return;
         return;

      //O offset.set(event.data.global.x - this.mouse.x, event.data.global.y - this.mouse.y);
      this.offset.set( event.data.global.x - this.mouse.x, event.data.global.y - this.mouse.y );

      //O if (bound)
      if ( this.bound )
      {
         //O obj.container.removeListener(eventname_mouseup, _onMouseUp);
         this.objO.container.removeListener( this.eventname_mouseup, this._onMouseUp );
         //O obj.container.removeListener( eventname_mouseupoutside, _onMouseUpOutside);
         this.objO.container.removeListener( this.eventname_mouseupoutside, this._onMouseUpOutside );
         //O if (!right)
         if ( ! this.right )
         {
            //O obj.container.removeListener('touchend', _onMouseUp);
            this.objO.container.removeListener( 'touchend', this._onMouseUp );
            //O obj.container.removeListener('touchendoutside', _onMouseUpOutside);
            this.objO.container.removeListener( 'touchendoutside', this._onMouseUpOutside );
         }
         //O bound = false;
         this.bound = false;
      }
      //O self.onPress.call(obj, event, false);
      this.context.onPress.call( this.objO, event, false );
   };

   //O var _onMouseUp = function (event)
   private _onMouseUp( event: PIXI.interaction.InteractionEvent )
   {
      //O if (event.data.identifier !== id)
      if ( event.data.identifier !== this.id )
         //O return;
         return;

      //O _mouseUpAll(event);
      this._mouseUpAll( event );

      //O prevent clicks with scrolling/dragging objects
      //O if (obj.dragThreshold)
      if ( this.objO.dragThreshold )
      {
         //O movementX = Math.abs(offset.x);
         this.movementX = Math.abs( this.offset.x );
         //O movementY = Math.abs(offset.y);
         this.movementY = Math.abs( this.offset.y );
         //O if (Math.max(this.movementX, this.movementY) > obj.dragThreshold) return;
         if ( Math.max( this.movementX, this.movementY ) > this.objO.dragThreshold ) return;
      }

      //O if (!double)
      if ( ! this.double )
      {
         //O self.onClick.call(obj, event);
         this.context.onClick.call( this.objO, event );
      }
   };

   //O var _onMouseUpOutside = function (event)
   private _onMouseUpOutside( event: PIXI.interaction.InteractionEvent )
   {
      //O if (event.data.identifier !== id)
      if ( event.data.identifier !== this.id )
      {
         //O return;
         return;
      }

      //O _mouseUpAll(event);
      this._mouseUpAll( event );
   };

   //O var _onMouseOver = function (event)
   private _onMouseOver( event: PIXI.interaction.InteractionEvent )
   {
      //O if (!ishover)
      if ( ! this.ishover )
      {
         //O ishover = true;
         this.ishover = true;
         //O obj.container.on('mousemove', _onMouseMove);
         this.objO.container.on( 'mousemove', this._onMouseMove );
         //O obj.container.on('touchmove', _onMouseMove);
         this.objO.container.on( 'touchmove', this._onMouseMove );
         //O self.onHover.call(obj, event, true);
         this.context.onHover.call( this.objO, event, true );
      }
   };

   //O var _onMouseOut = function (event)
   private _onMouseOut( event: PIXI.interaction.InteractionEvent )
   {
      //O if (ishover)
      if ( this.ishover )
      {
         //O ishover = false;
         this.ishover = false;
         //O obj.container.removeListener('mousemove', _onMouseMove);
         this.objO.container.removeListener( 'mousemove', this._onMouseMove );
         //O obj.container.removeListener('touchmove', _onMouseMove);
         this.objO.container.removeListener( 'touchmove', this._onMouseMove );
         //O self.onHover.call(obj, event, false);
         this.context.onHover.call( this.objO, event, false );
      }
   };

   //O var _onMouseMove = function (event)
   private _onMouseMove( event: PIXI.interaction.InteractionEvent )
   {
      //O self.onMove.call(obj, event);
      this.context.onMove.call( this.objO, event );
   };

   //O this.stopEvent = function ()
   public stopEvent( )
   {
      //O if (bound)
      if ( this.bound )
      {
         //O obj.container.removeListener(eventname_mouseup, _onMouseUp);
         this.objO.container.removeListener( this.eventname_mouseup, this._onMouseUp );
         //O obj.container.removeListener(eventname_mouseupoutside, _onMouseUpOutside);
         this.objO.container.removeListener( this.eventname_mouseupoutside, this._onMouseUpOutside );

         //O if (!right)
         if ( ! this.right )
         {
            //O obj.container.removeListener('touchend', _onMouseUp);
            this.objO.container.removeListener( 'touchend', this._onMouseUp );
            //O obj.container.removeListener('touchendoutside', _onMouseUpOutside);
            this.objO.container.removeListener( 'touchendoutside', this._onMouseUpOutside );
         }
         //O bound = false;
         this.bound = false;
      }
      //O obj.container.removeListener(eventname_mousedown, _onMouseDown);
      this.objO.container.removeListener( this.eventname_mousedown, this._onMouseDown );

      //O if (!right)
      if ( ! this.right )
         //obj.container.removeListener('touchstart', _onMouseDown);
         this.objO.container.removeListener( 'touchstart', this._onMouseDown );

      //O if (hover)
      if ( this.hover )
      {
         //O obj.container.removeListener('mouseover', _onMouseOver);
         this.objO.container.removeListener( 'mouseover', this._onMouseOver );
         //O obj.container.removeListener('mouseout', _onMouseOut);
         this.objO.container.removeListener( 'mouseout', this._onMouseOut );
         //O obj.container.removeListener('mousemove', _onMouseMove);
         this.objO.container.removeListener( 'mousemove', this._onMouseMove );
         //O obj.container.removeListener('touchmove', _onMouseMove);
         this.objO.container.removeListener( 'touchmove', this._onMouseMove );
      }
   };

   //O this.startEvent = function ()
   private startEvent( )
   {
      //O obj.container.on(eventname_mousedown, _onMouseDown);
      this.objO.container.on( this.eventname_mousedown, this._onMouseDown );

      //O if (!right)
      if ( ! this.right )
         //O obj.container.on('touchstart', _onMouseDown);
         this.objO.container.on( 'touchstart', this._onMouseDown );

      //O if (hover)
      if ( this.hover )
      {
         //O obj.container.on('mouseover', _onMouseOver);
         this.objO.container.on( 'mouseover', this._onMouseOver );
         //O obj.container.on('mouseout', _onMouseOut);
         this.objO.container.on( 'mouseout', this._onMouseOut );
      }
   };

   //N These methods are meant to be filled in by anyone who uses this class.
   //O ClickEvent.prototype.onHover = function (event, over) { };
   public onHover( _event: PIXI.interaction.InteractionEvent, _over: boolean ) {};

   //O ClickEvent.prototype.onClick = function (event) { };
   public onClick( _event: PIXI.interaction.InteractionEvent ) {};

   //O ClickEvent.prototype.onPress = function (event, isPressed) { };
   public onPress( _event: PIXI.interaction.InteractionEvent, _isPressed: boolean ) {};
   //O ClickEvent.prototype.onMove = function (event) { };
   public onMove( _event: PIXI.interaction.InteractionEvent ) {};

};

//O ClickEvent.prototype.constructor = ClickEvent;
module.exports = ClickEvent;

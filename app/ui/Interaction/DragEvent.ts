import * as PIXI from 'pixi.js';
import { UIBase } from '../UIBase';

//O var DragEvent = function( obj )
export class DragEvent
{
   //New as obj is used by class methods
   private objO: UIBase;
   private bound: boolean;
   private start: PIXI.Point;
   private offset: PIXI.Point;
   private mouse: PIXI.Point;
   private movementX: number;
   private movementY: number;
   private cancel: boolean;
   private dragging: boolean;
   //New context was originally named self.
   //Hmm Change ClickEvent to Arrow functions would solve this
   public context: DragEvent;
   private id: number;


   constructor( obj: UIBase )
   {
      //O var bound = false,
      this.bound = false;
      //O start = new PIXI.Point( ),
      this.start = new PIXI.Point( );
      //O offset = new PIXI.Point( ),
      this.offset = new PIXI.Point( );
      //O mouse = new PIXI.Point( ),
      this.mouse = new PIXI.Point( );
      //O movementX = 0,
      this.movementX = 0;
      //O movementY = 0,
      this.movementY = 0;
      //O cancel = false,
      this.cancel = false;
      //O dragging = false,
      this.dragging = false;
      //O self = this,
      this.context = this;
      //O id = 0;
      this.id = 0;

      //O obj.container.interactive = true;
      obj.container.interactive = true;

      //O this.startEvent( );
      this.startEvent( );
   }

   //O var _onDragStart = function( e )
   private _onDragStart = ( e: PIXI.interaction.InteractionEvent ): void =>
   {
      //O id = e.data.identifier;
      this.id = e.data.identifier;
      //O self.onPress.call( obj, e, true );
      this.context.onPress.call( this.objO, e, true );
      //O if ( !bound )
      if ( ! this.bound )
      {
         //O start.copy( e.data.global );
         this.start.copyTo( e.data.global );
         //O obj.stage.on( 'mousemove', _onDragMove );
         this.objO.stage.on( 'mousemove', this._onDragMove );
         //O obj.stage.on( 'touchmove', _onDragMove );
         this.objO.stage.on( 'touchmove', this._onDragMove );
         //O obj.stage.on( 'mouseup', _onDragEnd );
         this.objO.stage.on( 'mouseup', this._onDragEnd );
         //O obj.stage.on( 'mouseupoutside', _onDragEnd );
         this.objO.stage.on( 'mouseupoutside', this._onDragEnd );
         //O obj.stage.on( 'touchend', _onDragEnd );
         this.objO.stage.on( 'touchend', this._onDragEnd );
         //O obj.stage.on( 'touchendoutside', _onDragEnd );
         this.objO.stage.on( 'touchendoutside', this._onDragEnd );
         //O obj.stage.on( 'touchcancel', _onDragEnd );
         this.objO.stage.on( 'touchcancel', this._onDragEnd );
         //O bound = true;
         this.bound = true;
      }

      //O e.data.originalEvent.preventDefault( );
      e.data.originalEvent.preventDefault( );
   };

   //O var _onDragMove = function( event )
   private _onDragMove = ( event: PIXI.interaction.InteractionEvent ): void =>
   {
      //O if ( event.data.identifier !== id )
      if ( event.data.identifier !== this.id )
         //O return;
         return;

      //O mouse.copy( event.data.global );
      this.mouse.copyTo( event.data.global );
      //O offset.set( mouse.x - start.x, mouse.y - start.y );
      this.offset.set( this.mouse.x -  this.start.x,  this.mouse.y -  this.start.y );
      //O if ( !dragging )
      if ( ! this.dragging )
      {
         //O movementX = Math.abs( offset.x );
          this.movementX = Math.abs( this.offset.x );
         //O movementY = Math.abs( offset.y );
          this.movementY = Math.abs( this.offset.y );
         //O thresshold
         //O if ( movementX === 0 && movementY === 0 || Math.max( movementX, movementY ) < obj.dragThreshold ) return;
         if (  this.movementX === 0 &&  this.movementY === 0 || Math.max(  this.movementX,  this.movementY ) <  this.objO.dragThreshold )
         {
            //O return;
            return;
         }
         //O if ( obj.dragRestrictAxis !== null )
         if ( this.objO.dragRestrictAxis !== null )
         {
            //O cancel = false;
            this.cancel = false;
            //O if ( obj.dragRestrictAxis == "x" && movementY > movementX )
            if ( this.objO.dragRestrictAxis == "x" && this.movementY > this.movementX )
            {
               //O cancel = true;
               this.cancel = true;
            }
            //O else if ( obj.dragRestrictAxis == "y" && movementY <= movementX )
            else if ( this.objO.dragRestrictAxis == "y" && this.movementY <= this.movementX )
            {
               //O cancel = true;
               this.cancel = true;
            }

            //O if ( cancel )
            if ( this.cancel )
            {
               //O _onDragEnd( event );
               this._onDragEnd( event );
               //O return;
               return;
            }
         }
         //O self.onDragStart.call( obj, event );
         this.context.onDragStart.call( this.objO, event );
         //O dragging = true;
         this.dragging = true;
      }
      //O self.onDragMove.call( obj, event, offset );
      this.context.onDragMove.call( this.objO, event, this.offset );
   };

   //O var _onDragEnd = function( event )
   private _onDragEnd = ( event:PIXI.interaction.InteractionEvent ): void =>
   {
      //O if ( event.data.identifier !== id )
      if ( event.data.identifier !== this.id )
      {
         //O return;
         return;
      }

      //O if ( bound )
      if ( this.bound )
      {
         //O obj.stage.removeListener( 'mousemove', _onDragMove );
         this.objO.stage.removeListener( 'mousemove', this._onDragMove );
         //O obj.stage.removeListener( 'touchmove', _onDragMove );
         this.objO.stage.removeListener( 'touchmove', this._onDragMove );
         //O obj.stage.removeListener( 'mouseup', _onDragEnd );
         this.objO.stage.removeListener( 'mouseup', this._onDragEnd );
         //O obj.stage.removeListener( 'mouseupoutside', _onDragEnd );
         this.objO.stage.removeListener( 'mouseupoutside', this._onDragEnd );
         //O obj.stage.removeListener( 'touchend', _onDragEnd );
         this.objO.stage.removeListener( 'touchend', this._onDragEnd );
         //O obj.stage.removeListener( 'touchendoutside', _onDragEnd );
         this.objO.stage.removeListener( 'touchendoutside', this._onDragEnd );
         //O obj.stage.removeListener( 'touchcancel', _onDragEnd );
         this.objO.stage.removeListener( 'touchcancel', this._onDragEnd );
         //O dragging = false;
         this.dragging = false;
         //O bound = false;
         this.bound = false;
         //O self.onDragEnd.call( obj, event );
         this.context.onDragEnd.call( this.objO, event );
         //O self.onPress.call( obj, event, false );
         this.context.onPress.call( this.objO, event, false );

      }
   };

   //O this.stopEvent = function( )
   public stopEvent = ( ): void =>
   {
      //O if ( bound )
      if ( this.bound )
      {
         //O obj.stage.removeListener( 'mousemove', _onDragMove );
         this.objO.stage.removeListener( 'mousemove', this._onDragMove );
         //O obj.stage.removeListener( 'touchmove', _onDragMove );
         this.objO.stage.removeListener( 'touchmove', this._onDragMove );
         //O obj.stage.removeListener( 'mouseup', _onDragEnd );
         this.objO.stage.removeListener( 'mouseup', this._onDragEnd );
         //O obj.stage.removeListener( 'mouseupoutside', _onDragEnd );
         this.objO.stage.removeListener( 'mouseupoutside', this._onDragEnd );
         //O obj.stage.removeListener( 'touchend', _onDragEnd );
         this.objO.stage.removeListener( 'touchend', this._onDragEnd );
         //O obj.stage.removeListener( 'touchendoutside', _onDragEnd );
         this.objO.stage.removeListener( 'touchendoutside', this._onDragEnd );
         //O bound = false;
         this.bound = false;
      }
      //O obj.container.removeListener( 'mousedown', _onDragStart );
      this.objO.container.removeListener( 'mousedown', this._onDragStart );
      //O obj.container.removeListener( 'touchstart', _onDragStart );
      this.objO.container.removeListener( 'touchstart', this._onDragStart );
   };

   //O this.startEvent = function( )
   public startEvent = ( ): void =>
   {
      //O obj.container.on( 'mousedown', _onDragStart );
      this.objO.container.on( 'mousedown', this._onDragStart );
      //O obj.container.on( 'touchstart', _onDragStart );
      this.objO.container.on( 'touchstart', this._onDragStart );
   };

   //N These methods are meant to be filled in by anyone who uses this class.
   //O DragEvent.prototype.onPress = function( event, isPressed ) {};
   public onPress = ( _event: PIXI.interaction.InteractionEvent, _isPressed: boolean ) => { };
   //O DragEvent.prototype.onDragEnd = function( event ) {};
   public onDragEnd = ( _event: PIXI.interaction.InteractionEvent ) => { };
   //O DragEvent.prototype.onDragMove = function( event, offset ) {};
   public onDragMove = ( _event: PIXI.interaction.InteractionEvent, _offset:PIXI.Point ) => { };
   //O DragEvent.prototype.onDragStart = function( event ) {};
   public onDragStart = ( _event: PIXI.interaction.InteractionEvent ) => { };

};

//O DragEvent.prototype.constructor = DragEvent;
//O module.exports = DragEvent;

import * as PIXI from 'pixi.js';
import UIBase from '../UIBase';

//O var MouseScrollEvent = function( obj, preventDefault )
class MouseScrollEvent
{
   //New as obj is used by class methods
   private objO: UIBase;

   private preventDefault: boolean;

   //O var bound = false,
   private bound: boolean;
   //O delta = new PIXI.Point( ),
   private delta:PIXI.Point;
   //New context was originally named self.
   //Hmm Change ClickEvent to Arrow functions would solve this
   //O self = this;
   public context: MouseScrollEvent;

   constructor(obj: UIBase, preventDefault: boolean)
   {
      //New as obj is used by class methods
      this.objO = obj;

      //O var bound = false,
      this.bound = false;
      //O delta = new PIXI.Point( ),
      this.delta = new PIXI.Point( );
      //O self = this;
      //Hmm. Change self to context fixes typescript compile
      this.context = this;

      //New
      this.preventDefault = preventDefault;

      //O obj.container.interactive = true;
      obj.container.interactive = true;

      //O this.startEvent( );
      this.startEvent( );
   }

   //O var _onMouseScroll = function( event )
   private _onMouseScroll = ( event: any): void =>
   {
      //O if ( preventDefault )
      if ( this.preventDefault )
      {
         //O event.preventDefault( );
         event.preventDefault( );
      }

      //O if ( typeof event.deltaX !== "undefined" )
      if ( typeof event.deltaX !== "undefined" )
      {
         //O delta.set( event.deltaX, event.deltaY );
         this.delta.set( event.deltaX, event.deltaY );

      }
      //O else                                              //Firefox
      else                                                  //Firefox
      {
        //O delta.set( event.axis == 1 ? event.detail * 60 : 0, event.axis == 2 ? event.detail * 60 : 0 );
        this.delta.set( event.axis == 1 ? event.detail * 60 : 0, event.axis == 2 ? event.detail * 60 : 0 );
      }

      //O self.onMouseScroll.call( obj, event, delta );
      this.context.onMouseScroll.call( this.objO, event, this.delta );
   };

   //O var _onHover = function( event )
   private _onMouseOver = ( _event : PIXI.interaction.InteractionEvent ): void =>
   {
      //O if ( !bound )
      if ( ! this.bound )
      {
         //O document.addEventListener( "mousewheel", _onMouseScroll, false );
         document.addEventListener( "wheel",
                                 this._onMouseScroll, false );

         document.addEventListener( "DOMMouseScroll",
                                 this._onMouseScroll, false );

         //O bound = true;
         this.bound = true;
      }
   };

   //O var _onMouseOut = function( event )
   private _onMouseOut = ( _event: PIXI.interaction.InteractionEvent ): void =>
   {
      //O if ( bound )
      if ( this.bound )
      {
         //O document.removeEventListener( "mousewheel", _onMouseScroll );
         document.removeEventListener( "wheel",
                                        this._onMouseScroll );

         //O document.removeEventListener( "DOMMouseScroll", _onMouseScroll );
         document.removeEventListener( "DOMMouseScroll",
                                        this._onMouseScroll );

         //O bound = false;
         this.bound = false;
      }
   };

   //O this.stopEvent = function( )
   public stopEvent = ( ): void =>
   {
      //O if ( bound )
      if ( this.bound )
      {
         //O document.removeEventListener( "mousewheel", _onMouseScroll );
         document.removeEventListener( "wheel",
                            this._onMouseScroll );

         //O document.removeEventListener( "DOMMouseScroll", _onMouseScroll );
         document.removeEventListener( "DOMMouseScroll",
                            this._onMouseScroll );

         //O bound = false;
         this.bound = false;
      }
      //O obj.container.removeListener( 'mouseover', _onHover );
      this.objO.container.removeListener( 'mouseover',
                                          this._onMouseOver );
      //O obj.container.removeListener( 'mouseout', _onMouseOut );
      this.objO.container.removeListener( 'mouseout',
                                           this._onMouseOut);
   };

   //O this.startEvent = function( )
   public startEvent = ( ): void =>
   {
      //O obj.container.on( 'mouseover', _onHover );
      this.objO.container.on( 'mouseover',
                               this._onMouseOver );
      //O obj.container.on( 'mouseout', _onMouseOut );
      this.objO.container.on( 'mouseout',
                               this._onMouseOut );
   };


   //O MouseScrollEvent.prototype.onMouseScroll = function( event, delta ) {};
   public onMouseScroll = ( _event:
                         PIXI.interaction.InteractionEvent,
                        _delta: PIXI.Point ) => {};
};

//O MouseScrollEvent.prototype.constructor = MouseScrollEvent;
//O module.exports = MouseScrollEvent;
module.exports = MouseScrollEvent;


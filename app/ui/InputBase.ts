//O var UIBase = require( './UIBase' );
import { UIBase } from './UIBase';
//O var InputController = require( './Interaction/InputController' );
//N ImportController is exported as an instance
import { inputController } from './Interaction/InputController';
//O var ClickEvent = require( './Interaction/ClickEvent' );
//import { ClickEvent } from './Interaction/ClickEvent';

// base object for all Input type objects
//
// @class
// @extends PIXI.UI.UIBase
// @memberof PIXI.UI
// @param width {number} passed to uibase
// @param height {number} passed to uibase
// @param tabIndex {(PIXI.UI.SliceSprite|PIXI.UI.Sprite)} will be used as background for input
//
//O function InputBase( width, height, tabIndex, tabGroup )
export class InputBase extends UIBase
{
   private _focused: boolean;
   public _useTab: boolean;
   public _usePrev: boolean;
   public _useNext: boolean;

   private context: InputBase;

   protected __down: boolean;

   constructor ( width: number, height: number, tabIndex: number, tabGroup: string )
   {
      //O UIBase.call( this, width, height );
      super( width, height );

      //O var self = this;
      //New Changed self to context for clarity
      this.context = this;
      //O this._focused = false;
      this._focused = false;
      //O this._useTab = this._usePrev = this._useNext = true;
      this._useTab = this._usePrev = this._useNext = true;
      //O this.container.interactive = true;
      this.container.interactive = true;
      //O InputController.registrer( this, tabIndex, tabGroup );
      //N ImportController is exported as an instance
      inputController.registrer( this, tabIndex, tabGroup );

      //O this.container.on( "pointerupoutside", function( e )
      this.container.on( "pointerupoutside", this.pointerUpOutside);

      //O this.container.on( "pointerdown", function( e )
      this.container.on("pointerdown", this.pointerDown);

      //O this.container.on( "pointerup", function( e )
      this.container.on( "pointerup", this.pointerUp );

      this.__down = false;

   }

   //O var keyDownEvent = function( e )
   public keyDownEvent = ( e: KeyboardEvent ): void =>
   {
      //O if ( e.which === 9 )
      if ( e.which === 9 )
      {
         //O if ( self._useTab )
         if ( this.context._useTab )
         {
            //O InputController.fireTab( );
            //N ImportController is exported as an instance
            inputController.fireTab( );
            //O e.preventDefault( );
            e.preventDefault( );
         }
      }
      //O else if ( e.which === 38 )
      else if ( e.which === 38 )
      {
         //O if ( self._usePrev )
         if ( this.context._usePrev )
         {
            //O InputController.firePrev( );
            //N ImportController is exported as an instance
            inputController.firePrev( );
            //O e.preventDefault( );
            e.preventDefault( );
         }
      }
      //O else if ( e.which === 40 )
      else if ( e.which === 40 )
      {
         //O if ( self._useNext )
         if ( this.context._useNext )
         {
            //O InputController.fireNext( );
            //N ImportController is exported as an instance
            inputController.fireNext( );
            //O e.preventDefault( );
            e.preventDefault( );
         }
      }
   };

   //O var documentMouseDown = function( e )
   //N fix  'e' is declared but its value is never read.
   //Hmmm would not even take an optional parameter
   public documentMouseDown = ( ): void =>
   {
      //O if ( !self.__down )
      if ( !this.context.__down )
      {
         //O self.blur( );
         this.context.blur( );
      }
   };

   //O this.container.on( "pointerdown", function( e )
   //N fix  'e' is declared but its value is never read.
   //Hmmm would not even take an optional parameter
   public pointerDown = ( ): void =>
   {
      //O self.focus( );
      this.context.focus( );
      //O self.__down = true;
      this.context.__down = true;
   };

   //O this.container.on( "pointerup", function( e )
   //N fix  'e' is declared but its value is never read.
   //Hmmm would not even take an optional parameter
   public pointerUp = ( ): void =>
   {
      //O self.__down = false;
      this.context.__down = false;
   };

   //O this.container.on( "pointerupoutside", function( e )
   //N fix  'e' is declared but its value is never read.
   //Hmmm would not even take an optional parameter
   public pointerUpOutside = ( ): void =>
   {
      //O self.__down = false;
      this.context.__down = false;
   };

   //O //var cancelFocusEvent = new ClickEvent(this.stage)

   //O this._bindEvents = function( )
   public _bindEvents = ( ): void =>
   {
      //O if ( this.stage !== null )
      if ( this.stage !== null )
      {
         //O this.stage.on( "pointerdown", documentMouseDown );
         this.stage.on( "pointerdown", this.documentMouseDown );
         //O document.addEventListener( "keydown", keyDownEvent );
         document.addEventListener( "keydown", this.keyDownEvent );
      }
   };

   //O this._clearEvents = function( )
   public _clearEvents = ( ) =>
   {
      //O if ( this.stage !== null )
      if ( this.stage !== null )
      {
         //O this.stage.off( "pointerdown", documentMouseDown );
         this.stage.off( "pointerdown", this.documentMouseDown );
         //O document.removeEventListener( "keydown", keyDownEvent );
         document.removeEventListener( "keydown", this.keyDownEvent );
      }
   };

   //O InputBase.prototype.focus = function ()
   public focus = ( ) :void =>
   {
      //O if ( !this._focused )
      if ( !this._focused )
      {
         //O this._focused = true;
         this._focused = true;
         //O this._bindEvents( );
         this._bindEvents( );
         //O InputController.set( this );
         //N ImportController is exported as an instance
         inputController.set( this );
         //O this.emit( "focusChanged", true );
         this.emit( "focusChanged", true );
         //O this.emit( "focus" );
         this.emit( "focus" );

      }
   }

   //O InputBase.prototype.blur = function( )
   public blur = ( ): void =>
   {
      //O if ( this._focused )
      if ( this._focused )
      {
         //O InputController.clear( );
         //N ImportController is exported as an instance
         inputController.clear( );
         //O this._focused = false;
         this._focused = false;
         //O this._clearEvents( );
         this._clearEvents( );
         //O this.emit( "focusChanged", false );
         this.emit( "focusChanged", false );
         //O this.emit( "blur" );
         this.emit( "blur" );

      }
   };
}

//O InputBase.prototype = Object.create( UIBase.prototype );
//O InputBase.prototype.constructor = InputBase;
//O module.exports = InputBase;

//O InputBase.prototype.focus = function( )

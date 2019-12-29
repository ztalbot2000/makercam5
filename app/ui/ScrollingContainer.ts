import * as PIXI from 'pixi.js';

//O var UIBase = require( './UIBase' );
import { UIBase } from './UIBase';
//O var Container = require( './Container' );
import { Container } from './Container';
//O var Helpers = require( './Helpers' );
import { Helpers } from './Helpers';
//O var Ticker = require( './Ticker' );
//N No brackets, imports the default created Ticker Instance from new.
import Ticker from './Ticker';
//O var DragEvent = require( './Interaction/DragEvent' );
import { DragEvent } from './Interaction/DragEvent';
//O var MouseScrollEvent = require( './Interaction/MouseScrollEvent' );
import { MouseScrollEvent } from './Interaction/MouseScrollEvent';

//N ScrollBar was not previously required
import { ScrollBar } from './ScrollBar';

interface INameToValueMap
{
    [key: string]: any;
}

type Direction = 'x' | 'y';
//
// An UI Container object with expandMask hidden and possibility to enable scrolling
//
// @class
// @extends PIXI.UI.UIBase
// @memberof PIXI.UI
// @param [options.scrollX=false] {Boolean} Enable horizontal scrolling
// @param [options.scrollY=false] {Boolean} Enable vertical scrolling
// @param [options.dragScrolling=true] {Boolean} Enable mousedrag scrolling
// @param [options.softness=0.5] {Number} (0-1) softness of scrolling
// @param [options.width=0] {Number|String} container width
// @param [options.height=0] {Number} container height
// @param [options.radius=0] {Number} corner radius of clipping mask
// @param [options.expandMask=0] {Number} mask expand (px)
// @param [options.overflowY=0] {Number} how much can be scrolled past content dimensions
// @param [options.overflowX=0] {Number} how much can be scrolled past content dimensions
//
//O function ScrollingContainer( options )
export class ScrollingContainer extends Container
{
   //O options = options || {};
   options:  INameToValueMap;
   //O this.mask = new PIXI.Graphics( );
   private mask: PIXI.Graphics;
   //O this.innerContainer = new PIXI.Container( );
   public innerContainer: PIXI.Container;
   //O this.innerBounds = new PIXI.Rectangle( );
   private innerBounds: PIXI.Rectangle;
   //O this.scrollX = options.scrollX !== undefined ? options.scrollX : false;
   private scrollX: string | boolean;
   //O this.scrollY = options.scrollY !== undefined ? options.scrollY : true;
   private scrollY: string | boolean;
   //O this.dragScrolling = options.dragScrolling !== undefined ? options.dragScrolling : true;
   private dragScrolling: string | boolean;
   //O this.softness = options.softness !== undefined ? Math.max( Math.min( options.softness || 0, 1 ), 0 ) : 0.5;
   private softness:  number;
   //O this.radius = options.radius || 0;
   private radius: number;
   //O this.expandMask = options.expandMask || 0;
   private expandMask: number;
   //O this.overflowY = options.overflowY || 0;
   //NC used by textInout
   protected overflowY: number;
   //O this.overflowX = options.overflowX || 0;
   //NC used by textInout
   protected overflowX: number;

   //O this.animating = false;
   private animating: boolean;
   //O this.scrolling = false;
   private scrolling: boolean;
   //O this._scrollBars = [ ];
   public _scrollBars: Array<ScrollBar>;

   //O this.boundCached = performance.now( ) - 1000;
   private boundCached = performance.now( ) - 1000;

   //NC Used but not defined
   //In base class private containerStart: PIXI.Point;
   private targetPosition: PIXI.Point;
   private lastPosition: PIXI.Point;
   private Position: PIXI.Point;
   private Speed: PIXI.Point;
   private scrollSpeed: PIXI.Point;
   private stop: boolean;
   private scroll: MouseScrollEvent;
   private _lastWidth: number;
   private _lastHeight: number;

   //NC Keep track of drag event
   protected _dragEventID: number;
   protected _scrollEventID: number;
   protected innerContainerScrolling: PIXI.Container;

   //New Changed self to context for clarity
   protected context: ScrollingContainer;


   constructor( options: INameToValueMap )
   {
      //O Container.call( this, options.width, options.height );
      super( options.width, options.height );

      //O options = options || {};
      this.options = options || {};
      //O this.mask = new PIXI.Graphics( );
      this.mask = new PIXI.Graphics( );
      //O this.innerContainer = new PIXI.Container( );
      this.innerContainer = new PIXI.Container( );
      //O this.innerBounds = new PIXI.Rectangle( );
      this.innerBounds = new PIXI.Rectangle( );
      //O this.container.addChild( this.mask );
      this.container.addChild( this.mask );
      //O this.container.addChild( this.innerContainer );
      this.container.addChild( this.innerContainer );
      //O this.container.mask = this.mask;
      this.container.mask = this.mask;
      //O this.scrollX = options.scrollX !== undefined ? options.scrollX : false;
      this.scrollX = options.scrollX !== undefined ? options.scrollX : false;
      //O this.scrollY = options.scrollY !== undefined ? options.scrollY : true;
      this.scrollY = options.scrollY !== undefined ? options.scrollY : true;
      //O this.dragScrolling = options.dragScrolling !== undefined ? options.dragScrolling : true;
      this.dragScrolling = options.dragScrolling !== undefined ? options.dragScrolling : true;
      //O this.softness = options.softness !== undefined ? Math.max( Math.min( options.softness || 0, 1 ), 0 ) : 0.5;
      this.softness = options.softness !== undefined ? Math.max( Math.min( options.softness || 0, 1 ), 0 ) : 0.5;
      //O this.radius = options.radius || 0;
      this.radius = options.radius || 0;
      //O this.expandMask = options.expandMask || 0;
      this.expandMask = options.expandMask || 0;
      //O this.overflowY = options.overflowY || 0;
      this.overflowY = options.overflowY || 0;
      //O this.overflowX = options.overflowX || 0;
      this.overflowX = options.overflowX || 0;

      //O this.animating = false;
      this.animating = false;
      //O this.scrolling = false;
      this.scrolling = false;
      //O this._scrollBars = [ ];
      this._scrollBars = [ ];

      this._lastWidth = this.width;
      this._lastHeight = this.height;
      //O this.boundCached = performance.now( ) - 1000;
      this.boundCached = performance.now( ) - 1000;
   }

   //O ScrollingContainer.prototype.initialize = function( )
   public initialize = ( ): void =>
   {
      //O Container.prototype.initialize.apply( this );
      Container.prototype.initialize.apply( this );
      //O if ( this.scrollX || this.scrollY )
      if ( this.scrollX || this.scrollY )
      {
         //O this.initScrolling( );
         this.initScrolling( );
      }
   };

   //O ScrollingContainer.prototype.update = function( )
   public update = ( ): void =>
   {
      //O Container.prototype.update.apply( this );
      Container.prototype.update.apply( this );
      //O if ( this._lastWidth != this._width || this._lastHeight != this._height )
      if ( this._lastWidth != this._width || this._lastHeight != this._height )
      {
         //O var of = this.expandMask;
         let of = this.expandMask;
         //O this.mask.clear( );
         this.mask.clear( );
         //O this.mask.lineStyle( 0 );
         this.mask.lineStyle( 0 );
         //O this.mask.beginFill( 0xFFFFFF, 1 );
         this.mask.beginFill( 0xFFFFFF, 1 );
         //O if ( this.radius === 0 )
         if ( this.radius === 0 )
         {

            //O //this.mask.drawRect(0, 0, this._width, this._height);
            //O //this.mask.drawRect(-of, -of, this._width + of, this.height + of);
            //O //this.mask.moveTo(-of, -of);
            //O //this.mask.lineTo(this._width + of, -of);
            //O //this.mask.lineTo(this._width + of, this._height + of);
            //O //this.mask.lineTo(-of, this._height + of);
            //O this.mask.drawRect( - of , - of , this._width + of , this._height + of );
            this.mask.drawRect( - of , - of , this._width + of , this._height + of );
         }
         //O else
         else
         {
            //O this.mask.drawRoundedRect( - of , - of , this._width + of , this.height + of , this.radius );
            this.mask.drawRoundedRect( - of , - of , this._width + of , this.height + of , this.radius );
         }
         //O this.mask.endFill( );
         this.mask.endFill( );
         //O this._lastWidth = this._width;
         this._lastWidth = this._width;
         //O this._lastHeight = this._height;
         this._lastHeight = this._height;
      }

      //O if ( this.setScrollPosition )
      //Hmmm
      if ( this.setScrollPosition )
      {
         //O this.setScrollPosition( );
         this.setScrollPosition( );
      }
   };

   //O ScrollingContainer.prototype.addChild = function( UIObject )
   //NC Typescript or maybe me, cannot figure out how not to extend this
   // @ts-ignore
   addChild<TChildren extends UIBase[]>(...children: TChildren): TChildren[0]
   {
      //O var argumentLenght = arguments.length;
      let argumentsLength = children.length;
      //O if ( argumentsLength > 1 )
      if ( argumentsLength > 1 )
      {
         //O for ( var i = 0; i < argumentsLength; i++ )
         for ( var i = 0; i < argumentsLength; i++ )
         {
            //O this.addChild( arguments[ i ] );
            this.addChild( children[ i ] );
         }
      }
      //O else
      else
      {
         let child = children[0];

         //O Container.prototype.addChild.call( this, UIObject );
         Container.prototype.addChild.call( this, child );
         //O this.innerContainer.addChild( UIObject.container );
         this.innerContainer.addChild( child.container );
         //O this.getInnerBounds( true );                          //make sure bounds is updated instantly when a child is added
         this.getInnerBounds( true );                          //make sure bounds is updated instantly when a child is added
      }
      //O return UIObject;
      return children[0];
   };

   //O ScrollingContainer.prototype.updateScrollBars = function( )
   public updateScrollBars = ( ): void =>
   {
      //O for ( var i = 0; i < this._scrollBars.length; i++ )
      for ( var i = 0; i < this._scrollBars.length; i++ )
      {
         //O this._scrollBars[ i ].alignToContainer( );
         this._scrollBars[ i ].alignToContainer( );
      }
   };

   //O ScrollingContainer.prototype.getInnerBounds = function( force )
   public getInnerBounds = ( force?: boolean ): PIXI.Rectangle =>
   {
      //O this is a temporary fix, because we cant rely on innercontainer height if the children is positioned > 0 y.
      //O if ( force || performance.now( ) - this.boundCached > 1000 )
      if ( force || performance.now( ) - this.boundCached > 1000 )
      {
         //O this.innerContainer.getLocalBounds( this.innerBounds );
         this.innerContainer.getLocalBounds( this.innerBounds );
         //O this.innerContainer.getLocalBounds( this.innerBounds );
         this.innerContainer.getLocalBounds( this.innerBounds );
         //O this.innerBounds.height = this.innerBounds.y + this.innerContainer.height;
         this.innerBounds.height = this.innerBounds.y + this.innerContainer.height;
         //O this.innerBounds.width = this.innerBounds.x + this.innerContainer.width;
         this.innerBounds.width = this.innerBounds.x + this.innerContainer.width;
         //O this.boundCached = performance.now( );
         this.boundCached = performance.now( );
      }

      //O return this.innerBounds;
      return this.innerBounds;
   };

   //O ScrollingContainer.prototype.initScrolling = function( )
   public initScrolling = ( ): void =>
   {
      //O var container = this.innerContainer;
      this.innerContainerScrolling = this.innerContainer;

      //O var containerStart = new PIXI.Point( );
      this.containerStart = new PIXI.Point( );
      //O var targetPosition = new PIXI.Point( );
      this.targetPosition = new PIXI.Point( );
      //O var lastPosition = new PIXI.Point( );
      this.lastPosition = new PIXI.Point( );
      //O var Position = new PIXI.Point( );
      this.Position = new PIXI.Point( );
      //O var Speed = new PIXI.Point( );
      this.Speed = new PIXI.Point( );
      //O var stop;
      this.stop = false;
      //O var self = this;
      this.context = this;

      //O this.forcePctPosition = function( direction, pct )

      //O this.focusPosition = function( pos )

      //O this.setScrollPosition = function( speed )

      //O this.updateScrollPosition = function( delta )

      //O this.updateDirection = function( direction, delta )

      //O Drag scroll
      //O if ( this.dragScrolling )
      if ( this.dragScrolling )
      {
         //O var drag = new DragEvent( this );
         let drag = new DragEvent( this );
         //O drag.onDragStart = function( e )
         drag.onDragStart = this.dragOnDragStart;

         //O drag.onDragMove = function( e, offset )
         drag.onDragMove = this.dragOnDragMove;

         //O drag.onDragEnd = function( e )
         drag.onDragEnd = this.dragOnDragEnd;
      }

      //O Mouse scroll
      //O var scrollSpeed = new PIXI.Point( );
      this.scrollSpeed = new PIXI.Point( );
      //O var scroll = new MouseScrollEvent( this, true );
      this.scroll = new MouseScrollEvent( this, true );

      //O scroll.onMouseScroll = function( e, delta )
      this.scroll.onMouseScroll = this.onMouseScroll;

      //O self.updateScrollBars( );
      this.context.updateScrollBars( );
   }

   //O this.forcePctPosition = function( direction, pct )
   //NC Used by TextInput
   public forcePctPosition = ( direction: Direction, pct: number ): void =>
   {
      //O var bounds = this.getInnerBounds( );
      let bounds = this.getInnerBounds( );

      //O if ( this.scrollX && direction == "x" )
      if ( this.scrollX && direction == "x" )
      {
         //O container.position[ direction ] = -( ( bounds.width - this._width ) * pct );
         this.innerContainerScrolling.position.x = -( ( bounds.width - this._width ) * pct );
      }
      //O if ( this.scrollY && direction == "y" )
      if ( this.scrollY && direction == "y" )
      {
         //O container.position[ direction ] = -( ( bounds.height - this._height ) * pct );
         this.innerContainerScrolling.position.y = -( ( bounds.height - this._height ) * pct );

      }
      //O Position[ direction ] = targetPosition[ direction ] = container.position[ direction ];
      this.Position[ direction ] = this.targetPosition[ direction ] = this.innerContainerScrolling.position[ direction ];
   };

   //O this.focusPosition = function( pos )
   //NC Used by TextInput
   public focusPosition = ( pos: PIXI.Point ): void =>
   {
      //O var bounds = this.getInnerBounds( );
      let bounds = this.getInnerBounds( );

      //O var dif;
      let dif;
      //O if ( this.scrollX )
      if ( this.scrollX )
      {
         //O var x = Math.max( 0, ( Math.min( bounds.width, pos.x ) ) );
         let x = Math.max( 0, ( Math.min( bounds.width, pos.x ) ) );
         //O if ( x + container.x > this._width )
         if ( x + this.innerContainerScrolling.x > this._width )
         {
            //O dif = x - this._width;
            dif = x - this._width;
            //O container.x = -dif;
            this.innerContainerScrolling.x = -dif;
         }
         //O else if ( x + container.x < 0 )
         else if ( x + this.innerContainerScrolling.x < 0 )
         {
            //O dif = x + container.x;
            dif = x + this.innerContainerScrolling.x;
            //O container.x -= dif;
            this.innerContainerScrolling.x -= dif;
         }
      }

      //O if ( this.scrollY )
      if ( this.scrollY )
      {
         //O var y = Math.max( 0, ( Math.min( bounds.height, pos.y ) ) );
         let y = Math.max( 0, ( Math.min( bounds.height, pos.y ) ) );

         //O if ( y + container.y > this._height )
         if ( y + this.innerContainerScrolling.y > this._height )
         {
            //O dif = y - this._height;
            dif = y - this._height;
            //O container.y = -dif;
            this.innerContainerScrolling.y = -dif;
         }
         //O else if ( y + container.y < 0 )
         else if ( y + this.innerContainerScrolling.y < 0 )
         {
            //O dif = y + container.y;
            dif = y + this.innerContainerScrolling.y;
            //O container.y -= dif;
            this.innerContainerScrolling.y -= dif;
         }
      }

      //O lastPosition.copy( container.position );
      //NC Point.copy is deprecated, use copyFrom
      this.lastPosition.copyFrom( this.innerContainerScrolling.position );
      //O targetPosition.copy( container.position );
      //NC Point.copy is deprecated, use copyFrom
      this.targetPosition.copyFrom( this.innerContainerScrolling.position );
      //O Position.copy( container.position );
      //NC Point.copy is deprecated, use copyFrom
      this.Position.copyFrom( this.innerContainerScrolling.position );
      //O this.updateScrollBars( );
      this.updateScrollBars( );

   };

   //O this.setScrollPosition = function( speed )
   public setScrollPosition = ( speed?: PIXI.Point ): void =>
   {
      //O if ( speed )
      if ( speed )
      {
         //O Speed = speed;
         this.Speed = speed;
      }

      //O if ( !this.animating )
      if ( !this.animating )
      {
         //O this.animating = true;
         this.animating = true;
         //O lastPosition.copy( container.position );
         //NC Point.copy is deprecated, use copyFrom
         this.lastPosition.copyFrom( this.innerContainerScrolling.position );
         //O targetPosition.copy( container.position );
         //NC Point.copy is deprecated, use copyFrom
         this.targetPosition.copyFrom( this.innerContainerScrolling.position );
         //O Ticker.on( "update", this.updateScrollPosition, this );
         Ticker.on( "update", this.updateScrollPosition, this );
      }
   };

   //O this.updateScrollPosition = function( delta )
   public updateScrollPosition = ( delta: number ): void =>
   {
      //O stop = true;
      this.stop = true;
      //O if ( this.scrollX ) this.updateDirection( "x", delta );
      if ( this.scrollX ) this.updateDirection( "x", delta );
      //O if ( this.scrollY ) this.updateDirection( "y", delta );
      if ( this.scrollY ) this.updateDirection( "y", delta );
      //O if ( stop )
      if ( this.stop )
      {
         //O Ticker.removeListener( "update", this.updateScrollPosition );
         Ticker.removeListener( "update", this.updateScrollPosition );
         //O this.animating = false;
         this.animating = false;
      }
   };

   //O this.updateDirection = function( direction, delta )
   public updateDirection = ( direction: Direction, delta: number ): void =>
   {
      //O var bounds = this.getInnerBounds( );
      let bounds = this.getInnerBounds( );

      //O var min;
      let min: number = 0;
      //O if ( direction == "y" )
      if ( direction == "y" )
      {
         //O min = Math.round( Math.min( 0, this._height - bounds.height ) );
         min = Math.round( Math.min( 0, this._height - bounds.height ) );
      }
      //O else
      else
      {
         //O min = Math.round( Math.min( 0, this._width - bounds.width ) );
         min = Math.round( Math.min( 0, this._width - bounds.width ) );
      }

      //O if ( !this.scrolling && Math.round( Speed[ direction ] ) !== 0 )
      if ( !this.scrolling && Math.round( this.Speed[ direction ] ) !== 0 )
      {
         //O targetPosition[ direction ] += Speed[ direction ];
         this.targetPosition[ direction ] += this.Speed[ direction ];
         //O Speed[ direction ] = Helpers.Lerp( this.Speed[ direction ], 0, ( 5 + 2.5 / Math.max( this.softness, 0.01 ) ) * delta );
         this.Speed[ direction ] = Helpers.Lerp( this.Speed[ direction ], 0, ( 5 + 2.5 / Math.max( this.softness, 0.01 ) ) * delta );

         //O if ( targetPosition[ direction ] > 0 )
         if ( this.targetPosition[ direction ] > 0 )
         {
            //O targetPosition[ direction ] = 0;
            this.targetPosition[ direction ] = 0;

         }
         //O else if ( targetPosition[ direction ] < min )
         else if ( this.targetPosition[ direction ] < min )
         {
            //O targetPosition[ direction ] = min;
            this.targetPosition[ direction ] = min;

         }
      }

      //O if ( !this.scrolling && Math.round( Speed[ direction ] ) === 0 && ( container[ direction ] > 0 || container[ direction ] < min ) )
      if ( !this.scrolling && Math.round( this.Speed[ direction ] ) === 0 && ( this.innerContainerScrolling[ direction ] > 0 || this.innerContainerScrolling[ direction ] < min ) )
      {
         //O var target = Position[ direction ] > 0 ? 0 : min;
         let target = this.Position[ direction ] > 0 ? 0 : min;
         //O Position[ direction ] = Helpers.Lerp( Position[ direction ], target, ( 40 - ( 30 * this.softness ) ) * delta );
         this.Position[ direction ] = Helpers.Lerp( this.Position[ direction ], target, ( 40 - ( 30 * this.softness ) ) * delta );
         //O stop = false;
         this.stop = false;
      }
      //O else if ( this.scrolling || Math.round( Speed[ direction ] ) !== 0 )
      else if ( this.scrolling || Math.round( this.Speed[ direction ] ) !== 0 )
      {

         //O if ( this.scrolling )
         if ( this.scrolling )
         {
            //O Speed[ direction ] = Position[ direction ] - lastPosition[ direction ];
            this.Speed[ direction ] = this.Position[ direction ] - this.lastPosition[ direction ];
            //O lastPosition.copy( Position );
            //NC Point.copy is deprecated, use copyFrom
            this.lastPosition.copyFrom( this.Position );
         }
         //O if ( targetPosition[ direction ] > 0 )
         if ( this.targetPosition[ direction ] > 0 )
         {
            //O Speed[ direction ] = 0;
            this.Speed[ direction ] = 0;
            //O Position[ direction ] = 100 * this.softness * ( 1 - Math.exp( targetPosition[ direction ] / -200 ) );
            this.Position[ direction ] = 100 * this.softness * ( 1 - Math.exp( this.targetPosition[ direction ] / -200 ) );
         }
         //O else if ( targetPosition[ direction ] < min )
         else if ( this.targetPosition[ direction ] < min )
         {
            //O Speed[ direction ] = 0;
            this.Speed[ direction ] = 0;
            //O Position[ direction ] = min - ( 100 * this.softness * ( 1 - Math.exp( ( min - targetPosition[ direction ] ) / -200 ) ) );
            this.Position[ direction ] = min - ( 100 * this.softness * ( 1 - Math.exp( ( min - this.targetPosition[ direction ] ) / -200 ) ) );
         }
         //O else
         else
         {
            //O Position[ direction ] = targetPosition[ direction ];
            this.Position[ direction ] = this.targetPosition[ direction ];
         }
         //O stop = false;
         this.stop = false;
      }

      //O container.position[ direction ] = Math.round( Position[ direction ] );
      this.innerContainerScrolling.position[ direction ] = Math.round( this.Position[ direction ] );

      //O self.updateScrollBars( );
      this.context.updateScrollBars( );

   };

   public onMouseScroll(e: PIXI.interaction.InteractionEvent, delta: PIXI.Point)
   {
      //NC Solves event parameter not being read
      this._scrollEventID =  e.data.identifier;

      //O scrollSpeed.set( -delta.x * 0.2, -delta.y * 0.2 );
      this.scrollSpeed.set( -delta.x * 0.2, -delta.y * 0.2 );
      //O this.setScrollPosition( scrollSpeed );
      this.setScrollPosition( this.scrollSpeed );
   };

   public dragOnDragStart = ( e: PIXI.interaction.InteractionEvent ): void =>
   {
      //O if ( !this.scrolling )
      if ( !this.scrolling )
      {
         //NC Solves event parameter not being read
         this._dragEventID =  e.data.identifier;

         //O containerStart.copy( container.position );
         //NC Point.copy is deprecated, use copyFrom
         this.containerStart.copyFrom( this.innerContainerScrolling.position );
         //O Position.copy( container.position );
         //NC Point.copy is deprecated, use copyFrom
         this.Position.copyFrom( this.innerContainerScrolling.position );
         //O this.scrolling = true;
         this.scrolling = true;
         //O this.setScrollPosition( );
         this.setScrollPosition( );
         //O self.emit( "dragStart", e );
         this.context.emit( "dragStart", e );
      }
   }

   public dragOnDragEnd = (e: PIXI.interaction.InteractionEvent): void =>
   {
      //O if ( this.scrolling )
      if ( this.scrolling )
      {
         //NC Solves event parameter not being read and then
         //    offset required to be second parameter
         if ( e.data.identifier !== this._dragEventID )
         {
            return;
         }

         //O this.scrolling = false;
         this.scrolling = false;
         //O self.emit( "dragEnd", e );
         this.context.emit( "dragEnd", e );
      }
   };

   //O dragOnDragMove = function ( e, offset)
   public dragOnDragMove = ( e: PIXI.interaction.InteractionEvent, offset: PIXI.Point ): void =>
   {
      //NC Solves event parameter not being read and then
      //    offset required to be second parameter
      if ( e.data.identifier !== this._dragEventID )
      {
         return;
      }

      //O if ( this.scrollX )
      if ( this.scrollX )
      {
         //O targetPosition.x = containerStart.x + offset.x;
         this.targetPosition.x = this.containerStart.x + offset.x;
      }
      //O if ( this.scrollY )
      if ( this.scrollY )
      {
         //O targetPosition.y = containerStart.y + offset.y;
         this.targetPosition.y = this.containerStart.y + offset.y;
      }
   };
};

//O ScrollingContainer.prototype = Object.create( Container.prototype );
//O ScrollingContainer.prototype.constructor = ScrollingContainer;
//O module.exports = ScrollingContainer;

//O ScrollingContainer.prototype.initialize = function( )

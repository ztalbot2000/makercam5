// var UIBase = require( './UIBase' );
import { UIBase }  from './UIBase';
import * as PIXI from 'pixi.js';

//
// A Stage for UIObjects
//
// @class
// @extends PIXI.UI.Container
// @memberof PIXI.UI
// @param width {Number} Width of the Stage
// @param height {Number} Height of the Stage
//
//O function Stage( width, height )
export class Stage extends PIXI.Container
{
   //O this.__width = width;
   private __width: number;
   //O this.__height = height;
   private __height: number;
   //O this.minWidth = 0;
   private minWidth: number;
   //O this.minHeight = 0;
   private minHeight: number;

   //O this.UIChildren = [ ];
   private UIChildren: Array<UIBase>;
   //O this.stage = this;
   public stage: Stage;
   //O this.interactive = true;
   //New unused in project
   //public interactive: boolean;
   //O this.hitArea = new PIXI.Rectangle( 0, 0, 0, 0 );
   public hitArea: PIXI.Rectangle;
   //O this.initialized = true;
   //New unused in project
   //private initialized: boolean;


   constructor( width: number, height: number )
   {

      //O PIXI.Container.call( this );
      super();

      //O this.__width = width;
      this.__width = width;
      //O this.__height = height;
      this.__height = height;
      //O this.minWidth = 0;
      this.minWidth = 0;
      //O this.minHeight = 0;
      this.minHeight = 0;

      //O this.UIChildren = [ ];
      this.UIChildren = [ ];
      //O this.stage = this;
      this.stage = this;
      //O this.interactive = true;
      //New unused in project
      //this.interactive = true;
      //O this.hitArea = new PIXI.Rectangle( 0, 0, 0, 0 );
      this.hitArea = new PIXI.Rectangle( 0, 0, 0, 0 );
      //O this.initialized = true;
      //New unused in project
      //this.initialized = true;
      //O this.resize( width, height );
      this.resize( width, height );

      //N referenced within (set but not used)
      this.scale.x=1;
      this.scale.y=1;
   }


   //O Stage.prototype.addChild = function( UIObject )
   //N Typescript or maybe me, cannot figure out how not to extend this
   // @ts-ignore
   addChild<TChildren extends UIBase[]>(...children: TChildren): TChildren[0]
   {
      //O var argumentLenght = arguments.length;
      let argumentsLength = children.length;
      //O if ( argumentLenght > 1 )
      if ( argumentsLength > 1 )
      {
         //O for ( var i = 0; i < argumentLenght; i++ )
         for ( let i = 0; i < argumentsLength; i++ )
         {
            //O this.addChild( arguments[ i ] );
            this.addChild( children[ i ] );
         }
      }
      //O else
      else
      {
         //N For proper typing
         let child = children[0];

         //O if ( UIObject.parent !== null )
         if ( child.parent !== null )
         {
            //O UIObject.parent.removeChild( UIObject );
            child.parent.removeChild( child );
         }

         //O UIObject.parent = this;
         //N parent is readonly and should be set using the accessor.
         //child.setParent(this as PIXI.Container);
         //N parent of UIBase is supposed to be UIBase
         // @ts-ignore
         child.parent = this;
         //O this.UIChildren.push( UIObject );
         this.UIChildren.push( child );
         //O PIXI.Container.prototype.addChild.call( this, UIObject.container );
         super.addChild( child.container );
         //O UIObject.updatesettings( true );


         child.updatesettings( true );
      }

      return children[0];
   };

   //O Stage.prototype.removeChild = function( UIObject )
   //N Typescript or maybe me, cannot figure out how not to extend this
   // @ts-ignore
   public removeChild<TChildren extends UIBase[]>(...children: TChildren): TChildren[0]
   {
      //O var argumentLenght = arguments.length;
      let argumentsLength = children.length;
      //O if ( argumentLenght > 1 )
      if ( argumentsLength > 1 )
      {
         //O for ( var i = 0; i < argumentLenght; i++ )
         for ( let i = 0; i < argumentsLength; i++ )
         {
            //O this.removeChild( arguments[ i ] );
            this.removeChild( children[ i ] );
         }
      }
      else
      {
         //N For proper typing
         let child = children[0];

         //O PIXI.Container.prototype.removeChild.call( this, UIObject.container );
         super.removeChild( child.container as PIXI.Container );

         //O var index = this.UIChildren.indexOf( UIObject );
         let index = this.UIChildren.indexOf( child );
         //O if ( index != -1 )
         if ( index != -1 )
         {
            //O this.UIChildren.splice( index, 1 );
            this.UIChildren.splice( index, 1 );
            //O UIObject.parent = null;
            //N parent is readonly and should be set using the accessor.
            //child.setParent(null);
            child.parent = null;
         }
      }
      return children[0];
   };

   //O Stage.prototype.resize = function( width, height )
   public resize = ( width?: number | string , height?: number | string  ): void =>
   {
      //O if ( !isNaN( height ) )
      if ( typeof height === 'number' )
      {
         //O this.__height = height;
         this.__height = height;
      }
      //O if ( !isNaN( width ) )
      if ( typeof width === 'number' )
      {
         //O this.__width = width;
         this.__width = width;
      }

      //O if ( this.minWidth || this.minHeight )
      if ( this.minWidth || this.minHeight )
      {
         //O var rx = 1,
         let rx = 1;
         //O ry = 1;
         let ry = 1;

         //O if ( width && width < this.minWidth )
         if ( width && typeof width === 'number' && width < this.minWidth )
         {
            //O rx = this.minWidth / width;
            rx = this.minWidth / width;
         }

         //O if ( height && height < this.minHeight )
         if ( height && typeof height === 'number' && height < this.minHeight )
         {
            //O ry = this.minHeight / height;
            ry = this.minHeight / height;
         }

         //O if ( rx > ry && rx > 1 )
         if ( rx > 1 )
         {
            //O this.scale.set( 1 / rx );
            this.scale.x = ( 1 / rx );
            //O this.__height *= rx;
            //O this.__width *= rx;
            this.__width *= rx;
         }
         //O else if ( ry > 1 )
         if ( ry > 1 )
         {
            //O this.scale.set( 1 / ry );
            this.scale.y = ( 1 / ry );
            //O this.__width *= ry;
            //this.__width *= ry;
            //O this.__height *= ry;
            this.__height *= ry;
         }
         //O else if ( this.scale.x !== 1 )
         if ( this.scale.x < 1 || this.scale.y < 1 )
         {
            //O this.scale.set( 1 );
            this.scale.x = ( 1 );
            this.scale.y = ( 1 );
         }
      }

      //O this.hitArea.width = this.__width;
      this.hitArea.width = this.__width;
      //O this.hitArea.height = this.__height;
      this.hitArea.height = this.__height;

      //O for ( var i = 0; i < this.UIChildren.length; i++ )
      for ( let i = 0; i < this.UIChildren.length; i++ )
      {
         //O this.UIChildren[ i ].updatesettings( true, false );
         this.UIChildren[ i ].updatesettings( true, false );
      }
   }

   //O Object.defineProperties( Stage.prototype,
   //O // _width:
   get _width( ) : number | string   // must have same type
   {
      //O return this.__width;
      return this.__width;
   }
   //O set: function( val )
   set _width( val: number | string )
   {
      //O if ( !isNaN( val ) )
      if ( typeof val === 'number' )
      {
         //O this.__width = val;
         this.__width = val;
         //O this.resize( );
         this.resize( );
      }
   }

   //O // _height:
   get _height( ): number | string
   {
      //O return this.__height;
      return this.__height;
   }
   //O set: function( val )
   set _height( val: number | string )
   {
      //O if ( !isNaN( val ) )
      //N isNaN is not type safe
      if ( typeof val === 'number' )
      {
         //O this.__height = val;
         this.__height = val;
         //O this.resize( );
         this.resize( );
      }
   }
};
//O Stage.prototype = Object.create( PIXI.Container.prototype );
//O Stage.prototype.constructor = Stage;
//O module.exports = Stage;

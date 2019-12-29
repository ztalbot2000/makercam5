//O let Container = require( './Container' );
import { Container } from  './Container';
//O let Tween = require( './Tween' );
//N No brackets, imports the default created Tween Instance from new.
import  Tween from './Tween';

import  { Ease } from './Ease/Ease';

import { UIBase } from './UIBase';

interface INameToValueMap
{
    [key: string]: any;
}

//
// An UI Container object
//
// @class
// @extends PIXI.UI.UIBase
// @memberof PIXI.UI
// @param desc {Boolean} Sort the list descending
// @param tweenTime {Number} if above 0 the sort will be animated
// @param tweenEase {PIXI.UI.Ease} ease method used for animation
//

//O function SortableList( desc, tweenTime, tweenEase )
export class SortableList extends Container
{
   private desc: string | boolean;
   private tweenTime: number;
   private tweenEase: Ease;
   private items:Array<INameToValueMap>;

   //N Defined within, but does not exist on object
   private _sortTimeout: ReturnType<typeof setTimeout>;

   constructor ( desc: string | boolean, tweenTime: number, tweenEase: Ease )
   {
      //O Container.call( this );
      super( );
      //O this.desc = typeof desc !== "undefined" ? desc : false;
      this.desc = typeof desc !== "undefined" ? desc : false;
      //O this.tweenTime = tweenTime || 0;
      this.tweenTime = tweenTime || 0;
      //O this.tweenEase = tweenEase;
      this.tweenEase = tweenEase;
      //O this.items = [ ];
      this.items = [ ];

   }

   // @ts-ignore
   public addChild = ( UIObject: UIBase, fnValue: string, fnThenBy: string ): void =>
   {
      //O Container.prototype.addChild.call( this, UIObject );
      super.addChild( UIObject );
      //O if ( this.items.indexOf( UIObject ) == -1 )
      if ( this.items.indexOf( UIObject ) == -1 )
      {
         //O this.items.push( UIObject );
         this.items.push( UIObject );
      }

      //O if ( typeof fnValue === "function" )
      if ( typeof fnValue === "function" )
      {
         //O UIObject._sortListValue = fnValue;
         UIObject._sortListValue = fnValue;
      }

      //O if ( typeof fnThenBy === "function" )
      if ( typeof fnThenBy === "function" )
      {
         //O UIObject._sortListThenByValue = fnThenBy;
         UIObject._sortListThenByValue = fnThenBy;
      }

      //O if ( !UIObject._sortListRnd )
      if ( !UIObject._sortListRnd )
      {
         //O UIObject._sortListRnd = Math.random( );
         UIObject._sortListRnd = Math.random( );
      }

      //O this.sort( );
      this.sort( );
   };

   //O SortableList.prototype.removeChild = function( UIObject )
   public removeChild<TChildren extends UIBase[]>(...children: TChildren): TChildren[0]
   {
      //O var argumentLenght = arguments.length;
      let argumentsLength = children.length;

      //O if ( arguments.length > 1 )
      if ( argumentsLength > 1 )
      {
         //O for ( let i = 0; i < arguments.length; i++ )
         for ( let i = 0; i < argumentsLength; i++ )
         {
            //O this.removeChild( arguments[ i ] );
            this.removeChild( children[ i ] );
         }
      }
      //O else
      else
      {
         //N For proper typing
         let child = children[0];

         //O Container.prototype.removeChild.call( this, UIObject );
         super.removeChild( child );
         //O let index = this.items.indexOf( UIObject );
         let index = this.items.indexOf( child );
         //O if ( index != -1 )
         if ( index != -1 )
         {
            //O this.items.splice( index, 1 );
            this.items.splice( index, 1 );
         }
         //O this.sort( );
         this.sort( );
      }
      return children[0];
   };

   //O SortableList.prototype.sort = function( instant )
   public sort = ( instant?: number ): void =>
   {
      //O clearTimeout( this._sortTimeout );
      clearTimeout( this._sortTimeout );

      //O if ( instant )
      if ( instant )
      {
         //O this._sort( );
         this._sort( );
         //O return;
         return;
      }

      //O let _this = this;
      let _this = this;
      //O this._sortTimeout = setTimeout( function( )
      this._sortTimeout = setTimeout( function( )
      {
         //O _this._sort( );
         _this._sort( );
      }, 0 );
   };

   //O SortableList.prototype._sort = function( )
   public _sort = ( ): void =>
   {
      //O let self = this,
      let self = this;
      //O desc = this.desc;
      let desc = this.desc;
      //O let y = 0;
      let y = 0;
      //O let alt = true;
      let alt = true;

      //O this.items.sort( function( a, b )
      this.items.sort( function( a, b )
      {
         //O let res = a._sortListValue( ) < b._sortListValue( ) ? desc ? 1 : -1 :
         let res = a._sortListValue( ) < b._sortListValue( ) ? desc ? 1 : -1 :
         //O a._sortListValue( ) > b._sortListValue( ) ? desc ? -1 : 1 : 0;
         a._sortListValue( ) > b._sortListValue( ) ? desc ? -1 : 1 : 0;


         //O if ( res === 0 && a._sortListThenByValue && b._sortListThenByValue )
         if ( res === 0 && a._sortListThenByValue && b._sortListThenByValue )
         {
            //O res = a._sortListThenByValue( ) < b._sortListThenByValue( ) ? desc ? 1 : -1 :
            res = a._sortListThenByValue( ) < b._sortListThenByValue( ) ? desc ? 1 : -1 :
            //O a._sortListThenByValue( ) > b._sortListThenByValue( ) ? desc ? -1 : 1 : 0;
            a._sortListThenByValue( ) > b._sortListThenByValue( ) ? desc ? -1 : 1 : 0;
         }
         //O if ( res === 0 )
         if ( res === 0 )
         {
            //O res = a._sortListRnd > b._sortListRnd ? 1 :
            res = a._sortListRnd > b._sortListRnd ? 1 :
            //O a._sortListRnd < b._sortListRnd ? -1 : 0;
            a._sortListRnd < b._sortListRnd ? -1 : 0;
         }
         //O return res;
         return res;
      } );

      //O for ( let i = 0; i < this.items.length; i++ )
      for ( let i = 0; i < this.items.length; i++ )
      {
         //O let item = this.items[ i ];
         let item = this.items[ i ];

         //O alt = !alt;
         alt = !alt;

         //O if ( this.tweenTime > 0 )
         if ( this.tweenTime > 0 )
         {
            //O Tween.fromTo( item, this.tweenTime,
            Tween.fromTo( item, this.tweenTime,
            {
               //O x: item.x,
               x: item.x,
               //O y: item.y
               y: item.y
            }
            ,
            {
               //O x: 0,
               x: 0,
               //O y: y
               y: y
            }, this.tweenEase );
         }
         //O else
         else
         {
            //O item.x = 0;
            item.x = 0;
            //O item.y = y;
            item.y = y;
         }
         //O y += item.height;
         y += item.height;
         //O if ( typeof item.altering === "function" )
         if ( typeof item.altering === "function" )
         {
            //O item.altering( alt );
            item.altering( alt );
         }
      }

      //O // force it to update parents when sort animation
      //O // is done (prevent scrolling container bug)
      //O if ( this.tweenTime > 0 )
      if ( this.tweenTime > 0 )
      {
         //O setTimeout( function( )
         setTimeout( function( )
         {
            //O self.updatesettings( false, true );
            self.updatesettings( false, true );
         }, this.tweenTime * 1000 );
      }
   }
}
//O SortableList.prototype = Object.create( Container.prototype );
//O SortableList.prototype.constructor = SortableList;
//O module.exports = SortableList;
//O SortableList.prototype.addChild = function( UIObject, fnValue, fnThenBy )

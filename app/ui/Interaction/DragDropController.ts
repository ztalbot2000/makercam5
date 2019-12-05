//New
import * as PIXI from 'pixi.js';

//O var DragDropController =
var DragDropController =
class DragDropController
{
   //O var _items = [ ];
   private  _items: Array<any>;

   constructor()
   {
      //O var _items = [ ];
      this._items = [ ];
   }

   //O add: function( item, event )
   public add = ( item: any, event: PIXI.interaction.InteractionEvent ): boolean =>
   {
      //O item._dragDropEventId = event.data.identifier;
      item._dragDropEventId = event.data.identifier;
      //O if ( this._items.indexOf( item ) === -1 )
      if ( this._items.indexOf( item ) === -1 )
      {
         //O _items.push( item );
         this._items.push( item );
         //O return true;
         return true;
      }
      //O return false;
      return false;
   }

   //O getItem: function( object )
   public getItem = ( obj: object ) =>
   {
      //O var item = null,
      let item = null;
      //O index;
      let index = null;
      //O for ( var i = 0; i < _items.length; i++ )
      for ( let i = 0; i < this._items.length; i++ )
      {
         //O if ( _items[ i ] === obj )
         if ( this._items[ i ] === obj )
         {
            //O item = _items[ i ];
            item = this._items[ i ];
            //O index = i;
            index = i;
            //O break;
            break;
         }
      }

      //O if ( item !== null )
      if ( item !== null )
      {
         //O _items.splice( index, 1 );
         this._items.splice( index, 1 );
         //O return item;
         return item;
      }
      //O else
      else
      {
         //O return false;
         return false;
      }
   }

   //O getEventItem: function( event, group )
   public getEventItem = ( event: PIXI.interaction.InteractionEvent, group: any ) =>
   {
      //O var item = null,
      let item = null;
      //O index, id = event.data.identifier;
      let index = null;
      let id = event.data.identifier;

      //O for ( var i = 0; i < _items.length; i++ )
      for ( let i = 0; i < this._items.length; i++ )
      {
         //O if ( _items[ i ]._dragDropEventId === id )
         if ( this._items[ i ]._dragDropEventId === id )
         {
            //O if ( group !== _items[ i ].dragGroup )
            if ( group !== this._items[ i ].dragGroup )
            {
               //O return false;
               return false;
            }
            //O item = _items[ i ];
            item = this._items[ i ];
            //O index = i;
            index = i;
            //O break;
            break;
         }
      }

      //O if ( item !== null )
      if ( item !== null )
      {
         //O _items.splice( index, 1 );
         this._items.splice( index, 1 );
         //O return item;
         return item;
      }
      //O else
      else
      {
         //O return false;
         return false;
      }
   }
};

//O module.exports = DragDropController;
module.exports = new DragDropController;

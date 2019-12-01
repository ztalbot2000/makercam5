interface INameToValueMap
{
    [key: string]: any;
}

//O var InputController =
class InputController
{
   //O var _currentItem;
   private _currentItem: INameToValueMap;
   //O var tabGroups = {};
   private tabGroups: INameToValueMap;
   //O var checkGroups = {};
   private checkGroups: INameToValueMap;
   //O var checkGroupValues = {};
   private checkGroupValues: INameToValueMap;
   constructor ()
   {
      //O var _currentItem = 0;
      this._currentItem = null;
      //O var tabGroups = {};
      this.tabGroups = {};
      //O var checkGroups = {};
      this.checkGroups = {};
      //O var checkGroupValues = {};
      this.checkGroupValues = {};
   }

   //O registrer: function( item, tabIndex, tabGroup )
   public registrer( item: INameToValueMap, tabIndex: number, tabGroup: string )
   {
      //O var groupName = tabGroup || "default";
      var groupName = tabGroup || "default";

      //O var items = tabGroups[ groupName ];
      var items:any;
      items = this.tabGroups[ groupName ];

      //O if ( !items )
      if ( !items )
      {
         //O items = tabGroups[ groupName ] = [ ];
         items = this.tabGroups[ groupName ] = [ ];
      }

      //O var i = items.indexOf( item );
      let i = items.indexOf( item );
      //O if ( i === -1 )
      if ( i === -1 )
      {
         //O item._tabIndex = tabIndex !== undefined ? tabIndex : -1;
         item._tabIndex = tabIndex !== undefined ? tabIndex : -1;
         //O item._tabGroup = items;
         item._tabGroup = items;
         //O items.push( item );
         items.push( item );
         //O items.sort( function( a, b )
         items.sort( function( a:INameToValueMap, b:INameToValueMap )
         {
            //O if ( a._tabIndex < b._tabIndex )
            if ( a._tabIndex < b._tabIndex )
            {
               //O return -1;
               return -1;
            }
            //O if ( a._tabIndex > b._tabIndex )
            if ( a._tabIndex > b._tabIndex )
            {
               //O return 1;
               return 1;
            }
            //O return 0;
            return 0;
         });
      }
   }

   //O set: function( item )
   public set( item: object )
   {
      //O this.blur( );
      this.blur( );
      //O _currentItem = item;
      this._currentItem = item;
   }

   //O clear: function( )
   public clear( )
   {
      //O _currentItem = undefined;
      this._currentItem = undefined;
   }

   //O blur: function( )
   private blur( )
   {
      //O if ( _currentItem && typeof _currentItem.blur === "function" )
      if ( this._currentItem && typeof this._currentItem.blur === "function" )
      {
         //O _currentItem.blur( );
         this._currentItem.blur( );
      }
   }

   //O fireTab: function( )
   public fireTab( )
   {
      //O if ( _currentItem )
      if ( this._currentItem )
      {
         //O var i = _currentItem._tabGroup.indexOf( _currentItem ) + 1;
         let i = this._currentItem._tabGroup.indexOf( this._currentItem ) + 1;
         //O if ( i >= this._currentItem._tabGroup.length )
         if ( i >= this._currentItem._tabGroup.length )
         {
            //O i = 0;
            i = 0;
         }
         //O _currentItem._tabGroup[ i ].focus( );
         this._currentItem._tabGroup[ i ].focus( );
      }
   }

   //O fireNext: function( )
   public fireNext( )
   {
      //O if ( _currentItem )
      if ( this._currentItem )
      {
         //O var i = _currentItem._tabGroup.indexOf( _currentItem ) + 1;
         var i = this._currentItem._tabGroup.indexOf( this._currentItem ) + 1;
         //O if ( i >= _currentItem._tabGroup.length )
         if ( i >= this._currentItem._tabGroup.length )
         {
            //O i = _currentItem._tabGroup.length - 1;
            i = this._currentItem._tabGroup.length - 1;
         }
         //O _currentItem._tabGroup[ i ].focus( );
         this._currentItem._tabGroup[ i ].focus( );
      }
   }

   //O firePrev: function( )
   public firePrev( )
   {
      //O if ( _currentItem )
      if ( this._currentItem )
      {
         //O var i = _currentItem._tabGroup.indexOf( _currentItem ) - 1;
         let i = this._currentItem._tabGroup.indexOf( this._currentItem ) - 1;
         //O if ( i < 0 )
         if ( i < 0 )
         {
            //O i = 0;
            i = 0;
         }
         //O _currentItem._tabGroup[ i ].focus( );
         this._currentItem._tabGroup[ i ].focus( );
      }
   }

   //O registrerCheckGroup: function( cb )
   public registrerCheckGroup( cb: INameToValueMap )
   {
      //O var name = cb.checkGroup;
      let name = cb.checkGroup;
      //O var group = checkGroups[ name ];
      let group = this.checkGroups[ name ];
      //O if ( !group )
      if ( !group )
      {
         //O group = checkGroups[ name ] = {};
         group = this.checkGroups[ name ] = {};
      }
      //O group[ cb.value ] = cb;
      group[ cb.value ] = cb;

      //O if ( cb.checked )
      if ( cb.checked )
      {
         //O checkGroupValues[ name ] = cb.value;
         this.checkGroupValues[ name ] = cb.value;
      }

   }

   //O updateCheckGroupSelected: function( cb )
   public updateCheckGroupSelected( cb: INameToValueMap )
   {
      //O var group = checkGroups[ cb.checkGroup ];
      let group = this.checkGroups[ cb.checkGroup ];
      //O for ( var val in group )
      for ( var val in group )
      {
         //O var b = group[ val ];
         let b = group[ val ];
         //O if ( b !== cb )
         if ( b !== cb )
            //O b.checked = false;
            b.checked = false;
      }
      //O checkGroupValues[ cb.checkGroup ] = cb.value;
      this.checkGroupValues[ cb.checkGroup ] = cb.value;
   }

   //O getCheckGroupSelectedValue: function( name )
   public getCheckGroupSelectedValue( name: string ): string
   {
      //O if ( checkGroupValues[ name ] )
      if ( this.checkGroupValues[ name ] )
         //O return checkGroupValues[ name ];
         return this.checkGroupValues[ name ];
      //O return "";
      return "";
   }

   //O setCheckGroupSelectedValue: function( name, val )
   public setCheckGroupSelectedValue( name: string, val: number )
   {
      //O var group = checkGroups[ name ];
      let group = this.checkGroups[ name ];
      //O if ( group )
      if ( group )
      {
         //O var cb = group[ val ];
         let cb = group[ val ];
         //O if ( cb )
         if ( cb )
         {
            //O cb.checked = true;
            cb.checked = true;
         }
      }
   }
};

//O module.exports = InputController;
module.exports = new InputController;

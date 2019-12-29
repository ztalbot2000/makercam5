import  { Helpers }  from './Helpers';

import  { EaseBase }  from './Ease/EaseBase';
import  { Ease }  from './Ease/Ease';

interface INameToValueMap
{
    [key: string]: any;
}


//O var _activeTweenObjects = {};
//C activeTweenObjects is used both by Class Tween and Class CallbackItem
//N hmmm always indexed by a number, therefor it is an array;
var _activeTweenObjects:Array<INameToValueMap> = [];

//O var TweenObject = function( object )
class TweenObject
{
   //O this.object = object;
   public object: any;
   //O this.tweens = {};
   public tweens: INameToValueMap;
   //O this.active = false;
   public active: boolean
   //O this.onUpdate = null;
   public onUpdate: Function;

   //New This param is not defined, but should be
   public _tweenObjectId: number;

   //New This param is not defined, but should be. Set by CallbackItem
   public _currentCallbackID: number;

   //N The user provides obj and we turn it into a tweenObject
   constructor( obj: any )
   {
      //O this.object = object;
      this.object = obj;
      //O this.tweens = {};
      this.tweens = {};
      //O this.active = false;
      this.active = false;
      //O this.onUpdate = null;
      this.onUpdate = null;

      //New This param is not defined, but should be
      this._tweenObjectId = undefined;

      //New This param is not defined, but should be. Set by CallbackItem
      this._currentCallbackID= undefined;

   }
};

//O var CallbackItem = function( )
class CallbackItem
{
   //O this._ready = false;
   public _ready: boolean;
   //O this.obj = null;
   private tweenObject: TweenObject;
   //O this.parent = null;
   // Hmmm
   private parent: TweenObject;
   //O this.key = "";
   public key: string;
   //O this.time = 0;
   private time: number;
   //O this.callback = null;
   private callback: Function;
   //O this.currentTime = 0;
   private currentTime: number;


   constructor()
   {
      //O this._ready = false;
      this._ready = false;
      //O this.obj = null;
      this.tweenObject = null;
      //O this.parent = null;
      this.parent = null;
      //O this.key = "";
      this.key = "";
      //O this.time = 0;
      this.time = 0;
      //O this.callback = null;
      this.callback = null;
      //O this.currentTime = 0;
      this.currentTime = 0;

   };

   //O CallbackItem.prototype.remove = function( )
   private remove = (): void =>
   {
      //O this._ready = true;
      this._ready = true;

      //O delete this.parent.tweens[ this.key ];
      delete this.parent.tweens[ this.key ];

      //O if ( !Object.keys( this.parent.tweens ).length )
      if ( !Object.keys( this.parent.tweens ).length )
      {
         //O this.parent.active = false;
         this.parent.active = false;
         //O this.parent.onUpdate = null;
         this.parent.onUpdate = null;
         //O delete _activeTweenObjects[ this.obj._tweenObjectId ];
         delete _activeTweenObjects[ this.tweenObject._tweenObjectId ];
      }
   };

   //O CallbackItem.prototype.set = function( obj, callback, time )
   public set = ( obj:TweenObject, callback: Function , time: number ): void =>
   {
      //O this.obj = obj.object;
      this.tweenObject = obj.object;

      //O if ( !this.obj._currentCallbackID )
      if ( !this.tweenObject._currentCallbackID )
      {
         //O this.obj._currentCallbackID = 1;
         this.tweenObject._currentCallbackID = 1;
      }
      //O else
      else
      {
         //O this.obj._currentCallbackID++;
         this.tweenObject._currentCallbackID++;
      }

      //O this.time = time;
      this.time = time;
      //O this.parent = obj;
      this.parent = obj;
      //O this.callback = callback;
      this.callback = callback;
      //O this._ready = false;
      this._ready = false;
      //O this.key = "cb_" + this.obj._currentCallbackID;
      this.key = "cb_" + this.tweenObject._currentCallbackID;
      //O this.currentTime = 0;
      this.currentTime = 0;

      //O if ( !this.parent.active )
      if ( !this.parent.active )
      {
         //O this.parent.active = true;
         this.parent.active = true;
         //O _activeTweenObjects[ this.obj._tweenObjectId ] = this.parent;
         _activeTweenObjects[ this.tweenObject._tweenObjectId ] = this.parent;
      }
   };

   //O CallbackItem.prototype.update = function( delta )
   public update = ( delta: number ): void =>
   {
      //O this.currentTime += delta;
      this.currentTime += delta;

      //O if ( this.currentTime >= this.time )
      if ( this.currentTime >= this.time )
      {
         //O this.remove( );
         this.remove( );

         //O this.callback.call( this.parent );
         this.callback.call( this.parent );
      }
   };
}

//O var TweenItem = function( )
class TweenItem
{
   //O this._ready = false;
   public _ready: boolean;
   //O this.parent = null;
   //private parent = {};
   private parent: TweenObject;
   //O this.obj = null;
   private obj: any;
   //O this.key = "";
   private key: string;
   //O this.from = 0;
   //N this ia later addressed by this.from.r and this.from.g ...
   private from: any; // This has been referred to as a string/number or {a] ??
   //O this.to = 0;
   private to: any; // This has been referred to as a string/number or {a] ??
   //O this.time = 0;
   private time: number;
   //O this.ease = 0;
   private ease: EaseBase;
   //O this.currentTime = 0;
   private currentTime: number;
   //O this.t = 0;
   private t: number;
   //O this.isColor = false;
   public isColor: boolean;

   //N Added below
   private currentColor: INameToValueMap;

   //O var widthKeys = [ "width", "minWidth", "maxWidth", "anchorLeft", "anchorRight", "left", "right", "x" ];
   private widthKeys:  Array<string>;
   //O var heightKeys = [ "height", "minHeight", "maxHeight", "anchorTop", "anchorBottom", "top", "bottom", "y" ];
   private heightKeys: Array<string>;

   //New surfix does not exist
   //New the fact that getSurface possibly did not return anything makes this a fixMe
   private surfix: string;

   constructor()
   {
      //O this._ready = false;
      this._ready = false;
      //O this.parent = null;
      this.parent = null;
      //O this.obj = null;
      this.obj = null;
      //O this.key = "";
      this.key = "";
      //O this.from = {};
      this.from = {};
      //O this.to = 0;
      this.to = {};
      //O this.time = 0;
      this.time = 0;
      //O this.ease = 0;
      //N ease is an Ease function
      this.ease = null;
      //O this.currentTime = 0;
      this.currentTime = 0;
      //O this.t = 0;
      this.t = 0;
      //O this.isColor = false;
      this.isColor = false;

      //N Added below
      this.currentColor = {};

      //O var widthKeys = [ "width", "minWidth", "maxWidth", "anchorLeft", "anchorRight", "left", "right", "x" ];
      this.widthKeys = [ "width", "minWidth", "maxWidth", "anchorLeft", "anchorRight", "left", "right", "x" ];
      //O var heightKeys = [ "height", "minHeight", "maxHeight", "anchorTop", "anchorBottom", "top", "bottom", "y" ];
      this.heightKeys = [ "height", "minHeight", "maxHeight", "anchorTop", "anchorBottom", "top", "bottom", "y" ];

      //New surfix does not exist
      //New the fact that getSurface possibly did not return anything makes this a fixMe
      this.surfix = "";
   }

   //O function getFromValue( from, to, obj, key )
   public getFromValue = ( from: (number|string), to: (number|string), obj: INameToValueMap, key: string ):number =>
   {
      //O both number
      //O if ( !isNaN( from ) && !isNaN( to ) )
      //New isNaN does not except number|string
      //if ( !isNaN( from ) && !isNaN( to ) )
      if ( typeof from === 'number' && typeof to === 'number')
      {
         //O return from;
         return <number><any>from;
      }

      //O both percentage
      //O if ( isNaN( from ) && isNaN( to ) && from.indexOf( '%' ) !== -1 && to.indexOf( '%' ) !== -1 )
      //New isNaN does not except number|string
      if ( typeof from == 'string' && typeof to === 'string' &&
           from.indexOf( '%' ) !== -1 && to.indexOf( '%' ) !== -1 )
      {
         //O return parseFloat( from.replace( '%', '' ) );
         return parseFloat( from.replace( '%', '' ) );
      }

      //O convert from to px
      //O if ( isNaN( from ) && !isNaN( to ) && from.indexOf( '%' ) !== -1 )
      //New isNaN does not except number|string
      if ( typeof from === 'string' && typeof to === 'number' && from.indexOf( '%' ) !== -1 )
      {
         //O if ( widthKeys.indexOf( key ) !== -1 )
         if ( this.widthKeys.indexOf( key ) !== -1 )
         {
            //O return obj.parent._width * ( parseFloat( from.replace( '%', '' ) ) * 0.01 );
            return obj.parent._width * ( parseFloat( from.replace( '%', '' ) ) * 0.01 );
         }
         //O else if ( heightKeys.indexOf( key ) !== -1 )
         else if ( this.heightKeys.indexOf( key ) !== -1 )
         {
            //O return obj.parent._height * ( parseFloat( from.replace( '%', '' ) ) * 0.01 );
            return obj.parent._height * ( parseFloat( from.replace( '%', '' ) ) * 0.01 );
         }
         //O else
         else
         {
            //O return 0;
            return 0;
         }
      }

      //O convert from to percentage
      //O if ( !isNaN( from ) && isNaN( to ) && to.indexOf( '%' ) !== -1 )
      //New isNaN does not except number|string
      if ( typeof from === 'number'  && typeof to === 'string' && to.indexOf( '%' ) !== -1 )
      {
         //O if ( widthKeys.indexOf( key ) !== -1 )
         if ( this.widthKeys.indexOf( key ) !== -1 )
         {
            //O return from / obj.parent._width * 100;
            return from / obj.parent._width * 100;
         }
         //O else if ( heightKeys.indexOf( key ) !== -1 )
         else if ( this.heightKeys.indexOf( key ) !== -1 )
         {
            //O return from / obj.parent._height * 100;
            return from / obj.parent._height * 100;
         }
         //O else
         else
         {
            //O return 0;
            return 0;
         }
      }
      //O return 0;
      return 0;
   }

   //O function getToValue( to )
   private getToValue = ( to: (number | string ) ): number =>
   {
      //O if ( !isNaN( to ) )
      // if ( !isNaN( to ) )
      //New isNaN does not except number|string
      if (typeof to === 'number')
      {
         //O return to;
         return <number><any> to;
      }

      //O if ( isNaN( to ) && to.indexOf( '%' ) !== -1 )
      //New isNaN does not except number|string
      if ( typeof to === 'string' && to.indexOf( '%' ) !== -1 )
      {
         //O return parseFloat( to.replace( '%', '' ) );
         return parseFloat( to.replace( '%', '' ) );
      }
      console.log("to(" + to + ") is not a number or string:" + typeof to);
      throw -1;
   };

   //O function getSurfix( to )
   private getSurfix = ( to:( number | string) ): string =>
   {
      //O if ( isNaN( to ) && to.indexOf( '%' ) !== -1 )
      //New isNaN does not except number|string
      if ( typeof to === 'string' && to.indexOf( '%' ) !== -1 )
      {
         //O return "%";
         return "%";
      }
      //N this did not return anything before
      return "";
   }

   //O TweenItem.prototype.remove = function( )
   private remove = ( ):void =>
   {
      //O this._ready = true;
      this._ready = true;

      //O delete this.parent.tweens[ this.key ];
      delete this.parent.tweens[ this.key ];

      //O if ( !Object.keys( this.parent.tweens ).length )
      if ( !Object.keys( this.parent.tweens ).length )
      {
         //O this.parent.active = false;
         this.parent.active = false;

         //O delete _activeTweenObjects[ this.obj._tweenObjectId ];
         delete _activeTweenObjects[ this.obj._tweenObjectId ];
      }
   };

   //O TweenItem.prototype.set = function( obj, key, from, to, time, ease: Ease )
   public set = ( obj: TweenObject, key: string, from: ( number | string), to: ( number | string ), time: number, ease: EaseBase ):void =>
   {
      //O this.isColor = isNaN( from ) && from[ 0 ] === "#" || isNaN( to ) && to[ 0 ] === "#";
      //New isNaN does not except number|string
      this.isColor = typeof from == 'string' && from[ 0 ] === "#" || typeof to === 'string' && to[ 0 ] === "#";
      //O this.parent = obj;
      this.parent = obj;
      //O this.obj = obj.object;
//Note: We are in Class TweenItem
//Note: TweenObject has type object, which is type Tween
      this.obj = obj.object;
      //O this.key = key;
      this.key = key;
      //O this.surfix = getSurfix( to );
      //New the fact that getSurface possibly did not return anything makes this a fixMe
      this.surfix = this.getSurfix( to );

      //O if ( this.isColor )
      if ( this.isColor )
      {
         //O this.to = Helpers.hexToRgb( to );
         this.to = Helpers.hexToRgb( to );
         //O this.from = Helpers.hexToRgb( from );
         this.from = Helpers.hexToRgb( from );
         //O this.currentColor =
         this.currentColor =
         {
            //O r: this.from.r,
            r: this.from.r,
            //O g: this.from.g,
            g: this.from.g,
            //O b: this.from.b
            b: this.from.b
         };
      }
      //O else
      else
      {
         //O this.to = getToValue( to );
         this.to = this.getToValue( to );
         //O this.from = getFromValue( from, to, this.obj, key );
         this.from = this.getFromValue( from, to, this.obj, key );
      }

      //O this.time = time;
      this.time = time;
      //O this.currentTime = 0;
      this.currentTime = 0;
      //O this.ease = ease;
      this.ease = ease;
      //O this._ready = false;
      this._ready = false;

      //O if ( !this.parent.active )
      if ( !this.parent.active )
      {
         //O this.parent.active = true;
         this.parent.active = true;

         //O _activeTweenObjects[ this.obj._tweenObjectId ] = this.parent;
         _activeTweenObjects[ this.obj._tweenObjectId ] = this.parent;
      }
   };

   //O TweenItem.prototype.update = function( delta )
   public update = ( delta: number ): void =>
   {
      //O this.currentTime += delta;
      this.currentTime += delta;
      //O this.t = Math.min( this.currentTime, this.time ) / this.time;
      this.t = Math.min( this.currentTime, this.time ) / this.time;
      //O if ( this.ease )
      if ( this.ease )
      {
         //O this.t = this.ease.getPosition( this.t );
         this.t = this.ease.getPosition( this.t );
      }

      //O if ( this.isColor )
      if ( this.isColor )
      {
         //O this.currentColor.r = Math.round( Helpers.Lerp( this.from.r, this.to.r, this.t ) );
         this.currentColor.r = Math.round( Helpers.Lerp( this.from.r, this.to.r, this.t ) );
         //O this.currentColor.g = Math.round( Helpers.Lerp( this.from.g, this.to.g, this.t ) );
         this.currentColor.g = Math.round( Helpers.Lerp( this.from.g, this.to.g, this.t ) );
         //O this.currentColor.b = Math.round( Helpers.Lerp( this.from.b, this.to.b, this.t ) );
         this.currentColor.b = Math.round( Helpers.Lerp( this.from.b, this.to.b, this.t ) );
         //O this.obj[ this.key ] = Helpers.rgbToNumber( this.currentColor.r, this.currentColor.g, this.currentColor.b );
         this.obj[ this.key ] = Helpers.rgbToNumber( this.currentColor.r, this.currentColor.g, this.currentColor.b );
      }
      //O else
      else
      {
         //O var val = Helpers.Lerp( this.from, this.to, this.t );
         let val = Helpers.Lerp( this.from, this.to, this.t );
         //O this.obj[ this.key ] = this.surfix ? val + this.surfix : val;
         //New the fact that getSurface possibly did not return anything makes this a fixMe
         this.obj[ this.key ] = this.surfix ? val + this.surfix : val;
      }

      //O if ( this.currentTime >= this.time )
      if ( this.currentTime >= this.time )
      {
         //O this.remove( );
         this.remove( );
      }
   };
}

//O var Tween =
export class Tween
{
   public static instance: Tween;

   //O var _tweenItemCache = [ ];
   private _tweenItemCache: Array<TweenItem>;

   //O var _tweenObjects = {};
   //New. This is an array not an Empty Object
   private _tweenObjects: Array<TweenObject>;;

   //O var currentId = 1;
   private _currentId: number;

   //O var _callbackItemCache = [ ];
   private _callbackItemCache: Array<CallbackItem>;

   constructor()
   {
      if ( ! Tween.instance )
      {

         //O var _tweenItemCache = [ ];
         this._tweenItemCache = [ ];

         //O var _tweenObjects = {};
         //New. This is an array not an Empty Object
         this._tweenObjects = [];

         //O var currentId = 1;
         this._currentId = 1;

         //O var _callbackItemCache = [ ];
         this._callbackItemCache = [ ];

         Tween.instance = this;

     }

     return Tween.instance;

   };

   //O function getObject( obj )
   //N Changed getObject to getTweenObject for clarity
   private getTweenObject = ( obj: any ): TweenObject =>
   {
      //O if ( !obj._tweenObjectId )
      if ( !obj._tweenObjectId )
      {
         //O obj._tweenObjectId = _currentId;
         obj._tweenObjectId = this._currentId;
         //O _currentId++;
         this._currentId++;
      }
      //O var object = _tweenObjects[ obj._tweenObjectId ];
      //N object is a reserved word. Change name to typeObject.
      let tweenObject:TweenObject = this._tweenObjects[ obj._tweenObjectId ];

      //O if ( !tweenObject )
      if ( !tweenObject )
      {
         //O object = _tweenObjects[ obj._tweenObjectId ] = new TweenObject( obj );
         //N object is a reserved word. Change name to typeObject.
         this._tweenObjects[ obj._tweenObjectId ] = new TweenObject( obj );
         tweenObject = this._tweenObjects[ obj._tweenObjectId ];
      }

      //O return object;
      //N object is a reserved word. Change name to typeObject.
      return tweenObject;
   };

   //O function getTweenItem( )
   private getTweenItem = ( ): TweenItem =>
   {
      //O for ( var i = 0; i < _tweenItemCache.length; i++ )
      for ( let i = 0; i < this._tweenItemCache.length; i++ )
      {
         //O if ( this._tweenItemCache[ i ]._ready )
         if ( this._tweenItemCache[ i ]._ready )
         {
            //O return _tweenItemCache[ i ];
            return this._tweenItemCache[ i ];
         }
      }

      //O var tween = new TweenItem( );
      //N variable name change so I can figure this out
      let tweenItem= new TweenItem( );
      //O _tweenItemCache.push( tweenItem );
      this._tweenItemCache.push( tweenItem );
      //O return tween;
      return tweenItem;
   };

   //O function getCallbackItem( )
   private getCallbackItem = ( ): CallbackItem =>
   {
      //O for ( var i = 0; i < _callbackItemCache.length; i++ )
      for ( let i = 0; i < this._callbackItemCache.length; i++ )
      {
         //O if ( _callbackItemCache[ i ]._ready )
         if ( this._callbackItemCache[ i ]._ready )
         {
            //O return _callbackItemCache[ i ];
            return this._callbackItemCache[ i ];
         }
      }

      //O var cb = new CallbackItem( );
      let cb = new CallbackItem( );
      //O _callbackItemCache.push( cb );
      this._callbackItemCache.push( cb );
      //O return cb;
      return cb;
   }

   //O to: function( obj, time, params, ease )
   public to = ( obj: any, time: number, params: INameToValueMap, ease?: EaseBase ): void =>
   {
      //O var object = getObject( obj );
      let tweenObject = this.getTweenObject( obj );
      //O var onUpdate = null;
      let onUpdate = null;

      //O for ( var key in params )
      for ( let key in params )
      {
         //O if ( key === "onComplete" )
         if ( key === "onComplete" )
         {
            //O var cb = getCallbackItem( );
            let cb = this.getCallbackItem( );
            //O cb.set( object, params[ key ], time );
            cb.set( tweenObject, params[ key ], time );
            //O object.tweens[ cb.key ] = cb;
            tweenObject.tweens[ cb.key ] = cb;

            //O continue;
            continue;
         }

         //O if ( key === "onUpdate" )
         if ( key === "onUpdate" )
         {
            //O onUpdate = params[ key ];
            onUpdate = params[ key ];

            //O continue;
            continue;
         }

         //O if ( time )
         if ( time )
         {
            //O var match = params[ key ] === obj[ key ];
            let match = params[ key ] === obj[ key ];
            //O if ( typeof obj[ key ] === "undefined" ) continue;
            if ( typeof obj[ key ] === "undefined" ) continue;

            //O if ( match )
            if ( match )
            {
               //O if ( object.tweens[ key ] ) object.tweens[ key ].remove( );
               if ( tweenObject.tweens[ key ] ) tweenObject.tweens[ key ].remove( );
            }
            //O else
            else
            {
               //O if ( !object.tweens[ key ] )
               if ( !tweenObject.tweens[ key ] )
               {
                  //O object.tweens[ key ] = getTweenItem( );
                  tweenObject.tweens[ key ] = this.getTweenItem( );
               }

               //O object.tweens[ key ].set( object, key, obj[ key ], params[ key ], time, ease );
               tweenObject.tweens[ key ].set( tweenObject, key, obj[ key ], params[ key ], time, ease );
            }
         }
      }

      //O if ( time )
      if ( time )
      {
         //O object.onUpdate = onUpdate;
         tweenObject.onUpdate = onUpdate;
      }
      //O else
      else
      {
         //O this.set( obj, params );
         this.set( obj, params );
      }
   };

   //O from: function( obj, time, params, ease )
   public from = ( obj: any, time: number, params: INameToValueMap, ease: EaseBase ): void =>
   {
      //O var object = getObject( obj );
      let tweenObject = this.getTweenObject( obj );
      //O var onUpdate = null;
      let onUpdate = null;

      //O for ( var key in params )
      for ( let key in params )
      {
         //O if ( key === "onComplete" )
         if ( key === "onComplete" )
         {
            //O var cb = getCallbackItem( );
            let cb = this.getCallbackItem( );
            //O cb.set( object, params[ key ], time );
            cb.set( tweenObject, params[ key ], time );
            //O object.tweens[ cb.key ] = cb;
            tweenObject.tweens[ cb.key ] = cb;
            //O continue;
            continue;
         }

         //O if ( key === "onUpdate" )
         if ( key === "onUpdate" )
         {
            //O onUpdate = params[ key ];
            onUpdate = params[ key ];
            //O continue;
            continue;
         }

         //O if ( time )
         if ( time )
         {
            //O var match = params[ key ] == obj[ key ];
            let match = params[ key ] == obj[ key ];
            //O if ( typeof obj[ key ] === "undefined" )
            if ( typeof obj[ key ] === "undefined" )
            {
               //O continue;
               continue;
            }

            //O if ( match )
            if ( match )
            {
               //O if ( object.tweens[ key ] )
               if ( tweenObject.tweens[ key ] )
               {
                  //O object.tweens[ key ].remove( );
                  tweenObject.tweens[ key ].remove( );
               }
            }
            //O else
            else
            {
               //O if ( !object.tweens[ key ] )
               if ( !tweenObject.tweens[ key ] )
               {
                  //O object.tweens[ key ] = getTweenItem( );
                  tweenObject.tweens[ key ] = this.getTweenItem( );
               }

               //O object.tweens[ key ].set( object, key, params[ key ], obj[ key ], time, ease );
               tweenObject.tweens[ key ].set( tweenObject, key, params[ key ], obj[ key ], time, ease );
            }
         }
      }

      //O if ( time )
      if ( time )
      {
         //O object.onUpdate = onUpdate;
         tweenObject.onUpdate = onUpdate;
      }
      //O else
      else
      {
         //O this.set( obj, params );
         this.set( obj, params );
      }
   };

   //O fromTo: function( obj, time, paramsFrom, paramsTo, ease )
   public fromTo = ( obj: any, time: number, paramsFrom:INameToValueMap, paramsTo:INameToValueMap, ease:Ease): void =>
   {
      //O var object = getObject( obj );
      let tweenObject = this.getTweenObject( obj );
      //O var onUpdate = null;
      let onUpdate = null;
      //O for ( var key in paramsTo )
      for ( let key in paramsTo )
      {
         //O if ( key === "onComplete" )
         if ( key === "onComplete" )
         {
            //O var cb = getCallbackItem( );
            let cb = this.getCallbackItem( );
            //O cb.set( object, paramsTo[ key ], time );
            cb.set( tweenObject, paramsTo[ key ], time );
            //O object.tweens[ cb.key ] = cb;
            tweenObject.tweens[ cb.key ] = cb;
            //O continue;
            continue;
         }

         //O if ( key === "onUpdate" )
         if ( key === "onUpdate" )
         {
            //O onUpdate = paramsTo[ key ];
            onUpdate = paramsTo[ key ];
            //O continue;
            continue;
         }

         //O if ( time )
         if ( time )
         {
            //O var match = paramsFrom[ key ] == paramsTo[ key ];
            let match = paramsFrom[ key ] == paramsTo[ key ];
            //O if ( typeof obj[ key ] === "undefined" || typeof paramsFrom[ key ] === "undefined" )
            if ( typeof obj[ key ] === "undefined" || typeof paramsFrom[ key ] === "undefined" )
            {
               //O continue;
               continue;
            }

            //O if ( match )
            if ( match )
            {
               //O if ( object.tweens[ key ] ) object.tweens[ key ].remove( );
               if ( tweenObject.tweens[ key ] ) tweenObject.tweens[ key ].remove( );
               {
                  //O obj[ key ] = paramsTo[ key ];
                  obj[ key ] = paramsTo[ key ];
               }
            }
            //O else
            else
            {
               //O if ( !object.tweens[ key ] )
               if ( !tweenObject.tweens[ key ] )
               {
                  //O object.tweens[ key ] = getTweenItem( );
                  tweenObject.tweens[ key ] = this.getTweenItem( );
               }
               //O object.tweens[ key ].set( object, key, paramsFrom[ key ], paramsTo[ key ], time, ease );
               tweenObject.tweens[ key ].set( tweenObject, key, paramsFrom[ key ], paramsTo[ key ], time, ease );
            }

         }
      }

      //O if ( time )
      if ( time )
      {
         //O object.onUpdate = onUpdate;
         tweenObject.onUpdate = onUpdate;
      }
      //O else
      else
      {
         //O this.set( obj, paramsTo );
         this.set( obj, paramsTo );
      }
   };

   //O set: function( obj, params )
   public set = ( obj: any, params: INameToValueMap ): void  =>
   {
      //O var object = getObject( obj );
      let tweenObject = this.getTweenObject( obj );
      //O for ( var key in params )
      for ( let key in params )
      {
         //O if ( typeof obj[ key ] === "undefined" )
         if ( typeof obj[ key ] === "undefined" )
         {
            //O continue;
            continue;
         }
         //O if ( object.tweens[ key ] )
         if ( tweenObject.tweens[ key ] )
         {
            //O object.tweens[ key ].remove( );
            tweenObject.tweens[ key ].remove( );
         }
         //O obj[ key ] = params[ key ];
         obj[ key ] = params[ key ];
      }
   }

   //O _update: function( delta )
   public _update = ( delta: number ): void =>
   {
      //O for ( var id in _activeTweenObjects )
      for ( let id in _activeTweenObjects )
      {
         //O var object = _activeTweenObjects[ id ];
         let tweenObject = _activeTweenObjects[ id ];
         //O for ( var key in object.tweens )
         for ( let key in tweenObject.tweens )
         {
            //O object.tweens[ key ].update( delta );
            tweenObject.tweens[ key ].update( delta );
         }
         //O if ( object.onUpdate )
         if ( tweenObject.onUpdate )
         {
            //O object.onUpdate.call( object.object, delta );
            tweenObject.onUpdate.call( tweenObject.object, delta );
         }
      }
   }
};

//N exported name cannot be same as class name, so export instance as default
export default new Tween();

//O module.exports = Tween;

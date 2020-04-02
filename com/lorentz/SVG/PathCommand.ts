//package com.lorentz.SVG
//   import * as PIXI from "pixi.js";

export class PathCommand
{

   public type:string;
   public _args:Array< any >;

   //Used in another project, can be deleted.
   public extra:Object;

   public PathCommand( type:string = null, args:Array< any> = null )
   {
      this.type = type;
      this._args = args;
   }

   get args( ):Array< any >
   {
      if ( this._args == null )
      {
         this._args = new Array();
      }
      return this._args;
   }

   set args(value: Array< any > )
   {
      this._args = value;
   }
}

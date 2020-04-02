//O package com.lorentz.SVG
//O {
//O    import flash.display.Sprite
//O    import flash.display.Graphics
//O    import flash.display.Shape
//O
//O    import flash.geom.Point
//O    import com.lorentz.SVG.PathCommand

import { StringUtil } from './StringUtil'

export interface iNameToValueMap
{
    [key: string]: string
}

export class SVGUtil
{
   public static styleToObject( style: string ): iNameToValueMap
   {
      style = StringUtil.trim( style )
      style = StringUtil.rtrim( style, ";" )

      //O let obj: Object = new Object(  )
      let obj: iNameToValueMap = { }
      for ( let prop in style.split( ";" ) )
      {
         let split: Array< string > = prop.split( ":" )
         if ( split.length == 2 )
            obj[ StringUtil.trim( split[ 0 ] ) ] = StringUtil.trim( split[ 1 ] )
      }

      return obj
   }

   public static mergeObjectStyles( obja: iNameToValueMap, objb: iNameToValueMap ): iNameToValueMap
   {
      //O let temp: Object = new Object(  )
      let temp: iNameToValueMap = { }
      for( let prop in obja )
      {
         temp[ prop ] = obja[ prop ]
      }

      for( let p in objb )
      {
         temp[ p ] = objb[ p ]
      }

      return temp
   }

   /*NOT USED
   public static ObjectToStyle( obj_style:Object ): string{
           let style: string = new String(  )

           for( let p_name: string in obj_style )
           {
                   style += p_name+":"+obj_style[p_name]+ ";"
           }

           return style
   }*/

   protected static presentationStyles = ["display", "visibility", "opacity", "fill",
      "fill-opacity", "fill-rule", "stroke", "stroke-opacity",
      "stroke-width", "stroke-linecap", "stroke-linejoin",
      "font-size", "font-family", "font-weight", "text-anchor",
      "dominant-baseline"]

   //public static presentationStyleToObject( elt:XML ): iNameToValueMap
   public static presentationStyleToObject( elt: iNameToValueMap ):  iNameToValueMap
   {
      //O let obj:Object = new Object( )
      let obj: iNameToValueMap = {}

      for ( let styleName in SVGUtil.presentationStyles )
      {
         if ( "@"+styleName in elt )
         {
            obj[ styleName ] = elt[ "@"+styleName ]
         }
      }

      return obj
   }
}

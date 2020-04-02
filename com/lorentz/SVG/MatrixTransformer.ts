//O package com.lorentz.SVG
//O {
//O    import flash.geom.Point
//O    import flash.geom.Matrix

import * as PIXI from 'pixi.js'

export class MatrixTransformer
{
   public static rotateAroundInternalPoint( mat: PIXI.Matrix, x: number, y: number, angle: number ): void
   {
      //O let p: PIXI.Point = mat.transformPoint( new PIXI.Point( x, y ) )
      let p: PIXI.Point = mat.apply( new PIXI.Point( x, y ) )
      this.rotateAroundExternalPoint( mat, p.x, p.y, angle )
   }
   public static rotateAroundExternalPoint( mat: PIXI.Matrix, x: number, y: number, angle: number ): void
   {
      angle = Math.PI * angle / 180
      mat.translate( -x, -y )
      mat.rotate( angle )
      mat.translate( x, y )
   }
   public static setSkewX( mat: PIXI.Matrix, angle: number ): void
   {
      angle = Math.PI * angle / 180
      let skewMatrix: PIXI.Matrix = new PIXI.Matrix(  )
      skewMatrix.c = Math.tan( angle )
      //O mat.concat( skewMatrix )
      mat.append( skewMatrix )
   }
   public static setSkewY( mat: PIXI.Matrix, angle: number ): void
   {
      angle = Math.PI * angle / 180
      let skewMatrix: PIXI.Matrix = new PIXI.Matrix(  )
      skewMatrix.b = Math.tan( angle )
      //O mat.concat( skewMatrix )
      mat.append( skewMatrix )
   }
}

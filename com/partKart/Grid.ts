//O import flash.display.*
//O import flash.events.*
//O import { Point } from '@pixi/math'
import * as PIXI from 'pixi.js'
import { Graphics } from 'pixi.js'
import { Sprite } from 'pixi.js'
import { Global }  from "./Global"

export class Grid extends PIXI.Sprite
{
   // the grid class draws the grid and origin axes based on the current zoom level and origin position
   //N The plural of axis is axes ;- )

   //O private var xaxis:Sprite
   private xaxis: Graphics
   //O private var yaxis:Sprite
   private yaxis: Graphics
   //O private var grid:Sprite
   private grid: Graphics

   private gridlines: Array< PIXI.Graphics > = []

   private gridxnum: number = 0
   private gridynum: number = 0

   private yoffset: number = 0
   private xoffset: number = 0

   //O private var horizlines:Sprite
   private horizlines: Sprite
   //O private var vertlines:Sprite
   private vertlines: Sprite

   // Reusable array index
   private i: number = 0

   constructor ( )
   {
      super( )

      this.horizlines = new PIXI.Sprite( )
      this.vertlines = new PIXI.Sprite( )
      this.gridlines = new Array( )

      this.grid = new PIXI.Graphics( )
      this.xaxis = new PIXI.Graphics( )
      this.yaxis = new PIXI.Graphics( )

      this.drawBlank( )

      this.drawAxes( )

      // Draw grid lines
      this.drawGrid( )

      this.addChild( this.grid )
      this.grid.addChild( this.horizlines )
      this.grid.addChild( this.vertlines )
   }

   private drawBlank( ): void
   {
      // a blank background is necessary for the grid to detect mouse events

      let blank = new PIXI.Graphics( )
      //O blank.graphics.beginFill( 0xffffff )
      blank.beginFill( 0xffffff )
      //O blank.graphics.drawRect( 0,0,Global.docwidth,Global.docheight )
      blank.drawRect( 0,0,Global.docwidth,Global.docheight )
      //O blank.graphics.endFill( )
      blank.endFill( )

      //O blank.graphics.alpha = 0
      blank.alpha = 0
      this.addChild( blank )
   }

   private drawAxes( ): void
   {
      // draw axes for origin
      //N The plural of axis is axes ;- )
      //O var yg:Graphics = yaxis.graphics
      let yg = this.yaxis
      //O var xg:Graphics = xaxis.graphics
      let xg = this.xaxis

      //O yg.lineStyle( 1,0,0.5,true,LineScaleMode.NONE )
      //N AS3:lineStyle( thickness:Number = NaN,
      //N               color:uint = 0,
      //N               alpha:Number = 1.0,
      //N               pixelHinting:Boolean = false,
      //N               scaleMode:String = "normal",
      //N               caps:String = null,
      //N               joints:String = null,
      //N               miterLimit:Number = 3 ):void
      //N
      //N Pixi:LineStyle( width:number,
      //N                color:number,
      //N                alpha:number,
      //N                alignment number,
      //N                native boolean )   // straight line not triangle
      yg.lineStyle    ( 1,0,0.5,0.5, true )
      yg.moveTo( 0,0 )
      yg.lineTo( 0,Global.docheight )
      this.yaxis.x = Global.xorigin

      //O xg.lineStyle( 1,0,0.5,true,LineScaleMode.NONE )
      xg.lineStyle( 1,0,0.5,0.5, true )
      xg.moveTo( 0,0 )
      xg.lineTo( Global.docwidth,0 )
      this.xaxis.y = Global.yorigin

      this.addChild( this.yaxis )
      this.addChild( this.xaxis )
   }

   private redrawAxes( )
   {
      this.xaxis.y = Global.yorigin
      this.yaxis.x = Global.xorigin
   }

   private drawGrid( )
   {
      // set grid spacing
      this.gridxnum = Math.ceil( Global.docwidth/Global.zoom )
      this.gridynum = Math.ceil( Global.docheight/Global.zoom )

      // set position of offset variables
      this.yoffset = Global.yorigin - Math.floor( Global.yorigin/Global.zoom )*Global.zoom
      this.xoffset = Global.xorigin - Math.floor( Global.xorigin/Global.zoom )*Global.zoom

      let ypos: number = 0
      let xpos: number = 0

      // draw horizontal lines
      for ( this.i = 0; this.i <= this.gridynum; this.i++  )
      {
         ypos = this.i * Global.zoom + this.yoffset
         if ( ypos != 0  )
         {
            this.gridlines[this.i] = new PIXI.Graphics( )
            this.drawHorizLine( this.gridlines[this.i] )
            this.gridlines[this.i].y = ypos
         }
      }

      // draw vertical lines
      for ( this.i = 0; this.i <= this.gridxnum; this.i++  )
      {
         xpos = this.i * Global.zoom + this.xoffset
         if ( xpos != 0  )
         {
            this.gridlines[this.i] = new PIXI.Graphics( )
            this.drawVertLine( this.gridlines[this.i] )
            this.gridlines[this.i].x = xpos
         }
      }
   }

   public redrawGrid( ):void
   {
      if ( Global.zoom < 10  )
      {
         this.redrawGridLarge( )
         return
      }
      //O this.graphics.clear( )
      this.clear( )

      // set grid spacing
      this.gridxnum = Math.ceil( Global.docwidth/Global.zoom )
      this.gridynum = Math.ceil( Global.docheight/Global.zoom )

      // set position of offset variables
      this.yoffset = Global.yorigin - Math.floor( Global.yorigin/Global.zoom )*Global.zoom
      this.xoffset = Global.xorigin - Math.floor( Global.xorigin/Global.zoom )*Global.zoom

      let ypos: number = 0
      let xpos: number = 0

      // reposition existing horizontal lines
      for ( this.i = 0; this.i < this.horizlines.children.length; this.i++  )
      {
         ypos = this.i * Global.zoom + this.yoffset
         this.horizlines.getChildAt( this.i ).y = ypos
      }

      // reposition existing vertical lines
      for ( this.i = 0; this.i < this.vertlines.children.length; this.i++  )
      {
         xpos = this.i * Global.zoom + this.xoffset
         this.vertlines.getChildAt( this.i ).x = xpos
      }

      // add more horizontal lines as needed
      if ( this.gridynum > this.horizlines.children.length  )
      {
         for ( this.i=this.horizlines.children.length; this.i <= this.gridynum; this.i++  )
         {
            ypos = this.i * Global.zoom + this.yoffset
            if ( ypos != 0  )
            {
               this.gridlines[this.i] = new PIXI.Graphics( )
               this.drawHorizLine( this.gridlines[this.i] )
               this.gridlines[this.i].y = ypos
            }
         }
      }
      else if ( this.gridynum < this.horizlines.children.length  )
      {
         // remove vertical grid lines as needed
         while ( this.horizlines.children.length > this.gridynum  )
         {
            this.horizlines.removeChildAt( this.gridynum )
         }
      }

      // add more vertical lines as needed
      if ( this.gridxnum > this.vertlines.children.length  )
      {
         for ( this.i = this.vertlines.children.length; this.i <=  this.gridxnum; this.i++  )
         {
            xpos = this.i * Global.zoom + this.xoffset
            if ( xpos != 0  )
            {
               this.gridlines[this.i] = new PIXI.Graphics( )
               this.drawVertLine( this.gridlines[this.i] )
               this.gridlines[this.i].x = xpos
            }
         }
      }
      else if ( this.gridxnum < this.vertlines.children.length  )
      {
         // remove vertical grid lines as needed
         while ( this.vertlines.children.length > this.gridxnum  )
         {
            this.vertlines.removeChildAt( this.gridxnum )
         }
      }
   }

   //O public function redrawGridLarge( ):void
   redrawGridLarge( ):void
   {
      //O apparently drawing a rectangle as a background will hurt performance when using hardware acceleration, revise later..
      //FixMe fixme Fixme fixMe
      //C We are not a graphic. I could create one, but the note above says otherwise.  for now, leave blank.
      //C It seems to make the background black without
      //this.beginFill( 0xeeeeee )
      //O this.graphics.drawRect( 0,0,this.width,this.height )
      //FixMe fixme Fixme fixMe
      //O this.drawRect( 0,0,this.width,this.height )
      //FixMe fixme Fixme fixMe
      //O this.endFill( )

      // set grid spacing

      let offset = 0

      if ( Global.unit == "cm"  )
      {
         offset = 100

      } else
      {
         offset = 12
      }

      this.gridxnum = Math.ceil( Global.docwidth/( Global.zoom*offset ) )
      this.gridynum = Math.ceil( Global.docheight/( Global.zoom*offset ) )

      // set position of offset variables
      this.yoffset = Global.yorigin - Math.floor( Global.yorigin/( Global.zoom*offset ) )*Global.zoom*offset
      this.xoffset = Global.xorigin - Math.floor( Global.xorigin/( Global.zoom*offset ) )*Global.zoom*offset

      let ypos: number = 0
      let xpos: number = 0

      // reposition existing horizontal lines
      for ( this.i = 0; this.i < this.horizlines.children.length; this.i++  )
      {
         ypos = this.i * Global.zoom * offset + this.yoffset
         //O horizlines.getChildAt( i ).y = ypos
         this.horizlines.getChildAt( this.i ).y = ypos
      }

      // reposition existing vertical lines
      for ( this.i = 0; this.i < this.vertlines.children.length; this.i++  )
      {
         xpos = this.i * Global.zoom * offset + this.xoffset
         //O vertlines.getChildAt( i ).x = xpos
         this.vertlines.getChildAt( this.i ).x = xpos
      }

      // add more horizontal lines as needed
      if ( this.gridynum > this.horizlines.children.length  )
      {
         for ( this.i= this.horizlines.children.length; this.i <=  this.gridynum; this.i++  )
         {
            ypos = this.i * Global.zoom * offset + this.yoffset
            if ( ypos != 0  )
            {
               this.gridlines[this.i] = new PIXI.Graphics( )
               this.drawHorizLine( this.gridlines[this.i] )
               this.gridlines[this.i].y = ypos
            }
         }
      }
      else if ( this.gridynum < this.horizlines.children.length  )
      {
         // remove vertical grid lines as needed
         while ( this.horizlines.children.length > this.gridynum  )
         {
            this.horizlines.removeChildAt( this.gridynum )
         }
      }

      // add more vertical lines as needed
      if ( this.gridxnum > this.vertlines.children.length  )
      {
         for ( this.i=this.vertlines.children.length; this.i <= this.gridxnum; this.i++  )
         {
            xpos = this.i * Global.zoom * offset + this.xoffset
            if ( xpos != 0  )
            {
               this.gridlines[this.i] = new PIXI.Graphics( )
               this.drawVertLine( this.gridlines[this.i] )
               this.gridlines[this.i].x = xpos
            }
         }
      }
      else if ( this.gridxnum < this.vertlines.children.length  )
      {
         // remove vertical grid lines as needed
         while ( this.vertlines.children.length > this.gridxnum  )
         {
            this.vertlines.removeChildAt( this.gridxnum )
         }
      }
   }

   private drawHorizLine( line: PIXI.Graphics ): void
   {
      // dotted line
      for ( let j = 0; j < Global.docwidth; j += 4  )
      {
         line.beginFill( 0x999999 )
         line.beginFill( 0x999999 )
         line.drawRect( j, 0, 1, 1 )
         line.endFill( )
      }

      this.horizlines.addChild( line )
   }

   private drawVertLine( line: PIXI.Graphics ): void
   {
      // dotted line
      for ( let j = 0; j < Global.docheight; j+=4  )
      {
         line.beginFill( 0x999999 )
         line.drawRect( 0,j,1,1 )
         line.endFill( )
      }

      this.vertlines.addChild( line )
   }

   public setOrigin( )
   {
      this.redrawAxes( )
      this.redrawGrid( )
   }

   public clear( ): void
   {
      while ( this.children.length > 0  )
      {
         this.removeChildAt( 0 )
      }
   }
}

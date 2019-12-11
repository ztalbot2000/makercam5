//O import flash.display.*;
//O import flash.events.*;
//O import { Point } from '@pixi/math';
import * as PIXI from 'pixi.js';
import { Graphics } from 'pixi.js';
import { Sprite } from 'pixi.js';
import { Global }  from "./Global";

//O public class Grid extends Sprite
export class Grid extends PIXI.Sprite
{
   // the grid class draws the grid and origin axes based on the current zoom level and origin position
   //N The plural of axis is axes ;-)

   //O private var xaxis:Sprite;
   private xaxis: Graphics;
   //O private var yaxis:Sprite;
   private yaxis: Graphics;
   //O private var grid:Sprite;
   private grid: Graphics;

   //O private var gridlines:Array;
   private gridlines: Array<Graphics> = [];

   //O private var gridxnum:int;
   private gridxnum: number = 0;
   //O private var gridynum:int;
   private gridynum: number = 0;

   //O private var yoffset:int = 0;
   private yoffset: number = 0;
   //O private var xoffset: int = 0;
   private xoffset: number = 0;

   //O private var horizlines:Sprite;
   private horizlines: Sprite;
   //O private var vertlines:Sprite;
   private vertlines: Sprite;

   // Reusable array index
   //O private var i:int;
   private i: number = 0;

   //O public function Grid():void{
   constructor ()
   {
      super();

      //O horizlines = new Sprite();
      this.horizlines = new PIXI.Sprite();
      //O vertlines = new Sprite();
      this.vertlines = new PIXI.Sprite();
      //O gridlines = new Array();
      this.gridlines = new Array();

      //O grid = new Sprite();
      this.grid = new PIXI.Graphics();
      //O xaxis = new Sprite();
      this.xaxis = new PIXI.Graphics();
      //O yaxis = new Sprite();
      this.yaxis = new PIXI.Graphics();

      //O drawBlank();
      this.drawBlank();

      //O drawAxes();
      this.drawAxes();

      // Draw grid lines
      //O drawGrid();
      this.drawGrid();

      //O addChild(grid);
      this.addChild(this.grid);
      //O grid.addChild(horizlines);
      this.grid.addChild(this.horizlines);
      //O grid.addChild(vertlines);
      this.grid.addChild(this.vertlines);
   }

   //O private function drawBlank():void
   private drawBlank()
   {
      // a blank background is necessary for the grid to detect mouse events

      //O var blank:Shape = new Shape();
      let blank = new PIXI.Graphics();
      //O blank.graphics.beginFill(0xffffff);
      blank.beginFill(0xffffff);
      //O blank.graphics.drawRect(0,0,Global.docwidth,Global.docheight);
      blank.drawRect(0,0,Global.docwidth,Global.docheight);
      //O blank.endFill();
      blank.endFill();

      //O blank.alpha = 0;
      blank.alpha = 0;
      //O addChild(blank);
      this.addChild(blank);
   }

   //O private function drawAxes():void
   private drawAxes()
   {
      // draw axes for origin
      //N The plural of axis is axes ;-)
      //O var yg:Graphics = yaxis.graphics;
      let yg = this.yaxis;
      //O var xg:Graphics = xaxis.graphics;
      let xg = this.xaxis;

      //O yg.lineStyle(1,0,0.5,true,LineScaleMode.NONE);
      //N AS3:lineStyle(thickness:Number = NaN,
      //N               color:uint = 0,
      //N               alpha:Number = 1.0,
      //N               pixelHinting:Boolean = false,
      //N               scaleMode:String = "normal",
      //N               caps:String = null,
      //N               joints:String = null,
      //N               miterLimit:Number = 3):void
      //N
      //N Pixi:LineStyle(width:number,
      //N                color:number,
      //N                alpha:number,
      //N                alignment number,
      //N                native boolean)   // straight line not triangle
      yg.lineStyle    (1,0,0.5,0.5, true);
      //O yg.moveTo(0,0);
      yg.moveTo(0,0);
      //O yg.lineTo(0,Global.docheight);
      yg.lineTo(0,Global.docheight);
      //O yaxis.x = Global.xorigin;
      this.yaxis.x = Global.xorigin;

      //O xg.lineStyle(1,0,0.5,true,LineScaleMode.NONE);
      xg.lineStyle(1,0,0.5,0.5, true);
      //O xg.moveTo(0,0);
      xg.moveTo(0,0);
      //O xg.lineTo(Global.docwidth,0);
      xg.lineTo(Global.docwidth,0);
      //O xaxis.y = Global.yorigin;
      this.xaxis.y = Global.yorigin;

      //O addChild(yaxis);
      this.addChild(this.yaxis);
      //O addChild(xaxis);
      this.addChild(this.xaxis);
   }

   //O private function redrawAxes():void
   private redrawAxes()
   {
      //O xaxis.y = Global.yorigin;
      this.xaxis.y = Global.yorigin;
      //O yaxis.x = Global.xorigin;
      this.yaxis.x = Global.xorigin;
   }

   //O private function drawGrid():void 
   private drawGrid()
   {
      // set grid spacing
      //O gridxnum = Math.ceil(Global.docwidth/Global.zoom);
      this.gridxnum = Math.ceil(Global.docwidth/Global.zoom);
      //O gridynum = Math.ceil(Global.docheight/Global.zoom);
      this.gridynum = Math.ceil(Global.docheight/Global.zoom);

      // set position of offset variables
      //O yoffset = Global.yorigin - Math.floor(Global.yorigin/Global.zoom)*Global.zoom;
      this.yoffset = Global.yorigin - Math.floor(Global.yorigin/Global.zoom)*Global.zoom;
      //O xoffset = Global.xorigin - Math.floor(Global.xorigin/Global.zoom)*Global.zoom;
      this.xoffset = Global.xorigin - Math.floor(Global.xorigin/Global.zoom)*Global.zoom;

      //O var ypos:int = 0;
      let ypos: number = 0;
      //O var xpos:int = 0;
      let xpos: number = 0;

      // draw horizontal lines
      //O for (i = 0; i <= gridynum; i++)
      for ( this.i = 0; this.i <= this.gridynum; this.i++ )
      {
         //O ypos = i * Global.zoom + yoffset;
         ypos = this.i * Global.zoom + this.yoffset;
         if ( ypos != 0 )
         {
            //O gridlines[i] = new Shape();
            this.gridlines[this.i] = new PIXI.Graphics();
            //O drawHorizLine(gridlines[i]);
            this.drawHorizLine(this.gridlines[this.i]);
            //O gridlines[i].y = ypos;
            this.gridlines[this.i].y = ypos;
         }
      }

      // draw vertical lines
      //O for (i = 0; i <= gridxnum; i++)
      for ( this.i = 0; this.i <= this.gridxnum; this.i++ )
      {
         //O xpos = i*Global.zoom + xoffset;
         xpos = this.i * Global.zoom + this.xoffset;
         if ( xpos != 0 )
         {
            //O gridlines[i] = new Shape();
            this.gridlines[this.i] = new PIXI.Graphics();
            //O drawVertLine(gridlines[i]);
            this.drawVertLine(this.gridlines[this.i]);
            //O gridlines[i].x = xpos;
            this.gridlines[this.i].x = xpos;
         }
      }
   }

   //O public function redrawGrid():void
   redrawGrid():void
   {
      //O if ( Global.zoom < 10 )
      if ( Global.zoom < 10 )
      {
         //O redrawGridLarge();
         this.redrawGridLarge();
         //O return;
         return;
      }
      //O this.graphics.clear();
      this.clear();

      // set grid spacing
      //O gridxnum = Math.ceil(Global.docwidth/Global.zoom);
      this.gridxnum = Math.ceil(Global.docwidth/Global.zoom);
      //O gridynum = Math.ceil(Global.docheight/Global.zoom);
      this.gridynum = Math.ceil(Global.docheight/Global.zoom);

      // set position of offset variables
      //O yoffset = Global.yorigin - Math.floor(Global.yorigin/Global.zoom)*Global.zoom;
      this.yoffset = Global.yorigin - Math.floor(Global.yorigin/Global.zoom)*Global.zoom;
      //O xoffset = Global.xorigin - Math.floor(Global.xorigin/Global.zoom)*Global.zoom;
      this.xoffset = Global.xorigin - Math.floor(Global.xorigin/Global.zoom)*Global.zoom;

      //O var ypos:int = 0;
      let ypos: number = 0;
      //O var xpos:int = 0;
      let xpos: number = 0;

      // reposition existing horizontal lines
      //O for (i = 0; i < horizlines.numChildren; i++)
      for ( this.i = 0; this.i < this.horizlines.children.length; this.i++ )
      {
         //O ypos = i*Global.zoom + yoffset;
         ypos = this.i * Global.zoom + this.yoffset;
         //O horizlines.getChildAt(i).y = ypos;
         this.horizlines.getChildAt(this.i).y = ypos;
      }

      // reposition existing vertical lines
      //O for (i = 0; i < vertlines.numChildren; i++)
      for ( this.i = 0; this.i < this.vertlines.children.length; this.i++ )
      {
         //O xpos = i*Global.zoom + xoffset;
         xpos = this.i * Global.zoom + this.xoffset;
         //O vertlines.getChildAt(i).x = xpos;
         this.vertlines.getChildAt(this.i).x = xpos;
      }

      // add more horizontal lines as needed
      //O if ( gridynum > horizlines.numChildren )
      if ( this.gridynum > this.horizlines.children.length )
      {
         //O for ( i=horizlines.numChildren; i <= gridynum; i++ )
         for ( this.i=this.horizlines.children.length; this.i <= this.gridynum; this.i++ )
         {
            //O ypos = i*Global.zoom + yoffset;
            ypos = this.i * Global.zoom + this.yoffset;
            //O if ( ypos != 0 )
            if ( ypos != 0 )
            {
               //O gridlines[i] = new Shape();
               this.gridlines[this.i] = new PIXI.Graphics();
               //O drawHorizLine(gridlines[i]);
               this.drawHorizLine(this.gridlines[this.i]);
               //O gridlines[i].y = ypos;
               this.gridlines[this.i].y = ypos;
            }
         }
      }
      //O  else if ( gridynum < horizlines.numChildren )
      else if ( this.gridynum < this.horizlines.children.length )
      {
         // remove vertical grid lines as needed
         //O while ( horizlines.numChildren > gridynum )
         while ( this.horizlines.children.length > this.gridynum )
         {
            //O horizlines.removeChildAt(gridynum);
            this.horizlines.removeChildAt(this.gridynum);
         }
      }

      // add more vertical lines as needed
      //O if ( gridxnum > vertlines.numChildren )
      if ( this.gridxnum > this.vertlines.children.length )
      {
         //O for ( i=vertlines.numChildren; i <= gridxnum; i++ )
         for ( this.i = this.vertlines.children.length; this.i <=  this.gridxnum; this.i++ )
         {
            //O xpos = i*Global.zoom + xoffset;
            xpos = this.i * Global.zoom + this.xoffset;
            //O if ( xpos != 0 )
            if ( xpos != 0 )
            {
               //O gridlines[i] = new Shape();
               this.gridlines[this.i] = new PIXI.Graphics();
               //O drawVertLine(gridlines[i]);
               this.drawVertLine(this.gridlines[this.i]);
               //O gridlines[i].x = xpos;
               this.gridlines[this.i].x = xpos;
            }
         }
      }
      //O else if ( gridxnum < vertlines.numChildren )
      else if ( this.gridxnum < this.vertlines.children.length )
      {
         // remove vertical grid lines as needed
         //O while ( vertlines.numChildren > gridxnum )
         while ( this.vertlines.children.length > this.gridxnum )
         {
            //O vertlines.removeChildAt(gridxnum);
            this.vertlines.removeChildAt(this.gridxnum);
         }
      }
   }

   //O public function redrawGridLarge():void
   redrawGridLarge():void
   {
      //O apparently drawing a rectangle as a background will hurt performance when using hardware acceleration, revise later..
      //FixMe fixme Fixme fixMe
      //C We are not a graphic. I could create one, but the note above says otherwise.  for now, leave blank.
      //C It seems to make the background black without
      //this.beginFill(0xeeeeee);
      //O this.graphics.drawRect(0,0,this.width,this.height);
      //FixMe fixme Fixme fixMe
      //O this.drawRect(0,0,this.width,this.height);
      //FixMe fixme Fixme fixMe
      //O this.endFill();

      // set grid spacing

      //O var offset = 0;
      let offset = 0;

      //O if ( Global.unit == "cm" )
      if ( Global.unit == "cm" )
      {
         //O offset = 100;
         offset = 100;

      } else
      {
         //O offset = 12;
         offset = 12;
      }

      //O gridxnum = Math.ceil(Global.docwidth/(Global.zoom*offset));
      this.gridxnum = Math.ceil(Global.docwidth/(Global.zoom*offset));
      //O gridynum = Math.ceil(Global.docheight/(Global.zoom*offset));
      this.gridynum = Math.ceil(Global.docheight/(Global.zoom*offset));

      // set position of offset variables
      //O yoffset = Global.yorigin - Math.floor(Global.yorigin/(Global.zoom*offset))*Global.zoom*offset;
      this.yoffset = Global.yorigin - Math.floor(Global.yorigin/(Global.zoom*offset))*Global.zoom*offset;
      //O xoffset = Global.xorigin - Math.floor(Global.xorigin/(Global.zoom*offset))*Global.zoom*offset;
      this.xoffset = Global.xorigin - Math.floor(Global.xorigin/(Global.zoom*offset))*Global.zoom*offset;

      //O var ypos:int = 0;
      let ypos: number = 0;
      //O var xpos:int = 0;
      let xpos: number = 0;

      // reposition existing horizontal lines
      //O for (i = 0; i < horizlines.numChildren; i++)
      for ( this.i = 0; this.i < this.horizlines.children.length; this.i++ )
      {
         //O ypos = i*Global.zoom*offset + yoffset;
         ypos = this.i * Global.zoom*offset + this.yoffset;
         //O horizlines.getChildAt(i).y = ypos;
         this.horizlines.getChildAt(this.i).y = ypos;
      }

      // reposition existing vertical lines
      //O for (i = 0; i < vertlines.numChildren; i++)
      for ( this.i = 0; this.i < this.vertlines.children.length; this.i++ )
      {
         //O xpos = i*Global.zoom*offset + xoffset;
         xpos = this.i * Global.zoom*offset + this.xoffset;
         //O vertlines.getChildAt(i).x = xpos;
         this.vertlines.getChildAt(this.i).x = xpos;
      }

      // add more horizontal lines as needed
      //O if ( gridynum > horizlines.numChildren )
      if ( this.gridynum > this.horizlines.children.length )
      {
         //O for ( i=horizlines.numChildren; i <= gridynum; i++ )
         for ( this.i= this.horizlines.children.length; this.i <=  this.gridynum; this.i++ )
         {
            //O ypos = i*Global.zoom*offset + yoffset;
            ypos = this.i * Global.zoom*offset + this.yoffset;
            //O if ( ypos != 0 )
            if ( ypos != 0 )
            {
               //O gridlines[i] = new Shape();
               this.gridlines[this.i] = new PIXI.Graphics();
               //O drawHorizLine(gridlines[i]);
               this.drawHorizLine(this.gridlines[this.i]);
               //O gridlines[i].y = ypos;
               this.gridlines[this.i].y = ypos;
            }
         }
      }
      //O else if ( gridynum < horizlines.numChildren )
      else if ( this.gridynum < this.horizlines.children.length )
      {
         // remove vertical grid lines as needed
         //O while ( horizlines.numChildren > gridynum )
         while ( this.horizlines.children.length > this.gridynum )
         {
            //O horizlines.removeChildAt(gridynum);
            this.horizlines.removeChildAt(this.gridynum);
         }
      }

      // add more vertical lines as needed
      //O if ( gridxnum > vertlines.numChildren )
      if ( this.gridxnum > this.vertlines.children.length )
      {
         //O for ( i=vertlines.numChildren; i <= gridxnum; i++ )
         for ( this.i=this.vertlines.children.length; this.i <= this.gridxnum; this.i++ )
         {
            //O xpos = i*Global.zoom*offset + xoffset;
            xpos = this.i * Global.zoom*offset + this.xoffset;
            //O if ( xpos != 0 )
            if ( xpos != 0 )
            {
               //O gridlines[i] = new Shape();
               this.gridlines[this.i] = new PIXI.Graphics();
               //O drawVertLine(gridlines[i]);
               this.drawVertLine(this.gridlines[this.i]);
               //O gridlines[i].x = xpos;
               this.gridlines[this.i].x = xpos;
            }
         }
      }
      //O else if ( gridxnum < vertlines.numChildren )
      else if ( this.gridxnum < this.vertlines.children.length )
      {
         // remove vertical grid lines as needed
         //O while ( vertlines.numChildren > gridxnum )
         while ( this.vertlines.children.length > this.gridxnum )
         {
            //O vertlines.removeChildAt(gridxnum);
            this.vertlines.removeChildAt(this.gridxnum);
         }
      }
   }

   //O private function drawHorizLine(line:Shape):void
   private drawHorizLine(line: Graphics)
   {
      // dotted line
      //O for(var j=0; j<Global.docwidth; j+=4)
      for ( let j=0; j<Global.docwidth; j+=4 )
      {
         //O line.graphics.beginFill(0x999999);
         line.beginFill(0x999999);
         //O line.graphics.beginFill(0x999999);
         line.beginFill(0x999999);
         //O line.graphics.drawRect(j,0,1,1);
         line.drawRect(j,0,1,1);
         //O line.graphics.endFill();
         line.endFill();
      }

      //O horizlines.addChild(line);
      this.horizlines.addChild(line);
   }

   //O private function drawVertLine(line:Shape):void
   private drawVertLine(line: Graphics)
   {
      // dotted line
      //O for ( var j=0; j<Global.docheight; j+=4 )
      for ( let j=0; j<Global.docheight; j+=4 )
      {
         //O line.graphics.beginFill(0x999999);
         line.beginFill(0x999999);
         //O line.graphics.drawRect(0,j,1,1);
         line.drawRect(0,j,1,1);
         //O line.graphics.endFill();
         line.endFill();
      }

      //O vertlines.addChild(line);
      this.vertlines.addChild(line);
   }

   //O  public function setOrigin():void
   setOrigin()
   {
      //O redrawAxes();
      this.redrawAxes();
      //O redrawGrid();
      this.redrawGrid();
   }

   //O public function clear():void
   public clear(): void
   {
      //O while ( this.numChildren > 0 )
      while ( this.children.length > 0 )
      {
         //O removeChildAt(0);
         this.removeChildAt(0);
      }
   }
}

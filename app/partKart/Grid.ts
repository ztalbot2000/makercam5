//O import flash.display.*;
//O import flash.events.*;
//O import { Point } from '@pixi/math';
//J import { Graphics } from '@pixi/graphics';
// added
import * as PIXI from 'pixi.js';
import { Graphics } from 'pixi.js';
import { Sprite } from 'pixi.js';
import { Global }  from "./Global.js";

//O public class Grid extends Sprite
//C export default class Grid extends Sprite
//C export default class Grid extends Graphics
export default class Grid extends PIXI.Sprite
{
   // the grid class draws the grid and origin axes based on the current zoom level and origin position
   //N The plural of axis is axes ;-)

   //O private var xaxis:Sprite;
   //J #xaxis = NaN;
   private xaxis: Graphics;
   //O private var yaxis:Sprite;
   //J #yaxis = NaN;
   private yaxis: Graphics;
   //O private var grid:Sprite;
   //J #grid = NaN;
   private grid: Graphics;

   //O private var gridlines:Array;
   //J #gridlines = [];
   private gridlines: Array<Graphics> = [];

   //O private var gridxnum:int;
   //J #gridxnum = 0;
   private gridxnum: number = 0;
   //O private var gridynum:int;
   //J #gridynum = 0;
   private gridynum: number = 0;

   //O private var yoffset:int = 0;
   //J #yoffset = 0;
   private yoffset: number = 0;
   //O private var xoffset: int = 0;
   //J #xoffset = 0;
   private xoffset: number = 0;

   //O private var horizlines:Sprite;
   //J #horizlines = NaN;
   private horizlines: Sprite;
   //O private var vertlines:Sprite;
   //J #vertlines = NaN;
   private vertlines: Sprite;

   // Reusable array index
   //O private var i:int;
   //J #i = 0;
   private i: number = 0;

   //O public function Grid():void{
   constructor ()
   {
      super();

      //O horizlines = new Sprite();
      //J this.#horizlines = new PIXI.Graphics();
      this.horizlines = new PIXI.Sprite();
      //O vertlines = new Sprite();
      //J this.#vertlines = new PIXI.Graphics();
      this.vertlines = new PIXI.Sprite();
      //O gridlines = new Array();
      //J this.#gridlines = new Array();
      this.gridlines = new Array();

      //O grid = new Sprite();
      //J this.#grid = new PIXI.Graphics();
      this.grid = new PIXI.Graphics();
      //O xaxis = new Sprite();
      //J this.#xaxis = new PIXI.Graphics();
      this.xaxis = new PIXI.Graphics();
      //O yaxis = new Sprite();
      //J this.#yaxis = new PIXI.Graphics();
      this.yaxis = new PIXI.Graphics();

      //J this.#drawBlank();
      this.drawBlank();

      //J this.#drawAxes();
      this.drawAxes();

      // Draw grid lines
      //O drawGrid();
      //J this.#drawGrid();
      this.drawGrid();

      //O addChild(grid);
      //J this.addChild(this.#grid);
      this.addChild(this.grid);
      //O grid.addChild(horizlines);
      //J this.#grid.addChild(this.#horizlines);
      this.grid.addChild(this.horizlines);
      //O grid.addChild(vertlines);
      //J this.#grid.addChild(this.#vertlines);
      this.grid.addChild(this.vertlines);
   }

   //O private function drawBlank():void
   //J #drawBlank()
   private drawBlank()
   {
      // a blank background is necessary for the grid to detect mouse events

      //O var blank:Shape = new Shape();
      //C Hmmm
      // var blank = new PIXI.Sprite();
      //J var blank = new PIXI.Graphics();
      var blank = new PIXI.Graphics();
      //O blank.graphics.beginFill(0xffffff);
      //J blank.beginFill(0xffffff);
      blank.beginFill(0xffffff);
      //J blank.drawRect(0,0,Global.docwidth,Global.docheight);
      blank.drawRect(0,0,Global.docwidth,Global.docheight);
      //J blank.endFill();
      blank.endFill();

      blank.alpha = 0;
      //O addChild(blank);
      //J this.addChild(blank);
      this.addChild(blank);
   }

   //O private function drawAxes():void
   //J #drawAxes()
   private drawAxes()
   {
      // draw axes for origin
      //N The plural of axis is axes ;-)
      //O var yg:Graphics = yaxis.graphics;
      //J var yg = this.#yaxis;
      var yg = this.yaxis;
      //O var xg:Graphics = xaxis.graphics;
      //J var xg = this.#xaxis;
      var xg = this.xaxis;

      //O yg.lineStyle(1,0,0.5,true,LineScaleMode.NONE);
      //J yg.lineStyle(1,0,0.5,true, this.LineScaleModeDotNONE);
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
      //J yg.moveTo(0,0);
      yg.moveTo(0,0);
      //J yg.lineTo(0,Global.docheight);
      yg.lineTo(0,Global.docheight);
      //O yaxis.x = Global.xorigin;
      //J this.#yaxis.x = Global.xorigin;
      this.yaxis.x = Global.xorigin;

      //O xg.lineStyle(1,0,0.5,true,LineScaleMode.NONE);
      //J xg.lineStyle(1,0,0.5,true, this.LineScaleModeDotNONE);
      xg.lineStyle(1,0,0.5,0.5, true);
      //J xg.moveTo(0,0);
      xg.moveTo(0,0);
      //J xg.lineTo(Global.docwidth,0);
      xg.lineTo(Global.docwidth,0);
      //O xaxis.y = Global.yorigin;
      //J this.#xaxis.y = Global.yorigin;
      this.xaxis.y = Global.yorigin;

      //O addChild(yaxis);
      //J this.addChild(this.#yaxis);
      this.addChild(this.yaxis);
      //O addChild(xaxis);
      //J this.addChild(this.#xaxis);
      this.addChild(this.xaxis);
   }

   //O private function redrawAxes():void
   //J #redrawAxes()
   private redrawAxes()
   {
      //O xaxis.y = Global.yorigin;
      //J this.#xaxis.y = Global.yorigin;
      this.xaxis.y = Global.yorigin;
      //O yaxis.x = Global.xorigin;
      //J this.#yaxis.x = Global.xorigin;
      this.yaxis.x = Global.xorigin;
   }

   //O private function drawGrid():void 
   //J #drawGrid()
   private drawGrid()
   {
      // set grid spacing
      //O gridxnum = Math.ceil(Global.docwidth/Global.zoom);
      //J this.#gridxnum = Math.ceil(Global.docwidth/Global.zoom);
      this.gridxnum = Math.ceil(Global.docwidth/Global.zoom);
      //O gridynum = Math.ceil(Global.docheight/Global.zoom);
      //J this.#gridynum = Math.ceil(Global.docheight/Global.zoom);
      this.gridynum = Math.ceil(Global.docheight/Global.zoom);

      // set position of offset variables
      //O yoffset = Global.yorigin - Math.floor(Global.yorigin/Global.zoom)*Global.zoom;
      //J this.#yoffset = Global.yorigin - Math.floor(Global.yorigin/Global.zoom)*Global.zoom;
      this.yoffset = Global.yorigin - Math.floor(Global.yorigin/Global.zoom)*Global.zoom;
      //O xoffset = Global.xorigin - Math.floor(Global.xorigin/Global.zoom)*Global.zoom;
      //J this.#xoffset = Global.xorigin - Math.floor(Global.xorigin/Global.zoom)*Global.zoom;
      this.xoffset = Global.xorigin - Math.floor(Global.xorigin/Global.zoom)*Global.zoom;

      //O var ypos:int = 0;
      //J var ypos = 0;
      var ypos: number = 0;
      //O var xpos:int = 0;
      //J var xpos = 0;
      var xpos: number = 0;

      // draw horizontal lines
      //O for (i = 0; i <= gridynum; i++)
      //J for ( this.#i = 0; this.#i <= this.#gridynum; this.#i++ )
      for ( this.i = 0; this.i <= this.gridynum; this.i++ )
      {
         //O ypos = i * Global.zoom + yoffset;
         //J ypos = this.#i * Global.zoom + this.#yoffset;
         ypos = this.i * Global.zoom + this.yoffset;
         if ( ypos != 0 )
         {
            //O gridlines[i] = new Shape();
            //J this.#gridlines[this.#i] = new PIXI.Graphics();
            this.gridlines[this.i] = new PIXI.Graphics();
            //O drawHorizLine(gridlines[i]);
            //J this.#drawHorizLine(this.#gridlines[this.#i]);
            this.drawHorizLine(this.gridlines[this.i]);
            //O gridlines[i].y = ypos;
            //J this.#gridlines[this.#i].y = ypos;
            this.gridlines[this.i].y = ypos;
         }
      }

      // draw vertical lines
      //O for (i = 0; i <= gridxnum; i++)
      //J for ( this.#i = 0; this.#i <= this.#gridxnum; this.#i++ )
      for ( this.i = 0; this.i <= this.gridxnum; this.i++ )
      {
         //O xpos = i*Global.zoom + xoffset;
         //J xpos = this.#i * Global.zoom + this.#xoffset;
         xpos = this.i * Global.zoom + this.xoffset;
         if ( xpos != 0 )
         {
            //O gridlines[i] = new Shape();
            //J this.#gridlines[this.#i] = new PIXI.Graphics();
            this.gridlines[this.i] = new PIXI.Graphics();
            //O drawVertLine(gridlines[i]);
            //J this.#drawVertLine(this.#gridlines[this.#i]);
            this.drawVertLine(this.gridlines[this.i]);
            //O gridlines[i].x = xpos;
            //J this.#gridlines[this.#i].x = xpos;
            this.gridlines[this.i].x = xpos;
         }
      }
   }

   //O public function redrawGrid():void
   //J redrawGrid()
   redrawGrid():void
   {
      if ( Global.zoom < 10 ) {
         //O redrawGridLarge();
         this.redrawGridLarge();
         return;
      }
      //O this.graphics.clear();
      //J this.graphics.clear();
      this.clear();

      // set grid spacing
      //O gridxnum = Math.ceil(Global.docwidth/Global.zoom);
      //J this.#gridxnum = Math.ceil(Global.docwidth/Global.zoom);
      this.gridxnum = Math.ceil(Global.docwidth/Global.zoom);
      //O gridynum = Math.ceil(Global.docheight/Global.zoom);
      //J this.#gridynum = Math.ceil(Global.docheight/Global.zoom);
      this.gridynum = Math.ceil(Global.docheight/Global.zoom);

      // set position of offset variables
      //O yoffset = Global.yorigin - Math.floor(Global.yorigin/Global.zoom)*Global.zoom;
      //J this.#yoffset = Global.yorigin - Math.floor(Global.yorigin/Global.zoom)*Global.zoom;
      this.yoffset = Global.yorigin - Math.floor(Global.yorigin/Global.zoom)*Global.zoom;
      //O xoffset = Global.xorigin - Math.floor(Global.xorigin/Global.zoom)*Global.zoom;
      //J this.#xoffset = Global.xorigin - Math.floor(Global.xorigin/Global.zoom)*Global.zoom;
      this.xoffset = Global.xorigin - Math.floor(Global.xorigin/Global.zoom)*Global.zoom;

      //O var ypos:int = 0;
      //J var ypos = 0;
      var ypos: number = 0;
      //O var xpos:int = 0;
      //J var xpos = 0;
      var xpos: number = 0;

      // reposition existing horizontal lines
      //O for (i = 0; i < horizlines.numChildren; i++)
      //J for ( this.#i = 0; this.#i < this.#horizlines.numChildren; this.#i++ )
      for ( this.i = 0; this.i < this.horizlines.children.length; this.i++ )
      {
         //O ypos = i*Global.zoom + yoffset;
         //J ypos = this.#i * Global.zoom + this.#yoffset;
         ypos = this.i * Global.zoom + this.yoffset;
         //O horizlines.getChildAt(i).y = ypos;
         //J this.#horizlines.getChildAt(this.#i).y = ypos;
         this.horizlines.getChildAt(this.i).y = ypos;
      }

      // reposition existing vertical lines
      //O for (i = 0; i < vertlines.numChildren; i++)
      //J for ( this.#i = 0; this.#i < this.#vertlines.numChildren; this.#i++ )
      for ( this.i = 0; this.i < this.vertlines.children.length; this.i++ )
      {
         //O xpos = i*Global.zoom + xoffset;
         //J xpos = this.#i * Global.zoom + this.#xoffset;
         xpos = this.i * Global.zoom + this.xoffset;
         //O vertlines.getChildAt(i).x = xpos;
         //J this.#vertlines.getChildAt(this.#i).x = xpos;
         this.vertlines.getChildAt(this.i).x = xpos;
      }

      // add more horizontal lines as needed
      //O if ( gridynum > horizlines.numChildren )
      //J if ( this.#gridynum > this.#horizlines.numChildren )
      if ( this.gridynum > this.horizlines.children.length )
      {
         //O for ( i=horizlines.numChildren; i <= gridynum; i++ )
         //J for ( this.#i=this.#horizlines.numChildren; this.#i <= this.#gridynum; this.#i++ )
         for ( this.i=this.horizlines.children.length; this.i <= this.gridynum; this.i++ )
         {
            //O ypos = i*Global.zoom + yoffset;
            //J ypos = this.#i * Global.zoom + this.#yoffset;
            ypos = this.i * Global.zoom + this.yoffset;
            if ( ypos != 0 )
            {
               //O gridlines[i] = new Shape();
               //J this.#gridlines[this.#i] = new PIXI.Graphics();
               this.gridlines[this.i] = new PIXI.Graphics();
               //O drawHorizLine(gridlines[i]);
               //J this.#drawHorizLine(this.#gridlines[this.#i]);
               this.drawHorizLine(this.gridlines[this.i]);
               //O gridlines[i].y = ypos;
               //J this.#gridlines[this.#i].y = ypos;
               this.gridlines[this.i].y = ypos;
            }
         }
      }
      //O  else if ( gridynum < horizlines.numChildren )
      //J else if ( this.#gridynum < this.#horizlines.numChildren )
      else if ( this.gridynum < this.horizlines.children.length )
      {
         // remove vertical grid lines as needed
         //O while ( horizlines.numChildren > gridynum )
         //J while ( this.#horizlines.numChildren > this.#gridynum )
         while ( this.horizlines.children.length > this.gridynum )
         {
            //O horizlines.removeChildAt(gridynum);
            //J this.#horizlines.removeChildAt(this.#gridynum);
            this.horizlines.removeChildAt(this.gridynum);
         }
      }

      // add more vertical lines as needed
      //O if ( gridxnum > vertlines.numChildren )
      //J if ( this.#gridxnum > this.#vertlines.numChildren )
      if ( this.gridxnum > this.vertlines.children.length )
      {
         //O for ( i=vertlines.numChildren; i <= gridxnum; i++ )
         //J for ( this.#i = this.#vertlines.numChildren; this.#i <=  this.#gridxnum; this.#i++ )
         for ( this.i = this.vertlines.children.length; this.i <=  this.gridxnum; this.i++ )
         {
            //O xpos = i*Global.zoom + xoffset;
            //J xpos = this.#i * Global.zoom + this.#xoffset;
            xpos = this.i * Global.zoom + this.xoffset;
            if ( xpos != 0 )
            {
               //O gridlines[i] = new Shape();
               //J this.#gridlines[this.#i] = new PIXI.Graphics();
               this.gridlines[this.i] = new PIXI.Graphics();
               //O drawVertLine(gridlines[i]);
               //J this.#drawVertLine(this.#gridlines[this.#i]);
               this.drawVertLine(this.gridlines[this.i]);
               //O gridlines[i].x = xpos;
               //J this.#gridlines[this.#i].x = xpos;
               this.gridlines[this.i].x = xpos;
            }
         }
      }
      //O else if ( gridxnum < vertlines.numChildren )
      //J else if ( this.#gridxnum < this.#vertlines.numChildren )
      else if ( this.gridxnum < this.vertlines.children.length )
      {
         // remove vertical grid lines as needed
         //O while ( vertlines.numChildren > gridxnum )
         //J while ( this.#vertlines.numChildren > this.#gridxnum )
         while ( this.vertlines.children.length > this.gridxnum )
         {
            //O vertlines.removeChildAt(gridxnum);
            //J this.#vertlines.removeChildAt(this.#gridxnum);
            this.vertlines.removeChildAt(this.gridxnum);
         }
      }
   }

   //O public function redrawGridLarge():void
   //J redrawGridLarge()
   redrawGridLarge():void
   {
      // apparently drawing a rectangle as a background will hurt performance when using hardware acceleration, revise later..
      //J this.graphics.beginFill(0xeeeeee);
      //FixMe fixme Fixme fixMe
      //We are not a graphic. I could create one, but the note above says otherwise.  for now, leave blank
      //this.beginFill(0xeeeeee);
      //J this.graphics.drawRect(0,0,this.width,this.height);
      //FixMe fixme Fixme fixMe
      //this.drawRect(0,0,this.width,this.height);
      //J this.graphics.endFill();
      //FixMe fixme Fixme fixMe
      //this.endFill();

      // set grid spacing

      //J var offset = 0;
      var offset = 0;

      //J if ( Global.unit == "cm" )
      if ( Global.unit == "cm" )
      {
         //J offset = 100;
         offset = 100;

      } else
      {
         //J offset = 12;
         offset = 12;
      }

      //O gridxnum = Math.ceil(Global.docwidth/(Global.zoom*offset));
      //J this.#gridxnum = Math.ceil(Global.docwidth/(Global.zoom*offset));
      this.gridxnum = Math.ceil(Global.docwidth/(Global.zoom*offset));
      //O gridynum = Math.ceil(Global.docheight/(Global.zoom*offset));
      //J this.#gridynum = Math.ceil(Global.docheight/(Global.zoom*offset));
      this.gridynum = Math.ceil(Global.docheight/(Global.zoom*offset));

      // set position of offset variables
      //O yoffset = Global.yorigin - Math.floor(Global.yorigin/(Global.zoom*offset))*Global.zoom*offset;
      //J this.#yoffset = Global.yorigin - Math.floor(Global.yorigin/(Global.zoom*offset))*Global.zoom*offset;
      this.yoffset = Global.yorigin - Math.floor(Global.yorigin/(Global.zoom*offset))*Global.zoom*offset;
      //O xoffset = Global.xorigin - Math.floor(Global.xorigin/(Global.zoom*offset))*Global.zoom*offset;
      //J this.#xoffset = Global.xorigin - Math.floor(Global.xorigin/(Global.zoom*offset))*Global.zoom*offset;
      this.xoffset = Global.xorigin - Math.floor(Global.xorigin/(Global.zoom*offset))*Global.zoom*offset;

      //O var ypos:int = 0;
      //J var ypos = 0;
      var ypos: number = 0;
      //O var xpos:int = 0;
      //J var xpos = 0;
      var xpos: number = 0;

      // reposition existing horizontal lines
      //O for (i = 0; i < horizlines.numChildren; i++)
      //J for ( this.#i = 0; this.#i < this.#horizlines.numChildren; this.#i++ )
      for ( this.i = 0; this.i < this.horizlines.children.length; this.i++ )
      {
         //O ypos = i*Global.zoom*offset + yoffset;
         //J ypos = this.#i * Global.zoom*offset + this.#yoffset;
         ypos = this.i * Global.zoom*offset + this.yoffset;
         //O horizlines.getChildAt(i).y = ypos;
         //J this.#horizlines.getChildAt(this.#i).y = ypos;
         this.horizlines.getChildAt(this.i).y = ypos;
      }

      // reposition existing vertical lines
      //O for (i = 0; i < vertlines.numChildren; i++)
      //J for ( this.#i = 0; this.#i < this.#vertlines.numChildren; this.#i++ )
      for ( this.i = 0; this.i < this.vertlines.children.length; this.i++ )
      {
         //O xpos = i*Global.zoom*offset + xoffset;
         //J xpos = this.#i * Global.zoom*offset + this.#xoffset;
         xpos = this.i * Global.zoom*offset + this.xoffset;
         //O vertlines.getChildAt(i).x = xpos;
         //J this.#vertlines.getChildAt(this.#i).x = xpos;
         this.vertlines.getChildAt(this.i).x = xpos;
      }

      // add more horizontal lines as needed
      //O if ( gridynum > horizlines.numChildren )
      //J if ( this.#gridynum > this.#horizlines.numChildren )
      if ( this.gridynum > this.horizlines.children.length )
      {
         //O for ( i=horizlines.numChildren; i <= gridynum; i++ )
         //J for ( this.#i= this.#horizlines.numChildren; this.#i <=  this.#gridynum; this.#i++ )
         for ( this.i= this.horizlines.children.length; this.i <=  this.gridynum; this.i++ )
         {
            //O ypos = i*Global.zoom*offset + yoffset;
            //J ypos = this.#i * Global.zoom*offset + this.#yoffset;
            ypos = this.i * Global.zoom*offset + this.yoffset;
            //J if ( ypos != 0 )
            if ( ypos != 0 )
            {
               //O gridlines[i] = new Shape();
               //J this.#gridlines[this.#i] = new PIXI.Graphics();
               this.gridlines[this.i] = new PIXI.Graphics();
               //O drawHorizLine(gridlines[i]);
               //J this.#drawHorizLine(this.#gridlines[this.#i]);
               this.drawHorizLine(this.gridlines[this.i]);
               //O gridlines[i].y = ypos;
               //J this.#gridlines[this.#i].y = ypos;
               this.gridlines[this.i].y = ypos;
            }
         }
      }
      //O else if ( gridynum < horizlines.numChildren )
      //J else if ( this.#gridynum < this.#horizlines.numChildren )
      else if ( this.gridynum < this.horizlines.children.length )
      {
         // remove vertical grid lines as needed
         //O while ( horizlines.numChildren > gridynum )
         //J while ( this.#horizlines.numChildren > this.#gridynum )
         while ( this.horizlines.children.length > this.gridynum )
         {
            //O horizlines.removeChildAt(gridynum);
            //J this.#horizlines.removeChildAt(this.#gridynum);
            this.horizlines.removeChildAt(this.gridynum);
         }
      }

      // add more vertical lines as needed
      //O if ( gridxnum > vertlines.numChildren )
      //J if ( this.#gridxnum > this.#vertlines.numChildren )
      if ( this.gridxnum > this.vertlines.children.length )
      {
         //O for ( i=vertlines.numChildren; i <= gridxnum; i++ )
         //J for ( this.#i=this.#vertlines.numChildren; this.#i <= this.#gridxnum; this.#i++ )
         for ( this.i=this.vertlines.children.length; this.i <= this.gridxnum; this.i++ )
         {
            //O xpos = i*Global.zoom*offset + xoffset;
            //J xpos = this.#i * Global.zoom*offset + this.#xoffset;
            xpos = this.i * Global.zoom*offset + this.xoffset;
            //J if ( xpos != 0 )
            if ( xpos != 0 )
            {
               //O gridlines[i] = new Shape();
               //J this.#gridlines[this.#i] = new PIXI.Graphics();
               this.gridlines[this.i] = new PIXI.Graphics();
               //O drawVertLine(gridlines[i]);
               //J this.#drawVertLine(this.#gridlines[this.#i]);
               this.drawVertLine(this.gridlines[this.i]);
               //O gridlines[i].x = xpos;
               //J this.#gridlines[this.#i].x = xpos;
               this.gridlines[this.i].x = xpos;
            }
         }
      }
      //O else if ( gridxnum < vertlines.numChildren )
      //J else if ( this.#gridxnum < this.#vertlines.numChildren )
      else if ( this.gridxnum < this.vertlines.children.length )
      {
         // remove vertical grid lines as needed
         //O while ( vertlines.numChildren > gridxnum )
         //J while ( this.#vertlines.numChildren > this.#gridxnum )
         while ( this.vertlines.children.length > this.gridxnum )
         {
            //O vertlines.removeChildAt(gridxnum);
            //J this.#vertlines.removeChildAt(this.#gridxnum);
            this.vertlines.removeChildAt(this.gridxnum);
         }
      }
   }

   //O private function drawHorizLine(line:Shape):void
   //O drawHorizLine(line)
   //J #drawHorizLine(line)
   private drawHorizLine(line: Graphics)
   {
      // dotted line
      //O for(var j=0; j<Global.docwidth; j+=4)
      //J for ( var j=0; j<Global.docwidth; j+=4 )
      for ( var j=0; j<Global.docwidth; j+=4 )
      {
         //O line.graphics.beginFill(0x999999);
         //J line.beginFill(0x999999);
         line.beginFill(0x999999);
         //O line.graphics.beginFill(0x999999);
         //J line.beginFill(0x999999);
         line.beginFill(0x999999);
         //O line.graphics.drawRect(j,0,1,1);
         //J line.drawRect(j,0,1,1);
         line.drawRect(j,0,1,1);
         //O line.graphics.endFill();
         //J line.endFill();
         line.endFill();
      }

      //O horizlines.addChild(line);
      //J this.#horizlines.addChild(line);
      this.horizlines.addChild(line);
   }

   //O private function drawVertLine(line:Shape):void
   //O drawVertLine(line)
   //J #drawVertLine(line)
   private drawVertLine(line: Graphics)
   {
      // dotted line
      //J for ( var j=0; j<Global.docheight; j+=4 )
      for ( var j=0; j<Global.docheight; j+=4 )
      {
         //O line.graphics.beginFill(0x999999);
         //J line.beginFill(0x999999);
         line.beginFill(0x999999);
         //O line.graphics.drawRect(0,j,1,1);
         //J line.drawRect(0,j,1,1);
         line.drawRect(0,j,1,1);
         //O line.graphics.endFill();
         //J line.endFill();
         line.endFill();
      }

      //O vertlines.addChild(line);
      //J this.#vertlines.addChild(line);
      this.vertlines.addChild(line);
   }

   //O  public function setOrigin():void
   //J setOrigin()
   setOrigin()
   {
      //O redrawAxes();
      //J this.#redrawAxes();
      this.redrawAxes();
      //O redrawGrid();
      //J redrawGrid();
      this.redrawGrid();
   }

   //O public function clear():void
   //J clear()
   public clear()
   {
      //J while ( this.numChildren > 0 )
      while ( this.children.length > 0 )
      {
         //J removeChildAt(0);
         this.removeChildAt(0);
      }
   }
}

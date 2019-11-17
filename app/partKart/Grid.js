//O import flash.display.*;
//O import flash.events.*;
//O import { Point } from '@pixi/math';
import * as PIXI from 'pixi.js'
//import { Sprite } from '@pixi/sprite';
//import { Graphics } from '@pixi/graphics';
import Global  from '../../app/partKart/Global.js';

//O public class Grid extends Sprite
//C export default class Grid extends Sprite
//C export default class Grid extends Graphics
export default class Grid extends PIXI.Graphics
{
   // the grid class draws the grid and origin axes based on the current zoom level and origin position
   //N The plural of axis is axes ;-)

   //C LineScaleMode is not Defined in Pixi.
   //C It is supposed to represent a line of continious width.
   //C Pixi has the default Linestyle width of zero, so this may work.
   #LineScaleModeDotNONE = 0;

   //O private var xaxis:Sprite;
   #xaxis = NaN;
   //O private var yaxis:Sprite;
   #yaxis = NaN;
   //O private var grid:Sprite;
   #grid = NaN;

   //O private var gridlines:Array;
   #gridlines = [];

   //O private var gridxnum:int;
   #gridxnum = 0;
   //O private var gridynum:int;
   #gridynum = 0;

   //O private var yoffset:int = 0;
   #yoffset = 0;
   //O private var xoffset:int = 0;
   #xoffset = 0;

   //O private var horizlines:Sprite;
   #horizlines = NaN;
   //O private var vertlines:Sprite;
   #vertlines = NaN;

   // Reusable array index
   //O private var i:int;
   #i = 0;

   //O public function Grid():void{
   constructor ()
   {
      super();

      //O horizlines = new Sprite();
      this.#horizlines = new PIXI.Graphics();
      //O vertlines = new Sprite();
      this.#vertlines = new PIXI.Graphics();
      //O gridlines = new Array();
      this.#gridlines = new Array();

      //O grid = new Sprite();
      this.#grid = new PIXI.Graphics();
      //O xaxis = new Sprite();
      this.#xaxis = new PIXI.Graphics();
      //O yaxis = new Sprite();
      this.#yaxis = new PIXI.Graphics();

      this.#drawBlank();

      this.#drawAxes();

      // Draw grid lines
      //O drawGrid();
      this.#drawGrid();

      //O addChild(grid);
      this.addChild(this.#grid);
      //O grid.addChild(horizlines);
      this.#grid.addChild(this.#horizlines);
      //O grid.addChild(vertlines);
      this.#grid.addChild(this.#vertlines);
   }

   //O private function drawBlank():void
   #drawBlank()
   {
      // a blank background is necessary for the grid to detect mouse events

      //O var blank:Shape = new Shape();
      //C Hmmm
      // var blank = new PIXI.Sprite();
      var blank = new PIXI.Graphics();
      //O blank.graphics.beginFill(0xffffff);
      blank.beginFill(0xffffff);
      blank.drawRect(0,0,Global.docwidth,Global.docheight);
      blank.endFill();

      blank.alpha = 0;
      //O addChild(blank);
      this.addChild(blank);
   }

   //O private function drawAxes():void
   #drawAxes()
   {
      // draw axes for origin
      //N The plural of axis is axes ;-)
      //O var yg:Graphics = yaxis.graphics;
      var yg = this.#yaxis;
      //O var xg:Graphics = xaxis.graphics;
      var xg = this.#xaxis;

      //O yg.lineStyle(1,0,0.5,true,LineScaleMode.NONE);
      yg.lineStyle(1,0,0.5,true, this.LineScaleModeDotNONE);
      yg.moveTo(0,0);
      yg.lineTo(0,Global.docheight);
      //O yaxis.x = Global.xorigin;
      this.#yaxis.x = Global.xorigin;

      //O xg.lineStyle(1,0,0.5,true,LineScaleMode.NONE);
      xg.lineStyle(1,0,0.5,true, this.LineScaleModeDotNONE);
      xg.moveTo(0,0);
      xg.lineTo(Global.docwidth,0);
      //O xaxis.y = Global.yorigin;
      this.#xaxis.y = Global.yorigin;

      //O addChild(yaxis);
      this.addChild(this.#yaxis);
      //O addChild(xaxis);
      this.addChild(this.#xaxis);
   }

   //O private function redrawAxes():void
   #redrawAxes()
   {
      //O xaxis.y = Global.yorigin;
      this.#xaxis.y = Global.yorigin;
      //O yaxis.x = Global.xorigin;
      this.#yaxis.x = Global.xorigin;
   }

   //O private function drawGrid():void 
   #drawGrid()
   {
      // set grid spacing
      //O gridxnum = Math.ceil(Global.docwidth/Global.zoom);
      this.#gridxnum = Math.ceil(Global.docwidth/Global.zoom);
      //O gridynum = Math.ceil(Global.docheight/Global.zoom);
      this.#gridynum = Math.ceil(Global.docheight/Global.zoom);

      // set position of offset variables
      //O yoffset = Global.yorigin - Math.floor(Global.yorigin/Global.zoom)*Global.zoom;
      this.#yoffset = Global.yorigin - Math.floor(Global.yorigin/Global.zoom)*Global.zoom;
      //O xoffset = Global.xorigin - Math.floor(Global.xorigin/Global.zoom)*Global.zoom;
      this.#xoffset = Global.xorigin - Math.floor(Global.xorigin/Global.zoom)*Global.zoom;

      //O var ypos:int = 0;
      var ypos = 0;
      //O var xpos:int = 0;
      var xpos = 0;

      // draw horizontal lines
      //O for (i = 0; i <= gridynum; i++)
      for ( var i = 0; i <= this.#gridynum; i++ )
      {
         //O ypos = i * Global.zoom + yoffset;
         ypos = i * Global.zoom + this.#yoffset;
         if ( ypos != 0 )
         {
            //O gridlines[i] = new Shape();
            this.#gridlines[i] = new PIXI.Graphics();
            //O drawHorizLine(gridlines[i]);
            this.#drawHorizLine(this.#gridlines[i]);
            //O gridlines[i].y = ypos;
            this.#gridlines[i].y = ypos;
         }
      }

      // draw vertical lines
      //O for (i = 0; i <= gridxnum; i++)
      for ( var i = 0; i <= this.#gridxnum; i++ )
      {
         //O xpos = i*Global.zoom + xoffset;
         xpos = i * Global.zoom + this.#xoffset;
         if ( xpos != 0 )
         {
            //O gridlines[i] = new Shape();
            this.#gridlines[i] = new PIXI.Graphics();
            //O drawVertLine(gridlines[i]);
            this.#drawVertLine(this.#gridlines[i]);
            //O gridlines[i].x = xpos;
            this.#gridlines[i].x = xpos;
         }
      }
   }

   //O public function redrawGrid():void
   redrawGrid()
   {
      if ( Global.zoom < 10 ) {
         redrawGridLarge();
         return;
      }
      this.graphics.clear();

      // set grid spacing
      //O gridxnum = Math.ceil(Global.docwidth/Global.zoom);
      this.#gridxnum = Math.ceil(Global.docwidth/Global.zoom);
      //O gridynum = Math.ceil(Global.docheight/Global.zoom);
      this.#gridynum = Math.ceil(Global.docheight/Global.zoom);

      // set position of offset variables
      //O yoffset = Global.yorigin - Math.floor(Global.yorigin/Global.zoom)*Global.zoom;
      this.#yoffset = Global.yorigin - Math.floor(Global.yorigin/Global.zoom)*Global.zoom;
      //O xoffset = Global.xorigin - Math.floor(Global.xorigin/Global.zoom)*Global.zoom;
      this.#xoffset = Global.xorigin - Math.floor(Global.xorigin/Global.zoom)*Global.zoom;

      //O var ypos:int = 0;
      var ypos = 0;
      //O var xpos:int = 0;
      var xpos = 0;

      // reposition existing horizontal lines
      //O for (i = 0; i < horizlines.numChildren; i++)
      for ( var i = 0; i < this.#horizlines.numChildren; i++ )
      {
         //O ypos = i*Global.zoom + yoffset;
         ypos = i * Global.zoom + this.#yoffset;
         //O horizlines.getChildAt(i).y = ypos;
         this.#horizlines.getChildAt(i).y = ypos;
      }

      // reposition existing vertical lines
      //O for (i = 0; i < vertlines.numChildren; i++)
      for ( var i = 0; i < this.#vertlines.numChildren; i++ )
      {
         //O xpos = i*Global.zoom + xoffset;
         xpos = i*Global.zoom + this.#xoffset;
         //O vertlines.getChildAt(i).x = xpos;
         this.#vertlines.getChildAt(i).x = xpos;
      }

      // add more horizontal lines as needed
      //O if ( gridynum > horizlines.numChildren )
      if ( this.#gridynum > this.#horizlines.numChildren )
      {
         //O for ( i=horizlines.numChildren; i <= gridynum; i++ )
         for ( var i=this.#horizlines.numChildren; i <= this.#gridynum; i++ )
         {
            //O ypos = i*Global.zoom + yoffset;
            ypos = i * Global.zoom + this.#yoffset;
            if ( ypos != 0 )
            {
               //O gridlines[i] = new Shape();
               this.#gridlines[i] = new PIXI.Graphics();
               //O drawHorizLine(gridlines[i]);
               this.#drawHorizLine(this.#gridlines[i]);
               //O gridlines[i].y = ypos;
               this.#gridlines[i].y = ypos;
            }
         }
      }
      //O  else if ( gridynum < horizlines.numChildren )
      else if ( this.#gridynum < this.#horizlines.numChildren )
      {
         // remove vertical grid lines as needed
         //O while ( horizlines.numChildren > gridynum )
         while ( this.#horizlines.numChildren > this.#gridynum )
         {
            //O horizlines.removeChildAt(gridynum);
            this.#horizlines.removeChildAt(this.#gridynum);
         }
      }

      // add more vertical lines as needed
      //O if ( gridxnum > vertlines.numChildren )
      if ( this.#gridxnum > this.#vertlines.numChildren )
      {
         //O for ( i=vertlines.numChildren; i <= gridxnum; i++ )
         for ( var i = this.#vertlines.numChildren; i <=  this.#gridxnum; i++ )
         {
            //O xpos = i*Global.zoom + xoffset;
            xpos = i * Global.zoom + this.#xoffset;
            if ( xpos != 0 )
            {
               //O gridlines[i] = new Shape();
               this.#gridlines[i] = new PIXI.Graphics();
               //O drawVertLine(gridlines[i]);
               this.#drawVertLine(this.#gridlines[i]);
               //O gridlines[i].x = xpos;
               this.#gridlines[i].x = xpos;
            }
         }
      }
      //O else if ( gridxnum < vertlines.numChildren )
      else if ( this.#gridxnum < this.#vertlines.numChildren )
      {
         // remove vertical grid lines as needed
         //O while ( vertlines.numChildren > gridxnum )
         while ( this.#vertlines.numChildren > this.#gridxnum )
         {
            //O vertlines.removeChildAt(gridxnum);
            this.#vertlines.removeChildAt(this.#gridxnum);
         }
      }
   }

   //O public function redrawGridLarge():void
   redrawGridLarge()
   {
      // apparently drawing a rectangle as a background will hurt performance when using hardware acceleration, revise later..
      this.graphics.beginFill(0xeeeeee);
      this.graphics.drawRect(0,0,this.width,this.height);
      this.graphics.endFill();

      // set grid spacing

      var offset = 0;

      if ( Global.unit == "cm" )
      {
         offset = 100;

      } else
      {
         offset = 12;
      }

      //O gridxnum = Math.ceil(Global.docwidth/(Global.zoom*offset));
      this.#gridxnum = Math.ceil(Global.docwidth/(Global.zoom*offset));
      //O gridynum = Math.ceil(Global.docheight/(Global.zoom*offset));
      this.#gridynum = Math.ceil(Global.docheight/(Global.zoom*offset));

      // set position of offset variables
      //O yoffset = Global.yorigin - Math.floor(Global.yorigin/(Global.zoom*offset))*Global.zoom*offset;
      this.#yoffset = Global.yorigin - Math.floor(Global.yorigin/(Global.zoom*offset))*Global.zoom*offset;
      //O xoffset = Global.xorigin - Math.floor(Global.xorigin/(Global.zoom*offset))*Global.zoom*offset;
      this.#xoffset = Global.xorigin - Math.floor(Global.xorigin/(Global.zoom*offset))*Global.zoom*offset;

      //O var ypos:int = 0;
      var ypos = 0;
      //O var xpos:int = 0;
      var xpos = 0;

      // reposition existing horizontal lines
      //O for (i = 0; i < horizlines.numChildren; i++)
      for ( var i = 0; i < this.#horizlines.numChildren; i++ )
      {
         //O ypos = i*Global.zoom*offset + yoffset;
         ypos = i * Global.zoom*offset + this.#yoffset;
         //O horizlines.getChildAt(i).y = ypos;
         this.#horizlines.getChildAt(i).y = ypos;
      }

      // reposition existing vertical lines
      //O for (i = 0; i < vertlines.numChildren; i++)
      for ( var i = 0; i < this.#vertlines.numChildren; i++ )
      {
         //O xpos = i*Global.zoom*offset + xoffset;
         xpos = i*Global.zoom*offset + this.#xoffset;
         //O vertlines.getChildAt(i).x = xpos;
         this.#vertlines.getChildAt(i).x = xpos;
      }

      // add more horizontal lines as needed
      //O if ( gridynum > horizlines.numChildren )
      if ( this.#gridynum > this.#horizlines.numChildren )
      {
         //O for ( i=horizlines.numChildren; i <= gridynum; i++ )
         for ( var i= this.#horizlines.numChildren; i <=  this.#gridynum; i++ )
         {
            //O ypos = i*Global.zoom*offset + yoffset;
            ypos = i*Global.zoom*offset + this.#yoffset;
            if ( ypos != 0 )
            {
               //O gridlines[i] = new Shape();
               this.#gridlines[i] = new PIXI.Graphics();
               //O drawHorizLine(gridlines[i]);
               this.#drawHorizLine(this.#gridlines[i]);
               //O gridlines[i].y = ypos;
               this.#gridlines[i].y = ypos;
            }
         }
      }
      //O else if ( gridynum < horizlines.numChildren )
      else if ( this.#gridynum < this.#horizlines.numChildren )
      {
         // remove vertical grid lines as needed
         //O while ( horizlines.numChildren > gridynum )
         while ( this.#horizlines.numChildren > this.#gridynum )
         {
            //O horizlines.removeChildAt(gridynum);
            this.#horizlines.removeChildAt(this.#gridynum);
         }
      }

      // add more vertical lines as needed
      //O if ( gridxnum > vertlines.numChildren )
      if ( this.#gridxnum > this.#vertlines.numChildren )
      {
         //O for ( i=vertlines.numChildren; i <= gridxnum; i++ )
         for ( var i=this.#vertlines.numChildren; i <= this.#gridxnum; i++ )
         {
            //O xpos = i*Global.zoom*offset + xoffset;
            xpos = i * Global.zoom*offset + this.#xoffset;
            if ( xpos != 0 )
            {
               //O gridlines[i] = new Shape();
               this.#gridlines[i] = new PIXI.Graphics();
               //O drawVertLine(gridlines[i]);
               this.#drawVertLine(this.#gridlines[i]);
               //O gridlines[i].x = xpos;
               this.#gridlines[i].x = xpos;
            }
         }
      }
      //O else if ( gridxnum < vertlines.numChildren )
      else if ( this.#gridxnum < this.#vertlines.numChildren )
      {
         // remove vertical grid lines as needed
         //O while ( vertlines.numChildren > gridxnum )
         while ( this.#vertlines.numChildren > this.#gridxnum )
         {
            //O vertlines.removeChildAt(gridxnum);
            this.#vertlines.removeChildAt(this.#gridxnum);
         }
      }
   }

   //O private function drawHorizLine(line:Shape):void
   //O drawHorizLine(line)
   #drawHorizLine(line)
   {
      // dotted line
      for ( var j=0; j<Global.docwidth; j+=4 )
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
      this.#horizlines.addChild(line);
   }

   //O private function drawVertLine(line:Shape):void
   //O drawVertLine(line)
   #drawVertLine(line)
   {
      // dotted line
      for ( var j=0; j<Global.docheight; j+=4 )
      {
         //O line.graphics.beginFill(0x999999);
         line.beginFill(0x999999);
         //O line.graphics.drawRect(0,j,1,1);
         line.drawRect(0,j,1,1);
         //O line.graphics.endFill();
         line.endFill();
      }

      //O vertlines.addChild(line);
      this.#vertlines.addChild(line);
   }

   //O  public function setOrigin():void
   setOrigin()
   {
      //O redrawAxes();
      this.#redrawAxes();
      //O redrawGrid();
      redrawGrid();
   }

   //O public function clear():void
   clear()
   {
      while ( numChildren > 0 )
      {
         removeChildAt(0);
      }
   }
}

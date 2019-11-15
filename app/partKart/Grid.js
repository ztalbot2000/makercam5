//import flash.display.*;
//import flash.events.*;
//import { Point } from '@pixi/math';
import { Sprite } from '@pixi/sprite';

//public class Grid extends Sprite
export default class Grid extends Sprite
{
   // the grid class draws the grid and origin axes based on the current zoom level and origin position

   //private var xaxis:Sprite;
   #xaxis = NaN;
   //private var yaxis:Sprite;
   #yaxis = NaN;
   //private var grid:Sprite;
   #grid = NaN;

   //private var gridlines:Array;
   #gridlines = [];

   //private var gridxnum:int;
   #gridxnum = 0;
   //private var gridynum:int;
   #gridynum = 0;

   //private var yoffset:int = 0;
   #yoffset = 0;
   //private var xoffset:int = 0;
   #xoffset = 0;

   //private var horizlines:Sprite;
   #horizlines = NaN;
   //private var vertlines:Sprite;
   #vertlines = NaN;

   // Reusable array index
   //private var i:int;
   #i = 0;

   //public function Grid():void{
   constructor ()
   {
      init();
   }

   // public function init():void
   init()
   {
      //horizlines = new Sprite();
      this.#horizlines = new Sprite();
      //vertlines = new Sprite();
      this.#vertlines = new Sprite();
      //gridlines = new Array();
      this.#gridlines = new Array();

      //grid = new Sprite();
      this.#grid = new Sprite();
      //xaxis = new Sprite();
      this.#xaxis = new Sprite();
      //yaxis = new Sprite();
      this.#yaxis = new Sprite();

      this.#drawBlank();

      this.#drawAxes();

      // Draw grid lines
      this.#drawGrid();
      addChild(this.#grid);
      this.#grid.addChild(this.#horizlines);
      this.#grid.addChild(this.#vertlines);
   }

   //private function drawBlank():void
   #drawBlank()
   {
      // a blank background is necessary for the grid to detect mouse events

      // var blank:Shape = new Shape();
      var blank = new Shape();
      blank.graphics.beginFill(0xffffff);
      blank.graphics.drawRect(0,0,Global.docwidth,Global.docheight);
      blank.graphics.endFill();

      blank.alpha = 0;
      addChild(blank);
   }

   //private function drawAxes():void
   #drawAxes()
   {
      // draw axes for origin
      //var yg:Graphics = yaxis.graphics;
      var yg = this.#yaxis.graphics;
      //var xg:Graphics = xaxis.graphics;
      var xg = this.#xaxis.graphics;

      yg.lineStyle(1,0,0.5,true,LineScaleMode.NONE);
      yg.moveTo(0,0);
      yg.lineTo(0,Global.docheight);
      //yaxis.x = Global.xorigin;
      this.#yaxis.x = Global.xorigin;

      xg.lineStyle(1,0,0.5,true,LineScaleMode.NONE);
      xg.moveTo(0,0);
      xg.lineTo(Global.docwidth,0);
      //xaxis.y = Global.yorigin;
      this.#xaxis.y = Global.yorigin;

      //addChild(yaxis);
      addChild(this.#yaxis);
      //addChild(xaxis);
      addChild(this.#xaxis);
   }

   //private function redrawAxes():void
   #redrawAxes()
   {
      //xaxis.y = Global.yorigin;
      this.#xaxis.y = Global.yorigin;
      //yaxis.x = Global.xorigin;
      this.#yaxis.x = Global.xorigin;
   }

   //private function drawGrid():void 
   #drawGrid()
   {
      // set grid spacing
      //gridxnum = Math.ceil(Global.docwidth/Global.zoom);
      this.#gridxnum = Math.ceil(Global.docwidth/Global.zoom);
      //gridynum = Math.ceil(Global.docheight/Global.zoom);
      this.#gridynum = Math.ceil(Global.docheight/Global.zoom);

      // set position of offset variables
      //yoffset = Global.yorigin - Math.floor(Global.yorigin/Global.zoom)*Global.zoom;
      this.#yoffset = Global.yorigin - Math.floor(Global.yorigin/Global.zoom)*Global.zoom;
      //xoffset = Global.xorigin - Math.floor(Global.xorigin/Global.zoom)*Global.zoom;
      this.#xoffset = Global.xorigin - Math.floor(Global.xorigin/Global.zoom)*Global.zoom;

      //var ypos:int = 0;
      var ypos = 0;
      //var xpos:int = 0;
      var xpos = 0;

      // draw horizontal lines
      //for (i = 0; i <= gridynum; i++)
      for (i = 0; i <= this.#gridynum; i++)
      {
         ypos = i * Global.zoom + yoffset;
         if ( ypos != 0 )
         {
            //gridlines[i] = new Shape();
            this.#gridlines[i] = new Shape();
            //drawHorizLine(gridlines[i]);
            this.#drawHorizLine(this.#gridlines[i]);
            //gridlines[i].y = ypos;
            this.#gridlines[i].y = ypos;
         }
      }

      // draw vertical lines
      //for (i = 0; i <= gridxnum; i++)
      for (i = 0; i <= this.#gridxnum; i++)
      {
         //xpos = i*Global.zoom + xoffset;
         xpos = i * Global.zoom + this.#xoffset;
         if ( xpos != 0 )
         {
            //gridlines[i] = new Shape();
            this.#gridlines[i] = new Shape();
            //drawVertLine(gridlines[i]);
            this.#drawVertLine(this.#gridlines[i]);
            //gridlines[i].x = xpos;
            this.#gridlines[i].x = xpos;
         }
      }
   }

   //public function redrawGrid():void
   redrawGrid()
   {
      if ( Global.zoom < 10 ) {
         redrawGridLarge();
         return;
      }
      this.graphics.clear();

      // set grid spacing
      //gridxnum = Math.ceil(Global.docwidth/Global.zoom);
      this.#gridxnum = Math.ceil(Global.docwidth/Global.zoom);
      //gridynum = Math.ceil(Global.docheight/Global.zoom);
      this.#gridynum = Math.ceil(Global.docheight/Global.zoom);

      // set position of offset variables
      //yoffset = Global.yorigin - Math.floor(Global.yorigin/Global.zoom)*Global.zoom;
      this.#yoffset = Global.yorigin - Math.floor(Global.yorigin/Global.zoom)*Global.zoom;
      //xoffset = Global.xorigin - Math.floor(Global.xorigin/Global.zoom)*Global.zoom;
      this.#xoffset = Global.xorigin - Math.floor(Global.xorigin/Global.zoom)*Global.zoom;

      //var ypos:int = 0;
      var ypos = 0;
      //var xpos:int = 0;
      var xpos = 0;

      // reposition existing horizontal lines
      //for (i = 0; i < horizlines.numChildren; i++)
      for (i = 0; i < this.#horizlines.numChildren; i++)
      {
         //ypos = i*Global.zoom + yoffset;
         ypos = i * Global.zoom + this.#yoffset;
         //horizlines.getChildAt(i).y = ypos;
         this.#horizlines.getChildAt(i).y = ypos;
      }

      // reposition existing vertical lines
      //for (i = 0; i < vertlines.numChildren; i++)
      for (i = 0; i < this.#vertlines.numChildren; i++)
      {
         //xpos = i*Global.zoom + xoffset;
         xpos = i*Global.zoom + this.#xoffset;
         //vertlines.getChildAt(i).x = xpos;
         this.#vertlines.getChildAt(i).x = xpos;
      }

      // add more horizontal lines as needed
      //if ( gridynum > horizlines.numChildren )
      if ( this.#gridynum > this.#horizlines.numChildren )
      {
         //for ( i=horizlines.numChildren; i <= gridynum; i++ )
         for ( i=this.#horizlines.numChildren; i <= this.#gridynum; i++ )
         {
            //ypos = i*Global.zoom + yoffset;
            ypos = i * Global.zoom + this.#yoffset;
            if ( ypos != 0 )
            {
               //gridlines[i] = new Shape();
               this.#gridlines[i] = new Shape();
               //drawHorizLine(gridlines[i]);
               this.#drawHorizLine(this.#gridlines[i]);
               //gridlines[i].y = ypos;
               this.#gridlines[i].y = ypos;
            }
         }
      }
      // else if ( gridynum < horizlines.numChildren )
      else if ( this.#gridynum < this.#horizlines.numChildren )
      {
         // remove vertical grid lines as needed
         //while ( horizlines.numChildren > gridynum )
         while ( this.#horizlines.numChildren > this.#gridynum )
         {
            //horizlines.removeChildAt(gridynum);
            this.#horizlines.removeChildAt(this.#gridynum);
         }
      }

      // add more vertical lines as needed
      //if ( gridxnum > vertlines.numChildren )
      if ( this.#gridxnum > this.#vertlines.numChildren )
      {
         //for ( i=vertlines.numChildren; i <= gridxnum; i++ )
         for ( i = this.#vertlines.numChildren; i <=  this.#gridxnum; i++ )
         {
            //xpos = i*Global.zoom + xoffset;
            xpos = i * Global.zoom + this.#xoffset;
            if ( xpos != 0 )
            {
               //gridlines[i] = new Shape();
               this.#gridlines[i] = new Shape();
               //drawVertLine(gridlines[i]);
               this.#drawVertLine(this.#gridlines[i]);
               //gridlines[i].x = xpos;
               this.#gridlines[i].x = xpos;
            }
         }
      }
      //else if ( gridxnum < vertlines.numChildren )
      else if ( this.#gridxnum < this.#vertlines.numChildren )
      {
         // remove vertical grid lines as needed
         //while ( vertlines.numChildren > gridxnum )
         while ( this.#vertlines.numChildren > this.#gridxnum )
         {
            //vertlines.removeChildAt(gridxnum);
            this.#vertlines.removeChildAt(this.#gridxnum);
         }
      }
   }

   //public function redrawGridLarge():void
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

      //gridxnum = Math.ceil(Global.docwidth/(Global.zoom*offset));
      this.#gridxnum = Math.ceil(Global.docwidth/(Global.zoom*offset));
      //gridynum = Math.ceil(Global.docheight/(Global.zoom*offset));
      this.#gridynum = Math.ceil(Global.docheight/(Global.zoom*offset));

      // set position of offset variables
      //yoffset = Global.yorigin - Math.floor(Global.yorigin/(Global.zoom*offset))*Global.zoom*offset;
      this.#yoffset = Global.yorigin - Math.floor(Global.yorigin/(Global.zoom*offset))*Global.zoom*offset;
      //xoffset = Global.xorigin - Math.floor(Global.xorigin/(Global.zoom*offset))*Global.zoom*offset;
      this.#xoffset = Global.xorigin - Math.floor(Global.xorigin/(Global.zoom*offset))*Global.zoom*offset;

      //var ypos:int = 0;
      var ypos = 0;
      //var xpos:int = 0;
      var xpos = 0;

      // reposition existing horizontal lines
      //for (i = 0; i < horizlines.numChildren; i++)
      for (i = 0; i < this.#horizlines.numChildren; i++)
      {
         //ypos = i*Global.zoom*offset + yoffset;
         ypos = i * Global.zoom*offset + this.#yoffset;
         //horizlines.getChildAt(i).y = ypos;
         this.#horizlines.getChildAt(i).y = ypos;
      }

      // reposition existing vertical lines
      //for (i = 0; i < vertlines.numChildren; i++)
      for (i = 0; i < this.#vertlines.numChildren; i++)
      {
         //xpos = i*Global.zoom*offset + xoffset;
         xpos = i*Global.zoom*offset + this.#xoffset;
         //vertlines.getChildAt(i).x = xpos;
         this.#vertlines.getChildAt(i).x = xpos;
      }

      // add more horizontal lines as needed
      //if ( gridynum > horizlines.numChildren )
      if ( this.#gridynum > this.#horizlines.numChildren )
      {
         //for ( i=horizlines.numChildren; i <= gridynum; i++ )
         for ( i= this.#horizlines.numChildren; i <=  this.#gridynum; i++ )
         {
            //ypos = i*Global.zoom*offset + yoffset;
            ypos = i*Global.zoom*offset + this.#yoffset;
            if ( ypos != 0 )
            {
               //gridlines[i] = new Shape();
               this.#gridlines[i] = new Shape();
               //drawHorizLine(gridlines[i]);
               this.#drawHorizLine(this.#gridlines[i]);
               //gridlines[i].y = ypos;
               this.#gridlines[i].y = ypos;
            }
         }
      }
      //else if ( gridynum < horizlines.numChildren )
      else if ( this.#gridynum < this.#horizlines.numChildren )
      {
         // remove vertical grid lines as needed
         //while ( horizlines.numChildren > gridynum )
         while ( this.#horizlines.numChildren > this.#gridynum )
         {
            //horizlines.removeChildAt(gridynum);
            this.#horizlines.removeChildAt(this.#gridynum);
         }
      }

      // add more vertical lines as needed
      //if ( gridxnum > vertlines.numChildren )
      if ( this.#gridxnum > this.#vertlines.numChildren )
      {
         //for ( i=vertlines.numChildren; i <= gridxnum; i++ )
         for ( i=this.#vertlines.numChildren; i <= this.#gridxnum; i++ )
         {
            //xpos = i*Global.zoom*offset + xoffset;
            xpos = i * Global.zoom*offset + this.#xoffset;
            if ( xpos != 0 )
            {
               //gridlines[i] = new Shape();
               this.#gridlines[i] = new Shape();
               //drawVertLine(gridlines[i]);
               this.#drawVertLine(this.#gridlines[i]);
               //gridlines[i].x = xpos;
               this.#gridlines[i].x = xpos;
            }
         }
      }
      //else if ( gridxnum < vertlines.numChildren )
      else if ( this.#gridxnum < this.#vertlines.numChildren )
      {
         // remove vertical grid lines as needed
         //while ( vertlines.numChildren > gridxnum )
         while ( this.#vertlines.numChildren > this.#gridxnum )
         {
            //vertlines.removeChildAt(gridxnum);
            this.#vertlines.removeChildAt(this.#gridxnum);
         }
      }
   }

   //private function drawHorizLine(line:Shape):void
   //drawHorizLine(line)
   #drawHorizLine(line)
   {
      // dotted line
      for ( var j=0; j<Global.docwidth; j+=4 )
      {
         line.graphics.beginFill(0x999999);
         line.graphics.drawRect(j,0,1,1);
         line.graphics.endFill();
      }

      //horizlines.addChild(line);
      this.#horizlines.addChild(line);
   }

   //private function drawVertLine(line:Shape):void
   //drawVertLine(line)
   #drawVertLine(line)
   {
      // dotted line
      for ( var j=0; j<Global.docheight; j+=4 )
      {
         line.graphics.beginFill(0x999999);
         line.graphics.drawRect(0,j,1,1);
         line.graphics.endFill();
      }

      //vertlines.addChild(line);
      this.#vertlines.addChild(line);
   }

   // public function setOrigin():void
   setOrigin()
   {
      //redrawAxes();
      this.#redrawAxes();
      //redrawGrid();
      redrawGrid();
   }

   //public function clear():void
   clear()
   {
      while ( numChildren > 0 )
      {
         removeChildAt(0);
      }
   }
}

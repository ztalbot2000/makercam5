//O var UIBase = require( './UIBase' );
import { UIBase } from'./UIBase';

import * as PIXI from 'pixi.js';


//
// An UI Container object
//
// @class
// @extends PIXI.UI.UIBase
// @memberof PIXI.UI
// @param width {Number} Width of the Container
// @param height {Number} Height of the Container
//

//O function Container( width, height )
export class Container extends UIBase
{
   public width: number;
   public height: number;

   constructor( width?: number, height?: number )
   {
      //O UIBase.call( this, width, height );
      //N call super instead of prototype UIBase.call
      super ( width, height );

      //O this.container.hitArea = new PIXI.Rectangle( 0, 0, 0, 0 );
      this.container.hitArea = new PIXI.Rectangle( 0, 0, 0, 0 );
   }

   //O Container.prototype.update = function( )
   public update = ( ): void =>
   {
      //O // if (this.container.interactive)
      //O // {
          //N hitArea.width and hitArea.height does not exist on pixi V4 or V5
          //N Event though hitArea is a rectangle, but it could be another
          //N Shape. It is suggested that hitArea be redone
          //N See:
          //N  html5gamedevs.com/topic/42185-how-to-update-hitarea-of-a-sprite/
          this.container.hitArea = new PIXI.Rectangle( 0, 0, this.width, this.height );
 
         //O // this.container.hitArea.width = this._width;
         //O // this.container.hitArea.height = this._height;
      //O }
   };

   //N hopefully resolves UIBase.ts getDragContainer
   // dragContainer.container
   public get dragContainer(): PIXI.Container
   {
     if (this.dragContainer)
        return this.dragContainer;

     return this.setting.dragContainer;
   }
}

//O Container.prototype = Object.create( UIBase.prototype );
//O Container.prototype.constructor = Container;
//O module.exports = Container;

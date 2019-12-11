//O var UIBase = require( './UIBase' );
var UIBase = require( './UIBase' );

/**
 * An UI Container object
 *
 * @class
 * @extends PIXI.UI.UIBase
 * @memberof PIXI.UI
 * @param width {Number} Width of the Container
 * @param height {Number} Height of the Container
 */
//O function Container( width, height )
export class Container extends UIBase
{
   public width: number;
   public height: number;

   constructor( width: number, height: number )
   {
      //O UIBase.call( this, width, height );
      super ( width, height );

      this.width = width;
      this.height = height;

      //O this.container.hitArea = new PIXI.Rectangle( 0, 0, 0, 0 );
      this.hitArea = new PIXI.Rectangle( 0, 0, 0, 0 );
   }

   //O Container.prototype.update = function( )
   public update = ( ): void =>
   {
      //O //if (this.container.interactive)
      //if (this.container.interactive)
      //O {
         //O this.container.hitArea.width = this._width;
         this.hitArea.width = this._width;
         //O this.container.hitArea.height = this._height;
         this.hitArea.height = this._height;
      //O }
   };
}

//O Container.prototype = Object.create( UIBase.prototype );
//O Container.prototype.constructor = Container;
//O module.exports = Container;


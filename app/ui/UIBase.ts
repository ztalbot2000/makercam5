//O var UISettings = require( './UISettings' ),
import { UISettings } from './UISettings';
//O let UI = require( './UI' );
//let UI = require( './UI' );
// import { UI } from './UI' ;
//O DragEvent = require( './Interaction/DragEvent' ),
//let DragEvent = require( './Interaction/DragEvent' );
import { DragEvent } from './Interaction/DragEvent' ;
//O DragDropController = require( './Interaction/DragDropController' );
import { DragDropController } from './Interaction/DragDropController';

import * as PIXI from 'pixi.js';

//
// Base class of all UIObjects
//
// @class
// @extends PIXI.UI.UIBase
// @param width {Number} Width of the UIObject
// @param height {Number} Height of the UIObject
//

//O function UIBase( width, height )
// export class UIBase extends UI
// export class UIBase extends PIXI.DisplayObject
export class UIBase extends PIXI.utils.EventEmitter
// export class UIBase extends PIXI.Sprite
{
   //O this.container = new PIXI.Container( );
   public container: PIXI.Container;
   //O this.setting = new UISettings( );
   protected setting: UISettings;
   //O this.children = [ ];
   // @ts-ignore
   public children: Array<UIBase>;
   //O this.parent = null;
   public parent: UIBase;
   //O this.stage = null;
   public stage: UIBase;
   //O this.initialized = false;
   private initialized: boolean;
   //O this.dragInitialized = false;
   private dragInitialized: boolean;
   //O this.dropInitialized = false;
   private dropInitialized: boolean;
   //O this.dirty = true;
   private dirty: boolean;
   //O this._oldWidth = -1;
   //New. Never referenced _oldWidth
   // private _oldWidth: number;
   //O this._oldHeight = -1;
   //New. Never referenced _oldHeight
   // private _oldHeight: number;
   //O this.pixelPerfect = true;
   private pixelPerfect: boolean;

   //O actual values
   //O this._width = 0;
   public _width: number;  // DynamicText uses it so it must be public
   //O this._height = 0;
   public _height: number;
   //O this._minWidth = null;
   private _minWidth: number;
   //O this._minHeight = null;
   private _minHeight: number;
   //O this._maxWidth = null;
   private _maxWidth: number;
   //O this._maxHeight = null;
   private _maxHeight: number;
   //O this._anchorLeft = null;
   private _anchorLeft: number;
   //O this._anchorRight = null;
   private _anchorRight: number;
   //O this._anchorTop = null;
   private _anchorTop: number;
   //O this._anchorBottom = null;
   private _anchorBottom: number;
   //O this._left = null;
   private _left: number;
   //O this._right = null;
   private _right: number;
   //O this._top = null;
   private _top: number;
   //O this._bottom = null;
   private _bottom: number;

   //O this._dragPosition = null;                //used for overriding positions if tweens is playing
   private _dragPosition: PIXI.Point;            //used for overriding positions if tweens is playing

   //N create an instance of the DragDropController
   protected _dragDropController: DragDropController;
   protected drag: DragEvent;
   protected dragging: boolean;
   protected stageOffset: PIXI.Point;
   protected pageXOffset: PIXI.Point;
   protected containerStart: PIXI.Point;
   protected dragContext: UIBase;

   constructor ( width: number | string, height: number | string )
   {
      super();
      //O PIXI.utils.EventEmitter.call( this );
      PIXI.utils.EventEmitter.call( this );
      //O this.container = new PIXI.Container( );
      this.container = new PIXI.Container( );
      //O this.setting = new UISettings( );
      this.setting = new UISettings( );
      //O this.children = [ ];
      this.children = [ ];
      //O this.parent = null;
      this.parent = null;
      //O this.stage = null;
      this.stage = null;
      //O this.initialized = false;
      this.initialized = false;
      //O this.dragInitialized = false;
      this.dragInitialized = false;
      //O this.dropInitialized = false;
      this.dropInitialized = false;
      //O this.dirty = true;
      this.dirty = true;
      //O this._oldWidth = -1;
      //New. Never referenced _oldwidth
      //this._oldWidth = -1;
      //O this._oldHeight = -1;
      //New. Never referenced _oldHeight
      // this._oldHeight = -1;
      //O this.pixelPerfect = true;
      this.pixelPerfect = true;

      //O if ( width && isNaN( width ) && width.indexOf( '%' ) != -1 )
      //New isNaN cannot be done on number
      if ( width && typeof width === 'string'  && width.indexOf( '%' ) != -1 )
      {
         //O this.setting.widthPct = parseFloat( width.replace( '%', '' ) ) * 0.01;
         this.setting.widthPct = parseFloat( width.replace( '%', '' ) ) * 0.01;
      }
      else
      {
         //O this.setting.widthPct = null;
         this.setting.widthPct = null;
      }

      //O if ( height && isNaN( height ) && height.indexOf( '%' ) != -1 )
      //New isNaN cannot be done on number
      if ( height && typeof height === 'string' && height.indexOf( '%' ) != -1 )
      {
         //O this.setting.heightPct = parseFloat( height.replace( '%', '' ) ) * 0.01;
         this.setting.heightPct = parseFloat( height.replace( '%', '' ) ) * 0.01;
      }
      else
      {
         //O this.setting.heightPct = null;
         this.setting.heightPct = null;
      }

      //New isNaN cannot be done on number
      if ( width && typeof width === 'number' )
      {
          //O this.setting.width = width || 0;
          this.setting.width = width;
      } else {
          //O this.setting.width = width || 0;
          this.setting.width = 0;
      }

      //New isNaN cannot be done on number
      if ( height && typeof height === 'number' )
      {
          //O this.setting.height = height || 0;
          this.setting.height = height;
      } else {
          //O this.setting.height = height || 0;
          this.setting.height = 0;
      }

      //O actual values
      //O this._width = 0;
      this._width = 0;
      //O this._height = 0;
      this._height = 0;
      //O this._minWidth = null;
      this._minWidth = null;
      //O this._minHeight = null;
      this._minHeight = null;
      //O this._maxWidth = null;
      this._maxWidth = null;
      //O this._maxHeight = null;
      this._maxHeight = null;
      //O this._anchorLeft = null;
      this._anchorLeft = null;
      //O this._anchorRight = null;
      this._anchorRight = null;
      //O this._anchorTop = null;
      this._anchorTop = null;
      //O this._anchorBottom = null;
      this._anchorBottom = null;
      //O this._left = null;
      this._left = null;
      //O this._right = null;
      this._right = null;
      //O this._top = null;
      this._top = null;
      //O this._bottom = null;
      this._bottom = null;

      //O this._dragPosition = null;                //used for overriding positions if tweens is playing
      this._dragPosition = null;                    //used for overriding positions if tweens is playing

      //N create an instance of the DragDropController. This does nothing but create an array.
      this._dragDropController = new DragDropController();
      this.drag = null;
      this.dragging = false;
      this.stageOffset = null;
      this.pageXOffset = null;
   }

   //
   // Renders the object using the WebGL renderer
   //
   // @private
   //

   //O UIBase.prototype.updatesettings = function( updateChildren, updateParent )
   public updatesettings = ( updateChildren: Object, updateParent?: Object ): void =>
   {
      //O if ( !this.initialized )
      if ( !this.initialized )
      {
         //O if ( this.parent !== null && this.parent.stage !== null && this.parent.initialized )
         if ( this.parent !== null && this.parent.stage !== null && this.parent.initialized )
         {
            //O this.initialize( );
            this.initialize( );
         }
         else
         {
            //O return;
            return;
         }
      }

      //O if ( updateParent )
      if ( updateParent )
      {
         //O this.updateParent( );
         this.updateParent( );
      }
      //O this.baseupdate( );
      this.baseupdate( );
      //O this.update( );
      this.update( );
      //O if ( updateChildren )
      if ( updateChildren )
      {
         //O this.updateChildren( );
         this.updateChildren( );
      }
   };

   //
   // Update method (override from other UIObjects)
   //
   // @private
   //

   //O UIBase.prototype.update = function( ) {};
   public update = (): void => {};

   //
   // Updates the parent
   //
   // @private
   //

   //O UIBase.prototype.updateParent = function(
   private updateParent = (): void =>
   {
      //O if ( this.parent !== null )
      if ( this.parent !== null )
      {
         //O if ( this.parent.updatesettings )
         if ( this.parent.updatesettings )
         {
            //O this.parent.updatesettings( false, true );
            this.parent.updatesettings( false, true );
         }
      }
   };

   /**
    * Updates the UIObject with all base settings
    *
    * @private
    */
   //O UIBase.prototype.baseupdate = function( )
   private baseupdate = ( ): void =>
   {
      //O return if parent size didnt change
      //O if ( this.parent !== null )
      if ( this.parent !== null )
      {
         //O var parentHeight, parentWidth;
         let parentHeight, parentWidth;

         //O transform convertion (% etc)
         //O this.dirty = true;
         this.dirty = true;
         //O this._width = this.actual_width;
         this._width = this.actual_width;
         //O this._height = this.actual_height;
         this._height = this.actual_height;
         //O this._minWidth = this.actual_minWidth;
         this._minWidth = this.actual_minWidth;
         //O this._minHeight = this.actual_minHeight;
         this._minHeight = this.actual_minHeight;
         //O this._maxWidth = this.actual_maxWidth;
         this._maxWidth = this.actual_maxWidth;
         //O this._maxHeight = this.actual_maxHeight;
         this._maxHeight = this.actual_maxHeight;
         //O this._anchorLeft = this.actual_anchorLeft;
         this._anchorLeft = this.actual_anchorLeft;
         //O this._anchorRight = this.actual_anchorRight;
         this._anchorRight = this.actual_anchorRight;
         //O this._anchorTop = this.actual_anchorTop;
         this._anchorTop = this.actual_anchorTop;
         //O this._anchorBottom = this.actual_anchorBottom;
         this._anchorBottom = this.actual_anchorBottom;
         //O this._left = this.actual_left;
         this._left = this.actual_left;
         //O this._right = this.actual_right;
         this._right = this.actual_right;
         //O this._top = this.actual_top;
         this._top = this.actual_top;
         //O this._bottom = this.actual_bottom;
         this._bottom = this.actual_bottom;
         //O this._parentWidth = parentWidth = this.parent._width;
         //N _parentWdith is not in this project
         parentWidth = this.parent._width;
         //O this._parentHeight = parentHeight = this.parent._height;
         //N _parentHeight is not in this project
         parentHeight = this.parent._height;
         //O this.dirty = false;
         this.dirty = false;

         //O var pivotXOffset = this.pivotX * this._width;
         //N Combine as PIXI has it
         let pivotXOffset = this.pivot.x * this._width;
         //O var pivotYOffset = this.pivotY * this._height;
         let pivotYOffset = this.pivot.y * this._height;

         //O if ( this.pixelPerfect )
         if ( this.pixelPerfect )
         {
            //O pivotXOffset = Math.round( pivotXOffset );
            pivotXOffset = Math.round( pivotXOffset );
            //O pivotYOffset = Math.round( pivotYOffset );
            pivotYOffset = Math.round( pivotYOffset );
         }

         //O if ( this.horizontalAlign === null )
         if ( this.horizontalAlign === null )
         {
            //O get anchors (use left right if conflict)
            //O if ( this._anchorLeft !== null && this._anchorRight === null && this._right !== null )
            if ( this._anchorLeft !== null && this._anchorRight === null && this._right !== null )
            {
               //O this._anchorRight = this._right;
               this._anchorRight = this._right;
            }
            //O else if ( this._anchorLeft === null && this._anchorRight !== null && this._left !== null )
            else if ( this._anchorLeft === null && this._anchorRight !== null && this._left !== null )
            {
               //O this._anchorLeft = this._left;
               this._anchorLeft = this._left;
            }
            //O else if ( this._anchorLeft === null && this._anchorRight === null && this._left !== null && this._right !== null )
            else if ( this._anchorLeft === null && this._anchorRight === null && this._left !== null && this._right !== null )
            {
               //O this._anchorLeft = this._left;
               this._anchorLeft = this._left;
               //O this._anchorRight = this._right;
               this._anchorRight = this._right;
            }

            //O var useHorizontalAnchor = this._anchorLeft !== null || this._anchorRight !== null;
            let useHorizontalAnchor = this._anchorLeft !== null || this._anchorRight !== null;
            //O var useLeftRight = !useHorizontalAnchor && ( this._left !== null || this._right !== null );
            let useLeftRight = !useHorizontalAnchor && ( this._left !== null || this._right !== null );

            //O if ( useLeftRight )
            if ( useLeftRight )
            {
               //O if ( this._left !== null )
               if ( this._left !== null )
               {
                  //O this.container.position.x = this._left;
                  this.container.position.x = this._left;
               }
               //O else if ( this._right !== null )
               else if ( this._right !== null )
               {
                  //O this.container.position.x = parentWidth - this._right;
                  this.container.position.x = parentWidth - this._right;
               }
            }
            //O else if ( useHorizontalAnchor )
            else if ( useHorizontalAnchor )
            {

               //O if ( this._anchorLeft !== null && this._anchorRight === null )
               if ( this._anchorLeft !== null && this._anchorRight === null )
               {
                  //O this.container.position.x = this._anchorLeft;
                  this.container.position.x = this._anchorLeft;
               }
               //O else if ( this._anchorLeft === null && this._anchorRight !== null )
               else if ( this._anchorLeft === null && this._anchorRight !== null )
               {
                  //O this.container.position.x = parentWidth - this._width - this._anchorRight;
                  this.container.position.x = parentWidth - this._width - this._anchorRight;
               }
               //O else if ( this._anchorLeft !== null && this._anchorRight !== null )
               else if ( this._anchorLeft !== null && this._anchorRight !== null )
               {
                  //O this.container.position.x = this._anchorLeft;
                  this.container.position.x = this._anchorLeft;
                     //O this._width = parentWidth - this._anchorLeft - this._anchorRight;
                     this._width = parentWidth - this._anchorLeft - this._anchorRight;
               }
               //O this.container.position.x += pivotXOffset;
               this.container.position.x += pivotXOffset;
            }
            else
            {
               //O this.container.position.x = 0;
               this.container.position.x = 0;
            }
         }

         //O if ( this.verticalAlign === null )
         if ( this.verticalAlign === null )
         {
            //O get anchors (use top bottom if conflict)
            //O if ( this._anchorTop !== null && this._anchorBottom === null && this._bottom !== null )
            if ( this._anchorTop !== null && this._anchorBottom === null && this._bottom !== null )
            {
               //O this._anchorBottom = this._bottom;
               this._anchorBottom = this._bottom;
            }
            //O if ( this._anchorTop === null && this._anchorBottom !== null && this._top !== null )
            if ( this._anchorTop === null && this._anchorBottom !== null && this._top !== null )
            {
               //O this._anchorTop = this._top;
               this._anchorTop = this._top;
            }

            //O var useVerticalAnchor = this._anchorTop !== null || this._anchorBottom !== null;
            let useVerticalAnchor = this._anchorTop !== null || this._anchorBottom !== null;
            //O var useTopBottom = !useVerticalAnchor && ( this._top !== null || this._bottom !== null );
            let useTopBottom = !useVerticalAnchor && ( this._top !== null || this._bottom !== null );

            //O if ( useTopBottom )
            if ( useTopBottom )
            {
               //O if ( this._top !== null )
               if ( this._top !== null )
               {
                  //O this.container.position.y = this._top;
                  this.container.position.y = this._top;
               }
               //O else if ( this._bottom !== null )
               else if ( this._bottom !== null )
               {
                  //O this.container.position.y = parentHeight - this._bottom;
                  this.container.position.y = parentHeight - this._bottom;
               }
            }
            //O else if ( useVerticalAnchor )
            else if ( useVerticalAnchor )
            {
               //O if ( this._anchorTop !== null && this._anchorBottom === null )
               if ( this._anchorTop !== null && this._anchorBottom === null )
               {
                  //O this.container.position.y = this._anchorTop;
                  this.container.position.y = this._anchorTop;
               } 
            }
            //O else if ( this._anchorTop === null && this._anchorBottom !== null )
            else if ( this._anchorTop === null && this._anchorBottom !== null )
            {
               //O this.container.position.y = parentHeight - this._height - this._anchorBottom;
               this.container.position.y = parentHeight - this._height - this._anchorBottom;
            }
            //O else if ( this._anchorTop !== null && this._anchorBottom !== null )
            else if ( this._anchorTop !== null && this._anchorBottom !== null )
            {
               //O this.container.position.y = this._anchorTop;
               this.container.position.y = this._anchorTop;
               //O this._height = parentHeight - this._anchorTop - this._anchorBottom;
               this._height = parentHeight - this._anchorTop - this._anchorBottom;

               //O this.container.position.y += pivotYOffset;
               this.container.position.y += pivotYOffset;
            }
            else
            {
               //O this.container.position.y = 0;
               this.container.position.y = 0;
            }
         }

         //O min/max sizes
         //O if ( this._maxWidth !== null && this._width > this._maxWidth )
         if ( this._maxWidth !== null && this._width > this._maxWidth )
         {
            //O this._width = this._maxWidth;
            this._width = this._maxWidth;
         }

         //O if ( this._width < this._minWidth )
         if ( this._width < this._minWidth )
         {
            //O this._width = this._minWidth;
            this._width = this._minWidth;
         }

         //O if ( this._maxHeight !== null && this._height > this._maxHeight )
         if ( this._maxHeight !== null && this._height > this._maxHeight )
         {
            //O this._height = this._maxHeight;
            this._height = this._maxHeight;
         }

         //O if ( this._height < this._minHeight )
         if ( this._height < this._minHeight )
         {
            //O this._height = this._minHeight;
            this._height = this._minHeight;
         }

         //O pure vertical/horizontal align
         //O if ( this.horizontalAlign !== null )
         if ( this.horizontalAlign !== null )
         {
            //O if ( this.horizontalAlign == "center" )
            if ( this.horizontalAlign == "center" )
            {
               //O this.container.position.x = parentWidth * 0.5 - this._width * 0.5;
               this.container.position.x = parentWidth * 0.5 - this._width * 0.5;
            }
            //O else if ( this.horizontalAlign == "right" )
            else if ( this.horizontalAlign == "right" )
            {
               //O this.container.position.x = parentWidth - this._width;
               this.container.position.x = parentWidth - this._width;
            }
            else
            {
               //O this.container.position.x = 0;
               this.container.position.x = 0;
            }
            //O this.container.position.x += pivotXOffset;
            this.container.position.x += pivotXOffset;
         }
         //O if ( this.verticalAlign !== null )
         if ( this.verticalAlign !== null )
         {
            //O if ( this.verticalAlign == "middle" )
            if ( this.verticalAlign == "middle" )
            {
               //O this.container.position.y = parentHeight * 0.5 - this._height * 0.5;
               this.container.position.y = parentHeight * 0.5 - this._height * 0.5;
            }
            //O else if ( this.verticalAlign == "bottom" )
            else if ( this.verticalAlign == "bottom" )
            {
               //O this.container.position.y = parentHeight - this._height;
               this.container.position.y = parentHeight - this._height;
            }
            else
            {
               //O this.container.position.y = 0;
               this.container.position.y = 0;
            }

            //O this.container.position.y += pivotYOffset;
            this.container.position.y += pivotYOffset;
         }

         //O Unrestricted dragging
         //O if ( this.dragging && !this.setting.dragRestricted )
         if ( this.dragging && !this.setting.dragRestricted )
         {
            //O this.container.position.x = this._dragPosition.x;
            this.container.position.x = this._dragPosition.x;
            //O this.container.position.y = this._dragPosition.y;
            this.container.position.y = this._dragPosition.y;
         }

         //O scale
         //O if ( this.setting.scaleX !== null )
         if ( this.setting.scale.x !== null )
         {
            //O this.container.scale.x = this.setting.scaleX;
            this.container.scale.x = this.setting.scale.x;
         }
         //O if ( this.setting.scaleY !== null )
         if ( this.setting.scale.y !== null )
         {
            //O this.container.scale.y = this.setting.scaleY;
            this.container.scale.y = this.setting.scale.y;
         }

         //O pivot
         //O if ( this.setting.pivotX !== null )
         if ( this.setting.pivot.x !== null )
         {
            //O this.container.pivot.x = pivotXOffset;
            this.container.pivot.x = pivotXOffset;
         }

         //O if ( this.setting.pivotY !== null )
         if ( this.setting.pivot.y !== null )
         {
            //O this.container.pivot.y = pivotYOffset;
            this.container.pivot.y = pivotYOffset;
         }

         //O if ( this.setting.alpha !== null )
         if ( this.setting.alpha !== null )
         {
            //O this.container.alpha = this.setting.alpha;
            this.container.alpha = this.setting.alpha;
         }

         //O if ( this.setting.rotation !== null )
         if ( this.setting.rotation !== null )
         {
            //O this.container.rotation = this.setting.rotation;
            this.container.rotation = this.setting.rotation;
         }

         //O make pixel perfect
         //O if ( this.pixelPerfect )
         if ( this.pixelPerfect )
         {
            //O this._width = Math.round( this._width );
            this._width = Math.round( this._width );
            //O this._height = Math.round( this._height );
            this._height = Math.round( this._height );
            //O this.container.position.x = Math.round( this.container.position.x );
            this.container.position.x = Math.round( this.container.position.x );
            //O this.container.position.y = Math.round( this.container.position.y );
            this.container.position.y = Math.round( this.container.position.y );
         }
      }
   }



   //
   // Updates all UI Children
   //
   // @private
   //

   //O UIBase.prototype.updateChildren = function( )
   private updateChildren  = ( ): void =>
   {
      //O for ( var i = 0; i < this.children.length; i++ )
      for ( let i = 0; i < this.children.length; i++ )
      {
         //O this.children[ i ].updatesettings( true );
         this.children[ i ].updatesettings( true );
      }
   };

   //O UIBase.prototype.addChild = function( UIObject )
   // @ts-ignore
   public addChild<TChildren extends UIBase[]>(...children: TChildren ): TChildren[0]
   {
      //O var argumentsLength = arguments.length;
      let argumentsLength = children.length;
      //O if ( argumentsLength > 1 )
      if ( argumentsLength > 1 )
      {
         //O for ( var i = 0; i < argumentsLength; i++ )
         for ( let i = 0; i < argumentsLength; i++ )
         {
            //O this.addChild( arguments[ i ] );
            this.addChild( children[ i ] );
         }
      }
      else
      {
         let child = children[0];

         //O if ( UIObject.parent )
         if ( child.parent )
         {
            //O UIObject.parent.removeChild( UIObject );
            child.parent.removeChild( child );
         }

         //O UIObject.parent = this;
         //N parent is readonly and should be set using the accessor.
         //child.setParent(this);
         child.parent = this;
         //O this.container.addChild( UIObject.container );
         this.container.addChild( child.container );
         //O this.children.push( UIObject );
         this.children.push( child );
         //O this.updatesettings( true, true );
         this.updatesettings( true, true );
      }

      //O return UIObject;
      return children[0];
   };

   //O UIBase.prototype.removeChild = function( UIObject )
   // @ts-ignore
   public removeChild ( UIObject: UIBase ): void
   {
      //O var argumentLenght = arguments.length;
      let argumentLenght = arguments.length;
      //O if ( argumentLenght > 1 )
      if ( argumentLenght > 1 )
      {
         //O for ( var i = 0; i < argumentLenght; i++ )
         for ( let i = 0; i < argumentLenght; i++ )
         {
            //O this.removeChild( arguments[ i ] );
            this.removeChild( arguments[ i ] );
         }
      }
      else
      {
         //O var index = this.children.indexOf( UIObject );
         let index = this.children.indexOf( UIObject );
         //O if ( index !== -1 )
         if ( index !== -1 )
         {
            //O var oldUIParent = UIObject.parent;
            let oldUIParent = UIObject.parent;
            //O var oldParent = UIObject.container.parent;
            //N oldParent is unused in this project (Was commented out originally)
            // let oldParent = UIObject.container.parent;
            //O UIObject.container.parent.removeChild( UIObject.container );
            UIObject.container.parent.removeChild( UIObject.container );
            //O this.children.splice( index, 1 );
            this.children.splice( index, 1 );
            //O UIObject.parent = null;
            UIObject.parent = null;

            //O // oldParent._recursivePostUpdateTransform();
            // oldParent._recursivePostUpdateTransform();
            //O setTimeout( function( )                      //hack but cant get the transforms to update propertly otherwice?
            setTimeout( function( )                      //hack but cant get the transforms to update propertly otherwice?
            {
               //O if ( oldUIParent.updatesettings )
               if ( oldUIParent.updatesettings )
               {
                  //O oldUIParent.updatesettings( true, true );
                  oldUIParent.updatesettings( true, true );
               }
            }, 0 );
         }
      }
   };

   //
   // Initializes the object when its added to an UIStage
   //
   // @private
   //

   //O UIBase.prototype.initialize = function( )
   private initialize = ( ): void =>
   {
      //O this.initialized = true;
      this.initialized = true;
      //O this.stage = this.parent.stage;
      this.stage = this.parent.stage;
      //O if ( this.draggable )
      if ( this.draggable )
      {
         //O this.initDraggable( );
         this.initDraggable( );
      }

      //O if ( this.droppable )
      if ( this.droppable )
      {
         //O this.initDroppable( );
         this.initDroppable( );
      }

      this.dragContext = this;
   };

   //O UIBase.prototype.clearDraggable = function( )
   private clearDraggable = ( ): void =>
   {
      //O if ( this.dragInitialized )
      if ( this.dragInitialized )
      {
         //O this.dragInitialized = false;
         this.dragInitialized = false;
         //O this.drag.stopEvent( );
         this.drag.stopEvent( );
      }
   };

   //O UIBase.prototype.initDraggable = function( )
   private initDraggable = ( ): void =>
   {
      //O if ( !this.dragInitialized )
      if ( !this.dragInitialized )
      {
         //O this.dragInitialized = true;
         this.dragInitialized = true;
         //O var containerStart = new PIXI.Point( );
         this.containerStart = new PIXI.Point( );
         //O let stageOffset = new PIXI.Point( );
         this.stageOffset = new PIXI.Point( );
         //O let self = this;

         //O this._dragPosition = new PIXI.Point( );
         this._dragPosition = new PIXI.Point( );
         //O this.drag = new DragEvent( this );
         this.drag = new DragEvent( this );

         //O this.drag.onDragStart = function( e )
         this.drag.onDragStart = this.onDragStart;

         //O this.drag.onDragMove = function( e, offset )
         this.drag.onDragMove = this.onDragMove;

         //O this.drag.onDragEnd = function( e )
         this.drag.onDragEnd = this.onDragEnd;

      }
   };

   //O UIBase.prototype.clearDroppable = function( )
   public clearDroppable = ( ): void =>
   {
      //O if ( this.dropInitialized )
      if ( this.dropInitialized )
      {
         //O this.dropInitialized = false;
         this.dropInitialized = false;
         //O this.container.removeListener( 'mouseup', this.onDrop );
         this.container.removeListener( 'mouseup', this.onDrop );
         //O this.container.removeListener( 'touchend', this.onDrop );
         this.container.removeListener( 'touchend', this.onDrop );
      }
   };

   //O UIBase.prototype.initDroppable = function( )
   private initDroppable = ( ): void =>
   {
      //O if ( !this.dropInitialized )
      if ( !this.dropInitialized )
      {
         //O this.dropInitialized = true;
         this.dropInitialized = true;
         //O var container = this.container,
         let container = this.container;
         //O self = this;

         //O this.container.interactive = true;
         this.container.interactive = true;

         //O this.onDrop = function( event )

         //O this.drag.onDragMove = function( e, offset )
         this.drag.onDragMove = this.onDragMove;

         //O container.on( 'mouseup', this.onDrop );
         container.on( 'mouseup', this.onDrop );
         //O container.on( 'touchend', this.onDrop );
         container.on( 'touchend', this.onDrop );
      }
   }

   public onDragStart ( e: PIXI.interaction.InteractionEvent )
   {
      //O var added = DragDropController.add( this, e );
      //N use our instance of DragDropController
      let added = this._dragDropController.add( this, e );
      //O if ( !this.dragging && added )
      if ( !this.dragging && added )
      {
         //O this.dragging = true;
         this.dragging = true;
         //O this.container.interactive = false;
         this.container.interactive = false;
         //O containerStart.copy( this.container.position );
         //N copy is deprecated. Use copyFrom
         this.containerStart.copyFrom( this.container.position );
         //O if ( this.dragContainer )
         if ( this.dragContainer )
         {
            let c: PIXI.Container = null;
            //O var c = this.dragContainer.container ? this.dragContainer.container : this.dragContainer;
            //N test above by checking this.dragContainer in PIXI.UI.Container 
            c = this.dragContainer;

            //O if ( c )
            if ( c )
            {
               //O _this.container._recursivePostUpdateTransform();
               //_this.container._recursivePostUpdateTransform();
               //O stageOffset.set( c.worldTransform.tx - this.parent.container.worldTransform.tx, c.worldTransform.ty - this.parent.container.worldTransform.ty );
               this.stageOffset.set( c.worldTransform.tx - this.parent.container.worldTransform.tx, c.worldTransform.ty - this.parent.container.worldTransform.ty );
               //O c.addChild( this.container );
               c.addChild( this.container );
            }
         }
         else
         {
            //O stageOffset.set( 0 );
            this.stageOffset.set( 0 );
         }
         //O this.emit( "draggablestart", e );
         this.emit( "draggablestart", e );
      }
   }

   //O this.drag.onDragEnd ( e, offset )
   public onDragEnd ( e: PIXI.interaction.InteractionEvent )
   {
      //O if ( this.dragging )
      if ( this.dragging )
      {
         //O this.dragging = false;
         this.dragging = false;
         //O Return to container after 0ms if not picked up by a droppable
         //O setTimeout( function( )
         let dragContext = this.dragContext;
         //New
         let _dragDropController = this._dragDropController;
         setTimeout( function( )
         {
            //O self.container.interactive = true;
            //Hmmmm
            dragContext.container.interactive = true;
            //O var item = DragDropController.getItem( self );
            //N use our instance of DragDropController
            let item = _dragDropController.getItem( dragContext );
            //O if ( item )
            if ( item )
            {
               //O var container = self.parent === self.stage ? self.stage : self.parent.container;
               let container = dragContext.parent === dragContext.stage ? dragContext.stage : dragContext.parent.container;
               //O container.toLocal( self.container.position, self.container.parent, self );
               // @ts-ignore
               container.toLocal( dragContext.container.position, dragContext.container.parent, dragContext );
               //O if ( container != self.container )
               if ( container != dragContext.container )
               {
                  //O self.parent.addChild( self );
                  dragContext.parent.addChild( dragContext );
               }
            }
            dragContext.emit( "draggableend", e );
         }, 0 );
      }
   }

   public onDrop ( event: PIXI.interaction.InteractionEvent )
   {
      //O var item = DragDropController.getEventItem( event, context.dropGroup );
      //N use our instance of DragDropController
      let item = this._dragDropController.getEventItem( event, this.dragContext.dropGroup );
      //O if ( item && item.dragging )
      if ( item && item.dragging )
      {
         //O item.dragging = false;
         item.dragging = false;
         //O item.container.interactive = true;
         item.container.interactive = true;
         //O var parent = self.droppableReparent !== null ? self.droppableReparent : self;
         let parent = this.dragContext.droppableReparent !== null ? this.dragContext.droppableReparent : this.dragContext;
         //O parent.container.toLocal( item.container.position, item.container.parent, item );
         parent.container.toLocal( item.container.position, item.container.parent, item );

         //O if ( parent.container != item.container.parent )
         if ( parent.container != item.container.parent )
         {
            //O parent.addChild( item );
            parent.addChild( item );
         }
      }
   }

   public onDragMove ( e: PIXI.interaction.InteractionEvent, offset: PIXI.Point )
   {
      //O if ( this.dragging )
      if ( this.dragging )
      {
         //O this._dragPosition.set( containerStart.x + offset.x - stageOffset.x, containerStart.y + offset.y - stageOffset.y );
         this._dragPosition.set( this.containerStart.x + offset.x - this.stageOffset.x, this.containerStart.y + offset.y - this.stageOffset.y );
         //O this.x = this._dragPosition.x;
         this.x = this._dragPosition.x;
         //O this.y = this._dragPosition.y;
         this.y = this._dragPosition.y;
         //O this.emit( "draggablemove", e );
         this.emit( "draggablemove", e );
      }
   }

   //O Object.defineProperties  UIBase.prototype,
   get x(): number
   {
      //O return this.setting.left;
      return this.setting.left;
   }
   //O set: function( val )
   set x( val: number )
   {
      //O this.left = val;
      this.left = val;
   }

   //O y:
   get y(): number
   {
      //O return this.setting.top;
      return this.setting.top;
   }
   //O set: function( val )
   set y( val )
   {
      //O this.top = val;
      this.top = val;
   }

   //O width:
   get width(): number | string
   {
      //O return this.setting.width;
      return this.setting.width;
   }
   //O set: function( val )
   set width( val: number | string )
   {
      //O if ( isNaN( val ) && val.indexOf( '%' ) !== -1 )
      //New isNaN cannot be done on number
      if ( typeof val === 'string'  && val.indexOf( '%' ) !== -1 )
      {
         //O this.setting.widthPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
         this.setting.widthPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
      }
      else
      {
         //O this.setting.widthPct = null;
         this.setting.widthPct = null;
      }

      //New isNaN cannot be done on number
      if ( typeof val === 'number' )
      {
         //O this.setting.width = val;
         this.setting.width = val;
         //O this.updatesettings( true );
         this.updatesettings( true );
      }
   }

   //O actual_width:
   get actual_width ( ): number
   {
      //O if ( this.dirty )
      if ( this.dirty )
      {
         //O if ( this.setting.widthPct !== null )
         if ( this.setting.widthPct !== null )
         {
            //O this._width = this.parent._width * this.setting.widthPct;
            this._width = this.parent._width * this.setting.widthPct;
         }
         else
         {
            //O this._width = this.setting.width;
            this._width = this.setting.width;
         }
      }
      //O return this._width;
      return this._width;
   }

   //O height:
   get height( ): number | string
   {
      //O return this.setting.height;
      return this.setting.height;
   }
   //O set: function( val )
   set height( val: number | string )
   {
      //O if ( isNaN( val ) && val.indexOf( '%' ) !== -1 )
      //New isNaN cannot be done on number
      if ( typeof val === 'string' && val.indexOf( '%' ) !== -1 )
      {
         //O this.setting.heightPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
         this.setting.heightPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
      }
      else
      {
         //O this.setting.heightPct = null;
         this.setting.heightPct = null;
      }

      //New isNaN cannot be done on number
      if ( typeof val === 'number' )
      {
         //O this.setting.height = val;
         this.setting.height = val;
         //O this.updatesettings( true );
         this.updatesettings( true );
      }
   }

   //O actual_height:
   get actual_height(): number
   {
      //O if ( this.dirty )
      if ( this.dirty )
      {
         //O if ( this.setting.heightPct !== null )
         if ( this.setting.heightPct !== null )
         {
            //O this._height = this.parent._height * this.setting.heightPct;
            this._height = this.parent._height * this.setting.heightPct;
         }
         else
         {
            //O this._height = this.setting.height;
            this._height = this.setting.height;
         }
      }
      //O return this._height;
      return this._height;
   }

   //O minWidth:
   get minWidth( ): number | string
   {
      //O return this.setting.minWidth;
      return this.setting.minWidth;
   }
   //O set: function( val )
   set minWidth( val: number | string )
   {
      //O if ( isNaN( val ) && val.indexOf( '%' ) !== -1 )
      //New isNaN cannot be done on number
      if ( typeof val === 'string' && val.indexOf( '%' ) !== -1 )
      {
         //O this.setting.minWidthPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
         this.setting.minWidthPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
      }
      else
      {
         //O this.setting.minWidthPct = null;
         this.setting.minWidthPct = null;
      }

      //New isNaN cannot be done on number
      if ( typeof val === 'number' )
      {
         //O this.setting.minWidth = val;
         this.setting.minWidth = val;
         //O this.updatesettings( true );
         this.updatesettings( true );
      }
   }

   //O actual_minWidth:
   get actual_minWidth( ): number
   {
      //O if ( this.dirty )
      if ( this.dirty )
      {
         //O if ( this.setting.minWidthPct !== null )
         if ( this.setting.minWidthPct !== null )
         {
            //O this._minWidth = this.parent._width * this.setting.minWidthPct;
            this._minWidth = this.parent._width * this.setting.minWidthPct;
         }
         else
         {
            //O this._minWidth = this.setting.minWidth;
            this._minWidth = this.setting.minWidth;
         }
      }
      //O return this._minWidth;
      return this._minWidth;
   }
   //O minHeight:
   get minHeight( ): number | string
   {
      //O return this.setting.minHeight;
      return this.setting.minHeight;
   }
   //O set: function( val )
   set minHeight( val: number | string )
   {
      //O if ( isNaN( val ) && val.indexOf( '%' ) !== -1 )
      //New isNaN cannot be done on number
      if ( typeof val === 'string' && val.indexOf( '%' ) !== -1 )
      {
         //O this.setting.minHeightPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
         this.setting.minHeightPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
      }
      else
      {
         //O this.setting.minHeightPct = null;
         this.setting.minHeightPct = null;
      }

      //New isNaN cannot be done on number
      if ( typeof val === 'number' )
      {
         //O this.setting.minHeight = val;
         this.setting.minHeight = val;
         //O this.updatesettings( true );
         this.updatesettings( true );
      }
   }

   //O actual_minHeight:
   get actual_minHeight( ): number
   {
      //O if ( this.dirty )
      if ( this.dirty )
      {
         //O if ( this.setting.minHeightPct !== null )
         if ( this.setting.minHeightPct !== null )
         {
            //O this._minHeight = this.parent._height * this.setting.minHeightPct;
            this._minHeight = this.parent._height * this.setting.minHeightPct;
         }
         else
         {
            //O this._minHeight = this.setting.minHeight;
            this._minHeight = this.setting.minHeight;
         }
      }
      //O return this._minHeight;
      return this._minHeight;
   }

   //O maxWidth:
   get maxWidth( ): number | string
   {
      //O return this.setting.maxWidth;
      return this.setting.maxWidth;
   }
   //O set: function( val )
   set maxWidth( val: number | string )
   {
      //O if ( isNaN( val ) && val.indexOf( '%' ) !== -1 )
      //New isNaN cannot be done on number
      if ( typeof val === 'string' && val.indexOf( '%' ) !== -1 )
      {
         //O this.setting.maxWidthPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
         this.setting.maxWidthPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
      }
      else
      {
         //O this.setting.maxWidthPct = null;
         this.setting.maxWidthPct = null;
      }

      //New isNaN cannot be done on number
      if ( typeof val === 'number' )
      {
         //O this.setting.maxWidth = val;
         this.setting.maxWidth = val;
         //O this.updatesettings( true );
         this.updatesettings( true );
      }
   }

   //O actual_maxWidth:
   get actual_maxWidth ( ): number
   {
      //O if ( this.dirty )
      if ( this.dirty )
      {
         //O if ( this.setting.maxWidthPct !== null )
         if ( this.setting.maxWidthPct !== null )
         {
            //O this._maxWidth = this.parent._width * this.setting.maxWidthPct;
            this._maxWidth = this.parent._width * this.setting.maxWidthPct;
         }
         else
         {
            //O this._maxWidth = this.setting.maxWidth;
            this._maxWidth = this.setting.maxWidth;
         }
     }
     //O return this._maxWidth;
     return this._maxWidth;
   }

   //O maxHeight:
   get maxHeight(): number | string
   {
      //O return this.setting.maxHeight;
      return this.setting.maxHeight;
   }
   //O set: function( val )
   set maxHeight( val: number | string )
   {
      //O if ( isNaN( val ) && val.indexOf( '%' ) !== -1 )
      //New isNaN cannot be done on number
      if ( typeof val === 'string' && val.indexOf( '%' ) !== -1 )
      {
         //O this.setting.maxHeightPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
         this.setting.maxHeightPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
      }
      else
      {
         //O this.setting.maxHeightPct = null;
         this.setting.maxHeightPct = null;
      }

      //New isNaN cannot be done on number
      if ( typeof val === 'number' )
      {
         //O this.setting.maxHeight = val;
         this.setting.maxHeight = val;
         //O this.updatesettings( true );
         this.updatesettings( true );
      }
   }

   //O actual_maxHeight:
   get actual_maxHeight(): number
   {
      if ( this.dirty )
      {
         //O if ( this.setting.maxHeightPct !== null )
         if ( this.setting.maxHeightPct !== null )
         {
            //O this._maxHeight = this.parent._height * this.setting.maxHeightPct;
            this._maxHeight = this.parent._height * this.setting.maxHeightPct;
         }
         else
         {
            //O this._maxHeight = this.setting.maxHeight;
            this._maxHeight = this.setting.maxHeight;
         }
      }
      //O return this._maxHeight;
      return this._maxHeight;
   }

   //O anchorLeft:
   get anchorLeft( ): number | string
   {
      return this.setting.anchorLeft;
   }
   //O set: function( val )
   set anchorLeft( val: number | string )
   {
      //O if ( isNaN( val ) && val.indexOf( '%' ) !== -1 )
      //New isNaN cannot be done on number
      if ( typeof val === 'string' && val.indexOf( '%' ) !== -1 )
      {
         //O this.setting.anchorLeftPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
         this.setting.anchorLeftPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
      }
      else
      {
         //O this.setting.anchorLeftPct = null;
         this.setting.anchorLeftPct = null;
      }

      //New isNaN cannot be done on number
      if ( typeof val === 'number' )
      {
         //O this.setting.anchorLeft = val;
         this.setting.anchorLeft = val;
         //O this.updatesettings( true );
         this.updatesettings( true );
      }
   }

   //O actual_anchorLeft:
   get actual_anchorLeft(): number
   {
      if ( this.dirty )
      {
         //O if ( this.setting.anchorLeftPct !== null )
         if ( this.setting.anchorLeftPct !== null )
         {
            //O this._anchorLeft = this.parent._width * this.setting.anchorLeftPct;
            this._anchorLeft = this.parent._width * this.setting.anchorLeftPct;
         }
         else
         {
            //O this._anchorLeft = this.setting.anchorLeft;
            this._anchorLeft = this.setting.anchorLeft;
         }
      }
      //O return this._anchorLeft;
      return this._anchorLeft;
   }

   //O anchorRight:
   get anchorRight(): number | string
   {
      //O return this.setting.anchorRight;
      return this.setting.anchorRight;
   }
   //O set: function( val )
   set anchorRight( val: number | string )
   {
      //O if ( isNaN( val ) && val.indexOf( '%' ) !== -1 )
      //New isNaN cannot be done on number
      if ( typeof val === 'string' && val.indexOf( '%' ) !== -1 )
      {
         //O this.setting.anchorRightPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
         this.setting.anchorRightPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
      }
      else
      {
         //O this.setting.anchorRightPct = null;
         this.setting.anchorRightPct = null;
      }

      //New isNaN cannot be done on number
      if ( typeof val === 'number' )
      {
         //O this.setting.anchorRight = val;
         this.setting.anchorRight = val;
         //O this.updatesettings( true );
         this.updatesettings( true );
      }
   }

   //O actual_anchorRight:
   get actual_anchorRight(): number
   {
      //O if ( this.dirty )
      if ( this.dirty )
      {
         //O if ( this.setting.anchorRightPct !== null )
         if ( this.setting.anchorRightPct !== null )
         {
            //O this._anchorRight = this.parent._width * this.setting.anchorRightPct;
            this._anchorRight = this.parent._width * this.setting.anchorRightPct;
         }
         else
         {
            //O this._anchorRight = this.setting.anchorRight;
            this._anchorRight = this.setting.anchorRight;
         }
      }
      //O return this._anchorRight;
      return this._anchorRight;
   }

   //O anchorTop:
   get anchorTop(): number | string
   {
      //O return this.setting.anchorTop;
      return this.setting.anchorTop;
   }
   //O set: function( val )
   set anchorTop( val: number | string )
   {
      //O if ( isNaN( val ) && val.indexOf( '%' ) !== -1 )
      //New isNaN cannot be done on number
      if ( typeof val === 'string' && val.indexOf( '%' ) !== -1 )
      {
         //O this.setting.anchorTopPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
         this.setting.anchorTopPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
      }
      else
      {
         //O this.setting.anchorTopPct = null;
         this.setting.anchorTopPct = null;
      }

      //New isNaN cannot be done on number
      if ( typeof val === 'number' )
      {
         //O this.setting.anchorTop = val;
         this.setting.anchorTop = val;
         //O this.updatesettings( true );
         this.updatesettings( true );
      }
   }

   //O actual_anchorTop:
   get actual_anchorTop( ): number
   {
      //O if ( this.dirty )
      if ( this.dirty )
      {
         //O if ( this.setting.anchorTopPct !== null )
         if ( this.setting.anchorTopPct !== null )
         {
            //O this._anchorTop = this.parent._height * this.setting.anchorTopPct;
            this._anchorTop = this.parent._height * this.setting.anchorTopPct;
         }
         else
         {
            //O this._anchorTop = this.setting.anchorTop;
            this._anchorTop = this.setting.anchorTop;
         }
      }
      //O return this._anchorTop;
      return this._anchorTop;
   }

   //O anchorBottom:
   get anchorBottom( ): number | string
   {
      //O return this.setting.anchorBottom;
      return this.setting.anchorBottom;
   }
   //O set: function( val )
   set anchorBottom ( val: number | string )
   {
      //O if ( isNaN( val ) && val.indexOf( '%' ) !== -1 )
      //New isNaN cannot be done on number
      if ( typeof val === 'string' && val.indexOf( '%' ) !== -1 )
      {
         //O this.setting.anchorBottomPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
         this.setting.anchorBottomPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
      }
      else
      {
         //O this.setting.anchorBottomPct = null;
         this.setting.anchorBottomPct = null;
      }

      //New isNaN cannot be done on number
      if ( typeof val === 'number' )
      {
         //O this.setting.anchorBottom = val;
         this.setting.anchorBottom = val;
         //O this.updatesettings( true );
         this.updatesettings( true );
      }
   }

   //O actual_anchorBottom:
   get actual_anchorBottom ( ): number
   {
      //O if ( this.dirty )
      if ( this.dirty )
      {
         //O if ( this.setting.anchorBottomPct !== null )
         if ( this.setting.anchorBottomPct !== null )
         {
            //O this._anchorBottom = this.parent._height * this.setting.anchorBottomPct;
            this._anchorBottom = this.parent._height * this.setting.anchorBottomPct;
         }
         else
         {
            //O this._anchorBottom = this.setting.anchorBottom;
            this._anchorBottom = this.setting.anchorBottom;
         }
      }
      //O return this._anchorBottom;
      return this._anchorBottom;
   }

   //O left:
   get left ( ): number | string
   {
      //O return this.setting.left;
      return this.setting.left;
   }
   //O set: function( val )
   set left( val: number | string )
   {
      //O if ( isNaN( val ) && val.indexOf( '%' ) !== -1 )
      //New isNaN cannot be done on number
      if ( typeof val === 'string' && val.indexOf( '%' ) !== -1 )
      {
         //O this.setting.leftPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
         this.setting.leftPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
      }
      else
      {
         //O this.setting.leftPct = null;
         this.setting.leftPct = null;
      }

      //New isNaN cannot be done on number
      if ( typeof val === 'number' )
      {
         //O this.setting.left = val;
         this.setting.left = val;
         //O this.updatesettings( true );
         this.updatesettings( true );
      }
   }

   //O actual_left:
   get actual_left ( ): number
   {
      //O if ( this.dirty )
      if ( this.dirty )
      {
         //O if ( this.setting.leftPct !== null )
         if ( this.setting.leftPct !== null )
         {
            //O this._left = this.parent._width * this.setting.leftPct;
            this._left = this.parent._width * this.setting.leftPct;
         }
         else
         {
            //O this._left = this.setting.left;
            this._left = this.setting.left;
         }
      }
      //O return this._left;
      return this._left;
   }

   //O right:
   get right ( ): number | string
   {
      //O return this.setting.right;
      return this.setting.right;
   }
   //O set: function( val )
   set right( val: number | string )
   {
      //O if ( isNaN( val ) && val.indexOf( '%' ) !== -1 )
      //New isNaN cannot be done on number
      if ( typeof val === 'string' && val.indexOf( '%' ) !== -1 )
      {
         //O this.setting.rightPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
         this.setting.rightPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
      }
      else
      {
         //O this.setting.rightPct = null;
         this.setting.rightPct = null;
      }

      //New isNaN cannot be done on number
      if ( typeof val === 'number' )
      {
         //O this.setting.right = val;
         this.setting.right = val;
         //O this.updatesettings( true );
         this.updatesettings( true );
      }
   }

   //O actual_right:
   get actual_right ( ): number
   {
      //O if ( this.dirty )
      if ( this.dirty )
      {
         //O if ( this.setting.rightPct !== null )
         if ( this.setting.rightPct !== null )
         {
            //O this._right = this.parent._width * this.setting.rightPct;
            this._right = this.parent._width * this.setting.rightPct;
         }
         else
         {
            //O this._right = this.setting.right;
            this._right = this.setting.right;
         }
      }
      //O return this._right;
      return this._right;
   }

   //O top:
   get top ( ): number | string
   {
      //O return this.setting.top;
      return this.setting.top;
   }
   //O set: function( val )
   set top ( val: number | string )
   {
      //O if ( isNaN( val ) && val.indexOf( '%' ) !== -1 )
      //New isNaN cannot be done on number
      if ( typeof val === 'string'  && val.indexOf( '%' ) !== -1 )
      {
         //O this.setting.topPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
         this.setting.topPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
      }
      else
      {
         //O this.setting.topPct = null;
         this.setting.topPct = null;
      }

      //New isNaN cannot be done on number
      if ( typeof val === 'number' )
      {
         //O this.setting.top = val;
         this.setting.top = val;
         //O this.updatesettings( true );
         this.updatesettings( true );
      }
   }

   //O actual_top:
   get actual_top ( ): number
   {
      //O if ( this.dirty )
      if ( this.dirty )
      {
         //O if ( this.setting.topPct !== null )
         if ( this.setting.topPct !== null )
         {
            //O this._top = this.parent._height * this.setting.topPct;
            this._top = this.parent._height * this.setting.topPct;
         }
         else
         {
            //O this._top = this.setting.top;
            this._top = this.setting.top;
         }
      }
      //O return this._top;
      return this._top;
   }

   //O bottom:
   get bottom ( ): number | string
   {
      //O return this.setting.bottom;
      return this.setting.bottom;
   }
   //O set: function( val )
   set bottom( val: number | string )
   {
      //O if ( isNaN( val ) && val.indexOf( '%' ) !== -1 )
      //New isNaN cannot be done on number
      if ( typeof val === 'string' && val.indexOf( '%' ) !== -1 )
      {
         //O this.setting.bottomPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
         this.setting.bottomPct = parseFloat( val.replace( '%', '' ) ) * 0.01;
      }
      else
      {
         //O this.setting.bottomPct = null;
         this.setting.bottomPct = null;
      }

      //New isNaN cannot be done on number
      if ( typeof val === 'number')
      {
         //O this.setting.bottom = val;
         this.setting.bottom = val;
         //O this.updatesettings( true );
         this.updatesettings( true );
      }
   }

   //O actual_bottom:
   get actual_bottom( ): number
   {
      //O if ( this.dirty )
      if ( this.dirty )
      {
         //O if ( this.setting.bottomPct !== null )
         if ( this.setting.bottomPct !== null )
         {
            //O this._bottom = this.parent._height * this.setting.bottomPct;
            this._bottom = this.parent._height * this.setting.bottomPct;
         }
         else
         {
            //O this._bottom = this.setting.bottom;
            this._bottom = this.setting.bottom;
         }
      }
      //O return this._bottom;
      return this._bottom;
   }

   //O verticalAlign:
   get verticalAlign( ): string              // holds strings of 'middle' 'bottom'
   {
      //O return this.setting.verticalAlign;
      return this.setting.verticalAlign;
   }
   //O set: function( val )
   set verticalAlign( val: string )          // holds strings of 'middle' 'bottom'
   {
      //O this.setting.verticalAlign = val;
      this.setting.verticalAlign = val;
      //O this.baseupdate( );
      this.baseupdate( );
   }

   //O valign:
   get valign( ): string                     // holds strings of 'middle' 'bottom'
   {
      //O return this.setting.verticalAlign;
      return this.setting.verticalAlign;
   }
   //O set: function( val )
   set valign( val: string )                 // holds strings of 'middle' 'bottom'
   {
      //O this.setting.verticalAlign = val;
      this.setting.verticalAlign = val;
      //O this.baseupdate( );
      this.baseupdate( );
   }

   //O horizontalAlign:
   get horizontalAlign( ): string            // holds strings of 'right' 'left' 'center'
   {
      //O return this.setting.horizontalAlign;
      return this.setting.horizontalAlign;
   }
   //O set: function( val )
   set horizontalAlign( val: string )        // holds strings of 'right' 'left' 'center'
   {
      //O this.setting.horizontalAlign = val;
      this.setting.horizontalAlign = val;
      //O this.baseupdate( );
      this.baseupdate( );
   }

   //O align:
   get align( ): string                      // holds strings of 'right' 'left' 'center'
   {
      //O return this.setting.horizontalAlign;
      return this.setting.horizontalAlign;
   }
   //O set: function( val )
   set align( val: string )                 // holds strings of 'right' 'left' 'center'
   {
      //O this.setting.horizontalAlign = val;
      this.setting.horizontalAlign = val;
      //O this.baseupdate( );
      this.baseupdate( );
   }

   //O tint:
   get tint( ): number
   {
      //O return this.setting.tint;
      return this.setting.tint;
   }
   //O set: function( val )
   set tint( val: number )
   {
      //O this.setting.tint = val;
      this.setting.tint = val;
      //O this.update( );
      this.update( );
   }

   //O alpha:
   get alpha( ): number
   {
      //O return this.setting.alpha;
      return this.setting.alpha;
   }
   //O set: function( val )
   set alpha( val: number )
   {
      //O this.setting.alpha = val;
      this.setting.alpha = val;
      //O this.container.alpha = val;
      this.container.alpha = val;
   }

   //O rotation:
   get rotation( ): number
   {
      //O return this.setting.rotation;
      return this.setting.rotation;
   }
   //O set: function( val )
   set rotation( val:number )
   {
      //O this.setting.rotation = val;
      this.setting.rotation = val;
      //O this.container.rotation = val;
      this.container.rotation = val;
   }

   //O blendMode:
   get blendMode( ): number
   {
      //O return this.setting.blendMode;
      return this.setting.blendMode;
   }
   //O set: function( val )
   set blendMode( val: number )
   {
      //O this.setting.blendMode = val;
      this.setting.blendMode = val;
      //O this.update( );
      this.update( );
   }

   // //O pivotX:
   //N Combine as PIXI has it
   // get pivot( ): number
   // {
   //    //O return this.setting.pivotX;
   //    return this.setting.pivotX;
   // }
   // //O set: function( val )
   //N Combine as PIXI has it
   // set pivotX( val: number )
   // {
   //    //O this.setting.pivotX = val;
   //    this.setting.pivotX = val;
   //    //O this.baseupdate( );
   //    this.baseupdate( );
   //    //O this.update( );
   //    this.update( );
   // }

   // //O pivotY:
   //N Combine as PIXI has it
   // get pivotY( ): number
   // {
   //    //O return this.setting.pivotY;
   //    return this.setting.pivotY;
   // }
   //O set: function( val )
   //N Combine as PIXI has it
   // set pivotY( val: number )
   // {
   //    //O this.setting.pivotY = val;
   //    this.setting.pivotY = val;
   //    //O this.baseupdate( );
   //    this.baseupdate( );
   //    //O this.update( );
   //    this.update( );
   // }

   //O pivot:
   //N Combine as PIXI has it
   set pivot( val: PIXI.Point )
   {
      //O this.setting.pivotX = val;
      this.setting.pivot = val;
      //O this.setting.pivotY = val;
      // this.setting.pivotY = val;

      //O this.baseupdate( );
      this.baseupdate( );
      //O this.update( );
      this.update( );
   }

   // //O scaleX:
   //N Combine as PIXI has it
   //get scaleX( ): number
   //{
   //   //O return this.setting.scaleX;
   //   return this.setting.scaleX;
   //}
   // //O set: function( val )
   //N Combine as PIXI has it
   //set scaleX( val: number )
   //{
   //   //O this.setting.scaleX = val;
   //   this.setting.scaleX = val;
   //   //O this.container.scale.x = val;
   //   this.container.scale.x = val;
   //}

   // //O scaleY:
   //N Combine as PIXI has it
   //get scaleY( ): number
   //{
   //   //O return this.setting.scaleY;
   //   return this.setting.scaleY;
   //}
   // //O set: function( val )
   //N Combine as PIXI has it
   //set scaleY( val: number )
   //{
   //   //O this.setting.scaleY = val;
   //   this.setting.scaleY = val;
   //   //O this.container.scale.y = val;
   //   this.container.scale.y = val;
   //}

   //O scale:
   //O get scale( ): number
   //N Combine as PIXI has it
   get scale( ): PIXI.Point
   {
      //O return this.setting.scaleX;
      return this.setting.scale;
   }
   //O set: function( val )
   //N Combine as PIXI has it
   set scale( val: PIXI.Point )
   {
      //O this.setting.scaleX = val;
      this.setting.scale = val;
      //O this.setting.scaleY = val;
      //this.setting.scaleY = val;

      //O this.container.scale.x = val;
      this.container.scale = val;
      //O this.container.scale.y = val;
      //this.container.scale.y = val;
   }

   //O draggable:
   get draggable( ): boolean
   {
      //O return this.setting.draggable;
      return this.setting.draggable;
   }
   //O set: function( val )
   set draggable( val: boolean )
   {
      //O this.setting.draggable = val;
      this.setting.draggable = val;
      //O if ( this.initialized )
      if ( this.initialized )
      {
         //O if ( val )
         if ( val )
         {
            //O this.initDraggable( );
            this.initDraggable( );
         }
         else
         {
            //O this.clearDraggable( );
            this.clearDraggable( );
         }
      }
   }

   //O dragRestricted:
   get dragRestricted( ): boolean
   {
      //O return this.setting.dragRestricted;
      return this.setting.dragRestricted;
   }
   //O set: function( val )
   set dragRestricted( val: boolean )
   {
      //O this.setting.dragRestricted = val;
      this.setting.dragRestricted = val;
   }

   //O dragRestrictAxis:
   get dragRestrictAxis( ): string    // 'x' || 'y' for example
   {
      //O return this.setting.dragRestrictAxis;
      return this.setting.dragRestrictAxis;
   }
   //O set: function( val )
   set dragRestrictAxis( val: string )
   {
      //O this.setting.dragRestrictAxis = val;
      this.setting.dragRestrictAxis = val;
   }

   //O dragThreshold:
   get dragThreshold( ): number
   {
      //O return this.setting.dragThreshold;
      return this.setting.dragThreshold;
   }
   //O set: function( val )
   set dragThreshold( val: number )
   {
      //O this.setting.dragThreshold = val;
      this.setting.dragThreshold = val;
   }

   //O dragGroup:
   get dragGroup( ): string
   {
      //O return this.setting.dragGroup;
      return this.setting.dragGroup;
   }
   //O set: function( val )
   set dragGroup( val: string )
   {
      //O this.setting.dragGroup = val;
      this.setting.dragGroup = val;
   }

   //O dragContainer:
   get dragContainer( ): PIXI.Container
   {
      //O return this.setting.dragContainer;
      return this.setting.dragContainer;
   }
   //O set: function( val )
   set dragContainer( val: PIXI.Container )
   {
      //O this.setting.dragContainer = val;
      this.setting.dragContainer = val;
   }

   //O droppable:
   get droppable( ): boolean
   {
      //O return this.setting.droppable;
      return this.setting.droppable;
   }
   //O set: function( val )
   set droppable( val: boolean )
   {
      //O this.setting.droppable = true;
      this.setting.droppable = true;
      //O if ( this.initialized )
      if ( this.initialized )
      {
         //O if ( val )
         if ( val )
         {
            //O this.initDroppable( );
            this.initDroppable( );
         }
         else
         {
            //O this.clearDroppable( );
            this.clearDroppable( );
         }
      }
   }

   //O droppableReparent:
   get droppableReparent( ): UIBase
   {
      //O return this.setting.droppableReparent;
      return this.setting.droppableReparent;
   }
   //O set: function( val )
   set droppableReparent( val: UIBase )
   {
      //O this.setting.droppableReparent = val;
      this.setting.droppableReparent = val;
   }

   //O dropGroup:
   get dropGroup( ): string
   {
      //O return this.setting.dropGroup;
      return this.setting.dropGroup;
   }
   //O set: function( val )
   set dropGroup( val: string )
   {
      //O this.setting.dropGroup = val;
      this.setting.dropGroup = val;
   }

   //O renderable:
   get renderable( ): boolean
   {
      //O return this.container.renderable;
      return this.container.renderable;
   }
   //O set: function( val )
   set renderable( val: boolean )
   {
      //O this.container.renderable = val;
      this.container.renderable = val;
   }

   //O visible:
   get visible( ): boolean
   {
      //O return this.container.visible;
      return this.container.visible;
   }
   //O set: function( val )
   set visible( val: boolean )
   {
      //O this.container.visible = val;
      this.container.visible = val;
   }

   //O cacheAsBitmap:
   get cacheAsBitmap( ): boolean
   {
      //O return this.container.cacheAsBitmap;
      return this.container.cacheAsBitmap;
   }
   //O set: function( val )
   set cacheAsBitmap( val: boolean )
   {
      //O this.container.cacheAsBitmap = val;
      this.container.cacheAsBitmap = val;
   }

   //O onClick:
   get onClick( ): () => void
   {
      //O return this.container.click;
      //N Property 'click' does not exist on type 'PIXI.Container';
      return this.click;
   }
   //O set: function( val )
   set onClick( val: ( () => void ) )
   {
      //O this.container.click = val;
      //N Property 'click' does not exist on type 'PIXI.Container';
      this.click = val;
   }

   //New PIXI.container does not have a function called click
   public click ()
   {
        this.emit("click");
   };

   //O interactive:
   get interactive( ): boolean
   {
      //O return this.container.interactive;
      return this.container.interactive;
   }
   //O set: function( val )
   set interactive( val: boolean )
   {
      //O this.container.interactive = val;
      this.container.interactive = val;
   }

   //O interactiveChildren:
   get interactiveChildren( ): boolean
   {
      //O return this.container.interactiveChildren;
      return this.container.interactiveChildren;
   }
   //O set: function( val )
   set interactiveChildren( val: boolean )
   {
      //O this.container.interactiveChildren = val;
      this.container.interactiveChildren = val;
   }

   //O parentLayer:
   //N parentLayer is Unused in project
   //get parentLayer( ): number
   //{
     //O return this.container.parentLayer;
   //  return this.container.parentLayer;
   //}
   //O set: function( val )
   //N parentLayer is Unused in project
   //set parentLayer( val: number )
   //{
        //O this.container.parentLayer = val;
   //   this.container.parentLayer = val;
   //}
};

//O UIBase.prototype = Object.create( PIXI.utils.EventEmitter.prototype );
//N Add eventEmiter functionality to UIBase
//UIBase.prototype = Object.create( PIXI.utils.EventEmitter.prototype );

//O UIBase.prototype.constructor = UIBase;
//O module.exports = UIBase;


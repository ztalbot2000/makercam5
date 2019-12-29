//import { Container } from './Container';
import { UIBase } from './UIBase';

//
// Settings object for all UIObjects
//
// @class
// @memberof PIXI.UI
//

export class UISettings
{
   //O this.width = 0;
   width: number = 0;
   //O this.height = 0;
   height: number = 0;
   //O this.minHeight = 0;
   minHeight: number = 0;
   //O this.maxWidth = null;
   maxWidth: number = null;
   //O this.maxHeight = null;
   maxHeight: number = null;
   //O this.left = null;
   left: number = null;
   //O this.right = null;
   right: number = null;
   top: number = null;
   //O this.bottom = null;
   bottom: number = null;
   //O this.anchorLeft = null;
   anchorLeft: number = null;
   //O this.anchorRight = null;
   anchorRight: number = null;
   //O this.anchorTop = null;
   anchorTop: number = null;
   //O this.anchorBottom = null;
   anchorBottom: number = null;

   //O this.widthPct = null;
   widthPct: number = null;
   //O this.heightPct = null;
   heightPct: number = null;
   //O this.minWidthPct = null;
   minWidthPct: number = null;
   //O this.minHeightPct = null;
   minHeightPct: number = null;
   //O this.maxWidthPct = null;
   maxWidthPct: number = null;
   //O this.maxHeightPct = null;
   maxHeightPct: number = null;
   //O this.minWidth = 0;
   minWidth: number = 0;
   //O this.leftPct = null;
   leftPct: number = null;
   //O this.rightPct = null;
   rightPct: number = null;
   //O this.topPct = null;
   topPct: number = null;
   //O this.bottomPct = null;
   bottomPct: number = null;
   //O this.anchorLeftPct = null;
   anchorLeftPct: number = null;
   //O this.anchorRightPct = null;
   anchorRightPct: number = null;
   //O this.anchorTopPct = null;
   anchorTopPct: number = null;
   //O this.anchorBottomPct = null;
   anchorBottomPct: number = null;

   //O pivotX: number = 0;
   //O pivotY: number = 0;
   //N Combine as PIXI has it
   pivot: PIXI.Point = new PIXI.Point( 0, 0 );
   //O scaleX: number = 1;
   //O scaleY: number = 1;
   //N Combine as PIXI has it
   scale: PIXI.Point = new PIXI.Point(1, 1);

   //NC holds strings of 'middle' 'bottom'
   //O verticalAlign = null;
   verticalAlign: string = null;
   //NC holds strings of 'right' 'left' 'center'
   //O horizontalAlign = null;
   horizontalAlign: string = null;
   //O rotation = null;
   rotation: number = null;
   //O blendMode = null;
   blendMode: number = null;
   //O tint = null;
   tint: number = null;
   //O alpha = 1;
   alpha: number = 1;


   //O draggable = false
   draggable: boolean = false;
   //O dragRestricted = false
   dragRestricted: boolean = false;
   //holds strings of 'x' 'y'
   //O dragRestrictAxis = null
   dragRestrictAxis: string = null;
   //O dragThreshold = 0;
   dragThreshold: number = 0;
   //O dragGroup = null;
   dragGroup: string = null;
   //O dragContainer = null;
   dragContainer: PIXI.Container = null;
   //O droppable = null;
   droppable: boolean = false;
   //O droppableReparent = null;
   droppableReparent: UIBase = null;
   //O dropGroup = null;
   dropGroup: string = null;
}

//O module.exports = UISettings;

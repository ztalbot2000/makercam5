//import { Container } from './Container';
import { UIBase } from './UIBase';
/**
 * Settings object for all UIObjects
 *
 * @class
 * @memberof PIXI.UI
 */
export class UISettings
{
   width: number = 0;
   height: number = 0;
   minHeight: number = 0;
   maxWidth: number = null;
   maxHeight: number = null;
   left: number = null;
   right: number = null;
   top: number = null;
   bottom: number = null;
   anchorLeft: number = null;
   anchorRight: number = null;
   anchorTop: number = null;
   anchorBottom: number = null;

   widthPct: number = null;
   heightPct: number = null;
   minWidthPct: number = null;
   minHeightPct: number = null;
   maxWidthPct: number = null;
   maxHeightPct: number = null;
   minWidth: number = 0;
   leftPct: number = null;
   rightPct: number = null;
   topPct: number = null;
   bottomPct: number = null;
   anchorLeftPct: number = null;
   anchorRightPct: number = null;
   anchorTopPct: number = null;
   anchorBottomPct: number = null;

   //O pivotX: number = 0;
   //O pivotY: number = 0;
   //N Combine as PIXI has it
   pivot: PIXI.Point = new PIXI.Point( 0, 0 );
   //O scaleX: number = 1;
   //O scaleY: number = 1;
   //N Combine as PIXI has it
   scale: PIXI.Point = new PIXI.Point(1, 1);

   verticalAlign: string = null;     // holds strings of 'middle' 'bottom'
   horizontalAlign: string = null;   // holds strings of 'right' 'left' 'center'
   rotation: number = null;
   blendMode: number = null;
   tint: number = null;
   alpha: number = 1;


   draggable: boolean = false;
   dragRestricted: boolean = false;
   dragRestrictAxis: string = null; //holds strings of 'x' 'y'
   dragThreshold: number = 0;
   dragGroup: string = null;
   //New
   //container: Container = null;
   //dragContainer: PIXI.Sprite = null;
   dragContainer: PIXI.Container = null;
   droppable: boolean = false;
   droppableReparent: UIBase = null;
   dropGroup: string = null;

}

/**
 * Settings object for all UIObjects
 *
 * @class
 * @memberof PIXI.UI
 */
export default class UISettings
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

   pivotX: number = 0;
   pivotY: number = 0;
   scaleX: number = 1;
   scaleY: number = 1;
   verticalAlign: number = null;
   horizontalAlign: number = null;
   rotation: number = null;
   blendMode: number = null;
   tint: number = null;
   alpha: number = 1;


   draggable: number = null;
   dragRestricted: boolean = false;
   dragRestrictAxis: number = null; //x, y
   dragThreshold: number = 0;
   dragGroup: number = null;
   dragContainer: number = null;
   droppable: number = null;
   droppableReparent: number = null;
   dropGroup: number = null;

}

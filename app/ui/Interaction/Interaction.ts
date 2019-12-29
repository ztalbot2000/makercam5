//O ClickEvent: require('./ClickEvent'),
import { ClickEvent } from './ClickEvent';
//O DragEvent: require('./DragEvent'),
import { DragEvent } from './DragEvent';
//O MouseScrollEvent: require('./MouseScrollEvent'),
import { MouseScrollEvent } from './MouseScrollEvent';
//O InputController: require('./InputController')
//N No brackets, imports the default created InputController instance from new.
import InputController from './InputController';



//O var Interaction =
export var Interaction =
// export interface Interaction
{
   //O ClickEvent: require('./ClickEvent'),
   ClickEvent: ClickEvent,
   //O DragEvent: require('./DragEvent'),
   DragEvent: DragEvent,
   //O MouseScrollEvent: require('./MouseScrollEvent'),
   MouseScrollEvent: MouseScrollEvent,
   //O InputController: require('./InputController')
   InputController: InputController,
};

// let stage = require('./Stage');
import { Stage } from './Stage';
// let container = require('./Container');
import { Container } from './Container';
// let dynamicText = require('./DynamicText/DynamicText');
import { DynamicText } from './DynamicText/DynamicText';
// let dynamicTextStyle = require('./DynamicText/DynamicTextStyle');
import { DynamicTextStyle } from './DynamicText/DynamicTextStyle';
// let helpers = require('./Helpers');
import { Helpers } from './Helpers';
// let tween = require('./Tween');
import { Tween } from './Tween';
// let ease = require('./Ease/Ease');
import { Ease } from './Ease/Ease';
// let interaction = require('./Interaction/Interaction');
// import { Interaction } from './Interaction/Interaction';
// let ticker = require('./Ticker';
import  { Ticker } from './Ticker';

// let clickEvent = require( './Interaction/ClickEvent' );
import { ClickEvent } from './Interaction/ClickEvent';
// let dragEvent = require( './Interaction/DragEvent';
import { DragEvent } from './Interaction/DragEvent';
// let mouseScrollEvent = require( './Interaction/MouseScrollEvent' );
import { MouseScrollEvent } from './Interaction/MouseScrollEvent';
// let inputController = require( './Interaction/InputController' );
import { InputController } from './Interaction/InputController';






// let base = require('./UIBase');
import { UIBase } from './UIBase';

//O var UI = {
export interface UI
{

    //O Stage: require('./Stage'),
    //Stage: require('./Stage'),
    Stage: Stage,
    // get Stage () { return stage };
    //O Container: require('./Container'),
    // Container: require('./Container'),
    Container: Container,
    // get Container () { return container };
    //O ScrollingContainer: require('./ScrollingContainer'),
    //ScrollingContainer: require('./ScrollingContainer'),
    //O SortableList: require('./SortableList'),
    //SortableList: require('./SortableList'),
    //O Sprite: require('./Sprite'),
    //Sprite: require('./Sprite'),
    //O TilingSprite: require('./TilingSprite'),
    //TilingSprite: require('./TilingSprite'),
    //O SliceSprite: require('./SliceSprite'),
    //SliceSprite: require('./SliceSprite'),
    //O Slider: require('./Slider'),
    //Slider: require('./Slider'),
    //O ScrollBar: require('./ScrollBar'),
    //ScrollBar: require('./ScrollBar'),
    //O Text: require('./Text'),
    //Text: require('./Text'),
    //O DynamicText: require('./DynamicText/DynamicText'),
    // DynamicText: require('./DynamicText/DynamicText'),
    DynamicText: DynamicText,
    // get DynamicText() { return dynamicText };
    //O DynamicTextStyle: require('./DynamicText/DynamicTextStyle'),
    // DynamicTextStyle: require('./DynamicText/DynamicTextStyle'),
    //get DynamicTextStyle() { return dynamicTextStyle };
    DynamicTextStyle: DynamicTextStyle,
    //O TextInput: require('./TextInput'),
    //TextInput: require('./TextInput'),
    //O Button: require('./Button'),
    //Button: require('./Button'),
    //O CheckBox: require('./CheckBox'),
    //CheckBox: require('./CheckBox'),
    //O Helpers: require('./Helpers'),
    // Helpers: require('./Helpers'),
    //get Helpers() { return helpers };
    Helpers: Helpers,
    //O Tween: require('./Tween'),
    // Tween: require('./Tween'),
    // get Tween() { return tween };
    Tween: Tween,
    //O Ease: require('./Ease/Ease'),
    // Ease: require('./Ease/Ease'),
    // get Ease() { return ease };
    Ease: Ease,
    //O Interaction: require('./Interaction/Interaction'),
    // Interaction: require('./Interaction/Interaction'),
    // get Interaction() { return interaction };
    // Interaction: Interaction,
    //get ClickEvent() { return clickEvent };
    ClickEvent:  ClickEvent,
    //get DragEvent() { return dragEvent };
    DragEvent: DragEvent,
    //get MouseScrollEvent() { return mouseScrollEvent };
    MouseScrollEvent:  MouseScrollEvent,
    //get InputController() { return inputController };
    InputController: InputController,




    //O Base: require('./UIBase'),
    // Base: require('./UIBase'),
    // get Base() { return base };
    UIBase: UIBase,
    //O Ticker: require('./Ticker').shared,
    //Ticker: require('./Ticker').shared,
    // get Ticker() { return ticker.shared };
    Ticker: Ticker,
};

//O module.exports = UI;
// module.exports = UI;

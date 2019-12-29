//O stage = require('./Stage');
import { Stage } from './Stage';
//O container = require('./Container');
import { Container } from './Container';
//O ScrollingContainer: require('./ScrollingContainer'),
// import { ScrollingContainer } from './ScrollingContainer';
//O SortableList: require('./SortableList');
import { SortableList } from './SortableList';
//O Sprite: require('./Sprite');
import { Sprite } from './Sprite';
//O TilingSprite: require('./TilingSprite');
import { TilingSprite } from './TilingSprite';
//O SliceSprite: require('./SliceSprite');
import { SliceSprite } from './SliceSprite';
//O Slider: require('./Slider');
import { Slider } from './Slider';
//O ScrollBar: require('./ScrollBar');
// import { ScrollBar } from './ScrollBar';
//O Text: require('./Text');
import { Text } from './Text';
//O dynamicText = require('./DynamicText/DynamicText');
import { DynamicText } from './DynamicText/DynamicText';
//O dynamicTextStyle = require('./DynamicText/DynamicTextStyle');
import { DynamicTextStyle } from './DynamicText/DynamicTextStyle';
//O Button: require('./Button');
// import { Button } from './Button';
//O CheckBox: require('./CheckBox');
// import { CheckBox } from './CheckBox';
//O helpers = require('./Helpers');
import { Helpers } from './Helpers';
//O tween = require('./Tween');
import { Tween } from './Tween';
//O ease = require('./Ease/Ease');
import  Ease  from './Ease/Ease';
//O interaction = require('./Interaction/Interaction');
import { Interaction } from './Interaction/Interaction';
//O Base = require('./UIBase';
import  { UIBase } from './UIBase';
//O Ticker = require('./Ticker';
import  { Ticker } from './Ticker';

//O var UI =
 export var UI =
//export interface UI
{

    //O Stage: require('./Stage'),
    Stage: Stage,
    //O Container: require('./Container'),
    Container: Container,
    //O ScrollingContainer: require('./ScrollingContainer'),
    // ScrollingContainer: ScrollingContainer,
    //O SortableList: require('./SortableList'),
    SortableList: SortableList,
    // SortableList: require('./SortableList'),
    //O Sprite: require('./Sprite'),
    Sprite: Sprite,
    //O TilingSprite: require('./TilingSprite'),
    TilingSprite: TilingSprite,
    //O SliceSprite: require('./SliceSprite'),
    SliceSprite: SliceSprite,
    //O Slider: require('./Slider'),
    Slider: Slider,
    //O ScrollBar: require('./ScrollBar'),
    // ScrollBar: ScrollBar,
    //O Text: require('./Text'),
    Text: Text,
    //O DynamicText: require('./DynamicText/DynamicText'),
    DynamicText: DynamicText,
    //O DynamicTextStyle: require('./DynamicText/DynamicTextStyle'),
    DynamicTextStyle: DynamicTextStyle,
    //O TextInput: require('./TextInput'),
    // TextInput: TextInput,
    //O Button: require('./Button'),
    // Button: Button,
    //O CheckBox: require('./CheckBox'),
    // CheckBox: CheckBox,
    //O Helpers: require('./Helpers'),
    Helpers: Helpers,
    //O Tween: require('./Tween'),
    Tween: Tween,
    //O Ease: require('./Ease/Ease'),
    Ease: Ease,
    //O Interaction: require('./Interaction/Interaction'),
    Interaction: Interaction,
    //O Base: require('./UIBase'),
    Base: UIBase,
    //O Ticker: require('./Ticker').shared,
    //Hmmm Fixme?  FixMe fixMe fixme. Needs to be Ticker.shared ????
    Ticker: Ticker,
};

//O module.exports = UI;
// module.exports = UI;

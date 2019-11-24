var InputBase = require('./InputBase'),
    ClickEvent = require('./Interaction/ClickEvent.js'),
    InputController = require('./Interaction/InputController');

/**
 * An UI button object
 *
 * @class
 * @extends PIXI.UI.InputBase
 * @memberof PIXI.UI
 * @param [options.background}] {(PIXI.UI.SliceSprite|PIXI.UI.Sprite)} will be used as background for Button
 * @param [options.text=null] {PIXI.UI.Text} optional text
 * @param [options.tabIndex=0] {Number} input tab index
 * @param [options.tabGroup=0] {Number|String} input tab group
 * @param [options.width=options.background.width] {Number|String} width
 * @param [options.height=options.background.height] {Number|String} height
 */

function Button(options) {
    InputBase.call(this, options.width || (options.background ? options.background.width : 100), options.height || (options.background ? options.background.height : 20), options.tabIndex || 0, options.tabGroup || 0);
    this.background = options.background;

    if (this.background) {
        this.background.width = "100%";
        this.background.height = "100%";
        this.background.pivot = 0.5;
        this.background.verticalAlign = "middle";
        this.background.horizontalAlign = "center";
        this.addChild(this.background);

    }
    this.isHover = false;

    this.uiText = options.text;
    if (this.uiText) {
        this.uiText.verticalAlign = "middle";
        this.uiText.horizontalAlign = "center";
        this.addChild(this.uiText);
    }

    this.container.buttonMode = true;
   

    var self = this;
    //var keyDownEvent = function (e) {
    //    if (e.which === 32) { //space
    //        self.click();
    //    }
    //};

    var clickEvent = new ClickEvent(this);
    clickEvent.onHover = function (e, over) {
        this.isHover = over;
        self.emit("hover", over);
    };


    clickEvent.onPress = function (e, isPressed) {
        if (isPressed) {
            self.focus();
            e.data.originalEvent.preventDefault();
        }
        self.emit("press", isPressed);
    };

    clickEvent.onClick = function (e) {
        self.click();
    };

    this.click = function () {
        self.emit("click");
    };


    this.focus = function () {
        if (!this._focused) {
            InputBase.prototype.focus.call(this);
            //document.addEventListener("keydown", keyDownEvent, false);
        }

    };

    this.blur = function () {
        if (this._focused) {
            InputBase.prototype.blur.call(this);
            //document.removeEventListener("keydown", keyDownEvent);
        }
    };

    this.initialize = function () {
        InputBase.prototype.initialize.call(this);
        this.container.interactiveChildren = false;

        var self = this;
        //lazy to make sure all children is initialized (trying to get the bedst hitArea possible)
        setTimeout(function () {
            var bounds = self.container.getLocalBounds();
            self.container.hitArea = new PIXI.Rectangle(bounds.x < 0 ? bounds.x : 0, bounds.y < 0 ? bounds.y : 0, Math.max(bounds.x + bounds.width + (bounds.x < 0 ? -bounds.x : 0), self._width), Math.max(bounds.y + bounds.height + (bounds.y < 0 ? -bounds.y : 0), self._height));
        }, 20);
    };

}

Button.prototype = Object.create(InputBase.prototype);
Button.prototype.constructor = Button;
module.exports = Button;

Object.defineProperties(Button.prototype, {
    value: {
        get: function () {
            if (this.uiText) {
                return this.uiText.text;
            }
            return "";
        },
        set: function (val) {
            if (this.uiText) {
                this.uiText.text = val;
            }
        }
    },
    text: {
        get: function () {
            return this.uiText;
        },
        set: function (val) {
            this.value = val;
        }
    }
});



/*
 * Features:
 * Button, radio button (checkgroups)
 * 
 * Methods:
 * blur()
 * focus()
 * 
 * Properties:
 * checked: get/set Button checked
 * value: get/set Button value
 * 
 * Events:
 * "hover"          param: [bool]isHover (hover/leave)
 * "press"          param: [bool]isPressed (pointerdown/pointerup)
 * "click"
 * "blur"
 * "focus"
 * "focusChanged"   param: [bool]isFocussed
 *  
 */
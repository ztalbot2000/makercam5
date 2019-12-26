/*

import { UIBase } from '../ui/UIBase';
export { UIBase };

import { Container } from '../ui/Container';
export { Container };

import { UISettings } from '../ui/UISettings';
export { UISettings };

import { ease }  from '../ui/Ease/Ease';
export { ease };

import { Helpers } from '../ui/Helpers';
export { Helpers };

import { Tween }  from '../ui/Tween';
export { Tween };

import { DynamicText } from '../ui/DynamicText/DynamicText';
export { DynamicText };

import {  ClickEvent, DragEvent, MouseScrollEvent, InputController  } from '../ui/Interaction/Interaction';
export { ClickEvent, DragEvent, MouseScrollEvent, InputController  };

*/

import * as PIXI from 'pixi.js'
import { UI } from '../ui/UI';

const Library = {
    UI: UI
};

// dump everything into extras

Object.assign(PIXI, Library);

module.exports = Library;

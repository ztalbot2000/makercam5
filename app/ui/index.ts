//O UI: require('./UI')
import { UI } from './UI';

//N
import * as PIXI from 'pixi.js';

//O var Library = {
export var Library = {
    //O UI: require('./UI')
    UI: UI,
};

//O //dump everything into extras

//O Object.assign(PIXI, Library);
Object.assign(PIXI, Library);

//O module.exports = Library;

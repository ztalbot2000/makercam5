//O UI: require('./UI')
import { UI } from './UI';

//N
//import * as PIXI from 'pixi.js';

//O var Library = {
var Library = {
    //UI: require('./UI')
    UI: UI,
};

//O //dump everything into extras

//O Object.assign(PIXI, Library);
Object.assign(PIXI, Library);

//O module.exports = Library;
module.exports = Library;

import * as $ from 'jquery';
import * as PIXI from 'pixi.js';

import Grid from '../partKart/Grid';

$(document).ready(function()
{
  var app = new PIXI.Application({ width: 640, height: 360 });
  document.body.appendChild(app.view);

  var grid = new Grid();
  app.stage.addChild(grid);
});

import * as $ from 'jquery';
import mathAPI from '../math/operations';
import { Global }  from '../partKart/Global';
//import Individual  from '../partKart/Individual';
import Grid  from '../partKart/Grid';

$(document).ready(function()
{
  var app = new PIXI.Application({ width: 640, height: 360 });
  document.body.appendChild(app.view);

  var grid = new Grid();
  app.stage.addChild(grid);
  $(".myButton").click(function () {
   var message : string  = "5 + 3 = " 
                 + mathAPI.add(5,3) 
                 + ", 5 * 3 = "
                 + mathAPI.multiply(5,3) 
                 + "\n\n Global.zoom=" + Global.zoom
    
    alert(message);
  });
});

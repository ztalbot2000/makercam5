import $ from 'jquery';
import mathAPI from '../math/operations.js';
// Works
// import GlobalClass from './com/partKart/Global.js';
// var gc = new GlobalClass.GlobalClass("blast");
//                 + "\n\n Global.zoom=" + gc.zoom
import Global  from '../partKart/Global.js';
import Individual  from '../partKart/Individual.js';

$(document).ready(function() {
  $(".myButton").click(function () {
   var message = "5 + 3 = " 
                 + mathAPI.add(5,3) 
                 + ", 5 * 3 = "
                 + mathAPI.multiply(5,3) 
                 + ", Even in [1,2,3,4,5] are "
                 + mathAPI.evenNums([1,2,3,4,5])
                 + "\n\n Global.zoom=" + Global.zoom
    
    alert(message);
  });
});

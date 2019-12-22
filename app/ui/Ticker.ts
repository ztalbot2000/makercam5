var Tween = require('./Tween');

import * as PIXI from 'pixi.js'


//class Ticker extends PIXI.utils.EventEmitter
export class Ticker
{
   _disabled: boolean;
   _now: number;
   DeltaTime: number;
   Time: number;
   Ms: number;
   EE: PIXI.utils.EventEmitter;

   static shared: Ticker;

   constructor (autoStart?: boolean)
   {
      this._disabled = true;
      if ( ! Ticker.shared )
      {

         this._now = 0;

         this.DeltaTime = 0;
         this.Time = performance.now();
         this.Ms = 0;

         if (autoStart)
         {
            this.disabled = false;
         }

         Ticker.shared = new Ticker(true);
         this.EE = new PIXI.utils.EventEmitter();
      }
      // Ticker.shared = this;
      return Ticker.shared;
   }
   //
   // Updates the text
   //
   // @private
   //
   private static update (time :number)
   {
       Ticker.shared._now = time;
       Ticker.shared.Ms = Ticker.shared._now - Ticker.shared.Time;
       Ticker.shared.Time = Ticker.shared._now;
       Ticker.shared.DeltaTime = Ticker.shared.Ms * 0.001;
       Ticker.shared.EE.emit("update", Ticker.shared.DeltaTime);
       //Tween._update(this.DeltaTime);
       Tween._update(Ticker.shared.DeltaTime);

       if (!Ticker.shared._disabled)
           requestAnimationFrame(Ticker.update);
   }

   public on = (event: string, fn: Function, context: any) =>
   {
      Ticker.shared.EE.on(event, fn, context);
   }

   public once = (event: string, fn: Function, context: any) =>
   {
      Ticker.shared.EE.once(event, fn, context);
   }

   public removeListener = (event: string, fn: Function) =>
   {
      Ticker.shared.EE.removeListener(event, fn);
   };

   get disabled (): boolean
   {
      return this._disabled;
   }
   set disabled (val: boolean)
   {
      if (!this._disabled) {
         this._disabled = true;
      }
      else
      {
         if (val == false)
            this._disabled = false;

         this._disabled = false;
         Ticker.shared = this;
         //O this.update(performance.now(), true);
         Ticker.update(performance.now());
      }
   }
}

//O Ticker.shared = new Ticker(true);
let ticker = new Ticker(true);
export default ticker ;
//O module.exports = Ticker;





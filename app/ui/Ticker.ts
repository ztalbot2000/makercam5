
import * as PIXI from 'pixi.js'

//O var Tween = require('./Tween');
//N No brackets, imports the default created Tween Instance from new.
import  Tween  from './Tween';

//class Ticker extends PIXI.utils.EventEmitter
export class Ticker extends PIXI.utils.EventEmitter
{
   //O this._disabled = true;
   _disabled: boolean;
   //O this._now = 0;
   _now: number;
   //O this.DeltaTime = 0;
   DeltaTime: number;
   //O this.Time = performance.now();
   Time: number;
   //O this.Ms = 0;
   Ms: number;

   static shared: Ticker;

   constructor (autoStart?: boolean)
   {
      // PIXI.utils.EventEmitter.call(this);
      super();

      //O this._disabled = true;
      this._disabled = true;
      if ( ! Ticker.shared )
      {
         //O this._now = 0;
         this._now = 0;

         //O this.DeltaTime = 0;
         this.DeltaTime = 0;
         //O this.Time = performance.now();
         this.Time = performance.now();
         //O this.Ms = 0;
         this.Ms = 0;

         //O if (autoStart)
         if (autoStart)
         {
            //O this.disabled = false;
            this.disabled = false;
         }

         //O Ticker.shared = this;
         Ticker.shared = new Ticker(true);
      }
      // Ticker.shared = this;
      return Ticker.shared;
   }
   //
   // Updates the text
   //
   // @private
   //
   //O Ticker.prototype.update = function (time)
   private update (time :number)
   {
       //O Ticker.shared._now = time;
       Ticker.shared._now = time;
       //O Ticker.shared.Ms = Ticker.shared._now - Ticker.shared.Time;
       Ticker.shared.Ms = Ticker.shared._now - Ticker.shared.Time;
       //O Ticker.shared.Time = Ticker.shared._now;
       Ticker.shared.Time = Ticker.shared._now;
       //O Ticker.shared.DeltaTime = Ticker.shared.Ms * 0.001;
       Ticker.shared.DeltaTime = Ticker.shared.Ms * 0.001;
       //O Ticker.shared.emit("update", Ticker.shared.DeltaTime);
       Ticker.shared.emit("update", Ticker.shared.DeltaTime);
       //O Tween._update(Ticker.shared.DeltaTime);
       Tween._update(Ticker.shared.DeltaTime);

       //O if (!Ticker.shared._disabled)
       if (!Ticker.shared._disabled)
       {
          //O requestAnimationFrame(Ticker.shared.update);
          requestAnimationFrame(Ticker.shared.update);
       }
   }

   //O Ticker.on = function (event, fn, context)
   // ts-ignore is for:
   // Property on type Ticker => Type 'void' is not assignable to type 'this'. 
   // Also resolved with --strictFunctionTypes
   // @ts-ignore
   public on = (event: string | symbol, fn: Function, context?: any) =>
   {
      //O Ticker.shared.on.apply(this.shared,arguments);
      Ticker.shared.on(event, fn, context);
   }

   //O Ticker.once = function (event, fn, context)
   // ts-ignore is for:
   // Property on type Ticker => Type 'void' is not assignable to type 'this'. 
   // Also resolved with --strictFunctionTypes
   // @ts-ignore
   public once = (event: string | symbol, fn: Function, context?: any) =>
   {
      //O Ticker.prototype.once.apply(this.shared, arguments);
      Ticker.shared.once(event, fn, context);
   }

   //O Ticker.removeListener = function (event, fn)
   // ts-ignore is for:
   // Property on type Ticker => Type 'void' is not assignable to type 'this'. 
   // Also resolved with --strictFunctionTypes
   // @ts-ignore
   public removeListener = (event: string |  symbol, fn?: Function, context?: any) =>
   {
      //O Ticker.prototype.removeListener.apply(this.shared, arguments);
      Ticker.shared.removeListener(event, fn, context);
   };

   get disabled (): boolean
   {
      //O return this._disabled;
      return this._disabled;
   }
   set disabled (val: boolean)
   {
      //O if (!this._disabled)
      if (!this._disabled)
      {
         //O this._disabled = true;
         this._disabled = true;
      }
      else
      {
         //O if (val == false)
         if (val == false)
         {
            //O this._disabled = false;
            this._disabled = false;
         }

         //O this._disabled = false;
         this._disabled = false;
         //O Ticker.shared = this;
         Ticker.shared = this;
         //O this.update(performance.now(), true);
         //N parameter true is not defined in call of function 
         this.update(performance.now());
      }
   }
}

//O Ticker.shared = new Ticker(true);
//NC exported name cannot be same as class name, so export instance as default
//let ticker = new Ticker(true);
export default new Ticker(true);
//O module.exports = Ticker;





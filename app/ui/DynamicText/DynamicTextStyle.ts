export type DynamicTextStyleAttributes =
   "_scale" | "_align" | "_fontFamily" | "_fontSize" | "_fontWeight" |
   "_fontStyle" | "_letterSpacing" | "_lineHeight" | "_verticalAlign" |
   "_rotation" | "_skew" | "_tint" | "_fill" | "_shadow" | "_stroke" |
   "_strokeFill" | "_strokeShadow" | "_wrap" | "_breakWords" | "_overflowX" |
   "_overflowY" | "_ellipsis";


//O function DynamicTextStyle( parent )
export class DynamicTextStyle
{
   //O this.respectDirty = true;
   private respectDirty: boolean;
   //O this._parent = parent || null;
   private _parent:any;
   //O this._scale = 1;
   private _scale: number;
   //O this._align = 'left';
   private _align: string;
   //O this._fontFamily = 'Arial';
   private _fontFamily: string;
   //O this._fontSize = 26;
   private _fontSize: number;
   //O this._fontWeight = 'normal';
   private _fontWeight: string;
   //O this._fontStyle = 'normal';
   private _fontStyle: string;
   //O this._letterSpacing = 0;
   private _letterSpacing: number;
   //O this._lineHeight = 0;
   private _lineHeight: number;
   //O this._verticalAlign = 0;
   private _verticalAlign: number;
   //O this._rotation = 0;
   private _rotation: number;
   //O this._skew = 0;
   private _skew: number;
   //O this._tint = "#FFFFFF";
   private _tint: string;
   //O this._fill = '#FFFFFF';
   private _fill: string;
   //O this._shadow = '';
   private _shadow: string;
   //O this._stroke = 0;
   private _stroke: number;
   //O this._strokeFill = '';
   private _strokeFill: string;
   //O this._strokeShadow = '';
   private _strokeShadow: string;
   //O this._wrap = true;
   private _wrap: boolean;
   //O this._breakWords = false;
   private _breakWords = false;
   //O this._overflowX = 'visible';                     //visible|hidden
   private _overflowX: string;                          //visible|hidden
   //O this._overflowY = 'visible';                     //visible|hidden
   private _overflowY: string;                          //visible|hidden
   //O this._ellipsis = false;
   private _ellipsis: boolean;

   //O var _cachedEllipsisSize = null;
   private _cachedEllipsisSize: number;

   protected dynamicTextStyleAttributes:Array<DynamicTextStyleAttributes>;

   constructor ( parent?: any )
   {
      //O this.respectDirty = true;
      this.respectDirty = true;
      //O this._parent = parent || null;
      this._parent = parent || null;
      //O this._scale = 1;
      this._scale = 1;
      //O this._align = 'left';
      this._align = 'left';
      //O this._fontFamily = 'Arial';
      this._fontFamily = 'Arial';
      //O this._fontSize = 26;
      this._fontSize = 26;
      //O this._fontWeight = 'normal';
      this._fontWeight = 'normal';
      //O this._fontStyle = 'normal';
      this._fontStyle = 'normal';
      //O this._letterSpacing = 0;
      this._letterSpacing = 0;
      //O this._lineHeight = 0;
      this._lineHeight = 0;
      //O this._verticalAlign = 0;
      this._verticalAlign = 0;
      //O this._rotation = 0;
      this._rotation = 0;
      //O this._skew = 0;
      this._skew = 0;
      //O this._tint = "#FFFFFF";
      this._tint = "#FFFFFF";
      //O this._fill = '#FFFFFF';
      this._fill = '#FFFFFF';
      //O this._shadow = '';
      this._shadow = '';
      //O this._stroke = 0;
      this._stroke = 0;
      //O this._strokeFill = '';
      this._strokeFill = '';
      //O this._strokeShadow = '';
      this._strokeShadow = '';
      //O this._wrap = true;
      this._wrap = true;
      //O this._breakWords = false;
      this._breakWords = false;
      //O this._overflowX = 'visible';                  //visible|hidden
      this._overflowX = 'visible';                      //visible|hidden
      //O this._overflowY = 'visible';                  //visible|hidden
      this._overflowY = 'visible';                      //visible|hidden
      //O this._ellipsis = false;
      this._ellipsis = false;

      //O var _cachedEllipsisSize = null;
      this._cachedEllipsisSize = null;

      //N for typescript
      this.dynamicTextStyleAttributes =
      [  
         '_scale', '_align', '_fontFamily', '_fontSize', '_fontWeight',
         '_fontStyle', '_letterSpacing', '_lineHeight', '_verticalAlign',
         '_rotation', '_skew', '_tint', '_fill', '_shadow', '_stroke',
         '_strokeFill', '_strokeShadow', '_wrap', '_breakWords', '_overflowX',
         '_overflowY', '_ellipsis'
      ];
   }

   //O this.ellipsisSize = function( atlas )
   public ellipsisSize = ( atlas: any ): number =>
   {
      //O if ( ! this.ellipsis )
      if ( ! this.ellipsis )
      {
         //O return 0;
         return 0;
      }

      //O if ( _cachedEllipsisSize === null )
      if ( this._cachedEllipsisSize === null )
      {
         //O return 0;
         return 0;
      }

      //O _cachedEllipsisSize = ( atlas.getCharObject( ".", this ).width + this.letterSpacing ) * 3;
      this._cachedEllipsisSize = ( atlas.getCharObject( ".", this ).width + this.letterSpacing ) * 3;

      //O return _cachedEllipsisSize;
      return this._cachedEllipsisSize;
   };

   //O DynamicTextStyle.prototype.clone = function( )
   public clone = ( ): DynamicTextStyle =>
   {
      //O var style = new DynamicTextStyle( );
      let style = new DynamicTextStyle( this );
      //O style.merge( this );
      style.merge( this );
      //O return style;
      return style;
   };

   //O DynamicTextStyle.prototype.merge = function( style )
   public merge = ( style: DynamicTextStyle ):void =>
   {
      //O if ( typeof style === 'object' )
      if ( typeof style === 'object' )
      {
         //O this.respectDirty = false;
         this.respectDirty = false;

         //O for ( var param in style )
         //NC  USE 'of' AS THIS IS NOW AN ARRAY OF STRINGS
         for ( let param of this.dynamicTextStyleAttributes )
         {
            //O var val = style[ param ];

            //O if ( typeof val === 'function' || param === 'respectDirty' || param === '_parent' )
            //O{
            //O   continue;
            //O}

            //O this[ param ] = style[ param ];
            this[ param ] = style[ param ];

/*
            console.log("Handling:" + param + " Setting to:" + style[param]);

            //N Access each property individually
            switch(param)
            {
               case '_scale':
                  this._scale = style._scale;
                  break;
               case '_align':
                  this._align = style._align;
                  break;
               case '_fontFamily':
                  this._fontFamily = style._fontFamily;
                  break;
               case '_fontSize':
                  this._fontSize = style._fontSize;
                  break;
               case '_fontWeight':
                  this._fontWeight = style._fontWeight;
                  break;
               case '_fontStyle':
                  this._fontStyle = style._fontStyle;
                  break;
               case '_letterSpacing':
                  this._letterSpacing = style._letterSpacing;
                  break;
               case '_lineHeight':
                  this._lineHeight = style._lineHeight;
                  break;
               case '_verticalAlign':
                  this._verticalAlign = style._verticalAlign;
                  break;
               case '_rotation':
                  this._rotation = style._rotation;
                  break;
               case '_skew':
                  this._skew = style._skew;
                  break;
               case '_tint':
                  this._tint = style._tint;
                  break;
               case '_fill':
                  this._fill = style._fill;
                  break;
               case '_shadow':
                  this._shadow = style._shadow;
                  break;
               case '_stroke':
                  this._stroke = style._stroke;
                  break;
               case '_strokeFill':
                  this._strokeFill = style._strokeFill;
                  break;
               case '_strokeShadow':
                  this._strokeShadow = style._strokeShadow;
                  break;
               case '_wrap':
                  this._wrap = style._wrap;
                  break;
               case '_breakWords':
                  this._breakWords = style._breakWords;
                  break;
               case '_overflowX':
                  this._overflowX = style._overflowX;
                  break;
               case '_overflowY':
                  this._overflowY = style._overflowY;
                  break;
               case '_ellipsis':
                  this._ellipsis = style._ellipsis;
                  break;
               default:
                  console.log("Fixme. UnHandled string:" + param);
            }
*/
         }
         //O this.respectDirty = true;
         this.respectDirty = true;
         //O this._dirty = true;
         this._dirty = true;
      }
   };

   //O DynamicTextStyle.prototype.ctxKey = function( char )
   public ctxKey = ( char: string ): string =>
   {
      //O return [ char, this.fill, this.shadow, this.stroke, this.strokeFill, this.strokeShadow ].join( '|' );
      return [ char, this.fill, this.shadow, this.stroke, this.strokeFill, this.strokeShadow ].join( '|' );
   };

   //O DynamicTextStyle.prototype.ctxFont = function( )
   public ctxFont = ( ): string =>
   {
      //O var fontSize = Math.min( 200, Math.max( 1, this.fontSize || 26 ) ) + "px ";
      let fontSize = Math.min( 200, Math.max( 1, this.fontSize || 26 ) ) + "px ";
      //O var fontWeight = this.fontWeight === "bold" ? this.fontWeight + " " : "";
      let fontWeight = this.fontWeight === "bold" ? this.fontWeight + " " : "";
      //O var fontStyle = this.fontStyle === "italic" || this.fontStyle === "oblique" ? this.fontStyle + " " : "";
      let fontStyle = this.fontStyle === "italic" || this.fontStyle === "oblique" ? this.fontStyle + " " : "";
      //O return fontWeight + fontStyle + fontSize + this.fontFamily;
      return fontWeight + fontStyle + fontSize + this.fontFamily;
   };

   //N Getters and setters
   //O Object.defineProperties( DynamicTextStyle.prototype,
   // Object.defineProperties( DynamicTextStyle.prototype,

   //O _dirty:
   //O set: function( val )
   set _dirty( val: boolean )
   {
      //O if ( this.respectDirty )
      if ( this.respectDirty )
      {
         //O if ( this._parent !== null )
         if ( this._parent !== null &&
              //N Add check that update exists  on _parent to fix
              //  update being not defined.
              typeof this._parent.update === 'function' )
         {
            //O this._parent.dirtyStyle = val;
            this._parent.dirtyStyle = val;
            //O this._parent.update( );
            this._parent.update( );
         }
      }
   }

   //O // scale:
   //O get: function( )
   get scale( ): number
   {
      //O return this._scale;
      return this._scale;
   }
   //O set: function( val )
   set scale( val: number )
   {
      //O if ( val !== this._scale )
      if ( val !== this._scale )
      {
         //O this._scale = val;
         this._scale = val;
         //O this._dirty = true;
         this._dirty = true;
      }
   }

   //O // align:
   //O get: function( )
   get align( ): string
   {
      //O return this._align;
      return this._align;
   }
   //O set: function( val )
   set align( val: string )
   {
      //O if ( val !== this._align )
      if ( val !== this._align )
      {
         //O this._align = val;
         this._align = val;
         //O this._dirty = true;
         this._dirty = true;
      }
   }

   //O // fontFamily:
   //O get: function( )
   get fontFamily( ): string
   {
      //O return this._fontFamily;
      return this._fontFamily;
   }
   //O set: function( val )
   set fontFamily( val: string )
   {
      //O if ( val !== this._fontFamily )
      if ( val !== this._fontFamily )
      {
         //O this._fontFamily = val;
         this._fontFamily = val;
         //O this._dirty = true;
         this._dirty = true;
      }
   }

   //O // fontSize:
   //O get: function( )
   get fontSize( ): number
   {
      //O return this._fontSize;
      return this._fontSize;
   }
   //O set: function( val )
   set fontSize( val: number )
   {
      //O if ( val !== this._fontSize )
      if ( val !== this._fontSize )
      {
         //O this._fontSize = val;
         this._fontSize = val;
         //O this._dirty = true;
         this._dirty = true;
      }
   }

   //O // fontWeight:
   //O get: function( )
   get fontWeight( ): string
   {
      //O return this._fontWeight;
      return this._fontWeight;
   }
   //O set: function( val )
   set fontWeight( val: string )
   {
      //O if ( val !== this._fontWeight )
      if ( val !== this._fontWeight )
      {
         //O this._fontWeight = val;
         this._fontWeight = val;
         //O this._dirty = true;
         this._dirty = true;
      }
   }

   //O // fontStyle:
   //O get: function( )
   get fontStyle( ): string
   {
      //O return this._fontStyle;
      return this._fontStyle;
   }
   //O set: function( val )
   set fontStyle( val: string )
   {
      //O if ( val !== this._fontStyle )
      if ( val !== this._fontStyle )
      {
         //O this._fontStyle = val;
         this._fontStyle = val;
         //O this._dirty = true;
         this._dirty = true;
      }
   }

   //O // letterSpacing:
   //O get: function( )
   get letterSpacing( ): number
   {
      //O return this._letterSpacing;
      return this._letterSpacing;
   }
   //O set: function( val )
   set letterSpacing( val: number )
   {
      //O if ( val !== this._letterSpacing )
      if ( val !== this._letterSpacing )
      {
         //O this._letterSpacing = val;
         this._letterSpacing = val;
         //O this._dirty = true;
         this._dirty = true;
      }
   }

   //O // lineHeight:
   //O get: function( )
   get lineHeight( ): number
   {
      //O return this._lineHeight;
      return this._lineHeight;
   }
   //O set: function( val )
   set lineHeight( val: number )
   {
      //O if ( val !== this._lineHeight )
      if ( val !== this._lineHeight )
      {
         //O this._lineHeight = val;
         this._lineHeight = val;
         //O this._dirty = true;
         this._dirty = true;
      }
   }

   //O // verticalAlign:
   //O get: function( )
   get verticalAlign( ): number
   {
      //O return this._verticalAlign;
      return this._verticalAlign;
   }
   //O set: function( val )
   set verticalAlign( val: number )
   {
      //O if ( val !== this._verticalAlign )
      if ( val !== this._verticalAlign )
      {
         //O this._verticalAlign = val;
         this._verticalAlign = val;
         //O this._dirty = true;
         this._dirty = true;
      }
   }

   //O // rotation:
   //O get rotation( )
   get rotation( ): number
   {
      //O return this._rotation;
      return this._rotation;
   }
   //O set: function( val )
   set rotation( val: number)
   {
      //O if ( val !== this._rotation )
      if ( val !== this._rotation )
      {
         //O this._rotation = val;
         this._rotation = val;
         //O this._dirty = true;
         this._dirty = true;
      }
   }

   //O // skew:
   //O get: function( )
   get skew( ): number
   {
      //O return this._skew;
      return this._skew;
   }
   //O set: function( val )
   set skew( val: number )
   {
      //O if ( val !== this._skew )
      if ( val !== this._skew )
      {
         //O this._skew = val;
         this._skew = val;
         //O this._dirty = true;
         this._dirty = true;
      }
   }

   //O // tint:
   //O get: function( )
   get tint ( ): string
   {
      //O return this._tint;
      return this._tint;
   }
   //O set: function( val )
   set tint( val: string )
   {
      //O if ( val !== this._tint )
      if ( val !== this._tint )
      {
         //O this._tint = val;
         this._tint = val;
         //O this._dirty = true;
         this._dirty = true;
      }
   }

   //O // fill:
   //O get: function( )
   get fill( ): string
   {
      //O return this._fill;
      return this._fill;
   }
   //O set: function( val )
   set fill( val: string )
   {
      //O if ( val !== this._fill )
      if ( val !== this._fill )
      {
         //O this._fill = val;
         this._fill = val;
         //O this._dirty = true;
         this._dirty = true;
      }
   }

   //O // shadow:
   //O get: function( )
   get shadow( ): string
   {
      //O return this._shadow;
      return this._shadow;
   }
   //O set: function( val )
   set shadow( val: string )
   {
      //O if ( val !== this._shadow )
      if ( val !== this._shadow )
      {
         //O this._shadow = val;
         this._shadow = val;
         //O this._dirty = true;
         this._dirty = true;
      }
   }

   //O // stroke:
   //O get: function( )
   get stroke( ): number
   {
      //O return this._stroke;
      return this._stroke;
   }
   //O set: function( val )
   set stroke( val: number )
   {
      //O if ( val !== this._stroke )
      if ( val !== this._stroke )
      {
         //O this._stroke = val;
         this._stroke = val;
         //O this._dirty = true;
         this._dirty = true;
      }
   }

   //O // strokeFill:
   //O get: function( )
   get strokeFill( ): string
   {
      //O return this._strokeFill;
      return this._strokeFill;
   }
   //O set: function( val )
   set strokeFill( val: string )
   {
      //O if ( val !== this._strokeFill )
      if ( val !== this._strokeFill )
      {
         //O this._strokeFill = val;
         this._strokeFill = val;
         //O this._dirty = true;
         this._dirty = true;
      }
   }

   //O // strokeShadow:
   //O get: function( )
   get strokeShadow( ): string
   {
      //O return this._strokeShadow;
      return this._strokeShadow;
   }
   //O set: function( val )
   set strokeShadow( val: string )
   {
      //O if ( val !== this._strokeShadow )
      if ( val !== this._strokeShadow )
      {
         //O this._strokeShadow = val;
         this._strokeShadow = val;
         //O this._dirty = true;
         this._dirty = true;
      }
   }

   //O // wrap:
   //O get: function( )
   get wrap( ): boolean
   {
      //O return this._wrap;
      return this._wrap;
   }
   //O set: function( val )
   set wrap( val: boolean)
   {
      //O if ( val !== this._wrap )
      if ( val !== this._wrap )
      {
         //O this._wrap = val;
         this._wrap = val;
         //O this._dirty = true;
         this._dirty = true;
      }
   }

   //O // breakWords:
   //O get: function( )
   get breakWords( ): boolean
   {
      //O return this._breakWords;
      return this._breakWords;
   }
   //O set: function( val )
   set breakWords( val: boolean)
   {
      //O if ( val !== this._breakWords )
      if ( val !== this._breakWords )
      {
         //O this._breakWords = val;
         this._breakWords = val;
         //O this._dirty = true;
         this._dirty = true;
      }
   }

   //O // overflowX:
   //O get: function( )
   get overflowX( ): string
   {
      //O return this._overflowX;
      return this._overflowX;
   }
   //O set: function( val )
   set overflowX( val: string )
   {
      //O if ( val !== this._overflowX )
      if ( val !== this._overflowX )
      {
         //O this._overflowX = val;
         this._overflowX = val;
         //O this._dirty = true;
         this._dirty = true;
      }
   }

   //O // overflowY:
   //O get: function( )
   get overflowY( ): string
   {
      //O return this._overflowY;
      return this._overflowY;
   }
   //O set: function( val )
   set overflowY( val: string )
   {
      //O if ( val !== this._overflowY )
      if ( val !== this._overflowY )
      {
         //O this._overflowY = val;
         this._overflowY = val;
         //O this._dirty = true;
         this._dirty = true;
      }
   }

   //O // ellipsis:
   //O get: function( )
   get ellipsis( ): boolean
   {
      //O return this._ellipsis;
      return this._ellipsis;
   }
   //O set: function( val )
   set ellipsis( val: boolean )
   {
      //O if ( val !== this._ellipsis )
      if ( val !== this._ellipsis )
      {
         //O this._ellipsis = val;
         this._ellipsis = val;
         //O this._dirty = true;
         this._dirty = true;
      }
   }
}
//O DynamicTextStyle.prototype.constructor = DynamicTextStyle;
//O module.exports = DynamicTextStyle;

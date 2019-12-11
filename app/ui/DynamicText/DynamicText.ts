interface INameToValueMap
{
    [key: string]: any;
}

import * as PIXI from 'pixi.js';

//New for check of undefined
import { isUndefined } from "util";

//O var UIBase = require( '../UIBase' );
import { UIBase } from '../UIBase';
//O var DynamicTextStyle = require( './DynamicTextStyle' );
import { DynamicTextStyle } from './DynamicTextStyle';
//O var DynamicChar = require( './DynamicChar' );
import { DynamicChar } from './DynamicChar' ;

//O var emojiRegex = require( 'emoji-regex' );
var emojiRegex = require( 'emoji-regex' );

//O phrases the input text and prepares the char array
//O var closeTags = [ '</i>', '</b>', '</font>', '</center>' ];
const closeTags = [ '</i>', '</b>', '</font>', '</center>' ];

/*O
 * An dynamic text object with auto generated atlas
 *
 * @class
 * @extends PIXI.UI.UIBase
 * @memberof PIXI.UI
 * @param text {String} Text content
 * @param [width=0] {Number|String} width of textbox. 0 = autoWidth
 * @param [height=0] {Number|String} height of textbox. 0 = autoHeight
 * @param [allowTags=true] {boolean} Allow inline styling
 * @param [options=null] {DynamicTextStyle} Additional text settings
 */
//O function DynamicText( text, options )
export class DynamicText extends UIBase
{
   //O atlas = null;
   //O atlas = new DynamicAtlas( 1 );
   private atlas: DynamicAtlas;

   //O options = options || {};
   //public options: Array<object>;
   public options: INameToValueMap;

   //O var autoWidth = !options.width;
   private autoWidth: boolean;
   //O var autoHeight = !options.height;
   private autoHeight: boolean;

   //O defaultstyle for this textobject
   //O var defaultStyle = this._style = new DynamicTextStyle( this );
   private defaultStyle: DynamicTextStyle;

   //O collection of all processed char
   //O var chars = this.chars = [ ];
   private chars: Array<DynamicChar>; // missing xOffset. lineheight ...
   //private chars: Array<DynamicText>;
   //O var renderChars = [ ];
   private renderChars: Array<DynamicChar>; // char.x is not on object
   //private renderChars: Array<DynamicText>;
   //O var spriteCache = [ ];                               //(temp)
   private spriteCache: Array<PIXI.Sprite>;                     //(temp)
   //O var charContainer = new PIXI.Container( );
   private charContainer: PIXI.Container;
   //O this.container.addChild( charContainer );
   private container: PIXI.Container;

   //O the input text
   //O this._inputText = text;
   private _inputText: string;

   //O list of rendered sprites (temp)
   //O var sprites = [ ];
   //N unused
   //private sprites = [ ];

   //O states
   //O var lastWidth = 0;
   public lastWidth = 0;
   //O lastHeight = 0;
   public lastHeight = 0;

   //O this.dirtyText = true;
   public dirtyText: boolean;
   //O this.dirtyStyle = true;
   public dirtyStyle: boolean;
   //O this.dirtyRender = true;
   public dirtyRender: boolean;

   //O dictionary for line data
   //O var lineWidthData = [ ];
   private lineWidthData: Array<number>;
   //O var lineHeightData = [ ];
   private lineHeightData: Array<number>;
   //O var lineFontSizeData = [ ];
   private lineFontSizeData: Array<number>;
   //O var lineAlignmentData = [ ];
   private lineAlignmentData: Array<string>;
   //O var renderCount = 0;
   private renderCount: number;
   //O var charCount = 0;
   private charCount: number;

   //O ellipsis caches (not nessesary when no sprites)
   //O var lineEllipsisData = [ ];
   private lineEllipsisData: Array<Array<DynamicChar>>;
   //O var lineHasEllipsis = [ ];
   private lineHasEllipsis: Array<boolean>;

   //O DynamicText.settings =
   //N A way to handle class constants
   public static readonly settings =
   {
      //O debugSpriteSheet: false,
      debugSpriteSheet: false,

      //O force one font family for emojis so we dont rerender them multiple times
      //O defaultEmojiFont: "Segoe UI Emoji"
      defaultEmojiFont: "Segoe UI Emoji"
   };


   //O PIXIUI update, lazy update (bad solution needs rewrite when converted to pixi plugin)
   //O this.lazyUpdate = null;
   private lazyUpdate:  ReturnType<typeof setTimeout>;

   //O var self = this;
   //Hmmm changed self to context
   private context: DynamicText;

   constructor( text: string, options: INameToValueMap )
   {
      super();

      //O options = options || {};
      this.options = options || {};

      //O UIBase.call( this, options.width || 0, options.height || 0 );
      UIBase.call( this, options.width || 0, options.height || 0 );

      //O create atlas
      //O if ( atlas === null )
      if ( this.atlas === null )
      {
         //O atlas = new DynamicAtlas( 1 );
         this.atlas = new DynamicAtlas( 1 );
      }

      //O var autoWidth = ! options.width;
      this.autoWidth = ! options.width;
      //O var autoHeight = ! options.height;
      this.autoHeight = ! options.height;

      //O defaultstyle for this textobject
      //O var defaultStyle = this._style = new DynamicTextStyle( this );
      this.defaultStyle = this._style = new DynamicTextStyle( this );
      //O defaultStyle.merge( options.style );
      this.defaultStyle.merge( options.style );

      //O collection of all processed char
      //O var chars = this.chars = [ ];
      this.chars = this.chars = [ ];
      //O var renderChars = [ ];
      this.renderChars = [ ];
      //O var spriteCache = [ ];                               //(temp)
      this.spriteCache = [ ];                                   //(temp)
      //O var charContainer = new PIXI.Container( );
      this.charContainer = new PIXI.Container( );
      //O this.container.addChild( charContainer );
      this.container.addChild( this.charContainer );

      //O the input text
      //O this._inputText = text;
      this._inputText = text;

      //O list of rendered sprites (temp)
      //O var sprites = [ ];
      //N unused
      // this.sprites = [ ];

      //O states
      //O var lastWidth = 0;
      this.lastWidth = 0;
      //O lastHeight = 0;
      this.lastHeight = 0;

      //O this.dirtyText = true;
      this.dirtyText = true;
      //O this.dirtyStyle = true;
      this.dirtyStyle = true;
      //O this.dirtyRender = true;
      this.dirtyRender = true;

      //O dictionary for line data
      //O var lineWidthData = [ ];
      this.lineWidthData = [ ];
      //O var lineHeightData = [ ];
      this.lineHeightData = [ ];
      //O var lineFontSizeData = [ ];
      this.lineFontSizeData = [ ];
      //O var lineAlignmentData = [ ];
      this.lineAlignmentData = [ ];
      //O var renderCount = 0;
      this.renderCount = 0;
      //O var charCount = 0;
      this.charCount = 0;
      //O ellipsis caches (not nessesary when no sprites)
      //O var lineEllipsisData = [ ];
      this.lineEllipsisData = [ ];
      //O var lineHasEllipsis = [ ];
      this.lineHasEllipsis = [ ];

      //O PIXIUI update, lazy update (bad solution needs rewrite when converted to pixi plugin)
      //O this.lazyUpdate = null;
      this.lazyUpdate = null;

      //O var self = this;
      //Hmm changed self to context
      this.context = this;
   }

   //O ROUGH TEMP RENDER (with sprites)
   //O this.render = function( )
   public render = ( ) =>
   {
      //O var yOffset = 0;
      let yOffset = 0;
      //O var xOffset = 0;
      let xOffset = 0;
      //O var currentLine = -1;
      let currentLine = -1;
      //O var i;
      let i: number = 0;

      //O if ( spriteCache.length > renderCount )
      if ( this.spriteCache.length > this.renderCount )
      {
         //O for ( i = renderCount; i < spriteCache.length; i++ )
         for ( i = this.renderCount; i < this.spriteCache.length; i++ )
         {
            //O var removeSprite = spriteCache[ i ];
            let removeSprite = this.spriteCache[ i ];
            //O if ( removeSprite )
            if ( removeSprite )
            {
               //O removeSprite.visible = false;
               removeSprite.visible = false;
            }
         }
      }

      //O var char;
      //let char: DynamicText = null;
      let char: DynamicChar = null;
      //O var lineWidth = 0;
      let lineWidth: number = 0;
      //O var lineHeight = 0;
      let lineHeight: number = 0;
      //O var maxLineWidth = 0;
      let maxLineWidth: number = 0;

      //O for ( i = 0; i < renderCount; i++ )
      for ( i = 0; i < this.renderCount; i++ )
      {
         //O char = renderChars[ i ];
         char = this.renderChars[ i ];

         //O get line data
         //O if ( currentLine !== char.lineIndex )
         if ( currentLine !== char.lineIndex )
         {
            //O currentLine = char.lineIndex;
            currentLine = char.lineIndex;
            //O lineWidth = lineWidthData[ currentLine ];
            lineWidth = this.lineWidthData[ currentLine ];
            //O lineHeight = lineHeightData[ currentLine ];
            lineHeight = this.lineHeightData[ currentLine ];
            //O yOffset += lineHeight;
            yOffset += lineHeight;

            //O switch ( lineAlignmentData[ currentLine ] )
            switch ( this.lineAlignmentData[ currentLine ] )
            {
               //O case 'right':
               case 'right':
                  //O xOffset = this._width - lineWidth;
                  //F Must have meant width not _width
                  xOffset = this.width - lineWidth;
                  //O break;
                  break;
               //O case 'center':
               case 'center':
                  //O xOffset = ( this._width - lineWidth ) * 0.5;
                  //F Must have meant width not _width
                  xOffset = ( this.width - lineWidth ) * 0.5;
                  //O break;
                  break;
               //O default:
               default:
                  //O xOffset = 0;
                  xOffset = 0;
            }

            //O maxLineWidth = Math.max( lineWidth, maxLineWidth );
            maxLineWidth = Math.max( lineWidth, maxLineWidth );
         }

         //O no reason to render a blank space or 0x0 letters (no texture created)
         //O if ( !char.data.texture || char.space || char.newline )
         if ( ! char.data.texture || char.space || char.newline )
         {
            //O if ( spriteCache[ i ] )
            if ( this.spriteCache[ i ] )
            {
               //O spriteCache[ i ].visible = false;
               this.spriteCache[ i ].visible = false;
            }
            //O continue;
            continue;
         }

         //O add new sprite
         //O var tex = char.data.texture;
         var tex = this.char.data.texture;
         //O var sprite = spriteCache[ i ];
         var sprite = this.spriteCache[ i ];

         //O if ( !sprite )
         if ( ! sprite )
         {
            //O sprite = spriteCache[ i ] = new PIXI.Sprite( tex );
            sprite = this.spriteCache[ i ] = new PIXI.Sprite( tex );
            //O sprite.anchor.set( 0.5 );
            sprite.anchor.set( 0.5 );
         }
         //O else
         else
         {
           //O sprite.texture = tex;
           sprite.texture = tex;
         }
         //O sprite.visible = true;
         sprite.visible = true;
         //O sprite.x = char.x + xOffset + tex.width * 0.5;
         sprite.x = char.x + xOffset + tex.width * 0.5;
         //O sprite.y = char.y + yOffset - tex.height * 0.5 - ( lineHeight - lineFontSizeData[ currentLine ] );
         sprite.y = char.y + yOffset - tex.height * 0.5 - ( lineHeight - this.lineFontSizeData[ currentLine ] );

         //O sprite.tint = char.emoji ? 0xffffff : hexToInt( char.style.tint, 0xffffff );
         sprite.tint = char.emoji ? 0xffffff : hexToInt( char.style.tint, 0xffffff );
         //O sprite.rotation = float( char.style.rotation, 0 );
         sprite.rotation = float( char.style.rotation, 0 );
         //O sprite.skew.x = float( char.style.skew, 0 );
         sprite.skew.x = float( char.style.skew, 0 );

         //O if ( !sprite.parent )
         if ( !sprite.parent )
         {
            //O charContainer.addChild( sprite );
            this.charContainer.addChild( sprite );
         }
      }

      //O if ( autoWidth )
      if ( this.autoWidth )
      {
         //O this.width = maxLineWidth;
         this.width = maxLineWidth;
      }
      //O if ( autoHeight )
      if ( this.autoHeight )
      {
         //O this.height = yOffset;
         this.height = yOffset;
      }
   };

   //O updates the renderChar array and position chars for render
   //O this.prepareForRender = function( )
   public prepareForRender = ( ) =>
   {
      //O var pos = new PIXI.Point( );
      let pos = new PIXI.Point( );
      //O var wordIndex = 0;
      let wordIndex = 0;
      //O var lineHeight = 0;
      let lineHeight = 0;
      //O var lineFontSize = 0;
      let lineFontSize = 0;
      //O var lineIndex = 0;
      let lineIndex = 0;
      //O var lineAlignment = defaultStyle.align;
      let lineAlignment = this.defaultStyle.align;
      //O var lastSpaceIndex = -1;
      let lastSpaceIndex = -1;
      //O var lastSpaceLineWidth = 0;
      let lastSpaceLineWidth = 0;
      //O var textHeight = 0;
      let textHeight = 0;
      //O var forceNewline = false;
      let forceNewline = false;
      //O var style;
      //New variable name change to unhide class style name
      let prepStyle: DynamicTextStyle = null;
      //O var renderIndex = 0;
      let renderIndex = 0;
      //O var ellipsis = false;
      let ellipsis = false;
      //O var lineFull = false;
      let lineFull = false;
      //O var i;
      let i: number = 0;

      //O for ( i = 0; i < charCount; i++ )
      for ( i = 0; i < this.charCount; i++ )
      {
         //O var char = chars[ i ];
         let char = this.chars[ i ];
         //O var lastChar = chars[ i - 1 ];
         let lastChar = this.chars[ i - 1 ];
         //O style = char.style;
         prepStyle = char.style;

         //O lineheight
         //O lineHeight = Math.max( lineHeight, defaultStyle.lineHeight || style.lineHeight || char.data.lineHeight );
         lineHeight = Math.max( lineHeight, this.defaultStyle.lineHeight || prepStyle.lineHeight || char.data.lineHeight );

         //O if ( style.overflowY !== 'visible' && lineHeight + textHeight > this._height )
         if ( prepStyle.overflowY !== 'visible' && lineHeight + textHeight > this._height )
         {
            //O if ( style.overflowY === 'hidden' )
            if ( prepStyle.overflowY === 'hidden' )
            {
               //O break;
               break;
            }
         }

         //O if ( char.newline )
         if ( char.newline )
            //O lineFull = false;
            lineFull = false;

         //O set word index
         //O if ( char.space || char.newline )
         if ( char.space || char.newline )
         {
            //O wordIndex++;
            wordIndex++;
         }
         //O else
         else
         {
            //O char.wordIndex = wordIndex;
            char.wordIndex = wordIndex;
         }

         //O textheight
         //O lineFontSize = Math.max( lineFontSize, style.fontSize );
         lineFontSize = Math.max( lineFontSize, prepStyle.fontSize );

         //O lineindex
         //O char.lineIndex = lineIndex;
         char.lineIndex = lineIndex;

         //O lineAlignment
         //O if ( style.align !== defaultStyle.align )
         if ( prepStyle.align !== this.defaultStyle.align )
         {
            //O lineAlignment = style.align;
            lineAlignment = prepStyle.align;
         }

         //O if ( char.space )
         if ( char.space )
         {
            //O lastSpaceIndex = i;
            lastSpaceIndex = i;
            //O lastSpaceLineWidth = pos.x;
            lastSpaceLineWidth = pos.x;
         }

         //O var size = Math.round( char.data.width ) + float( style.letterSpacing, 0 );
         let size = Math.round( char.data.width ) + float( prepStyle.letterSpacing, 0 );
         //O if ( ! autoWidth && !forceNewline && !char.newline && pos.x + size > this._width )
         if ( ! this.autoWidth && ! forceNewline && ! char.newline && pos.x + size > this._width )
         {
            //O if ( style.wrap )
            if ( prepStyle.wrap )
            {
               //O if ( char.space )
               if ( char.space )
               {
                  //O forceNewline = true;
                  forceNewline = true;
               }
               //O else if ( lastSpaceIndex !== -1 )
               else if ( lastSpaceIndex !== -1 )
               {
                  //O renderIndex -= i - lastSpaceIndex;
                  renderIndex -= i - lastSpaceIndex;
                  //O i = lastSpaceIndex - 1;
                  i = lastSpaceIndex - 1;
                  //O lastSpaceIndex = -1;
                  lastSpaceIndex = -1;
                  //O pos.x = lastSpaceLineWidth;
                  pos.x = lastSpaceLineWidth;
                  //O forceNewline = true;
                  forceNewline = true;
                  //O continue;
                  continue;

               }
               //O else if ( style.breakWords )
               else if ( prepStyle.breakWords )
               {
                  //O if ( lastChar )
                  if ( lastChar )
                  {
                     //O pos.x -= lastChar.style.letterSpacing;
                     pos.x -= lastChar.style.letterSpacing;
                     //O pos.x -= lastChar.data.width;
                     pos.x -= lastChar.data.width;
                  }
                  //O i -= 2;
                  i -= 2;
                  //O renderIndex--;
                  renderIndex--;
                  //O forceNewline = true;
                  forceNewline = true;
                  //O continue;
                  continue;
               }
            }

            //O if ( style.overflowX == 'hidden' && !forceNewline )
            if ( prepStyle.overflowX == 'hidden' && !forceNewline )
            {
               //O lineFull = true;
               lineFull = true;
               //O if ( style.ellipsis && !ellipsis )
               if ( prepStyle.ellipsis && !ellipsis )
               {
                  //O ellipsis = true;
                  ellipsis = true;
                  //O var ellipsisData = lineEllipsisData[ lineIndex ];
                  var ellipsisData = this.lineEllipsisData[ lineIndex ];
                  //O if ( !ellipsisData )
                  if ( !ellipsisData )
                  {
                     //O ellipsisData = this.lineEllipsisData[ lineIndex ] = [ new DynamicChar( ), new DynamicChar( ), new DynamicChar( ) ];
                     ellipsisData = this.lineEllipsisData[ lineIndex ] = [ new DynamicChar( ), new DynamicChar( ), new DynamicChar( ) ];
                  }

                  //O for ( var d = 0; d < 3; d++ )
                  for ( let d = 0; d < 3; d++ )
                  {
                     //O var dot = ellipsisData[ d ];
                     let dot = this.ellipsisData[ d ];
                     //O dot.value = ".";
                     dot.value = ".";
                     //O dot.data = atlas.getCharObject( dot.value, style );
                     dot.data = this.atlas.getCharObject( dot.value, prepStyle );
                     //O dot.style = style;
                     dot.style = prepStyle;
                     //O dot.x = pos.x + char.data.xOffset;
                     dot.x = pos.x + char.data.xOffset;
                     //O dot.y = parseFloat( prepStyle.verticalAlign ) + dot.data.yOffset;
                     //Hmm style,vertAlign is already a number
                     dot.y = prepStyle.verticalAlign + dot.data.yOffset;
                     //O dot.lineIndex = lineIndex;
                     dot.lineIndex = lineIndex;
                     //O pos.x += Math.round( dot.data.width ) + float( style.letterSpacing, 0 );
                     pos.x += Math.round( dot.data.width ) + float( prepStyle.letterSpacing, 0 );
                     //O renderChars[ renderIndex ] = dot;
                     this.renderChars[ renderIndex ] = dot;
                     //O renderIndex++;
                     this.renderIndex++;
                  }
               }
            }
         }

         //O Update position and add to renderchars
         //O if ( ! lineFull )
         if ( ! lineFull )
         {
            //O position
            //O char.x = pos.x + char.data.xOffset;
            char.x = pos.x + char.data.xOffset;
            //O char.y = parseFloat( style.verticalAlign ) + char.data.yOffset;
            //New style.verticalAlign is already a number, no need to parsefloat
            char.y = prepStyle.verticalAlign + char.data.yOffset;
            //O pos.x += size;
            pos.x += size;
            //O renderChars[ renderIndex ] = char;
            this.renderChars[ renderIndex ] = char;
            //O renderIndex++;
            renderIndex++;
         }

         //O new line
         //O if ( forceNewline || char.newline || i === charCount - 1 )
         if ( forceNewline || char.newline || i === this.charCount - 1 )
         {
            //O if ( lastChar )
            if ( lastChar )
            {
               //O pos.x -= lastChar.style.letterSpacing;
               pos.x -= lastChar.style.letterSpacing;
            }

            //O if ( char.space )
            if ( char.space )
            {
               //O pos.x -= char.data.width;
               pos.x -= char.data.width;
               //O pos.x -= float( style.letterSpacing, 0 );
               pos.x -= float( prepStyle.letterSpacing, 0 );
            }

            //O textHeight += lineHeight;
            textHeight += lineHeight;
            //O lineHasEllipsis[ lineIndex ] = ellipsis;
            this.lineHasEllipsis[ lineIndex ] = ellipsis;
            //O lineWidthData[ lineIndex ] = pos.x;
            this.lineWidthData[ lineIndex ] = pos.x;
            //O lineHeightData[ lineIndex ] = lineHeight;
            this.lineHeightData[ lineIndex ] = lineHeight;
            //O lineFontSizeData[ lineIndex ] = lineFontSize;
            this.lineFontSizeData[ lineIndex ] = lineFontSize;
            //O lineAlignmentData[ lineIndex ] = lineAlignment;
            this.lineAlignmentData[ lineIndex ] = lineAlignment;

            //O reset line vaules
            //O lineHeight = pos.x = lastSpaceLineWidth = lineFontSize = 0;
            lineHeight = pos.x = lastSpaceLineWidth = lineFontSize = 0;
            //O lineAlignment = defaultStyle.align;
            lineAlignment = this.defaultStyle.align;
            //O lastSpaceIndex = -1;
            lastSpaceIndex = -1;
            //O lineIndex++;
            lineIndex++;
            //O forceNewline = lineFull = ellipsis = false;
            forceNewline = lineFull = ellipsis = false;
         }
      }

      //O renderCount = renderIndex;
      this.renderCount = renderIndex;
   };

   //O this.processInputText = function( )
   public processInputText = ( ) =>
   {
      //O var styleTree = [ defaultStyle ];
      let styleTree = [ this.defaultStyle ];
      //O var charIndex = 0;
      let charIndex = 0;
      //O var inputTextIndex = 0;
      let inputTextIndex = 0;
      //O var inputArray = Array.from( this._inputText );
      let inputArray = Array.from( this._inputText );

      //O for ( var i = 0; i < inputArray.length; i++ )
      for ( let i = 0; i < this.inputArray.length; i++ )
      {
         //O style = styleTree[ styleTree.length - 1 ];
         this.style = styleTree[ styleTree.length - 1 ];
         //O var c = inputArray[ i ];
         let c = inputArray[ i ];
         //O var charcode = c.charCodeAt( 0 );
         //N unused
         //let charcode = c.charCodeAt( 0 );
         //O var newline = false;
         let newline = false;
         //O var space = false;
         let space = false;
         //O var emoji = false;
         let emoji = false;

         //O Extract Tags
         //O if ( /(?:\r\n|\r|\n)/.test( c ) )
         if ( /(?:\r\n|\r|\n)/.test( c ) )
            //O newline = true;
            newline = true;
         //O else if ( /(\s)/.test( c ) )
         else if ( /(\s)/.test( c ) )
            //O space = true;
            space = true;
         //O else if ( options.allowTags && c === "<" )
         else if ( this.options.allowTags && c === "<" )
         {
            //O var tag = this._inputText.substring( inputTextIndex );
            var tag = this._inputText.substring( inputTextIndex );
            //O tag = tag.slice( 0, tag.indexOf( ">" ) + 1 );
            tag = tag.slice( 0, tag.indexOf( ">" ) + 1 );
            //O var FoundTag = true;
            let FoundTag = true;
            //O if ( tag.length )
            if ( tag.length )
            {
               //O if ( tag === "<i>" )
               if ( tag === "<i>" )
               {
                  //O style = style.clone( );
                  this.style = this.style.clone( );
                  //O style.fontStyle = 'italic';
                  this.style.fontStyle = 'italic';
                  //O styleTree.push( style );
                  this.styleTree.push( this.style );
               }
               //O else if ( tag === "<b>" )
               else if ( tag === "<b>" )
               {
                  //O style = style.clone( );
                  this.style = this.style.clone( );
                  //O style.fontWeight = 'bold';
                  this.style.fontWeight = 'bold';
                  //O styleTree.push( style );
                  styleTree.push( this.style );
               }
               //O else if ( tag === "<center>" )
               else if ( tag === "<center>" )
               {
                  //O style = style.clone( );
                  this.style = this.style.clone( );
                  //O style.align = 'center';
                  this.style.align = 'center';
                  //O styleTree.push( style );
                  styleTree.push( this.style );
               }
               //O else if ( closeTags.indexOf( tag ) !== -1 )
               else if ( closeTags.indexOf( tag ) !== -1 )
               {
                  //O if ( styleTree.length > 1 )
                  if ( styleTree.length > 1 )
                  {
                     //O styleTree.splice( styleTree.length - 1, 1 );
                     styleTree.splice( styleTree.length - 1, 1 );
                  }
               }
               //O else if ( tag.startsWith( "<font " ) )
               else if ( tag.startsWith( "<font " ) )
               {
                  //O var regex = /(\w+)\s*=\s*((["'])(.*?)\3|([^>\s]*)(?=\s|\/>))(?=[^<]*>)/g,
                  let regex = /(\w+)\s*=\s*((["'])(.*?)\3|([^>\s]*)(?=\s|\/>))(?=[^<]*>)/g,
                  //O match = regex.exec( tag );
                  match = regex.exec( tag );

                  //O if ( match !== null )
                  if ( match !== null )
                  {
                     //O style = style.clone( );
                     this.style = this.style.clone( );
                     //O while ( match !== null )
                     while ( match !== null )
                     {
                        //O switch ( match[ 1 ] )
                        switch ( match[ 1 ] )
                        {
                           //O case 'family':
                           case 'family':
                              //O match[ 1 ] = 'fontFamily';
                              match[ 1 ] = 'fontFamily';
                                 //O break;
                                 break;
                              //O case 'size':
                              case 'size':
                              //O match[ 1 ] = 'fontSize';
                              match[ 1 ] = 'fontSize';
                                 //O break;
                                 break;
                              //O case 'weight':
                              case 'weight':
                              //O match[ 1 ] = 'fontWeight';
                              match[ 1 ] = 'fontWeight';
                                 //O break;
                                 break;
                              //O case 'style':
                              case 'style':
                              //O match[ 1 ] = 'fontStyle';
                              match[ 1 ] = 'fontStyle';
                                 //O break;
                                 break;
                              //O case 'valign':
                              case 'valign':
                              //O match[ 1 ] = 'verticalAlign';
                              match[ 1 ] = 'verticalAlign';
                                 //O break;
                                 break;
                              //O case 'spacing':
                              case 'spacing':
                              //O match[ 1 ] = 'letterSpacing';
                              match[ 1 ] = 'letterSpacing';
                                 //O break;
                                 break;
                              //O case 'color':
                              case 'color':
                              //O match[ 1 ] = 'tint';
                              match[ 1 ] = 'tint';
                                 //O break;
                                 break;

                        }
                        //O style[ match[ 1 ] ] = match[ 4 ];
                        //Fixme fixme FixMe fixMe. What is this doing?????
                        // tag = '<font fontFamily="helvetia" fontSize=10 weight="bold" fontStyle="Italic" ...'
                        // It seems to be an array of this._style
                        // match[1] is the first word i.e. fontFamily
                        // match[4] is the fourth word i.e. fontStyle
                        console.log("Fixme DynamicText match[1]=" + match[1] + " match[4]=" + match[4] + "style=" + this.style);
                        //this.style[ match[ 1 ] ] = match[ 4 ];
                        //O match = regex.exec( tag );
                        match = regex.exec( tag );
                     }
                     //O styleTree.push( style );
                     styleTree.push( this.style );
                  }
               }
               //O else
               else
               {
                  //O FoundTag = false;
                  FoundTag = false;
               }

               //O if ( FoundTag )
               if ( FoundTag )
               {
                  //O inputTextIndex += tag.length;
                  inputTextIndex += tag.length;
                  //O i += tag.length - 1;
                  i += tag.length - 1;
                  //O continue;
                  continue;
               }
            }
         }
         //O else
         else
         {
            //O //detect emoji
            //detect emoji
            //O var emojiMatch = emojiRegex( ).exec( c );
            let emojiMatch = emojiRegex( ).exec( c );
            //O if ( emojiMatch !== null )
            if ( emojiMatch !== null )
            {
               //O i--;
               i--;
               //O c = '';
               c = '';
               //O while ( emojiMatch !== null && c !== emojiMatch[ 0 ] )
               while ( emojiMatch !== null && c !== emojiMatch[ 0 ] )
               {
                  //O i++;
                  i++;
                  //O c = emojiMatch[ 0 ];
                  c = emojiMatch[ 0 ];
                  //O emojiMatch = emojiRegex( ).exec( c + inputArray[ i + 1 ] );
                  emojiMatch = emojiRegex( ).exec( c + inputArray[ i + 1 ] );
               }
               //O emoji = true;
               emoji = true;
            }
         }

         //O Prepare DynamicChar object
         //O var char = chars[ charIndex ];
         let char:DynamicChar = this.chars[ charIndex ];
         //O if ( !char )
         if ( ! char )
         {
            //O char = new DynamicChar( );
            char = new DynamicChar( );
            //O chars[ charIndex ] = char;
            this.chars[ charIndex ] = char;
         }
         //O char.style = style;
         char.style = this.style;

         //O if ( emoji )
         if ( emoji )
         {
            //O char.style = char.style.clone( );
            char.style = char.style.clone( );
            //O char.style.fontFamily = DynamicText.settings.defaultEmojiFont;
            char.style.fontFamily = DynamicText.settings.defaultEmojiFont;
         }

         //O char.data = atlas.getCharObject( c, char.style );
         char.data = this.atlas.getCharObject( c, char.style );
         //O char.value = c;
         char.value = c;
         //O char.space = space;
         char.space = space;
         //O char.newline = newline;
         char.newline = newline;
         //O char.emoji = emoji;
         char.emoji = emoji;

         //O charIndex++;
         charIndex++;
         //O inputTextIndex += c.length;
         inputTextIndex += c.length;
      }
      //O charCount = charIndex;
      this.charCount = charIndex;
   };

   //O this.update = function( )
   public update = ( ) =>
   {
      //O if ( self.lazyUpdate !== null )
      if ( this.context.lazyUpdate !== null )
      {
         //O return;
         return;
      }

      //O self.lazyUpdate = setTimeout( function( )
      this.context.lazyUpdate = setTimeout( () =>
      {

         //O console.log("UPDATING TEXT");
         //O var dirtySize = !autoWidth && ( self._width != lastWidth || self._height != lastHeight || self.dirtyText );
         let dirtySize = ! this.autoWidth && ( this.context._width != this.lastWidth || this.context._height != this.lastHeight || this.context.dirtyText );

         //O if ( self.dirtyText || self.dirtyStyle )
         if ( this.context.dirtyText || this.context.dirtyStyle )
         {
            //O self.dirtyText = self.dirtyStyle = false;
            this.context.dirtyText = this.context.dirtyStyle = false;
            //O self.dirtyRender = true;                     //force render after textchange
            this.context.dirtyRender = true;                     //force render after textchange
            //O self.processInputText( );
            this.context.processInputText( );
         }

         //O if ( dirtySize || self.dirtyRender )
         if (dirtySize || this.context.dirtyRender )
         {
            //O self.dirtyRender = false;
            this.context.dirtyRender = false;
            //O lastWidth = self._width;
            this.lastWidth = this.context._width;
            //O lastHeight = self.height;
            this.lastHeight = this.context.height;
            //O self.prepareForRender( );
            this.context.prepareForRender( );
            //O self.render( );
            this.context.render( );
         }
         //O self.lazyUpdate = null;
         this.context.lazyUpdate = null;
      }, 0 );

   };

   //O get: function( )
   get value( ): string
   {
      //O return this._inputText;
      return this._inputText;
   };
   //O set: function( val )
   set value( val: string )
   {
      //O if ( val !== this._inputText )
      if ( val !== this._inputText )
      {
         //O this._inputText = val;
         this._inputText = val;
         //O this.dirtyText = true;
         this.dirtyText = true;
         //O this.update( );
         this.update( );
         //O //console.log("Updating Text to: " + val);
      }
   };
   //O get: function( )
   get text( ): string
   {
      //O return this.value;
      return this.value;
   };
   //O set: function( val )
   set text( val: string )
      {
         //O this.value = val;
         this.value = val;
   };
   //O style:
   //O get: function( )
   get style( ): DynamicTextStyle
   {
      //O return this._style;
      return this._style;
   };
   set style( val: DynamicTextStyle )
   {
      //O get a clean default style
      //O var style = new DynamicTextStyle( this );
      //New Changed variable name for clarification
      var cleanStyle = new DynamicTextStyle( this );

      //O //merge it with new style
      //merge it with new style
      //O style.merge( val );
      cleanStyle.merge( val );

      //O merge it onto this default style
      //O this._style.merge( style );
      this._style.merge( cleanStyle );

      //O this.dirtyStyle = true;
      this.dirtyStyle = true;
      //O this.update( );
      this.update( );
   };

}

//O DynamicText.prototype = Object.create( UIBase.prototype );
//DynamicText.prototype = Object.create( UIBase.prototype );
//O DynamicText.prototype.constructor = DynamicText;
//O module.exports = DynamicText;


class AtlasNode
{
   private children: Array<AtlasNode>;
   public rect: PIXI.Rectangle;
   public data: INameToValueMap;
 // public w: number;

   //O var AtlasNode = function( w, h )
   constructor( w?: number, h?: number )
   {
      //O var children = this.children = [ ];
      this.children = this.children = [ ];

      //N Handle optional parameters used by insert
      if (isUndefined(w) || isUndefined(h))
      {
         this.rect = null;
      } else {
         //O this.rect = new PIXI.Rectangle( 0, 0, w || 0, h || 0 );
         this.rect = new PIXI.Rectangle( 0, 0, w || 0, h || 0 );
      }

      //O this.data = null;
      this.data = null;

      // New undefined
     //this.w = w;
   }

   //O this.insert = function( width, height, obj )
   public insert = ( width: number, height: number, obj: INameToValueMap ): AtlasNode =>
   {
      //O if ( children.length > 0 )
      if ( this.children.length > 0 )
      {
         //O var newNode = children[ 0 ].insert( width, height, obj );
         var newNode = this.children[ 0 ].insert( width, height, obj );
         //O if ( newNode !== null )
         if ( newNode !== null )
         {
            //O return newNode;
            return newNode;
         }

         //O return children[ 1 ].insert( width, height, obj );
         return this.children[ 1 ].insert( width, height, obj );
      }
      //O else
      else
      {
         //O if ( this.data !== null )
         if ( this.data !== null )
         {
            //O return null;
            return null;
         }
         //O if ( width > this.rect.width || height > this.rect.height )
         if ( width > this.rect.width || height > this.rect.height )
         {
            //O return null;
            return null;
         }
         //O if ( width == this.rect.width && height == this.rect.height )
         if ( width == this.rect.width && height == this.rect.height )
         {
            //O this.data = obj;
            this.data = obj;
            //O obj.frame.x = this.rect.x;
            obj.frame.x = this.rect.x;
            //O obj.frame.y = this.rect.y;
            obj.frame.y = this.rect.y;
            //O return this;
            return this;
         }

         //O children.push( new AtlasNode( ) );
         this.children.push( new AtlasNode( ) );
         //O children.push( new AtlasNode( ) );
         this.children.push( new AtlasNode( ) );

         //O var dw = this.rect.width - width;
         let dw = this.rect.width - width;
         //O var dh = this.rect.height - height;
         let dh = this.rect.height - height;

         //O if ( dw > dh )
         if ( dw > dh )
         {
            //O children[ 0 ].rect = new PIXI.Rectangle( this.rect.x, this.rect.y, width, this.rect.height );
            this.children[ 0 ].rect = new PIXI.Rectangle( this.rect.x, this.rect.y, width, this.rect.height );
            //O children[ 1 ].rect = new PIXI.Rectangle( this.rect.x + width, this.rect.y, this.rect.width - width, this.rect.height );
            this.children[ 1 ].rect = new PIXI.Rectangle( this.rect.x + width, this.rect.y, this.rect.width - width, this.rect.height );
         }
         //O else
         else
         {
            //O children[ 0 ].rect = new PIXI.Rectangle( this.rect.x, this.rect.y, this.rect.width, height );
            this.children[ 0 ].rect = new PIXI.Rectangle( this.rect.x, this.rect.y, this.rect.width, height );
            //O children[ 1 ].rect = new PIXI.Rectangle( this.rect.x, this.rect.y + height, this.rect.width, this.rect.height - height );
            this.children[ 1 ].rect = new PIXI.Rectangle( this.rect.x, this.rect.y + height, this.rect.width, this.rect.height - height );
         }

         //O return children[ 0 ].insert( width, height, obj );
         return this.children[ 0 ].insert( width, height, obj );
      }
   };
};


//O var DynamicAtlas = function( padding )
class DynamicAtlas
{
   //O Atlas
   //O var metricsCanvas = document.createElement( "canvas" );
   //private metricsCanvas: Element;
   private metricsCanvas: HTMLCanvasElement;;
   // var metricsContext = metricsCanvas.getContext( "2d" );
   //private metricsContext: HTMLCanvasElement;
   private metricsContext: CanvasRenderingContext2D;;

   //O var res = devicePixelRatio || 1;
   //N unused
   //private devicePixelRatio: number;
   //O var canvas;
   private canvas: HTMLCanvasElement; //HTMLElement  ?
   //O var context;
   //private context: DynamicAtlas;
   private context: CanvasRenderingContext2D;
   //O var objects;
   private objects: Array<INameToValueMap>;
   //O var newObjects = [ ];
   private newObjects: Array<INameToValueMap>;
   //O var baseTexture;
   private baseTexture: PIXI.BaseTexture;
   //O var lazyTimeout;
   public lazyTimeout:  ReturnType<typeof setTimeout>;
   //O var rootNode;
   private rootNode: AtlasNode;
   //O var canvasList = [ ];
   private canvasList: Array<HTMLCanvasElement>;
   //O var atlasdim;
   private atlasdim: number;
   //O var startdim = 256;
   private startdim: number;
   //O var maxdim = 2048;
   private maxdim: number;

   //O this.fontFamilyCache = {};
   // hmmm
   private fontFamilyCache: INameToValueMap ;

   //New undefined
   private padding: number;
   //New undefined
   //private rect: PIXI.Rectangle;
   //New undefined
   private w: number;
   //New undefined
   private paddingX: number;
   //New undefined
   private paddingY: number;
   //New undefined
   private baseline: number;
   //New undefined
   private fontSize: number;
   //New undefined
   private lineHeight: number;

   constructor( padding: number)
   {
      //O Atlas
      //O var metricsCanvas = document.createElement( "canvas" );
      this.metricsCanvas = document.createElement( "canvas" );
      //O var metricsContext = metricsCanvas.getContext( "2d" );
      this.metricsContext = this.metricsCanvas.getContext( "2d" );
      //O metricsCanvas.width = 100;
      this.metricsCanvas.width = 100;
      //O metricsCanvas.height = 100;
      this.metricsCanvas.height = 100;

      //O var res = devicePixelRatio || 1;
      //N Unused
      //this.res = this.devicePixelRatio || 1;
      //O var canvas;
      this.canvas = null;
      //O var context;
      this.context = null;
      //O var objects;
      this.objects = null;
      //O var newObjects = [ ];
      this.newObjects = [ ];
      //O var baseTexture;
      this.baseTexture = null;
      //O var lazyTimeout;
      this.lazyTimeout = null;
      //O var rootNode;
      this.rootNode = null;
      //O var canvasList = [ ];
      this.canvasList = [ ];
      //O var atlasdim;
      this.atlasdim = 0;
      //O var startdim = 256;
      this.startdim = 256;
      //O var maxdim = 2048;
      this.maxdim = 2048;

      //O this.fontFamilyCache = {};
      this.fontFamilyCache = {};

      //New undefined
      this.padding = padding;
      //New undefined
      //this.rect = null;
      //New undefined
      this.w = 0;
      //New undefined
      this.paddingX=0;
      //New undefined
      this.paddingY=0;
      //New undefined
      this.baseline=0;
      //New undefined
      this.fontSize=0;
      //New undefined
      this.lineHeight=0;


      //O addCanvas( );
      this.addCanvas( );
   }

   //O var addCanvas = function( )
   private addCanvas = ( ) =>
   {
      //O create new canvas
      //O canvas = document.createElement( "canvas" );
      this.canvas = document.createElement( "canvas" );
      //O context = canvas.getContext( "2d" );
      this.context = this.canvas.getContext( "2d" );
      //O canvasList.push( canvas );
      this.canvasList.push( this.canvas );

      //O reset dimentions
      //O atlasdim = startdim;
      this.atlasdim = this.startdim;
      //O canvas.width = canvas.height = atlasdim;
      this.canvas.width = this.canvas.height = this.atlasdim;
      //O rootNode = new AtlasNode( this.atlasdim, this.atlasdim );
      this.rootNode = new AtlasNode( this.atlasdim, this.atlasdim );

      //O reset array with canvas objects and create new atlas
      //O objects = [ ];
      this.objects = [ ];

      //O set new basetexture
      //O baseTexture = PIXI.BaseTexture.fromCanvas( canvas );
      //N BaseTexture.fromCanvas is Deprecated. Use BaseTexture.from with default options.
      this.baseTexture = PIXI.BaseTexture.from( this.canvas );
      //O baseTexture.mipmap = false;     //if not, pixi bug resizing POW2
      //New false is 0 (off)
      this.baseTexture.mipmap = 0;        //if not, pixi bug resizing POW2
      //O baseTexture.resolution = 1;     //todo: support all resolutions
      this.baseTexture.resolution = 1;    //todo: support all resolutions
      //O baseTexture.update( );
      this.baseTexture.update( );

      //O Debug Spritesheet
      //O if ( DynamicText.settings.debugSpriteSheet )
      if ( DynamicText.settings.debugSpriteSheet )
      {
         //O canvas.className = "DynamicText_SpriteSheet";
         this.canvas.className = "DynamicText_SpriteSheet";
         //O document.body.appendChild( canvas );
         document.body.appendChild( this.canvas );
      }
   };

   //O var drawObjects = function( arr, resized )
   public drawObjects = ( arr: Array<INameToValueMap>, resized: boolean ) =>
   {
      //O if ( resized )
      if ( resized )
      {
         //O baseTexture.update( );
         this.baseTexture.update( );
      }
      //O for ( var i = 0; i < arr.length; i++ )
      for ( let i = 0; i < arr.length; i++ )
      {
         //O drawObject( arr[ i ] );
         this.drawObject( arr[ i ] );
      }
   };

   //O var drawObject = function( obj )
   private drawObject = ( obj: INameToValueMap ): void =>
   {
      //O context.drawImage( obj._cache, obj.frame.x, obj.frame.y );
      this.context.drawImage( obj._cache, obj.frame.x, obj.frame.y );
      //O obj.texture.frame = obj.frame;
      obj.texture.frame = obj.frame;
      //O obj.texture.update( );
      obj.texture.update( );
   };

   //O this.getCharObject = function( char, style )
   public getCharObject = ( char: string, style: DynamicTextStyle ) : INameToValueMap =>
   {
      //O var font = style.ctxFont( );
      let font = style.ctxFont( );

      //O create new cache for fontFamily
      //O var familyCache = this.fontFamilyCache[ font ];
      let familyCache = this.fontFamilyCache[ font ];
      //O if ( ! familyCache )
      if ( ! familyCache )
      {
         //O familyCache = {};
         familyCache = {};
         //O this.fontFamilyCache[ font ] = familyCache;
         this.fontFamilyCache[ font ] = familyCache;
      }

      //O get char data
      //O var key = style.ctxKey( char );
      let key = style.ctxKey( char );
      //O var obj = familyCache[ key ];
      let obj = familyCache[ key ];
      //O if ( ! obj )
      if ( ! obj )
      {
         //O create char object
         //O var metrics = generateCharData( char, style );
         let metrics = this.generateCharData( char, style );

         //O temp resize if doesnt fit (not nesseary when we dont need to generate textures)
         //O if ( metrics.rect )
         if ( metrics.rect )
         {
            //O if ( canvas.width < metrics.rect.width || canvas.height < metrics.rect.height )
            if ( this.canvas.width < metrics.rect.width || this.canvas.height < metrics.rect.height )
            {
               //O canvas.width = canvas.height = Math.max( metrics.rect.width, metrics.rect.height );
               this.canvas.width = this.canvas.height = Math.max( metrics.rect.width, metrics.rect.height );
               //O baseTexture.update( );
               this.baseTexture.update( );
            }
         }

         //O todo: cleanup when we know whats needed
         //O obj =
         obj =
         {
            //O metrics: metrics,
            metrics: metrics,
            //O font: font,
            font: font,
            //O value: char,
            value: char,
            //O frame: metrics.rect,
            frame: metrics.rect,
            //O baseTexture: metrics.rect ? baseTexture : null,
            baseTexture: metrics.rect ? this.baseTexture : null,
            //O xOffset: metrics.bounds ? metrics.bounds.minx : 0,
            xOffset: metrics.bounds ? metrics.bounds.minx : 0,
            //O yOffset: metrics.descent || 0,
            yOffset: metrics.descent || 0,
            //O width: metrics.width || 0,
            width: metrics.width || 0,
            //O lineHeight: metrics.lineHeight || 0,
            lineHeight: metrics.lineHeight || 0,
            //O _cache: metrics.canvas,
            _cache: metrics.canvas,

            //O temp texture
            //O texture: metrics.rect ? new PIXI.Texture( baseTexture, metrics.rect ) : null
            texture: metrics.rect ? new PIXI.Texture( this.baseTexture, metrics.rect ) : null
         };

         //O add to collections
         //O familyCache[ key ] = obj;
         familyCache[ key ] = obj;

         //O add to atlas if visible char
         //O if ( metrics.rect )
         if ( metrics.rect )
         {
            //O newObjects.push( obj );
            this.newObjects.push( obj );

            //O if ( lazyTimeout === undefined )
            if ( this.lazyTimeout === undefined )
            {
               var _this = this;

               //O lazyTimeout = setTimeout( function( )
               this.lazyTimeout = setTimeout( () =>
               {
                  //O addNewObjects( );
                  this.addNewObjects( );
                  //O lazyTimeout = undefined;
                  _this.lazyTimeout = undefined;

               }, 0 );
            }
         }
      }

      //O return obj;
      return obj;
   };

   //O var compareFunction = function( a, b )
   private compareFunction = ( a: INameToValueMap, b: INameToValueMap ): number =>
   {
      //O if ( a.frame.height < b.frame.height )
      if ( a.frame.height < b.frame.height )
      {
         //O return 1;
         return 1;
      }

      //O if ( a.frame.height > b.frame.height )
      if ( a.frame.height > b.frame.height )
      {
         //O return -1;
         return -1;
      }

      //O if ( a.frame.width < b.frame.width )
      if ( a.frame.width < b.frame.width )
      {
         //O return 1;
         return 1;
      }

      //O if ( a.frame.width > b.frame.width )
      if ( a.frame.width > b.frame.width )
      {
         //O return -1;
         return -1;
      }

      //O return 0;
      return 0;
   };

   //O var addNewObjects = function( )
   public addNewObjects = ( ): void =>
   {
      //O newObjects.sort( compareFunction );
      this.newObjects.sort( this.compareFunction );
      //O var _resized = false;
      let _resized: boolean = false;
      //O var _newcanvas = false;
      let _newcanvas: boolean = false;

      //O for ( var i = 0; i < newObjects.length; i++ )
      for ( var i = 0; i < this.newObjects.length; i++ )
      {
         //O var obj = newObjects[ i ];
         let obj = this.newObjects[ i ];
         //O var node = rootNode.insert( obj.frame.width + padding, obj.frame.height + padding, obj );
         let node = this.rootNode.insert( obj.frame.width + this.padding, obj.frame.height + this.padding, obj );

         //O if ( node !== null )
         if ( node !== null )
         {
            //O update basetexture if new canvas was created (temp)
            //O if ( _newcanvas )
            if ( _newcanvas )
            {
               //O obj.texture.baseTexture = baseTexture;
               obj.texture.baseTexture = this.baseTexture;
            }
            //O objects.push( obj );
            this.objects.push( obj );
            //O continue;
            continue;
         }

         //O step one back (so it will be added after resize/new canvas)
         //O i--;
         i--;

         //O if ( atlasdim < maxdim )
         if ( this.atlasdim < this.maxdim )
         {
            //O _resized = true;
            _resized = true;
            //O resizeCanvas( atlasdim * 2 );
            this.resizeCanvas( this.atlasdim * 2 );
            //O continue;
            continue;
         }

         //O close current spritesheet and make a new one
         //O drawObjects( objects, _resized );
         this.drawObjects( this.objects, _resized );
         //O addCanvas( );
         this.addCanvas( );
         //O _newcanvas = true;
         _newcanvas = true;
         //O _resized = false;
         _resized = false;
      }

      //O drawObjects( _resized || _newcanvas ? objects : newObjects, _resized );
      this.drawObjects( _resized || _newcanvas ? this.objects : this.newObjects, _resized );
      //O newObjects = [ ];
      this.newObjects = [ ];
   };

   //O var resizeCanvas = function( dim )
   public resizeCanvas =( dim: number ): void =>
   {
      //O canvas.width = canvas.height = atlasdim = dim;
      this.canvas.width = this.canvas.height = this.atlasdim = dim;

      //O rootNode = new this.AtlasNode( dim, dim );
      this.rootNode = new AtlasNode( dim, dim );
      //O objects.sort( compareFunction );
      this.objects.sort( this.compareFunction );

      //O for ( var i = 0; i < objects.length; i++ )
      for ( let i = 0; i < this.objects.length; i++ )
      {
         //O var obj = objects[ i ];
         let obj = this.objects[ i ];
         //O rootNode.insert( obj.frame.width + padding, obj.frame.height + padding, obj );
         this.rootNode.insert( obj.frame.width + this.padding, obj.frame.height + this.padding, obj );
      }
   };

   //O convert shadow string to shadow data
   //O var shadowData = function( str )
   public shadowData = ( str: string ): INameToValueMap =>
   {
      //O var data = str.trim( ).split( ' ' );
      let data = str.trim( ).split( ' ' );

      //O return
      let rc =
      {
         //O color: string( data[ 0 ], "#000000" ),
         color: string( data[ 0 ], "#000000" ),
         //O alpha: float( data[ 1 ], 0.5 ),
         alpha: float( data[ 1 ], 0.5 ),
         //O xOffset: float( data[ 2 ], 3 ),
         xOffset: float( data[ 2 ], 3 ),
         //O yOffset: float( data[ 3 ], 3 ),
         yOffset: float( data[ 3 ], 3 ),
         //O blur: float( data[ 4 ], 5 )
         blur: float( data[ 4 ], 5 )
      };

      return rc;
   };

   //O convert fill string to fill data
   //O var fillData = function( str )
   public fillData = ( str: string ): INameToValueMap =>
   {
      //O var data = str.trim( ).split( ' ' );
      let data = str.trim( ).split( ' ' );
      //O var c = string( data[ 0 ], "#FFFFFF" );
      let c = string( data[ 0 ], "#FFFFFF" );
      //O var a = float( data[ 1 ], 1 );
      let a = float( data[ 1 ], 1 );

      //O return
      let rc =
      {
         //O color: c,
         color: c,
         //O alpha: a,
         alpha: a,
         //O position: float( data[ 2 ], -1 ),
         position: float( data[ 2 ], -1 ),
         //O rgba: hexToRgba( c, a )
         rgba: hexToRgba( c, a )
      };
      return rc;
   };

   //O create fill style from fill string
   //O var getFillStyle = function( str )
   public getFillStyle = ( str: string ): string =>
   {
      //O var fills = str.split( ',' ).filter( function( s )
      //N Convert fills in stages to get around changing types
      let fills_stage1 = str.split( ',' ).filter( function( s )
      {
         //O return s !== '';
         return s !== '';
      } ), i;

      //N Convert fills in stages to get around changing types
      let fills: Array<INameToValueMap> = [];
      //O convert to fill data
      //O for ( i = 0; i < fills.length; i++ )
      for ( i = 0; i < fills.length; i++ )
      {
         //O fills[ i ] = fillData( fills[ i ] );
         fills[ i ] = this.fillData( fills_stage1[ i ] );
      }
      //N Convert fills in stages to get around changing types
      fills_stage1=null;

      //O switch ( fills.length )
      switch ( fills.length )
      {
         //O case 0:
         case 0:
            //O return "white";
            return "white";
            //O case 1:
            case 1:
            //O return fills[ 0 ].rgba ? fills[ 0 ].rgba : fills[ 0 ].color || "#FFFFFF";
            return fills[ 0 ].rgba ? fills[ 0 ].rgba : fills[ 0 ].color || "#FFFFFF";
         //O default:
         default:
         //O make gradient
         //O try
         try
         {
            //O var gradEnd = baseline + lineHeight - fontSize;
            let gradEnd = this.baseline + this.lineHeight - this.fontSize;
            //O var gradient = metricsContext.createLinearGradient( 0, gradEnd - fontSize, 0, gradEnd );
            let gradient = this.metricsContext.createLinearGradient( 0, gradEnd - this.fontSize, 0, gradEnd );

            //O for ( i = 0; i < fills.length; i++ )
            for ( i = 0; i < fills.length; i++ )
            {
               //O gradient.addColorStop( fills[ i ].position !== -1 ? fills[ i ].position : i / ( fills.length - 1 ), fills[ i ].rgba || fills[ i ].color );
               gradient.addColorStop( fills[ i ].position !== -1 ? fills[ i ].position : i / ( fills.length - 1 ), fills[ i ].rgba || fills[ i ].color );
            }

            //O return gradient;
            return <string><unknown> gradient;
         }
         //O catch ( e )
         catch ( e )
         {
            //O return "#FFFFFF";
            return "#FFFFFF";
         }
      }
   };

   //O function to draw shadows
   //O var drawShadows = function( shadowString, stroke )
   //N Pass in char and style
   private drawShadows = ( char: string, style: DynamicTextStyle, shadowString: string, stroke: boolean ) : void =>
   {
      //O var shadows = shadowString.trim( ).split( ',' ).filter( function( s )
      let shadows = shadowString.trim( ).split( ',' ).filter( function( s )
      {
         //O return s !== '';
         return s !== '';
      } );
      //O if ( shadows.length )
      if ( shadows.length )
      {
         //O for ( var i = 0; i < shadows.length; i++ )
         for ( let i = 0; i < shadows.length; i++ )
         {
            //O var s = shadowData( shadows[ i ] );
            let s = this.shadowData( shadows[ i ] );
            //O metricsContext.globalAlpha = s.alpha;
            this.metricsContext.globalAlpha = s.alpha;
            //O metricsContext.shadowColor = s.color;
            this.metricsContext.shadowColor = s.color;
            //O metricsContext.shadowOffsetX = s.xOffset + w;
            this.metricsContext.shadowOffsetX = s.xOffset + this.w;
            //O metricsContext.shadowOffsetY = s.yOffset;
            this.metricsContext.shadowOffsetY = s.yOffset;
            //O metricsContext.shadowBlur = s.blur;
            this.metricsContext.shadowBlur = s.blur;

            //O if ( stroke )
            if ( stroke )
            {
               //O metricsContext.lineWidth = style.stroke;
               this.metricsContext.lineWidth = style.stroke;
               //O metricsContext.strokeText( char, paddingX - w, baseline );
               this.metricsContext.strokeText( char, this.paddingX - this.w, this.baseline );
            }
            //O else
            else
            {
              //O metricsContext.fillText( char, paddingX - w, baseline );
              this.metricsContext.fillText( char, this.paddingX - this.w, this.baseline );
            }
         }
         //O metricsContext.restore( );
         this.metricsContext.restore( );
      }
   };

   //O var generateCharData = function( char, style )
   public generateCharData = ( char: string, style: DynamicTextStyle ) : INameToValueMap =>
   {

      //O var fontSize = Math.max( 1, int( style.fontSize, 26 ) ),
      this.fontSize = Math.max( 1, int( style.fontSize, 26 ) ),
      //O lineHeight = fontSize * 1.25;
      this.lineHeight = this.fontSize * 1.25;

      //O Start our returnobject
      //O var data =
      var data: INameToValueMap;
      data =
      {
         //O fontSize: fontSize,
         fontSize: this.fontSize,
         //O lineHeight: lineHeight,
         lineHeight: this.lineHeight,
         //O width: 0
         width: 0
      };

      //O Return if newline
      //O if ( !char || /(?:\r\n|\r|\n)/.test( char ) )
      if ( ! char || /(?:\r\n|\r|\n)/.test( char ) )
      {
         //O return data;
         return data;
      }

      //O Ctx font string
      //O var font = style.ctxFont( );
      let font = style.ctxFont( );
      //O metricsContext.font = font;
      this.metricsContext.font = font;

      //O Get char width
      //O data.width = Math.round( metricsContext.measureText( char ).width );
      data.width = Math.round( this.metricsContext.measureText( char ).width );

      //O Return if char = space
      //O if ( /(\s)/.test( char ) )
      if ( /(\s)/.test( char ) )
      {
         //O return data;
         return data;
      }

      //O set canvas size (with padding so we can messure)
      //O var paddingY = Math.round( fontSize * 0.7 );
      this.paddingY = Math.round( this.fontSize * 0.7 );
      //O var paddingX = Math.max( 5, Math.round( fontSize * 0.7 ) );
      this.paddingX = Math.max( 5, Math.round( this.fontSize * 0.7 ) );
      //O var metricsCanvas.width = Math.ceil( data.width ) + paddingX * 2;
      this.metricsCanvas.width = Math.ceil( data.width ) + this.paddingX * 2;
      //O var metricsCanvas.height = 1.5 * fontSize;
      this.metricsCanvas.height = 1.5 * this.fontSize;
      //O var w = metricsCanvas.width;
      let w = this.metricsCanvas.width;
      //O var h = metricsCanvas.height;
      let h = this.metricsCanvas.height;
      //O var baseline = ( h / 2 ) + ( paddingY * 0.5 );
      this.baseline = ( h / 2 ) + ( this.paddingY * 0.5 );

      //O set font again after resize
      //O metricsContext.font = font;
      this.metricsContext.font = font;

      //O make sure canvas is clean
      //O metricsContext.clearRect( 0, 0, w, h );
      this.metricsContext.clearRect( 0, 0, w, h );

      //O save clean state with font
      //O metricsContext.save( );
      this.metricsContext.save( );

      //O draw text shadows
      //O if ( style.shadow.length )
      if ( style.shadow.length )
      {
         //O drawShadows( style.shadow, false );
         //New pass in char and style
         this.drawShadows( char, style, style.shadow, false );
      }

      //O draw stroke shadows
      //O if ( style.stroke && style.strokeShadow.length )
      if ( style.stroke && style.strokeShadow.length )
      {
         //O drawShadows( style.strokeShadow, true );
         this.drawShadows( char, style, style.strokeShadow, true );
      }

      //O draw text
      //O metricsContext.fillStyle = getFillStyle( string( style.fill, "#000000" ) );
      this.metricsContext.fillStyle = this.getFillStyle( string( style.fill, "#000000" ) );
      //O metricsContext.fillText( char, paddingX, baseline );
      this.metricsContext.fillText( char, this.paddingX, this.baseline );
      //O metricsContext.restore( );
      this.metricsContext.restore( );

      //O draw stroke
      //O if ( style.stroke )
      if ( style.stroke )
      {
         //O metricsContext.strokeStyle = getFillStyle( string( style.strokeFill, "#000000" ) );
         this.metricsContext.strokeStyle = this.getFillStyle( string( style.strokeFill, "#000000" ) );
         //O metricsContext.lineWidth = style.stroke;
         this.metricsContext.lineWidth = style.stroke;
         //O metricsContext.strokeText( char, paddingX, baseline );
         this.metricsContext.strokeText( char, this.paddingX, this.baseline );
         //O metricsContext.restore( );
         this.metricsContext.restore( );
      }

      //O begin messuring
      //O var pixelData = metricsContext.getImageData( 0, 0, w, h ).data;
      let pixelData = this.metricsContext.getImageData( 0, 0, w, h ).data;

      //O var i = 3;
      let i = 3;
      //O var line = w * 4;
      let line = w * 4;
      //O var len = pixelData.length;
      let len = pixelData.length;

      //O scanline on alpha
      //O while ( i < len && !pixelData[ i ] )
      while ( i < len && !pixelData[ i ] )
      {
         //O i += 4;
         i += 4;
      }
      //O var ascent = ( i / line ) | 0;
      let ascent = ( i / line ) | 0;

      //O if ( i < len )
      if ( i < len )
      {
         //O rev scanline on alpha
         //O i = len - 1;
         i = len - 1;
         //O while ( i > 0 && !pixelData[ i ] )
         while ( i > 0 && !pixelData[ i ] )
         {
            //O i -= 4;
            i -= 4;
         }
         //O var descent = ( i / line ) | 0;
         let descent = ( i / line ) | 0;

         //O left to right scanline on alpha
         //O for ( i = 3; i < len && !pixelData[ i ]; )
         for ( i = 3; i < len && !pixelData[ i ]; )
         {
            //O i += line;
            i += line;
            //O if ( i >= len )
            if ( i >= len )
            {
               //O i = ( i - len ) + 4;
               i = ( i - len ) + 4;
            }
         }
         //O var minx = ( ( i % line ) / 4 ) | 0;
         let minx = ( ( i % line ) / 4 ) | 0;

         //O right to left scanline on alpha
         //O var step = 1;
         let step = 1;
         //O for ( i = len - 1; i >= 0 && !pixelData[ i ]; )
         for ( i = len - 1; i >= 0 && !pixelData[ i ]; )
         {
            //O i -= line;
            i -= line;
            //O if ( i < 0 )
            if ( i < 0 )
            {
               //O i = ( len - 1 ) - ( step++ ) * 4;
               i = ( len - 1 ) - ( step++ ) * 4;
            }
         }
         //O var maxx = ( ( i % line ) / 4 ) + 1 | 0;
         let maxx = ( ( i % line ) / 4 ) + 1 | 0;

         //O set font metrics
         //O data.ascent = Math.round( baseline - ascent );
         data.ascent = Math.round( this.baseline - ascent );
         //O data.descent = Math.round( descent - baseline );
         data.descent = Math.round( descent - this.baseline );
         //O data.height = 1 + Math.round( descent - ascent );
         data.height = 1 + Math.round( descent - ascent );
         //O data.bounds =
         data.bounds =
         {
            //O minx: minx - paddingX,
            minx: minx - this.paddingX,
            //O maxx: maxx - paddingX,
            maxx: maxx - this.paddingX,
            //O miny: 0,
            miny: 0,
            //O maxy: descent - ascent
            maxy: descent - ascent
         };
         //O data.rect =
         data.rect =
         {
            //O x: data.bounds.minx,
            x: data.bounds.minx,
            //O y: -data.ascent - 2,
            y: -data.ascent - 2,
            //O width: data.bounds.maxx - data.bounds.minx + 2,
            width: data.bounds.maxx - data.bounds.minx + 2,
            //O height: data.ascent + data.descent + 4
            height: data.ascent + data.descent + 4
         };

         //O cache (for fast rearrange later)
         //O data.canvas = document.createElement( "canvas" );
         data.canvas = document.createElement( "canvas" );
         //O data.canvas.width = data.rect.width;
         data.canvas.width = data.rect.width;
         //O data.canvas.height = data.rect.height;
         data.canvas.height = data.rect.height;

         //O var c = data.canvas.getContext( "2d" );
         let c = data.canvas.getContext( "2d" );
         //O c.drawImage( metricsCanvas, -paddingX - data.rect.x, -baseline - data.rect.y );
         c.drawImage( this.metricsCanvas, -this.paddingX - data.rect.x, -this.baseline - data.rect.y );

         //O reset rect position
         //O data.rect.x = data.rect.y = 0;
         data.rect.x = data.rect.y = 0;
      }
      //O return data;
      return data;
   };
};

//O helper function for float or default
//O function float( val, def )
function float( val: any, def: number ): number
{
   //O if ( isNaN( val ) )
   if ( isNaN( val ) )
   {
      //O return def;
      return def;
   }
   //O return parseFloat( val );
   return parseFloat( val );
}

//O helper function for int or default
//O function int( val, def )
function int( val: any, def: number ): number
{
   //O if ( isNaN( val ) )
   if ( isNaN( val ) )
   {
      //O return def;
      return def;
   }
   //O return parseInt( val );
   return parseInt( val );
}

//O helper function for string or default
//O function string( val, def )
function string( val: any, def: string ): string
{
   //O if ( typeof val === 'string' && val.length )
   if ( typeof val === 'string' && val.length )
   {
      //O return val;
      return val;
   }
   //O return def;
   return def;
}

//O helper function to convert string hex to int or default
//O function hexToInt( str, def )
function hexToInt( str: any, def: number ): number
{
   //O if ( typeof str === 'number' )
   if ( typeof str === 'number' )
   {
      //O return str;
      return str;
   }

   //O var result = parseInt( str.replace( '#', '0x' ) );
   let result = parseInt( str.replace( '#', '0x' ) );

   //O if ( isNaN( result ) )
   if ( isNaN( result ) )
   {
      //O return def;
      return def;
   }
   //O return result;
   return result;
}

//O helper function to convert hex to rgba
//O function hexToRgba( hex, alpha )
function hexToRgba( hex: string, alpha: number ): string
{
   //O var result = /^#?([a-f\d] { 2 })([a-f\d] { 2 })([a-f\d] { 2 })$/i.exec( hex ); 
   var result = /^#?([a-f\d] { 2 })([a-f\d] { 2 })([a-f\d] { 2 })$/i.exec( hex ); 

   //N alpha is already a number. No need to convert
   //O alpha = float( alpha, 1 );

   //O return result ? "rgba(" + parseInt( result[ 1 ], 16 ) + "," + parseInt( result[ 2 ], 16 ) + "," + parseInt( result[ 3 ], 16 ) + "," + alpha + ")" : false;
   //New cast to return string
   let rc = result ? "rgba(" + parseInt( result[ 1 ], 16 ) + "," + parseInt( result[ 2 ], 16 ) + "," + parseInt( result[ 3 ], 16 ) + "," + alpha + ")" : false;

   return <string> rc;
}

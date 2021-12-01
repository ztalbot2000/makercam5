//O package com.partkart

//O   import flash.display.*
//O   import flash.events.*
//O   import flash.geom.Matrix
//O   import flash.text.*
//O   import flash.filters.DropShadowFilter
//O   import fl.controls.Button
//O   import flash.net.FileReference
//O   import flash.net.FileFilter
//O   import fl.controls.CheckBox
//O   import fl.controls.ComboBox
//O   import fl.controls.List

import * as PIXI from 'pixi.js'
import Button from '../ui/button'
import Checkbox from '../ui/checkbox'
import List from '../ui/list'

// this sets up a modal dialog from a list of text input objects
//public class Dialog extends Sprite
export class Dialog extends PIXI.Sprite
{
   // array of field objects that will serve as our data provider
   //O private var flist:Array;
   private flist: Array< Object >

   // width of the dialog
   private dwidth: number
   // height of the dialog
   private dheight: number

   // background box
   //O private back: PIXI.Shape
   private back: PIXI.Graphics
   // close button
   private clsprite: PIXI.Sprite

   private file: FileReference

   // the label for the "ok" button
   private submitlabel: string

   // if true, close the window after performing desired action
   //O private var closewindow:Boolean;
   private closewindow: boolean

   //O public function Dialog(dialogwidth:int, dialogheight:int, fieldlist:Array, inputlabel:String = "OK", inputclose:Boolean = true):void
   constructor( dialogwidth: number, dialogheight: number, fieldlist: Array < Object >, inputlabel: string = "OK", inputclose: boolean = true )
   {
      //N 'super' must be called before accessing 'this'
      super();

      this.dwidth = dialogwidth
      this.dheight = dialogheight
      this.flist = fieldlist
      this.submitlabel = inputlabel
      this.closewindow = inputclose

      this.init( )
      this.populateFields( )
   }

   private init( ): void
   {
      //O this.back = new Shape( )
      this.back = new PIXI.Graphics( )

      //O var m:Matrix = new Matrix(dwidth/1000, 0, 0, dheight/1000,dwidth/2, dheight/2);
      let m = new PIXI.Matrix( this.dwidth/1000, 0, 0, this.dheight/1000, this.dwidth/2, this.dheight/2 )
      this.back.beginGradientFill( GradientType.RADIAL, [0x444444, 0x222222],[1, 1],[50, 255], m )
      //O back.graphics.drawRoundRect(0,0,dwidth,dheight,20,20);
      this.back.drawRoundedRect( 0, 0, this.dwidth, this.dheight, 20, 20 )
      this.back.endFill( )

      this.addChild( this.back )

      this.addEventListener( MouseEvent.MOUSE_DOWN, this.dialogDown )
      this.addEventListener( MouseEvent.MOUSE_UP, this.dialogUp )

      // add close button

      //O clsprite = new Sprite();
      this.clsprite = new PIXI.Sprite( )

      //O let cl = new Shape( )
      let cl: PIXI.Graphics = new PIXI.Graphics( )
      cl.beginFill( 0xff0000 )
      cl.drawCircle( 0, 0, 8 )
      cl.endFill( )

      //O cl.graphics.lineStyle(2, 0xffffff, 1, false, LineScaleMode.NONE, CapsStyle.ROUND);
      cl.lineStyle( 2, 0xffffff, 1, false, LineScaleMode.NONE, CapsStyle.ROUND )

      cl.moveTo( -3, -3 )
      cl.lineTo( 3, 3 )

      cl.moveTo( 3, -3 )
      cl.lineTo( -3, 3 )

      this.clsprite.addChild( cl )

      this.clsprite.x = this.dwidth - 13
      this.clsprite.y = 13

      this.addChild( this.clsprite )

      this.clsprite.alpha = 0.7

      this.clsprite.addEventListener( 'click', this.closeDialog )

      this.clsprite.addEventListener( 'mouseover', this.closeOver )
      this.clsprite.addEventListener( 'mouseout', this.closeOut )
   }

   private populateFields( ): void
   {
      let vposition: number = 30
      let hposition: number = 20

      //O let format: TextFormat = new TextFormat( "Arial", 11 )
      let format: PIXI.TextStyle = new PIXI.TextStyle( "Arial", 11 )

      //O var shadowfilter:DropShadowFilter = new DropShadowFilter(2,45,0,0.65,3,3);
      let shadowfilter: PIXI.filters.DropShadowFilter = new DropShadowFilter( 2, 45, 0, 0.65, 3, 3 )

      let input: TextField

      for( let i = 0; i < this.flist.length; i++)
      {
         //O var f:Object = flist[i];
         let f: Object = this.flist[i]

         switch( f.type )
         {
            case "label":
               this.addLabel( f, hposition, vposition )
               break
            case "number":
               this.addLabel( f, hposition, vposition )
               input = new TextField( )

               input.restrict = "0-9.\\-"

               input.defaultTextFormat = format
               input.type = TextFieldType.INPUT
               input.multiline = false
               input.height = 20
               input.width = this.dwidth - ( hposition*2 )
               input.background = true
               input.x = this.dwidth
               input.y = vposition
               input.filters = [shadowfilter]

               if ( f.value )
               {
                  input.text = f.value
               }

               if ( f.highlight )
               {
                  input.backgroundColor = 0xfffbae
               }

               f.input = input
               this.addChild( input )
               break
            case "string":
               this.addLabel( f, hposition, vposition )
               input = new TextField( )

               input.defaultTextFormat = format
               input.type = TextFieldType.INPUT
               input.multiline = false
               input.height = 20
               input.width = this.dwidth - ( hposition*2 )
               input.background = true
               input.x = this.dwidth
               input.y = vposition
               input.filters = [shadowfilter]

               if ( f.value )
               {
                  input.text = f.value
               }

               f.input = input
               this.addChild( input )
               break
            case "combobox":
               if ( f.label )
               {
                  this.addLabel( f, hposition, vposition )
               }
               let combobox: ComboBox = new ComboBox( )

               if ( f.items )
               {
                  //O for each(var item:Object in f.items)
                  for ( let item in f.items )
                  {
                     combobox.addItem( item )
                     if ( f.value != null && f.value == item.data )
                     {
                        combobox.selectedItem = item
                     }
                  }
               }

               combobox.height = 20
               combobox.width = this.dwidth - ( hposition*2 )
               if ( f.label )
               {
                  combobox.x = this.dwidth
               }
               else
               {
                  combobox.x = hposition
               }
               combobox.y = vposition
               combobox.filters = [shadowfilter]

               f.input = combobox
               this.addChild( combobox )
               break
            case "file":
               this.addLabel( f, hposition, vposition )
               //O var browse:Button = new Button();
               let browse = new Button( )
               browse.label = "Browse"
               browse.width = 80
               browse.x = this.dwidth
               browse.y = vposition
               //O addChild(browse);
               this.addChild( browse )

               //O browse.addEventListener(MouseEvent.CLICK, browseAction);
               browse.addEventListener( 'click', this.browseAction )
               break
            case "checkbox":
               //O var checkbox:CheckBox = new CheckBox();
               let checkbox = new Checkbox( )
               //O let fo: TextFormat = new TextFormat( "Arial", 11 )
               let fo: PIXI.TextStyle = new PIXI.TextStyle( "Arial", 11 )
               fo.color = 0xffffff
               checkbox.setStyle( "textFormat", fo )
               checkbox.selected = f.value
               checkbox.x = hposition
               checkbox.y = vposition
               checkbox.width = this.dwidth
               checkbox.label = f.label

               f.input = checkbox
               this.addChild( checkbox )
               break
            case "listbox":
               this.addLabel( f, hposition, vposition )
               let listbox: List = new List( )
               listbox.allowMultipleSelection = true
               listbox.width = this.dwidth - ( hposition*2 )
               listbox.height = 200
               listbox.x = hposition
               listbox.y = vposition+20

               if ( f.value && f.value.length > 0 )
               {
                  for ( let obj: Object in f.value )
                  {
                     listbox.addItem( obj )
                  }
               }

               vposition += 200

               f.input = listbox
               this.addChild( listbox )
               break
            case "cutlist":                              // special element used only for exporting g-code
               this.addLabel( f, hposition, vposition )
               let cutlist: List = new List( )
               cutlist.name = "cutlist"
               cutlist.allowMultipleSelection = true
               cutlist.width = this.dwidth
               cutlist.height = 200
               cutlist.x = hposition
               cutlist.y = vposition+20

               if ( f.value && f.value.length > 0 )
               {
                  for ( let obj in f.value )
                  {
                     cutlist.addItem( obj )
                  }
                  let selectedcuts: Array = new Array( )
                  for ( let obj in f.value )
                  {
                     if ( obj.active )
                     {
                        selectedcuts.push( obj )
                     }
                  }
                  cutlist.selectedItems = selectedcuts
               }

               vposition += 210

               // manipulator buttons
               //O var up:Button = new Button();
               let up = new Button( )
               up.label = "+"
               up.width = 20
               up.x = hposition
               up.y = vposition+20
               this.addChild( up )

               // move selected upward
               // @ts-ignore error TS6133: 'e' is declared but never read
               let uphandler = ( e: MouseEvent ): void =>
               {
                  for( let i: number = 0; i < cutlist.length; i++ )
                  {
                     let obj: Object = cutlist.getItemAt( i )
                     if ( i > 0 && cutlist.isItemSelected(obj ) )
                     {
                        cutlist.removeItemAt( i )
                        cutlist.addItemAt( obj, i - 1 )
                        cutlist.selectedIndex = i - 1
                        break
                     }
                  }
               }

               up.addEventListener( 'click', uphandler )

               //O var down:Button = new Button();
               let down = new Button( )
               down.label = "-"
               down.width = 20
               down.x = hposition + 25
               down.y = vposition + 20
               this.addChild( down )

               // move selected downward
               // @ts-ignore error TS6133: 'e' is declared but never read
               let downhandler = ( e: MouseEvent ): void =>
               {
                  for( let i: number=0; i < cutlist.length; i++ )
                  {
                     let obj: Object = cutlist.getItemAt( i )
                     if ( i < cutlist.length - 1 && cutlist.isItemSelected( obj ) )
                     {
                        cutlist.removeItemAt( i )
                        cutlist.addItemAt( obj, i + 1 )
                        cutlist.selectedIndex = i + 1
                        break
                     }
                  }
               }

               down.addEventListener( 'click', downhandler )

               //O var sort:Button = new Button();
               let sort = new Button( )
               sort.label = "sort by tool"
               sort.width = 80
               sort.x = hposition + 50
               sort.y = vposition + 20
               this.addChild( sort )

               // sort by tool size
               let desc: boolean = true
               // @ts-ignore error TS6133: 'e' is declared but never read
               let sorthandler = ( e: MouseEvent ): void =>
               {
                  if ( desc )
                  {
                     cutlist.sortItemsOn( "diameter", Array.NUMERIC | Array.DESCENDING )
                  }
                  else
                  {
                     cutlist.sortItemsOn( "diameter", Array.NUMERIC )
                  }
                  desc = !desc
               }

               sort.addEventListener( 'click', sorthandler )

               //O var profile:Button = new Button();
               let profile = new Button( )
               profile.label = "profiles last"
               profile.width = 80
               profile.x = hposition + 135
               profile.y = vposition + 20
               this.addChild( profile )

               // put profile operations at the bottom
               // @ts-ignore error TS6133: 'e' is declared but never read
               let profilehandler = ( e: MouseEvent ): void =>
               {
                  let num: number = cutlist.length

                  for( let i: number=0; i < num; i++ )
                  {
                     let obj: Object = cutlist.getItemAt( i )
                     //O if ( obj.data is ProfileCutObject )
                     if ( obj.data instanceof ProfileCutObject )
                     {
                        cutlist.removeItemAt( i )
                        cutlist.addItem( obj )
                        i--
                        num--
                     }
                  }
               }

               profile.addEventListener( "click", profilehandler )

               //O var all:Button = new Button();
               let all = new Button( )
               all.label = "all"
               all.width = 30
               all.x = hposition + 220
               all.y = vposition + 20
               this.addChild( all )

               // select all items
               let allhandler = ( e: MouseEvent ): void =>
               {
                  let selected: Array = new Array( )
                  for( let i: number = 0; i < cutlist.length; i++ )
                  {
                     selected.push( cutlist.getItemAt( i ) )
                  }
                  cutlist.selectedItems = selected
               }

               all.addEventListener( "click", allhandler )

               f.input = cutlist
               this.addChild( cutlist )
               vposition += 20
               break
         }

         if ( f.type != "label" && f.type != "checkbox" )
         {
            vposition += 30
         }
         else
         {
            vposition += 20
         }
      }

      vposition += 10

      if ( this.width > this.back.width )
      {
         this.back.width = this.width + 20
      }
      if ( this.height > this.back.height )
      {
         this.back.height = this.height - 20
      }

      this.clsprite.x = this.back.width - 20

      let buttonwidth: number = Math.max( 50, this.submitlabel.length * 7 )

      //O var submit:Button = new Button();
      let submit = new Button( )
      submit.label = this.submitlabel
      submit.width = buttonwidth
      submit.x = this.width / 2 - buttonwidth / 2
      submit.y = vposition
      this.addChild( submit )

      submit.addEventListener( 'click', this.processDialog )

      vposition += 30
   }

   private addLabel( f: Object, hposition: number, vposition: number ): void
   {
      //O let format: TextFormat = new TextFormat( "Arial", 11 )
      let format: PIXI.TextStyle = new PIXI.TextStyle( "Arial", 11 )
      let t: TextField = new TextField( )

      t.defaultTextFormat = format
      t.text = f.label
      t.type = TextFieldType.DYNAMIC
      t.multiline = false
      t.selectable = false
      t.x = hposition
      t.y = vposition
      t.textColor = 0xffffff

      t.width = this.dwidth

      this.addChild( t )
   }

   private closeOver( e: MouseEvent ): void
   {
      e.target.alpha = 1
   }

   private closeOut( e: MouseEvent ): void
   {
      e.target.alpha = 0.7
   }

   private dialogDown( e: MouseEvent ): void
   {
      //O if ( e.target == this || ( e.target is TextField && e.target.selectable == false) )
      if ( e.target == this || ( e.target instanceof TextField && e.target.selectable == false) )
      {
         startDrag( )
      }
   }

   // @ts-ignore error TS6133: 'e' is declared but never read
   private dialogUp( e: MouseEvent ): void
   {
      stopDrag( )
   }

   // @ts-ignore error TS6133: 'e' is declared but never read
   private closeDialog( e: MouseEvent ): void
   {
      if ( this.parent )
      {
         let main: * = this.parent
         main.endDialog( )
         main.setCursor( )
         this.parent.removeChild( this )
      }
   }

   private processDialog( e: MouseEvent ): void
   {
      if ( this.parent )
      {
         let main: * = this.parent
         if ( this.closewindow )
         {
            this.closeDialog( e )
         }
         main.processDialog( this.flist, this.name )
         return
      }
      if ( this.closewindow )
      {
         this.closeDialog( e )
      }
   }

   // @ts-ignore error TS6133: 'e' is declared but never read
   private browseAction( e: MouseEvent ): void
   {
      //O file = new FileReference();
      this.file = new FileReference( )

      //O file.addEventListener(Event.SELECT, fileSelect);
      this.file.addEventListener( Event.SELECT, this.fileSelect )
      //O file.addEventListener(Event.CANCEL, fileCancel);
      this.file.addEventListener( Event.CANCEL, this.fileCancel )

      this.file.browse( new Array( new FileFilter( "Images ( *.jpg, *.jpeg, *.gif, *.png )", "*.jpg;*.jpeg;*.gif;*.png" ) ) )
   }

   // @ts-ignore error TS6133: 'e' is declared but never read
   private fileSelect( e: Event ): void
   {
      //O file.addEventListener(Event.COMPLETE, fileProcess);
      this.file.addEventListener( Event.COMPLETE, this.fileProcess )
      //O file.addEventListener(IOErrorEvent.IO_ERROR, fileError);
      this.file.addEventListener( IOErrorEvent.IO_ERROR, this.fileError )

      //O file.load();
      this.file.load( )
   }

   // @ts-ignore error TS6133: 'e' is declared but never read
   private fileCancel( e: Event ): void
   {
      this.file = null
   }

   private fileProcess( e: Event ): void
   {
      let imgloader: Loader = new Loader( )
      imgloader.loadBytes( e.target.data )
      this.flist[ 0 ].input = imgloader

      this.file = null
   }

   // @ts-ignore error TS6133: 'e' is declared but never read
   private fileError( e: IOErrorEvent ): void
   {
      this.file = null
   }
}

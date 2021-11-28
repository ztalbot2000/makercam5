# MakerCam5 - A Port of MakerCam to HTML5 Using Pixi.js ) *PRE ALPHA*
> MakerCam5 - A Port of MakerCam to HTML5 Using Pixi.js ) *PRE ALPHA*


## About

Do NOT Expect this to be done or worked on again anytime soon. Please do not ask
about it.  After spending 6-8 months learning Pixi.js and submitting PIXI_UI_IWM,
I just want to save what I have done so far, which is just an outline and at
bare minimum just draws the Grid of MakerCam.

## What needs to be done.

Answer: Everything.

## Problems encountered

- On the Pixi.js side, while I have created many UI Elements, there are no drop down menus.<BR>
- I was still considering porting MakerCam's XML and MakerCams SVG libraries or 
  going with existing Libraries. <BR>


## How to build

### Step 1.  Create the development environment
'''
npm install --save-dev
'''

### Step 2.  Build the app
'''
npm run start
'''

### Step 3.  Alter webpack.config changing 192.168.2.97 to your local IP
'''
edit webpack.config.json
'''
I hardcoded the IP for my own use, instead of using 127.0.0.1


### Step 4.  Launch the webserver and the app.
'''
npm run devServer
'''



John Talbot
ztalbot2000@gmail.com


import * as PIXI from 'pixi.js';

// V5 code taken from:
// https://pixijs.io/examples/#/demos-basic/container.js

const app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);



var container = new PIXI.Container();
// Create a new texture
const texture = PIXI.Texture.from('bunny.png');
const bunny = new PIXI.Sprite(texture);
bunny.anchor.set(0.5);
bunny.position.set(400,300);
bunny.scale.set(2,2);
container.addChild(bunny);

// Move container to the center
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

// Center bunny sprite in local container coordinates
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;


// Listen for animate update
app.ticker.add((delta) => {
    // rotate the container!
    // use delta to create frame-independent transform
    container.rotation -= 0.01 * delta;
});

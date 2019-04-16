

//________________________________________________________________________________________________


(function() { "use strict";

  
  const SPRITE_SIZE = 50;

 
  var Animation = function(frame_set, delay) {

    this.count = 0;
    this.delay = delay;
    this.frame = 0;
    this.frame_index = 0;
    this.frame_set = frame_set;
  };

  Animation.prototype = {

    
    change:function(frame_set, delay = 15) {

      if (this.frame_set != frame_set) {// If the frame set is different:

        this.count = 0;// Reset the count.
        this.delay = delay;// Set the delay.
        this.frame_index = 0;// Start at the first frame in the new frame set.
        this.frame_set = frame_set;// Set the new frame set.
        this.frame = this.frame_set[this.frame_index];// Set the new frame value.

      }

    },

    /* Call this on each game cycle. */
    update:function() {

      this.count ++;// Keep track of how many cycles have passed since the last frame change.

      if (this.count >= this.delay) {// If enough cycles have passed, we change the frame.

        this.count = 0;// Reset the count.
        /* If the frame index is on the last value in the frame set, reset to 0.
        If the frame index is not on the last value, just add 1 to it. */
        this.frame_index = (this.frame_index == this.frame_set.length - 1) ? 0 : this.frame_index + 1;
        this.frame = this.frame_set[this.frame_index];// Change the current frame value.

      }

    }

  };

  var buffer, controller, display, loop, render, resize, sprite_sheet;

  sprite_sheet = {

    frame_sets:[[0, 1], [2, 3], [4, 5]],// standing still, walk right, walk left
    image:new Image()

  };
  sprite_sheet.image.addEventListener("load", function(event) {// When the load event fires, do this:

    window.requestAnimationFrame(loop);// Start the game loop.

  });

  sprite_sheet.image.src = "images/hero_sprite.png";// Start loading the image.

  //_______________________________________________________________________



let canvas = document.querySelector('canvas'),
    context = canvas.getContext('2d'),
    width = 1280,
    height = 600,

     player = {
        animation:new Animation(),
        x: 115,
        y: 185,
        width: 30,
        height: 50,
        speed: 5,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false
    },

    keys = [],
    friction = 0.8,
    gravity = 0.45;

//Borders and Platforms
let boxes = [];
//Game Left Border
boxes.push({
    x: 0,
    y: 0,
    width: 20,
    height: height
});
//Game Right Border
boxes.push({
    x: width - 20,
    y: 0,
    width: 20,
    height: height
});
//Game Floor
boxes.push({
    x: 0,
    y: height - 10,
    width: width,
    height: 50
});
//Game Roof
boxes.push({
    x: 0,
    y: 0,
    width: width,
    height: 10
});
//Beginning Platform Floor
boxes.push({
    x: 100,
    y: 250,
    width: 50,
    height: 10
});
//Beginning Platform Right Wall
boxes.push({
    x: 148,
    y: 225,
    width: 10,
    height: 35
});
//Middle-bottom Platform
boxes.push({
    x: 475,
    y: 560,
    width: 50,
    height: 30
});
//Right-bottom Platform
boxes.push({
    x: 800,
    y: 520,
    width: 20,
    height: 80
});

canvas.width = width;
canvas.height = height;

function update(loop) {
    // check keys
    if (keys[38] || keys[32] || keys[90]) {
        // up arrow or space or Z
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 2;
            player.animation.change(sprite_sheet.frame_sets[0], 20);
        }
    }
    if (keys[39] || keys[68]) {
        // right arrow or D
        if (player.velX < player.speed) {
            player.velX++;
            player.animation.change(sprite_sheet.frame_sets[1], 15);
        }
    }
    if (keys[37] || keys[81]) {
        // left arrow or Q
        if (player.velX > -player.speed) {
            player.velX--;
            player.animation.change(sprite_sheet.frame_sets[2], 15);
        }
    }

    player.velX *= friction;
    player.velY += gravity;

    //Blocks
    context.clearRect(0, 0, width, height);
    context.fillStyle = "black";
    context.beginPath();

    //Player interactions
    player.grounded = false;
    for (let i = 0; i < boxes.length; i++) {
        context.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);

        let dir = colCheck(player, boxes[i]);

        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            player.velY *= -1;
        }

    }

    if(player.grounded){
         player.velY = 0;
    }

    player.x += player.velX;
    player.y += player.velY;

    //Player
    context.fill()
    //context.drawImage(sprite_sheet.image, player.x, player.y, player.width, player.height)

    player.animation.update();
    requestAnimationFrame(update);

    context.drawImage(sprite_sheet.image, player.animation.frame * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE, Math.floor(player.x), Math.floor(player.y), SPRITE_SIZE, SPRITE_SIZE);

    display.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, display.canvas.width, display.canvas.height);
}

function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    let vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        let oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});


window.addEventListener("load", function () {
    update();
});

})();

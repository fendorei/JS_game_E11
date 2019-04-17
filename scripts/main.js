class Player {
    constructor(animation, x, y, width, height, speed, velX, velY, jumping, grounded) {
        this.animation = animation
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
        this.velX = velX
        this.velY = velY
        this.jumping = jumping
        this.grounded = grounded
    }
}

class Door {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
}

const SPRITE_SIZE = 50;


  let animation = function(frame_set, delay) {

    this.count = 0;
    this.delay = delay;
    this.frame = 0;
    this.frame_index = 0;
    this.frame_set = frame_set;
  };

  animation.prototype = {


    change:function(frame_set, delay = 15) {

      if (this.frame_set != frame_set) {// If the frame set is different:

        this.count = 0;// Reset the count.
        this.delay = delay;// Set the delay.
        this.frame_index = 0;// Start at the first frame in the new frame set.
        this.frame_set = frame_set;// Set the new frame set.
        this.frame = this.frame_set[this.frame_index];// Set the new frame value.

      }

    },

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

  let sprite_sheet;

  sprite_sheet = {

    frame_sets:[[0, 1], [2, 3], [4, 5]],// standing still, walk right, walk left
    image:new Image()

  };
  sprite_sheet.image.addEventListener("load", function(event) {// When the load event fires, do this:



  });

  sprite_sheet.image.src = "images/hero_sprite.png";// Start loading the image.


let imgDoor = new Image();
imgDoor.addEventListener('load', function() {
//  executes drawImage instructions here
}, false);
imgDoor.src = 'images/openedDoor_lv1.png'

const player = new Player(new animation(), 115, 185, 30, 47, 5, 0, 0, false, false)

let canvas = document.querySelector('canvas'),
    context = canvas.getContext('2d'),
    width = 1280,
    height = 600,
    keys = [],
    friction = 0.8,
    gravity = 0.45;

let saw = new MovingSaw(200, 200, 300, 300, 100)
let imgSaw = new Image();
imgSaw.addEventListener('load', function() {
//  executes drawImage instructions here
}, false);
imgSaw.src = 'images/scie.png'

let arrow = new Arrow(200, 200, 100, "vertical")
let imgArrow = new Image();
imgArrow.addEventListener('load', function() {
//  executes drawImage instructions here
}, false);
imgArrow.src = 'images/arrow1s.png'

function update() {
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
    context.beginPath();
    context.clearRect(0, 0, width, height);

    //Door
    context.beginPath();
    context.fillRect(doorLevel1.x, doorLevel1.y, doorLevel1.width, doorLevel1.height)
    context.drawImage(imgDoor,doorLevel1.x, doorLevel1.y, doorLevel1.width, doorLevel1.height)

    context.beginPath();
    context.drawImage(imgSaw, saw.x, saw.y, saw.radius, saw.radius)

    context.beginPath();
    context.drawImage(imgArrow, arrow.x, arrow.y, arrow.width, arrow.height)

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
    player.animation.update();
    requestAnimationFrame(update);

    context.drawImage(sprite_sheet.image, player.animation.frame * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE, Math.floor(player.x), Math.floor(player.y), SPRITE_SIZE, SPRITE_SIZE);

    check_sawed(player, saw)
    check_shot(player, arrow)
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

//Next Level while crossing Door
let isFinished = 0

function newObstacle(){
    for(let i = 0; i < boxesToAdd[isFinished].length; i ++){
        boxes.push(boxesToAdd[isFinished][i]);
    }
}

setInterval(
    ()=>{
        if(player.x <= doorLevel1.x + doorLevel1.width &&
            player.x >= doorLevel1.x &&
            player.y <= doorLevel1.y + doorLevel1.height &&
            player.y >= doorLevel1.y){
            //instructions while touching door = player respawns
                player.x = 115;
                player.y = 185;
                newObstacle()
                isFinished ++                
        }
    },
    100
);

(() => {

  let hours = `00`,
      minutes = `00`,
      seconds = `00`,
      chronometerDisplay = document.querySelector(`[data-chronometer]`),
      chronometerCall

  function chronometer() {

    seconds ++

    if (seconds < 10) seconds = `0` + seconds

    if (seconds > 59) {
      seconds = `00`
      minutes ++

      if (minutes < 10) minutes = `0` + minutes
    }

    if (minutes > 59) {
      minutes = `00`
      hours ++

      if (hours < 10) hours = `0` + hours
    }

    chronometerDisplay.textContent = `${hours}:${minutes}:${seconds}`

  }

  play.onclick = (event) => {
    chronometerCall = setInterval(chronometer, 1000)
    event.target.setAttribute(`disabled`,``)
  }

})()

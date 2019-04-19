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

//Music
let unmuteButton = document.querySelector('.unmuteButton')
let muteButton = document.querySelector('.muteButton')
let audio = document.querySelector('audio')
unmuteButton.addEventListener('click', function() {
  audio.muted = false
});
muteButton.addEventListener('click', function() {
  audio.muted = true
});

//Hero Animation
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

//Img Door
let imgDoor = new Image();
imgDoor.src = 'images/openedDoor_lv1.png'

let imgDoorClosed = new Image();
imgDoorClosed.src = 'images/doorClosed.jpg'

//Player One Object
const player = new Player(new animation(), 50, 175, 30, 47, 5, 0, 0, false, false)

//Canvas properties
let canvas = document.querySelector('canvas'),
    context = canvas.getContext('2d'),
    width = 1280,
    height = 600,
    keys = [],
    friction = 0.8,
    gravity = 0.45;

//Saw Animation
  let animation_saw = function(frame_set_saw, delay) {

    this.count = 0;
    this.delay = delay;
    this.frame = 0;
    this.frame_index_saw = 0;
    this.frame_set_saw = frame_set_saw;
  };

  animation_saw.prototype = {


    update:function() {

      this.count ++;// Keep track of how many cycles have passed since the last frame change.

      if (this.count >= this.delay) {// If enough cycles have passed, we change the frame.

        this.count = 0;// Reset the count.
        /* If the frame index is on the last value in the frame set, reset to 0.
        If the frame index is not on the last value, just add 1 to it. */
        this.frame_index_saw = (this.frame_index_saw == this.frame_set_saw.length - 1) ? 0 : this.frame_index_saw + 1;
        this.frame = this.frame_set_saw[this.frame_index_saw];// Change the current frame value.

      }

    }

  };

  let sprite_sheet_saw;

  sprite_sheet_saw = {

    frame_sets:[0, 1, 2, 3, 4, 5],// standing still, walk right, walk left
    image:new Image()

  };
  sprite_sheet_saw.image.addEventListener("load", function(event) {// When the load event fires, do this:



  });

  sprite_sheet_saw.image.src = "images/saw_2.0.png";// Start loading the image.

  //Creating Traps Objects
  let trap = new Trap(680,555,67,20),
  trap2 = new Trap(850,555,50,20),
  trap3 = new Trap(925,555,50,20),
  trap4 = new Trap(1000,555,50,20),
  trap5 = new Trap(1075,555,50,20),
  saw = new MovingSaw(new animation_saw(sprite_sheet_saw.frame_sets,1), 145, 145, 300, 200, 400, 300, 145, 100),
  saw2 = new MovingSaw(new animation_saw(sprite_sheet_saw.frame_sets,1), 145, 145, 300, 300, 500, 400, 145, 50),
  saw3 = new MovingSaw(new animation_saw(sprite_sheet_saw.frame_sets,1), 145, 145, 200, 200, 300, 300, 145, 100),
  saw4 = new MovingSaw(new animation_saw(sprite_sheet_saw.frame_sets,1), 145, 145, 250, 375, 250, 525, 145, 50),
  saw5 = new MovingSaw(new animation_saw(sprite_sheet_saw.frame_sets,1), 145, 145, 1000, 110, 1215, 110, 145, 40),
  saw6 = new MovingSaw(new animation_saw(sprite_sheet_saw.frame_sets,1), 145, 145, 800, 175, 800, 265, 145, 37.5),
  saw7 = new MovingSaw(new animation_saw(sprite_sheet_saw.frame_sets,1), 145, 145, 925, 175, 925, 265, 145, 37.5),
  saw8 = new MovingSaw(new animation_saw(sprite_sheet_saw.frame_sets,1), 145, 145, 1050, 175, 1050, 265, 145, 37.5),
  saw9 = new MovingSaw(new animation_saw(sprite_sheet_saw.frame_sets,1), 145, 145, 700, 25, 850, 25, 145, 25), arrow = new Arrow(200, 160, 30, "vertical"),
  arrow2 = new Arrow(25,555,1255, "horizontal"),
  arrow3 = new Arrow(900,50,1255, "horizontal");

  // Creating Traps Images
  let imgTrapUp = new Image(),
  imgTrapLeft = new Image(),
  imgTrapDown = new Image(),
  imgTrapRight = new Image(),
  imgArrowUp = new Image(),
  imgArrowLeft = new Image(),
  imgArrowDown = new Image(),
  imgArrowRight = new Image(),
  imgBoxes = new Image();

  //Calling Traps Images
  imgTrapUp.src = 'images/spikesUp.png'
  imgTrapLeft.src = 'images/spikesLeft.png'
  imgTrapDown.src = 'images/spikesDown.png'
  imgTrapRight.src = 'images/spikesRight.png'
  imgArrowUp.src = 'images/arrow1s.png'
  imgArrowLeft.src = 'images/arrow2s.png'
  imgArrowDown.src = 'images/arrow3s.png'
  imgArrowRight.src = 'images/arrow4s.png'
  imgBoxes.src = "images/pierre.jpg";

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

    //Doors
    context.drawImage(imgDoor,doorLevel1.x, doorLevel1.y, doorLevel1.width, doorLevel1.height)
    context.drawImage(imgDoorClosed,doorClosed.x, doorClosed.y, doorClosed.width, doorClosed.height)
    
    // Trap
    context.drawImage(imgTrapUp,trap.x, trap.y, trap.width, trap.height)


    if(isFinished==1){

        saw.animation_saw.update();
      context.drawImage(sprite_sheet_saw.image, saw.animation_saw.frame * saw.radius, 0, saw.width, saw.height, Math.floor(saw.x), Math.floor(saw.y), saw.size, saw.size)
      check_sawed(player, saw)
  
      }
      if(isFinished>=1){
        context.drawImage(imgArrowUp, arrow.x, arrow.y, arrow.width, arrow.height)
        check_shot(player, arrow)
      }

  
      if(isFinished>=2){
         
      saw2.animation_saw.update();
      context.drawImage(sprite_sheet_saw.image, saw2.animation_saw.frame * saw2.radius, 0, saw2.width, saw2.height, Math.floor(saw2.x), Math.floor(saw2.y), saw2.size, saw2.size)
      check_sawed(player, saw2)
  
      saw3.animation_saw.update();
        context.drawImage(sprite_sheet_saw.image, saw3.animation_saw.frame * saw3.radius, 0, saw3.width, saw3.height, Math.floor(saw3.x), Math.floor(saw3.y), saw3.size, saw3.size)
        check_sawed(player, saw3)
        
      }
  
      
      if(isFinished>=3){
         
  
        saw4.animation_saw.update();
        context.drawImage(sprite_sheet_saw.image, saw4.animation_saw.frame * saw4.radius, 0, saw4.width, saw4.height, Math.floor(saw4.x), Math.floor(saw4.y), saw4.size, saw4.size)
        check_sawed(player, saw4)
          
        }
  
      if(isFinished>=4){

        context.drawImage(imgArrowRight, arrow2.x, arrow2.y, arrow2.width, arrow2.height)
      check_shot(player, arrow2)

      context.drawImage(imgArrowRight, arrow3.x, arrow3.y, arrow3.width, arrow3.height)
      check_shot(player, arrow3)
         
      //Saw
      saw5.animation_saw.update();
      context.drawImage(sprite_sheet_saw.image, saw5.animation_saw.frame * saw5.radius, 0, saw5.width, saw5.height, Math.floor(saw5.x), Math.floor(saw5.y), saw5.size, saw5.size)
      check_sawed(player, saw5)
  
      saw6.animation_saw.update();
      context.drawImage(sprite_sheet_saw.image, saw6.animation_saw.frame * saw6.radius, 0, saw6.width, saw6.height, Math.floor(saw6.x), Math.floor(saw6.y), saw6.size, saw6.size)
      check_sawed(player, saw6)
  
      saw7.animation_saw.update();
      context.drawImage(sprite_sheet_saw.image, saw7.animation_saw.frame * saw7.radius, 0, saw7.width, saw7.height, Math.floor(saw7.x), Math.floor(saw7.y), saw7.size, saw7.size)
      check_sawed(player, saw7)
  
      saw8.animation_saw.update();
      context.drawImage(sprite_sheet_saw.image, saw8.animation_saw.frame * saw8.radius, 0, saw8.width, saw8.height, Math.floor(saw8.x), Math.floor(saw8.y), saw8.size, saw8.size)
      check_sawed(player, saw8)
        
      }
      if(isFinished>=5){


        context.drawImage(imgTrapUp,trap2.x, trap2.y, trap2.width, trap2.height)
        check_trap(player,trap2)
        
        context.drawImage(imgTrapUp,trap3.x, trap3.y, trap3.width, trap3.height)
        check_trap(player,trap3)

        context.drawImage(imgTrapUp,trap4.x, trap4.y, trap4.width, trap4.height)
        check_trap(player,trap4)

        context.drawImage(imgTrapUp,trap5.x, trap5.y, trap5.width, trap5.height)
        check_trap(player,trap5)

        saw9.animation_saw.update();
      context.drawImage(sprite_sheet_saw.image, saw9.animation_saw.frame * saw9.radius, 0, saw9.width, saw9.height, Math.floor(saw9.x), Math.floor(saw9.y), saw9.size, saw9.size)
      check_sawed(player, saw9)

      
      }
    
    

    player.grounded = false;
    for (let i = 0; i < boxes.length; i++) {
        context.fillStyle = context.createPattern(imgBoxes, "repeat");
        context.fillRect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);

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

    
    

    check_trap(player,trap)
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

let stage = document.querySelector(".level")

setInterval(
    ()=>{ // Check if Player's hitbox is hitting door's hitbox
        if(player.x <= doorLevel1.x + doorLevel1.width &&
            player.x >= doorLevel1.x &&
            player.y <= doorLevel1.y + doorLevel1.height &&
            player.y >= doorLevel1.y){
            //instructions while touching door = player respawns
                player.x = 50;
                player.y = 200;
                newObstacle()
                isFinished ++
                stage.innerHTML = "level " + isFinished            
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

  window.onload = () => {
    chronometerCall = setInterval(chronometer, 1000)
  }
})()

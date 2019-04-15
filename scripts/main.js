
var img = new Image();   // Crée un nouvel élément img
img.addEventListener('load', function() {
  context.drawImage(img, 0, 0)
//  exécute les instructions drawImage ici
}, false);

img.src = 'images/hero_left_0.gif'

let canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d'),
    width = 1000,
    height = 500,

    player = {
        x: 115,
        y: 185,
        width: 20,
        height: 30,
        speed: 4,
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
//Beginning Platform
boxes.push({
    x: 100,
    y: 250,
    width: 50,
    height: 10
});

canvas.width = width;
canvas.height = height;

function update() {
    // check keys
    if (keys[38] || keys[32] || keys[90]) {
        // up arrow or space or Z
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 2;
        }
    }
    if (keys[39] || keys[68]) {
        // right arrow or D
        if (player.velX < player.speed) {
            player.velX++;
        }
    }
    if (keys[37] || keys[81]) {
        // left arrow or Q
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }

    player.velX *= friction;
    player.velY += gravity;

    //Blocks
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "black";
    ctx.beginPath();

    //Player interactions
    player.grounded = false;
    for (let i = 0; i < boxes.length; i++) {
        ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);

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
    ctx.fill()
    ctx.drawImage(img,player.x, player.y, player.width, player.height)

    requestAnimationFrame(update);
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

/*
let player ={
    width :
    height :
    Xposition :
    Yposition :
    //methode
}

class walls {
    constructor(width, height, X, Y) {
      this.width = width;
      this.height = height;
      this.X = X;
      this.Y = Y;
    }
    //methode
  }
*/

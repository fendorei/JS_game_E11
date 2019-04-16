let imgPlayer = new Image();
imgPlayer.addEventListener('load', function() {
//  executes drawImage instructions here
}, false);
imgPlayer.src = 'images/hero_left_0.gif'

let imgDoor = new Image();
imgDoor.addEventListener('load', function() {
//  executes drawImage instructions here
}, false);
imgDoor.src = 'images/openedDoor_lv1.png'

let canvas = document.querySelector('canvas'),
    context = canvas.getContext('2d'),
    width = 1280,
    height = 600,

     player = {
        animation:new Animation(),
        x: 115,
        y: 185,
        width: 30,
        height: 47,
        speed: 5,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false
    },

    keys = [],
    friction = 0.8,
    gravity = 0.45;

    class Door {
        constructor(x, y, width, height) {
            this.x = x
            this.y = y
            this.width = width
            this.height = height
        }
        nextLevel() {
            
        }
    }

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
    context.beginPath();
    context.clearRect(0, 0, width, height);

    //Door
    context.beginPath();
    context.fillRect(doorLevel1.x, doorLevel1.y, doorLevel1.width, doorLevel1.height)
    context.drawImage(imgDoor,doorLevel1.x, doorLevel1.y, doorLevel1.width, doorLevel1.height)

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
    context.drawImage(imgPlayer, player.x, player.y, player.width, player.height)

    player.animation.update();
    requestAnimationFrame(update);

    context.drawImage(sprite_sheet.image, player.animation.frame * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE, Math.floor(player.x), Math.floor(player.y), SPRITE_SIZE, SPRITE_SIZE);

    
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
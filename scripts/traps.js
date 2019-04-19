class Spikes{
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
}

class Trap{
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
	      this.width = width
        this.height = height
    }
}

class Laser{
    constructor(start_x, start_y, end_x, end_y) {
        this.start_x = start_x
 	      this.start_y = start_y
        this.end_x = end_x
        this.end_y = end_y
    }
}

class Teleporter{
    constructor(x, y, width) {
	     this.x = x
       this.y = y
	     this.width = width
    }
}

class MovingSaw{
    constructor(animation_saw, width, height, start_x, start_y, end_x, end_y, radius, size) {
        this.animation_saw = animation_saw
        this.width = width
        this.height = height
        this.start_x = start_x
	this.start_y = start_y
        this.end_x = end_x
        this.end_y = end_y
	this.x = start_x
        this.y = start_y
	this.radius = radius
        this.dir_x = "right"
        this.dir_y = "down"
        this.size = size
    }
}

class Glue{
    constructor(x, y, width, height) {
        this.x = x
	      this.y = y
        this.width = width
        this.height = height
    }
}

class Arrow{
    constructor(start_x, start_y, end, dir) {
        this.start_x = start_x
	this.start_y = start_y
        this.end = end
	this.x = start_x
        this.y = start_y
        this.dir = dir
        if (dir == "horizontal") {
            this.width = 25
            this.height = 12.5
        } else if (dir == "vertical") {
            this.width = 12.5
            this.height = 25
        }
    }
}

let i = 0
let j = 0
let death = 0
let div = document.querySelector(".deaths")

function check_impaled(player, Spikes) {
    if (((player.x >= Spikes.x) && (player.x <= (Spikes.x + Spikes.width))) && ((player.y >= Spikes.y) && (player.y <= (Spikes.y + Spikes.height)))) {
        player.x = 50;
        player.y = 200;
	death = death + 1
	div.innerHTML = "Deaths: " + death
    }
}

function check_trap(player, Trap) {
    if (((player.x >= Trap.x) && (player.x <= (Trap.x + Trap.width))) && (((player.y + player.height) >= Trap.y) && ((player.y + player.height) <= (Trap.y + Trap.height))))
	player.y = player.y + player.height
    }

function check_fried(player, Laser) {
    if ((player.x >= Laser.start_x && player.x <= Laser.end_x) && (player.y >= Laser.start_y && player.y <= Laser.end_y)) {
        player.x = 50;
        player.y = 200;
	death = death + 1
	div.innerHTML = "Deaths: " + death
    }
}

function check_teleported(player, Teleporter) {
    if ((player.x >= Teleporter.x && player.x <= Teleporter.x + Teleporter.width) && player.y + player.height == Teleporter.y) {
        player.x = Math.floor(Math.random() * Math.floor(1000))
        player.y = Math.floor(Math.random() * Math.floor(500))
    }
}

function check_sawed(player, MovingSaw) {
    if (((player.x >= MovingSaw.x+(MovingSaw.size-(MovingSaw.size*0.85)) && player.x <= MovingSaw.x + (MovingSaw.size*0.85)) || (player.x + player.width >= MovingSaw.x+(MovingSaw.size-(MovingSaw.size*0.85)) && player.x + player.width <= MovingSaw.x + (MovingSaw.size*0.85))) && ((player.y >= MovingSaw.y+(MovingSaw.size-(MovingSaw.size*0.85)) && player.y <= MovingSaw.y + (MovingSaw.size*0.85)) || (player.y + player.height >= MovingSaw.y+(MovingSaw.size-(MovingSaw.size*0.85)) && player.y + player.height <= MovingSaw.y + (MovingSaw.size*0.85)))) {
        player.x = 50;
        player.y = 200;
	MovingSaw.x = MovingSaw.start_x
	MovingSaw.y = MovingSaw.start_y
	death = death + 1
	div.innerHTML = "Deaths: " + death
    }
    if (MovingSaw.dir_x == "right") {
        if (MovingSaw.x == MovingSaw.end_x)
            MovingSaw.dir_x = "left"
        else
            MovingSaw.x = MovingSaw.x + 1
    } else if (MovingSaw.dir_x == "left") {
        if (MovingSaw.x == MovingSaw.start_x)
            MovingSaw.dir_x = "right"
        else
            MovingSaw.x = MovingSaw.x - 1
    }
    if (MovingSaw.dir_y == "down") {
        if (MovingSaw.y == MovingSaw.end_y)
            MovingSaw.dir_y = "up"
        else
            MovingSaw.y = MovingSaw.y + 1
    } else if (MovingSaw.dir_y == "up") {
        if (MovingSaw.y == MovingSaw.start_y)
            MovingSaw.dir_y = "down"
        else
            MovingSaw.y = MovingSaw.y - 1
    }
}

function check_glue(player, Glue) {
    while (((player.x >= Trap.x) && (player.x <= (Trap.x + Trap.width))) && (((player.y + player.height) >= Trap.y) && ((player.y + player.height) <= (Trap.y + Trap.height))))
        player.y = player.y + 1
    console.log(player.x , player.y + player.height)
}

function check_shot(player, Arrow) {
    if ((((player.x >= Arrow.x && player.x <= Arrow.x + Arrow.width) || (player.x + player.width >= Arrow.x && player.x + player.width <= Arrow.x + Arrow.width)) &&
	 ((player.y >= Arrow.y && player.y <= Arrow.y + Arrow.height) || (player.y + player.height >= Arrow.y && player.y + player.height <= Arrow.y + Arrow.height))) ||
	(((Arrow.x >= player.x && Arrow.x <= player.x + player.width) || (Arrow.x + Arrow.width >= player.x && Arrow.x + Arrow.width <= player.x + player.width)) &&
	 ((Arrow.y >= player.y && Arrow.y <= player.y + player.height) || (Arrow.y + Arrow.height >= player.y && Arrow.y + Arrow.height <= player.y + player.height)))) {
        player.x = 50;
        player.y = 200;
	Arrow.x = Arrow.start_x
	Arrow.y = Arrow.start_y
	death = death + 1
	div.innerHTML = "Deaths: " + death
    }
    if (Arrow.dir == "horizontal") {
        if (Arrow.x == Arrow.end)
            Arrow.x = Arrow.start_x
        else if (Arrow.x < Arrow.end)
            Arrow.x = Arrow.x + 1
        else
            Arrow.x = Arrow.x - 1
    } else if (Arrow.dir == "vertical") {
        if (Arrow.y == Arrow.end)
            Arrow.y = Arrow.start_y
        if (Arrow.y < Arrow.end)
            Arrow.y = Arrow.y + 1
        else
            Arrow.y = Arrow.y - 1
    }
}
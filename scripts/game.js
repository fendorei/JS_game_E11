class Spikes{
    constructor(x, y) {
	this.x = x
	this.y = y
    }
}

class Trapdoor{
    constructor(x, y) {
	this.x = x
	this.y = y
    }
}

class Laser{
    constructor(star_x, start_y, end_x, end_y) {
	this.start_x = start_x
	this.start_y = start_y
	this.end_x = end_x
	this.end_y = end_y
    }
}

class Teleporter{
    constructor(x, y) {
	this.x = x
	this.y = y
    }
}

class Slowdown{
    constructor(x, y) {
	this.x = x
	this.y = y
    }
}

class MovingSaw{
    constructor(star_x, start_y, end_x, end_y) {
	this.start_x = start_x
	this.start_y = start_y
	this.end_x = end_x
	this.end_y = end_y
	this.x = start_x
	this.y = start_y
	this.dir_x = right
	this.dir_y = down
    }
}

function check_impaled(player.x, player.y, Spikes.x, Spikes.y) {
    if (player.x == Spikes.x && player.y == Spikes.y)
	console.log("You died")
}

function check_trap(player.x, player.y, Trapdoor.x, Trapdoor.y) {
    if (player.x == Trapdoor.x && player.y == Trapdoor.y)
	player.y = player.y - 1
}

function check_fried(player.x, player.y, Laser.start_x, Laser.start_y, Laser.end_x Laser.end_y) {
    if ((player.x >= Laser.start_x && player.x <= Laser.end_x) && (player.y >= Laser.start_y && player.y <= Laser.end_y))
	console.log("You died")
}

function check_teleported(player.x, player.y, Teleporter.x, Teleporter.y) {
    if (player.x == Teleporter.x && player.y == Teleporter.y) {
	player.x = Math.floor(Math.random() * Math.floor(1000))
	player.y = Math.floor(Math.random() * Math.floor(500))
    }
}

function check_slowdown(player.x, player.y, Slowdown.x, Slowdown.y) {
    if (player.x == Slowdown.x && player.y == Slowdown.y)
	player.speed = player.speed * 0.5
}

function check_sawed(player.x, player.y, MovingSaw.start_x, MovingSaw.start_y, MovingSaw.end_x MovingSaw.end_y, MovingSaw.x, MovingSaw.y, MovingSaw.dir_x, MovingSaw.dir_y) {
    if (player.x == MovingSaw.x && player.y == MovingSaw.y)
	console.log("You died")
    if (MovingSaw.dir_x == right) {
	if (MovingSaw.x == MovingSaw.end_x)
	    MovingSaw.dir = left
	else
	    MovingSaw.x = MovinSaw.x++
    } else if (MovingSaw.x == left) {
	if (MovingSaw.x == MovingSaw.start_x)
	    MovingSaw.dir = right
	else
	    MovingSaw.x = MovinSaw.x--
    }
    if (MovingSaw.dir_y == down) {
	if (MovingSaw.y == MovingSaw.end_y)
	    MovingSaw.dir = up
	else
	    MovingSaw.y = MovinSaw.y++
    } else if (MovingSaw.y == up) {
	if (MovingSaw.y == MovingSaw.start_y)
	    MovingSaw.dir = down
	else
	    MovingSaw.y = MovinSaw.y--
    }
}

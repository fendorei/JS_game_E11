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
    y: 575,
    width: 80,
    height: 25  
});
//Right-bottom Tall Platform 
boxes.push({
    x: 800,
    y: 450,
    width: 40,
    height: 150
});
//Right-bottom Medium Platform
boxes.push({
    x: 760,
    y: 500,
    width: 40,
    height: 100
});
//Right-bottom Small Platform
boxes.push({
    x: 720,
    y: 550,
    width: 40,
    height: 50
});
//Door Platform
boxes.push({
    x: 1175,
    y: 510,
    width: 100,
    height: 10
});

const doorLevel1 = new Door(1200, 450, 40, 60)

canvas.width = width;
canvas.height = height;
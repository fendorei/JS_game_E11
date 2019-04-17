//Borders and Platforms
let boxes = [
    //Game Left Border
    {
        x: 0,
        y: 0,
        width: 20,
        height: 600
    },
    //Game Right Border
    {
        x: 1260,
        y: 0,
        width: 20,
        height: 600
    },
    //Game Floor
    {
        x: 0,
        y: 590,
        width: 1280,
        height: 50
    },
    //Game Roof
    {
        x: 0,
        y: 0,
        width: 1280,
        height: 10
    },
    //Beginning Platform Floor
    {
        x: 100,
        y: 250,
        width: 50,
        height: 10
    },
    //Beginning Platform Right Wall
    {
        x: 148,
        y: 225,
        width: 10,
        height: 35
    },
    //Middle-bottom Platform
    {
        x: 475,
        y: 575,
        width: 80,
        height: 25  
    },
    //Right-bottom Tall Platform 
    {
        x: 800,
        y: 450,
        width: 40,
        height: 150
    },
    //Right-bottom Medium Platform
    {
        x: 760,
        y: 500,
        width: 40,
        height: 100
    },
    //Right-bottom Small Platform
    {
        x: 720,
        y: 550,
        width: 40,
        height: 50
    },
    //Door Platform
    {
        x: 1175,
        y: 510,
        width: 100,
        height: 10
    }
];

let boxesToAdd = [
    [{
        x: 600,
        y: 300,
        width: 100,
        height: 10
    },
    {
        x: 800,
        y: 300,
        width: 100,
        height: 10
    }],
    [{
        x: 200,
        y: 300,
        width: 100,
        height: 10
    },
    {
        x: 300,
        y: 300,
        width: 100,
        height: 10
    }]
];

const doorLevel1 = new Door(1200, 450, 40, 60)

canvas.width = 1280;
canvas.height = 600;
//Borders and Platforms
let boxes = [
    //Level 0
    //Game Left Border
    {
        x: 0,
        y: 0,
        width: 25,
        height: 600
    },
    //Game Right Border
    {
        x: 1255,
        y: 0,
        width: 25,
        height: 600
    },
    //Game Floor
    {
        x: 0,
        y: 575,
        width: 1280,
        height: 25
    },
    //Game Roof
    {
        x: 0,
        y: 0,
        width: 1280,
        height: 25
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
    //Level 1
    //Beginning Platform Floor
    [{
        x: 0,
        y: 250,
        width: 120,
        height: 12.5
    },
    {
        x: 100,
        y: 162.5,
        width: 25,
        height: 100
    },
    {
        x: 120,
        y: 162.5,
        width: 200,
        height: 25
    },
    {
        x: 450,
        y: 400,
        width: 50,
        height: 25
    }],
    //Level 2
    [{
        x: 20,
        y: 250,
        width: 80,
        height: 12.5
    },
    {
        x: 100,
        y: 162.5,
        width: 25,
        height: 100
    },
    {
        x: 450,
        y: 25,
        width: 25,
        height: 275
    },
    {
        x: 325,
        y: 275,
        width: 125,
        height: 25
    },
    {
        x: 300,
        y: 275,
        width: 25,
        height: 225
    },
    {
        x: 225,
        y: 350,
        width: 75,
        height: 25
    },
    {
        x: 25,
        y: 475,
        width: 75,
        height: 25
    },
    {
        x: 325,
        y: 475,
        width: 75,
        height: 25
    },
    {
        x: 500,
        y: 400,
        width: 75,
        height: 25
    },
    {
        x: 550,
        y: 400,
        width: 25,
        height: 125
    }],
    //Level 3
    [{
        x: 500,
        y: 400,
        width: 200,
        height: 25
    },
    {
        x: 550,
        y: 400,
        width: 25,
        height: 150
    },
    {
        x: 675,
        y: 150,
        width: 25,
        height: 250
    },
    {
        x: 600,
        y: 300,
        width: 75,
        height: 25
    },
    {
        x: 475,
        y: 200,
        width: 75,
        height: 25
    }],
    // Niveau 4
    //platform_wall_3_2
    [{
        x: 675,
        y: 150,
        width: 25,
        height: 250
        },
        //platform5_2
        {
            x: 700,
            y: 150,
            width: 400,
            height: 25
        },
        //platform_wall_5_2(V)
        {
            x: 662.5,
            y: 25,
            width: 25,
            height: 37.5
        },
        //platform_wall_5_2(V)
        {
            x: 875,
            y: 25,
            width: 25,
            height: 50
        },
        //platform_wall_5_2(V)
        {
            x: 775,
            y: 100,
            width: 25,
            height: 50
        },
        //platform_wall_5_2(V)
        {
            x: 975,
            y: 100,
            width: 25,
            height: 50
        },
        //platform_wall_5_2(H)
        {
            x: 855,
            y: 300,
            width: 400,
            height: 25
        },
        //platform_wall_5_2(V)
        {
            x: 855,
            y: 300,
            width: 25,
            height: 110
        }],
        // Niveau 5
        //platform_wall_5_2(V)
    [{
        x: 875,
        y: 25,
        width: 25,
        height: 50
    },
    //platform_wall_5_2(V)
    {
        x: 775,
        y: 100,
        width: 25,
        height: 50
    },
    //platform_wall_5_2(V)
    {
        x: 975,
        y: 100,
        width: 25,
        height: 50
    },
    //platform_wall_5_2(H)
    {
        x: 800,
        y: 300,
        width: 455,
        height: 100
    },
    //platform_wall_5_2(V)
    {
        x: 800,
        y: 300,
        width: 25,
        height: 175
    },
    //platform
    {
        x: 700,
        y: 350,
        width: 25,
        height: 25
    },
    //platform
    {
        x: 775,
        y: 450,
        width: 25,
        height: 25
    },
    //platform
    {
        x: 800,
        y: 535,
        width: 25,
        height: 50
    },
    //platform_10_1*1
    {
        x: 825,
        y: 535,
        width: 25,
        height: 25
    },
    {
        x: 875,
        y: 535,
        width: 25,
        height: 25
    },
    {
        x: 925,
        y: 535,
        width: 25,
        height: 25
    },
    {
        x: 975,
        y: 535,
        width: 25,
        height: 25
    },
    {
        x: 1025,
        y: 535,
        width: 25,
        height: 25
    },
    {
        x: 1075,
        y: 535,
        width: 25,
        height: 25
    },
    {
        x: 1125,
        y: 535,
        width: 25,
        height: 25
    },
    //platform_10_2*1
    {
        x: 850,
        y: 400,
        width: 25,
        height: 25
    },
    {
        x: 900,
        y: 400,
        width: 25,
        height: 25
    },
    {
        x: 950,
        y: 400,
        width: 25,
        height: 25
    },
    {
        x: 1000,
        y: 400,
        width: 25,
        height: 25
    },
    {
        x: 1050,
        y: 400,
        width: 25,
        height: 25
    },
    {
        x: 1100,
        y: 400,
        width: 25,
        height: 25
    },
    {
        x: 1175,
        y: 400,
        width: 80,
        height: 25
    },
    
    //Door Platform
    {
        x: 1175,
        y: 510,
        width: 100,
        height: 100
    }]
];

const doorLevel1 = new Door(1200, 450, 40, 60)

canvas.width = 1280;
canvas.height = 600;

let spikes = [];

let spikesToAdd = [
    //Level 0
    [
        
    ],
    //Level 1
    [

    ],
    //Level 2
    [

    ],
    //Level 3
    [

    ],
    //Level 4
    [

    ],
    //Level 5
    [

    ]
];

var target = Physics.body('circle', {
    x: 800,
    y: 600,
    treatment: 'kinematic',
    radius: 15
});

var targetAttraction = Physics.behavior('attractor', {
    pos: target.state.pos
});

var blackHoleAttraction = Physics.behavior('attractor', {
    strength: 10,
    pos: {x: 500,y: 500}
});

//target.view = new Image();
//target.view.src = ('css/images/mars.jpg');

var capsule = Physics.body('circle', {
    x: 260,
    y: 240,
    radius: 10,
    mass: 2
});

capsule.view = new Image();
capsule.view.src = ('css/images/spaceship.png');

world.add(capsule);

// earth
addPlanet(50, 50, 20, "earth.jpg");

// venus
addPlanet(50, 100, 20, "venus.jpg");


level = 32;

world.add(target);
world.addBehavior(targetAttraction);
world.addBehavior(blackHoleAttraction);
world.render();


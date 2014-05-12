var target = Physics.body('circle', {
    x: 850,
    y: 650,
    treatment: 'kinematic',
    radius: 15
});

var targetAttraction = Physics.behavior('attractor', {
     pos: target.state.pos,
});

target.view = new Image();
target.view.src = ('css/images/mars.jpg');

var capsule = Physics.body('circle', {
    x: 260,
    y: 240,
    radius: 10,
    mass: 2
});

capsule.view = new Image();
capsule.view.src = ('css/images/spaceship.png');

world.add(target);
world.addBehavior(targetAttraction);
world.add(capsule);

// earth
addPlanet(200, 200, 20, "earth.jpg");

// venus
addPlanet(500, 400, 20, "venus.jpg");




world.render();


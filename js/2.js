var target = Physics.body('circle', {
    x: 750,
    y: 750,
    treatment: 'kinematic',
    radius: 15
});

var targetAttraction = Physics.behavior('attractor', {
     pos: target.state.pos,
});

target.view = new Image();
target.view.src = ('/images/mars.jpg');

var capsule = Physics.body('circle', {
    x: 250,
    y: 250,
    radius: 10,
    mass: 2
});

capsule.view = new Image();
capsule.view.src = ('/images/spaceship.png');

// mercury
addPlanet(200, 200, 20, "mercury.jpg");

// venus
addPlanet(400, 400, 15, "venus.jpg");

// earth
addPlanet(600, 600, 15, "earth.jpg");

world.add(target);
world.addBehavior(targetAttraction);
world.add(capsule);

world.render();


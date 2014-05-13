var target = Physics.body('circle', {
    x: 800,
    y: 600,
    treatment: 'kinematic',
    radius: 15
});

var targetAttraction = Physics.behavior('attractor', {
     pos: target.state.pos,
});

target.view = new Image();
target.view.src = ('css/images/mars.jpg');

var capsule = Physics.body('circle', {
    x: 200,
    y: 200,
    radius: 10,
    mass: 2
});

capsule.view = new Image();
capsule.view.src = ('css/images/spaceship.png');

// mercury
addPlanet(150, 150, 20, "mercury.jpg");

// venus
addPlanet(400, 350, 15, "venus.jpg");

// earth
addPlanet(600, 500, 15, "earth.jpg");

world.add(target);
world.addBehavior(targetAttraction);
world.add(capsule);

world.render();

go = true;

level = 2;

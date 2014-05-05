var target = Physics.body('circle', {
    x: 550,
    y: 550,
    treatment: 'kinematic',
    radius: 15
});

var targetAttraction = Physics.behavior('attractor', {
     pos: target.state.pos,
});

var capsule = Physics.body('circle', {
    x: 250,
    y: 250,
    radius: 10,
    mass: 2
});

// earth
addPlanet(200, 200, 20);

// venus
addPlanet(400, 400, 15);

world.add(target);
world.addBehavior(targetAttraction);
world.add(capsule);

world.render();


var capsule = Physics.body('circle', {
    x: 250,
    y: 250,
    radius: 10,
    mass: 2
});

capsule.view = new Image();
capsule.view.src = ('/images/spaceship.png');
world.add(capsule);

// mercury
addPlanet(200, 200, 20, "mercury.jpg");

// venus
addPlanet(400, 400, 15, "venus.jpg");

// earth
addPlanet(600, 600, 15, "earth.jpg");

//mars (target)
addPlanet(750, 750, 15, "mars.jpg");

world.render();


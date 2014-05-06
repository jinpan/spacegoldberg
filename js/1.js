var capsule = Physics.body('circle', {
    x: 250,
    y: 250,
    radius: 10,
    mass: 2
});

capsule.view = new Image();
capsule.view.src = ('/images/spaceship.png');
world.add(capsule);

// earth
addPlanet(200, 200, 20, "earth.jpg");

// venus
addPlanet(400, 400, 20, "venus.jpg");

// mars (target)
addPlanet(550, 550, 15, "mars.jpg");

world.render();


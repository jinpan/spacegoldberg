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

// mars
addPlanet(50, 150, 15, "mars.jpg");




world.render();

level = 3;


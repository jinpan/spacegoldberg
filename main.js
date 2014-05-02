//
// PhysicsJS
// A modular, extendable, and easy-to-use physics engine for javascript
//
// Use the select box in the top right to see more examples!
//
Physics(function (world) {
    var renderer = Physics.renderer('canvas', {
        el: 'viewport',
        width: 1000,
        height: 1000
    });
    world.add(renderer);

    var target = Physics.body('circle', {
        x: 550,
        y: 550,
        treatment: 'static',
        radius: 45
    });

    var targetAttraction = Physics.behavior('attractor', {
         pos: target.state.pos,
    });

    var collisionDetector = Physics.behavior('body-collision-detection', {
        check: true
    });

    var capsule = Physics.body('circle', {
        x: 250,
        y: 250,
        radius: 20,
        mass: 2
    });

    capsule.applyForce({
        x: 0.005,
        y: 0.002
    });

    world.add(target);
    world.addBehavior(targetAttraction);
    world.addBehavior(collisionDetector);
    world.add(capsule);


    world.on('step', function() {
        world.render();
    });
    Physics.util.ticker.on(function(time) {
        world.step(time);
    });

    world.on('collisions:detected', function() {
        // alert("collision");
    });

    world.render();
});
// Physics.util.ticker.start();

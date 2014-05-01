//
// PhysicsJS
// A modular, extendable, and easy-to-use physics engine for javascript
//
// Use the select box in the top right to see more examples!
//
Physics(function (world) {
    var renderer = Physics.renderer('canvas', {
        el: 'viewport',
        width: 500,
        height: 500
    });
    world.add(renderer);

    var square = Physics.body('rectangle', {
        x: 250,
        y: 250,
        width: 50,
        height: 50
    });
    world.add(square);
    world.render();
});

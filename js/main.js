var world = Physics();

var renderer = Physics.renderer('canvas', {
    el: 'viewport',
    width: 1000,
    height: 700
});
world.add(renderer);

var collisionDetector = Physics.behavior('body-collision-detection', {
    check: true
});
world.addBehavior(collisionDetector);

world.on('step', function() {
    world.render();
});
Physics.util.ticker.on(function(time) {
    world.step(time);
});

world.on('collisions:detected', function(e) {

    // check that the target is close to the target
    var capsule_x = capsule.state.pos.x;
    var capsule_y = capsule.state.pos.y;
    var target_x = target.state.pos.x;
    var target_y = target.state.pos.y;

    var dist = Math.sqrt((capsule_x - target_x) * (capsule_x - target_x) + (capsule_y - target_y) * (capsule_y - target_y));
    if (dist > target.radius + capsule.radius + 0.01) {
        // too far; colliding with another object
        gameOver();
    } else {
        // check the velocity
        var capsule_vx = capsule.state.vel.x;
        var capsule_vy = capsule.state.vel.y;

        var vel_magnitude = Math.sqrt(capsule_vx*capsule_vx + capsule_vy*capsule_vy)
        console.log(capsule_vx, capsule_vy, vel_magnitude);
        if (vel_magnitude > 5) {
            gameOver();
        } else {
            nextLevel();
        }
    }
});


$("#viewport").mousemove(function(e) {
    var c = document.getElementById("viewport");
    var ctx = c.getContext("2d");
    ctx.clearRect(0,0,c.width,c.height);
    world.render();
    ctx.beginPath();
    ctx.moveTo(capsule.state.pos.x,capsule.state.pos.y);
    ctx.lineTo(e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
    ctx.strokeStyle = '#00ff00';
    ctx.stroke();

});

var first = true;

$("#viewport").click(function(e) {
    var raw_init_x = e.pageX - this.offsetLeft - capsule.state.pos.x;
    var raw_init_y = e.pageY - this.offsetTop - capsule.state.pos.y;
    if (first) {
        capsule.applyForce({
                x: 0.0001*raw_init_x,
                y: 0.0001*raw_init_y
        });
        Physics.util.ticker.start();
    }
    first = false;
});

function addPlanet(x, y, radius, imgName) {
    var planet = Physics.body('circle', {
        x: x,
        y: y,
        treatment: 'kinematic',
        radius: radius
    });
    var planetAttraction = Physics.behavior('attractor', {
        pos: planet.state.pos
    });
    if (imgName !== 'undefined') {
        planet.view = new Image();
        planet.view.src = ('css/images/' + imgName);
    }
    world.add(planet);
    world.add(planetAttraction);
}

function gameOver() {
    $("#gameover").dimmer("show");
    setTimeout(function(){
        if (location.href.indexOf("#retry") == -1){
            location = location.href + "#retry";
        }
        location.reload()
    }, 500);
}

function nextLevel() {
    $("#nextlevel").dimmer("show");
    setTimeout(function(){location = "2.html"}, 500);
}

$("#intro").click(function() {
    $("#intro").dimmer('hide');
});

$(document).ready(function() {
    if (location.hash == "") {
        $("#intro").dimmer('show');
    }
});

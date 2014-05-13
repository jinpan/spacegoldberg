var world = Physics();

var renderer = Physics.renderer('canvas', {
    el: 'viewport',
    width: $(window).width(),
    height: $(window).height()
});
world.add(renderer);

var level = 0;

var interActive = Physics.behavior('interactive', { el: renderer.el, moveThrottle: 10, minVel: {x:0,y:0}, maxVel: {x:0,y:0} });
world.addBehavior(interActive);

var collisionDetector = Physics.behavior('body-collision-detection', {
    check: true
});
world.addBehavior(collisionDetector);
var edgeCollisionDetector = Physics.behavior('edge-collision-detection', {
    aabb: Physics.aabb(
        0,
        0,
        renderer.options.width,
        renderer.options.height
    )
});
world.addBehavior(edgeCollisionDetector);

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

var planetAttraction = Physics.behavior('attractor');

var grabbed = false;

world.on('interact:grab', function( data ){
    data.x; // the x coord
    data.y; // the y coord
    data.body; // the body that was grabbed

    if (data.body.uid > 2) {
        grabbed = true;
        world.add(planetAttraction);
    }
});
world.on('interact:move', function( data ){
    data.x; // the x coord
    data.y; // the y coord
    //data.body; // the body that was grabbed (if applicable)
    if (grabbed){
        data.body.state.pos.x = data.x; 
        data.body.state.pos.y = data.y;
        data.body.treatment = "kinematic";
        planetAttraction.position(data.body.state.pos);
    }
});
// when the viewport is released (mouseup, touchend)
world.on('interact:release', function( data ){
    data.x; // the x coord
    data.y; // the y coord
    grabbed = false;

});



var go = false;

$("document").on("click", "#start-btn", function() {
    		go = true;
});

$("#viewport").mousemove(function(e) {
    world.render();
    if (go) {
        var c = document.getElementById("viewport");
        var ctx = c.getContext("2d");
        ctx.clearRect(0,0,c.width,c.height);
        world.render();
        ctx.beginPath();
        ctx.moveTo(capsule.state.pos.x,capsule.state.pos.y);
        ctx.lineTo(e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
        ctx.strokeStyle = '#00ff00';
        ctx.stroke();
    }

});

var first = true;

$("#viewport").click(function(e) {
    if (go) {
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
    }
});



function addPlanet(x, y, radius, imgName) {
    var planet = Physics.body('circle', {
        x: x,
        y: y,
        treatment: 'kinematic',
        radius: radius
    });
    
    if (imgName !== 'undefined') {
        planet.view = new Image();
        planet.view.src = ('css/images/' + imgName);
    }
    world.add(planet);

    var planetAttraction = Physics.behavior('attractor', {
        pos: planet.state.pos
    });
    world.add(planetAttraction);
    planetAttraction.position(planet.state.pos);
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
    if (level == 1) {
        setTimeout(function(){location = "2.html"}, 500);
    }
    else if (level == 2) {
        setTimeout(function(){location = "3.html"}, 500);
    }
        
}

$("#intro").click(function() {
    $("#intro").dimmer('hide');
});

$(document).ready(function() {
    if (location.hash == "") {
        $("#intro").dimmer('show');
    }
});


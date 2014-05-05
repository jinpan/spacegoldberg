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
        treatment: 'kinematic',
        radius: 15
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
        radius: 10,
        mass: 2
    });

    var earth = Physics.body('circle', {
        x: 200,
        y: 200,
        treatment: 'kinematric',
        radius: 20
    });
    var earthAttraction = Physics.behavior('attractor', {
        pos: earth.state.pos
    });

    var venus = Physics.body('circle', {
        x: 400,
        y: 400,
        treatment: 'kinematic',
        radius: 15
    });
    var venusAttraction = Physics.behavior('attractor', {
        pos: venus.state.pos
    });


    world.add(target);
    world.addBehavior(targetAttraction);
    world.add(earth);
    world.addBehavior(earthAttraction);
    world.add(venus);
    world.addBehavior(venusAttraction);
    world.addBehavior(collisionDetector);
    world.add(capsule);


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
		ctx.lineTo(e.clientX - this.offsetLeft,e.clientY - this.offsetTop);
		ctx.strokeStyle = '#00ff00';
		ctx.stroke();
		
	});
		

	$("#viewport").click(function(e) {
		var raw_init_x = e.clientX - this.offsetLeft - capsule.state.pos.x;
		var raw_init_y = e.clientY - this.offsetTop - capsule.state.pos.y;

		capsule.applyForce({
        		x: 0.0001*raw_init_x,
        		y: 0.0001*raw_init_y
    		});
		Physics.util.ticker.start();
    });



    world.render();
});


function gameOver() {
    $("#gameover").dimmer("show");
    setTimeout(function(){location.reload();}, 500);
}

function nextLevel() {
    $("#nextlevel").dimmer("show");
    setTimeout(function(){location = "2.html"}, 500);

}


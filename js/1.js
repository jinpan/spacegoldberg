//
// PhysicsJS
// A modular, extendable, and easy-to-use physics engine for javascript
//
// Use the select box in the top right to see more examples!
//



	var drawArrow=function(ctx,x1,y1,x2,y2,style,which,angle,d)
	{
  		'use strict';
 		// Ceason pointed to a problem when x1 or y1 were a string, and concatenation
  		// would happen instead of addition
 		if(typeof(x1)=='string') x1=parseInt(x1);
  		if(typeof(y1)=='string') y1=parseInt(y1);
  		if(typeof(x2)=='string') x2=parseInt(x2);
 		if(typeof(y2)=='string') y2=parseInt(y2);
 		style=typeof(style)!='undefined'? style:3;
  		which=typeof(which)!='undefined'? which:1; // end point gets arrow
		angle=typeof(angle)!='undefined'? angle:Math.PI/8;
  		// default to using drawHead to draw the head, but if the style
  		// argument is a function, use it instead
 		var toDrawHead=typeof(style)!='function'?drawHead:style;

  		// For ends with arrow we actually want to stop before we get to the arrow
  		// so that wide lines won't put a flat end on the arrow.
  		//
  		var dist=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
 		var ratio=(dist-d/3)/dist;
  		var tox, toy,fromx,fromy;
  		if(which&1){
    		tox=Math.round(x1+(x2-x1)*ratio);
    		toy=Math.round(y1+(y2-y1)*ratio);
  		}else{
    		tox=x2;
    		toy=y2;
  		}
  		if(which&2){
    		fromx=x1+(x2-x1)*(1-ratio);
    		fromy=y1+(y2-y1)*(1-ratio);
  		}else{
    		fromx=x1;
    		fromy=y1;
  		}

  		// Draw the shaft of the arrow
  		ctx.beginPath();
  		ctx.moveTo(fromx,fromy);
  		ctx.lineTo(tox,toy);
  		ctx.stroke();

  		// calculate the angle of the line
  		var lineangle=Math.atan2(y2-y1,x2-x1);
  		// h is the line length of a side of the arrow head
  		var h=Math.abs(d/Math.cos(angle));

  		if(which&1){	// handle far end arrow head
   	 		var angle1=lineangle+Math.PI+angle;
    		var topx=x2+Math.cos(angle1)*h;
    		var topy=y2+Math.sin(angle1)*h;
    		var angle2=lineangle+Math.PI-angle;
    		var botx=x2+Math.cos(angle2)*h;
    		var boty=y2+Math.sin(angle2)*h;
    		toDrawHead(ctx,topx,topy,x2,y2,botx,boty,style);
  		}
  		if(which&2){ // handle near end arrow head
    		var angle1=lineangle+angle;
    		var topx=x1+Math.cos(angle1)*h;
    		var topy=y1+Math.sin(angle1)*h;
    		var angle2=lineangle-angle;
    		var botx=x1+Math.cos(angle2)*h;
    		var boty=y1+Math.sin(angle2)*h;
    		toDrawHead(ctx,topx,topy,x1,y1,botx,boty,style);
  		}
	}

	var drawHead=function(ctx,x0,y0,x1,y1,x2,y2,style)
	{
  		'use strict';
  		if(typeof(x0)=='string') x0=parseInt(x0);
  		if(typeof(y0)=='string') y0=parseInt(y0);
  		if(typeof(x1)=='string') x1=parseInt(x1);
  		if(typeof(y1)=='string') y1=parseInt(y1);
  		if(typeof(x2)=='string') x2=parseInt(x2);
  		if(typeof(y2)=='string') y2=parseInt(y2);
  		var radius=3;
  		var twoPI=2*Math.PI;

  		// all cases do this.
  		ctx.save();
  		ctx.beginPath();
  		ctx.moveTo(x0,y0);
  		ctx.lineTo(x1,y1);
  		ctx.lineTo(x2,y2);
  		switch(style){
    		case 0:
      			// curved filled, add the bottom as an arcTo curve and fill
      			var backdist=Math.sqrt(((x2-x0)*(x2-x0))+((y2-y0)*(y2-y0)));
      			ctx.arcTo(x1,y1,x0,y0,.55*backdist);
      			ctx.fill();
      			break;
    		case 1:
      			// straight filled, add the bottom as a line and fill.
      			ctx.beginPath();
      			ctx.moveTo(x0,y0);
      			ctx.lineTo(x1,y1);
      			ctx.lineTo(x2,y2);
      			ctx.lineTo(x0,y0);
      			ctx.fill();
      			break;
    		case 2:
      			// unfilled head, just stroke.
      			ctx.stroke();
      			break;
    		case 3:
      			//filled head, add the bottom as a quadraticCurveTo curve and fill
      			var cpx=(x0+x1+x2)/3;
      			var cpy=(y0+y1+y2)/3;
      			ctx.quadraticCurveTo(cpx,cpy,x0,y0);
      			ctx.fill();
      			break;
    		case 4:
      			//filled head, add the bottom as a bezierCurveTo curve and fill
      			var cp1x, cp1y, cp2x, cp2y,backdist;
      			var shiftamt=5;
      			if(x2==x0){
					// Avoid a divide by zero if x2==x0
					backdist=y2-y0;
					cp1x=(x1+x0)/2;
					cp2x=(x1+x0)/2;
					cp1y=y1+backdist/shiftamt;
					cp2y=y1-backdist/shiftamt;
      			}else{
					backdist=Math.sqrt(((x2-x0)*(x2-x0))+((y2-y0)*(y2-y0)));
					var xback=(x0+x2)/2;
					var yback=(y0+y2)/2;
					var xmid=(xback+x1)/2;
					var ymid=(yback+y1)/2;

					var m=(y2-y0)/(x2-x0);
					var dx=(backdist/(2*Math.sqrt(m*m+1)))/shiftamt;
					var dy=m*dx;
					cp1x=xmid-dx;
					cp1y=ymid-dy;
					cp2x=xmid+dx;
					cp2y=ymid+dy;
      			}

      			ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x0,y0);
      			ctx.fill();
      			break;
  			}
  		ctx.restore();
	};

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
	

	$("#viewport").mouseover(function(e) {
		var ctx=viewport.getContext('2d');
		drawArrow(ctx,capsule.state.pos.x,capsule.state.pos.y,clientX,clientY);
//		alert(clientX);
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


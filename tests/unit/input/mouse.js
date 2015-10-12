(function(){
	'use strict';
	QUnit.module('thruster.input.Mouse');
	
	QUnit.test('detach()', function(assert){
		var canvasEl, mouse, mouseState, ev;
		
		canvasEl = document.getElementById('game-canvas');
		mouse = new thruster.input.Mouse(canvasEl);
		
		// Move mouse to (50, 50)
		ev = document.createEvent('Event');
		ev.initEvent('mousemove', false, false);
		ev.clientX = 50;
		ev.clientY = 50;
		canvasEl.dispatchEvent(ev);
		
		mouse.update();
		mouseState = mouse.getState();
		assert.propEqual(mouseState.getPosition(), new thruster.shapes.Point2d(50, 50), 'Mouse receives events before detachment.');
		
		// Detach the mouse from canvasEl.
		mouse.detach();
		
		// Move mouse to (20, 20)
		ev = document.createEvent('Event');
		ev.initEvent('mousemove', false, false);
		ev.clientX = 20;
		ev.clientY = 20;
		canvasEl.dispatchEvent(ev);
		
		// Mouse should not have received the event, since the event handlers have been removed.
		mouse.update();
		mouseState = mouse.getState();
		assert.propEqual(mouseState.getPosition(), new thruster.shapes.Point2d(50, 50), 'Mouse does not receive events after detachment.');
	});
})();
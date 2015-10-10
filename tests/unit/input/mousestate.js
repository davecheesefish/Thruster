(function(){
	'use strict';
	QUnit.module('thruster.input.MouseState');
	
	QUnit.test('buttonIsDown(), using event.button', function(assert){
		var canvasEl, mouse, mouseState, testButton1, testButton2, ev;
		
		canvasEl = document.getElementById('game-canvas');
		mouse = new thruster.input.Mouse(canvasEl);
		
		testButton1 = thruster.input.MouseButtons.PRIMARY;
		testButton2 = thruster.input.MouseButtons.SCROLL_WHEEL;
		
		mouseState = mouse.getState();
		assert.equal(mouseState.buttonIsDown(testButton1), false, 'Returns false before any button is pressed.');
		
		// Press testButton1.
		ev = document.createEvent('Event');
		ev.initEvent('mousedown', false, false);
		ev.button = 0; // Primary button
		canvasEl.dispatchEvent(ev);
		
		// Update internal state and get that state.
		mouse.update();
		mouseState = mouse.getState();
		
		assert.equal(mouseState.buttonIsDown(testButton1), true, 'Returns true after button is pressed.');
		assert.equal(mouseState.buttonIsDown(testButton2), false, 'Returns false when cheking for a different button.');
		
		// Press testButton2.
		ev = document.createEvent('Event');
		ev.initEvent('mousedown', false, false);
		ev.button = 1; // Scroll wheel button
		canvasEl.dispatchEvent(ev);
		
		mouse.update();
		mouseState = mouse.getState();
		
		assert.equal(mouseState.buttonIsDown(testButton1), true, 'Returns true for the first button while 2 buttons are pressed at the same time.');
		assert.equal(mouseState.buttonIsDown(testButton2), true, 'Returns true for the second button while 2 buttons are pressed at the same time.');
		
		// Release testButton2.
		ev = document.createEvent('Event');
		ev.initEvent('mouseup', false, false);
		ev.button = 1; // Scroll wheel button has been released
		canvasEl.dispatchEvent(ev);
		
		mouse.update();
		mouseState = mouse.getState();
		
		assert.equal(mouseState.buttonIsDown(testButton2), false, 'Returns false after a button has been released.');
		assert.equal(mouseState.buttonIsDown(testButton1), true, 'Returns true for a still-pressed button after another button has been released.');
		
		// Cleanup
		mouse.detach();
	});
	
	QUnit.test('buttonIsDown(), using event.buttons', function(assert){
		var canvasEl, mouse, mouseState, testButton1, testButton2, ev;
		
		canvasEl = document.getElementById('game-canvas');
		mouse = new thruster.input.Mouse(canvasEl);
		
		testButton1 = thruster.input.MouseButtons.PRIMARY;
		testButton2 = thruster.input.MouseButtons.SCROLL_WHEEL;
		
		mouseState = mouse.getState();
		assert.equal(mouseState.buttonIsDown(testButton1), false, 'Returns false before any button is pressed.');
		
		// Press testButton1.
		ev = document.createEvent('Event');
		ev.initEvent('mousedown', false, false);
		ev.buttons = testButton1;
		canvasEl.dispatchEvent(ev);
		
		// Update internal state and get that state.
		mouse.update();
		mouseState = mouse.getState();
		
		assert.equal(mouseState.buttonIsDown(testButton1), true, 'Returns true after button is pressed.');
		assert.equal(mouseState.buttonIsDown(testButton2), false, 'Returns false when cheking for a different button.');
		
		// Press testButton2.
		ev = document.createEvent('Event');
		ev.initEvent('mousedown', false, false);
		ev.buttons = testButton1 | testButton2; // Logical OR of testButton1 and testButton2 means both are pressed.
		canvasEl.dispatchEvent(ev);
		
		mouse.update();
		mouseState = mouse.getState();
		
		assert.equal(mouseState.buttonIsDown(testButton1), true, 'Returns true for the first button while 2 buttons are pressed at the same time.');
		assert.equal(mouseState.buttonIsDown(testButton2), true, 'Returns true for the second button while 2 buttons are pressed at the same time.');
		
		// Release testButton2.
		ev = document.createEvent('Event');
		ev.initEvent('mouseup', false, false);
		ev.buttons = testButton1; // Only testButton1 is pressed now.
		canvasEl.dispatchEvent(ev);
		
		mouse.update();
		mouseState = mouse.getState();
		
		assert.equal(mouseState.buttonIsDown(testButton2), false, 'Returns false after a button has been released.');
		assert.equal(mouseState.buttonIsDown(testButton1), true, 'Returns true for a still-pressed button after another button has been released.');
		
		// Cleanup
		mouse.detach();
	});
	
	QUnit.test('buttonWasPressed()', function(assert){
		var canvasEl, mouse, mouseState, testButton1, testButton2, ev;
		
		canvasEl = document.getElementById('game-canvas');
		mouse = new thruster.input.Mouse(canvasEl);
		
		testButton1 = thruster.input.MouseButtons.PRIMARY;
		testButton2 = thruster.input.MouseButtons.SCROLL_WHEEL;
		
		mouseState = mouse.getState();
		assert.equal(mouseState.buttonWasPressed(testButton1), false, 'Returns false before button is pressed.');
		
		// Press testButton1.
		ev = document.createEvent('Event');
		ev.initEvent('mousedown', false, false);
		ev.buttons = testButton1;
		canvasEl.dispatchEvent(ev);
		
		mouse.update();
		mouseState = mouse.getState();
		
		assert.equal(mouseState.buttonWasPressed(testButton1), true, 'Returns true for first update after button is pressed.');
		
		mouse.update();
		mouseState = mouse.getState();
		assert.equal(mouseState.buttonWasPressed(testButton1), false, 'Returns false for further updates after button is pressed.');
		
		// Press testButton2 as well as testButton1.
		ev = document.createEvent('Event');
		ev.initEvent('mousedown', false, false);
		ev.buttons = testButton1 | testButton2;
		canvasEl.dispatchEvent(ev);
		
		mouse.update();
		mouseState = mouse.getState();
		assert.equal(mouseState.buttonWasPressed(testButton1), false, 'Still returns false when another button is pressed.');
		assert.equal(mouseState.buttonWasPressed(testButton2), true, 'Returns true for a newly-pressed button while another button is already pressed.');
		
		// Cleanup
		mouse.detach();
	});
	
	QUnit.test('buttonWasReleased()', function(assert){
		var canvasEl, mouse, mouseState, testButton1, testButton2, ev;
		
		canvasEl = document.getElementById('game-canvas');
		mouse = new thruster.input.Mouse(canvasEl);
		
		testButton1 = thruster.input.MouseButtons.PRIMARY;
		testButton2 = thruster.input.MouseButtons.SCROLL_WHEEL;
		
		mouseState = mouse.getState();
		assert.equal(mouseState.buttonWasReleased(testButton1), false, 'Returns false before button is pressed.');
		
		// Press testButton1.
		ev = document.createEvent('Event');
		ev.initEvent('mousedown', false, false);
		ev.buttons = testButton1;
		canvasEl.dispatchEvent(ev);
		
		mouse.update();
		mouseState = mouse.getState();
		assert.equal(mouseState.buttonWasReleased(testButton1), false, 'Returns false while button is pressed.');
		
		// Press testButton2.
		ev = document.createEvent('Event');
		ev.initEvent('mousedown', false, false);
		ev.buttons = testButton1 | testButton2;
		canvasEl.dispatchEvent(ev);
		
		// Release testButton1.
		ev = document.createEvent('Event');
		ev.initEvent('mouseup', false, false);
		ev.buttons = testButton2;
		canvasEl.dispatchEvent(ev);
		
		mouse.update();
		mouseState = mouse.getState();
		assert.equal(mouseState.buttonWasReleased(testButton1), true, 'Returns true for first update after button is released.');
		
		mouse.update();
		mouseState = mouse.getState();
		assert.equal(mouseState.buttonWasReleased(testButton1), false, 'Returns false for further updates after button is released.');
		
		// Release testButton2.
		ev = document.createEvent('Event');
		ev.initEvent('mouseup', false, false);
		ev.buttons = 0;
		canvasEl.dispatchEvent(ev);
		
		mouse.update();
		mouseState = mouse.getState();
		assert.equal(mouseState.buttonWasReleased(testButton1), false, 'Still returns false when another button is released.');
		assert.equal(mouseState.buttonWasReleased(testButton2), true, 'Returns true for a newly-released button when no buttons are pressed.');
		
		// Cleanup
		mouse.detach();
	});
	
	QUnit.test('getDisplacement()', function(assert){
		var canvasEl, mouse, mouseState, ev;
		
		canvasEl = document.getElementById('game-canvas');
		mouse = new thruster.input.Mouse(canvasEl);
		
		// Move cursor to a position to start.
		ev = document.createEvent('Event');
		ev.initEvent('mousemove', false, false);
		ev.clientX = 50;
		ev.clientY = 50;
		canvasEl.dispatchEvent(ev);
		
		mouse.update();
		
		// Move cursor to a different position.
		ev = document.createEvent('Event');
		ev.initEvent('mousemove', false, false);
		ev.clientX = 60;
		ev.clientY = 70;
		canvasEl.dispatchEvent(ev);
		
		mouse.update();
		mouseState = mouse.getState();
		assert.propEqual(mouseState.getDisplacement(), new thruster.math.Vector2d(10, 20), 'Returns correct displacement after a single movement.');
		
		// Move cursor twice during same update loop.
		// getDisplacement should ignore all but the latest reported cursor position.
		ev = document.createEvent('Event');
		ev.initEvent('mousemove', false, false);
		ev.clientX = 200;
		ev.clientY = 200;
		canvasEl.dispatchEvent(ev);
		
		ev = document.createEvent('Event');
		ev.initEvent('mousemove', false, false);
		ev.clientX = 10;
		ev.clientY = 10;
		canvasEl.dispatchEvent(ev);
		
		mouse.update();
		mouseState = mouse.getState();
		assert.propEqual(mouseState.getDisplacement(), new thruster.math.Vector2d(-50, -60), 'Returns correct displacement after multiple movements during the same update.');
		
		// Cleanup
		mouse.detach();
	});
	
	QUnit.test('getPosition()', function(assert){
		var canvasEl, mouse, mouseState, ev;
		
		canvasEl = document.getElementById('game-canvas');
		mouse = new thruster.input.Mouse(canvasEl);
		
		// Move cursor to a position to start.
		ev = document.createEvent('Event');
		ev.initEvent('mousemove', false, false);
		ev.clientX = 50;
		ev.clientY = 50;
		canvasEl.dispatchEvent(ev);
		
		mouse.update();
		mouseState = mouse.getState();
		assert.propEqual(mouseState.getPosition(), new thruster.math.Vector2d(50, 50), 'Returns correct position after a single movement.');
		
		// Move cursor twice during same update loop.
		// getPosition should ignore all but the latest reported cursor position.
		ev = document.createEvent('Event');
		ev.initEvent('mousemove', false, false);
		ev.clientX = 200;
		ev.clientY = 200;
		canvasEl.dispatchEvent(ev);
		
		ev = document.createEvent('Event');
		ev.initEvent('mousemove', false, false);
		ev.clientX = -10;
		ev.clientY = -20;
		canvasEl.dispatchEvent(ev);
		
		mouse.update();
		mouseState = mouse.getState();
		assert.propEqual(mouseState.getPosition(), new thruster.math.Vector2d(-10, -20), 'Returns correct position after multiple movements during the same update.');
		
		// Cleanup
		mouse.detach();
	});
	
	QUnit.test('getWheelDelta()', function(assert){
		var canvasEl, mouse, mouseState, ev;
		
		canvasEl = document.getElementById('game-canvas');
		mouse = new thruster.input.Mouse(canvasEl);
		
		mouseState = mouse.getState();
		assert.equal(mouseState.getWheelDelta(), 0, 'Returns 0 before any wheel events are fired.');
		
		// Scroll the mouse wheel in 3 axes. Thruster should only track the Y axis.
		ev = document.createEvent('Event');
		ev.initEvent('wheel', false, false);
		ev.deltaX = 1;
		ev.deltaY = 2;
		ev.deltaZ = 3;
		canvasEl.dispatchEvent(ev);
		
		mouse.update();
		mouseState = mouse.getState();
		assert.equal(mouseState.getWheelDelta(), 2, 'Returns correct wheel delta after a wheel event.');
		
		mouse.update();
		mouseState = mouse.getState();
		assert.equal(mouseState.getWheelDelta(), 0, 'Returns 0 after an update with no wheel events.');
		
		// Scroll several times in the same update.
		ev = document.createEvent('Event');
		ev.initEvent('wheel', false, false);
		ev.deltaX = 1;
		ev.deltaY = 2;
		ev.deltaZ = 3;
		canvasEl.dispatchEvent(ev);
		
		ev = document.createEvent('Event');
		ev.initEvent('wheel', false, false);
		ev.deltaX = 1;
		ev.deltaY = -5;
		ev.deltaZ = 3;
		canvasEl.dispatchEvent(ev);
		
		mouse.update();
		mouseState = mouse.getState();
		assert.equal(mouseState.getWheelDelta(), -3, 'Returns correct wheel delta after several wheel events in the same update.');
		
		// Cleanup
		mouse.detach();
	});
})();
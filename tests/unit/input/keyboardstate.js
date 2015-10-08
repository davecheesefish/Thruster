(function(){
	'use strict';
	QUnit.module('Thruster.Input.KeyboardState');
	
	QUnit.test('keyIsDown()', function(assert){
		var canvasEl = document.getElementById('game-canvas'),
			keyboard = new Thruster.Input.Keyboard(canvasEl);
		
		var testKey1 = Thruster.Input.Keys.G,
			testKey2 = Thruster.Input.Keys.ARROW_UP;
		
		assert.equal(keyboard.getState().keyIsDown(testKey1), false, 'Returns false before any keys are pressed.');
		
		// Press a key.
		// A generic Event is used instead of KeyboardEvent due to a long-standing bug with Webkit
		// and how it constructs artificial keyboard events. See https://bugs.webkit.org/show_bug.cgi?id=16735.
		var ev = document.createEvent('Event');
		ev.initEvent('keydown', false, false);
		ev.key = testKey1.key;
		ev.keyCode = testKey1.keyCode;
		canvasEl.dispatchEvent(ev);
		// Update the keyboard.
		keyboard.update();
		assert.equal(keyboard.getState().keyIsDown(testKey1), true, 'Returns true while a key is pressed.');
		
		// Press another key.
		ev = document.createEvent('Event');
		ev.initEvent('keydown', false, false);
		ev.key = testKey2.key;
		ev.keyCode = testKey2.keyCode;
		canvasEl.dispatchEvent(ev);
		// Update the keyboard.
		keyboard.update();
		assert.equal(keyboard.getState().keyIsDown(testKey1), true, 'Still returns true while another key is pressed.');
		
		// Release the first key.
		ev = document.createEvent('Event');
		ev.initEvent('keyup', false, false);
		ev.key = testKey1.key;
		ev.keyCode = testKey1.keyCode;
		canvasEl.dispatchEvent(ev);
		// Update the keyboard.
		keyboard.update();
		assert.equal(keyboard.getState().keyIsDown(testKey1), false, 'Returns false after the key is released.');
		
		// Clean up after ourselves.
		keyboard.detach();
	});
	
	QUnit.test('keyWasPressed()', function(assert){
		var canvasEl = document.getElementById('game-canvas'),
			keyboard = new Thruster.Input.Keyboard(canvasEl);
		
		var testKey = Thruster.Input.Keys.G;
		
		assert.equal(keyboard.getState().keyWasPressed(testKey), false, 'Returns false before any keys are pressed.');
		
		// Press testKey.
		var ev = document.createEvent('Event');
		ev.initEvent('keydown', false, false);
		ev.key = testKey.key;
		ev.keyCode = testKey.keyCode;
		canvasEl.dispatchEvent(ev);
		// Update the keyboard.
		keyboard.update();
		
		assert.equal(keyboard.getState().keyWasPressed(testKey), true, 'Returns true during the update loop immediately after the key was pressed.');
		
		// Update the keyboard again.
		keyboard.update();
		
		assert.equal(keyboard.getState().keyWasPressed(testKey), false, 'Returns false after the first update loop after the key was pressed.');
		
		// Clean up.
		keyboard.detach();
	});
	
	QUnit.test('keyWasReleased()', function(assert){
		var canvasEl = document.getElementById('game-canvas'),
			keyboard = new Thruster.Input.Keyboard(canvasEl);
		
		var testKey = Thruster.Input.Keys.G;
		
		assert.equal(keyboard.getState().keyWasReleased(testKey), false, 'Returns false before any keys are pressed.');
		
		// Press testKey.
		var ev = document.createEvent('Event');
		ev.initEvent('keydown', false, false);
		ev.key = testKey.key;
		ev.keyCode = testKey.keyCode;
		canvasEl.dispatchEvent(ev);
		// Update the keyboard.
		keyboard.update();
		
		assert.equal(keyboard.getState().keyWasReleased(testKey), false, 'Returns false when the key is pressed.');
		
		// Release testKey.
		ev = document.createEvent('Event');
		ev.initEvent('keyup', false, false);
		ev.key = testKey.key;
		ev.keyCode = testKey.keyCode;
		canvasEl.dispatchEvent(ev);
		// Update the keyboard.
		keyboard.update();
		
		assert.equal(keyboard.getState().keyWasReleased(testKey), true, 'Returns true during the update loop immediately after the key was released.');
		
		// Update the keyboard again.
		keyboard.update();
		
		assert.equal(keyboard.getState().keyWasReleased(testKey), false, 'Returns false after the first update loop after the key was released.');
		
		// Clean up.
		keyboard.detach();
	});
})();
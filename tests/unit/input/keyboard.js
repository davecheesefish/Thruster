(function(){
	'use strict';
	QUnit.module('thruster.input.Keyboard');

	QUnit.test('detach()', function(assert){
		var canvasEl = document.getElementById('game-canvas'),
			keyboard = new thruster.input.Keyboard(canvasEl);
		
		var testKey1 = thruster.input.Keys.W,
			testKey2 = thruster.input.Keys.SPACE;
		
		// KeyboardEvent has long-standing issues in Webkit, so we use a generic Event.
		// See https://bugs.webkit.org/show_bug.cgi?id=16735.
		// Press testKey1.
		var ev = document.createEvent('Event');
		ev.initEvent('keydown', false, false);
		ev.key = testKey1.key;
		ev.keyCode = testKey1.keyCode;
		canvasEl.dispatchEvent(ev);
		
		// Detaching the keyboard should stop it from receiving key events.
		keyboard.detach();
		
		// Release testKey1.
		ev = document.createEvent('Event');
		ev.initEvent('keyup', false, false);
		ev.key = testKey1.key;
		ev.keyCode = testKey1.keyCode;
		canvasEl.dispatchEvent(ev);
		
		// Press testKey2.
		ev = document.createEvent('Event');
		ev.initEvent('keydown', false, false);
		ev.key = testKey2.key;
		ev.keyCode = testKey2.keyCode;
		canvasEl.dispatchEvent(ev);
		
		keyboard.update();
		var state = keyboard.getState();
		
		// Since we detached the handlers, the keyboard should not have registered the testKey1 release or testKey2 press.
		// Keyboard should still see testKey1 as pressed.
		assert.equal(state.keyIsDown(testKey1), true, 'Keyup handler is detached.');
		// Keyboard should not see testKey2 as pressed.
		assert.equal(state.keyIsDown(testKey2), false, 'Keydown handler is detached.');
	});
})();
(function(){
	'use strict';
	QUnit.module('thruster.graphics.Surface');
	
	QUnit.test('Constructor(Number, Number)', function(assert){
		var w, h, surface, context;
		
		w = 10;
		h = 20;
		surface = new thruster.graphics.Surface(w, h);
		
		context = surface.getContext();
		assert.ok(context instanceof CanvasRenderingContext2D, 'Drawing context created.');
		assert.equal(context.canvas.width, 10, 'Canvas width set correctly.');
		assert.equal(context.canvas.height, 20, 'Canvas height set correctly.');
	});
	
	QUnit.test('Constructor(Element)', function(assert){
		var canvasEl, surface, context;
		
		canvasEl = document.getElementById('game-canvas');
		surface = new thruster.graphics.Surface(canvasEl);
		
		context = surface.getContext();
		assert.ok(context instanceof CanvasRenderingContext2D, 'Drawing context set correctly.');
		assert.equal(context.canvas, canvasEl, 'Rendering context is for the correct canvas.');
	});
})();
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
	
	QUnit.test('clear()', function(assert){
		var surface, context, canvas;
		var opaque, semitransparent, transparent, color;
		
		surface = new thruster.graphics.Surface(9, 9);
		context = surface.getContext();
		canvas = context.canvas;
		
		opaque = new thruster.graphics.Color(255, 0, 0, 1);            // Opaque red
		semitransparent = new thruster.graphics.Color(0, 255, 0, 0.4); // 40% green
		transparent = new thruster.graphics.Color(0, 0, 0, 0);       // Transparent black
		
		// This transform moves all drawing off-canvas. If clear() doesn't reset it the canvas will remain as it was.
		context.setTransform(1, 0, 0, 1, 0, 50);
		
		// Clear to opaque color.
		color = opaque;
		surface.clear(color);
		// assert.pixelEqual alpha values are 0-255, rather than 0-1.
		assert.pixelEqual(canvas, 0, 0, color.red, color.green, color.blue, color.alpha * 255, 'Opaque top-left pixel cleared to correct color.');
		assert.pixelEqual(canvas, 4, 4, color.red, color.green, color.blue, color.alpha * 255, 'Opaque center pixel cleared to correct color.');
		assert.pixelEqual(canvas, 8, 8, color.red, color.green, color.blue, color.alpha * 255, 'Opaque bottom-right pixel cleared to correct color.');
		
		// Clear to semi-transparent color.
		color = semitransparent;
		surface.clear(color);
		assert.pixelEqual(canvas, 0, 0, color.red, color.green, color.blue, color.alpha * 255, 'Semi-transparent top-left pixel cleared to correct color.');
		assert.pixelEqual(canvas, 4, 4, color.red, color.green, color.blue, color.alpha * 255, 'Semi-transparent center pixel cleared to correct color.');
		assert.pixelEqual(canvas, 8, 8, color.red, color.green, color.blue, color.alpha * 255, 'Semi-transparent bottom-right pixel cleared to correct color.');
		
		// Clear to fully transparent color.
		color = transparent;
		surface.clear(color);
		assert.pixelEqual(canvas, 0, 0, color.red, color.green, color.blue, color.alpha * 255, 'Transparent top-left pixel cleared to correct color.');
		assert.pixelEqual(canvas, 4, 4, color.red, color.green, color.blue, color.alpha * 255, 'Transparent center pixel cleared to correct color.');
		assert.pixelEqual(canvas, 8, 8, color.red, color.green, color.blue, color.alpha * 255, 'Transparent bottom-right pixel cleared to correct color.');
	});
	
	QUnit.test('saveConfig() and restoreConfig()', function(assert){
		var surface, context,
			strokeStyle, fillStyle, font, textAlign;
		
		surface = new thruster.graphics.Surface(9, 9);
		context = surface.getContext();
		
		// Set properties to test values.
		context.strokeStyle = strokeStyle = '#55aaee';
		context.fillStyle   = fillStyle   = '#ee9955';
		context.font        = font        = '12px "comic sans ms"'; // Absurd test value.
		context.textAlign   = textAlign   = 'center';
		
		assert.equal(context.strokeStyle, strokeStyle, 'Stroke style set before save.');
		assert.equal(context.fillStyle, fillStyle, 'Fill style set before save.');
		assert.equal(context.font, font, 'Font set before save.');
		assert.equal(context.textAlign, textAlign, 'Text align set before save.');
		
		// Save the context config.
		surface.saveConfig();
		
		// Change values
		context.strokeStyle = '#000000';
		context.fillStyle   = '#000000';
		context.font        = '5px sans-serif';
		context.textAlign   = 'left';
		
		assert.notEqual(context.strokeStyle, strokeStyle, 'Stroke style changed after save.');
		assert.notEqual(context.fillStyle, fillStyle, 'Fill style changed after save.');
		assert.notEqual(context.font, font, 'Font changed after save.');
		assert.notEqual(context.textAlign, textAlign, 'Text align changed after save.');
		
		// Restore the context config.
		surface.restoreConfig();
		
		assert.equal(context.strokeStyle, strokeStyle, 'Stroke style back to original value after restore.');
		assert.equal(context.fillStyle, fillStyle, 'Fill style back to original value after restore.');
		assert.equal(context.font, font, 'Font set back to original value after restore.');
		assert.equal(context.textAlign, textAlign, 'Text align back to original value after restore.');
	});
	
	QUnit.test('setImageSmoothing()', function(assert){
		var surface, context;
		
		surface = new thruster.graphics.Surface(10, 10);
		context = surface.getContext();
		
		function getSmoothing(){
			// Standard
			if (typeof context.imageSmoothingEnabled != 'undefined'){
				return context.imageSmoothingEnabled;
			}
			
			// Gecko
			if (typeof context.mozImageSmoothingEnabled != 'undefined'){
				return context.mozImageSmoothingEnabled;
			}
			
			// IE
			if (typeof context.msImageSmoothingEnabled != 'undefined'){
				return context.msImageSmoothingEnabled;
			}
			
			// WebKit
			if (typeof context.webkitImageSmoothingEnabled != 'undefined'){
				return context.webkitImageSmoothingEnabled;
			}
		};
		
		surface.setImageSmoothing(false);
		assert.equal(getSmoothing(), false, 'Image smoothing disabled.');
		
		surface.setImageSmoothing(true);
		assert.equal(getSmoothing(), true, 'Image smoothing enabled.');
		
		surface.setImageSmoothing(false);
		assert.equal(getSmoothing(), false, 'Image smoothing disabled again.');
	});
	
	QUnit.skip('setTransform()', function(assert){
		// No real way to test if a transform has been applied, since getting the current
		// transform back from a CanvasRenderingContext2D isn't supported yet.
	});
	
	QUnit.skip('transform()', function(assert){
		// No real way to test if a transform has been applied, since getting the current
		// transform back from a CanvasRenderingContext2D isn't supported yet.
	});
})();
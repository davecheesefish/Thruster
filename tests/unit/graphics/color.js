(function(){
	'use strict';
	QUnit.module('thruster.graphics.Color');
	
	QUnit.test('Constructor', function(assert){
		var color = new thruster.graphics.Color(10, 20, 30, 0.4);
		
		assert.equal(color.red, 10, 'red property set correctly.');
		assert.equal(color.green, 20, 'green property set correctly.');
		assert.equal(color.blue, 30, 'blue property set correctly.');
		assert.equal(color.alpha, 0.4, 'alpha property set correctly.');
	});
	
	QUnit.test('toRgba()', function(assert){
		var color = new thruster.graphics.Color(10, 20, 30, 0.4);
		
		assert.equal(color.toRgba(), 'rgba(10, 20, 30, 0.4)', 'Returns the correct CSS color string.');
	});
})();
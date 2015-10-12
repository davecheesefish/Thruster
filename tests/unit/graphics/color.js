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
	
	QUnit.test('lerp()', function(assert){
		var color1 = new thruster.graphics.Color(10, 20, 30, 0.4),
			color2 = new thruster.graphics.Color(20, 30, 40, 0.5),
			newColor, expectedColor;
		
		newColor = thruster.graphics.Color.lerp(color1, color2, 0);
		assert.propEqual(newColor, color1, 'Returns first color when third argument is 0.');
		
		newColor = thruster.graphics.Color.lerp(color1, color2, 1);
		assert.propEqual(newColor, color2, 'Returns second color when third argument is 1.');
		
		newColor = thruster.graphics.Color.lerp(color1, color2, 0.5);
		expectedColor = new thruster.graphics.Color(15, 25, 35, 0.45);
		assert.propEqual(newColor, expectedColor, 'Returns correct value when third argument is 0.5.');
		
		newColor = thruster.graphics.Color.lerp(color2, color1, 0.7);
		expectedColor = new thruster.graphics.Color(13, 23, 33, 0.43);
		assert.propEqual(newColor, expectedColor, 'Returns correct value when second color values are less than the first.');
	});
})();
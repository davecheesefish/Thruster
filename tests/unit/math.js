(function(){
	'use strict';
	QUnit.module('thruster.math');
	
	QUnit.test('static lerp()', function(assert){
		assert.equal(thruster.math.lerp(1, 2, 0), 1, 'Returns the first argument if alpha is 0.');
		assert.equal(thruster.math.lerp(1, 2, 1), 2, 'Returns the second argument if alpha is 1.');
		assert.equal(thruster.math.lerp(1, 2, 0.5), 1.5, 'Returns halfway between the arguments if alpha is 0.5.');
		assert.equal(thruster.math.lerp(2, 0, 0.75), 0.5, 'Returns the correct value where b is less than a.');
	});
})();
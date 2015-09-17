module('Vectors');

test('Vector2d', function(assert){
	var vector = new Thruster.Math.Vector2d(1, 2);
	
	assert.equal(vector.x, 1, 'Constructed x value is set correctly.');
	assert.equal(vector.y, 2, 'Constructed y value is set correctly.');
});
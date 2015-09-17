module('Vectors');

test('Vector2d', function(assert){
	var vector = new Thruster.Math.Vector2d(3, 4);
	
	assert.equal(vector.x, 3, 'Constructed x value is set correctly.');
	assert.equal(vector.y, 4, 'Constructed y value is set correctly.');
	
	assert.equal(vector.length(), 5, 'Vector length is correctly calculated.');
	assert.equal(vector.angle(), 0.9272952180016122, 'Vector angle is correctly calculated.')
});
module('Vectors');

test('Vector2d creation', function(assert){
	var vector;
	
	// Constructor
	vector = new Thruster.Math.Vector2d(3, 4);
	assert.equal(vector.x, 3, 'Constructor - x value is set correctly.');
	assert.equal(vector.y, 4, 'Constructor - y value is set correctly.');
	
	// From angle and length
	vector = Thruster.Math.Vector2d.fromComponents(Math.PI / 6, 4);
	assert.equal(vector.x, 3.464101615137755, 'fromComponents() - x value is set correctly.');
	assert.equal(vector.y, 1.9999999999999998, 'fromComponents() - y value is set correctly.');
	
	// Clone from existing Vector2d
	var clonedVector = vector.clone();
	assert.notEqual(clonedVector, vector, 'clone() - returns a new separate object from the original.');
	assert.equal(clonedVector.x, vector.x, 'clone() - x value is the same as the original.');
	assert.equal(clonedVector.y, vector.y, 'clone() - y value is the same as the original.');
});

test('Vector2d information', function(assert){
	var vector = new Thruster.Math.Vector2d(3, 4);
	
	assert.equal(vector.length(), 5, 'Vector length is correctly calculated.');
	assert.equal(vector.angle(), 0.9272952180016122, 'Vector angle is correctly calculated.')
});
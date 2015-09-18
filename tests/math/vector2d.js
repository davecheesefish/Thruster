QUnit.module('Thruster/Math/Vector2d');

QUnit.test('Constructor', function(assert){
	// New from constructor.
	var vector = new Thruster.Math.Vector2d(3, 4);
	assert.equal(vector.x, 3, 'Constructor - x value is set correctly.');
	assert.equal(vector.y, 4, 'Constructor - y value is set correctly.');
});

QUnit.test('clone()', function(assert){
	// Clone from existing Vector2d.
	var vector = new Thruster.Math.Vector2d(3, 4);
	var clonedVector = vector.clone();
	assert.notEqual(clonedVector, vector, 'clone() - returns a new separate object from the original.');
	assert.equal(clonedVector.x, vector.x, 'clone() - x value is the same as the original.');
	assert.equal(clonedVector.y, vector.y, 'clone() - y value is the same as the original.');
});

QUnit.test('fromComponents()', function(assert){
	// New Vector2d from angle and length.
	var vector = Thruster.Math.Vector2d.fromComponents(Math.PI / 6, 4);
	assert.equal(vector.x, 3.464101615137755, 'fromComponents() - x value is set correctly.');
	assert.equal(vector.y, 1.9999999999999998, 'fromComponents() - y value is set correctly.');
});

QUnit.test('add()', function(assert){
	var vector1 = new Thruster.Math.Vector2d(1, 2),
		vector2 = new Thruster.Math.Vector2d(3, 4);
	
	vector1.add(vector2);
	assert.deepEqual(vector1, new Thruster.Math.Vector2d(4, 6), 'add() - Result from adding two vectors is correct.');
});

QUnit.test('angle()', function(assert){
	// Get the angle of a vector.
	var vector = new Thruster.Math.Vector2d(3, 4);
	assert.equal(vector.angle(), 0.9272952180016122, 'angle() - Vector angle is correctly calculated.')
});
	
QUnit.test('dot()', function(assert){
	// Calculate a dot product.
	var vector1 = new Thruster.Math.Vector2d(2, 3),
		vector2 = new Thruster.Math.Vector2d(4, 5);
	
	assert.equal(vector1.dot(vector2), 23, 'dot() - Dot product is correctly calculated.');
});

QUnit.test('length()', function(assert){
	// Get the length of a vector.
	var vector = new Thruster.Math.Vector2d(3, 4);
	assert.equal(vector.length(), 5, 'length() - Vector length is correctly calculated.');
});

QUnit.test('normalize()', function(assert){
	// Normalize a vector to length 1.
	var vector = new Thruster.Math.Vector2d(5, 12);
	var normalizedVector = vector.clone().normalize();
	
	assert.equal(normalizedVector.angle(), vector.angle(), 'normalize() - direction is preserved.');
	assert.equal(normalizedVector.length(), 1, 'normalize() - length of vector after manipulation is 1.');
});
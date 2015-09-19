QUnit.module('Thruster/Math/Vector2d');

QUnit.test('Constructor', function(assert){
	// New from constructor.
	var vector = new Thruster.Math.Vector2d(3, 4);
	assert.equal(vector.x, 3, 'x value is set correctly.');
	assert.equal(vector.y, 4, 'y value is set correctly.');
});

QUnit.test('clone()', function(assert){
	// Clone from existing Vector2d.
	var vector = new Thruster.Math.Vector2d(3, 4);
	var clonedVector = vector.clone();
	assert.notEqual(clonedVector, vector, 'Returns a new separate object from the original.');
	assert.equal(clonedVector.x, vector.x, 'x value is the same as the original.');
	assert.equal(clonedVector.y, vector.y, 'y value is the same as the original.');
});

QUnit.test('fromComponents()', function(assert){
	// New Vector2d from angle and length.
	var vector = Thruster.Math.Vector2d.fromComponents(Math.PI / 6, 4);
	assert.equal(vector.x, 3.464101615137755, 'x value is set correctly.');
	assert.equal(vector.y, 1.9999999999999998, 'y value is set correctly.');
});

QUnit.test('add()', function(assert){
	var vector1 = new Thruster.Math.Vector2d(1, 2),
		vector2 = new Thruster.Math.Vector2d(3, 4);
	
	vector1.add(vector2);
	assert.deepEqual(vector1, new Thruster.Math.Vector2d(4, 6), 'Returned value is correct.');
});

QUnit.test('angle()', function(assert){
	// Get the angle of a vector.
	var vector = new Thruster.Math.Vector2d(3, 4);
	assert.equal(vector.angle(), 0.9272952180016122, 'Returned value is correct.')
});
	
QUnit.test('dot()', function(assert){
	// Calculate a dot product.
	var vector1 = new Thruster.Math.Vector2d(2, 3),
		vector2 = new Thruster.Math.Vector2d(4, 5);
	
	assert.equal(vector1.dot(vector2), 23, 'Returned value is correct.');
});

QUnit.test('length()', function(assert){
	// Get the length of a vector.
	var vector = new Thruster.Math.Vector2d(3, 4);
	assert.equal(vector.length(), 5, 'Returned value is correct.');
});

QUnit.test('multiply()', function(assert){
	// Multiply a vector by a scalar value.
	var vector = new Thruster.Math.Vector2d(3, 4);
	vector.multiply(5);
	assert.deepEqual(vector, new Thruster.Math.Vector2d(15, 20), 'Returned value is correct.');
});

QUnit.test('normalize()', function(assert){
	// Normalize a vector to length 1.
	var vector = new Thruster.Math.Vector2d(5, 12);
	var normalizedVector = vector.clone().normalize();
	
	assert.equal(normalizedVector.angle(), vector.angle(), 'Direction is preserved.');
	assert.equal(normalizedVector.length(), 1, 'Length of resulting vector is 1.');
});

QUnit.test('scalarProjection(), angle between vectors less than 90 degrees', function(assert){
	// Project vector1 onto vector2
	var vector1 = new Thruster.Math.Vector2d(2, 3),
		vector2 = new Thruster.Math.Vector2d(4, 5);
	
	assert.equal(vector1.scalarProjection(vector2), 3.5919965234379396, 'Returned value is correct.');
});

QUnit.test('scalarProjection(), angle between vectors is 90 degrees', function(assert){
	// Project vector1 onto vector2
	var vector1 = new Thruster.Math.Vector2d(1, 1),
		vector2 = new Thruster.Math.Vector2d(-1, 1);
	
	assert.equal(vector1.scalarProjection(vector2), 0, 'Returned value is correct.');
});

QUnit.test('scalarProjection(), angle between vectors more than 90 degrees', function(assert){
	// Project vector1 onto vector2
	var vector1 = new Thruster.Math.Vector2d(2, 3),
		vector2 = new Thruster.Math.Vector2d(-4, -5);
	
	assert.equal(vector1.scalarProjection(vector2), -3.5919965234379396, 'Returned value is correct.');
});
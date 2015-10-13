(function(){
	'use strict';
	QUnit.module('thruster.math.Vector2d');
	
	QUnit.test('Constructor', function(assert){
		// New from constructor.
		var vector = new thruster.math.Vector2d(3, 4);
		assert.equal(vector.x, 3, 'x value is set correctly.');
		assert.equal(vector.y, 4, 'y value is set correctly.');
	});
	
	QUnit.test('static fromComponents()', function(assert){
		// New Vector2d from angle and length.
		var vector = thruster.math.Vector2d.fromComponents(Math.PI / 6, 4);
		assert.equal(vector.x, 3.464101615137755, 'x value is set correctly.');
		assert.equal(vector.y, 1.9999999999999998, 'y value is set correctly.');
	});
	
	QUnit.test('clone()', function(assert){
		// Clone from existing Vector2d.
		var vector = new thruster.math.Vector2d(3, 4);
		var clonedVector = vector.clone();
		assert.notEqual(clonedVector, vector, 'Returns a new separate object from the original.');
		assert.equal(clonedVector.x, vector.x, 'x value is the same as the original.');
		assert.equal(clonedVector.y, vector.y, 'y value is the same as the original.');
	});
	
	QUnit.test('add()', function(assert){
		// Add vector2 to vector1.
		var vector1 = new thruster.math.Vector2d(1, 2),
			vector2 = new thruster.math.Vector2d(3, 4);
		
		vector1.add(vector2);
		assert.propEqual(vector1, new thruster.math.Vector2d(4, 6), 'Vector has correct values after manipulation.');
	});
	
	QUnit.test('angle()', function(assert){
		// Get the angle of a vector.
		var vector = new thruster.math.Vector2d(3, 4);
		assert.equal(vector.angle(), 0.9272952180016122, 'Returned value is correct.')
	});
		
	QUnit.test('dot()', function(assert){
		// Calculate a dot product.
		var vector1 = new thruster.math.Vector2d(2, 3),
			vector2 = new thruster.math.Vector2d(4, 5);
		
		assert.equal(vector1.dot(vector2), 23, 'Returned value is correct.');
	});
	
	QUnit.test('length()', function(assert){
		// Get the length of a vector.
		var vector = new thruster.math.Vector2d(3, 4);
		assert.equal(vector.length(), 5, 'Returned value is correct for a vector in a positive direction.');
		
		vector = new thruster.math.Vector2d(-3, -4);
		assert.equal(vector.length(), 5, 'Returned value is correct for a vector in a negative direction.');
	});
	
	QUnit.test('lengthSquared()', function(assert){
		// Get the length of a vector.
		var vector = new thruster.math.Vector2d(3, 4);
		assert.equal(vector.lengthSquared(), 25, 'Returned value is correct for a vector in a positive direction.');
		
		vector = new thruster.math.Vector2d(-3, -4);
		assert.equal(vector.lengthSquared(), 25, 'Returned value is correct for a vector in a negative direction.');
	});
	
	QUnit.test('multiply()', function(assert){
		// Multiply a vector by a scalar value.
		var vector = new thruster.math.Vector2d(3, 4);
		vector.multiply(5);
		assert.propEqual(vector, new thruster.math.Vector2d(15, 20), 'Vector has correct values after manipulation.');
	});
	
	QUnit.test('normalize()', function(assert){
		// Normalize a vector to length 1.
		var vector = new thruster.math.Vector2d(5, 12);
		var normalizedVector = vector.clone().normalize();
		
		assert.equal(normalizedVector.angle(), vector.angle(), 'Direction is preserved.');
		assert.equal(normalizedVector.length(), 1, 'Length of resulting vector is 1.');
	});
	
	QUnit.test('projection()', function(assert){
		// Find the vector projection of vector1 onto vector2
		var vector1 = new thruster.math.Vector2d(3, 4),
			vector2 = new thruster.math.Vector2d(1, 1);
		
		assert.propEqual(vector1.projection(vector2), new thruster.math.Vector2d(3.5, 3.5), 'Returned value is correct.');
	});
	
	QUnit.test('rejection()', function(assert){
		// Find the vector rejection of vector1 onto vector2
		var vector1 = new thruster.math.Vector2d(3, 4),
			vector2 = new thruster.math.Vector2d(1, 1);
		
		assert.propEqual(vector1.rejection(vector2), new thruster.math.Vector2d(-0.5, 0.5), 'Returned value is correct.');
	});
	
	QUnit.test('rotate()', function(assert){
		// Rotate a vector through 90 degrees (pi/2 radians).
		var vector = new thruster.math.Vector2d(8, 9);
		vector.rotate(Math.PI / 2);
		
		assert.propEqual(vector, new thruster.math.Vector2d(-9, 8), 'Vector has correct values after manipulation.');
	});
	
	QUnit.test('scalarProjection()', function(assert){
		// Project vector1 onto vector2
		var vector1, vector2;
		
		vector1 = new thruster.math.Vector2d(2, 3),
		vector2 = new thruster.math.Vector2d(4, 5);
		assert.equal(vector1.scalarProjection(vector2), 3.5919965234379396, 'Correct result when angle between vectors is less than 90 degrees.');
		
		vector1 = new thruster.math.Vector2d(1, 1),
		vector2 = new thruster.math.Vector2d(-1, 1);
		assert.equal(vector1.scalarProjection(vector2), 0, 'Correct result when angle between vectors is exactly 90 degrees.');
	
		vector1 = new thruster.math.Vector2d(2, 3),
		vector2 = new thruster.math.Vector2d(-4, -5);
		assert.equal(vector1.scalarProjection(vector2), -3.5919965234379396, 'Correct result when angle between vectors is more than 90 degrees.');
	});
	
	QUnit.test('subtract()', function(assert){
		// Subtract vector2 from vector1.
		var vector1 = new thruster.math.Vector2d(5, 5),
			vector2 = new thruster.math.Vector2d(1, 2);
		
		vector1.subtract(vector2);
		assert.propEqual(vector1, new thruster.math.Vector2d(4, 3), 'Vector has correct values after manipulation.');
	});
})();
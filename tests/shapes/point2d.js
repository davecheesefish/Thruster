QUnit.module('Thruster.Shapes.Point2d');

QUnit.test('Constructor', function(assert){
	var point = new Thruster.Shapes.Point2d(1, 2);
	
	assert.equal(point.x, 1, 'x property set correctly.');
	assert.equal(point.y, 2, 'y property set correctly.');
});

QUnit.test('clone()', function(assert){
	var point = new Thruster.Shapes.Point2d(1, 2),
		clonedPoint = point.clone();
	
	assert.propEqual(point, clonedPoint, 'Cloned object has the same property values as the original.');
	assert.notEqual(point, clonedPoint, 'Cloned object is not just a reference to the original.');
});

QUnit.test('toVector()', function(assert){
	var point = new Thruster.Shapes.Point2d(1, 2),
		vector = point.toVector();
	
	assert.deepEqual(vector, new Thruster.Math.Vector2d(1, 2), 'Returns a vector with the same component values as the original point.');
});

QUnit.test('translate()', function(assert){
	// Translate a point by separate x and y values.
	var point = new Thruster.Shapes.Point2d(1, 2);
	point.translate(3, 4);
	
	assert.propEqual(point, new Thruster.Shapes.Point2d(4, 6), 'Point has correct values after manipulation.');
});

QUnit.test('translateByVector()', function(assert){
	// Translate a point by a vector.
	var point = new Thruster.Shapes.Point2d(1, 2),
		vector = new Thruster.Math.Vector2d(3, 4);
	
	point.translateByVector(vector);
	
	assert.propEqual(point, new Thruster.Shapes.Point2d(4, 6), 'Point has correct values after manipulation.');
});

QUnit.test('vectorTo()', function(assert){
	// Find the vector from point1 to point2.
	var point1 = new Thruster.Shapes.Point2d(1, 2),
		point2 = new Thruster.Shapes.Point2d(3, 5);
	
	var vector = point1.vectorTo(point2);
	
	assert.propEqual(vector, new Thruster.Math.Vector2d(2, 3), 'Returned value is correct.');
});
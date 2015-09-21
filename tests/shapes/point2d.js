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

QUnit.test('angleTo()', function(assert){
	var point1 = new Thruster.Shapes.Point2d(1, 1),
		point2 = new Thruster.Shapes.Point2d(2, 2);
	
	assert.equal(point1.angleTo(point2), 0.25 * Math.PI, 'Returned value is correct.');
	assert.equal(point2.angleTo(point1), -0.75 * Math.PI, 'Returned value is correct in the opposite direction.');
});

QUnit.test('distanceTo()', function(assert){
	// Find the distance from point1 to point2.
	var point1 = new Thruster.Shapes.Point2d(1, 1),
		point2 = new Thruster.Shapes.Point2d(4, 5),
		dist1to2 = point1.distanceTo(point2),
		dist2to1 = point2.distanceTo(point1);
	
	assert.equal(dist1to2, 5, 'Returned value is correct.');
	assert.equal(dist1to2, dist2to1, 'Returned values are the same in both directions between the same points.');
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
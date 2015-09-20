QUnit.module('Thruster.Shapes.Point2d');

QUnit.test('Constructor', function(assert){
	var point = new Thruster.Shapes.Point2d(1, 2);
	
	assert.equal(point.x, 1, 'x property set correctly.');
	assert.equal(point.y, 2, 'y property set correctly.');
});

QUnit.test('vectorTo()', function(assert){
	// Find the vector from point1 to point2.
	var point1 = new Thruster.Shapes.Point2d(1, 2),
		point2 = new Thruster.Shapes.Point2d(3, 5);
	
	var vector = point1.vectorTo(point2);
	
	assert.propEqual(vector, new Thruster.Math.Vector2d(2, 3), 'Returned value is correct.');
});
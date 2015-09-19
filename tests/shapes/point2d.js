QUnit.module('Thruster.Shapes.Point');

QUnit.test('Constructor', function(assert){
	var point = new Thruster.Shapes.Point2d(1, 2);
	
	assert.equal(point.x, 1, 'x property set correctly.');
	assert.equal(point.y, 2, 'y property set correctly.');
});

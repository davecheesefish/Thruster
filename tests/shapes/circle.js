QUnit.module('Thruster.Shapes.Circle');

QUnit.test('area()', function(assert){
	var circle = new Thruster.Shapes.Circle(5);
	
	assert.equal(circle.area(), 25 * Math.PI, 'Returned value is correct.');
});

QUnit.test('perimeter()', function(assert){
	var circle = new Thruster.Shapes.Circle(5);
	
	assert.equal(circle.perimeter(), 10 * Math.PI, 'Returned value is correct.')
});
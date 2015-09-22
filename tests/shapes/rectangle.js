QUnit.module('Thruster.Shapes.Rectangle');

QUnit.test('Constructor', function(assert){
	var rect = new Thruster.Shapes.Rectangle(40, 30, 20, 10),
		expectedVertices = [
            new Thruster.Shapes.Point2d(-20, -10),
            new Thruster.Shapes.Point2d(20, -10),
            new Thruster.Shapes.Point2d(20, 20),
            new Thruster.Shapes.Point2d(-20, 20)
        ];
	
	assert.propEqual(rect.getVertices(), expectedVertices, 'Comstructed polygon has correct vertex positions.');
});
QUnit.module('Thruster.Shapes.Polygon');

QUnit.test('getNormals()', function(assert){
	var vertices = [
            new Thruster.Shapes.Point2d(-1, -1),
            new Thruster.Shapes.Point2d( 1, -1),
            new Thruster.Shapes.Point2d( 1,  1),
            new Thruster.Shapes.Point2d(-1,  1)
	    ],
	    expectedNormals = [
	        new Thruster.Math.Vector2d( 0, -1),
	        new Thruster.Math.Vector2d( 1,  0),
	        new Thruster.Math.Vector2d( 0,  1),
	        new Thruster.Math.Vector2d(-1,  0),
	    ],
		polygon = new Thruster.Shapes.Polygon(vertices);
	
	assert.propEqual(polygon.getNormals(), expectedNormals, 'Returned normal vectors are correct.');
});

QUnit.test('getVertices()', function(assert){
	var vertices = [
            new Thruster.Shapes.Point2d(-1, -1),
            new Thruster.Shapes.Point2d( 1, -1),
            new Thruster.Shapes.Point2d( 1,  1),
            new Thruster.Shapes.Point2d(-1,  1)
	    ],
		polygon = new Thruster.Shapes.Polygon(vertices);
	
	assert.propEqual(polygon.getVertices(), vertices, 'Returned vertex list is correct.');
});

QUnit.test('setVertices()', function(assert){
	var vertices = [
            new Thruster.Shapes.Point2d(-1, -1),
            new Thruster.Shapes.Point2d( 1, -1),
            new Thruster.Shapes.Point2d( 1,  1),
            new Thruster.Shapes.Point2d(-1,  1)
	    ],
		polygon = new Thruster.Shapes.Polygon();
	
	polygon.setVertices(vertices);
	
	assert.propEqual(polygon.getVertices(), vertices, 'Stored Vertex list is correct.');
});
(function(){
	'use strict';
	QUnit.module('thruster.shapes.Polygon');
	
	QUnit.test('getNormals(), no rotation', function(assert){
		var vertices = [
	            new thruster.shapes.Point2d(-5, -5),
	            new thruster.shapes.Point2d( 5, -5),
	            new thruster.shapes.Point2d( 5,  5),
	            new thruster.shapes.Point2d(-5,  5)
		    ],
		    expectedNormals = [
		        new thruster.math.Vector2d( 0, -1),
		        new thruster.math.Vector2d( 1,  0),
		        new thruster.math.Vector2d( 0,  1),
		        new thruster.math.Vector2d(-1,  0),
		    ],
			polygon = new thruster.shapes.Polygon(vertices);
		
		assert.propEqual(polygon.getNormals(), expectedNormals, 'Returned normal vectors are correct.');
	});
	
	QUnit.test('getNormals(), with rotation', function(assert){
		var vertices = [
	            new thruster.shapes.Point2d(-5, -5),
	            new thruster.shapes.Point2d( 5, -5),
	            new thruster.shapes.Point2d( 5,  5),
	            new thruster.shapes.Point2d(-5,  5)
		    ],
		    angle = Math.PI / 6,
		    expectedNormals = [
		        new thruster.math.Vector2d( Math.sin(angle), -Math.cos(angle)),
		        new thruster.math.Vector2d( Math.cos(angle),  Math.sin(angle)),
		        new thruster.math.Vector2d(-Math.sin(angle),  Math.cos(angle)),
		        new thruster.math.Vector2d(-Math.cos(angle), -Math.sin(angle)),
		    ],
			polygon = new thruster.shapes.Polygon(vertices);
		
		assert.propEqual(polygon.getNormals(angle), expectedNormals, 'Returned normal vectors are correct.');
	});
	
	QUnit.test('getVertices(), no rotation or positioning', function(assert){
		var vertices = [
	            new thruster.shapes.Point2d(-5, -5),
	            new thruster.shapes.Point2d( 5, -5),
	            new thruster.shapes.Point2d( 5,  5),
	            new thruster.shapes.Point2d(-5,  5)
		    ],
			polygon = new thruster.shapes.Polygon(vertices);
		
		assert.propEqual(polygon.getVertices(), vertices, 'Returned vertex list is correct.');
	});
	
	QUnit.test('getVertices(), with positioning', function(assert){
		var vertices = [
	            new thruster.shapes.Point2d(-5, -5),
	            new thruster.shapes.Point2d( 5, -5),
	            new thruster.shapes.Point2d( 5,  5),
	            new thruster.shapes.Point2d(-5,  5)
		    ],
			polygon = new thruster.shapes.Polygon(vertices),
			position = new thruster.shapes.Point2d(10, 20),
			expectedVertices = [
				new thruster.shapes.Point2d( 5, 15),
				new thruster.shapes.Point2d(15, 15),
				new thruster.shapes.Point2d(15, 25),
				new thruster.shapes.Point2d( 5, 25)
		    ];
		
		assert.propEqual(polygon.getVertices(position), expectedVertices, 'Returned vertex list is correct.');
	});
	
	QUnit.test('getVertices(), with positioning and rotation', function(assert){
		var vertices = [
	            new thruster.shapes.Point2d(-5, -5),
	            new thruster.shapes.Point2d( 5, -5),
	            new thruster.shapes.Point2d( 5,  5),
	            new thruster.shapes.Point2d(-5,  5)
		    ],
			polygon = new thruster.shapes.Polygon(vertices),
			position = new thruster.shapes.Point2d(10, 20),
			angle = Math.PI / 2,
			expectedVertices = [
				new thruster.shapes.Point2d(15, 15),
				new thruster.shapes.Point2d(15, 25),
				new thruster.shapes.Point2d( 5, 25),
				new thruster.shapes.Point2d( 5, 15)
		    ];
		
		assert.propEqual(polygon.getVertices(position, angle), expectedVertices, 'Returned vertex list is correct.');
	});
	
	QUnit.test('setVertices()', function(assert){
		var vertices = [
	            new thruster.shapes.Point2d(-5, -5),
	            new thruster.shapes.Point2d( 5, -5),
	            new thruster.shapes.Point2d( 5,  5),
	            new thruster.shapes.Point2d(-5,  5)
		    ],
			polygon = new thruster.shapes.Polygon();
		
		polygon.setVertices(vertices);
		
		assert.propEqual(polygon.getVertices(), vertices, 'Stored Vertex list is correct.');
	});
})();
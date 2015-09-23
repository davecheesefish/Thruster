QUnit.module('Thruster.Shapes.Collision');

QUnit.test('checkPolygonOnPolygonCollision()', function(assert){
	var poly1Verts = [
	        new Thruster.Shapes.Point2d(-3, -3),
	        new Thruster.Shapes.Point2d( 3, -3),
	        new Thruster.Shapes.Point2d( 3,  3),
	        new Thruster.Shapes.Point2d(-3,  3),
	    ],
	    poly2Verts = [
  	        new Thruster.Shapes.Point2d(-2, -2),
  	        new Thruster.Shapes.Point2d( 2, -2),
  	        new Thruster.Shapes.Point2d( 2,  2),
  	        new Thruster.Shapes.Point2d(-2,  2),
  	    ],
		poly1 = new Thruster.Shapes.Polygon(poly1Verts),
	    poly2 = new Thruster.Shapes.Polygon(poly2Verts),
	    pos1, pos2;
	
	// Not colliding
	pos1 = new Thruster.Shapes.Point2d(0, 0),
    pos2 = new Thruster.Shapes.Point2d(0, 10);
	var collides = Thruster.Shapes.Collision.checkPolygonOnPolygonCollision(poly1, pos1, 0, poly2, pos2, 0);
	assert.equal(collides, false, 'Detect correctly: No collision.');
	
	// Edge overlap
	pos1 = new Thruster.Shapes.Point2d(0, 0),
    pos2 = new Thruster.Shapes.Point2d(1, 1);
	var collides = Thruster.Shapes.Collision.checkPolygonOnPolygonCollision(poly1, pos1, 0, poly2, pos2, 0);
	assert.equal(collides, true, 'Detect correctly: Edge overlap collision.');
	
	// Shape 2 entirely within shape 1
	pos1 = new Thruster.Shapes.Point2d(0, 0),
    pos2 = new Thruster.Shapes.Point2d(0, 0);
	var collides = Thruster.Shapes.Collision.checkPolygonOnPolygonCollision(poly1, pos1, 0, poly2, pos2, 0);
	assert.equal(collides, true, 'Detect correctly: Shape 2 entirely within shape 1.');
	
	// Shape 1 entirely within shape 2
	pos1 = new Thruster.Shapes.Point2d(0, 0),
    pos2 = new Thruster.Shapes.Point2d(0, 0);
	var collides = Thruster.Shapes.Collision.checkPolygonOnPolygonCollision(poly2, pos2, 0, poly1, pos1, 0);
	assert.equal(collides, true, 'Detect correctly: Shape 1 entirely within shape 2.');
	
	// Shape 2 rotated into collision
	pos1 = new Thruster.Shapes.Point2d(0, 0),
    pos2 = new Thruster.Shapes.Point2d(0, 5.5);
	var collides = Thruster.Shapes.Collision.checkPolygonOnPolygonCollision(poly1, pos1, 0, poly2, pos2, Math.PI / 4);
	assert.equal(collides, true, 'Detect correctly: Shape 2 rotated into collision.');
	
	// Both shapes rotated
	pos1 = new Thruster.Shapes.Point2d(0, 0),
    pos2 = new Thruster.Shapes.Point2d(0, 6);
	var collides = Thruster.Shapes.Collision.checkPolygonOnPolygonCollision(poly1, pos1, Math.PI / 4, poly2, pos2, Math.PI / 4);
	assert.equal(collides, true, 'Detect correctly: Both shapes rotated into collision.');
});

QUnit.test('checkPointOnPolygonCollision()', function(assert){
	var polyVerts = [
	        new Thruster.Shapes.Point2d(-3, -3),
	        new Thruster.Shapes.Point2d( 3, -3),
	        new Thruster.Shapes.Point2d( 3,  3),
	        new Thruster.Shapes.Point2d(-3,  3),
	    ],
		poly = new Thruster.Shapes.Polygon(polyVerts),
	    polyPos, point;
	
	// Not colliding
	polyPos = new Thruster.Shapes.Point2d(0, 0),
    point = new Thruster.Shapes.Point2d(0, 10);
	var collides = Thruster.Shapes.Collision.checkPointOnPolygonCollision(point, poly, polyPos, 0);
	assert.equal(collides, false, 'Detect correctly: No collision.');
	
	// Point within polygon
	polyPos = new Thruster.Shapes.Point2d(0, 0),
    point = new Thruster.Shapes.Point2d(1, 1);
	var collides = Thruster.Shapes.Collision.checkPointOnPolygonCollision(point, poly, polyPos, 0);
	assert.equal(collides, true, 'Detect correctly: Point within polygon.');
	
	// Point touching polygon
	polyPos = new Thruster.Shapes.Point2d(0, 0),
    point = new Thruster.Shapes.Point2d(3, 3);
	var collides = Thruster.Shapes.Collision.checkPointOnPolygonCollision(point, poly, polyPos, 0);
	assert.equal(collides, true, 'Detect correctly: Point touching polygon.');
	
	// Point within rotated polygon
	polyPos = new Thruster.Shapes.Point2d(0, 0),
    point = new Thruster.Shapes.Point2d(0, 3.5);
	var collides = Thruster.Shapes.Collision.checkPointOnPolygonCollision(point, poly, polyPos, Math.PI / 4);
	assert.equal(collides, true, 'Detect correctly: Point within rotated polygon.');
	
	// Point outside rotated polygon
	polyPos = new Thruster.Shapes.Point2d(0, 0),
    point = new Thruster.Shapes.Point2d(3, 3);
	var collides = Thruster.Shapes.Collision.checkPointOnPolygonCollision(point, poly, polyPos, Math.PI / 4);
	assert.equal(collides, false, 'Detect correctly: Point outside rotated polygon.');
});
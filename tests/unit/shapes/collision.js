(function(){
	'use strict';
	QUnit.module('Thruster.Shapes.Collision');
	
	QUnit.test('aabbWithAabb()', function(assert){
		var aabb1 = new Thruster.Shapes.Aabb(2, 2),
			aabb2 = new Thruster.Shapes.Aabb(3, 3),
			pos1, pos2, collides;
		
		// Not colliding
		pos1 = new Thruster.Shapes.Point2d(0, 0);
		pos2 = new Thruster.Shapes.Point2d(6, 6);
		collides = Thruster.Shapes.Collision.aabbWithAabb(aabb1, pos1, aabb2, pos2);
		assert.equal(collides, false, 'Detect correctly: No collision');
		
		// Boxes overlapping
		pos1 = new Thruster.Shapes.Point2d(0, 0);
		pos2 = new Thruster.Shapes.Point2d(1, 1);
		collides = Thruster.Shapes.Collision.aabbWithAabb(aabb1, pos1, aabb2, pos2);
		assert.equal(collides, true, 'Detect correctly: Overlapping shapes');
		
		// Edges touching
		pos1 = new Thruster.Shapes.Point2d(0, 0);
		pos2 = new Thruster.Shapes.Point2d(2, 0);
		collides = Thruster.Shapes.Collision.aabbWithAabb(aabb1, pos1, aabb2, pos2);
		assert.equal(collides, true, 'Detect correctly: Edges touching');
		
		// Boxes overlapping
		pos1 = new Thruster.Shapes.Point2d(0, 0);
		pos2 = new Thruster.Shapes.Point2d(2, 2);
		collides = Thruster.Shapes.Collision.aabbWithAabb(aabb1, pos1, aabb2, pos2);
		assert.equal(collides, true, 'Detect correctly: Corners touching');
		
		// Box 1 inside box 2
		pos1 = new Thruster.Shapes.Point2d(0, 0);
		pos2 = new Thruster.Shapes.Point2d(0.5, 0.5);
		collides = Thruster.Shapes.Collision.aabbWithAabb(aabb1, pos1, aabb2, pos2);
		assert.equal(collides, true, 'Detect correctly: Box 1 inside box 2');
		
		// Box 2 inside box 1
		pos1 = new Thruster.Shapes.Point2d(0, 0);
		pos2 = new Thruster.Shapes.Point2d(0.5, 0.5);
		collides = Thruster.Shapes.Collision.aabbWithAabb(aabb2, pos2, aabb1, pos1);
		assert.equal(collides, true, 'Detect correctly: Box 2 inside box 1');
	});
	
	QUnit.test('aabbWithPoint()', function(assert){
		var aabb = new Thruster.Shapes.Aabb(2, 2),
			aabbPos, point, collides;
		
		// Not colliding
		aabbPos = new Thruster.Shapes.Point2d(1, 1);
		point = new Thruster.Shapes.Point2d(5, 5);
		collides = Thruster.Shapes.Collision.aabbWithPoint(aabb, aabbPos, point);
		assert.equal(collides, false, 'Detect correctly: No collision');
		
		// Point within box
		aabbPos = new Thruster.Shapes.Point2d(1, 1);
		point = new Thruster.Shapes.Point2d(2, 2);
		collides = Thruster.Shapes.Collision.aabbWithPoint(aabb, aabbPos, point);
		assert.equal(collides, true, 'Detect correctly: Point within box');
		
		// Point on edge of box
		aabbPos = new Thruster.Shapes.Point2d(1, 1);
		point = new Thruster.Shapes.Point2d(3, 2);
		collides = Thruster.Shapes.Collision.aabbWithPoint(aabb, aabbPos, point);
		assert.equal(collides, true, 'Detect correctly: Point on edge of box');
		
		// Point on corner of box
		aabbPos = new Thruster.Shapes.Point2d(1, 1);
		point = new Thruster.Shapes.Point2d(3, 3);
		collides = Thruster.Shapes.Collision.aabbWithPoint(aabb, aabbPos, point);
		assert.equal(collides, true, 'Detect correctly: Point on corner of box');
	});
	
	QUnit.test('circleWithCircle()', function(assert){
		var circle1 = new Thruster.Shapes.Circle(2),
			circle2 = new Thruster.Shapes.Circle(3),
			pos1, pos2, collides;
		
		// Not colliding
		pos1 = new Thruster.Shapes.Point2d(0, 0);
		pos2 = new Thruster.Shapes.Point2d(10, 10);
		collides = Thruster.Shapes.Collision.circleWithCircle(circle1, pos1, circle2, pos2);
		assert.equal(collides, false, 'Detect correctly: No collision');
		
		// Not colliding, but within AABB
		pos1 = new Thruster.Shapes.Point2d(0, 0);
		pos2 = new Thruster.Shapes.Point2d(3, 4.5);
		collides = Thruster.Shapes.Collision.circleWithCircle(circle1, pos1, circle2, pos2);
		assert.equal(collides, false, 'Detect correctly: No collision, but within each other\'s AABB');
		
		// Edges touching
		pos1 = new Thruster.Shapes.Point2d(0, 0);
		pos2 = new Thruster.Shapes.Point2d(3, 4);
		collides = Thruster.Shapes.Collision.circleWithCircle(circle1, pos1, circle2, pos2);
		assert.equal(collides, true, 'Detect correctly: Circle edges touching');
		
		// Circles overlapping
		pos1 = new Thruster.Shapes.Point2d(0, 0);
		pos2 = new Thruster.Shapes.Point2d(0, 3);
		collides = Thruster.Shapes.Collision.circleWithCircle(circle1, pos1, circle2, pos2);
		assert.equal(collides, true, 'Detect correctly: Circles overlapping');
		
		// Circle 1 entirely within circle 2
		pos1 = new Thruster.Shapes.Point2d(0, 0);
		pos2 = new Thruster.Shapes.Point2d(0, 0);
		collides = Thruster.Shapes.Collision.circleWithCircle(circle1, pos1, circle2, pos2);
		assert.equal(collides, true, 'Detect correctly: Circle 1 within circle 2');
		
		// Circle 2 entirely within circle 1
		pos1 = new Thruster.Shapes.Point2d(0, 0);
		pos2 = new Thruster.Shapes.Point2d(0, 0);
		collides = Thruster.Shapes.Collision.circleWithCircle(circle2, pos2, circle1, pos1);
		assert.equal(collides, true, 'Detect correctly: Circle 2 within circle 1');
	});
	
	QUnit.test('circleWithPolygon()', function(assert){
		var polyVerts = [
	        new Thruster.Shapes.Point2d(-3, -3),
	        new Thruster.Shapes.Point2d( 3, -3),
	        new Thruster.Shapes.Point2d( 3,  3),
	        new Thruster.Shapes.Point2d(-3,  3),
	    ],
		polygon = new Thruster.Shapes.Polygon(polyVerts),
		circle = new Thruster.Shapes.Circle(2),
	    polygonPos, circlePos, collides;
		
		// Not colliding
		polygonPos = new Thruster.Shapes.Point2d(0, 0);
		circlePos = new Thruster.Shapes.Point2d(6, 6);
		collides = Thruster.Shapes.Collision.circleWithPolygon(circle, circlePos, polygon, polygonPos, 0);
		assert.equal(collides, false, 'Detect correctly: No collision');
		
		// Not colliding, but circle's AABB would collide
		polygonPos = new Thruster.Shapes.Point2d(0, 0);
		circlePos = new Thruster.Shapes.Point2d(4.8, 4.8);
		collides = Thruster.Shapes.Collision.circleWithPolygon(circle, circlePos, polygon, polygonPos, 0);
		assert.equal(collides, false, 'Detect correctly: No collision, but circle\'s AABB would collide');
		
		// Circle entirely within polygon
		polygonPos = new Thruster.Shapes.Point2d(0, 0);
		circlePos = new Thruster.Shapes.Point2d(0, 0);
		collides = Thruster.Shapes.Collision.circleWithPolygon(circle, circlePos, polygon, polygonPos, 0);
		assert.equal(collides, true, 'Detect correctly: Circle entirely within polygon');
		
		// Polygon entirely within circle
		circle.radius = 10;
		polygonPos = new Thruster.Shapes.Point2d(0, 0);
		circlePos = new Thruster.Shapes.Point2d(0, 0);
		collides = Thruster.Shapes.Collision.circleWithPolygon(circle, circlePos, polygon, polygonPos, 0);
		assert.equal(collides, true, 'Detect correctly: Polygon entirely within circle');
	});
	
	QUnit.test('pointWithCircle()', function(assert){
		var circle = new Thruster.Shapes.Circle(3),
			point, circlePos, collides;
		
		// Not colliding
		circlePos = new Thruster.Shapes.Point2d(0, 0);
		point = new Thruster.Shapes.Point2d(10, 10);
		collides = Thruster.Shapes.Collision.pointWithCircle(point, circle, circlePos);
		assert.equal(collides, false, 'Detect correctly: No collision');
		
		// Not colliding, but within circle's AABB
		circlePos = new Thruster.Shapes.Point2d(0, 0);
		point = new Thruster.Shapes.Point2d(2.9, 2.9);
		collides = Thruster.Shapes.Collision.pointWithCircle(point, circle, circlePos);
		assert.equal(collides, false, 'Detect correctly: No collision, point within circle\'s AABB');
		
		// Point within circle
		circlePos = new Thruster.Shapes.Point2d(0, 0);
		point = new Thruster.Shapes.Point2d(0, 0);
		collides = Thruster.Shapes.Collision.pointWithCircle(point, circle, circlePos);
		assert.equal(collides, true, 'Detect correctly: Point within circle');
		
		// Point on circle's edge
		circlePos = new Thruster.Shapes.Point2d(0, 3);
		point = new Thruster.Shapes.Point2d(0, 0);
		collides = Thruster.Shapes.Collision.pointWithCircle(point, circle, circlePos);
		assert.equal(collides, true, 'Detect correctly: Point on circle\'s edge');
	});
	
	QUnit.test('pointWithPolygon()', function(assert){
		var polyVerts = [
		        new Thruster.Shapes.Point2d(-3, -3),
		        new Thruster.Shapes.Point2d( 3, -3),
		        new Thruster.Shapes.Point2d( 3,  3),
		        new Thruster.Shapes.Point2d(-3,  3),
		    ],
			poly = new Thruster.Shapes.Polygon(polyVerts),
		    polyPos, point, collides;
		
		// Not colliding
		polyPos = new Thruster.Shapes.Point2d(0, 0),
	    point = new Thruster.Shapes.Point2d(0, 10);
		collides = Thruster.Shapes.Collision.pointWithPolygon(point, poly, polyPos, 0);
		assert.equal(collides, false, 'Detect correctly: No collision.');
		
		// Point within polygon
		polyPos = new Thruster.Shapes.Point2d(0, 0),
	    point = new Thruster.Shapes.Point2d(1, 1);
		collides = Thruster.Shapes.Collision.pointWithPolygon(point, poly, polyPos, 0);
		assert.equal(collides, true, 'Detect correctly: Point within polygon.');
		
		// Point touching polygon
		polyPos = new Thruster.Shapes.Point2d(0, 0),
	    point = new Thruster.Shapes.Point2d(3, 3);
		collides = Thruster.Shapes.Collision.pointWithPolygon(point, poly, polyPos, 0);
		assert.equal(collides, true, 'Detect correctly: Point touching polygon.');
		
		// Point within rotated polygon
		polyPos = new Thruster.Shapes.Point2d(0, 0),
	    point = new Thruster.Shapes.Point2d(0, 3.5);
		collides = Thruster.Shapes.Collision.pointWithPolygon(point, poly, polyPos, Math.PI / 4);
		assert.equal(collides, true, 'Detect correctly: Point within rotated polygon.');
		
		// Point outside rotated polygon
		polyPos = new Thruster.Shapes.Point2d(0, 0),
	    point = new Thruster.Shapes.Point2d(3, 3);
		collides = Thruster.Shapes.Collision.pointWithPolygon(point, poly, polyPos, Math.PI / 4);
		assert.equal(collides, false, 'Detect correctly: Point outside rotated polygon.');
	});
	
	QUnit.test('polygonWithPolygon()', function(assert){
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
		    pos1, pos2, collides;
		
		// Not colliding
		pos1 = new Thruster.Shapes.Point2d(0, 0),
	    pos2 = new Thruster.Shapes.Point2d(0, 10);
		collides = Thruster.Shapes.Collision.polygonWithPolygon(poly1, pos1, 0, poly2, pos2, 0);
		assert.equal(collides, false, 'Detect correctly: No collision.');
		
		// Edge overlap
		pos1 = new Thruster.Shapes.Point2d(0, 0),
	    pos2 = new Thruster.Shapes.Point2d(1, 1);
		collides = Thruster.Shapes.Collision.polygonWithPolygon(poly1, pos1, 0, poly2, pos2, 0);
		assert.equal(collides, true, 'Detect correctly: Edge overlap collision.');
		
		// Shape 2 entirely within shape 1
		pos1 = new Thruster.Shapes.Point2d(0, 0),
	    pos2 = new Thruster.Shapes.Point2d(0, 0);
		collides = Thruster.Shapes.Collision.polygonWithPolygon(poly1, pos1, 0, poly2, pos2, 0);
		assert.equal(collides, true, 'Detect correctly: Shape 2 entirely within shape 1.');
		
		// Shape 1 entirely within shape 2
		pos1 = new Thruster.Shapes.Point2d(0, 0),
	    pos2 = new Thruster.Shapes.Point2d(0, 0);
		collides = Thruster.Shapes.Collision.polygonWithPolygon(poly2, pos2, 0, poly1, pos1, 0);
		assert.equal(collides, true, 'Detect correctly: Shape 1 entirely within shape 2.');
		
		// Shape 2 rotated into collision
		pos1 = new Thruster.Shapes.Point2d(0, 0),
	    pos2 = new Thruster.Shapes.Point2d(0, 5.5);
		collides = Thruster.Shapes.Collision.polygonWithPolygon(poly1, pos1, 0, poly2, pos2, Math.PI / 4);
		assert.equal(collides, true, 'Detect correctly: Shape 2 rotated into collision.');
		
		// Both shapes rotated
		pos1 = new Thruster.Shapes.Point2d(0, 0),
	    pos2 = new Thruster.Shapes.Point2d(0, 6);
		collides = Thruster.Shapes.Collision.polygonWithPolygon(poly1, pos1, Math.PI / 4, poly2, pos2, Math.PI / 4);
		assert.equal(collides, true, 'Detect correctly: Both shapes rotated into collision.');
	});
})();
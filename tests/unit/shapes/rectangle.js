(function(){
	'use strict';
	QUnit.module('thruster.shapes.Rectangle');
	
	QUnit.test('Constructor', function(assert){
		var rect = new thruster.shapes.Rectangle(40, 30, 20, 10),
			expectedVertices = [
	            new thruster.shapes.Point2d(-20, -10),
	            new thruster.shapes.Point2d(20, -10),
	            new thruster.shapes.Point2d(20, 20),
	            new thruster.shapes.Point2d(-20, 20)
	        ];
		
		assert.propEqual(rect.getVertices(), expectedVertices, 'Comstructed polygon has correct vertex positions.');
	});
})();
(function(){
	'use strict';
	QUnit.module('thruster.shapes.Circle');
	
	QUnit.test('area()', function(assert){
		var circle = new thruster.shapes.Circle(5);
		
		assert.equal(circle.area(), 25 * Math.PI, 'Returned value is correct.');
	});
	
	QUnit.test('perimeter()', function(assert){
		var circle = new thruster.shapes.Circle(5);
		
		assert.equal(circle.perimeter(), 10 * Math.PI, 'Returned value is correct.')
	});
})();
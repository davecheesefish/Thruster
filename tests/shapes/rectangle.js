QUnit.module('Thruster.Shapes.Rectangle');

QUnit.test('Constructor, with all parameters supplied', function(assert){
	var rect = new Thruster.Shapes.Rectangle(1, 2, 3, 4, 5, 6, 7);
	
	assert.equal(rect.x, 1, 'x property set correctly.');
	assert.equal(rect.y, 2, 'y property set correctly.');
	assert.equal(rect.width, 3, 'width property set correctly.');
	assert.equal(rect.height, 4, 'height property set correctly.');
	assert.equal(rect.angle, 5, 'angle property set correctly.');
	assert.equal(rect.originX, 6, 'originX property set correctly.');
	assert.equal(rect.originY, 7, 'originY property set correctly.');
});

QUnit.test('Constructor, excluding optional parameters', function(assert){
	var rect = new Thruster.Shapes.Rectangle(1, 2, 3, 4);
	
	assert.equal(rect.x, 1, 'x property set correctly.');
	assert.equal(rect.y, 2, 'y property set correctly.');
	assert.equal(rect.width, 3, 'width property set correctly.');
	assert.equal(rect.height, 4, 'height property set correctly.');
	assert.equal(rect.angle, 0, 'angle property defaulted correctly.');
	assert.equal(rect.originX, 0, 'originX property defaulted correctly.');
	assert.equal(rect.originY, 0, 'originY property defaulted correctly.');
});
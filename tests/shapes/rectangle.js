QUnit.module('Thruster.Shapes.Rectangle');

QUnit.test('Constructor, with all parameters supplied', function(assert){
	var rect = new Thruster.Shapes.Rectangle(1, 2, 3, 4, 5, 6, 7);
	
	assert.equal(rect.x, 1, 'x property set correctly.');
	assert.equal(rect.y, 2, 'y property set correctly.');
	assert.equal(rect.width, 3, 'width property set correctly.');
	assert.equal(rect.height, 4, 'height property set correctly.');
	assert.equal(rect.angle, 5, 'angle property set correctly.');
	assert.equal(rect.origin.x, 6, 'originX property set correctly.');
	assert.equal(rect.origin.y, 7, 'originY property set correctly.');
});

QUnit.test('Constructor, excluding optional parameters', function(assert){
	var rect = new Thruster.Shapes.Rectangle(1, 2, 3, 4);
	
	assert.equal(rect.x, 1, 'x property set correctly.');
	assert.equal(rect.y, 2, 'y property set correctly.');
	assert.equal(rect.width, 3, 'width property set correctly.');
	assert.equal(rect.height, 4, 'height property set correctly.');
	assert.equal(rect.angle, 0, 'angle property defaulted correctly.');
	assert.equal(rect.origin.x, 0, 'originX property defaulted correctly.');
	assert.equal(rect.origin.y, 0, 'originY property defaulted correctly.');
});

QUnit.test('getVertices(), straight rectangle', function(assert){
	// Get vertices of an unrotated rectangle.
	var rect = new Thruster.Shapes.Rectangle(1, 2, 3, 4, 0, 0, 0),
		vertices = rect.getVertices(),
		expectedVertices = [
            new Thruster.Shapes.Point2d(1, 2),
            new Thruster.Shapes.Point2d(4, 2),
            new Thruster.Shapes.Point2d(4, 6),
            new Thruster.Shapes.Point2d(1, 6)
        ];
	
	assert.propEqual(vertices, expectedVertices, 'Function returns correct vertex positions.');
});

QUnit.test('getVertices(), straight rectangle with shifted origin', function(assert){
	// Get vertices of an unrotated rectangle with an origin which is not (0, 0).
	var rect = new Thruster.Shapes.Rectangle(1, 2, 3, 4, 0, 1, 2),
		vertices = rect.getVertices(),
		expectedVertices = [
            new Thruster.Shapes.Point2d(0, 0),
            new Thruster.Shapes.Point2d(3, 0),
            new Thruster.Shapes.Point2d(3, 4),
            new Thruster.Shapes.Point2d(0, 4)
        ];
	
	assert.propEqual(vertices, expectedVertices, 'Function returns correct vertex positions.');
});

QUnit.test('getVertices(), rotated rectangle', function(assert){
	// Get vertices of a rotated rectangle.
	var rect = new Thruster.Shapes.Rectangle(1, 2, 3, 4, Math.PI / 4, 0, 0),
		vertices = rect.getVertices(),
		expectedVertices = [
            new Thruster.Shapes.Point2d(1, 2),
            new Thruster.Shapes.Point2d(3.121320343559643, 4.121320343559642),
            new Thruster.Shapes.Point2d(0.2928932188134523, 6.949747468305833),
            new Thruster.Shapes.Point2d(-1.8284271247461898, 4.82842712474619)
        ];
	
	assert.propEqual(vertices, expectedVertices, 'Function returns correct vertex positions.');
});

QUnit.test('getVertices(), rotated rectangle with shifted origin', function(assert){
	// Get vertices of a rotated rectangle with an origin which is not (0, 0).
	var rect = new Thruster.Shapes.Rectangle(1, 2, 3, 4, Math.PI / 4, 1, 2),
		vertices = rect.getVertices(),
		expectedVertices = [
            new Thruster.Shapes.Point2d(2.7071067811865475, 1.8786796564403576),
            new Thruster.Shapes.Point2d(4.82842712474619, 4),
            new Thruster.Shapes.Point2d(2, 6.82842712474619),
            new Thruster.Shapes.Point2d(-0.12132034355964239, 4.707106781186548)
        ];
	
	assert.propEqual(vertices, expectedVertices, 'Function returns correct vertex positions.');
});
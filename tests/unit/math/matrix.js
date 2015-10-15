(function(undefined){
	'use strict';
	QUnit.module('thruster.math.Matrix');
	
	QUnit.test('Constructor(Number[][])', function(assert){
		var matrix, expectedValues;
		
		// 2x2 matrix
		matrix = new thruster.math.Matrix([
			[1, 2],
			[3, 4]
		]);
		
		expectedValues = [
		    [1, 2],
		    [3, 4]
		];
		assert.deepEqual(matrix.values, expectedValues, '2x2 matrix constructed correctly.');
		
		// 3x3 matrix
		matrix = new thruster.math.Matrix([
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9]
		]);
		
		expectedValues = [
		    [1, 2, 3],
		    [4, 5, 6],
		    [7, 8, 9]
		];
		assert.deepEqual(matrix.values, expectedValues, '3x3 matrix constructed correctly.');
		
		// 3x2 matrix
		matrix = new thruster.math.Matrix([
			[1, 2],
			[3, 4],
			[5, 6]
		]);
		
		expectedValues = [
		    [1, 2],
		    [3, 4],
		    [5, 6]
		];
		assert.deepEqual(matrix.values, expectedValues, '3x2 matrix constructed correctly.');
	});
	
	QUnit.test('Constructor(Number, Number, ...Number)', function(assert){
		var matrix, expectedValues;
		
		// 2x2 matrix
		matrix = new thruster.math.Matrix(2, 2,
			1, 2,
			3, 4
		);
		
		expectedValues = [
		    [1, 2],
		    [3, 4]
		];
		assert.deepEqual(matrix.values, expectedValues, '2x2 matrix constructed correctly.');
		
		// 3x3 matrix
		matrix = new thruster.math.Matrix(3, 3,
			1, 2, 3,
			4, 5, 6,
			7, 8, 9
		);
		
		expectedValues = [
		    [1, 2, 3],
		    [4, 5, 6],
		    [7, 8, 9]
		];
		assert.deepEqual(matrix.values, expectedValues, '3x3 matrix constructed correctly.');
		
		// 3x2 matrix
		matrix = new thruster.math.Matrix(2, 3,
			1, 2,
			3, 4,
			5, 6
		);
		
		expectedValues = [
		    [1, 2],
		    [3, 4],
		    [5, 6]
		];
		assert.deepEqual(matrix.values, expectedValues, '3x2 matrix constructed correctly.');
	});
	
	QUnit.test('static identity()', function(assert){
		var matrix, expectedResult;
		
		// 2x2 identity matrix
		matrix = thruster.math.Matrix.identity(2);
		expectedResult = [
			[1, 0],
			[0, 1]
		];
		assert.deepEqual(matrix.values, expectedResult, '2x2 identity matrix is produced correctly.');
		
		// 3x3 identity matrix
		matrix = thruster.math.Matrix.identity(3);
		expectedResult = [
			[1, 0, 0],
			[0, 1, 0],
			[0, 0, 1]
		];
		assert.deepEqual(matrix.values, expectedResult, '3x3 identity matrix is produced correctly.');
		
		// 10x10 identity matrix, because why not?
		matrix = thruster.math.Matrix.identity(10);
		expectedResult = [
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
		];
		assert.deepEqual(matrix.values, expectedResult, '10x10 identity matrix is produced correctly.');
	});
	
	QUnit.test('static rotation()', function(assert){
		var angle, matrix, expectedResult;
		
		// Acute angle
		angle = Math.PI / 6;
		matrix = thruster.math.Matrix.rotation(angle);
		expectedResult = [
            [Math.cos(angle), -Math.sin(angle), 0],
            [Math.sin(angle),  Math.cos(angle), 0],
            [               0,               0, 1],
        ];
		assert.deepEqual(matrix.values, expectedResult, 'Acute angle: Created matrix values are correct.');
		
		// Obtuse angle
		angle = Math.PI * 0.75;
		matrix = thruster.math.Matrix.rotation(angle);
		expectedResult = [
            [Math.cos(angle), -Math.sin(angle), 0],
            [Math.sin(angle),  Math.cos(angle), 0],
            [               0,               0, 1],
        ];
		assert.deepEqual(matrix.values, expectedResult, 'Obtuse angle: Created matrix values are correct.');
		
		// Reflex angle
		angle = Math.PI * 1.5;
		matrix = thruster.math.Matrix.rotation(angle);
		expectedResult = [
            [Math.cos(angle), -Math.sin(angle), 0],
            [Math.sin(angle), Math.cos(angle), 0],
            [               0,               0, 1],
        ];
		assert.deepEqual(matrix.values, expectedResult, 'Reflex angle: Created matrix values are correct.');
		
		// Negative angle
		angle = -Math.PI;
		matrix = thruster.math.Matrix.rotation(angle);
		expectedResult = [
            [Math.cos(angle), -Math.sin(angle), 0],
            [Math.sin(angle),  Math.cos(angle), 0],
            [               0,               0, 1],
        ];
		assert.deepEqual(matrix.values, expectedResult, 'Negative angle: Created matrix values are correct.');
	});
	
	QUnit.test('static scale()', function(assert){
		var matrix, expectedResult;
		
		matrix = thruster.math.Matrix.scale(6);
		expectedResult = [
            [6, 0, 0],
            [0, 6, 0],
            [0, 0, 1],
        ];
		assert.deepEqual(matrix.values, expectedResult, 'Created matrix values are correct.');
	});
	
	QUnit.test('static scaleXY()', function(assert){
		var matrix, expectedResult;
		
		matrix = thruster.math.Matrix.scaleXY(2, 3);
		expectedResult = [
            [2, 0, 0],
            [0, 3, 0],
            [0, 0, 1],
        ];
		assert.deepEqual(matrix.values, expectedResult, 'Created matrix values are correct.');
	});
	
	QUnit.test('static translation()', function(assert){
		var matrix, expectedResult;
		
		matrix = thruster.math.Matrix.translation(new thruster.math.Vector2d(2, 3));
		expectedResult = [
            [1, 0, 2],
            [0, 1, 3],
            [0, 0, 1],
        ];
		assert.deepEqual(matrix.values, expectedResult, 'Created matrix values are correct.');
	});
	
	QUnit.test('clone()', function(assert){
		var matrix, clonedMatrix;
		
		matrix = new thruster.math.Matrix([
   			[1, 2],
   			[3, 4],
   			[5, 6]
   		]);
		clonedMatrix = matrix.clone();
		
		assert.deepEqual(matrix, clonedMatrix, 'Cloned matrix has correct values.');
		
		// Change value in original matrix. This should not change in the clone.
		matrix.values[0][1] = 100;
		assert.notDeepEqual(matrix.values, clonedMatrix.values, 'Cloned matrix is separate from the original matrix.');
	});
	
	QUnit.test('determinant()', function(assert){
		var matrix;
		
		// 0x0 matrix
		matrix = new thruster.math.Matrix([]);
		assert.equal(matrix.determinant(), undefined, 'Empty matrix returns undefined.');
		
		// Non-square matrix
		matrix = new thruster.math.Matrix([
		     [7, 2]
		]);
		assert.equal(matrix.determinant(), undefined, 'Non-square matrix returns undefined.');
		
		// 1x1 matrix
		matrix = new thruster.math.Matrix([
		     [7]
		]);
		assert.equal(matrix.determinant(), 7, '1x1 matrix returns the correct value.');
		
		// 2x2 matrix
		matrix = new thruster.math.Matrix([
  		     [1, 2],
  		     [3, 4]
  		]);
  		assert.equal(matrix.determinant(), -2, '2x2 matrix returns the correct value.');
  		
  		// 3x3 matrix
		matrix = new thruster.math.Matrix([
  		     [1, 2, 3],
  		     [4, 5, 6],
  		     [7, 8, 9]
  		]);
  		assert.equal(matrix.determinant(), 0, '3x3 matrix returns the correct value.');
  		
  		// 4x4 matrix
		matrix = new thruster.math.Matrix([
  		     [ 8,  1,  8,  3],
  		     [10, 11, 12, 13],
  		     [20, 21,  8, 23],
  		     [30, 31, 32, 33]
  		]);
  		assert.equal(matrix.determinant(), 4480, '4x4 matrix returns the correct value.');
	});
	
	QUnit.test('getColumnCount()', function(assert){
		var matrix;
		
		// 2x1 matrix
		matrix = new thruster.math.Matrix([
  		     [1],
  		     [4]
  		]);
  		assert.equal(matrix.getColumnCount(), 1, '2x1 matrix returns 1.');
		
		// 3x2 matrix
		matrix = new thruster.math.Matrix([
   			[1, 2],
   			[3, 4],
   			[5, 6]
   		]);
		assert.equal(matrix.getColumnCount(), 2, '3x2 matrix returns 2.');
		
		// 2x3 matrix
		matrix = new thruster.math.Matrix([
		     [1, 2, 3],
		     [4, 5, 6]
		]);
		assert.equal(matrix.getColumnCount(), 3, '2x3 matrix returns 3.');
	});
	
	QUnit.test('getRowCount()', function(assert){
		var matrix;
		
		// 1x2 matrix
		matrix = new thruster.math.Matrix([
  		     [1, 4]
  		]);
  		assert.equal(matrix.getRowCount(), 1, '1x2 matrix returns 1.');
		
  		// 2x3 matrix
		matrix = new thruster.math.Matrix([
		     [1, 2, 3],
		     [4, 5, 6]
		]);
		assert.equal(matrix.getRowCount(), 2, '2x3 matrix returns 2.');
  		
		// 3x2 matrix
		matrix = new thruster.math.Matrix([
   			[1, 2],
   			[3, 4],
   			[5, 6]
   		]);
		assert.equal(matrix.getRowCount(), 3, '3x2 matrix returns 3.');
	});
	
	QUnit.test('inverse()', function(assert){
		var matrix, inverseMatrix, expectedValues;
		
		// 0x0 matrix
		matrix = new thruster.math.Matrix([]);
		inverseMatrix = matrix.inverse();
		assert.equal(inverseMatrix, undefined, 'Empty matrix returns undefined.');
		
		// Non-square matrix
		matrix = new thruster.math.Matrix([
		    [1, 2]
		]);
		inverseMatrix = matrix.inverse();
		assert.equal(inverseMatrix, undefined, 'Non-square matrix returns undefined.');
		
		// 1x1 matrix
		matrix = new thruster.math.Matrix([
		    [2]
		]);
		inverseMatrix = matrix.inverse();
		expectedValues = [
            [0.5]
        ];
		assert.deepEqual(inverseMatrix.values, expectedValues, '1x1 matrix returns the correct value.');
		
		// 2x2 matrix
		matrix = new thruster.math.Matrix([
  		     [2, 4],
  		     [3, 2]
  		]);
		inverseMatrix = matrix.inverse();
		expectedValues = [
		    [-0.25 ,  0.5 ],
		    [ 0.375, -0.25]
        ];
  		assert.deepEqual(inverseMatrix.values, expectedValues, '2x2 matrix returns the correct value.');
  		
  		// 3x3 matrix
		matrix = new thruster.math.Matrix([
  		    [16, 3, 4],
  		    [ 8, 2, 3],
  		    [ 9, 1, 1]
  		]);
		inverseMatrix = matrix.inverse();
		expectedValues = [
		    [ -1,   1,   1],
		    [ 19, -20, -16],
		    [-10,  11,   8]
	    ];
  		assert.deepEqual(inverseMatrix.values, expectedValues, '3x3 matrix returns the correct value.');
  		
  		// 4x4 matrix
		matrix = new thruster.math.Matrix([
  		    [16, 3, 4, 0],
  		    [ 8, 2, 3, 0],
  		    [ 9, 1, 1, 0],
  		    [ 0, 0, 0, 1]
  		]);
		inverseMatrix = matrix.inverse();
		expectedValues = [
  		    [ -1,   1,   1, 0],
  		    [ 19, -20, -16, 0],
  		    [-10,  11,   8, 0],
  		    [  0,   0,   0, 1]
  	    ];
  		assert.deepEqual(inverseMatrix.values, expectedValues, '4x4 matrix returns the correct value.');
  		
  		
  		// Transformation matrices
  		var transform, inverseTransform, reverse;
  		
  		// Rotation
  		transform = thruster.math.Matrix.rotation(Math.PI / 2);
  		inverseTransform = transform.inverse();
  		reverse = thruster.math.Matrix.rotation(-Math.PI / 2);
  		assert.deepEqual(inverseTransform.values, reverse.values, 'Rotation: Inverse transformation matrix has the opposite effect.');
  		
  		// Scale
  		transform = thruster.math.Matrix.scale(4);
  		inverseTransform = transform.inverse();
  		reverse = thruster.math.Matrix.scale(0.25);
  		assert.deepEqual(inverseTransform.values, reverse.values, 'Scale: Inverse transformation matrix has the opposite effect.');
  		
  		// Scale with negative factor
  		transform = thruster.math.Matrix.scale(-4);
  		inverseTransform = transform.inverse();
  		reverse = thruster.math.Matrix.scale(-0.25);
  		assert.deepEqual(inverseTransform.values, reverse.values, 'Scale (with a negative factor): Inverse transformation matrix has the opposite effect.');
  		
  		//ScaleXY
  		transform = thruster.math.Matrix.scaleXY(2, 4);
  		inverseTransform = transform.inverse();
  		reverse = thruster.math.Matrix.scaleXY(0.5, 0.25);
  		assert.deepEqual(inverseTransform.values, reverse.values, 'ScaleXY: Inverse transformation matrix has the opposite effect.');
  		
  		// Translation
  		transform = thruster.math.Matrix.translation(new thruster.math.Vector2d(-1, 2));
  		inverseTransform = transform.inverse();
  		reverse = thruster.math.Matrix.translation(new thruster.math.Vector2d(1, -2));
  		assert.deepEqual(inverseTransform.values, reverse.values, 'Translation: Inverse transformation matrix has the opposite effect.');
	});
	
	QUnit.test('multiply()', function(assert){
		var matrix1, matrix2, result, expectedResult;
		
		matrix1 = new thruster.math.Matrix([
		    [1, 2, 3],
		    [4, 5, 6]
		]);
		
		matrix2 = new thruster.math.Matrix([
		    [ 7,  8],
		    [ 9, 10],
		    [11, 12]
		]);
		
		result = matrix1.clone().multiply(matrix2);
		expectedResult = [
		    [ 58,  64],
		    [139, 154]
		];
		assert.deepEqual(result.values, expectedResult, 'Non-square matrices multiplied correctly.');
		
		// Square matrices
		matrix1 = new thruster.math.Matrix([
		    [1, 2, 3],
		    [4, 5, 6],
		    [7, 8, 9]
		]);
		
		matrix2 = new thruster.math.Matrix([
		    [10, 11, 12],
		    [13, 14, 15],
		    [16, 17, 18]
		]);
		
		result = matrix1.clone().multiply(matrix2);
		expectedResult = [
		    [ 84,  90,  96],
		    [201, 216, 231],
		    [318, 342, 366]
		];
		assert.deepEqual(result.values, expectedResult, 'Square matrices multiplied correctly.');
		
		// Multiplication with identity matrix
		matrix1 = new thruster.math.Matrix([
		    [1, 2, 3],
		    [4, 5, 6],
		    [7, 8, 9]
		]);
		
		matrix2 = new thruster.math.Matrix([
		    [1, 0, 0],
		    [0, 1, 0],  // Identity matrix
		    [0, 0, 1]
		]);
		
		result = matrix1.clone().multiply(matrix2);
		expectedResult = [
		    [1, 2, 3],
		    [4, 5, 6],
		    [7, 8, 9]
		];
		assert.deepEqual(result.values, expectedResult, 'Multiplying by the identity matrix produces no change.');
	});
	
	QUnit.test('multiplyByScalar()', function(assert){
		var matrix, result, expectedResult;
		
		matrix = new thruster.math.Matrix([
		    [1, 2],
		    [3, 4],
		    [5, 6]
		]);
		
		// Integer
		result = matrix.clone().multiplyByScalar(5);
		expectedResult = [
		    [ 5, 10],
		    [15, 20],
		    [25, 30]
		];
		assert.deepEqual(result.values, expectedResult, 'Matrix elements are correctly multiplied by an integer.');
		
		// Fractional value
		result = matrix.clone().multiplyByScalar(0.5);
		expectedResult = [
  		    [0.5, 1],
  		    [1.5, 2],
  		    [2.5, 3]
  		];
		assert.deepEqual(result.values, expectedResult, 'Matrix elements are correctly multiplied by a fractional value.');
	});
	
	QUnit.test('principalSubmatrix()', function(assert){
		var matrix, submatrix, expectedResult;
		
		// 2x2 matrix
		matrix = new thruster.math.Matrix([
   		    [1, 2],
		    [3, 4]
		]);
		submatrix = matrix.principalSubmatrix(0, 0);
		expectedResult = [
			[4]
		];
		assert.deepEqual(submatrix.values, expectedResult, '2x2 matrix produces the correct 1x1 submatrix.');
		
		// 3x3 matrix
		matrix = new thruster.math.Matrix([
   		    [1, 2, 3],
		    [4, 5, 6],
		    [7, 8, 9]
		]);
		submatrix = matrix.principalSubmatrix(1, 2);
		expectedResult = [
			[1, 2],
			[7, 8]
		];
		assert.deepEqual(submatrix.values, expectedResult, '3x3 matrix produces the correct 2x2 submatrix.');
		
		// 5x5 matrix
		matrix = new thruster.math.Matrix([
   		    [ 1,  2,  3,  4,  5],
		    [ 6,  7,  8,  9, 10],
		    [11, 12, 13, 14, 15],
		    [16, 17, 18, 19, 20],
		    [21, 22, 23, 24, 25]
		]);
		submatrix = matrix.principalSubmatrix(3, 4);
		expectedResult = [
			[ 1,  2,  3,  4],
			[ 6,  7,  8,  9],
			[11, 12, 13, 14],
			[21, 22, 23, 24]
		];
		assert.deepEqual(submatrix.values, expectedResult, '5x5 matrix produces the correct 4x4 submatrix.');
	});
})();
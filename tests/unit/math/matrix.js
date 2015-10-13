(function(){
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
		
		// 2x3 matrix
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
		assert.deepEqual(matrix.values, expectedValues, '2x3 matrix constructed correctly.');
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
		
		// 2x3 matrix
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
		assert.deepEqual(matrix.values, expectedValues, '2x3 matrix constructed correctly.');
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
	
	QUnit.test('getColumnCount()', function(assert){
		var matrix;
		
		// 1x2 matrix
		matrix = new thruster.math.Matrix([
  		     [1],
  		     [4]
  		]);
  		assert.equal(matrix.getColumnCount(), 1, '1x2 matrix returns 1.');
		
		// 2x3 matrix
		matrix = new thruster.math.Matrix([
   			[1, 2],
   			[3, 4],
   			[5, 6]
   		]);
		assert.equal(matrix.getColumnCount(), 2, '2x3 matrix returns 2.');
		
		// 3x2 matrix
		matrix = new thruster.math.Matrix([
		     [1, 2, 3],
		     [4, 5, 6]
		]);
		assert.equal(matrix.getColumnCount(), 3, '3x2 matrix returns 3.');
	});
	
	QUnit.test('getRowCount()', function(assert){
		var matrix;
		
		// 2x1 matrix
		matrix = new thruster.math.Matrix([
  		     [1, 4]
  		]);
  		assert.equal(matrix.getRowCount(), 1, '2x1 matrix returns 1.');
		
  		// 3x2 matrix
		matrix = new thruster.math.Matrix([
		     [1, 2, 3],
		     [4, 5, 6]
		]);
		assert.equal(matrix.getRowCount(), 2, '3x2 matrix returns 2.');
  		
		// 2x3 matrix
		matrix = new thruster.math.Matrix([
   			[1, 2],
   			[3, 4],
   			[5, 6]
   		]);
		assert.equal(matrix.getRowCount(), 3, '2x3 matrix returns 3.');
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
})();
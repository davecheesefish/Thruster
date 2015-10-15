define(function(){
	
	/**
	 * A mathematical matrix of numerical values.
	 * @class
	 * @memberof thruster.math
	 * @param {Number[][]} values An array of arrays of numbers, representing the rows of the matrix.
	 * @example
	 * // To create a 3x3 matrix:
	 * var matrix = new thruster.math.Matrix([
	 *     [1, 2, 3],
	 *     [4, 5, 6],
	 *     [7, 8, 9]
	 * ]);
	 *//**
	 * A mathematical matrix of numerical values.
	 * @class
	 * @memberof thruster.math
	 * @param {Number} columns   The number of columns in the matrix.
	 * @param {Number} rows      The number of rows in the matrix.
	 * @param {...Number} values The values to populate the matrix with, row by row.
	 * @example
	 * // To create a 3x3 matrix:
	 * var matrix = new thruster.math.Matrix(
	 *     3, 3,     // Width and height
	 *     1, 2, 3,  // Matrix values
	 *     4, 5, 6,
	 *     7, 8, 9
	 * );
	 */
	var Matrix = function(columns, rows, values){
		if (columns instanceof Array){
			// Matrix(Number[][])
			// Copy the array passed in to this.values.
			this.values = [];
			for (var i = 0; i < columns.length; i++){
				this.values.push(columns[i].slice(0));
			}
		} else if (arguments.length == columns * rows + 2){
			// Matrix(Number, Number, ...Number)
			// Arguments are a list of values. Convert into the proper format.
			this.values = [];
			
			// Get the values from the arguments array.
			var valuesIn = [];
			for (var i = 2; i < arguments.length; i++){
				valuesIn.push(arguments[i]);
			}
			
			var row;
			for (var rowNo = 0; rowNo < rows; rowNo++){
				row = [];
				for (var colNo = 0; colNo < columns; colNo++){
					row.push(valuesIn[rowNo * columns + colNo]);
				}
				// Push a copy of the row array so it's not wiped out on the next loop.
				this.values.push(row.slice(0));
			}
		} else {
			// Matrix(), used only for extending this class
			this.values = [];
		}
	};
	
	/**
	 * Returns a new size x size identity matrix, I.
	 * @public
	 * @static
	 * @param {Number} size The number of rows and columns in the matrix.
	 * @returns {thruster.math.Matrix}
	 */
	Matrix.identity = function(size){
		var values = [];
		
		for (var rowNo = 0; rowNo < size; rowNo++){
			values[rowNo] = [];
			for (var colNo = 0; colNo < size; colNo++){
				values[rowNo][colNo] = (rowNo == colNo ? 1 : 0);
			}
		}
		
		return new Matrix(values);
	};
	
	/**
	 * Creates a new rotation transformation matrix.
	 * @public
	 * @static
	 * @param {Number} angle The angle of rotation, in radians from the positive x axis towards the positive y axis.
	 * @returns {thruster.math.Matrix}
	 */
	Matrix.rotation = function(angle){
		var c = Math.cos(angle),
			s = Math.sin(angle);
		
		return new Matrix([
   		    [c, -s, 0],
   		    [s,  c, 0],
   		    [ 0, 0, 1]
   		]);
	};
	
	/**
	 * Creates a new scale transformation matrix.
	 * @public
	 * @static
	 * @param {Number} scaleFactor The scale factor of the transformation.
	 * @returns {thruster.math.Matrix}
	 */
	Matrix.scale = function(scaleFactor){
		return Matrix.scaleXY(scaleFactor, scaleFactor);
	};
	
	/**
	 * Creates a new non-uniform scale transformation matrix.
	 * @public
	 * @static
	 * @param {Number} scaleFactorX The scale factor of the transformation in the x direction.
	 * @param {Number} scaleFactorY The scale factor of the transformation in the y direction.
	 * @returns {thruster.math.Matrix}
	 */
	Matrix.scaleXY = function(scaleFactorX, scaleFactorY){
		return new Matrix([
		    [scaleFactorX,            0, 0],
		    [           0, scaleFactorY, 0],
		    [           0,            0, 1]
		]);
	};
	
	/**
	 * Creates a new translation transformation matrix.
	 * @public
	 * @static
	 * @param {thruster.math.Vector2d} translationVector The vector to translate by.
	 * @returns {thruster.math.Matrix}
	 */
	Matrix.translation = function(translationVector){
		return new Matrix([
		    [1, 0, translationVector.x],
		    [0, 1, translationVector.y],
		    [0, 0,                   1]
		]);
	};
	
	/**
	 * Uses Laplace expansion to calculate the determinant of this matrix.
	 * @public
	 * @returns {(Number|undefined)} The determinant of this matrix. If this is not a square matrix
	 * this function returns undefined.
	 */
	Matrix.prototype.determinant = function(){
		var matrixSize = this.getRowCount();
		
		// Check it's a square matrix
		if (matrixSize != this.getColumnCount()){
			return;
		}
		
		// The default case could be used on all matrices (excluding an ampty matrix, which
		// returns 1), but 1x1, 2x2 and 3x3 matrices are specified separately for optimization.
		switch (matrixSize){
		case 0:
			// Determinant of a 0x0 empty matrix varies by source, but is widely held to be 1.
			// This makes sense, as following the default case on a 1x1 matrix would otherwise
			// be undefined.
			return 1;
			
		case 1:
			// Determinant of a 1x1 matrix is the element itself.
			return this.values[0][0];
			
		case 2:
			// Determinant of a 2x2 matrix is a * d - b * c.
			return this.values[0][0] * this.values[1][1] - this.values[0][1] * this.values[1][0];
			
		case 3:
			// Determinant of a 3x3 matrix is a(e * i - f * h) - b(d * i - f * g) + c(d * h - e * g).
			var val = this.values;
			return val[0][0] * (val[1][1] * val[2][2] - val[1][2] * val[2][1]) -
				   val[0][1] * (val[1][0] * val[2][2] - val[1][2] * val[2][0]) +
				   val[0][2] * (val[1][0] * val[2][1] - val[1][1] * val[2][0]);
			
		default:
			// Determinant of a larger matrix is based on the determinants of submatrices.
			// See https://en.wikipedia.org/wiki/Laplace_expansion
			var determinant, submatrix, a;
		
			determinant = 0;
			a = 1; // a is a value that flips between 1 and -1.
			// Loop through the elements of the first row...
			for (var i = 0; i < matrixSize; i++){
				// Get the submatrix excluding the first row and the column we are currently looking at.
				submatrix = this.principalSubmatrix(0, i);
				// Find the determinant of that submatrix, multiply by the i-th element in the first
				// row and alternately add/subtract to/from the total.
				determinant += a * this.values[0][i] * submatrix.determinant();
				
				a = (a == 1 ? -1 : 1);
			}
			
			return determinant;
		}
	};
	
	/**
	 * Creates a copy of this matrix.
	 * @public
	 * @returns {thruster.math.Matrix}
	 */
	Matrix.prototype.clone = function(){
		var values = [];
		
		for (var i in this.values){
			values.push(this.values[i].slice(0));
		}
		
		return new Matrix(values);
	};
	
	/**
	 * Returns the number of columns in this matrix.
	 * @public
	 * @returns {Number}
	 */
	Matrix.prototype.getColumnCount = function(){
		// If we have at least 1 row return the length of it, otherwise zero.
		return (this.values.length ? this.values[0].length : 0);
	};
	
	/**
	 * Returns the number of rows in this matrix.
	 * @public
	 * @returns {Number}
	 */
	Matrix.prototype.getRowCount = function(){
		return this.values.length;
	};
	
	/**
	 * Returns the inverse of this matrix. Applying the inverse of a transformation matrix will
	 * undo the effects of the original matrix.
	 * @public
	 * @returns {(thruster.math.Matrix|undefined)} A new inverted matrix. This function returns
	 * undefined if the matrix cannot be inverted.
	 */
	Matrix.prototype.inverse = function(){
		var determinant = this.determinant();
		
		// If the determinant is 0 or undefined, there is no inverse matrix.
		if (determinant === 0 || typeof determinant == 'undefined'){
			return;
		}
		
		var matrixSize = this.getRowCount();
		
		switch (matrixSize){
		case 0:
			return new Matrix([]);
		case 1:
			// Inverse is just a 1x1 matrix containing the reciprocal of its only element.
			return new Matrix([
			    [1 / this.values[0][0]]
			]);
			
		case 2:
			// Inverse is a rearrangement of the elements, multiplied by the reciprocal of the
			// determinant.
			return new Matrix([
   			    [ this.values[1][1], -this.values[0][1]],
   			    [-this.values[1][0],  this.values[0][0]]
   			]).multiplyByScalar(1 / determinant);
			
		default:
			var rowNo, colNo, adjugate, adjugateValues;
			
			// Calculate the matrix of cofactors.
			adjugateValues = [];
			
			// Create the rows of the matrix.
			for (rowNo = 0; rowNo < matrixSize; rowNo++){
				adjugateValues[rowNo] = [];
			}
			
			// Loop through the rows and columns of this matrix...
			for (rowNo = 0; rowNo < matrixSize; rowNo++){
				for (colNo = 0; colNo < matrixSize; colNo++){
					// Each element is the determinant of this matrix excluding the current row
					// and column, transposed so the row and column numbers are switched.
					adjugateValues[colNo][rowNo] = this.principalSubmatrix(rowNo, colNo).determinant();
					
					// We currently have a matrix of minors. To turn it into a matrix of cofactors,
					// multiply each element by -1 ^ (rowNo + colNo)
					adjugateValues[colNo][rowNo] *= Math.pow(-1, rowNo + colNo);
				}
			}
			adjugate = new Matrix(adjugateValues);
			
			// Finally, to get the inverted matrix, multiply by the reciprocal of the determinant of
			// the original matrix.
			adjugate.multiplyByScalar(1 / determinant);
			
			return adjugate;
		}
	};
	
	/**
	 * Post-multiplies this matrix by another matrix. The column count of the provided matrix must
	 * be equal to the row count of this matrix. To multiply by a scalar value, use
	 * {@link thruster.math.Matrix#multiplyByScalar}.
	 * @public
	 * @param {thruster.math.Matrix} other The other matrix to multiply by.
	 * @returns {thruster.math.Matrix} This matrix, to allow chaining.
	 */
	Matrix.prototype.multiply = function(other){
		var rows, cols, row, col;
		
		// Resulting matrix will be other.columns wide by this.rows tall.
		rows = this.getRowCount();
		cols = other.getColumnCount();
		
		var result = [],
			resultRow,
			dot;
		// For each row in the result matrix...
		for (row = 0; row < rows; row++){
			resultRow = [];
			// For each column in the result matrix...
			for (col = 0; col < cols; col++){
				// Get the dot product of this matrix's matching row with the other matrix's matching column.
				dot = 0;
				for (var i = 0; i < this.getColumnCount(); i++){
					dot += this.values[row][i] * other.values[i][col];
				}
				resultRow.push(dot);
			}
			// Copy the row array to avoid it being destroyed in the next loop around.
			result.push(resultRow.slice(0));
		}
		
		this.values = result;
		
		return this;
	};
	
	/**
	 * Multiplies this matrix by a scalar value.
	 * @public
	 * @param {Number} scalar The scalar value to multiply by.
	 * @returns {thruster.math.Matrix} This matrix, to allow chaining.
	 */
	Matrix.prototype.multiplyByScalar = function(scalar){
		var rows, cols, row, col;
		
		// Multiply each value in the matrix by the scalar.
		rows = this.getRowCount();
		cols = this.getColumnCount();
		
		for (row = 0; row < rows; row++){
			for (col = 0; col < cols; col++){
				this.values[row][col] *= scalar;
			}
		}
		
		return this;
	};
	
	/**
	 * Returns a copy of this matrix with the specified row and column omitted. Consequently, the
	 * new matrix will be one row and one column smaller than the original.
	 * @public
	 * @param {Number} omitRow    The index of the row to remove.
	 * @param {Number} omitColumn The index of the column to remove.
	 * @returns {thruster.math.matrix}
	 */
	Matrix.prototype.principalSubmatrix = function(omitRow, omitColumn){
		var rows, columns, rowNo, colNo, newRow, values;
		
		rows = this.getRowCount();
		columns = this.getColumnCount();
		
		values = [];
		// Loop through the rows of this matrix...
		for (rowNo = 0; rowNo < rows; rowNo++){
			// If we're on the row to omit, don't add it.
			if (rowNo == omitRow){
				continue;
			}
			
			// Otherwise create a new empty matrix row.
			newRow = [];
			
			// Loop through the columns in this row...
			for (colNo = 0; colNo < columns; colNo++){
				// If we're on the column to omit, don't add it.
				if (colNo == omitColumn){
					continue;
				}
				
				// Otherwise push the value from this matrix onto the row for the new one.
				newRow.push(this.values[rowNo][colNo]);
			}
			
			// Add the new row to the new matrix's values.
			values.push(newRow);
		}
		
		// Finally create the new matrix and return it.
		return new Matrix(values);
	}
	
	return Matrix;
	
});
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
		return new Matrix([
		    [scaleFactor,           0, 0],
		    [          0, scaleFactor, 0],
		    [          0,           0, 1]
		]);
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
	
	return Matrix;
	
});
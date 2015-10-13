define(function(){
	
	/**
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
	 *//**
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
	 */
	var Matrix = function(columns, rows, values){
		if (columns instanceof Array){
			// Matrix(Number[][])
			this.values = columns;
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
	 * Creates a copy of this matrix.
	 * @public
	 * @returns {thruster.math.Matrix3}
	 */
	Matrix.prototype.clone = function(){
		var values = [];
		
		for (var i in this.values){
			values.push(this.values[i].slice(0));
		}
		
		return new Matrix(values);
	};
	
	return Matrix;
	
});
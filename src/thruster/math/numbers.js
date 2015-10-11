define(/** @lends numbers */ function(){
	
	/**
	 * @namespace
	 * @memberof thruster.math
	 */
	var numbers = {
		/**
		 * Returns the linear interpolation of two numbers.
		 * @static
		 * @param {Number} a     The first number.
		 * @param {Number} b     The second number.
		 * @param {Number} alpha A control value between 0 and 1 inclusive. If alpha is 0, a will be returned.
		 * If alpha is 1, b will be returned. Values in between will return a linear interpolation between a and b.
		 */
		lerp: function(a, b, alpha){
			return a * (1 - alpha) + b * alpha;
		}
	};
	
	return numbers;
	
});
define(/** @lends Color */ function(){
	
	/**
	 * @class
	 * @memberof thruster.graphics
	 * @param {Number} red   The red component of the color, an integer between 0 and 255 inclusive.
	 * @param {Number} blue  The blue component of the color, an integer between 0 and 255 inclusive.
	 * @param {Number} green The green component of the color, an integer between 0 and 255 inclusive.
	 * @param {Number} [alpha] The alpha component of the color, a decimal between 0 and 1 inclusive.
	 */
	var Color = function(red, blue, green, alpha){
		this.red = red;
		this.blue = blue;
		this.green = green;
		this.alpha = alpha || 0;
	};
	
	/**
	 * Returns this Color as a CSS rgba(r,g,b,a) color string.
	 * @returns {String}
	 */
	Color.prototype.toRgba = function(){
		return 'rgba(' + this.red + ', ' + this.blue + ', ' + this.green + ', ' + this.alpha + ')';
	};
	
	Color.prototype.toString = function(){
		return this.toRgba();
	};
	
	return Color;
	
});
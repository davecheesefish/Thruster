define(function(){
	
	/**
	 * @class
	 * @memberof thruster.graphics
	 * @param {Number} red   The red component of the color, an integer between 0 and 255 inclusive.
	 * @param {Number} green The green component of the color, an integer between 0 and 255 inclusive.
	 * @param {Number} blue  The blue component of the color, an integer between 0 and 255 inclusive.
	 * @param {Number} [alpha=1] The alpha component of the color, a decimal between 0 and 1 inclusive.
	 */
	var Color = function(red, green, blue, alpha){
		this.red = red;
		this.green = green;
		this.blue = blue;
		this.alpha = alpha || 1;
	};
	
	/**
	 * Returns this Color as a CSS rgba(r,g,b,a) color string.
	 * @public
	 * @returns {String}
	 */
	Color.prototype.toRgba = function(){
		return 'rgba(' + this.red + ', ' + this.green + ', ' + this.blue + ', ' + this.alpha + ')';
	};
	
	Color.prototype.toString = function(){
		return this.toRgba();
	};
	
	return Color;
	
});
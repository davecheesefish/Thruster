define(['thruster/math/lerp'], function(lerp, undefined){
	
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
		this.alpha = (alpha === undefined ? 1 : alpha);
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
	
	/**
	 * Creates a new color which is a linear interpolation of the two colors provided.
	 * @public
	 * @static
	 * @param {thruster.graphics.Color} color1
	 * @param {thruster.graphics.Color} color2
	 * @param {Number} amount A number between 0 and 1. If amount is 0, the returned color will be the same as color1. If amount is 1,
	 * the returned color will be the same as color2. For other values, the result will be interpolated between color1 and color2.
	 * @returns {thruster.graphics.Color}
	 */
	Color.lerp = function(color1, color2, amount){
		var r = lerp(color1.red, color2.red, amount),
			g = lerp(color1.green, color2.green, amount),
			b = lerp(color1.blue, color2.blue, amount),
			a = lerp(color1.alpha, color2.alpha, amount);
		
		return new Color(r, g, b, a);
	};
	
	return Color;
	
});
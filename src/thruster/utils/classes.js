define(/** @lends classes */ function(){
	
	/**
	 * @namespace
	 * @memberof thruster.utils
	 */
	var classes = {
		/**
		 * Inherit the properties and methods of parent onto child.
		 * @param {Function} parent
		 * @param {Function} child
		 */
		extend: function(parent, child){
			child.prototype = new parent();
			child.prototype.constructor = child;
		}
	};
	
	return classes;
	
});
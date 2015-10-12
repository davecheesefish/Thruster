define( function(){
	
	/**
	 * Inherit the properties and methods of parent onto child.
	 * @public
	 * @memberof thruster.utils.classes
	 * @param {Function} parent
	 * @param {Function} child
	 */
	var extendClass = function(parent, child){
		child.prototype = new parent();
		child.prototype.constructor = child;
	};
	
	return extendClass;
	
});
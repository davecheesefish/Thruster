define(function(){
	
	// Using plural name to avoid clash with reserved keyword "class".
	var Classes = {
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
	
	return Classes;
	
});
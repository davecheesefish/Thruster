define(function(){
	
	/**
	 * An image resource.
	 * @class
	 * @memberof thruster.content
	 * @param {HTMLImageElement} image An already-loaded HTML image element. 
	 */
	var Texture = function(image){
		/**
		 * The HTML image element containing the image data for this texture.
		 * @public
		 * @type {HTMLImageElement}
		 */
		this.image = image;
		
		/**
		 * Unloads this resource. Frees any event handlers set up by this instance and clears
		 * references to any HTML elements. This should be called before disposing of this
		 * resource to avoid potential memory leaks.
		 * @public
		 */
		this.unload = function(){
			this.image = null;
		};
	};
	
	return Texture;
	
});
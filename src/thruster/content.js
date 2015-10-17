define(['thruster/content/texture'], function(Texture){
	
	/**
	 * @namespace
	 * @memberof thruster
	 */
	var content = {
		// Classes
		Texture: Texture
	};
	
	return content;
	
});


// Interfaces

/**
 * @name ILoadableContent
 * @interface
 * @memberof thruster.content
 */

	/**
	 * Starts loading this resource.
	 * @name thruster.content.ILoadableContent#load
	 * @public
	 * @function
	 * @param {Function} [onLoad]  A callback function. This should be called when the content is
	 * loaded and ready to use.
	 * @param {Function} [onError] A callback function. This should be called if an error occurs
	 * while loading the content.
	 */
	
	/**
	 * Unloads this resource. This should clear any references to DOM elements and remove any event
	 * listeners created by the instance.
	 * @name thruster.content.ILoadableContent#unload
	 * @public
	 * @function
	 */

	/**
	 * Returns whether this content has finished loading.
	 * @name thruster.content.ILoadableContent#isLoaded
	 * @public
	 * @function
	 * @returns {Boolean} True if the content is loaded and ready to use, false otherwise.
	 */

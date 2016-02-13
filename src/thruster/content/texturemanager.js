define(['thruster/content/texture', 'thruster/utils/noop'], function(Texture, noop){
	
	/**
	 * Loader for texture resources.
	 * @class
	 * @memberof thruster.content
	 */
	var TextureManager = function(){
		this.content = {};
	};
	
	/**
	 * Returns a texture which has previously been preloaded with
	 * {@link thruster.content.TextureManager#preload}.
	 * @public
	 * @param id {String} The ID string of the texture.
	 * @returns {thruster.content.Texture}
	 */
	TextureManager.prototype.get = function(id){
		return this.content[id];
	};
	
	/**
	 * Preloads a texture from the supplied URL.
	 * @public
	 * @param {(thruster.content.TextureConfig[]|thruster.content.TextureConfig)} config
	 * Config for the texture(s) to preload.
	 * @param {Function} onSuccess  A callback function to be called once when all content has
	 * finished preloading. This function will not be called if an error occurs with one or more
	 * items.
	 * @param {Function} onError    A callback function to be called when a texture fails to load.
	 */
	TextureManager.prototype.preload = function(config, onSuccess, onError){
		onSuccess = onSuccess || noop;
		onError = onError || noop;
		
		if ( ! Array.isArray(config)){
			// Convert single-config call to a single-element array.
			config = [config];
		}
		
		var image, processedCount, loaded, errored;
		
		processedCount = 0;
		for (var i in config){
			image = new Image();
			
			// Image load event handler
			loaded = (function(boundThis, boundImage, boundLoaded, boundErrored, boundConfiguration){
				return function(){
					boundImage.removeEventListener('load', boundLoaded);
					boundImage.removeEventListener('error', boundErrored);
					
					// Add to content dictionary.
					boundThis.content[boundConfiguration.id] = new Texture(boundImage);
					
					// Check if we have processed all of the textures.
					processedCount++;
					if (processedCount == config.length){
						onSuccess();
					}
				};
			}(this, image, loaded, errored, config[i]));
			
			// Image error event handler
			errored = (function(boundImage, boundLoaded, boundErrored){
				return function(){
					boundImage.removeEventListener('load', boundLoaded);
					boundImage.removeEventListener('error', boundErrored);
					
					processedCount++;
					onError();
				};
			}(image, loaded, errored));
			
			image.addEventListener('load', loaded);
			image.addEventListener('error', errored);
			image.src = config[i].url;
		}
	};
	
	return TextureManager;
	
});
define(function(){
	
	/**
	 * Contains configuration options for {@link thruster.content.TextureManager#preload}.
	 * @class
	 * @memberof thruster.content
	 * @param {String} id   A unique ID string by which this resource can be retrieved later.
	 * @param {String} url  The URL to load the texture image data from.
	 */
	var TextureConfig = function(id, url){
		this.id = id;
		this.url = url;
	};
	
	return TextureConfig;
	
});
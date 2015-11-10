define([
    'thruster/content/texture',
    'thruster/content/textureConfig',
    'thruster/content/texturemanager'
], function(
	Texture,
	TextureConfig,
	TextureManager
){
	
	/**
	 * @namespace
	 * @memberof thruster
	 */
	var content = {
		// Classes
		Texture: Texture,
		TextureConfig: TextureConfig,
		TextureManager: TextureManager
	};
	
	return content;
	
});
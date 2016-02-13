define([
	'thruster/content/sound',
	'thruster/content/soundconfig',
    'thruster/content/soundmanager',
    'thruster/content/texture',
    'thruster/content/textureConfig',
    'thruster/content/texturemanager'
], function(
	Sound,
	SoundConfig,
	SoundManager,
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
		Sound: Sound,
		SoundConfig: SoundConfig,
		SoundManager: SoundManager,
		Texture: Texture,
		TextureConfig: TextureConfig,
		TextureManager: TextureManager
	};
	
	return content;
	
});
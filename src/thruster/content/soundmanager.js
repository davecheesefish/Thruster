define([
    'thruster/content/Sound',
    'thruster/content/SoundConfig',
    'howler',
    'thruster/utils/noop'
], function(
	Sound,
	SoundConfig,
	howler,
	noop
){
	
	/**
	 * Loader for sound resources.
	 * @class
	 * @memberof thruster.content
	 */
	var SoundManager = function(){
		/**
		 * Dictionary storage for loaded Sound objects.
		 * @private
		 * @type {Object}
		 */
		var _content = {};
		
		
		/**
		 * Returns a sound which has previously been preloaded with
		 * {@link thruster.content.SoundManager#preload}.
		 * @public
		 * @param id {String} The ID string of the sound.
		 * @returns {thruster.content.Sound}
		 */
		this.get = function(id){
			return _content[id];
		};
		
		/**
		 * Preloads a sound from the supplied URL.
		 * @public
		 * @param {(thruster.content.SoundConfig[]|thruster.content.SoundConfig)} config
		 * Config for the sound(s) to preload.
		 * @param {Function} onSuccess  A callback function to be called once when all content has
		 * finished preloading. This function will not be called if an error occurs with one or more
		 * items.
		 * @param {Function} onError    A callback function to be called when a sound fails to load.
		 */
		this.preload = function(config, onSuccess, onError){
			onSuccess = onSuccess || noop;
			onError = onError || noop;
			
			if ( ! Array.isArray(config)){
				// Convert single-config call to a single-element array.
				config = [config];
			}
			
			var c, configuration, howl, processedCount, errorOccurred;
			
			processedCount = 0;
			errorOccurred = false;
			
			for (var i in config){
				c = config[i];
				configuration = {
					urls:   c.urls,
					loop:   c.loop,
					volume: c.volume
				};
				
				// Load event handler
				configuration.onload = (function(boundThis, boundConfig, boundHowl){
					return function(arg){
						if ( ! errorOccurred){
							// Check if we have processed all of the configs.
							processedCount++;
							if (processedCount == config.length){
								onSuccess();
							}
						}
					};
				}(this, c, howl));
				
				// Load error event handler
				configuration.onloaderror = function(){
					if ( ! errorOccurred){
						processedCount++;
						errorOccurred = true;
						onError();
					}
				};
				
				// Create the Howler.js howl object we will use internally.
				howl = new howler.Howl(configuration);
				// Add new sound to content dictionary.
				_content[c.id] = new Sound(howl);
			}
		};
	};
	
	return SoundManager;
	
});
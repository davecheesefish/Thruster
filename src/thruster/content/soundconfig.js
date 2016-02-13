define(function(){
	
	/**
	 * Contains configuration options for {@link thruster.content.SoundManager#preload}.
	 * @class
	 * @memberof thruster.content
	 * @param {String}   id           A unique ID string by which this resource can be retrieved
	 *                                later.
	 * @param {String[]} urls         The URLs to load the audio data from. For greatest
	 *                                compatibility, you should at least provide MP3 (.mp3) and
	 *                                Ogg Vorbis (.ogg) versions of the sound file.
	 * @param {Boolean}  [loop=false] If true, this sound will loop when played.
	 * @param {Number}   [volume=1]   Volume of this sound between 0 (muted) and 1 (full volume).
	 */
	var SoundConfig = function(id, urls, loop, volume){
		this.id = id;
		this.urls = urls;
		this.loop = loop || false;
		this.volume = (typeof volume == 'undefined' ? 1 : volume);
	};
	
	return SoundConfig;
	
});
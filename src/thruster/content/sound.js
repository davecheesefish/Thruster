define(function(){
	
	/**
	 * A sound resource.
	 * @class
	 * @memberof thruster.content
	 * @param {Howler.Howl} howl  A Howl object from Howler.js.
	 */
	var Sound = function(howl){
		this.howl = howl;
	};
	
	/**
	 * Plays this sound.
	 * @public
	 */
	Sound.prototype.play = function(){
		this.howl.play();
	};
	
	return Sound;
	
});
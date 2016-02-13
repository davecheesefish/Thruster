(function(undefined){
	'use strict';
	QUnit.module('thruster.content.SoundManager');
	
	QUnit.test('load(), with valid URL', function(assert){
		var manager, config, done, onSuccess;
		
		manager = new thruster.content.SoundManager();
		config = [
	        new thruster.content.SoundConfig('sound', ['../../content/sound.mp3', '../../content/sound.ogg'], false, 0.9),
	        new thruster.content.SoundConfig('loopingsound', ['../../content/sound.ogg', '../../content/sound.mp3'], true, 0.5)
	    ];
		done = assert.async();
		
		onSuccess = function(){
			assert.ok(true, 'Success callback called when texture is loaded.');
			done();
		};
		
		manager.preload(config, onSuccess);
	});
	
	QUnit.test('load(), with invalid URL', function(assert){
		var manager, config, done, onError;
		
		manager = new thruster.content.SoundManager();
		config = [
	        new thruster.content.SoundConfig('sound', ['../../content/invalidsound.butts'], false, 0.9)
	    ];
		done = assert.async();
		
		onError = function(){
			assert.ok(true, 'Error callback called for invalid URL.');
			done();
		};
		
		manager.preload(config, undefined, onError);
	});
})();
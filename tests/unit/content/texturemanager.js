(function(undefined){
	'use strict';
	QUnit.module('thruster.content.TextureManager');
	
	QUnit.test('load(), with valid URL', function(assert){
		var manager, config, done, onSuccess;
		
		manager = new thruster.content.TextureManager();
		config = [
	        new thruster.content.TextureConfig('image', '../../content/image.png'),
	        new thruster.content.TextureConfig('image2', '../../content/image2.png')
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
		
		manager = new thruster.content.TextureManager();
		config = [
	        new thruster.content.TextureConfig('image', 'invalidimage.butts'),
	        new thruster.content.TextureConfig('image2', '../../content/image2.png')
	    ];
		done = assert.async();
		
		onError = function(){
			assert.ok(true, 'Error callback called for invalid URL.');
			done();
		};
		
		manager.preload(config, undefined, onError);
	});
})();
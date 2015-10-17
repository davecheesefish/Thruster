(function(undefined){
	'use strict';
	QUnit.module('thruster.content.Texture');
	
	QUnit.test('isLoaded()', function(assert){
		var tex = new thruster.content.Texture('../../content/image.png'),
			done = assert.async();
		
		assert.equal(tex.isLoaded(), false, 'Returns false before loading.');
		
		var onSuccess = function(arg){
			assert.equal(tex.isLoaded(), true, 'Returns true after loading.');
			done();
		};
		
		tex.load(onSuccess);
	});
	
	QUnit.test('load(), with valid URL', function(assert){
		var tex = new thruster.content.Texture('../../content/image.png'),
			done = assert.async();
		
		var onSuccess = function(arg){
			assert.equal(arg, tex, 'Success callback called with texture as the first argument.');
			done();
		};
		
		tex.load(onSuccess);
	});
	
	QUnit.test('load(), with invalid URL', function(assert){
		var tex = new thruster.content.Texture('../../content/invalid-image.butt'),
			done = assert.async();
		
		var onFailure = function(arg){
			assert.equal(arg, tex, 'Failure callback called with texture as the first argument.');
			done();
		};
		
		tex.load(undefined, onFailure);
	});
})();
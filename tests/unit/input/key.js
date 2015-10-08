(function(){
	'use strict';
	QUnit.module('thruster.input.Key');
	
	QUnit.test('equals()', function(assert){
		var full = new thruster.input.Key(' ', 32, 'Space', ['Spacebar']),
			keyOnly = new thruster.input.Key(' ', 0),
			keyCodeOnly = new thruster.input.Key(undefined, 32),
			unofficialKey = new thruster.input.Key('Spacebar', 0),
			wrongCode = new thruster.input.Key(' ', 13), // "Wrong" keyCodes could occur on international keyboard layouts
			wrongCodeUnofficialKey = new thruster.input.Key('Spacebar', 13),
			unknownKey = new thruster.input.Key('Unidentified', 0),
			notMatched = new thruster.input.Key('Enter', 13);
		
		assert.equal(full.equals(full), true, 'Fully-defined key matches fully-defined key.');
		assert.equal(full.equals(keyOnly), true, 'Fully-defined key matches key with "key" value only.');
		assert.equal(full.equals(keyCodeOnly), true, 'Fully-defined key matches key with keyCode only.');
		assert.equal(full.equals(unofficialKey), true, 'Fully-defined key matches key with an unofficial "key" value.');
		assert.equal(full.equals(wrongCode), true, 'Fully-defined key matches key with the right "key" value but wrong keyCode.');
		assert.equal(full.equals(wrongCodeUnofficialKey), true, 'Fully-defined key matches key with an unofficial "key" value and the wrong keyCode.');
		
		
		assert.equal(full.equals(unknownKey), false, 'Fully-defined key does not match unidentifiable key.');
		assert.equal(full.equals(notMatched), false, 'Fully-defined key does not match non-matching key.');
	});
	
	QUnit.test('isUnidentified()', function(assert){
		var identifiedKey =  new thruster.input.Key(' ', 32, 'Space', ['Spacebar']),
			unidentifiedWithKeyCode =  new thruster.input.Key('Unidentified', 32),
			unidentifiedKey =  new thruster.input.Key('Unidentified', 0),
			noKeyValue =  new thruster.input.Key(undefined, 0);
		
		assert.equal(identifiedKey.isUnidentified(), false, 'Returns false for a fully-identified key.');
		assert.equal(unidentifiedWithKeyCode.isUnidentified(), false, 'Returns false for "Unidentified" key value but valid key code.');
		
		assert.equal(unidentifiedKey.isUnidentified(), true, 'Returns true for key value "Unidentified" and keyCode of 0.');
		assert.equal(noKeyValue.isUnidentified(), true, 'Returns true for no key value and keyCode of 0.');
	});
})();
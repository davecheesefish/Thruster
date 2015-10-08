define([
    'thruster/input/inputmanager',
    'thruster/input/keyboard',
	'thruster/input/keyboardstate',
	'thruster/input/key',
	'thruster/input/keys'
], /** @lends input */ function(
	InputManager,
	Keyboard,
	KeyboardState,
	Key,
	Keys
){
	
	/**
	 * @namespace
	 * @memberof thruster
	 */
	var input = {
		InputManager: InputManager,
		
		Keyboard: Keyboard,
		KeyboardState: KeyboardState,
		Key: Key,
		Keys: Keys
	};
	
	return input;
});
define([
    'thruster/input/inputmanager',
    'thruster/input/keyboard',
	'thruster/input/keyboardstate',
	'thruster/input/key',
	'thruster/input/keys'
], /** @lends Input */ function(
	InputManager,
	Keyboard,
	KeyboardState,
	Key,
	Keys
){
	
	/**
	 * @namespace
	 * @memberof Thruster
	 */
	var Input = {
		InputManager: InputManager,
		
		Keyboard: Keyboard,
		KeyboardState: KeyboardState,
		Key: Key,
		Keys: Keys
	};
	
	return Input;
});
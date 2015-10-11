define([
    'thruster/input/inputmanager',
    'thruster/input/keyboard',
	'thruster/input/keyboardstate',
	'thruster/input/key',
	'thruster/input/keys',
	'thruster/input/mouse',
	'thruster/input/mousebuttons',
	'thruster/input/mousestate'
], function(
	InputManager,
	Keyboard,
	KeyboardState,
	Key,
	Keys,
	Mouse,
	MouseButtons,
	MouseState
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
		Keys: Keys,
		Mouse: Mouse,
		MouseButtons: MouseButtons,
		MouseState: MouseState
	};
	
	return input;
});
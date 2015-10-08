define(['thruster/input/key'], /** @lends Keys */ function(Key, undefined){
	
	// A utility function to create Key objects, which will compact down more than
	// hundreds of separate "new Key()" calls would when minified.
	function key(key, keyCode, name, nonStandardKeys){
		return new Key(key, keyCode, name, nonStandardKeys);
	};
	
	/**
	 * An enum of common keyboard keys to use with Keyboard checking functions.
	 * Note that names may not be accurate for browsers which don't yet support KeyboardEvent.key, due to inconsistencies with keyCode values.
	 * @static
	 * @readonly
	 * @enum {Thruster.Input.Key}
	 * @memberof Thruster.Input
	 */
	var Keys = {
		'BACKSPACE':       key('Backspace', 8),
		'TAB':             key('Tab', 9),
		'ENTER':           key('Enter', 13),
		'SHIFT':           key('Shift', 16),
		'CTRL':            key('Control', 17, 'Ctrl'),
		'ALT':             key('Alt', 18),
		'CAPS_LOCK':       key('CapsLock', 20, 'Caps Lock'),
		'ESCAPE':          key('Escape', 27, undefined, ['Esc']),
		'SPACE':           key(' ', 32, 'Space', ['Spacebar']),
		'PAGE_UP':         key('PageUp', 33, 'Page Up'),
		'PAGE_DOWN':       key('PageDown', 34, 'Page Down'),
		'END':             key('End', 35),
		'HOME':            key('Home', 36),
		'ARROW_LEFT':      key('ArrowLeft', 37, 'Left Arrow', ['Left']),
		'ARROW_UP':        key('ArrowUp', 38, 'Up Arrow', ['Up']),
		'ARROW_RIGHT':     key('ArrowRight', 39, 'Right Arrow', ['Right']),
		'ARROW_DOWN':      key('ArrowDown', 40, 'Down Arrow', ['Down']),
		'INSERT':          key('Insert', 45),
		'DELETE':          key('Delete', 46, undefined, ['Del']),
		'0':               key('0', 48),
		'1':               key('1', 49),
		'2':               key('2', 50),
		'3':               key('3', 51),
		'4':               key('4', 52),
		'5':               key('5', 53),
		'6':               key('6', 54),
		'7':               key('7', 55),
		'8':               key('8', 56),
		'9':               key('9', 57),
		'A':               key('a', 65, 'A'),
		'B':               key('b', 66, 'B'),
		'C':               key('c', 67, 'C'),
		'D':               key('d', 68, 'D'),
		'E':               key('e', 69, 'E'),
		'F':               key('f', 70, 'F'),
		'G':               key('g', 71, 'G'),
		'H':               key('h', 72, 'H'),
		'I':               key('i', 73, 'I'),
		'J':               key('j', 74, 'J'),
		'K':               key('k', 75, 'K'),
		'L':               key('l', 76, 'L'),
		'M':               key('m', 77, 'M'),
		'N':               key('n', 78, 'N'),
		'O':               key('o', 79, 'O'),
		'P':               key('p', 80, 'P'),
		'Q':               key('q', 81, 'Q'),
		'R':               key('r', 82, 'R'),
		'S':               key('s', 83, 'S'),
		'T':               key('t', 84, 'T'),
		'U':               key('u', 85, 'U'),
		'V':               key('v', 86, 'V'),
		'W':               key('w', 87, 'W'),
		'X':               key('x', 88, 'X'),
		'Y':               key('y', 89, 'Y'),
		'Z':               key('z', 90, 'Z'),
		'NUMPAD_MULTIPLY': key('*', 106, undefined, ['Multiply']),
		'NUMPAD_ADD':      key('+', 107, undefined, ['Add']),
		'NUMPAD_SUBTRACT': key('-', 109, undefined, ['Subtract']),
		'NUMPAD_DECIMAL':  key('.', 110, undefined, ['Decimal']),
		'NUMPAD_DIVIDE':   key('/', 111, undefined, ['Divide']),
		'F1':              key('f1', 112, 'F1'),
		'F2':              key('f2', 113, 'F2'),
		'F3':              key('f3', 114, 'F3'),
		'F4':              key('f4', 115, 'F4'),
		'F5':              key('f5', 116, 'F5'),
		'F6':              key('f6', 117, 'F6'),
		'F7':              key('f7', 118, 'F7'),
		'F8':              key('f8', 119, 'F8'),
		'F9':              key('f9', 120, 'F9'),
		'F10':             key('f10', 121, 'F10'),
		'F11':             key('f11', 122, 'F11'),
		'F12':             key('f12', 123, 'F12'),
		'NUM_LOCK':        key('NumLock', 144, 'Num Lock'),
		'SEMI_COLON':      key(';', 186),
		'EQUAL_SIGN':      key('=', 187),
		'COMMA':           key(',', 188),
		'DASH':            key('-', 189),
		'PERIOD':          key('.', 190),
		'FULL_STOP':       this.PERIOD, // Alternative
		'FORWARD_SLASH':   key('/', 191),
		'GRAVE_ACCENT':    key('`', 192),
		'OPEN_BRACKET':    key('[', 219),
		'BACK_SLASH':      key('\\', 220),
		'CLOSE_BRACKET':   key(']', 221),
		'SINGLE_QUOTE':    key("'", 222),
		'APOSTROPHE':      this.SINGLE_QUOTE // Alternative
	};
	
	return Keys;
	
});
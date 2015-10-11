define(function(){
	
	/**
	 * Mouse button values for use with button-checking functions. Multiple buttons can be combined with a binary OR.
	 * @static
	 * @readonly
	 * @enum {Number}
	 * @memberof thruster.input
	 */
	var MouseButtons = {
		/** Mouse1: The primary mouse button. Left-click by default, but may be right-click on a left-handed configuration. */
		PRIMARY:          1,
		/** Mouse2: The secondary mouse button. Right-click by default, but may be left-click on a left-handed configuration. */
		SECONDARY:        2,
		/** Mouse3: Activated by clicking the scroll wheel. */
		SCROLL_WHEEL:     4,
		/** Mouse4: A physical browser back button. Not all mice have this button, so it is not recommended for important controls. */
		BROWSER_BACK:     8,
		/** Mouse5: A physical browser forward button. Not all mice have this button, so it is not recommended for important controls. */
		BROWSER_FORWARD: 16
	};
	
	return MouseButtons;
	
});
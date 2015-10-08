define(/** @lends Key */ function(undefined){
	
	/**
	 * Represents a key on the keyboard. An enum of common keys can be found at {@link Thruster.Input.Keys}.
	 * @class
	 * @memberof Thruster.Input
	 * @param {String} key The W3C key value for this key. See {@link http://www.w3.org/TR/DOM-Level-3-Events-key/}.
	 * @param {Number} keyCode The keyCode returned by a keydown event when this key is pressed. Where keyCodes differ between browsers, this should be set to the most common of them. See {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode}.
	 * @param {String} [name] A human-readable name for this key. For printable character keys, this should be the upper case version of the character. If omitted, the key value will be used.
	 * @param {String[]} [nonStandardKeys] An array of non-standard key values implemented by browsers for this key. For example, "Escape" has the unofficial value "Esc" in some browsers. See {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key}.
	 */
	var Key = function(key, keyCode, name, nonStandardKeys){
		this.key = (typeof key == 'undefined' ? 'Unidentified' : key);
		this.keyCode = keyCode || 0;
		this.name = (typeof name == 'undefined' ? this.key : name); // Name could be a falsy value, so check for type.
		this.nonStandardKeys = nonStandardKeys || [];
	};
	
	/**
	 * Checks if the given key is the same as this one.
	 * @param {Thruster.Input.Ley} other The other key to check against.
	 * @returns {Boolean} True if the keys match, false if not (or if at least one key was unidentified).
	 */
	Key.prototype.equals = function(other){
		// First, check if information is available for both keys.
		if (this.isUnidentified() || other.isUnidentified()){
			// No information available for at least one key, return early.
			return false;
		}
		
		// Check if either key has a key value. They're much more reliable than keyCodes.
		if (
			this.key  != 'Unidentified' && this.key  !== undefined &&
			other.key != 'Unidentified' && other.key !== undefined
		){
			// Check official values.
			if (this.key == other.key){
				return true;
			}
			
			// Check non-standard values.
			if (this.nonStandardKeys.length || other.nonStandardKeys.length){
				// Check this key's non-standard values against the other key.
				for (var i in this.nonStandardKeys){
					if (other.key === this.nonStandardKeys[i]){
						return true;
					}
				}
				
				// Check the other key's non-standard values against this key.
				for (var i in other.nonStandardKeys){
					if (this.key === other.nonStandardKeys[i]){
						return true;
					}
				}
				
				// Finally, check non-standard key values against each other.
				for (var i in this.nonStandardKeys){
					for (var j in other.nonStandardKeys){
						if (this.nonStandardKeys[i] === other.nonStandardKeys[j]){
							return true;
						}
					}
				}
			}
		} else {
			// As a backup, check keyCodes. They may not be reliable, but there's not much alternative.
			if (
				this.keyCode !== 0 &&
				// No need to check if other keyCode is 0. If it is, they won't be equal.
				this.keyCode === other.keyCode
			){
				return true;
			}
		}
		
		// If we get here, no match was found.
		return false;
	};
	
	/**
	 * Checks if this key is unidentified (key value of "Unidentified" or undefined AND a keyCode of 0).
	 * @returns {Boolean} True if this key is unidentified, false if not.
	 */
	Key.prototype.isUnidentified = function(){
		if (
			(this.key == 'Unidentified' || typeof this.key == 'undefined') &&
			this.nonStandardKeys.length == 0 &&
			this.keyCode === 0
		){
			return true;
		}
		
		return false;
	};
	
	
	/**
	 * Constructs a Key instance from a keydown or keyup event object.
	 * @static
	 * @param e The event object passed to the keyup or keydown event handler. In older browsers that don't pass an object to event handlers, window.event should be passed in instead.
	 * @returns {(Key|Boolean)} A Key instance, or boolean false if the key could not be determined.
	 */
	Key.fromEventObject = function(e){
		var key = e.key || String.fromCharCode(e.charCode).toLowerCase() || undefined,
			keyCode = e.keyCode,
			name = key || 'Key ' + keyCode;
		
		var newKey = new Key(key, keyCode, name);
		
		if (newKey.isUnidentified()){
			// Key is unknown
			return false;
		} else {
			return newKey;
		} 
	};
	
	return Key;
	
});
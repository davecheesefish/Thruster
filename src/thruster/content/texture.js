define(function(){
	
	/**
	 * An image resource.
	 * @class
	 * @implements thruster.content.ILoadableContent
	 * @memberof thruster.content
	 * @param {String} src The URL of the image file. 
	 */
	var Texture = function(src){
		/**
		 * The source URL of the image file.
		 * @type {String}
		 * @private
		 */
		var _src = src;
		
		/**
		 * Whether the image file has been loaded or not.
		 * @type {Boolean}
		 * @private
		 */
		var _loaded = false;
		
		/**
		 * Reference to the onSuccess callback passed to this.load().
		 * @private
		 * @type {Function}
		 */
		var _onLoadCallback;
		
		/**
		 * Reference to the onFailure callback passed to this.load().
		 * @private
		 * @type {Function}
		 */
		var _onErrorCallback;
		
		/**
		 * "this" proxy for callbacks.
		 * @private
		 */
		var _self = this;
		
		/**
		 * Callback for the load event of this.image.
		 * @private
		 */
		var _onLoad = function(){
			_loaded = true;
			if (typeof _onLoadCallback == 'function'){
				_onLoadCallback(_self);
			}
			_disconnectEvents();
		};
		
		/**
		 * The handle returned from attaching the "error" event handler in this.load().
		 * @private
		 */
		var _onError = function(){
			if (typeof _onErrorCallback == 'function'){
				_onErrorCallback(_self);
			}
			_disconnectEvents();
		};
		
		/**
		 * Disconnects the event handlers and removes references to callbacks created by this.load().
		 * @private
		 */
		var _disconnectEvents = function(){
			if (_self.image != null){
				_self.image.removeEventListener('load', _onLoad);
				_self.image.removeEventListener('error', _onError);
			}
			_onLoadCallback = null;
			_onErrorCallback = null;
		};
		
		
		/**
		 * The HTML image element containing the image data for this texture.
		 * @public
		 * @type {HTMLImageElement}
		 */
		this.image = new Image();
		
		/**
		 * Starts loading this resource.
		 * @public
		 * @param {Function} [onLoad] A callback function. This will be called when this texture
		 * has finished loading successfully, and will receive this texture instance as its only
		 * argument.
		 * @param {Function} [onError] A callback function. This will be called if an error
		 * occurs while loading this texture, and will receive this texture instance as its only
		 * argument.
		 */
		this.load = function(onLoad, onError){
			if (this.image == null){
				this.image = new Image();
			}
			
			_onLoadCallback = onLoad;
			_onErrorCallback = onError;
			this.image.addEventListener('load', _onLoad);
			this.image.addEventListener('error', _onError);
			this.image.src = _src;
		};
		
		/**
		 * Unloads this resource. Frees any event handlers set up by this instance and clears
		 * references to any HTML elements. This should be called before disposing of this
		 * resource to avoid potential memory leaks.
		 * @public
		 */
		this.unload = function(){
			_disconnectEvents();
			this.image = null;
		};
		
		/**
		 * Returns whether this texture is loaded or not.
		 * @returns {Boolean}
		 */
		this.isLoaded = function(){
			// HTMLImageElement has a "complete" property but it can return true even if there was
			// an error, so we use our own property instead.
			return _loaded;
		};
	};
	
	return Texture;
	
});
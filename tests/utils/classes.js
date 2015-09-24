(function(){
	'use strict';
	QUnit.module('Thruster.Utils.Classes');
	
	QUnit.test('extend()', function(assert){
		// Child should inherit all properties of Parent.
		var Parent = function(){
			this.parentProp = true;
			this.parentFunc = function(){
				return true;
			};
		};
		
		Parent.prototype.parentProtoProp = true;
		Parent.prototype.parentProtoFunc = function(){
			return true;
		};
		Parent.prototype.overridenFunction = function(){
			return 'Parent';
		};
		
		
		var Child = function(){
			this.childProp = true;
			this.childFunc = function(){
				return true;
			};
		};
		
		Thruster.Utils.Classes.extend(Parent, Child);
		
		Child.prototype.overridenFunction = function(){
			return 'Child';
		};
		
		// Create an instance of Child
		var childInstance = new Child();
		
		assert.ok(childInstance.parentProp, 'Child class inherits properties from the parent.');
		assert.ok(childInstance.parentFunc(), 'Child class inherits functions from the parent.');
		assert.ok(childInstance.parentProtoProp, 'Child class inherits properties from the parent\'s prototype.');
		assert.ok(childInstance.parentProtoFunc(), 'Child class inherits functions from the parent\'s prototype.');
		
		assert.ok(childInstance.childProp, 'Child class properties are preserved.');
		assert.ok(childInstance.childFunc(), 'Child class functions are preserved.');
		assert.equal(childInstance.overridenFunction(), 'Child', 'Child functions override parent functions of the same name.');
		
		assert.ok(childInstance instanceof Child, 'Child instance is an instanceof the child class.');
		assert.ok(childInstance instanceof Parent, 'Child instance is an instanceof the parent class.');
	});
})();
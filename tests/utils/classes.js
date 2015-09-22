QUnit.module('Thruster.Utils.Classes');

QUnit.test('extend()', function(assert){
	// Child should inherit all properties of Parent.
	var Parent = function(){
		this.localProp = true;
		this.localFunc = function(){
			return true;
		};
	};
	
	Parent.prototype.prototypeProp = true;
	
	Parent.prototype.prototypeFunc = function(){
		return true;
	};
	
	var Child = function(){};
	Thruster.Utils.Classes.extend(Parent, Child);
	
	// Create an instance of Child
	var childInstance = new Child();
	
	assert.ok(childInstance.localProp, 'Child class inherits properties from the parent.');
	assert.ok(childInstance.localFunc(), 'Child class inherits functions from the parent.');
	assert.ok(childInstance.prototypeProp, 'Child class inherits properties from the parent\'s prototype.');
	assert.ok(childInstance.prototypeFunc(), 'Child class inherits functions from the parent\'s prototype.');
});
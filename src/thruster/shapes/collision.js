define([
    'thruster/shapes/collision/aabbscollide',
    'thruster/shapes/collision/circlecollidespolygon',
    'thruster/shapes/collision/circlescollide',
    'thruster/shapes/collision/pointcollidesaabb',
    'thruster/shapes/collision/pointcollidescircle',
    'thruster/shapes/collision/pointcollidespolygon',
    'thruster/shapes/collision/polygonscollide'
], function(
	aabbsCollide,
	circleCollidesPolygon,
	circlesCollide,
	pointCollidesAabb,
	pointCollidesCircle,
	pointCollidesPolygon,
	polygonsCollide
){
	
	/**
	 * @namespace
	 * @memberof thruster.shapes
	 */
	var collision = {
		// Functions
		aabbsCollide: aabbsCollide,
		circleCollidesPolygon: circleCollidesPolygon,
		circlesCollide: circlesCollide,
		pointCollidesAabb: pointCollidesAabb,
		pointCollidesCircle: pointCollidesCircle,
		pointCollidesPolygon: pointCollidesPolygon,
		polygonsCollide: polygonsCollide
	};
	
	return collision;
	
});
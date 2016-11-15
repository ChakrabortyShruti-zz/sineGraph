var height = 100;
var width = 600;
var transformX = 0; 

var line = {x1:0,y1:100,x2:100,y2:0};
var circle = {cx:50,cy:50,r:50};
var square = {width:100,height:100};
var triangle = {points:'0,100 100,100 50,0'};

var createSvgForShapes = function(){
  d3.select('.shapes')
		.append('svg')
		.attr('height',height)
		.attr('width',width)
		.style('padding','10px');
}

var updateTransformPosition = function(){
	transformX+=150;
}

var drawShape = function(className,svgElement,shapeAttributes){
	var shape = d3.select('svg')
		.append('g')
		.attr('transform','translate('+transformX+',0)')
		.classed(className,true)
		.append(svgElement);

	var keys = Object.keys(shapeAttributes);
	keys.forEach(function(d){
		shape.attr(d,shapeAttributes[d]);
	});
	updateTransformPosition();
}

window.onload = function(){
	createSvgForShapes();
	drawShape('line','line',line);
	drawShape('circle','circle',circle);
	drawShape('square','rect',square);
	drawShape('triangle','polygon',triangle);
}

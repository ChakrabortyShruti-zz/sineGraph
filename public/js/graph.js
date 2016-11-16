const MARGIN = 30;
const HEIGHT = 600;
const WIDTH = 600;
const INNER_WIDTH = WIDTH - 2*MARGIN;
const INNER_HEIGHT = HEIGHT - 2*MARGIN;

var _xScale,_yScale;
var setOfPoints = [{x:0,y:5},{x:1,y:9},{x:2,y:7},{x:3,y:5},{x:4,y:3},{x:6,y:4},{x:7,y:2},{x:8,y:3},{x:9,y:2}];
var generateSineValues = function(){
	var sineValues = [];
	for (var i = 0; i < 10; i++) {
		sineValues.push({x:i,y:Math.sin(i)})
	}
	return sineValues;
}

var createSvg = function(){
	d3.select('body')
		.append('svg')
		// .classed('graph',true)
		.attr('width',WIDTH)
		.attr('height',HEIGHT);

	_xScale = d3.scaleLinear().domain([0.0,1.0]).range([0,INNER_WIDTH]);
	_yScale = d3.scaleLinear().domain([0.0,1.0]).range([INNER_HEIGHT,0]);

	var xAxis = d3.axisBottom(_xScale).ticks(10);
	d3.select('svg')
		.append('g')
		.attr('transform', 'translate('+MARGIN+', '+(HEIGHT - MARGIN)+')')
		.call(xAxis);

	var yAxis =  d3.axisLeft(_yScale).ticks(10);
	d3.select('svg')
		.append('g')
		.attr('transform', 'translate('+MARGIN+','+MARGIN+')')
		.call(yAxis);
}

var drawLineGraph = function(){
	var graph = d3.select('svg')
		.append('g')
		.classed('graph',true)
		.attr('transform', 'translate('+MARGIN+', '+MARGIN+')');

	var pointPath = d3.line()
		.x(function(d){ return _xScale(d.x/10)})
		.y(function(d){ return _yScale(d.y/10)});
	graph.append('path').classed('point',true).attr('d',pointPath(setOfPoints));

	var sinPath = d3.line()
		.x(function(d){ return _xScale(d.x/10)})
		.y(function(d){ return _yScale((5+d.y)/10)});
	graph.append('path').classed('sin',true).attr('d',sinPath(generateSineValues()));
}

var createCircle = function(selection,dataSet,offsetY){
	selection
		.append('g')
		.selectAll('circle')
		.data(dataSet)
		.enter()
		.append('circle')
		.attr('cx',function(d){return _xScale(d.x/10)})
		.attr('cy',function(d){return _yScale((offsetY+d.y)/10)})
		.attr('r',5);
}

var drawScatterPlot = function(){
	var circle = d3.select('svg')
		.classed('hollow-circle',true)
		.append('g')
		.attr('transform', 'translate('+MARGIN+', '+MARGIN+')');

	createCircle(circle,setOfPoints,0);
	createCircle(circle,generateSineValues(),5);
}

window.onload = function(){
	createSvg();
	drawLineGraph();
	drawScatterPlot();
}
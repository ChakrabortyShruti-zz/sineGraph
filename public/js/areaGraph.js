const MARGIN = 30;
const HEIGHT = 600;
const WIDTH = 600;
const INNER_WIDTH = WIDTH - 2*MARGIN;
const INNER_HEIGHT = HEIGHT - 2*MARGIN;

var _container, _xScale, _yScale;
var generateSineValues = function(){
	var sineValues = [];
	for (var i = 0; i <= 10; i++) {
		sineValues.push({x:i,y:(3*Math.sin(i))+5})
	}
	return sineValues;
}

var createSvg = function(){
	d3.select('.graphs g').remove();
	var svg = d3.select('body')
		.append('svg')
		.attr('width',WIDTH)
		.attr('height',HEIGHT);

	_xScale = d3.scaleLinear().domain([0.0,1.0]).range([0,INNER_WIDTH]);
	_yScale = d3.scaleLinear().domain([0.0,1.0]).range([INNER_HEIGHT,0]);

	var xAxis = d3.axisBottom(_xScale).ticks(10);
	svg.append('g')
		.attr('transform', 'translate('+MARGIN+', '+(HEIGHT - MARGIN)+')')
		.call(xAxis);

	var yAxis =  d3.axisLeft(_yScale).ticks(10);
	svg.append('g')
		.attr('transform', 'translate('+MARGIN+','+MARGIN+')')
		.call(yAxis);

	_container = svg.append('g').classed('graphs',true)
		.attr('transform', 'translate('+MARGIN+', '+MARGIN+')');
}

var drawGraph = function(interpolator){
	d3.select('.graphs g').remove();
	var graph = _container.append('g');

	var area = d3.area()
	    .x(function(d) { return _xScale(d.x/10)})
	    .y1(function(d) { return _yScale(d.y/10)})
	    .y0(INNER_HEIGHT)
	    .curve(interpolator);

	var pointPath = d3.line()
		.x(function(d){ return _xScale(d.x/10)})
		.y(function(d){ return _yScale(d.y/10)})
		.curve(interpolator);

	var areaGraph = graph.append('g');

	graph.append('g').classed('AreaGraph',true)
		.append('path')
		.attr('d',area(generateSineValues()))

	graph.append('g')
		.classed('LineGraph',true)
		.append('path')
		.attr('d',pointPath(generateSineValues()));

	var circle = graph
		.append('g')
		.classed('ScatterPlot',true)
		.append('g')
		.selectAll('circle')
		.data(generateSineValues());

	circle.enter()
		.append('circle')
		.attr('cx',function(d){return _xScale(d.x/10)})
		.attr('cy',function(d){return _yScale(d.y/10)})
		.attr('r',5);
}

window.onload = function(){
	createSvg();
	drawGraph(d3.curveLinear); //default
}

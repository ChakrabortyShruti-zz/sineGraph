const MARGIN = 30;
const HEIGHT = 600;
const WIDTH = 600;
const INNER_WIDTH = WIDTH - 2*MARGIN;
const INNER_HEIGHT = HEIGHT - 2*MARGIN;

var generateSineValues = function(){
	var sineValues = [];
	for (var i = 0; i <= 10; i++) {
		sineValues.push({x:i,y:(3*Math.sin(i))+5})
	}
	return sineValues;
}

var drawGraph = function(){
	var svg = d3.select('body')
		.append('svg')
		.attr('width',WIDTH)
		.attr('height',HEIGHT);

	var xScale = d3.scaleLinear().domain([0.0,1.0]).range([0,INNER_WIDTH]);
	var yScale = d3.scaleLinear().domain([0.0,1.0]).range([INNER_HEIGHT,0]);

	var xAxis = d3.axisBottom(xScale).ticks(10);
	svg.append('g')
		.attr('transform', 'translate('+MARGIN+', '+(HEIGHT - MARGIN)+')')
		.call(xAxis);

	var yAxis =  d3.axisLeft(yScale).ticks(10);
	svg.append('g')
		.attr('transform', 'translate('+MARGIN+','+MARGIN+')')
		.call(yAxis);

	var container = svg.append('g').classed('graphs',true)
		.attr('transform', 'translate('+MARGIN+', '+MARGIN+')');

	var graph = container
		.append('g')

	var pointPath = d3.line()
		.x(function(d){ return xScale(d.x/10)})
		.y(function(d){ return yScale(d.y/10)})

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
		.attr('cx',function(d){return xScale(d.x/10)})
		.attr('cy',function(d){return yScale(d.y/10)})
		.attr('r',5);

}

window.onload = function(){
	drawGraph();
}
// createAllCharts(d3.curveCardinal.tension(1))
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

var createSvg = function(counter){
	d3.select('body')
		.append('svg')
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

	_svg = d3.select('svg').append('g').classed('graphs',true)
		.attr('transform', 'translate('+MARGIN+', '+MARGIN+')');

	d3.select('select')
		.selectAll('option')
		.data(interpoletorNames)
		.enter()
		.append('option')
		.text(function(d){return d});
}

var drawGraph = function(className,offset,dataSet,interpolator){
	var graph = _svg
		.append('g')
		.classed(className,true);

	var pointPath = d3.line()
		.x(function(d){ return _xScale(d.x/10)})
		.y(function(d){ return _yScale((offset+d.y)/10)})
		.curve(interpolator);

	graph.append('g')
		.classed(className+'LineGraph',true)
		.append('path')
		.attr('d',pointPath(dataSet));

	var circle = graph
		.append('g')
		.classed(className+'ScatterPlot',true)
		.append('g')
		.selectAll('circle')
		.data(dataSet);

	circle.enter()
		.append('circle')
		.attr('cx',function(d){return _xScale(d.x/10)})
		.attr('cy',function(d){return _yScale((offset+d.y)/10)})
		.attr('r',5);

}

var createAllCharts = function(interpolator){
	d3.select('.graphs g').remove();
	drawGraph('point',0,setOfPoints,interpolator);
	drawGraph('sin',5,generateSineValues(),interpolator);
}

var interpoletors = { curveCardinal : d3.curveCardinal.tension(1),
						curveLinearClosed : d3.curveLinearClosed,
						curveStep : d3.curveStep,
						curveBasis : d3.curveBasis,
						curveBundle : d3.curveBundle.beta(0.75),
						curveCardinalClosed : d3.curveCardinalClosed,
						curveCardinal : d3.curveCardinal,
						curveMonotoneX : d3.curveMonotoneX
					};

var interpoletorNames = Object.keys(interpoletors);

window.onload = function(){
	createSvg();
	d3.select('select')
		.on('change',function(d){ 
			var curveIndex = d3.select('select')
				.property('selectedIndex');
			return createAllCharts(interpoletors[interpoletorNames[curveIndex]])
		}
	);
}

var data = [0,0,1,2,2,2,3,3,4,5,6,6,7,8,9,10,11];

const MARGIN = 30;
const HEIGHT = 600;
const WIDTH = 600;
const INNER_WIDTH = WIDTH - 2*MARGIN;
const INNER_HEIGHT = HEIGHT - 2*MARGIN;

var _xScale,_yScale;

var  loadChart = function(){
	d3.select('body')
		.append('svg')
		.attr('width',WIDTH)
		.attr('height',HEIGHT);

	_xScale = d3.scaleLinear().domain([0,11]).range([0,INNER_WIDTH]);
	_yScale = d3.scaleLinear().domain([0,10]).range([INNER_HEIGHT,0]);

	_svg = d3.select('svg')
		.append('g')
		.classed('graphs',true)
		.attr('transform', 'translate('+MARGIN+', '+MARGIN+')');

	var histogram = d3.histogram()
	    .domain(_xScale.domain());

	var bin = histogram(data);
	console.log(bin);
	var bar =_svg.selectAll("rect")
		.data(bin)
		.enter()
		.append("rect")
		.attr('x',function(d,i){return _xScale(i)})
		.attr('y',function(d){return _yScale(d.length)})
		.attr('width',function(d){return _xScale(d.x1 - d.x0-1)})
		.attr('height',function(d){return INNER_HEIGHT - _yScale(d.length)})
		.style('fill','blueviolet');
}


window.onload = loadChart;
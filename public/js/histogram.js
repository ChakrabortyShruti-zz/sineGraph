var data = [0,0,1,1,2,2,3,4,5,5,8,7,5,7,8,9,10];

const MARGIN = 30;
const HEIGHT = 600;
const WIDTH = 600;
const INNER_WIDTH = WIDTH - 2*MARGIN;
const INNER_HEIGHT = HEIGHT - 2*MARGIN;


var  loadChart = function(){
	console.log(data);
	var svg = d3.select('body')
		.append('svg')
		.attr('width',WIDTH)
		.attr('height',HEIGHT);

	var g = svg.append('g').attr('transform', 'translate(' + MARGIN + ',0)');

	var x = d3.scaleLinear()
		.domain([0,10])
	    .rangeRound([0, INNER_WIDTH]);

	var xAxis = d3.axisBottom(x);
	svg.append('g')
	    .attr('class', 'xAxis')
	    .attr('transform', 'translate('+MARGIN+',' + INNER_HEIGHT + ')')
	    .call(xAxis);

	var histogram = d3.histogram()
	    .domain(x.domain())
	    .thresholds(x.ticks(10))
	    
	var bins = histogram(data);
	console.log(bins);

	var y = d3.scaleLinear()
	    .domain([0, d3.max(bins, function(d) { return d.length; })])
	    .range([INNER_HEIGHT, 0]);

	var bar = g.selectAll('.bar')
	  	.data(bins)
	  	.enter()
		.append('rect')
	  	.attr('class', 'bar')
	    .attr('x', function(d){return x(d.x0)})
	    .attr('y', function(d){return y(d.length)})
	    .attr('width', x(bins[0].x1) - x(bins[0].x0) - 1)
	    .attr('height', function(d) { return INNER_HEIGHT - y(d.length); });

}


window.onload = loadChart;
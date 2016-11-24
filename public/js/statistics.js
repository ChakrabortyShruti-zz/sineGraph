const WIDTH = 600;
const HEIGHT = 600;
const MARGIN = 30;
const INNER_WIDTH = WIDTH - 2*MARGIN;
const INNER_HEIGHT = HEIGHT - 2*MARGIN;

var _svg;
var numbers = [2,4,6,7,1,3,5,8,9,10];

var createChart = function(){
	_svg = d3.select('body').append('svg')
			.attr('width', WIDTH)
			.attr('height', HEIGHT)
			.classed('svg',true);


	_xScale = d3.scaleLinear()
		.domain([0,10])
		.range([0,WIDTH - 2*MARGIN]);

	_yScale = d3.scaleLinear()
		.domain([0,10])
		.range([HEIGHT - 2*MARGIN,0]);

	var xAxis = d3.axisBottom(_xScale).ticks(10);
	var yAxis = d3.axisLeft(_yScale).ticks(10);

	_svg.append('g')
		.attr('transform', 'translate('+MARGIN+', '+(HEIGHT - MARGIN)+')')
		.call(xAxis);

	_svg.append('g')
		.attr('transform', 'translate('+(MARGIN)+', '+ (MARGIN) +')')
		.call(yAxis);

	_svg.append('g')
		.attr('transform','translate('+MARGIN+', '+MARGIN+')')
		.classed('graph',true)
}

var loadBarChart = function(data){
	var rect = d3.select('.graph')
		.selectAll('rect')
	    .data(data,function(d){return d});

  	rect.attr('class', 'update')
  		.style('fill','steelblue');

  	rect.enter().append('rect')
      	.attr('class', 'enter')
      	// .merge(rect)
      	.attr('x', function(d,i) {return _xScale(i)})
      	.attr('width',INNER_WIDTH/(10*2))
      	.attr('y', function(d){return _yScale(d)})
      	.attr('height',function(d){return INNER_HEIGHT-_yScale(d)})
      	.style('fill','lightsteelblue')
      	
  	d3.selectAll('rect').exit().remove();
}

var mediator = function(evaluate){
  	d3.selectAll('rect').exit().remove();
	loadBarChart([evaluate(numbers)])
  	d3.selectAll('rect').exit().remove();
}

window.onload = function(){
	createChart();
	loadBarChart(numbers);
}

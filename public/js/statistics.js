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

var loadBarChart = function(data,color){
	var rect = d3.select('.graph')
		.selectAll('rect')
	    .data(data,function(d){return d});

  	rect.attr('class', 'update')
  		.style('fill',color);

  	rect.enter().append('rect')
      	.attr('class', 'enter')
      	.attr('x', function(d,i) {return _xScale(i)})
      	.attr('width',INNER_WIDTH/(10*2))
      	.attr('y', function(d){return _yScale(d)})
      	.attr('height',function(d){return INNER_HEIGHT-_yScale(d)})
      	.style('fill','lightsteelblue')
      	.merge(rect);

    return rect;
}

var mediator = function(evaluate){
	loadBarChart([evaluate(numbers)],'black');
}

var extent = function(){
	loadBarChart(d3.extent(numbers),'darkred');
}

var addText = function(functionName, evaluateFunc){
	d3.select('.graph')
		.append('text')
		.attr('x','220')
		.attr('y','90')
		.text(functionName+' = '+Math.round(evaluateFunc(numbers)));
}

var sum = function(){
	loadBarChart(numbers,'steelblue');
	d3.select('.graph text').remove()
	addText('sum',d3.sum);
}

var addExtraBar = function(evaluateFunc,color){
	d3.select('.graph')
		.append('rect')
		.attr('x', '243')
      	.attr('width',INNER_WIDTH/(10*2))
      	.attr('y', INNER_HEIGHT-_yScale(evaluateFunc(numbers)))
      	.attr('height', _yScale(evaluateFunc(numbers)))
      	.style('fill',color);
}

var mean = function(){
	addExtraBar(d3.mean,'darkblue');
	d3.select('.graph text').remove();
    addText('mean',d3.mean);
}

var median = function(){
	addExtraBar(d3.median,'deepblue');
	d3.select('.graph text').remove()
	addText('median',d3.median);
}

var variance = function(){
	addExtraBar(d3.variance,'deepblue');
	d3.select('.graph text').remove()
	addText('variance',d3.variance);
}

var deviation = function(){
	addExtraBar(d3.deviation,'deepblue');
	d3.select('.graph text').remove()
	addText('deviation',d3.deviation);
}

window.onload = function(){
	createChart();
	loadBarChart(numbers,'steelblue');
}

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
	d3.select('.rect').remove();
	d3.select('.addedRect').remove();


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
		.attr('y','30')
		.text(functionName+' = '+evaluateFunc(numbers).toFixed(2));
}

var sum = function(){
	loadBarChart(numbers,'steelblue');
	d3.select('.graph text').remove();
	addText('sum',d3.sum);
}

var addExtraBar = function(evaluateFunc,color){
	d3.selectAll('.enter').style('fill'	,'lightsteelblue');
	d3.selectAll('.update').style('fill','lightsteelblue');
	d3.select('.graph')
		.append('rect')
		.classed('addedRect',true)
		.attr('x', '243')
      	.attr('width',INNER_WIDTH/(10*2))
      	.attr('y', function(){return _yScale(evaluateFunc(numbers))})
      	.attr('height', INNER_HEIGHT-_yScale(evaluateFunc(numbers)))
      	.style('fill',color);
}

var resetBars = function(){
	d3.selectAll('.enter').style('fill'	,'lightsteelblue');
	d3.selectAll('.update').style('fill','lightsteelblue');
	d3.select('.graph line').remove();
	d3.select('.addedRect').remove();
} 

var mean = function(){
	resetBars();
	d3.select('.graph')
		.append('line')
		.attr('x1',0)
		.attr('y1',_yScale(d3.mean(numbers)))
		.attr('x2',INNER_WIDTH)
		.attr('y2',_yScale(d3.mean(numbers)))
		.style('stroke','blue')

	d3.select('.graph text').remove();
    addText('mean',d3.mean);
}

var median = function(){
	resetBars();
	addExtraBar(d3.median,'deepblue');
	d3.select('.graph text').remove();
	addText('median',d3.median);
}

var variance = function(){
	resetBars();
	addExtraBar(d3.variance,'deepblue');
	d3.select('.graph text').remove();
	addText('variance',d3.variance);
}

var deviation = function(){
	resetBars();
	addExtraBar(d3.deviation,'deepblue');
	d3.select('.graph text').remove();
	addText('deviation',d3.deviation);
}

window.onload = function(){
	createChart();
	loadBarChart(numbers,'steelblue');
}

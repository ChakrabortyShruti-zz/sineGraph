var numbers = [1, 1, 2, 2, 1, 2, 1];

var drawChart = function(iRadius,oRadius){
	var colorScale = d3.scaleOrdinal(d3.schemeCategory20);

	var arc = d3.arc()
	    .innerRadius(iRadius)
	    .outerRadius(oRadius)

	var pie = d3.pie()
		.sort(null)
		.value(function(d){return d});

	var svg = d3.select('body')
		.append('svg')
		.attr('height',600)
		.attr('width',600);

	var group = svg.append('g')
		.attr('transform','translate(300,300)');

	group.selectAll('path')
		.data(pie(numbers))
		.enter()
		.append('path')
		.attr('d',arc)
		.style('fill',function(d,i){return colorScale(i)});
}

window.onload = function() {
	drawChart(0,200);
	drawChart(100,200);
}
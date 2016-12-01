var numbers = [1, 1, 2, 2, 1, 2, 1];

var fullArc = function(innerRadius,outerRadius){
	return d3.arc()
	    .innerRadius(innerRadius)
	    .outerRadius(outerRadius);
}

var halfArc = function(innerRadius,outerRadius){
	return fullArc(innerRadius,outerRadius)
	    .startAngle(function(d){return d.startAngle/2})
	    .endAngle(function(d){return d.endAngle/2});
}

var createSvg = function(){
	return d3.select('body')
		.append('svg')
		.attr('height',600)
		.attr('width',600)
		.append('g')
		.attr('transform','translate(300,300)');
}

var drawPieChart = function(group,iRadius,oRadius,arcType){
	var colorScale = d3.scaleOrdinal(d3.schemeCategory20);

	var arc = arcType(iRadius,oRadius);

	var pie = d3.pie()
		.sort(null)
		.value(function(d){return d});

	group.selectAll('path')
		.data(pie(numbers))
		.enter()
		.append('path')
		.attr('d',arc)
		.style('fill',function(d,i){return colorScale(i)});
}

var createButton = function(group,type,iRadius,oRadius,arcType){
	d3.select('body .buttonHolder')
		.append('button')
		.text(type)
		.on('click',function(){
			d3.selectAll('path').remove();
			drawPieChart(group,iRadius,oRadius,arcType);
		});
}

window.onload = function() {
	var group = createSvg();
	
	drawPieChart(group,0,200,fullArc);

	createButton(group,'pie',0,200,fullArc);
	createButton(group,'donutPie',100,200,fullArc);
	createButton(group,'halfPie',0,200,halfArc);
	createButton(group,'halfDonutPie',100,200,halfArc);

}
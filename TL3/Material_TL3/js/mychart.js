$(document).ready(function() {

    console.log(all_data);

    // draw coordinate system
    var svg = d3.select('#chart');

    var margin = {top:15, left:40, bottom:40, right:15 };

    var width = 500 
    var height = 500

    var xAxisScale = d3.scaleLinear().domain([0,100]).range([0,width - margin.left - margin.right]);
    var yAxisScale = d3.scaleLinear().domain([0,100]).range([height - margin.top - margin.bottom, 0]);

    var xAxis = d3.axisBottom().scale(xAxisScale);
    var yAxis = d3.axisLeft().scale(yAxisScale);

    svg.append("g")
        .attr("transform", "translate("+[margin.left, height-margin.bottom]+")")
        .call(xAxis);

    svg.append("g")
        .attr("transform", "translate("+[margin.left, margin.top]+")")
        .call(yAxis);

    // text labels for axes
    svg.append("text")             
    .attr("transform",
            "translate(" + (width/2) + " ," + 
                        (height - margin.top + 10) + ")")
    .style("text-anchor", "middle")
    .text("Label 1");

    svg.append("text")             
    .attr("transform",
            "translate(" + 15 + " ," + 
                        (height/2) + "), rotate(-90)")
    .style("text-anchor", "middle")
    .text("Label 2");    
});


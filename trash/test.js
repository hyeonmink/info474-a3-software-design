$(function() {
    d3.json("data.json", function(error, root) {
        var sb = SunBurst();

        var charts = d3.select('#vis')
                        .selectAll('.chart')
                        .data(root)

        charts.enter()
                .append("div")
                .attr('class')

});
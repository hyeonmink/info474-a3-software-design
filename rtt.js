var Rtt = function() {
    var width = 960,
        height = 1060

    var chart = function(selection) {
        selection.each(function(data) {
            console.log(data)
            var data = data.values;
            var element = d3.select(this);
            var svg = element.selectAll("svg").data([data]);

            element.attr("d", function(d) {
                return "M" + project(d.x, d.y)
                    + "C" + project(d.x, (d.y + d.parent.y) / 2)
                    + " " + project(d.parent.x, (d.y + d.parent.y) / 2)
                    + " " + project(d.parent.x, d.parent.y);
            });

            
        })

        function project(x, y) {
            var angle = (x - 90) / 180 * Math.PI, radius = y;
            return [radius * Math.cos(angle), radius * Math.sin(angle)];
        }
    }

    
    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    }

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    }

    return chart;
}
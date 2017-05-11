var Rtt = function() {
    
    var width = 980,
        height = 1100,
        color = d3.schemeCategory20
        colorScale = d3.scaleOrdinal().domain(20).range(color),
        title = "Radial Tidy Tree",
        margin = {
            left: 70,
            bottom: 50,
            top: 50,
            right: 10,
        },
        dotSize = 2.5,
        scale = 1.1;


    var chart = function(selection) {

        var drawWidth = width - margin.left - margin.right;
        var drawHeight = height - margin.bottom - margin.top;

        var stratify = d3.stratify()
        .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

        var tree = d3.tree()
            .size([360, 500])
            .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

        selection.each(function(data) {
            var root = tree(stratify(data));
            var element = d3.select(this);
            var svg = element.selectAll("svg").data([data]);

            var svgEnter = svg.enter()
                .append("svg")
                .attr("width", width)
                .attr("height", height)

            svgEnter.append('text')
                .attr('transform', 'translate(' + (drawWidth / 2) + "," + margin.top + ")")
                .text(title)
                .style("font-size", "34px")
                .attr('class', 'chart-title')

            svgEnter.append('g')
                .attr("transform", "translate(" + (width / 2 + 40) + "," + (height / 2 + 90) + ")")
                .attr("class", 'chartG')

            var link = element.select('.chartG').selectAll('.link').data(root.descendants().slice(1))

            link.enter().append("path")
                .attr("class", "link")
                .attr("d", function(d) {
                    var x = d.x;
                    var y = d.y;
                    var px = d.parent.x;
                    var py = d.parent.y;
                    return "M" + project(x, y)
                    + "C" + project(x, (y + py) / 2)
                    + " " + project(px, (y + py) / 2)
                    + " " + project(px, py);
                });

            link.exit().remove();

            var node = element.select('.chartG').selectAll(".node")
                .data(root.descendants())
                .enter().append("g")
                .style("fill", function(d) { return colorScale(d.children); })
                .attr("class", function(d) {
                    //console.log(d);
                    return "node" + (d.children ? " node--internal" : " node--leaf"); })
                .attr("transform", function(d) { return "translate(" + project(d.x, d.y) + ")"; });

            node.append("circle")
                .attr("r", dotSize)

            node.append("text")
                .attr("dy", ".31em")
                .attr("x", function(d) { return d.x < 180 === !d.children ? 6 : -6; })
                .style("text-anchor", function(d) { return d.x < 180 === !d.children ? "start" : "end"; })
                .attr("transform", function(d) { return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")"; })
                .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });
                 
            node.exit().remove();
        });

        function project(x, y) {
            var angle = (x - 90) / 180 * Math.PI, radius = (y / scale);
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

    chart.color = function(value) {
        if (!arguments.length) return color;
        color = value;
        return chart;
    }

    chart.dotSize = function(value) {
        if (!arguments.length) return dotSize;
        dotSize = value;
        return chart;
    }

    chart.title = function(value) {
        if (!arguments.length) return title;
        title = value;
        return chart;
    }

    chart.scale = function(value) {
        if (!arguments.length) return (((2 - scale) * 10) + 1)
        scale = 2 - Math.floor((value - 1) / 10);
        return chart;
    }

    return chart;
}
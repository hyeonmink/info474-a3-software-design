var SunBurst = function() {
    var width = 960,
        height = 700,
        radius = Math.min(width, height) / 2,
        color = d3.scale.category20c();

    var chart = function(selection) {

        selection.each(function(data) {
            var data = data.values;
            var element = d3.select(this);
            var svg = element.seletAll("svg").data([data]);
        })
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
};
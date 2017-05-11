d3.csv("/data.csv", function(data){
    var rtt = Rtt()
    appData = data;
    function draw(data) {
        var charts = d3.select('#my-div')
                            .datum(data)

        charts.enter().append("div")
            .attr('class', 'chart')
            .merge(charts)
            .call(rtt);
        

        charts.exit().remove()

    }

    $("input").on('change', function() {
            // Get value, determine if it is the sex or type controller
            val = $(this).val();
            switch(val){
                case '1':
                    appData = data.filter((item)=>{
                        return item.id.indexOf('vis') == -1
                    })
                    break;
                case '2' :
                    appData = data;
                    break;
            }
            draw(appData)
    });

    draw(appData)
})

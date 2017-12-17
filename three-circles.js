
var radii = [5, 11, 18]

var svg = d3.select("body")
          .append("svg")

var circle = svg.selectAll("ellipse")
                .data(radii)
                .enter()
                .append("ellipse")
                .attr("rx", function(d){
                  return d
                })
                .attr("ry", function(d){
                  return d*0.3
                })
                .attr("cy", 50) // push circle down
                .attr("cx", function(d,i){
                  return 10+ i*60 // push circle to right
                })

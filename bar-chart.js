
var width = 500
var height = 500

// SVG

var svg = d3.select("body")
            .append("svg")
            .attr("height", height)
            .attr("width", width)

// Defining our scales

var margin = {
  top: 30,
  bottom: 30,
  left: 30,
  right:30
}

//
// margin_top = 30
// margin_bottom = 30
// margin_left = 30
// margin_right = 30


var padded_height = height - margin.top - margin.bottom
var padded_width = width - margin.left - margin.right

var x = d3.scaleBand().rangeRound([0, padded_width]).padding(0.1)
var y = d3.scaleLinear().rangeRound([padded_height, 0])

var g = svg.append("g")
          .attr("transform", "translate("+ margin.left+","+margin.top+")")

d3.csv("data.csv", function(d){
  d.frequency = +d.frequency
  return d

}, function(data){
  // draw chart here
  x.domain(data.map(function(d){ return d.letter }))
  // x.domain = ["A", "B", "C", ...]

  y.domain([0, d3.max(data, function(d){ return d.frequency })])
  // d3.max(data, function(d){ return d.frequency })

  var bar = g.selectAll("rect.bar")
    .data(data)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("x", function(d){
      return x(d.letter)
    })
    .attr("y", function(d){
      return y(d.frequency)
    })
    .attr("fill", "#189ad3")
    .attr("opacity", 0.5)
    .attr("width", x.bandwidth())
    .attr("height", function(d){
      return padded_height-y(d.frequency)
    })

  bar.on("mouseover", function(){
    d3.select(this)
      .attr("fill", "#ff3232")
  })

  bar.on("click", function(){
    if (d3.select(this).classed("clicked")) {
      d3.select(this).classed("clicked", false)
    } else {
      d3.select(this)
        .attr("fill", "#4cff4c")
        .classed("clicked", true)
    }


  })

  // bar.on("click", function(){
  //   if (d3.select(this).classed("clicked")) {
  //     d3.select(this).classed("clicked", false)
  //   }
  // })

  bar.on("mouseout", function(){
    d3.select(this)
      .attr("fill", function(){
        if (d3.select(this).classed("clicked")) {
          return "#4cff4c"
        } else {
          return "#189ad3"
        }
      })
  })

  g.append("g")
    .attr("transform", "translate(0,"+ (padded_height) +")")
    .call(d3.axisBottom(x))

  g.append("g")
    .call(d3.axisLeft(y).ticks(10, "%"))


})

// d3 code goes here too

// var data = [12, 342, 34, 432, 432, 22, 34]

var data = [
  {value: 12, name: "a"},
  {value: 132, name: "b"},
  {value: 143, name: "c"},
  {value: 412, name: "d"},
  {value: 312, name: "e"},
  {value: 112, name: "f"},
]

var svg = d3.select("body").append("svg")

var div = d3.select("body").append("div")

div.append("ul")
  .selectAll("li")
  .data(data)
  .enter()
  .append("li")
  .text(function(d){
    return d.name + ": " + d.value
  })

svg.append("rect")
  .classed("legend", true)
  .attr("x", 65)
  .attr("y", 525)
  .attr("height", 10)
  .attr("width", 10)
  .attr("opacity", "0.4")
  .attr("fill", "red")

svg.append("text")
  .classed("label", true)
  .attr("x", 85)
  .attr("y", 535)
  .text("Value")

svg.attr("height", "600")
  .attr("width", "100%")

var rect_bar = svg.selectAll("rect.bar")
  .data(data) // this where the data-binding happens
  .enter() // pair of data[i] --> <rect></rect>
  .append("rect")
  .classed("bar", true)
  .attr("x", function(d, i){

    return i*130

  })
  .attr("y", function(d){
    return 500-d.value
  })
  .attr("width", 100)
  .attr("height", function(d){
    return d.value
  })
  .attr("fill", "red")
  .attr("opacity", "0.4")

rect_bar.on("mouseover", function(d){
  console.log(d)
  var selection = d3.select(this)
  selection
    .transition()
    .duration(1000)
    .ease(d3.easeElastic)
    .attr("fill", "green")
    .attr("height", function(){
      return d.value+10
    })
    .attr("y", function(){
      return 500-d.value-10
    })

})

rect_bar.on("mouseout", function(d){
  console.log(d)
  var selection = d3.select(this)
  selection
    .attr("fill", "red")
    .attr("height", function(){
      return d.value
    })
    .transition()
    .attr("y", function(){
      return 500-d.value-10
    })


})


svg.selectAll("text.value")
  .data(data)
  .enter()
  .append("text")
  .classed("value", true)
  .attr("x", function(d, i){

    return i*130+40

  })
  .attr("y", function(d){
    return 500-d.value-4
  })
  .text(function(d){
    return d.value
  })

d3.select("#chart").select(".item").text("Hello")

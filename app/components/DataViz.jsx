import React, { useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

const DataViz = ({ data, options, type, width, height }) => {
  const ref = useRef();

  const drawBarChart = useCallback(() => {
    if (!options.label || !options.color) return;

    const margin = { top: 20, right: 20, bottom: 60, left: 40 };
    const adjustedWidth = width - margin.left - margin.right;
    const adjustedHeight = height - margin.top - margin.bottom;

    d3.select(ref.current).selectAll("*").remove();

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d[options.label]))
      .rangeRound([0, adjustedWidth])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .rangeRound([adjustedHeight, 0]);

    svg
      .append("g")
      .attr("transform", `translate(0,${adjustedHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("dy", ".35em")
      .attr("y", 10)
      .attr("transform", "rotate(45)")
      .style("text-anchor", "start");

    svg.append("g").call(d3.axisLeft(y));

    svg
      .selectAll("mybar")
      .data(data, (d) => d[options.label])
      .enter()
      .append("rect")
      .attr("x", (d) => x(d[options.label]))
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => adjustedHeight - y(d.value))
      .attr("fill", options.color);
  }, [data, options, width, height]);

  const drawPieChart = useCallback(() => {
    if (!options.label || !options.color) return;

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove();

    const radius = Math.min(width, height) / 2;

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const pie = d3.pie().value((d) => d.value);
    const data_ready = pie(data);

    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    g.selectAll("mySlices")
      .data(data_ready, (d) => d.data[options.label])
      .enter()
      .append("path")
      .attr("d", arcGenerator)
      .attr("fill", options.color)
      .attr("stroke", "#000000")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    g.selectAll("mySlices")
      .data(data_ready, (d) => d.data[options.label])
      .enter()
      .append("text")
      .text((d) => d.data[options.label])
      .attr("transform", (d) => "translate(" + arcGenerator.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 15);
  }, [data, options, width, height]);

  useEffect(() => {
    if (type === "bar") {
      drawBarChart();
    } else if (type === "pie") {
      drawPieChart();
    } else {
      console.error(`Invalid chart type: ${type}`);
    }
  }, [data, type, width, height, drawBarChart, drawPieChart]);

  return (
    <div className="chart">
      <svg ref={ref} width={width} height={height}></svg>
    </div>
  );
};

DataViz.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  options: PropTypes.shape({
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.oneOf(["bar", "pie"]).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default DataViz;

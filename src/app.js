const fmt = d3.format(",");
const fmt1 = d3.format(".1f");
const color = d3.scaleOrdinal()
  .range(["#70e1d4", "#f6bd60", "#b8a1ff", "#ff7a90", "#8bd17c", "#7cc9ff", "#f39ac7", "#c6d66f"]);

const tooltip = d3.select("#tooltip");
const showTip = (event, html) => {
  tooltip.html(html).attr("hidden", null)
    .style("left", `${Math.min(event.clientX + 16, window.innerWidth - 340)}px`)
    .style("top", `${event.clientY + 16}px`);
};
const hideTip = () => tooltip.attr("hidden", true);

const num = (d, fallback = 0) => {
  const v = +d;
  return Number.isFinite(v) ? v : fallback;
};

Promise.all([
  d3.csv("data/papers_enriched.csv", d3.autoType),
  d3.csv("data/award_timeline.csv", d3.autoType),
  d3.csv("data/recognition_lag_distribution.csv", d3.autoType),
  d3.csv("data/venue_stats.csv", d3.autoType),
  d3.csv("data/venue_area_stats.csv", d3.autoType),
  d3.csv("data/topic_stats.csv", d3.autoType),
  d3.csv("data/topic_year_stats.csv", d3.autoType),
  d3.csv("data/citation_trajectories.csv", d3.autoType),
  d3.csv("data/citing_breadth_metrics.csv", d3.autoType),
  d3.csv("data/institution_stats.csv", d3.autoType),
  d3.csv("data/country_stats.csv", d3.autoType)
]).then(([papers, timeline, lag, venues, areas, topics, topicYears, citations, breadth, institutions, countries]) => {
  const data = { papers, timeline, lag, venues, areas, topics, topicYears, citations, breadth, institutions, countries };
  normalize(data);
  renderSummary(data);
  renderLag(data.lag);
  renderAwardTimeline(data.timeline, data.papers);
  renderVenue(data.venues);
  renderAreas(data.areas);
  renderTopics(data.topics, data.papers);
  renderTopicEvolution(data.topicYears);
  renderScatter(data.timeline, data.papers);
  renderTrajectory(data.citations, data.papers);
  renderBreadth(data.timeline, data.papers);
  renderInstitutions(data.institutions);
  renderCountries(data.countries);
  updateDetail(topPaper(data.papers));
  setNotes(data);
}).catch(err => {
  console.error(err);
  document.body.insertAdjacentHTML("afterbegin", `<pre style="padding:20px;color:#ffb4c1">Data loading failed: ${err.message}</pre>`);
});

function normalize(data) {
  for (const row of data.papers) {
    row.year = num(row.year);
    row.announcement_year = num(row.announcement_year);
    row.recognition_lag = num(row.recognition_lag);
    row.citation_count = num(row.citation_count);
    row.impact_breadth_score = num(row.impact_breadth_score);
    row.topic_label = row.topic_label || "Other";
    row.venue_area = row.venue_area || "Other";
  }
  for (const row of data.timeline) {
    row.year = num(row.year);
    row.announcement_year = num(row.announcement_year);
    row.recognition_lag = num(row.recognition_lag);
    row.citation_count = num(row.citation_count);
    row.impact_breadth_score = num(row.impact_breadth_score);
    row.citing_field_count = num(row.citing_field_count);
    row.citing_country_count = num(row.citing_country_count);
  }
  for (const row of data.topicYears) {
    row.publication_year = num(row.publication_year);
    row.paper_count = num(row.paper_count);
    row.proportion = num(row.proportion);
  }
}

function renderSummary({papers, venues, topics}) {
  const years = d3.extent(papers, d => d.year).filter(Boolean);
  const lagMedian = d3.median(papers, d => d.recognition_lag);
  const totalCitations = d3.sum(papers, d => d.citation_count);
  const cards = [
    [fmt(papers.length), "Test of Time papers"],
    [`${years[0]}–${years[1]}`, "publication years"],
    [fmt1(lagMedian), "median recognition lag"],
    [fmt(totalCitations), "total citations captured"]
  ];
  d3.select("#summary-cards").selectAll("div")
    .data(cards).join("div")
    .attr("class", "summary-card")
    .html(d => `<div class="value">${d[0]}</div><div class="label">${d[1]}</div>`);
}

function chartBox(sel) {
  const node = d3.select(sel).node();
  const width = Math.max(320, node.getBoundingClientRect().width || 640);
  const height = node.classList.contains("tall") ? 390 : 300;
  d3.select(sel).selectAll("*").remove();
  return {svg: d3.select(sel).append("svg").attr("viewBox", [0,0,width,height]), width, height};
}

function renderLag(rows) {
  const {svg, width, height} = chartBox("#lag-chart");
  const margin = {top: 18, right: 22, bottom: 46, left: 52};
  const x = d3.scaleBand().domain(rows.map(d => d.lag_bin)).range([margin.left, width - margin.right]).padding(0.18);
  const y = d3.scaleLinear().domain([0, d3.max(rows, d => d.paper_count)]).nice().range([height - margin.bottom, margin.top]);
  svg.append("g").attr("class", "grid").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5).tickSize(-(width-margin.left-margin.right)).tickFormat(""));
  svg.append("g").attr("class", "axis").attr("transform", `translate(0,${height-margin.bottom})`).call(d3.axisBottom(x));
  svg.append("g").attr("class", "axis").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5));
  svg.selectAll("rect.bar").data(rows).join("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.lag_bin)).attr("y", d => y(d.paper_count))
    .attr("width", x.bandwidth()).attr("height", d => y(0) - y(d.paper_count))
    .attr("rx", 8).attr("fill", "url(#lagGrad)")
    .on("mousemove", (e,d) => showTip(e, `<b>${d.lag_bin}</b><br>${d.paper_count} papers<br>Avg citations: ${fmt(num(d.avg_citation_count))}`))
    .on("mouseleave", hideTip);
  addGradient(svg, "lagGrad", "#70e1d4", "#3d8ee8");
}

function renderAwardTimeline(rows, papers) {
  const {svg, width, height} = chartBox("#timeline-chart");
  const margin = {top: 18, right: 26, bottom: 48, left: 58};
  const clean = rows.filter(d => d.year && d.announcement_year);
  const x = d3.scaleLinear().domain(d3.extent(clean, d => d.year)).nice().range([margin.left, width-margin.right]);
  const y = d3.scaleLinear().domain(d3.extent(clean, d => d.announcement_year)).nice().range([height-margin.bottom, margin.top]);
  const r = d3.scaleSqrt().domain(d3.extent(clean, d => d.citation_count)).range([3, 11]);
  svg.append("g").attr("class", "grid").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5).tickSize(-(width-margin.left-margin.right)).tickFormat(""));
  svg.append("g").attr("class", "axis").attr("transform", `translate(0,${height-margin.bottom})`).call(d3.axisBottom(x).ticks(6).tickFormat(d3.format("d")));
  svg.append("g").attr("class", "axis").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5).tickFormat(d3.format("d")));
  svg.append("text").attr("class", "chart-title-small").attr("x", width/2).attr("y", height-8).attr("text-anchor", "middle").text("publication year");
  svg.append("text").attr("class", "chart-title-small").attr("x", -height/2).attr("y", 14).attr("text-anchor", "middle").attr("transform", "rotate(-90)").text("award year");
  svg.selectAll("circle.timeline-dot").data(clean).join("circle")
    .attr("class", "dot timeline-dot")
    .attr("cx", d => x(d.year)).attr("cy", d => y(d.announcement_year))
    .attr("r", d => r(d.citation_count)).attr("fill", d => color(d.venue_area)).attr("opacity", 0.68)
    .on("mousemove", (e,d) => showTip(e, `<b>${escapeHtml(d.title)}</b><br>${d.venue} · ${d.year} → ${d.announcement_year}<br>Lag: ${d.recognition_lag} years<br>Citations: ${fmt(d.citation_count)}`))
    .on("mouseleave", hideTip)
    .on("click", (_,d) => updateDetail(papers.find(p => p.paper_id === d.paper_id) || d));
  const longest = clean.slice().sort((a,b) => d3.descending(a.recognition_lag,b.recognition_lag))[0];
  if (longest) addCallout(svg, x(longest.year), y(longest.announcement_year), `Longest lag · ${longest.recognition_lag}y`, 18, -18);
}

function renderVenue(rows) {
  const top = rows.slice().sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count))).slice(0, 12);
  horizontalBars("#venue-chart", top, "venue", "paper_count", "#70e1d4", d => `${d.venue_area || ""}<br>${d.paper_count} papers<br>Avg lag: ${fmt1(num(d.avg_recognition_lag))} years`);
}

function renderAreas(rows) {
  const top = rows.slice().sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count))).slice(0, 12);
  horizontalBars("#area-chart", top, "venue_area", "paper_count", "#f6bd60", d => `${d.venue_area}<br>${d.paper_count} papers<br>Avg citations: ${fmt(num(d.avg_citation_count))}`);
}

function renderTopics(rows, papers) {
  const top = rows.slice().sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count))).slice(0, 10);
  horizontalBars("#topic-chart", top, "topic_label", "paper_count", "#b8a1ff", d => `${d.topic_label}<br>${d.paper_count} papers<br>Avg breadth: ${fmt1(num(d.avg_impact_breadth_score))}`, d => {
    const p = papers.filter(x => x.topic_label === d.topic_label).sort((a,b) => d3.descending(a.citation_count, b.citation_count))[0];
    if (p) updateDetail(p);
  });
}

function renderTopicEvolution(rows) {
  const {svg, width, height} = chartBox("#topic-evolution-chart");
  const margin = {top: 20, right: 150, bottom: 48, left: 52};
  const topTopics = Array.from(d3.rollup(rows, v => d3.sum(v, d => d.paper_count), d => d.topic_label).entries())
    .sort((a,b) => d3.descending(a[1], b[1])).slice(0, 7).map(d => d[0]);
  const years = Array.from(new Set(rows.map(d => d.publication_year))).sort(d3.ascending);
  const byYear = years.map(year => {
    const o = {year};
    for (const topic of topTopics) o[topic] = 0;
    for (const d of rows.filter(r => r.publication_year === year && topTopics.includes(r.topic_label))) o[d.topic_label] += d.paper_count;
    return o;
  });
  const stack = d3.stack().keys(topTopics).offset(d3.stackOffsetExpand)(byYear);
  const x = d3.scaleLinear().domain(d3.extent(years)).range([margin.left, width-margin.right]);
  const y = d3.scaleLinear().domain([0,1]).range([height-margin.bottom, margin.top]);
  const area = d3.area().x(d => x(d.data.year)).y0(d => y(d[0])).y1(d => y(d[1])).curve(d3.curveBasis);
  svg.append("g").attr("class", "axis").attr("transform", `translate(0,${height-margin.bottom})`).call(d3.axisBottom(x).ticks(7).tickFormat(d3.format("d")));
  svg.append("g").attr("class", "axis").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5, "%"));
  svg.selectAll("path.topic-area").data(stack).join("path")
    .attr("class", "topic-area")
    .attr("d", area)
    .attr("fill", d => color(d.key)).attr("opacity", 0.72)
    .on("mousemove", (e,d) => showTip(e, `<b>${escapeHtml(d.key)}</b><br>Share among top topic groups over time`))
    .on("mouseleave", hideTip);
  const legend = svg.append("g").attr("transform", `translate(${width-margin.right+18},${margin.top})`);
  legend.selectAll("g").data(topTopics).join("g").attr("transform", (_,i) => `translate(0,${i*22})`).each(function(d){
    const g=d3.select(this); g.append("rect").attr("width",10).attr("height",10).attr("rx",2).attr("fill",color(d));
    g.append("text").attr("x",16).attr("y",9).attr("fill","#cdd6e5").attr("font-size",11).text(d.length>18?d.slice(0,18)+"…":d);
  });
}

function horizontalBars(sel, rows, labelKey, valueKey, fill, tip, onClick) {
  const {svg, width, height} = chartBox(sel);
  const margin = {top: 16, right: 26, bottom: 34, left: 132};
  const x = d3.scaleLinear().domain([0, d3.max(rows, d => num(d[valueKey]))]).nice().range([margin.left, width - margin.right]);
  const y = d3.scaleBand().domain(rows.map(d => d[labelKey])).range([margin.top, height - margin.bottom]).padding(0.22);
  svg.append("g").attr("class", "grid").attr("transform", `translate(0,${height-margin.bottom})`).call(d3.axisBottom(x).ticks(5).tickSize(-(height-margin.top-margin.bottom)).tickFormat(""));
  svg.append("g").attr("class", "axis").attr("transform", `translate(0,${height-margin.bottom})`).call(d3.axisBottom(x).ticks(5));
  svg.append("g").attr("class", "axis").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).tickSize(0)).call(g => g.select(".domain").remove());
  svg.selectAll("rect.bar").data(rows).join("rect")
    .attr("class", "bar")
    .attr("x", margin.left).attr("y", d => y(d[labelKey]))
    .attr("height", y.bandwidth()).attr("width", d => x(num(d[valueKey])) - margin.left)
    .attr("rx", 8).attr("fill", fill)
    .on("mousemove", (e,d) => showTip(e, `<b>${d[labelKey]}</b><br>${tip(d)}`))
    .on("mouseleave", hideTip)
    .on("click", (_,d) => onClick && onClick(d));
  svg.selectAll("text.value").data(rows).join("text")
    .attr("x", d => x(num(d[valueKey])) + 6).attr("y", d => y(d[labelKey]) + y.bandwidth()/2 + 4)
    .attr("fill", "#cdd6e5").attr("font-size", 11).text(d => fmt(num(d[valueKey])));
}

function renderScatter(timeline, papers) {
  const {svg, width, height} = chartBox("#scatter-chart");
  const margin = {top: 18, right: 26, bottom: 48, left: 58};
  const rows = timeline.filter(d => d.recognition_lag && d.citation_count);
  const x = d3.scaleLinear().domain(d3.extent(rows, d => d.recognition_lag)).nice().range([margin.left, width-margin.right]);
  const y = d3.scaleLog().domain([Math.max(1, d3.min(rows, d => d.citation_count)), d3.max(rows, d => d.citation_count)]).range([height-margin.bottom, margin.top]);
  const area = d3.scaleOrdinal().domain([...new Set(rows.map(d => d.venue_area))]).range(color.range());
  svg.append("g").attr("class", "grid").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5, ",~s").tickSize(-(width-margin.left-margin.right)).tickFormat(""));
  svg.append("g").attr("class", "axis").attr("transform", `translate(0,${height-margin.bottom})`).call(d3.axisBottom(x));
  svg.append("g").attr("class", "axis").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5, ",~s"));
  svg.append("text").attr("class", "chart-title-small").attr("x", width/2).attr("y", height-8).attr("text-anchor", "middle").text("recognition lag (years)");
  svg.append("text").attr("class", "chart-title-small").attr("x", -height/2).attr("y", 14).attr("text-anchor", "middle").attr("transform", "rotate(-90)").text("citation count (log)");
  svg.selectAll("circle.dot").data(rows).join("circle")
    .attr("class", "dot")
    .attr("cx", d => x(d.recognition_lag)).attr("cy", d => y(d.citation_count))
    .attr("r", d => 3 + Math.sqrt(Math.max(0, num(d.impact_breadth_score))) / 3)
    .attr("fill", d => area(d.venue_area)).attr("opacity", 0.78)
    .on("mousemove", (e,d) => showTip(e, `<b>${d.title}</b><br>${d.venue} · ${d.year} → ${d.announcement_year}<br>Lag: ${d.recognition_lag} years<br>Citations: ${fmt(d.citation_count)}`))
    .on("mouseleave", hideTip)
    .on("click", (_,d) => updateDetail(papers.find(p => p.paper_id === d.paper_id) || d));
}

function renderTrajectory(rows, papers) {
  const topIds = new Set(papers.slice().sort((a,b) => d3.descending(a.citation_count, b.citation_count)).slice(0, 6).map(d => d.paper_id));
  const filtered = rows.filter(d => topIds.has(d.paper_id) && num(d.years_since_publication) <= 30);
  const grouped = d3.groups(filtered, d => d.paper_id).map(([id, values]) => ({id, title: values[0].title, values: values.sort((a,b) => d3.ascending(num(a.years_since_publication), num(b.years_since_publication)))}));
  const {svg, width, height} = chartBox("#trajectory-chart");
  const margin = {top: 18, right: 28, bottom: 48, left: 64};
  const x = d3.scaleLinear().domain([0, d3.max(filtered, d => num(d.years_since_publication))]).range([margin.left, width-margin.right]);
  const y = d3.scaleLinear().domain([0, d3.max(filtered, d => num(d.cumulative_citations))]).nice().range([height-margin.bottom, margin.top]);
  svg.append("g").attr("class", "grid").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5).tickSize(-(width-margin.left-margin.right)).tickFormat(""));
  svg.append("g").attr("class", "axis").attr("transform", `translate(0,${height-margin.bottom})`).call(d3.axisBottom(x).ticks(6));
  svg.append("g").attr("class", "axis").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5, "~s"));
  const line = d3.line().x(d => x(num(d.years_since_publication))).y(d => y(num(d.cumulative_citations))).curve(d3.curveMonotoneX);
  svg.selectAll("path.line-path").data(grouped).join("path")
    .attr("class", "line-path")
    .attr("d", d => line(d.values))
    .attr("stroke", (d,i) => color(i))
    .on("mousemove", (e,d) => showTip(e, `<b>${d.title}</b><br>Cumulative trajectory after publication`))
    .on("mouseleave", hideTip);
}

function renderBreadth(rows, papers) {
  const {svg, width, height} = chartBox("#breadth-chart");
  const margin = {top: 18, right: 28, bottom: 50, left: 58};
  const clean = rows.filter(d => d.citation_count && d.impact_breadth_score);
  const x = d3.scaleLinear().domain([0, d3.max(clean, d => d.impact_breadth_score)]).nice().range([margin.left, width-margin.right]);
  const y = d3.scaleLog().domain([Math.max(1, d3.min(clean, d => d.citation_count)), d3.max(clean, d => d.citation_count)]).range([height-margin.bottom, margin.top]);
  svg.append("g").attr("class", "grid").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5, ",~s").tickSize(-(width-margin.left-margin.right)).tickFormat(""));
  svg.append("g").attr("class", "axis").attr("transform", `translate(0,${height-margin.bottom})`).call(d3.axisBottom(x).ticks(5));
  svg.append("g").attr("class", "axis").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5, ",~s"));
  svg.append("text").attr("class", "chart-title-small").attr("x", width/2).attr("y", height-8).attr("text-anchor", "middle").text("impact breadth score");
  svg.append("text").attr("class", "chart-title-small").attr("x", -height/2).attr("y", 14).attr("text-anchor", "middle").attr("transform", "rotate(-90)").text("citation count (log)");
  svg.selectAll("circle.breadth-dot").data(clean).join("circle")
    .attr("class", "dot breadth-dot")
    .attr("cx", d => x(d.impact_breadth_score)).attr("cy", d => y(d.citation_count))
    .attr("r", d => 3 + Math.sqrt(num(d.citing_country_count)) * 1.2)
    .attr("fill", d => color(d.venue_area)).attr("opacity", 0.7)
    .on("mousemove", (e,d) => showTip(e, `<b>${escapeHtml(d.title)}</b><br>Breadth: ${fmt1(d.impact_breadth_score)}<br>Citing fields: ${fmt(d.citing_field_count)}<br>Citing countries: ${fmt(d.citing_country_count)}<br>Citations: ${fmt(d.citation_count)}`))
    .on("mouseleave", hideTip)
    .on("click", (_,d) => updateDetail(papers.find(p => p.paper_id === d.paper_id) || d));
  const high = clean.slice().sort((a,b) => d3.descending(a.impact_breadth_score,b.impact_breadth_score))[0];
  if (high) addCallout(svg, x(high.impact_breadth_score), y(high.citation_count), "Widest diffusion", -96, -20);
}

function renderInstitutions(rows) {
  const top = rows.slice().filter(d => d.name).sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count))).slice(0, 12);
  horizontalBars("#institution-chart", top, "name", "paper_count", "#70e1d4", d => `${d.country || "country unknown"}<br>${d.paper_count} papers<br>Centrality: ${num(d.centrality)}`);
}

function renderCountries(rows) {
  const top = rows.slice().sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count))).slice(0, 12);
  horizontalBars("#country-chart", top, "country", "paper_count", "#f6bd60", d => `${d.paper_count} papers<br>Avg citations: ${fmt(num(d.avg_citation_count))}`);
}

function topPaper(papers) {
  return papers.slice().sort((a,b) => d3.descending(a.citation_count, b.citation_count))[0];
}

function updateDetail(p) {
  if (!p) return;
  d3.select("#paper-detail").html(`
    <div class="paper-title">${escapeHtml(p.title || "Untitled")}</div>
    <div class="paper-meta">
      <span class="chip">${p.venue || "Venue"}</span>
      <span class="chip">${p.year || "Year"} → ${p.announcement_year || "Award"}</span>
      <span class="chip">${p.topic_label || "Topic"}</span>
    </div>
    <div class="detail-stats">
      <div class="detail-stat"><b>${fmt(num(p.recognition_lag))}</b><span>recognition lag</span></div>
      <div class="detail-stat"><b>${fmt(num(p.citation_count))}</b><span>citations</span></div>
      <div class="detail-stat"><b>${fmt1(num(p.impact_breadth_score))}</b><span>impact breadth</span></div>
      <div class="detail-stat"><b>${fmt(num(p.country_count || p.citing_country_count))}</b><span>countries</span></div>
    </div>
    <p class="abstract">${escapeHtml((p.abstract || "No abstract available.").slice(0, 520))}${(p.abstract || "").length > 520 ? "…" : ""}</p>
  `);
}

function setNotes({papers, venues, areas, topics}) {
  const lagMedian = d3.median(papers, d => d.recognition_lag);
  const longest = papers.slice().sort((a,b) => d3.descending(a.recognition_lag, b.recognition_lag))[0];
  const topVenue = venues.slice().sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count)))[0];
  const topArea = areas.slice().sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count)))[0];
  const topTopic = topics.slice().sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count)))[0];
  d3.select("#time-note").text(`Median recognition lag is ${fmt1(lagMedian)} years; the longest-lag paper in this dataset waited ${longest.recognition_lag} years before recognition.`);
  d3.select("#venue-note").text(`${topVenue.venue} has the largest count among venues, while ${topArea.venue_area} is the largest broader field in this dataset.`);
  d3.select("#topic-note").text(`${topTopic.topic_label} is the most frequent topic label, giving the topic module a natural entry point for representative-paper storytelling.`);
  d3.select("#citation-note").text(`The scatter plot separates citation volume from recognition timing: high citation counts and long recognition lags are related but not identical signals.`);
  d3.select("#network-note").text(`Institution and country rankings show where long-term impact clusters, while also reminding us that metadata coverage is uneven.`);
}

function addCallout(svg, x, y, label, dx=18, dy=-16) {
  const g = svg.append("g").attr("class", "callout");
  g.append("line").attr("x1", x).attr("y1", y).attr("x2", x+dx).attr("y2", y+dy).attr("stroke", "rgba(255,255,255,0.42)").attr("stroke-width", 1);
  g.append("text").attr("x", x+dx+4).attr("y", y+dy-2).attr("fill", "#eef4ff").attr("font-size", 11).text(label);
}

function addGradient(svg, id, a, b) {
  const defs = svg.append("defs");
  const grad = defs.append("linearGradient").attr("id", id).attr("x1", "0%").attr("x2", "0%").attr("y1", "0%").attr("y2", "100%");
  grad.append("stop").attr("offset", "0%").attr("stop-color", a);
  grad.append("stop").attr("offset", "100%").attr("stop-color", b);
}

function escapeHtml(str) {
  return String(str).replace(/[&<>'"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[ch]));
}

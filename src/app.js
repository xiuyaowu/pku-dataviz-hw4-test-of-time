const fmt = d3.format(",");
const fmt1 = d3.format(".1f");
const color = d3.scaleOrdinal()
  .range(["#70e1d4", "#f6bd60", "#b8a1ff", "#ff7a90", "#8bd17c", "#7cc9ff", "#f39ac7", "#c6d66f"]);

let activePapers = [];
const tooltip = d3.select("#tooltip");
const showTip = (event, html) => {
  tooltip.html(html).attr("hidden", null)
    .style("left", `${Math.min(event.clientX + 16, window.innerWidth - 340)}px`)
    .style("top", `${event.clientY + 16}px`);
};
const hideTip = () => tooltip.attr("hidden", true);

initPresentationMode();

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
  activePapers = data.papers;
  renderSummary(data);
  renderInsightDeck(data);
  renderTimeExtremes(data.papers);
  renderLag(data.lag);
  renderAwardTimeline(data.timeline, data.papers);
  renderVenue(data.venues);
  renderAreas(data.areas);
  renderVenueDecadeMatrix(data.papers);
  renderTopics(data.topics, data.papers);
  renderTopicEvolution(data.topicYears);
  renderScatter(data.timeline, data.papers);
  renderTrajectory(data.citations, data.papers);
  renderBreadth(data.timeline, data.papers);
  renderCitationQuadrants(data.timeline);
  renderExplorer(data.papers);
  renderBenchmark(data.papers);
  renderStoryboard(data);
  renderNetworkKpis(data.institutions, data.countries);
  renderModuleClaims(data);
  renderInstitutions(data.institutions);
  renderCountries(data.countries);
  updateDetail(topPaper(data.papers));
  setNotes(data);
}).catch(err => {
  console.error(err);
  document.body.insertAdjacentHTML("afterbegin", `<pre style="padding:20px;color:#ffb4c1">Data loading failed: ${err.message}</pre>`);
});

function initPresentationMode() {
  const root = document.body;
  const toggle = document.getElementById("presentation-toggle");
  const params = new URLSearchParams(window.location.search);
  const shouldStart = params.get("present") === "1" || window.location.hash === "#present";

  const setMode = enabled => {
    root.classList.toggle("presentation-mode", enabled);
    if (toggle) toggle.setAttribute("aria-pressed", enabled ? "true" : "false");
  };

  setMode(shouldStart);
  if (toggle) toggle.addEventListener("click", () => setMode(!root.classList.contains("presentation-mode")));
  window.addEventListener("keydown", event => {
    const tag = event.target && event.target.tagName ? event.target.tagName.toLowerCase() : "";
    if (event.key.toLowerCase() === "p" && !["input", "textarea", "select"].includes(tag)) {
      setMode(!root.classList.contains("presentation-mode"));
    }
  });
}

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
    .on("mousemove", (e,d) => showTip(e, `<b>${d.lag_bin}</b><br>${d.paper_count} papers<br>Recognition lag = announcement year − publication year<br>Avg citations: ${fmt(num(d.avg_citation_count))}`))
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
  const avg = d3.mean(rows, d => num(d[valueKey]));
  if (Number.isFinite(avg)) {
    const ax = x(avg);
    svg.append("line").attr("class", "reference-line").attr("x1", ax).attr("x2", ax).attr("y1", margin.top).attr("y2", height - margin.bottom);
    svg.append("text").attr("class", "reference-label").attr("x", ax + 5).attr("y", margin.top + 11).text(`visible avg · ${fmt1(avg)}`);
  }
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
  const mx = d3.median(rows, d => d.recognition_lag);
  const my = d3.median(rows, d => d.citation_count);
  addReferenceGuides(svg, x(mx), y(my), width, height, margin, "median lag", "median citations");
  svg.append("text").attr("class", "quadrant-label").attr("x", x(mx)+8).attr("y", y(my)-12).text("high citation · long recognition");
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
  const mx = d3.median(clean, d => d.impact_breadth_score);
  const my = d3.median(clean, d => d.citation_count);
  addReferenceGuides(svg, x(mx), y(my), width, height, margin, "median breadth", "median citations");
  svg.append("text").attr("class", "quadrant-label").attr("x", x(mx)+8).attr("y", y(my)-12).text("broad and deep impact");
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


function renderInsightDeck({papers, venues, topics}) {
  const lagMedian = d3.median(papers, d => d.recognition_lag);
  const topVenue = venues.slice().sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count)))[0];
  const topTopic = topics.slice().sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count)))[0];
  const highBreadth = papers.slice().sort((a,b) => d3.descending(num(a.impact_breadth_score), num(b.impact_breadth_score)))[0];
  const cards = [
    {metric: `${fmt1(lagMedian)}y`, title: "Time scale", body: "Median recognition lag anchors the project around delayed scholarly recognition."},
    {metric: topVenue?.venue || "Venue", title: "Community signal", body: `${topVenue?.venue || "The top venue"} contributes the largest visible venue cluster in this award dataset.`},
    {metric: fmt1(num(highBreadth?.impact_breadth_score)), title: "Diffusion peak", body: `${shortTitle(highBreadth?.title)} has the highest breadth proxy among enriched papers.`},
    {metric: topTopic?.topic_label || "Topic", title: "Topic entry", body: "The most frequent topic group gives the report a concrete representative-paper entry point."}
  ];
  d3.select("#insight-deck").selectAll(".insight-card").data(cards).join("div")
    .attr("class", "insight-card")
    .html(d => `<div class="metric">${escapeHtml(d.metric)}</div><div class="title">${escapeHtml(d.title)}</div><div class="body">${escapeHtml(d.body)}</div>`);
}

function renderTimeExtremes(papers) {
  const longest = papers.slice().sort((a,b) => d3.descending(a.recognition_lag, b.recognition_lag))[0];
  const fastest = papers.filter(d => d.recognition_lag > 0).sort((a,b) => d3.ascending(a.recognition_lag, b.recognition_lag))[0];
  const highestCited = topPaper(papers);
  const cards = [
    {metric: `${longest.recognition_lag}y`, title: "Longest lag", body: shortTitle(longest.title)},
    {metric: `${fastest.recognition_lag}y`, title: "Shortest lag", body: shortTitle(fastest.title)},
    {metric: fmt(highestCited.citation_count), title: "Most cited", body: shortTitle(highestCited.title)}
  ];
  d3.select("#time-extremes").selectAll(".insight-card").data(cards).join("div")
    .attr("class", "insight-card")
    .html(d => `<div class="metric">${escapeHtml(d.metric)}</div><div class="title">${escapeHtml(d.title)}</div><div class="body">${escapeHtml(d.body)}</div>`);
}

function renderVenueDecadeMatrix(papers) {
  const target = d3.select("#venue-decade-chart");
  if (target.empty()) return;
  const {svg, width, height} = chartBox("#venue-decade-chart");
  const margin = {top: 18, right: 22, bottom: 46, left: 150};
  const topAreas = Array.from(d3.rollup(papers, v => v.length, d => d.venue_area || "Other").entries())
    .sort((a,b) => d3.descending(a[1], b[1])).slice(0, 10).map(d => d[0]);
  const decades = Array.from(new Set(papers.map(d => Math.floor(d.year / 10) * 10))).filter(Boolean).sort(d3.ascending);
  const counts = [];
  for (const area of topAreas) {
    for (const decade of decades) {
      counts.push({area, decade, count: papers.filter(d => (d.venue_area || "Other") === area && Math.floor(d.year / 10) * 10 === decade).length});
    }
  }
  const x = d3.scaleBand().domain(decades).range([margin.left, width - margin.right]).padding(0.08);
  const y = d3.scaleBand().domain(topAreas).range([margin.top, height - margin.bottom]).padding(0.10);
  const fill = d3.scaleSequential(d3.interpolateYlGnBu).domain([0, d3.max(counts, d => d.count) || 1]);
  svg.append("g").attr("class", "axis").attr("transform", `translate(0,${height-margin.bottom})`).call(d3.axisBottom(x).tickFormat(d => `${d}s`));
  svg.append("g").attr("class", "axis").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).tickSize(0)).call(g => g.select(".domain").remove());
  svg.selectAll("rect.heat-cell").data(counts).join("rect")
    .attr("class", "heat-cell")
    .attr("x", d => x(d.decade)).attr("y", d => y(d.area))
    .attr("width", x.bandwidth()).attr("height", y.bandwidth())
    .attr("fill", d => d.count ? fill(d.count) : "rgba(255,255,255,0.035)")
    .on("mousemove", (e,d) => showTip(e, `<b>${escapeHtml(d.area)}</b><br>${d.decade}s · ${d.count} papers`))
    .on("mouseleave", hideTip);
}

function renderCitationQuadrants(rows) {
  const clean = rows.filter(d => d.recognition_lag && d.citation_count);
  const lagMed = d3.median(clean, d => d.recognition_lag);
  const citMed = d3.median(clean, d => d.citation_count);
  const breadthMed = d3.median(clean, d => num(d.impact_breadth_score));
  const groups = [
    {title: "Fast recognition", metric: fmt(clean.filter(d => d.recognition_lag <= lagMed).length), body: `lag ≤ ${fmt1(lagMed)} years`},
    {title: "Slow-burn impact", metric: fmt(clean.filter(d => d.recognition_lag > lagMed && d.citation_count > citMed).length), body: "long lag plus above-median citation depth"},
    {title: "Broad diffusion", metric: fmt(clean.filter(d => num(d.impact_breadth_score) > breadthMed).length), body: `breadth proxy above ${fmt1(breadthMed)}`},
    {title: "Caution", metric: "proxy", body: "citation and breadth guide interpretation; they do not encode award causality"}
  ];
  d3.select("#citation-quadrants").selectAll(".insight-card").data(groups).join("div")
    .attr("class", "insight-card")
    .html(d => `<div class="metric">${escapeHtml(d.metric)}</div><div class="title">${escapeHtml(d.title)}</div><div class="body">${escapeHtml(d.body)}</div>`);
}


function renderExplorer(papers) {
  const container = d3.select("#explorer-controls");
  if (container.empty()) return;
  const ranked = papers.slice().filter(d => d.title);
  const archetypes = buildArchetypes(ranked);
  d3.select("#archetype-cards").selectAll("button")
    .data(archetypes).join("button")
    .attr("class", "insight-card archetype-card")
    .attr("type", "button")
    .html(d => `<div class="metric">${escapeHtml(d.metric)}</div><div class="title">${escapeHtml(d.title)}</div><div class="body">${escapeHtml(shortTitle(d.paper.title))}</div>`)
    .on("click", (_, d) => {
      updateDetail(d.paper);
      document.querySelector("#topic")?.scrollIntoView({behavior: "smooth", block: "start"});
    });

  container.html(`
    <label>Search <input id="paper-search" type="search" placeholder="title / venue / topic" /></label>
    <label>Sort <select id="paper-sort">
      <option value="citation_count">citations</option>
      <option value="impact_breadth_score">impact breadth</option>
      <option value="recognition_lag">recognition lag</option>
      <option value="year">publication year</option>
    </select></label>
    <label>Field <select id="paper-field"><option value="all">all fields</option></select></label>
  `);
  const fields = Array.from(new Set(ranked.map(d => d.venue_area || "Other"))).sort(d3.ascending);
  d3.select("#paper-field").selectAll("option.field-option").data(fields).join("option")
    .attr("class", "field-option")
    .attr("value", d => d).text(d => d);

  const draw = () => {
    const query = d3.select("#paper-search").property("value").trim().toLowerCase();
    const sortKey = d3.select("#paper-sort").property("value");
    const field = d3.select("#paper-field").property("value");
    const rows = ranked
      .filter(d => field === "all" || (d.venue_area || "Other") === field)
      .filter(d => !query || [d.title, d.venue, d.topic_label, d.venue_area].some(v => String(v || "").toLowerCase().includes(query)))
      .sort((a,b) => d3.descending(num(a[sortKey]), num(b[sortKey])));
    renderExplorerChart(rows.slice(0, 80), ranked);
    renderExplorerList(rows.slice(0, 10), sortKey, ranked.length);
  };
  d3.select("#paper-search").on("input", draw);
  d3.select("#paper-sort").on("change", draw);
  d3.select("#paper-field").on("change", draw);
  draw();
}

function buildArchetypes(papers) {
  const validLag = papers.filter(d => d.recognition_lag > 0);
  return [
    {title: "Citation magnet", metric: fmt(num(d3.max(papers, d => d.citation_count))), paper: papers.slice().sort((a,b) => d3.descending(a.citation_count, b.citation_count))[0]},
    {title: "Slow-burn classic", metric: `${d3.max(validLag, d => d.recognition_lag)}y`, paper: validLag.slice().sort((a,b) => d3.descending(a.recognition_lag, b.recognition_lag))[0]},
    {title: "Widest diffusion", metric: fmt1(num(d3.max(papers, d => d.impact_breadth_score))), paper: papers.slice().sort((a,b) => d3.descending(a.impact_breadth_score, b.impact_breadth_score))[0]},
    {title: "Fast recognition", metric: `${d3.min(validLag, d => d.recognition_lag)}y`, paper: validLag.slice().sort((a,b) => d3.ascending(a.recognition_lag, b.recognition_lag))[0]}
  ].filter(d => d.paper);
}

function renderExplorerChart(rows, allPapers) {
  const {svg, width, height} = chartBox("#explorer-chart");
  const margin = {top: 22, right: 28, bottom: 52, left: 64};
  const clean = rows.filter(d => d.recognition_lag && d.citation_count);
  if (!clean.length) {
    svg.append("text").attr("x", width / 2).attr("y", height / 2).attr("text-anchor", "middle").attr("fill", "#9aa8bd").text("No matching papers");
    return;
  }
  const x = d3.scaleLinear().domain(d3.extent(allPapers.filter(d => d.recognition_lag), d => d.recognition_lag)).nice().range([margin.left, width-margin.right]);
  const y = d3.scaleLog().domain([1, d3.max(allPapers, d => Math.max(1, num(d.citation_count)))]).range([height-margin.bottom, margin.top]);
  const r = d3.scaleSqrt().domain(d3.extent(allPapers, d => num(d.impact_breadth_score))).range([4, 14]);
  svg.append("g").attr("class", "grid").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5, ",~s").tickSize(-(width-margin.left-margin.right)).tickFormat(""));
  svg.append("g").attr("class", "axis").attr("transform", `translate(0,${height-margin.bottom})`).call(d3.axisBottom(x).ticks(6));
  svg.append("g").attr("class", "axis").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5, ",~s"));
  svg.append("text").attr("class", "chart-title-small").attr("x", width/2).attr("y", height-8).attr("text-anchor", "middle").text("recognition lag (years)");
  svg.append("text").attr("class", "chart-title-small").attr("x", -height/2).attr("y", 15).attr("text-anchor", "middle").attr("transform", "rotate(-90)").text("citation count (log)");
  const mx = d3.median(allPapers, d => d.recognition_lag);
  const my = d3.median(allPapers, d => Math.max(1, num(d.citation_count)));
  addReferenceGuides(svg, x(mx), y(my), width, height, margin, "dataset median lag", "dataset median citations");
  svg.selectAll("circle.explorer-dot").data(clean, d => d.paper_id).join("circle")
    .attr("class", "dot explorer-dot")
    .attr("cx", d => x(d.recognition_lag)).attr("cy", d => y(Math.max(1, d.citation_count)))
    .attr("r", d => r(num(d.impact_breadth_score))).attr("fill", d => color(d.venue_area)).attr("opacity", 0.76)
    .on("mousemove", (e,d) => showTip(e, `<b>${escapeHtml(d.title)}</b><br>${escapeHtml(d.venue || "")}, ${d.year}<br>${escapeHtml(d.topic_label || "")}`))
    .on("mouseleave", hideTip)
    .on("click", (_,d) => updateDetail(d));
}

function renderExplorerList(rows, sortKey, total) {
  const metricLabels = {
    citation_count: "citations",
    impact_breadth_score: "breadth",
    recognition_lag: "lag",
    year: "year"
  };
  const list = d3.select("#explorer-list");
  list.html(`<div class="list-head"><b>${rows.length}</b> shown from ${fmt(total)} papers · sorted by ${metricLabels[sortKey]}</div>`);
  const items = list.selectAll("button.paper-list-item").data(rows, d => d.paper_id).join("button")
    .attr("type", "button")
    .attr("class", "paper-list-item")
    .on("click", (_, d) => updateDetail(d));
  items.html((d, i) => `
    <span class="rank">#${i + 1}</span>
    <span class="item-main"><b>${escapeHtml(shortTitle(d.title))}</b><small>${escapeHtml(d.venue || "Venue")} · ${d.year || "year"} · ${escapeHtml(d.topic_label || "topic")}</small></span>
    <span class="item-metric">${formatExplorerMetric(d, sortKey)}</span>
  `);
}

function formatExplorerMetric(d, key) {
  if (key === "impact_breadth_score") return fmt1(num(d[key]));
  if (key === "recognition_lag") return `${fmt(num(d[key]))}y`;
  return fmt(num(d[key]));
}


function renderBenchmark(papers) {
  const target = d3.select("#benchmark-chart");
  if (target.empty()) return;
  activePapers = papers;
  updateBenchmark(topPaper(papers));
}

function updateBenchmark(p) {
  if (!p || !activePapers.length || d3.select("#benchmark-chart").empty()) return;
  const metrics = benchmarkMetrics(p, activePapers);
  renderBenchmarkBars(metrics, p);
  renderBenchmarkStory(metrics, p, activePapers);
}

function benchmarkMetrics(p, papers) {
  const fieldRows = papers.filter(d => (d.venue_area || "Other") === (p.venue_area || "Other"));
  const metricDefs = [
    {key: "citation_count", label: "Citation depth", value: num(p.citation_count), format: v => fmt(v), note: "raw citation count"},
    {key: "impact_breadth_score", label: "Impact breadth", value: num(p.impact_breadth_score), format: v => fmt1(v), note: "sampled OpenAlex diffusion proxy"},
    {key: "recognition_lag", label: "Recognition lag", value: num(p.recognition_lag), format: v => `${fmt(v)}y`, note: "publication to award"},
    {key: "country_count", label: "Author country span", value: num(p.country_count), format: v => fmt(v), note: "available author metadata"},
    {key: "institution_count", label: "Institution span", value: num(p.institution_count), format: v => fmt(v), note: "available institution metadata"}
  ];
  return metricDefs.map(m => {
    const allVals = papers.map(d => num(d[m.key])).filter(v => Number.isFinite(v));
    const fieldVals = fieldRows.map(d => num(d[m.key])).filter(v => Number.isFinite(v));
    return {
      ...m,
      percentile: percentileRank(allVals, m.value),
      datasetMedian: d3.median(allVals),
      fieldMedian: d3.median(fieldVals),
      fieldN: fieldRows.length
    };
  });
}

function renderBenchmarkBars(metrics, p) {
  const {svg, width, height} = chartBox("#benchmark-chart");
  const margin = {top: 28, right: 46, bottom: 44, left: 168};
  const x = d3.scaleLinear().domain([0, 100]).range([margin.left, width - margin.right]);
  const y = d3.scaleBand().domain(metrics.map(d => d.label)).range([margin.top, height - margin.bottom]).padding(0.26);
  svg.append("g").attr("class", "grid").attr("transform", `translate(0,${height-margin.bottom})`).call(d3.axisBottom(x).ticks(5).tickSize(-(height-margin.top-margin.bottom)).tickFormat(""));
  svg.append("g").attr("class", "axis").attr("transform", `translate(0,${height-margin.bottom})`).call(d3.axisBottom(x).ticks(5).tickFormat(d => `${d}%`));
  svg.append("g").attr("class", "axis").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).tickSize(0)).call(g => g.select(".domain").remove());
  svg.append("line").attr("class", "reference-line").attr("x1", x(50)).attr("x2", x(50)).attr("y1", margin.top).attr("y2", height - margin.bottom);
  svg.append("text").attr("class", "reference-label").attr("x", x(50)+6).attr("y", margin.top-8).text("dataset median");
  const g = svg.selectAll("g.benchmark-row").data(metrics).join("g").attr("class", "benchmark-row").attr("transform", d => `translate(0,${y(d.label)})`);
  g.append("rect")
    .attr("class", "benchmark-track")
    .attr("x", margin.left).attr("y", 0)
    .attr("width", x(100)-margin.left).attr("height", y.bandwidth()).attr("rx", 10);
  g.append("rect")
    .attr("class", "benchmark-fill")
    .attr("x", margin.left).attr("y", 0)
    .attr("width", d => Math.max(2, x(d.percentile)-margin.left)).attr("height", y.bandwidth()).attr("rx", 10)
    .attr("fill", d => d.percentile >= 75 ? "#70e1d4" : d.percentile >= 50 ? "#f6bd60" : "#b8a1ff");
  g.append("text")
    .attr("class", "benchmark-value")
    .attr("x", d => Math.min(x(d.percentile)+8, width-margin.right-74)).attr("y", y.bandwidth()/2 + 4)
    .text(d => `${fmt1(d.percentile)}% · ${d.format(d.value)}`);
  g.on("mousemove", (e,d) => showTip(e, `<b>${escapeHtml(d.label)}</b><br>${d.note}<br>Value: ${d.format(d.value)}<br>Dataset median: ${d.format(d.datasetMedian || 0)}<br>${escapeHtml(p.venue_area || "Field")} median: ${d.format(d.fieldMedian || 0)} (n=${d.fieldN})`))
    .on("mouseleave", hideTip);
  svg.append("text").attr("class", "chart-title-small").attr("x", margin.left).attr("y", height - 8).text(`Selected: ${shortTitle(p.title)}`);
}

function renderBenchmarkStory(metrics, p, papers) {
  const top = metrics.slice().sort((a,b) => d3.descending(a.percentile, b.percentile))[0];
  const weak = metrics.slice().sort((a,b) => d3.ascending(a.percentile, b.percentile))[0];
  const citation = metrics.find(d => d.key === "citation_count");
  const breadth = metrics.find(d => d.key === "impact_breadth_score");
  const lag = metrics.find(d => d.key === "recognition_lag");
  const archetype = classifyPaper(citation?.percentile || 0, breadth?.percentile || 0, lag?.percentile || 0);
  const peers = papers
    .filter(d => d.paper_id !== p.paper_id && (d.venue_area || "Other") === (p.venue_area || "Other"))
    .sort((a,b) => d3.descending(num(a.citation_count), num(b.citation_count)))
    .slice(0, 3);
  d3.select("#benchmark-story").html(`
    <div class="paper-title">${escapeHtml(shortTitle(p.title))}</div>
    <div class="paper-meta">
      <span class="chip">${escapeHtml(p.venue_area || "Field")}</span>
      <span class="chip">${escapeHtml(p.venue || "Venue")}</span>
      <span class="chip">${p.year || "Year"} → ${p.announcement_year || "Award"}</span>
    </div>
    <div class="archetype-badge">${escapeHtml(archetype.title)}</div>
    <p class="abstract">${escapeHtml(archetype.body)}</p>
    <div class="detail-stats">
      <div class="detail-stat"><b>${fmt1(top.percentile)}%</b><span>strongest percentile · ${escapeHtml(top.label)}</span></div>
      <div class="detail-stat"><b>${fmt1(weak.percentile)}%</b><span>lowest percentile · ${escapeHtml(weak.label)}</span></div>
    </div>
    <div class="benchmark-peers">
      <div class="title">Same-field reference papers</div>
      ${peers.map((d,i) => `<button type="button" class="peer-pill" data-paper-id="${escapeHtml(d.paper_id)}"><b>#${i+1}</b> ${escapeHtml(shortTitle(d.title))}</button>`).join("")}
    </div>
    <p class="reading-note mini-note">Demo use: click any point/list item elsewhere, then use this panel to explain why that paper is representative relative to the whole dataset and its field.</p>
  `);
  d3.selectAll(".peer-pill").on("click", function() {
    const id = this.getAttribute("data-paper-id");
    const peer = activePapers.find(d => d.paper_id === id);
    if (peer) updateDetail(peer);
  });
}

function percentileRank(values, value) {
  const clean = values.filter(v => Number.isFinite(v)).sort(d3.ascending);
  if (!clean.length) return 0;
  const below = d3.bisectRight(clean, value);
  return below / clean.length * 100;
}

function classifyPaper(citationPct, breadthPct, lagPct) {
  if (citationPct >= 75 && breadthPct >= 75) return {title: "Deep + broad influence", body: "This paper combines high citation depth with broad diffusion, making it a strong example when explaining long-term impact beyond a single metric."};
  if (lagPct >= 75 && citationPct >= 60) return {title: "Slow-burn classic", body: "This paper waited longer than most before recognition while still showing strong citation depth, useful for explaining delayed value discovery."};
  if (breadthPct >= 75) return {title: "Wide diffusion case", body: "This paper stands out more by breadth than raw depth, making it useful for discussing cross-field or cross-region influence."};
  if (citationPct >= 75) return {title: "Citation-depth case", body: "This paper is strongest as a citation-depth example; pair it with limitations about citation count and field size."};
  return {title: "Contextual evidence case", body: "This paper is best interpreted through venue, topic, and award context rather than one extreme quantitative score."};
}

function renderStoryboard(data) {
  const target = d3.select("#storyboard-grid");
  if (target.empty()) return;
  const {papers, venues, areas, topics, institutions, countries} = data;
  const lagMedian = d3.median(papers, d => d.recognition_lag);
  const longest = papers.slice().sort((a,b) => d3.descending(a.recognition_lag, b.recognition_lag))[0];
  const topVenue = venues.slice().sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count)))[0];
  const topArea = areas.slice().sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count)))[0];
  const topTopic = topics.slice().sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count)))[0];
  const topCitation = papers.slice().sort((a,b) => d3.descending(num(a.citation_count), num(b.citation_count)))[0];
  const topBreadth = papers.slice().sort((a,b) => d3.descending(num(a.impact_breadth_score), num(b.impact_breadth_score)))[0];
  const topInstitution = institutions.slice().sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count)))[0];
  const topCountry = countries.slice().sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count)))[0];
  const cards = [
    {
      owner: "B · Time",
      href: "#time",
      question: "长期影响需要多久才被看见？",
      evidence: `Median lag ${fmt1(lagMedian)}y; longest case ${fmt(num(longest?.recognition_lag))}y`,
      soWhat: "用时间尺度说明 Test of Time 不是即时热度，而是多年后的重新确认。"
    },
    {
      owner: "C · Venue",
      href: "#venue",
      question: "长期影响在哪些会议和领域聚集？",
      evidence: `${topVenue?.venue || "Top venue"} leads venues; ${topArea?.venue_area || "top field"} leads areas`,
      soWhat: "把数量榜解释为数据覆盖和奖项历史下的结构分布，避免写成会议质量排名。"
    },
    {
      owner: "D · Topic",
      href: "#topic",
      question: "哪些主题更容易沉淀成经典？",
      evidence: `${topTopic?.topic_label || "Top topic"} is the most frequent topic label`,
      soWhat: "用代表论文卡把抽象 topic 转成可讲的研究问题、方法和影响路径。"
    },
    {
      owner: "E · Citation",
      href: "#citation",
      question: "高引用和长期价值是不是一回事？",
      evidence: `${shortTitle(topCitation?.title)} is the citation-depth anchor`,
      soWhat: "用 depth × breadth 和 trajectory 说明引用量只是影响力的一种切面。"
    },
    {
      owner: "A/F · Explorer",
      href: "#explorer",
      question: "能否让报告结论可追溯到具体论文？",
      evidence: `${fmt(papers.length)} papers searchable by title, venue, topic, field`,
      soWhat: "把项目从静态图表升级为证据库，展示时可以现场检索和点击代表论文。"
    },
    {
      owner: "A/E · Benchmark",
      href: "#benchmark",
      question: "单篇论文到底强在哪里？",
      evidence: `${shortTitle(topBreadth?.title)} anchors high-breadth comparison`,
      soWhat: "用 percentile 语言把代表案例讲清楚：相对全数据集和同领域处在什么位置。"
    },
    {
      owner: "F · Network",
      href: "#network",
      question: "长期影响如何跨机构和国家扩散？",
      evidence: `${topInstitution?.name || "Top institution"} / ${topCountry?.country || "Top country"} lead observed metadata`,
      soWhat: "把影响力从论文层面扩展到学术共同体分布，同时说明机构元数据限制。"
    }
  ];
  target.selectAll("a.story-card").data(cards).join("a")
    .attr("class", "story-card")
    .attr("href", d => d.href)
    .html((d, i) => `
      <div class="story-step">${String(i + 1).padStart(2, "0")}</div>
      <div class="story-owner">${escapeHtml(d.owner)}</div>
      <h3>${escapeHtml(d.question)}</h3>
      <p><b>Evidence</b>${escapeHtml(d.evidence)}</p>
      <p><b>So what</b>${escapeHtml(d.soWhat)}</p>
    `);
}

function renderModuleClaims(data) {
  const {papers, venues, areas, topics, timeline, institutions, countries} = data;
  const lagMedian = d3.median(papers, d => d.recognition_lag);
  const lagQ1 = d3.quantile(papers.map(d => d.recognition_lag).filter(Boolean).sort(d3.ascending), 0.25);
  const lagQ3 = d3.quantile(papers.map(d => d.recognition_lag).filter(Boolean).sort(d3.ascending), 0.75);
  const longest = papers.slice().sort((a,b) => d3.descending(num(a.recognition_lag), num(b.recognition_lag)))[0];
  const topVenue = venues.slice().sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count)))[0];
  const topArea = areas.slice().sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count)))[0];
  const concentratedAreas = areas.filter(d => num(d.paper_count) >= d3.median(areas, x => num(x.paper_count))).length;
  const topTopic = topics.slice().sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count)))[0];
  const broadTopic = topics.slice().sort((a,b) => d3.descending(num(a.avg_impact_breadth_score), num(b.avg_impact_breadth_score)))[0];
  const highCitation = papers.slice().sort((a,b) => d3.descending(num(a.citation_count), num(b.citation_count)))[0];
  const highBreadth = papers.slice().sort((a,b) => d3.descending(num(a.impact_breadth_score), num(b.impact_breadth_score)))[0];
  const citationMedian = d3.median(timeline, d => num(d.citation_count));
  const lagAboveMedianCitation = timeline.filter(d => num(d.recognition_lag) > lagMedian && num(d.citation_count) > citationMedian).length;
  const topInst = institutions.slice().filter(d => d.name).sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count)))[0];
  const topCountry = countries.slice().filter(d => d.country).sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count)))[0];
  const usShare = d3.sum(countries, d => num(d.paper_count)) ? num(topCountry?.paper_count) / d3.sum(countries, d => num(d.paper_count)) * 100 : 0;
  const cards = {
    "#time-claims": [
      claim("Finding", `典型 recognition lag 约为 ${fmt1(lagMedian)} 年，中间 50% 大致落在 ${fmt1(lagQ1)}–${fmt1(lagQ3)} 年。`, "Evidence", "Lag distribution + timeline", "Boundary", "这是获奖记录中的时间尺度，不代表所有经典工作的唯一成熟周期。"),
      claim("Case", `${shortTitle(longest?.title)} 是最长 lag 案例，等待 ${fmt(num(longest?.recognition_lag))} 年后获得认可。`, "Evidence", `${longest?.venue || "venue"} · ${longest?.year || "year"} → ${longest?.announcement_year || "award"}`, "Interpretation", "长 lag 适合用来解释基础性工作可能需要后续生态成熟才被重新看见。")
    ],
    "#venue-claims": [
      claim("Finding", `${topVenue?.venue || "Top venue"} 是记录数最多的 venue，${topArea?.venue_area || "top field"} 是更大的领域聚集点。`, "Evidence", `${fmt(num(topVenue?.paper_count))} venue papers; ${fmt(num(topArea?.paper_count))} field papers`, "Boundary", "数量榜受设奖历史和数据覆盖影响，不能直接写成会议质量排名。"),
      claim("Pattern", `${concentratedAreas} 个领域高于或接近领域中位数，说明长期影响记录呈多社区分布而非单一领域垄断。`, "Evidence", "Field map + decade heatmap", "Interpretation", "报告应强调学术社区结构和时间覆盖，而不是只比较总量。")
    ],
    "#topic-claims": [
      claim("Finding", `${topTopic?.topic_label || "Top topic"} 是最常见主题标签，占 ${fmt(num(topTopic?.paper_count))} 篇论文。`, "Evidence", "Topic distribution", "Boundary", "主题来自 API/规则归类，需要代表论文和人工阅读进一步校正。"),
      claim("Case route", `${broadTopic?.topic_label || "High-breadth topic"} 的平均 breadth proxy 较高，可作为跨领域影响解释入口。`, "Evidence", `avg breadth ${fmt1(num(broadTopic?.avg_impact_breadth_score))}`, "Interpretation", "把主题趋势与代表论文卡结合，比单独展示面积图更适合写报告。")
    ],
    "#citation-claims": [
      claim("Finding", `${fmt(lagAboveMedianCitation)} 篇论文同时具有高于中位数的 recognition lag 和 citation depth。`, "Evidence", "Citation vs lag scatter median guides", "Boundary", "引用深度说明可见影响强度，但不能证明获奖因果。"),
      claim("Contrast", `${shortTitle(highCitation?.title)} 是 citation-depth 锚点；${shortTitle(highBreadth?.title)} 是 breadth 锚点。`, "Evidence", `${fmt(num(highCitation?.citation_count))} citations vs breadth ${fmt1(num(highBreadth?.impact_breadth_score))}`, "Interpretation", "Depth × breadth 可以把“被大量引用”和“扩散范围广”分开讲。")
    ],
    "#network-claims": [
      claim("Finding", `${topInst?.name || "Top institution"} 是观察到的最高频机构，${topCountry?.country || "top country"} 是最高频国家/地区。`, "Evidence", `${fmt(num(topInst?.paper_count))} institution mentions; ${fmt(num(topCountry?.paper_count))} country mentions`, "Boundary", "机构和国家字段依赖元数据覆盖，适合解释分布线索而非完整合作网络。"),
      claim("Pattern", `最高频国家/地区约占观察国家/地区计数的 ${fmt1(usShare)}%。`, "Evidence", "Country ranking", "Interpretation", "可用于讨论研究生态集中度，同时需要说明英文数据库和会议覆盖偏差。")
    ]
  };
  for (const [selector, rows] of Object.entries(cards)) renderClaimCards(selector, rows);
}

function claim(type, text, evidenceLabel, evidence, boundaryLabel, boundary) {
  return {type, text, evidenceLabel, evidence, boundaryLabel, boundary};
}

function renderClaimCards(selector, cards) {
  const target = d3.select(selector);
  if (target.empty()) return;
  target.selectAll(".claim-card").data(cards).join("article")
    .attr("class", "claim-card")
    .html(d => `
      <div class="claim-type">${escapeHtml(d.type)}</div>
      <p class="claim-text">${escapeHtml(d.text)}</p>
      <div class="claim-evidence"><b>${escapeHtml(d.evidenceLabel)}</b><span>${escapeHtml(d.evidence)}</span></div>
      <div class="claim-boundary"><b>${escapeHtml(d.boundaryLabel)}</b><span>${escapeHtml(d.boundary)}</span></div>
    `);
}

function renderNetworkKpis(institutions, countries) {
  const topInst = institutions.slice().filter(d => d.name).sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count)))[0];
  const topCountry = countries.slice().filter(d => d.country).sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count)))[0];
  const instTotal = d3.sum(institutions, d => num(d.paper_count));
  const topInstShare = instTotal ? num(topInst.paper_count) / instTotal * 100 : 0;
  const countryTotal = d3.sum(countries, d => num(d.paper_count));
  const topCountryShare = countryTotal ? num(topCountry.paper_count) / countryTotal * 100 : 0;
  const cards = [
    {metric: topInst?.paper_count || 0, title: "Top institution count", body: topInst?.name || "institution metadata unavailable"},
    {metric: `${fmt1(topInstShare)}%`, title: "Top institution share", body: "share within observed institution mentions"},
    {metric: topCountry?.country || "Country", title: "Top country/region", body: `${topCountry?.paper_count || 0} observed paper mentions`},
    {metric: `${fmt1(topCountryShare)}%`, title: "Country concentration", body: "computed from available country metadata"}
  ];
  d3.select("#network-kpis").selectAll(".insight-card").data(cards).join("div")
    .attr("class", "insight-card")
    .html(d => `<div class="metric">${escapeHtml(d.metric)}</div><div class="title">${escapeHtml(d.title)}</div><div class="body">${escapeHtml(d.body)}</div>`);
}

function addReferenceGuides(svg, x, y, width, height, margin, xLabel, yLabel) {
  svg.append("line").attr("class", "reference-line").attr("x1", x).attr("x2", x).attr("y1", margin.top).attr("y2", height - margin.bottom);
  svg.append("line").attr("class", "reference-line").attr("x1", margin.left).attr("x2", width - margin.right).attr("y1", y).attr("y2", y);
  svg.append("text").attr("class", "reference-label").attr("x", x + 6).attr("y", height - margin.bottom - 7).text(xLabel);
  svg.append("text").attr("class", "reference-label").attr("x", margin.left + 8).attr("y", y - 7).text(yLabel);
}

function shortTitle(title) {
  const t = String(title || "No title");
  return t.length > 78 ? `${t.slice(0, 78)}…` : t;
}

function topPaper(papers) {
  return papers.slice().sort((a,b) => d3.descending(a.citation_count, b.citation_count))[0];
}

function updateDetail(p) {
  if (!p) return;
  d3.selectAll(".selected-paper").classed("selected-paper", false);
  d3.selectAll("circle").filter(d => d && d.paper_id === p.paper_id).classed("selected-paper", true);
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
  updateBenchmark(p);
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
  d3.select("#explorer-note").text(`The explorer turns the dataset into a live evidence index: search by title/topic/venue, sort by citation, lag, breadth, or year, then click any paper to update the shared detail card.`);
  d3.select("#benchmark-note").text(`The benchmark lab converts a selected paper into percentile evidence: citation depth, recognition lag, breadth, collaboration, and field context are shown side by side.`);
  d3.select("#storyboard-note").text(`The storyboard converts every module into a report-ready chain: research question, live evidence, so-what interpretation, and teammate owner.`);
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

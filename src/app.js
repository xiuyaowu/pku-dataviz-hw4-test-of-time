const fmt = d3.format(",");
const fmt1 = d3.format(".1f");
const color = d3.scaleOrdinal()
  .range(["#70e1d4", "#f6bd60", "#b8a1ff", "#ff7a90", "#8bd17c", "#7cc9ff", "#f39ac7", "#c6d66f"]);

let activePapers = [];
let compareSelection = {a: null, b: null};
const tooltip = d3.select("#tooltip");
const showTip = (event, html) => {
  tooltip.html(html).attr("hidden", null)
    .style("left", `${Math.min(event.clientX + 16, window.innerWidth - 340)}px`)
    .style("top", `${event.clientY + 16}px`);
};
const hideTip = () => tooltip.attr("hidden", true);

function makeKeyboardMarks(selection, labelFn, activateFn) {
  selection
    .attr("tabindex", 0)
    .attr("role", "button")
    .attr("aria-label", d => labelFn(d).replace(/\s+/g, " ").trim())
    .classed("keyboard-mark", true)
    .on("focus.accessibility", function() { d3.select(this).classed("keyboard-focus", true); })
    .on("blur.accessibility", function() { d3.select(this).classed("keyboard-focus", false); hideTip(); })
    .on("keydown.accessibility", (event, d) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (activateFn) activateFn(d);
      }
    });
}

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
  d3.csv("data/country_stats.csv", d3.autoType),
  d3.csv("manual_annotations/manual_paper_annotations_top12_evidence_ready.csv", d3.autoType)
]).then(([papers, timeline, lag, venues, areas, topics, topicYears, citations, breadth, institutions, countries, evidence]) => {
  const data = { papers, timeline, lag, venues, areas, topics, topicYears, citations, breadth, institutions, countries, evidence };
  normalize(data);
  mergeEvidence(data);
  color.domain([...new Set(data.papers.map(d => d.venue_area))].sort());
  activePapers = data.papers;
  renderSummary(data);
  renderInsightDeck(data);
  renderTimeExtremes(data.papers);
  renderTimeMachine(data.papers);
  renderLag(data.lag, data.papers);
  renderAwardTimeline(data.timeline, data.papers);
  renderVenue(data.venues);
  renderAreas(data.areas);
  renderVenueDecadeMatrix(data.papers);
  renderTopics(data.topics, data.papers);
  renderTopicEvolution(data.topicYears);
  renderPaperLineage(data.papers);
  renderScatter(data.timeline, data.papers);
  renderTrajectory(data.citations, data.papers);
  renderBreadth(data.timeline, data.papers);
  renderCitationQuadrants(data.timeline);
  renderExplorer(data.papers);
  renderComparePanel(data.papers);
  renderBenchmark(data.papers);
  renderNetworkKpis(data.institutions, data.countries);
  renderGlobalMemoryMap(data.countries, data.institutions, data.papers);
  renderModuleClaims(data);
  renderInstitutions(data.institutions, data.papers);
  updateDetail(topPaper(data.papers));
  setNotes(data);
}).catch(err => {
  console.error(err);
  document.body.insertAdjacentHTML("afterbegin", `<pre style="padding:20px;color:#ffb4c1">Data loading failed: ${err.message}</pre>`);
});

function initPresentationMode() {
  const root = document.body;
  const actionDock = document.getElementById("action-dock");
  const dockToggle = document.getElementById("dock-toggle");
  const dockHide = document.getElementById("dock-hide");
  const dockRestore = document.getElementById("dock-restore");
  const toggle = document.getElementById("presentation-toggle");
  const tourToggle = document.getElementById("tour-toggle");
  const screenshotToggle = document.getElementById("screenshot-toggle");
  const screenshotPanel = document.getElementById("screenshot-panel");
  const params = new URLSearchParams(window.location.search);
  const shouldStart = params.get("present") === "1" || window.location.hash === "#present";
  const steps = [
    {id: "time", title: "Time · recognition lag", takeaway: "Start with the time gap, then use Time Machine cases to show why long-term value is often recognized only after the ecosystem catches up."},
    {id: "venue", title: "Venue & Field", takeaway: "Venue and field counts show where this award history is visible, not a conference quality ranking."},
    {id: "topic", title: "Topic Evolution", takeaway: "Topic charts show broad lineages; Representative Paper Lineage turns those counts into reusable contributions and evidence-backed cases."},
    {id: "citation", title: "Citation & Impact", takeaway: "Citation depth is important, but breadth and trajectory show why high citation is not the whole story."},
    {id: "explorer", title: "Paper Explorer", takeaway: "The dashboard doubles as an evidence index: every claim can be traced back to searchable papers."},
    {id: "evidence-thread", title: "Cross-module Evidence Thread", takeaway: "Selecting one paper synchronizes the story across time, topic, citation, benchmark, and network lenses."},
    {id: "benchmark", title: "Benchmark Lab", takeaway: "Benchmark percentiles and the Long-term Impact Signature explain selected papers without pretending to predict future awards."},
    {id: "network", title: "Network / closing", takeaway: "Global Memory Map extends the story to visible affiliation metadata while explicitly avoiding country or institution ranking claims."}
  ];
  const exportTargets = [
    {id: "hero", selector: ".hero", filename: "dataviz-hw4-hero-overview.png"},
    {id: "time", selector: "#time", filename: "dataviz-hw4-time-lag.png"},
    {id: "venue", selector: "#venue", filename: "dataviz-hw4-venue-field.png"},
    {id: "topic", selector: "#topic", filename: "dataviz-hw4-topic-evolution.png"},
    {id: "citation", selector: "#citation", filename: "dataviz-hw4-citation-compare.png"},
    {id: "explorer", selector: "#explorer", filename: "dataviz-hw4-paper-explorer.png"},
    {id: "evidence-thread", selector: "#evidence-thread", filename: "dataviz-hw4-evidence-thread.png"},
    {id: "benchmark", selector: "#benchmark", filename: "dataviz-hw4-benchmark-lab.png"},
    {id: "network", selector: "#network", filename: "dataviz-hw4-network.png"}
  ];
  let tourIndex = 0;

  const controls = document.getElementById("tour-controls");
  const stepCount = document.getElementById("tour-step-count");
  const tourTitle = document.getElementById("tour-title");
  const tourTakeaway = document.getElementById("tour-takeaway");
  const exportSelect = document.getElementById("export-target");
  const exportCurrent = document.getElementById("export-current-png");
  const exportTour = document.getElementById("export-tour-png");
  const exportAll = document.getElementById("export-all-png");
  const exportQuality = document.getElementById("export-quality");
  const exportStatus = document.getElementById("export-status");
  const exportSlideList = document.getElementById("export-slide-list");
  const exportPreview = document.getElementById("export-preview");
  const exportPreviewTitle = document.getElementById("export-preview-title");
  const exportPreviewMeta = document.getElementById("export-preview-meta");

  const syncDockRestorePosition = () => {
    if (!actionDock || !dockRestore) return;
    const isPositioned = actionDock.classList.contains("dock-positioned");
    dockRestore.classList.toggle("dock-positioned", isPositioned);
    if (isPositioned) {
      dockRestore.style.left = actionDock.style.left;
      dockRestore.style.top = actionDock.style.top;
      dockRestore.style.right = "auto";
      dockRestore.style.bottom = "auto";
    } else {
      dockRestore.style.left = "";
      dockRestore.style.top = "";
      dockRestore.style.right = "";
      dockRestore.style.bottom = "";
    }
  };

  const positionDock = (left, top) => {
    if (!actionDock) return;
    const rect = actionDock.getBoundingClientRect();
    const margin = 10;
    const maxLeft = Math.max(margin, window.innerWidth - rect.width - margin);
    const maxTop = Math.max(margin, window.innerHeight - rect.height - margin);
    const nextLeft = Math.min(Math.max(margin, left), maxLeft);
    const nextTop = Math.min(Math.max(margin, top), maxTop);
    actionDock.classList.add("dock-positioned");
    actionDock.style.left = `${nextLeft}px`;
    actionDock.style.top = `${nextTop}px`;
    actionDock.style.right = "auto";
    actionDock.style.bottom = "auto";
    syncDockRestorePosition();
  };

  const setDockCollapsed = collapsed => {
    if (!actionDock || !dockToggle) return;
    actionDock.classList.remove("dock-hidden");
    if (dockRestore) dockRestore.hidden = true;
    actionDock.classList.toggle("dock-collapsed", collapsed);
    actionDock.classList.toggle("dock-expanded", !collapsed);
    dockToggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
    dockToggle.textContent = collapsed ? "Tools" : "Close";
    syncDockRestorePosition();
  };

  const setDockHidden = hidden => {
    if (!actionDock || !dockToggle) return;
    actionDock.classList.toggle("dock-hidden", hidden);
    if (dockRestore) dockRestore.hidden = !hidden;
    if (hidden) {
      actionDock.classList.add("dock-collapsed");
      actionDock.classList.remove("dock-expanded");
      dockToggle.setAttribute("aria-expanded", "false");
      dockToggle.textContent = "Tools";
      syncDockRestorePosition();
    }
  };

  const toggleDockHidden = () => {
    if (!actionDock) return;
    if (actionDock.classList.contains("dock-hidden")) setDockCollapsed(true);
    else setDockHidden(true);
  };

  const initDockDrag = () => {
    if (!actionDock || !dockToggle) return;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;
    let pointerId = null;
    let moved = false;

    const endDrag = event => {
      if (pointerId === null || event.pointerId !== pointerId) return;
      actionDock.classList.remove("dock-dragging");
      dockToggle.releasePointerCapture?.(pointerId);
      pointerId = null;
      if (moved) {
        event.preventDefault();
        event.stopPropagation();
      }
      setTimeout(() => { moved = false; }, 0);
    };

    dockToggle.addEventListener("pointerdown", event => {
      if (event.button !== 0) return;
      const rect = actionDock.getBoundingClientRect();
      startX = event.clientX;
      startY = event.clientY;
      startLeft = rect.left;
      startTop = rect.top;
      pointerId = event.pointerId;
      moved = false;
      dockToggle.setPointerCapture?.(pointerId);
    });

    dockToggle.addEventListener("pointermove", event => {
      if (pointerId === null || event.pointerId !== pointerId) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (!moved && Math.hypot(dx, dy) < 4) return;
      moved = true;
      actionDock.classList.add("dock-dragging");
      positionDock(startLeft + dx, startTop + dy);
    });

    dockToggle.addEventListener("pointerup", endDrag);
    dockToggle.addEventListener("pointercancel", endDrag);
    dockToggle.addEventListener("click", event => {
      if (!moved) return;
      event.preventDefault();
      event.stopPropagation();
    }, true);

    window.addEventListener("resize", () => {
      if (!actionDock.classList.contains("dock-positioned")) return;
      const rect = actionDock.getBoundingClientRect();
      positionDock(rect.left, rect.top);
    });
  };

  const setMode = enabled => {
    root.classList.toggle("presentation-mode", enabled);
    if (toggle) toggle.setAttribute("aria-pressed", enabled ? "true" : "false");
    if (enabled) setDockCollapsed(true);
  };

  const renderTourStep = () => {
    const step = steps[tourIndex];
    document.querySelectorAll(".tour-active").forEach(el => el.classList.remove("tour-active"));
    const target = document.getElementById(step.id);
    if (target) {
      target.classList.add("tour-active");
      target.scrollIntoView({behavior: "smooth", block: "start"});
    }
    if (controls) controls.hidden = false;
    if (stepCount) stepCount.textContent = `${tourIndex + 1}/${steps.length}`;
    if (tourTitle) tourTitle.textContent = step.title;
    if (tourTakeaway) tourTakeaway.textContent = step.takeaway;
    if (tourToggle) tourToggle.setAttribute("aria-pressed", "true");
    setMode(true);
  };

  const startTour = () => {
    tourIndex = Math.max(0, steps.findIndex(s => `#${s.id}` === window.location.hash));
    if (tourIndex < 0) tourIndex = 0;
    renderTourStep();
    setDockCollapsed(true);
  };
  const exitTour = (leavePresentation = true) => {
    document.querySelectorAll(".tour-active").forEach(el => el.classList.remove("tour-active"));
    if (controls) controls.hidden = true;
    if (tourToggle) tourToggle.setAttribute("aria-pressed", "false");
    if (leavePresentation) setMode(false);
    if (window.location.hash === "#present") history.replaceState(null, "", window.location.pathname + window.location.search);
  };
  const moveTour = delta => {
    tourIndex = Math.max(0, Math.min(steps.length - 1, tourIndex + delta));
    renderTourStep();
  };

  const setExportStatus = (message, state = "") => {
    if (!exportStatus) return;
    exportStatus.textContent = message;
    exportStatus.dataset.state = state;
  };

  const selectedExportTarget = () => exportTargets.find(d => d.id === exportSelect?.value) || exportTargets[0];
  const currentTourTarget = () => {
    const activeId = document.querySelector(".tour-active")?.id;
    return exportTargets.find(d => d.id === activeId) || selectedExportTarget();
  };
  const exportPixelRatio = () => Math.max(1, Number(exportQuality?.value || 2));

  const downloadDataUrl = (dataUrl, filename) => {
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = filename;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

  const waitFrame = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  const exportFilter = el => !el.classList?.contains("floating-actions") && !el.classList?.contains("tour-controls") && !el.classList?.contains("modal-shell") && !el.classList?.contains("tooltip");

  const renderExportSlideList = () => {
    if (!exportSlideList) return;
    exportSlideList.innerHTML = exportTargets.map((target, i) => `
      <button type="button" class="export-slide-pill" data-export-target="${target.id}">
        <span>${String(i + 1).padStart(2, "0")}</span>
        <b>${target.filename.replace("dataviz-hw4-", "").replace(".png", "").replaceAll("-", " ")}</b>
      </button>
    `).join("");
    exportSlideList.querySelectorAll("[data-export-target]").forEach(button => {
      button.addEventListener("click", () => {
        if (exportSelect) exportSelect.value = button.dataset.exportTarget;
        updateExportSelection();
      });
    });
  };

  const updateExportSelection = () => {
    const target = selectedExportTarget();
    if (exportPreviewTitle) exportPreviewTitle.textContent = target.filename.replace(".png", "");
    if (exportPreviewMeta) exportPreviewMeta.textContent = `${target.selector} · ${exportPixelRatio()}× PNG`;
    exportSlideList?.querySelectorAll(".export-slide-pill").forEach(button => button.classList.toggle("active", button.dataset.exportTarget === target.id));
    schedulePreview(target);
  };

  let previewTimer = null;
  const schedulePreview = target => {
    if (!exportPreview) return;
    clearTimeout(previewTimer);
    exportPreview.innerHTML = `<span>Rendering preview...</span>`;
    previewTimer = setTimeout(() => renderPreview(target), 120);
  };

  const renderPreview = async target => {
    try {
      if (!window.htmlToImage?.toPng) throw new Error("Exporter not loaded");
      const node = document.querySelector(target.selector);
      if (!node) throw new Error("Target missing");
      const dataUrl = await window.htmlToImage.toPng(node, {
        pixelRatio: 0.45,
        cacheBust: true,
        backgroundColor: "#0b0f16",
        filter: exportFilter
      });
      exportPreview.innerHTML = `<img src="${dataUrl}" alt="Preview of ${target.filename}" />`;
    } catch (err) {
      exportPreview.innerHTML = `<span>Preview unavailable. Export still works after the charts finish loading.</span>`;
    }
  };

  const targetToPngDataUrl = async (target, index = 0, total = 1) => {
    if (!window.htmlToImage?.toPng) throw new Error("PNG exporter failed to load. Refresh the page and try again.");
    const node = document.querySelector(target.selector);
    if (!node) throw new Error(`Export target not found: ${target.selector}`);
    setExportStatus(`Rendering ${index + 1}/${total}: ${target.filename} ...`, "working");
    document.body.classList.add("exporting");
    root.classList.remove("presentation-mode");
    node.scrollIntoView({behavior: "auto", block: "start"});
    await waitFrame();
    return window.htmlToImage.toPng(node, {
      pixelRatio: exportPixelRatio(),
      cacheBust: true,
      backgroundColor: "#0b0f16",
      filter: exportFilter
    });
  };

  const exportTargetPng = async (target, index = 0, total = 1) => {
    const dataUrl = await targetToPngDataUrl(target, index, total);
    downloadDataUrl(dataUrl, target.filename);
    return target.filename;
  };

  const dataUrlToBase64 = dataUrl => dataUrl.split(",")[1];

  const runExport = async (targets, mode = "png") => {
    [exportCurrent, exportTour, exportAll].forEach(button => { if (button) button.disabled = true; });
    try {
      if (mode === "zip") {
        if (!window.JSZip) throw new Error("ZIP exporter failed to load. Refresh the page and try again.");
        const zip = new window.JSZip();
        for (let i = 0; i < targets.length; i++) {
          const dataUrl = await targetToPngDataUrl(targets[i], i, targets.length);
          zip.file(targets[i].filename, dataUrlToBase64(dataUrl), {base64: true});
        }
        setExportStatus("Packaging ZIP ...", "working");
        const blob = await zip.generateAsync({type: "blob"});
        downloadBlob(blob, "dataviz-hw4-presentation-slides.zip");
        setExportStatus(`Done. Downloaded ZIP with ${targets.length} PPT-ready PNG slides.`, "done");
      } else {
        const files = [];
        for (let i = 0; i < targets.length; i++) files.push(await exportTargetPng(targets[i], i, targets.length));
        setExportStatus(`Done. Downloaded ${files.length} PNG file${files.length > 1 ? "s" : ""}: ${files.join(", ")}`, "done");
      }
    } catch (err) {
      console.error(err);
      setExportStatus(`Export failed: ${err.message}`, "error");
    } finally {
      document.body.classList.remove("exporting");
      [exportCurrent, exportTour, exportAll].forEach(button => { if (button) button.disabled = false; });
    }
  };

  setMode(shouldStart);
  initDockDrag();
  if (shouldStart) setTimeout(startTour, 250);
  if (dockToggle) dockToggle.addEventListener("click", () => setDockCollapsed(!actionDock.classList.contains("dock-collapsed")));
  if (dockHide) dockHide.addEventListener("click", () => setDockHidden(true));
  if (dockRestore) dockRestore.addEventListener("click", () => setDockCollapsed(true));
  if (toggle) toggle.addEventListener("click", () => setMode(!root.classList.contains("presentation-mode")));
  if (tourToggle) tourToggle.addEventListener("click", startTour);
  document.getElementById("tour-prev")?.addEventListener("click", () => moveTour(-1));
  document.getElementById("tour-next")?.addEventListener("click", () => moveTour(1));
  document.getElementById("tour-exit")?.addEventListener("click", () => exitTour(true));
  if (screenshotToggle && screenshotPanel) screenshotToggle.addEventListener("click", () => {
    screenshotPanel.hidden = false;
    setMode(true);
    const activeStep = document.querySelector(".tour-active")?.id;
    if (exportSelect && activeStep && exportTargets.some(d => d.id === activeStep)) exportSelect.value = activeStep;
    setExportStatus("Choose a module, preview it, then export PNG or full ZIP.");
    updateExportSelection();
  });
  renderExportSlideList();
  if (exportSelect) exportSelect.addEventListener("change", updateExportSelection);
  if (exportQuality) exportQuality.addEventListener("change", updateExportSelection);
  if (exportCurrent) exportCurrent.addEventListener("click", () => runExport([selectedExportTarget()], "png"));
  if (exportTour) exportTour.addEventListener("click", () => {
    const target = currentTourTarget();
    if (exportSelect) exportSelect.value = target.id;
    updateExportSelection();
    runExport([target], "png");
  });
  if (exportAll) exportAll.addEventListener("click", () => runExport(exportTargets, "zip"));
  document.querySelectorAll("[data-close-screenshot]").forEach(el => el.addEventListener("click", () => { if (screenshotPanel) screenshotPanel.hidden = true; }));

  window.addEventListener("keydown", event => {
    const tag = event.target && event.target.tagName ? event.target.tagName.toLowerCase() : "";
    if (["input", "textarea", "select"].includes(tag)) return;
    if (event.key.toLowerCase() === "p") setMode(!root.classList.contains("presentation-mode"));
    if (event.key.toLowerCase() === "h") toggleDockHidden();
    if (!controls?.hidden && event.key === "ArrowRight") moveTour(1);
    if (!controls?.hidden && event.key === "ArrowLeft") moveTour(-1);
    if (event.key === "Escape") {
      exitTour(true);
      if (screenshotPanel) screenshotPanel.hidden = true;
      closeEvidenceModal();
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


function mergeEvidence(data) {
  const byId = new Map((data.evidence || []).map(d => [d.paper_id, d]));
  for (const paper of data.papers) {
    const ev = byId.get(paper.paper_id);
    if (!ev) continue;
    paper.manual_topic_label = ev.manual_topic_label || paper.manual_topic_label;
    paper.one_sentence_contribution_zh = ev.one_sentence_contribution_zh || paper.one_sentence_contribution_zh;
    paper.why_time_tested_zh = ev.why_time_tested_zh || paper.why_time_tested_zh;
    paper.evidence_url_1 = ev.evidence_url_1 || paper.evidence_url_1;
    paper.evidence_url_2 = ev.evidence_url_2 || paper.evidence_url_2;
    paper.display_priority = ev.display_priority || paper.display_priority;
    paper.evidence_checked = ev.checked || paper.evidence_checked;
    paper.archetype_rationale = ev.archetype_rationale || paper.archetype_rationale;
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

function renderLag(rows, papers) {
  const {svg, width, height} = chartBox("#lag-chart");
  const margin = {top: 28, right: 22, bottom: 46, left: 52};
  const parseLower = bin => +bin.match(/\((\d+)/)[1];
  const sorted = rows.slice().sort((a, b) => d3.ascending(parseLower(a.lag_bin), parseLower(b.lag_bin)));
  const x = d3.scaleBand().domain(sorted.map(d => d.lag_bin)).range([margin.left, width - margin.right]).padding(0.18);
  const y = d3.scaleLinear().domain([0, d3.max(sorted, d => d.paper_count)]).nice().range([height - margin.bottom, margin.top]);
  svg.append("g").attr("class", "grid").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5).tickSize(-(width-margin.left-margin.right)).tickFormat(""));
  svg.append("g").attr("class", "axis").attr("transform", `translate(0,${height-margin.bottom})`).call(d3.axisBottom(x));
  svg.append("g").attr("class", "axis").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5));
  svg.selectAll("rect.bar").data(sorted).join("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.lag_bin)).attr("y", d => y(d.paper_count))
    .attr("width", x.bandwidth()).attr("height", d => y(0) - y(d.paper_count))
    .attr("rx", 8).attr("fill", "url(#lagGrad)")
    .on("mousemove", (e,d) => showTip(e, `<b>${d.lag_bin}</b><br>${d.paper_count} papers<br>Recognition lag = announcement year − publication year<br>Avg citations: ${fmt(num(d.avg_citation_count))}`))
    .on("mouseleave", hideTip);
  svg.selectAll("text.val").data(sorted).join("text")
    .attr("class", "val")
    .attr("x", d => x(d.lag_bin) + x.bandwidth() / 2)
    .attr("y", d => y(d.paper_count) - 6)
    .attr("text-anchor", "middle")
    .attr("fill", "#eef4ff")
    .attr("font-size", 12)
    .attr("font-weight", 600)
    .text(d => d.paper_count);
  const lagMedian = d3.median(papers, d => d.recognition_lag);
  const lagMean = d3.mean(papers, d => d.recognition_lag);
  svg.append("text")
    .attr("x", width - margin.right)
    .attr("y", margin.top - 6)
    .attr("text-anchor", "end")
    .attr("fill", "#f6bd60")
    .attr("font-size", 12)
    .attr("font-weight", 600)
    .text(`Median: ${fmt1(lagMedian)}y  ·  Mean: ${fmt1(lagMean)}y`);
  addGradient(svg, "lagGrad", "#70e1d4", "#3d8ee8");

  const peak = sorted.slice().sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count)))[0];
  const medianBand = sorted.find(d => d.lag_bin === "(10, 15]");
  const longTail = sorted.find(d => d.lag_bin === "(30, 40]");
  if (peak) addCallout(svg, x(peak.lag_bin) + x.bandwidth() * 0.52, y(peak.paper_count), "Dense window · 5–10y", 18, -22);
  if (medianBand) addCallout(svg, x(medianBand.lag_bin) + x.bandwidth() * 0.48, y(medianBand.paper_count), "Median sits here · 12y", 18, -26);
  if (longTail) addCallout(svg, x(longTail.lag_bin) + x.bandwidth() * 0.54, y(longTail.paper_count), "Long tail · 30y+", -112, -18);
}

function lagBinStart(label) {
  const match = String(label).match(/\d+/);
  return match ? Number(match[0]) : Number.POSITIVE_INFINITY;
}

function renderAwardTimeline(rows, papers) {
  const {svg, width, height} = chartBox("#timeline-chart");
  const margin = {top: 18, right: 150, bottom: 48, left: 58};
  const clean = rows.filter(d => d.year && d.announcement_year);
  const x = d3.scaleLinear().domain(d3.extent(clean, d => d.year)).nice().range([margin.left, width-margin.right]);
  const y = d3.scaleLinear().domain(d3.extent(clean, d => d.announcement_year)).nice().range([height-margin.bottom, margin.top]);
  const r = d3.scaleSqrt().domain(d3.extent(clean, d => d.citation_count)).range([3, 11]);
  function lagCategory(lag) {
    if (!Number.isFinite(lag)) return "typical recognition lag";
    if (lag < 10) return "short recognition lag";
    if (lag <= 18) return "typical recognition lag";
    return "long recognition lag";
  }
  const lagColor = d3.scaleOrdinal()
    .domain(["short recognition lag", "typical recognition lag", "long recognition lag"])
    .range(["#f6bd60", "#b8a1ff", "#70e1d4"]);
  svg.append("g").attr("class", "grid").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5).tickSize(-(width-margin.left-margin.right)).tickFormat(""));
  svg.append("g").attr("class", "axis").attr("transform", `translate(0,${height-margin.bottom})`).call(d3.axisBottom(x).ticks(6).tickFormat(d3.format("d")));
  svg.append("g").attr("class", "axis").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5).tickFormat(d3.format("d")));
  svg.append("text").attr("class", "chart-title-small").attr("x", width/2).attr("y", height-8).attr("text-anchor", "middle").text("publication year");
  svg.append("text").attr("class", "chart-title-small").attr("x", -height/2).attr("y", 14).attr("text-anchor", "middle").attr("transform", "rotate(-90)").text("award year");
  const timelineMarks = svg.selectAll("circle.timeline-dot").data(clean).join("circle")
    .attr("class", "dot timeline-dot")
    .attr("cx", d => x(d.year)).attr("cy", d => y(d.announcement_year))
    .attr("r", d => r(d.citation_count)).attr("fill", d => lagColor(lagCategory(d.recognition_lag))).attr("opacity", 0.68)
    .on("mousemove", (e,d) => showTip(e, `<b>${escapeHtml(d.title)}</b><br>${d.venue} · ${d.year} → ${d.announcement_year}<br>Lag: ${d.recognition_lag} years<br>Citations: ${fmt(d.citation_count)}`))
    .on("mouseleave", hideTip)
    .on("click", (_,d) => updateDetail(papers.find(p => p.paper_id === d.paper_id) || d));
  makeKeyboardMarks(
    timelineMarks,
    d => `Timeline paper ${d.title}. ${d.venue}, publication ${d.year}, award ${d.announcement_year}, recognition lag ${d.recognition_lag} years. Press Enter to show details.`,
    d => updateDetail(papers.find(p => p.paper_id === d.paper_id) || d)
  );
  const lagCategories = ["short recognition lag", "typical recognition lag", "long recognition lag"];
  const legendX = width - margin.right + 14;
  const legendY = margin.top + 4;
  svg.append("rect")
    .attr("x", legendX - 10).attr("y", legendY - 6)
    .attr("width", 170).attr("height", lagCategories.length * 20 + 12)
    .attr("rx", 6).attr("fill", "rgba(18,22,36,0.78)").attr("stroke", "rgba(255,255,255,0.12)");
  const legend = svg.append("g").attr("transform", `translate(${legendX},${legendY})`);
  legend.selectAll("g").data(lagCategories).join("g")
    .attr("transform", (_, i) => `translate(0, ${i * 20})`)
    .each(function(d) {
      const g = d3.select(this);
      g.append("rect").attr("width", 10).attr("height", 10).attr("rx", 2).attr("fill", lagColor(d)).attr("opacity", 0.68);
      g.append("text").attr("x", 16).attr("y", 9).attr("fill", "#cdd6e5").attr("font-size", 11).text(d);
    });
  const longest = clean.slice().sort((a,b) => d3.descending(a.recognition_lag,b.recognition_lag))[0];
  if (longest) addCallout(svg, x(longest.year), y(longest.announcement_year), `Longest lag · ${longest.recognition_lag}y`, 18, -18);
  svg.append("text")
    .attr("x", margin.left)
    .attr("y", height - margin.bottom + 26)
    .attr("fill", "#9aa8bd")
    .attr("font-size", 11)
    .text("Color thresholds: short < 10y, typical 10–18y, long > 18y (recognition lag = announcement year − publication year)");
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

function wrapText(text, maxWidth) {
  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = words[0];
  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    if (currentLine.length + word.length + 1 <= maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

function horizontalBars(sel, rows, labelKey, valueKey, fill, tip, onClick) {
  const {svg, width, height} = chartBox(sel);
  const margin = {top: 16, right: 26, bottom: 34, left: 152};
  const x = d3.scaleLinear().domain([0, d3.max(rows, d => num(d[valueKey]))]).nice().range([margin.left, width - margin.right]);
  const y = d3.scaleBand().domain(rows.map(d => d[labelKey])).range([margin.top, height - margin.bottom]).padding(0.22);
  svg.append("g").attr("class", "grid").attr("transform", `translate(0,${height-margin.bottom})`).call(d3.axisBottom(x).ticks(5).tickSize(-(height-margin.top-margin.bottom)).tickFormat(""));
  svg.append("g").attr("class", "axis").attr("transform", `translate(0,${height-margin.bottom})`).call(d3.axisBottom(x).ticks(5));
  svg.append("g").attr("class", "axis").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).tickSize(0)).call(g => g.select(".domain").remove());
  svg.selectAll(".axis text").remove();
  svg.selectAll(".tick-label").data(rows).join("g")
    .attr("class", "tick-label")
    .attr("transform", d => `translate(${margin.left - 8},${y(d[labelKey]) + y.bandwidth()/2})`)
    .each(function(d) {
      const lines = wrapText(d[labelKey], 16);
      const g = d3.select(this);
      lines.forEach((line, i) => {
        g.append("text")
          .attr("x", -4)
          .attr("y", (i - (lines.length - 1) / 2) * 14)
          .attr("fill", "#cdd6e5")
          .attr("font-size", 11)
          .attr("text-anchor", "end")
          .text(line);
      });
    });
  const barMarks = svg.selectAll("rect.bar").data(rows).join("rect")
    .attr("class", "bar")
    .attr("x", margin.left).attr("y", d => y(d[labelKey]))
    .attr("height", y.bandwidth()).attr("width", d => x(num(d[valueKey])) - margin.left)
    .attr("rx", 8).attr("fill", fill)
    .on("mousemove", (e,d) => showTip(e, `<b>${d[labelKey]}</b><br>${tip(d)}`))
    .on("mouseleave", hideTip)
    .on("click", (_,d) => onClick && onClick(d));
  makeKeyboardMarks(
    barMarks,
    d => `${d[labelKey]} bar, value ${fmt(num(d[valueKey]))}. ${onClick ? "Press Enter to update details." : "Focusable chart value for keyboard review."}`,
    d => onClick && onClick(d)
  );
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
  const scatterMarks = svg.selectAll("circle.dot").data(rows).join("circle")
    .attr("class", "dot")
    .attr("cx", d => x(d.recognition_lag)).attr("cy", d => y(d.citation_count))
    .attr("r", d => 3 + Math.sqrt(Math.max(0, num(d.impact_breadth_score))) / 3)
    .attr("fill", d => area(d.venue_area)).attr("opacity", 0.78)
    .on("mousemove", (e,d) => showTip(e, `<b>${d.title}</b><br>${d.venue} · ${d.year} → ${d.announcement_year}<br>Lag: ${d.recognition_lag} years<br>Citations: ${fmt(d.citation_count)}`))
    .on("mouseleave", hideTip)
    .on("click", (_,d) => updateDetail(papers.find(p => p.paper_id === d.paper_id) || d));
  makeKeyboardMarks(
    scatterMarks,
    d => `Citation scatter paper ${d.title}. Recognition lag ${d.recognition_lag} years, citations ${fmt(d.citation_count)}. Press Enter to show details.`,
    d => updateDetail(papers.find(p => p.paper_id === d.paper_id) || d)
  );
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
  const breadthMarks = svg.selectAll("circle.breadth-dot").data(clean).join("circle")
    .attr("class", "dot breadth-dot")
    .attr("cx", d => x(d.impact_breadth_score)).attr("cy", d => y(d.citation_count))
    .attr("r", d => 3 + Math.sqrt(num(d.citing_country_count)) * 1.2)
    .attr("fill", d => color(d.venue_area)).attr("opacity", 0.7)
    .on("mousemove", (e,d) => showTip(e, `<b>${escapeHtml(d.title)}</b><br>Breadth: ${fmt1(d.impact_breadth_score)}<br>Citing fields: ${fmt(d.citing_field_count)}<br>Citing countries: ${fmt(d.citing_country_count)}<br>Citations: ${fmt(d.citation_count)}`))
    .on("mouseleave", hideTip)
    .on("click", (_,d) => updateDetail(papers.find(p => p.paper_id === d.paper_id) || d));
  makeKeyboardMarks(
    breadthMarks,
    d => `Breadth chart paper ${d.title}. Impact breadth score ${fmt1(d.impact_breadth_score)}, citations ${fmt(d.citation_count)}. Press Enter to show details.`,
    d => updateDetail(papers.find(p => p.paper_id === d.paper_id) || d)
  );
  const high = clean.slice().sort((a,b) => d3.descending(a.impact_breadth_score,b.impact_breadth_score))[0];
  if (high) addCallout(svg, x(high.impact_breadth_score), y(high.citation_count), "Widest diffusion", -96, -20);
}

const countryEmojis = {
  US: { emoji: "🇺🇸", name: "United States" },
  CA: { emoji: "🇨🇦", name: "Canada" },
  GB: { emoji: "🇬🇧", name: "United Kingdom" },
  DE: { emoji: "🇩🇪", name: "Germany" },
  IL: { emoji: "🇮🇱", name: "Israel" },
  FR: { emoji: "🇫🇷", name: "France" },
  AU: { emoji: "🇦🇺", name: "Australia" },
  IT: { emoji: "🇮🇹", name: "Italy" },
  CH: { emoji: "🇨🇭", name: "Switzerland" },
  NL: { emoji: "🇳🇱", name: "Netherlands" },
  ES: { emoji: "🇪🇸", name: "Spain" },
  MX: { emoji: "🇲🇽", name: "Mexico" },
  CN: { emoji: "🇨🇳", name: "China" },
  BE: { emoji: "🇧🇪", name: "Belgium" },
  KR: { emoji: "🇰🇷", name: "South Korea" },
  TW: { emoji: "🇹🇼", name: "Taiwan" },
  SG: { emoji: "🇸🇬", name: "Singapore" },
  AT: { emoji: "🇦🇹", name: "Austria" },
  IS: { emoji: "🇮🇸", name: "Iceland" },
  IN: { emoji: "🇮🇳", name: "India" },
  FI: { emoji: "🇫🇮", name: "Finland" },
  DK: { emoji: "🇩🇰", name: "Denmark" },
  VG: { emoji: "🏴", name: "British Virgin Islands" }
};

function shortenInstitution(name) {
  const abbreviations = {
    "University of California, Berkeley": "UC Berkeley",
    "Carnegie Mellon University": "CMU",
    "Stanford University": "Stanford",
    "Massachusetts Institute of Technology": "MIT",
    "Cornell University": "Cornell",
    "IBM Research - Almaden": "IBM Almaden",
    "IBM (United States)": "IBM",
    "University of Massachusetts Amherst": "UMass Amherst",
    "University of Washington": "UW",
    "International Computer Science Institute": "ICSI",
    "Intel (United States)": "Intel",
    "Nokia (United States)": "Nokia",
    "University of Toronto": "U of Toronto",
    "University of British Columbia": "UBC",
    "AT&T (United States)": "AT&T",
    "Microsoft (United States)": "Microsoft",
    "Hewlett-Packard (United States)": "HP",
    "University of California, San Diego": "UC San Diego",
    "Princeton University": "Princeton",
    "University of Southern California": "USC",
    "University of Michigan–Ann Arbor": "U Michigan",
    "University of Cambridge": "Cambridge",
    "University of Maryland, College Park": "UMD",
    "The University of Texas at Austin": "UT Austin",
    "University of California, Irvine": "UC Irvine",
    "Duke University": "Duke",
    "California Institute of Technology": "Caltech",
    "Centre National de la Recherche Scientifique": "CNRS",
    "University of Wisconsin–Madison": "UW Madison",
    "University of Colorado Boulder": "CU Boulder",
    "Simon Fraser University": "SFU",
    "University of Chicago": "U Chicago",
    "University of Oxford": "Oxford",
    "Harvard University": "Harvard",
    "ETH Zurich": "ETH Zurich",
    "Imperial College London": "Imperial"
  };
  return abbreviations[name] || name.replace(/\(.*?\)/g, '').trim();
}

function isIndustryInstitution(name) {
  const academicNames = ['Stanford', 'Berkeley', 'Carnegie Mellon', 'MIT', 'Cornell', 'Harvard',
    'Princeton', 'Yale', 'Columbia', 'University of California', 'University of Washington',
    'University of Michigan', 'University of Texas', 'University of Chicago', 'Cambridge',
    'Oxford', 'ETH Zurich', 'EPFL', 'University of Toronto', 'University of British Columbia',
    'Australian National University', 'Technion', 'Tel Aviv', 'Technische', 'TU Berlin',
    'Ludwig Maximilian', 'University of Paris', 'Sorbonne', 'University of Tokyo', 'Kyoto',
    'National University of Singapore', 'Nanyang', 'Indian Institute', 'IIT', 'University College',
    'Imperial College', 'University of Amsterdam', 'Leiden', 'Utrecht', 'University of Helsinki',
    'University of Copenhagen', 'University of Oslo', 'University of Stockholm', 'KTH',
    'Chalmers', 'University of Manchester', 'University of Edinburgh', 'University of Glasgow',
    'University of Birmingham', 'University of Bristol', 'University of Leeds', 'University of Sheffield',
    'University of Liverpool', 'University of Nottingham', 'University of Southampton', 'King\'s College',
    'University College London', 'University of Illinois', 'University of Wisconsin', 'University of Maryland',
    'Pennsylvania State', 'Ohio State', 'Purdue', 'Rice', 'Duke', 'Johns Hopkins', 'Northwestern',
    'University of Southern California', 'Georgia Tech', 'Virginia Tech', 'Colorado', 'Arizona',
    'Rutgers', 'State University', 'California Institute of Technology', 'Caltech', 'Swiss Federal',
    'ETH', 'Max Planck', 'CNRS', 'INRIA', 'CSIRO', 'National Research Council'];
  
  const industryKeywords = ['IBM', 'Intel', 'Microsoft', 'AT&T', 'HP', 'Hewlett-Packard', 'Nokia', 
    'Bell', 'Oracle', 'Yahoo', 'Google', 'Amazon', 'Facebook', 'Apple', 'Samsung', 'Huawei',
    'Alcatel', 'Cisco', 'Ericsson', 'NEC', 'Fujitsu', 'Toshiba', 'Sony', 'Philips',
    'Siemens', 'Nortel', 'Lucent', 'Qualcomm', 'Broadcom', 'NVIDIA', 'AMD', 'Dell',
    'Schlumberger', 'Ford', 'Tandem', 'Unisys', 'Citigroup', 'Tamedia', 'Digital Wave',
    'Research International', 'Tellabs', 'Space Telescope', 'Aerospace', 'Naval', 'NIST',
    'Pittsburgh Supercomputing', 'San Diego Supercomputer', 'Ames Research', 'Lawrence',
    'SRI International', 'Palo Alto Research', 'PARC'];
  
  if (academicNames.some(namePart => name.toLowerCase().includes(namePart.toLowerCase()))) {
    return false;
  }
  
  return industryKeywords.some(keyword => name.toLowerCase().includes(keyword.toLowerCase()));
}

function getInstitutionCountry(name, papers) {
  // 从机构名称推断国家（优先）
  if (name.includes('(United States)')) return 'US';
  if (name.includes('(United Kingdom)')) return 'GB';
  if (name.includes('(Canada)')) return 'CA';
  if (name.includes('(Germany)')) return 'DE';
  if (name.includes('(France)')) return 'FR';
  if (name.includes('(Switzerland)')) return 'CH';
  if (name.includes('(Australia)')) return 'AU';
  if (name.includes('(Israel)')) return 'IL';
  if (name.includes('(Mexico)')) return 'MX';
  if (name.includes('(China)')) return 'CN';
  if (name.includes('(South Korea)')) return 'KR';
  if (name.includes('(Taiwan)')) return 'TW';
  if (name.includes('(Singapore)')) return 'SG';
  if (name.includes('(Austria)')) return 'AT';
  if (name.includes('(Iceland)')) return 'IS';
  if (name.includes('(India)')) return 'IN';
  if (name.includes('(Finland)')) return 'FI';
  if (name.includes('(Denmark)')) return 'DK';
  if (name.includes('(Belgium)')) return 'BE';
  if (name.includes('(Italy)')) return 'IT';
  if (name.includes('(Netherlands)')) return 'NL';
  if (name.includes('(Spain)')) return 'ES';
  if (name.includes('(British Virgin Islands)')) return 'VG';
  if (name.includes('(Hong Kong)')) return 'CN';
  
  // 从论文数据中提取机构的国家信息（JSON数组格式）
  for (const paper of papers) {
    if (paper.institutions && paper.countries) {
      let insts, countries;
      try {
        insts = JSON.parse(paper.institutions);
        countries = JSON.parse(paper.countries);
      } catch {
        continue;
      }
      
      if (Array.isArray(insts) && Array.isArray(countries)) {
        for (let i = 0; i < insts.length; i++) {
          const instName = typeof insts[i] === 'string' ? insts[i].trim() : '';
          const country = typeof countries[i] === 'string' ? countries[i].trim() : '';
          if (instName === name && country) {
            return country;
          }
        }
      }
    }
  }
  
  // 从机构名称中的关键词推断 - 更多国家支持
  if (name.includes('ETH Zurich') || name.includes('Swiss Federal') || name.includes('Tamedia')) return 'CH';
  if (name.includes('University of Toronto') || name.includes('University of British Columbia') || 
      name.includes('Western University') || name.includes('Simon Fraser') || name.includes('University of Waterloo') ||
      name.includes('University of Alberta') || name.includes('Carleton University') || name.includes('Bell (Canada)') ||
      name.includes('National Research Council Canada') || name.includes('Tellabs (Canada)') || name.includes('IBM (Canada)')) return 'CA';
  if (name.includes('University of Cambridge') || name.includes('University of Oxford') || 
      name.includes('Imperial College') || name.includes('University of Edinburgh') ||
      name.includes('Birkbeck') || name.includes('Yahoo (United Kingdom)') || name.includes('Intel (United Kingdom)')) return 'GB';
  if (name.includes('Technion') || name.includes('Hebrew University') || name.includes('Weizmann')) return 'IL';
  if (name.includes('Australian National') || name.includes('University of Sydney') || name.includes('Macquarie')) return 'AU';
  if (name.includes('National University of Singapore') || name.includes('Institute for Infocomm')) return 'SG';
  if (name.includes('Max Planck') || name.includes('TU Berlin') || name.includes('University of Mannheim') ||
      name.includes('Bielefeld') || name.includes('Leipzig') || name.includes('Apple (Germany)') ||
      name.includes('Alcatel Lucent') || name.includes('Digital Equipment (Germany)') || name.includes('Ludwig-Maximilians')) return 'DE';
  if (name.includes('CNRS') || name.includes('INRIA') || name.includes('Sorbonne') ||
      name.includes('Université Grenoble') || name.includes('Université de Montpellier') ||
      name.includes('Laboratoire') || name.includes('Conservatoire National')) return 'FR';
  if (name.includes('Politecnico di Milano') || name.includes('Università') || 
      name.includes('Polytechnic University of Turin') || name.includes('Consorzio Nazionale')) return 'IT';
  if (name.includes('Universiteit') || name.includes('Centrum Wiskunde')) return 'NL';
  if (name.includes('Universidad') || name.includes('Barcelona') || name.includes('Pompeu Fabra')) return 'ES';
  if (name.includes('Korea Advanced') || name.includes('Kyungpook')) return 'KR';
  if (name.includes('Indian Institute') || name.includes('IIT')) return 'IN';
  if (name.includes('Chinese University') || name.includes('Academia Sinica') || 
      name.includes('Institute of Automation')) return 'CN';
  if (name.includes('University of Copenhagen')) return 'DK';
  if (name.includes('University of Helsinki') || name.includes('Tampere')) return 'FI';
  if (name.includes('Reykjavík')) return 'IS';
  if (name.includes('Vrije Universiteit Brussel') || name.includes('Ghent')) return 'BE';
  if (name.includes('Universidad Autónoma') || name.includes('Instituto Tecnologico')) return 'MX';
  if (name.includes('University of York')) return 'GB';
  
  // 如果都匹配不到，检查是否有明显的非美国关键词
  const nonUSKeywords = [
    {country: 'CA', keywords: ['Toronto', 'British Columbia', 'Alberta', 'Manitoba', 'Saskatchewan', 'Ontario']},
    {country: 'GB', keywords: ['Cambridge', 'Oxford', 'Imperial', 'Edinburgh', 'London', 'Manchester']},
    {country: 'DE', keywords: ['Munich', 'Berlin', 'Heidelberg', 'Stuttgart', 'Karlsruhe']},
    {country: 'FR', keywords: ['Paris', 'Lyon', 'Grenoble', 'Montpellier']},
    {country: 'CH', keywords: ['Zurich', 'Geneva', 'Lausanne', 'ETH']},
    {country: 'AU', keywords: ['Sydney', 'Melbourne', 'Brisbane', 'Perth']},
    {country: 'IL', keywords: ['Jerusalem', 'Haifa', 'Tel Aviv']},
    {country: 'SG', keywords: ['Singapore']},
    {country: 'KR', keywords: ['Seoul', 'Daejeon', 'Pohang']},
    {country: 'IN', keywords: ['Bangalore', 'Mumbai', 'Delhi', 'Chennai']},
    {country: 'CN', keywords: ['Hong Kong', 'Beijing', 'Shanghai', 'Taipei']},
    {country: 'DK', keywords: ['Copenhagen', 'Aarhus']},
    {country: 'FI', keywords: ['Helsinki', 'Espoo', 'Tampere']},
    {country: 'IT', keywords: ['Milan', 'Rome', 'Turin', 'Florence']},
    {country: 'NL', keywords: ['Amsterdam', 'Rotterdam', 'Utrecht']},
    {country: 'ES', keywords: ['Madrid', 'Barcelona', 'Valencia']},
    {country: 'BE', keywords: ['Brussels', 'Antwerp', 'Ghent']}
  ];
  
  for (const {country, keywords} of nonUSKeywords) {
    if (keywords.some(kw => name.includes(kw))) {
      return country;
    }
  }
  
  return 'US'; // 默认美国，因为大部分是美国机构
}

function renderInstitutions(rows, papers) {
  // 为每个机构添加国家信息和类型
  const enrichedRows = rows.filter(d => d.name).map(d => ({
    ...d,
    country: getInstitutionCountry(d.name, papers),
    isIndustry: isIndustryInstitution(d.name)
  }));
  
  const academic = enrichedRows.filter(d => !d.isIndustry).sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count))).slice(0, 10);
  const industry = enrichedRows.filter(d => d.isIndustry).sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count))).slice(0, 10);
  
  renderInstitutionList("#academic-chart", academic, "#60a5fa", papers);
  renderInstitutionList("#industry-chart", industry, "#a78bfa", papers);
  
  // 渲染综合气泡图
  renderInstitutionCountryBubble(enrichedRows, papers);
}

function renderInstitutionList(selector, rows, color, papers) {
  const {svg, width, height} = chartBox(selector);
  const margin = {top: 16, right: 40, bottom: 34, left: 12};
  
  const x = d3.scaleLinear().domain([0, d3.max(rows, d => num(d.paper_count))]).nice().range([margin.left + 100, width - margin.right]);
  const y = d3.scaleBand().domain(rows.map(d => d.name)).range([margin.top, height - margin.bottom]).padding(0.22);
  
  // 网格线
  svg.append("g").attr("class", "grid").attr("transform", `translate(0,${height-margin.bottom})`).call(d3.axisBottom(x).ticks(4).tickSize(-(height-margin.top-margin.bottom)).tickFormat(""));
  svg.append("g").attr("class", "axis").attr("transform", `translate(0,${height-margin.bottom})`).call(d3.axisBottom(x).ticks(4));
  
  // 机构名称（左边）
  const nameGroup = svg.append("g").attr("transform", `translate(${margin.left}, 0)`);
  nameGroup.selectAll("g.inst-label").data(rows).join("g")
    .attr("class", "inst-label")
    .attr("transform", d => `translate(0, ${y(d.name) + y.bandwidth()/2})`)
    .each(function(d) {
      const g = d3.select(this);
      const countryInfo = countryEmojis[d.country] || { emoji: "🌍", name: d.country };
      
      // 国旗emoji
      g.append("text")
        .attr("x", 0)
        .attr("y", 4)
        .attr("text-anchor", "start")
        .attr("fill", "#eef4ff")
        .attr("font-size", 13)
        .text(countryInfo.emoji);
      
      // 机构简称
      g.append("text")
        .attr("x", 20)
        .attr("y", 4)
        .attr("text-anchor", "start")
        .attr("fill", "#cdd6e5")
        .attr("font-size", 11)
        .attr("font-weight", 500)
        .text(shortenInstitution(d.name));
    });
  
  // 条形
  const barMarks = svg.selectAll("rect.bar").data(rows).join("rect")
    .attr("class", "bar")
    .attr("x", margin.left + 100)
    .attr("y", d => y(d.name))
    .attr("height", y.bandwidth())
    .attr("width", d => x(num(d.paper_count)) - (margin.left + 100))
    .attr("rx", 6)
    .attr("fill", color)
    .on("mousemove", (e,d) => {
      const countryInfo = countryEmojis[d.country] || { emoji: "🌍", name: d.country };
      showTip(e, `<b>${countryInfo.emoji} ${d.name}</b><br>${countryInfo.name}<br>${d.paper_count} papers<br>Centrality: ${num(d.centrality)}`);
    })
    .on("mouseleave", hideTip);
  
  makeKeyboardMarks(barMarks, d => `${shortenInstitution(d.name)} bar, ${d.paper_count} papers.`, null);
  
  // 数值标签
  svg.selectAll("text.value").data(rows).join("text")
    .attr("x", d => x(num(d.paper_count)) + 6)
    .attr("y", d => y(d.name) + y.bandwidth()/2 + 4)
    .attr("fill", "#cdd6e5")
    .attr("font-size", 10)
    .text(d => fmt(num(d.paper_count)));
}

const countryColors = {
  US: "#8b5cf6",
  CA: "#06b6d4",
  GB: "#f472b6",
  DE: "#fbbf24",
  IL: "#fb923c",
  FR: "#34d399",
  AU: "#a78bfa",
  IT: "#fb7185",
  CH: "#38bdf8",
  NL: "#facc15",
  ES: "#4ade80",
  MX: "#f43f5e",
  CN: "#0ea5e9",
  BE: "#eab308",
  KR: "#22c55e",
  TW: "#ec4899",
  SG: "#06b6d4",
  AT: "#d946ef",
  IS: "#f97316",
  IN: "#10b981",
  FI: "#8b5cf6",
  DK: "#0ea5e9",
  VG: "#a855f7"
};

function getCountryColor(country) {
  return countryColors[country] || "#64748b";
}


function renderGlobalMemoryMap(countries, institutions, papers) {
  const target = d3.select("#global-memory-map");
  if (target.empty()) return;
  const institutionCountryRows = institutions
    .filter(d => d.name)
    .map(d => ({...d, inferred_country: d.country || getInstitutionCountry(d.name, papers)}))
    .filter(d => d.inferred_country);
  const instByCountry = d3.rollup(
    institutionCountryRows,
    rows => rows.slice().sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count))).slice(0, 3),
    d => d.inferred_country
  );
  const paperByCountry = new Map();
  for (const paper of papers) {
    for (const country of parseListField(paper.countries)) {
      if (!country) continue;
      const prev = paperByCountry.get(country);
      if (!prev || num(paper.citation_count) > num(prev.citation_count)) paperByCountry.set(country, paper);
    }
  }
  const countryCoords = {
    US: [-98, 39], CA: [-106, 57], GB: [-2, 54], DE: [10, 51], IL: [35, 31.5],
    FR: [2, 46], AU: [134, -25], IT: [12, 42], CH: [8, 47], NL: [5, 52],
    ES: [-4, 40], MX: [-102, 23], CN: [104, 35], BE: [4.5, 50.5], KR: [127.5, 36],
    TW: [121, 23.7], SG: [104, 1.35], AT: [14, 47.5], IS: [-19, 65], IN: [78, 22],
    FI: [26, 64], DK: [10, 56], VG: [-64.6, 18.4]
  };
  const iso2ToIso3 = {
    US: "USA", CA: "CAN", GB: "GBR", DE: "DEU", IL: "ISR", FR: "FRA", AU: "AUS",
    IT: "ITA", CH: "CHE", NL: "NLD", ES: "ESP", MX: "MEX", CN: "CHN", BE: "BEL",
    KR: "KOR", TW: "TWN", SG: "SGP", AT: "AUT", IS: "ISL", IN: "IND", FI: "FIN",
    DK: "DNK", VG: "VGB"
  };
  const atlasNames = {
    US: "United States of America", CA: "Canada", GB: "United Kingdom", DE: "Germany", IL: "Israel",
    FR: "France", AU: "Australia", IT: "Italy", CH: "Switzerland", NL: "Netherlands", ES: "Spain",
    MX: "Mexico", CN: "China", BE: "Belgium", KR: "South Korea", TW: "Taiwan", SG: "Singapore",
    AT: "Austria", IS: "Iceland", IN: "India", FI: "Finland", DK: "Denmark"
  };
  const enriched = countries
    .filter(d => num(d.paper_count) > 0)
    .map(d => ({
      ...d,
      countryInfo: countryEmojis[d.country] || {emoji: "◎", name: d.country},
      institutions: instByCountry.get(d.country) || [],
      paper: paperByCountry.get(d.country),
      coords: countryCoords[d.country],
      iso3: iso2ToIso3[d.country],
      atlasName: atlasNames[d.country] || (countryEmojis[d.country] && countryEmojis[d.country].name)
    }))
    .filter(d => d.coords)
    .sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count)));

  const topCards = enriched.slice(0, 6);
  const totalVisiblePapers = d3.sum(enriched, d => num(d.paper_count));
  const topCountry = enriched[0];
  const highCitationCountry = enriched.slice().sort((a,b) => d3.descending(num(a.avg_citation_count), num(b.avg_citation_count)))[0];
  const maxPapers = d3.max(enriched, d => num(d.paper_count)) || 1;
  const maxCitations = d3.max(enriched, d => num(d.avg_citation_count)) || 1;

  target.html(`
    <div class="world-map-panel">
      <div class="world-map-copy">
        <p class="section-kicker">Global Memory Map</p>
        <h3>From individual breakthroughs to a global memory network</h3>
        <p>This map turns affiliation metadata into a spatial story: long-term research impact is concentrated in a few hubs, but the memory of those papers travels through a wider international network.</p>
        <div class="world-map-kpis">
          <span><b>${fmt(enriched.length)}</b> countries/regions</span>
          <span><b>${fmt(totalVisiblePapers)}</b> paper-country links</span>
          <span><b>${escapeHtml(topCountry?.country || "—")}</b> largest visible hub</span>
          <span><b>${escapeHtml(highCitationCountry?.country || "—")}</b> strongest avg citation signal</span>
        </div>
      </div>
      <div class="world-map-canvas">
        <div class="map-hud top-left"><b>Metadata layer</b><span>author affiliation traces</span></div>
        <div class="map-hud top-right"><b>Reading</b><span>hub size = papers<br>hue = avg citations</span></div>
        <button class="map-legend-toggle" type="button" aria-expanded="false">
          <b>Encoding</b><span>show legend</span>
        </button>
        <svg class="world-memory-svg" viewBox="0 0 1120 610" role="img" aria-label="World map of visible Test-of-Time paper country metadata"></svg>
      </div>
      <div class="world-map-note">
        <b>Story move</b>
        <span>Use this as the final “global diffusion” layer: the project first explains what gets remembered, then shows where that memory is institutionally anchored. We explicitly avoid claiming national quality ranking.</span>
      </div>
    </div>
    <div class="global-memory-card-list"></div>
  `);

  const svg = target.select(".world-memory-svg");
  target.classed("legend-open", false);
  target.select(".map-legend-toggle").on("click", function() {
    const open = !target.classed("legend-open");
    target.classed("legend-open", open);
    d3.select(this)
      .attr("aria-expanded", String(open))
      .select("span")
      .text(open ? "hide legend" : "show legend");
  });
  const width = 1120;
  const height = 610;
  const projection = d3.geoNaturalEarth1().fitExtent([[42, 58], [1078, 506]], {type: "Sphere"});
  const path = d3.geoPath(projection);
  const radius = d3.scaleSqrt().domain([1, maxPapers]).range([5, 39]);
  const colorScale = d3.scaleSequentialSqrt(d3.interpolateRgbBasis(["#70e1d4", "#8fb7ff", "#b8a1ff", "#f6bd60"])).domain([0, maxCitations]);
  const activeByIso3 = new Map(enriched.map(d => [d.iso3, d]));
  const activeByName = new Map(enriched.filter(d => d.atlasName).map(d => [d.atlasName, d]));
  const major = enriched.slice(0, 11);

  const defs = svg.append("defs");
  const ocean = defs.append("radialGradient").attr("id", "oceanGlow").attr("cx", "48%").attr("cy", "42%").attr("r", "72%");
  ocean.append("stop").attr("offset", "0%").attr("stop-color", "#153044");
  ocean.append("stop").attr("offset", "58%").attr("stop-color", "#0b1826");
  ocean.append("stop").attr("offset", "100%").attr("stop-color", "#050912");
  const land = defs.append("linearGradient").attr("id", "landGradient").attr("x1", "0%").attr("x2", "100%").attr("y1", "0%").attr("y2", "100%");
  land.append("stop").attr("offset", "0%").attr("stop-color", "#24374d");
  land.append("stop").attr("offset", "100%").attr("stop-color", "#132033");
  const glow = defs.append("filter").attr("id", "softGlow").attr("x", "-60%").attr("y", "-60%").attr("width", "220%").attr("height", "220%");
  glow.append("feGaussianBlur").attr("stdDeviation", "4.5").attr("result", "blur");
  glow.append("feMerge").selectAll("feMergeNode").data(["blur", "SourceGraphic"]).join("feMergeNode").attr("in", d => d);

  svg.append("path")
    .datum({type: "Sphere"})
    .attr("class", "world-sphere")
    .attr("d", path);

  svg.append("path")
    .datum(d3.geoGraticule10())
    .attr("class", "world-graticule")
    .attr("d", path);

  svg.append("g").attr("class", "map-latitude-labels")
    .selectAll("text").data([-60, -30, 0, 30, 60]).join("text")
    .attr("x", 52)
    .attr("y", lat => projection([-174, lat])?.[1] || 0)
    .text(lat => `${Math.abs(lat)}°${lat < 0 ? "S" : lat > 0 ? "N" : ""}`);

  const drawFallbackLand = () => {
    const continents = [
      {name: "North America", points: [[-168,72],[-55,72],[-52,15],[-90,8],[-118,23],[-128,50]]},
      {name: "South America", points: [[-82,13],[-35,8],[-45,-55],[-76,-52],[-81,-20]]},
      {name: "Europe", points: [[-12,72],[40,70],[45,36],[8,35],[-12,44]]},
      {name: "Africa", points: [[-18,36],[52,34],[50,-35],[18,-35],[-18,-8]]},
      {name: "Asia", points: [[40,72],[180,68],[160,6],[104,-8],[72,8],[44,28]]},
      {name: "Australia", points: [[112,-10],[154,-12],[153,-44],[114,-43]]}
    ];
    svg.append("g").attr("class", "continent-layer fallback-land")
      .selectAll("path").data(continents).join("path")
      .attr("d", d => {
        const coords = d.points.map(p => projection(p)).filter(Boolean);
        return coords.length ? `M${coords.map(p => p.join(",")).join("L")}Z` : "";
      })
      .append("title").text(d => d.name);
  };

  const drawLand = (world) => {
    if (!world || !window.topojson || !world.objects?.countries) {
      drawFallbackLand();
      return;
    }
    const countriesGeo = topojson.feature(world, world.objects.countries).features;
    svg.append("g").attr("class", "continent-layer country-shapes")
      .selectAll("path").data(countriesGeo).join("path")
      .attr("class", d => activeCountryRow(d) ? "country-shape active-country" : "country-shape")
      .attr("fill", d => {
        const row = activeCountryRow(d);
        return row ? colorScale(num(row.avg_citation_count)) : "url(#landGradient)";
      })
      .attr("fill-opacity", d => activeCountryRow(d) ? 0.46 : 0.76)
      .attr("d", path)
      .append("title")
      .text(d => {
        const row = activeCountryRow(d);
        return row ? `${row.countryInfo.name}: ${fmt(num(row.paper_count))} papers` : (d.properties?.name || "background country");
      });
  };

  const activeCountryRow = (feature) => activeByIso3.get(feature.id) || activeByName.get(feature.properties?.name);

  const drawDataLayer = () => {
    const hub = enriched[0];
    const arcs = major.slice(1).map((d, i) => ({source: hub, target: d, index: i})).filter(d => d.source && d.target);
    svg.append("g").attr("class", "memory-arc-layer")
      .selectAll("path").data(arcs).join("path")
      .attr("class", "memory-arc")
      .attr("stroke", d => colorScale(num(d.target.avg_citation_count)))
      .attr("stroke-width", d => 0.9 + Math.sqrt(num(d.target.paper_count)) * 0.22)
      .attr("d", d => {
        const a = projection(d.source.coords);
        const b = projection(d.target.coords);
        if (!a || !b) return "";
        const distance = Math.abs(a[0] - b[0]);
        const mx = (a[0] + b[0]) / 2;
        const my = (a[1] + b[1]) / 2 - Math.max(34, distance * 0.16);
        return `M${a[0]},${a[1]} Q${mx},${my} ${b[0]},${b[1]}`;
      });

    svg.append("g").attr("class", "map-pulse-layer")
      .selectAll("circle").data(major.slice(0, 6)).join("circle")
      .attr("cx", d => projection(d.coords)[0])
      .attr("cy", d => projection(d.coords)[1])
      .attr("r", d => radius(num(d.paper_count)) + 12)
      .attr("class", "map-pulse-ring");

    const marker = svg.append("g").attr("class", "memory-marker-layer")
      .selectAll("g").data(enriched).join("g")
      .attr("class", (d, i) => `memory-marker ${i < 6 ? "major-hub" : "minor-hub"}`)
      .attr("transform", d => {
        const [x, y] = projection(d.coords);
        return `translate(${x},${y})`;
      })
      .attr("tabindex", 0)
      .attr("role", "button")
      .attr("aria-label", d => `${d.countryInfo.name}: ${fmt(num(d.paper_count))} papers. Press Enter to open representative paper.`)
      .on("click", (_, d) => { if (d.paper) openEvidenceCard(d.paper); })
      .on("keydown", (event, d) => {
        if ((event.key === "Enter" || event.key === " ") && d.paper) {
          event.preventDefault();
          openEvidenceCard(d.paper);
        }
      });

    marker.append("circle")
      .attr("class", "memory-marker-halo")
      .attr("r", d => radius(num(d.paper_count)) + 8);

    marker.append("circle")
      .attr("class", "memory-marker-core")
      .attr("r", d => radius(num(d.paper_count)))
      .attr("fill", d => colorScale(num(d.avg_citation_count)))
      .attr("stroke", "#eef4ff")
      .attr("stroke-opacity", 0.78)
      .attr("stroke-width", 1.35)
      .style("filter", "url(#softGlow)");

    marker.append("circle")
      .attr("class", "memory-marker-pin")
      .attr("r", 2.6)
      .attr("fill", "#ffffff");

    marker.filter((d, i) => i < 12).append("text")
      .attr("class", "memory-map-label")
      .attr("x", d => labelOffset(d, radius(num(d.paper_count))).x)
      .attr("y", d => labelOffset(d, radius(num(d.paper_count))).y)
      .attr("text-anchor", d => labelOffset(d, radius(num(d.paper_count))).anchor)
      .text(d => d.country);

    marker.append("title")
      .text(d => `${d.countryInfo.name}: ${fmt(num(d.paper_count))} papers · avg ${fmt(num(d.avg_citation_count))} citations`);

    const leaderData = major.slice(0, 6).map(d => {
      const p = projection(d.coords);
      const o = labelOffset(d, radius(num(d.paper_count)) + 4);
      return {d, x1: p[0], y1: p[1], x2: p[0] + o.x * 0.78, y2: p[1] + o.y * 0.78};
    });
    svg.append("g").attr("class", "leader-lines")
      .selectAll("line").data(leaderData).join("line")
      .attr("x1", d => d.x1).attr("y1", d => d.y1)
      .attr("x2", d => d.x2).attr("y2", d => d.y2);

    drawLegends();
  };

  const labelOffset = (d, r) => {
    const custom = {
      US: {x: 0, y: -r - 12, anchor: "middle"},
      CA: {x: -r - 12, y: -4, anchor: "end"},
      GB: {x: -r - 10, y: -8, anchor: "end"},
      DE: {x: r + 11, y: -4, anchor: "start"},
      FR: {x: -r - 10, y: 16, anchor: "end"},
      CH: {x: r + 10, y: 18, anchor: "start"},
      NL: {x: r + 10, y: -16, anchor: "start"},
      SG: {x: r + 10, y: 15, anchor: "start"},
      KR: {x: r + 10, y: -10, anchor: "start"},
      TW: {x: r + 10, y: 12, anchor: "start"},
      IL: {x: r + 11, y: 6, anchor: "start"},
      VG: {x: -r - 10, y: 14, anchor: "end"}
    };
    return custom[d.country] || {x: r + 9, y: 4, anchor: "start"};
  };

  const drawLegends = () => {
    const legend = svg.append("g").attr("class", "memory-map-legend legend-card")
      .attr("transform", `translate(58,${height - 172})`);
    legend.append("rect").attr("width", 414).attr("height", 126).attr("rx", 20);
    legend.append("text").attr("x", 20).attr("y", 28).attr("class", "legend-title").text("Encoding");
    legend.append("text").attr("x", 20).attr("y", 49).attr("class", "legend-subtitle").text("size encodes footprint, color encodes citation signal");

    const sizeGroup = legend.append("g").attr("class", "legend-size-scale").attr("transform", "translate(20,76)");
    sizeGroup.append("text").attr("x", 0).attr("y", -17).attr("class", "legend-axis-label").text("papers");
    [1, Math.max(2, Math.round(maxPapers / 3)), maxPapers].forEach((v, i) => {
      const cx = 22 + i * 58;
      const rr = Math.max(4, radius(v) * 0.42);
      sizeGroup.append("circle").attr("cx", cx).attr("cy", 0).attr("r", rr).attr("fill", "none").attr("stroke", "rgba(238,244,255,.74)");
      sizeGroup.append("text").attr("x", cx).attr("y", 34).attr("text-anchor", "middle").text(fmt(v));
    });

    const citationGroup = legend.append("g").attr("class", "legend-citation-scale").attr("transform", "translate(244,76)");
    citationGroup.append("text").attr("x", 0).attr("y", -17).attr("class", "legend-axis-label").text("avg citations");
    const gradientId = "citationRamp";
    const grad = defs.append("linearGradient").attr("id", gradientId).attr("x1", "0%").attr("x2", "100%");
    [0, .33, .66, 1].forEach(t => grad.append("stop").attr("offset", `${t * 100}%`).attr("stop-color", colorScale(t * maxCitations)));
    citationGroup.append("rect").attr("x", 0).attr("y", -7).attr("width", 132).attr("height", 14).attr("rx", 999).attr("fill", `url(#${gradientId})`);
    citationGroup.append("text").attr("x", 0).attr("y", 34).attr("text-anchor", "start").text("low");
    citationGroup.append("text").attr("x", 132).attr("y", 34).attr("text-anchor", "end").text("high");
  };

  d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
    .then(world => drawLand(world))
    .catch(drawFallbackLand)
    .finally(drawDataLayer);

  target.select(".global-memory-card-list").selectAll("article.global-memory-item").data(topCards).join("article")
    .attr("class", "global-memory-item")
    .html(d => `
      <div class="global-memory-head">
        <span class="global-memory-code">${escapeHtml(d.country)}</span>
        <div><b>${escapeHtml(d.countryInfo.name)}</b><small>${fmt(num(d.paper_count))} papers · avg ${fmt(num(d.avg_citation_count))} citations</small></div>
      </div>
      <div class="global-memory-bars">
        ${d.institutions.map(inst => `
          <div class="memory-inst-row">
            <span>${escapeHtml(shortenInstitution(inst.name))}</span>
            <i style="width:${Math.max(8, Math.min(100, num(inst.paper_count) * 6))}%"></i>
            <b>${fmt(num(inst.paper_count))}</b>
          </div>
        `).join("") || `<p class="mini-note">No institution row with verified country metadata in this slice.</p>`}
      </div>
      <div class="global-memory-paper">
        <span>Representative paper</span>
        <button type="button" data-global-paper-id="${escapeHtml(d.paper?.paper_id || "")}">${escapeHtml(d.paper ? shortTitle(d.paper.title) : "Open dataset row")}</button>
      </div>
    `);
  target.selectAll("[data-global-paper-id]").on("click", function() {
    const paper = activePapers.find(d => d.paper_id === this.getAttribute("data-global-paper-id"));
    if (paper) openEvidenceCard(paper);
  });
}

function parseListField(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  const text = String(value).trim();
  try { return JSON.parse(text); } catch {}
  return text.replace(/^\[|\]$/g, "").split(",").map(d => d.replace(/^['"]|['"]$/g, "").trim()).filter(Boolean);
}

function renderInstitutionCountryBubble(rows, papers) {
  const {svg, width, height} = chartBox("#institution-country-bubble");
  const margin = {top: 60, right: 200, bottom: 80, left: 80};
  
  const countryGroups = d3.group(rows, d => d.country);
  const countryData = Array.from(countryGroups, ([country, insts]) => ({
    country,
    totalPapers: d3.sum(insts, d => num(d.paper_count)),
    institutions: insts.length,
    academicCount: insts.filter(d => !d.isIndustry).length,
    industryCount: insts.filter(d => d.isIndustry).length,
    topInstitutions: insts.sort((a,b) => d3.descending(num(a.paper_count), num(b.paper_count))).slice(0, 5),
    avgCentrality: d3.mean(insts, d => num(d.centrality)) || 0
  })).sort((a,b) => d3.descending(a.totalPapers, b.totalPapers));
  
  const allCountries = countryData.filter(d => d.totalPapers > 0);
  let displayCountries = allCountries;
  
  const showWithoutUS = () => {
    if (toggleButton.classed("active")) {
      displayCountries = allCountries.filter(d => d.country !== "US");
    } else {
      displayCountries = allCountries;
    }
    updateChart();
  };
  
  const toggleButton = svg.append("g")
    .attr("class", "toggle-button")
    .attr("transform", `translate(${margin.left}, ${margin.top - 35})`)
    .style("cursor", "pointer")
    .on("click", function() {
      toggleButton.classed("active", !toggleButton.classed("active"));
      showWithoutUS();
    });
  
  toggleButton.append("rect")
    .attr("width", 16)
    .attr("height", 16)
    .attr("rx", 3)
    .attr("fill", "#374151")
    .attr("stroke", "#64748b");
  
  toggleButton.append("text")
    .attr("x", 22)
    .attr("y", 12)
    .attr("fill", "#9ca3af")
    .attr("font-size", 12)
    .text("Exclude USA");
  
  let activeCountry = null;

  const updateChart = () => {
    svg.selectAll(".chart-content").remove();
    svg.selectAll(".institution-bubble-group").remove();
    svg.selectAll(".institution-label").remove();
    activeCountry = null;
    
    const content = svg.append("g").attr("class", "chart-content");
    
    const x = d3.scalePoint()
      .domain(displayCountries.map(d => d.country))
      .range([margin.left, width - margin.right])
      .padding(0.35);
    
    const y = d3.scaleLinear()
      .domain([0, d3.max(displayCountries, d => d.totalPapers) * 1.2])
      .nice()
      .range([height - margin.bottom, margin.top]);
    
    const r = d3.scaleSqrt()
      .domain([0, d3.max(displayCountries, d => d.institutions)])
      .range([8, 45]);
    
    content.append("g").attr("class", "grid")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(6).tickSize(-(width-margin.left-margin.right)).tickFormat(""));
    
    content.append("g").attr("class", "axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(6));
    
    const xAxis = content.append("g").attr("class", "axis")
      .attr("transform", `translate(0,${height-margin.bottom})`);
    
    xAxis.selectAll("g.country-x-label").data(displayCountries).join("g")
      .attr("class", "country-x-label")
      .attr("transform", d => `translate(${x(d.country)}, 0)`)
      .each(function(d) {
        const g = d3.select(this);
        const countryInfo = countryEmojis[d.country] || { emoji: "🌍", name: d.country };
        
        g.append("text")
          .attr("y", 22)
          .attr("text-anchor", "middle")
          .attr("fill", "#eef4ff")
          .attr("font-size", 16)
          .text(countryInfo.emoji);
        
        g.append("text")
          .attr("y", 42)
          .attr("text-anchor", "middle")
          .attr("fill", "#9aa8bd")
          .attr("font-size", 9)
          .text(countryInfo.name.length > 10 ? countryInfo.name.slice(0, 10) + "…" : countryInfo.name);
      });
    
    const toggleInstitutionBubbles = (countryData) => {
      svg.selectAll(".institution-bubble-group").remove();
      svg.selectAll(".institution-label").remove();
      
      if (activeCountry === countryData.country) {
        activeCountry = null;
        return;
      }
      
      activeCountry = countryData.country;
      
      const centerX = x(countryData.country);
      const centerY = y(countryData.totalPapers);
      const countryRadius = r(countryData.institutions);
      
      const institutions = countryData.topInstitutions.slice(0, 6);
      const maxPapers = d3.max(institutions, d => num(d.paper_count));
      
      const angleStep = (2 * Math.PI) / institutions.length;
      const offsetRadius = countryRadius + 35;
      
      institutions.forEach((inst, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const instRadius = Math.max(10, Math.sqrt(num(inst.paper_count) / maxPapers) * 22);
        const instX = centerX + Math.cos(angle) * offsetRadius;
        const instY = centerY + Math.sin(angle) * offsetRadius;
        
        const instBubble = svg.append("g")
          .attr("class", "institution-bubble-group")
          .attr("transform", `translate(${instX}, ${instY})`);
        
        instBubble.append("circle")
          .attr("class", "institution-bubble")
          .attr("r", 0)
          .attr("fill", inst.isIndustry ? "#f472b6" : "#60a5fa")
          .attr("opacity", 0.85)
          .attr("stroke", "rgba(255,255,255,0.6)")
          .attr("stroke-width", 2)
          .style("cursor", "pointer")
          .transition()
          .duration(500)
          .delay(i * 100)
          .attr("r", instRadius);
        
        instBubble.append("text")
          .attr("class", "institution-bubble-papers")
          .attr("y", 4)
          .attr("text-anchor", "middle")
          .attr("fill", "#0d1117")
          .attr("font-size", instRadius > 14 ? 11 : instRadius > 10 ? 8 : 6)
          .attr("font-weight", 700)
          .text(num(inst.paper_count))
          .style("opacity", 0)
          .transition()
          .duration(400)
          .delay(i * 100 + 250)
          .style("opacity", 1);
        
        const labelX = instX + (Math.cos(angle) * (instRadius + 12));
        const labelY = instY + (Math.sin(angle) * (instRadius + 12));
        
        svg.append("text")
          .attr("class", "institution-label")
          .attr("x", labelX)
          .attr("y", labelY + 4)
          .attr("text-anchor", "middle")
          .attr("fill", "#e5e7eb")
          .attr("font-size", 11)
          .attr("font-weight", 500)
          .style("opacity", 0)
          .text(shortenInstitution(inst.name))
          .transition()
          .duration(400)
          .delay(i * 100 + 250)
          .style("opacity", 1);
        
        instBubble.select("circle").on("mousemove", function(e) {
          d3.select(this)
            .transition().duration(150)
            .attr("opacity", 1)
            .attr("stroke-width", 3);
          
          showTip(e, `<b>${shortenInstitution(inst.name)}</b><br>
            ${inst.paper_count} papers<br>
            Centrality: ${num(inst.centrality)}<br>
            Type: ${inst.isIndustry ? "Industry" : "Academic"}`);
        })
        .on("mouseleave", function() {
          d3.select(this)
            .transition().duration(150)
            .attr("opacity", 0.85)
            .attr("stroke-width", 2);
          hideTip();
        });
      });
      
      const clickOutsideHandler = function(e) {
        const target = e.target;
        if (!target.closest(".institution-bubble-group") &&
            !target.classList.contains("bubble")) {
          svg.selectAll(".institution-bubble-group").remove();
          svg.selectAll(".institution-label").remove();
          activeCountry = null;
          svg.on("click", null);
        }
      };
      
      svg.on("click", clickOutsideHandler);
    };
    
    const bubbles = content.selectAll("circle.bubble").data(displayCountries).join("circle")
      .attr("class", "bubble")
      .attr("cx", d => x(d.country))
      .attr("cy", d => y(d.totalPapers))
      .attr("r", d => r(d.institutions))
      .attr("fill", d => getCountryColor(d.country))
      .attr("opacity", 0.65)
      .attr("stroke", "rgba(255,255,255,0.4)")
      .attr("stroke-width", 2)
      .style("cursor", "pointer");

    bubbles.transition().duration(500)
      .attr("opacity", 0.65);
    
    bubbles.on("mousemove", function(e, d) {
      d3.select(this)
        .transition().duration(200)
        .attr("opacity", 0.9)
        .attr("stroke-width", 3);
      
      const countryInfo = countryEmojis[d.country] || { emoji: "🌍", name: d.country };
      showTip(e, `<b>${countryInfo.emoji} ${countryInfo.name}</b><br>
        ${d.totalPapers} papers | ${d.institutions} institutions<br>
        ${d.academicCount} academic | ${d.industryCount} industry<br>
        <i>Click to expand institutions</i>`);
    })
    .on("mouseleave", function(e, d) {
      d3.select(this)
        .transition().duration(200)
        .attr("opacity", 0.65)
        .attr("stroke-width", 2);
      hideTip();
    })
    .on("click", function(e, d) {
      e.stopPropagation();
      toggleInstitutionBubbles(d);
    });
    
    content.selectAll("text.bubble-papers").data(displayCountries).join("text")
      .attr("class", "bubble-papers")
      .style("pointer-events", "none")
      .attr("x", d => x(d.country))
      .attr("y", d => y(d.totalPapers) - r(d.institutions) - 8)
      .attr("text-anchor", "middle")
      .attr("fill", "#cdd6e5")
      .attr("font-size", 10)
      .attr("font-weight", 600)
      .text(d => d.totalPapers);
    
    content.selectAll("text.bubble-count").data(displayCountries).join("text")
      .attr("class", "bubble-count")
      .style("pointer-events", "none")
      .attr("x", d => x(d.country))
      .attr("y", d => y(d.totalPapers) + 4)
      .attr("text-anchor", "middle")
      .attr("fill", "#0d1117")
      .attr("font-size", d => r(d.institutions) > 25 ? 14 : r(d.institutions) > 15 ? 11 : 8)
      .attr("font-weight", 700)
      .text(d => d.institutions);
    
    const legend = content.append("g").attr("transform", `translate(${width - margin.right + 20}, ${margin.top})`);
    
    legend.append("text").attr("y", 0).attr("fill", "#cdd6e5").attr("font-size", 11).attr("font-weight", 600).text("Legend");
    legend.append("text").attr("y", 18).attr("fill", "#9aa8bd").attr("font-size", 9).text("Bubble size = # institutions");
    legend.append("text").attr("y", 34).attr("fill", "#9aa8bd").attr("font-size", 9).text("Top number = # papers");
    legend.append("text").attr("y", 50).attr("fill", "#9aa8bd").attr("font-size", 9).text("Click bubble for details");
    
    const sizeLegend = content.append("g").attr("transform", `translate(${width - margin.right + 20}, ${margin.top + 70})`);
    sizeLegend.append("text").attr("y", 0).attr("fill", "#9aa8bd").attr("font-size", 9).text("Size scale:");
    
    const sizes = [5, 15, 30];
    sizes.forEach((s, i) => {
      sizeLegend.append("circle")
        .attr("cx", 8)
        .attr("cy", 20 + i * 22)
        .attr("r", r(s))
        .attr("fill", "#64748b")
        .attr("opacity", 0.5);
      sizeLegend.append("text")
        .attr("x", 20 + r(s))
        .attr("y", 24 + i * 22)
        .attr("fill", "#9aa8bd")
        .attr("font-size", 8)
        .text(`${s} inst`);
    });
  };
  
  updateChart();
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


function renderTimeMachine(papers) {
  const target = d3.select("#time-machine-cases");
  if (target.empty()) return;
  const withLag = papers.filter(d => num(d.recognition_lag) > 0 && d.title);
  const longest = withLag.slice().sort((a,b) => d3.descending(num(a.recognition_lag), num(b.recognition_lag)))[0];
  const highCitationLate = withLag.slice()
    .filter(d => num(d.recognition_lag) >= (d3.median(withLag, x => num(x.recognition_lag)) || 0))
    .sort((a,b) => d3.descending(num(a.citation_count), num(b.citation_count)))[0];
  const highBreadthLate = withLag.slice()
    .filter(d => num(d.recognition_lag) >= (d3.median(withLag, x => num(x.recognition_lag)) || 0))
    .sort((a,b) => d3.descending(num(a.impact_breadth_score), num(b.impact_breadth_score)))[0];
  const typicalLag = withLag.slice()
    .sort((a,b) => d3.ascending(Math.abs(num(a.recognition_lag) - (d3.median(withLag, x => num(x.recognition_lag)) || 0)), Math.abs(num(b.recognition_lag) - (d3.median(withLag, x => num(x.recognition_lag)) || 0))))[0];
  const cases = Array.from(new Map([longest, highCitationLate, highBreadthLate, typicalLag].filter(Boolean).map(d => [d.paper_id, d])).values()).slice(0, 4);
  target.selectAll("article.time-machine-case").data(cases).join("article")
    .attr("class", "time-machine-case")
    .html(d => `
      <div class="time-machine-years">
        <span>${d.year || "Year"}</span>
        <i></i>
        <span>${d.announcement_year || "Award"}</span>
      </div>
      <h3>${escapeHtml(shortTitle(d.title))}</h3>
      <div class="paper-meta">
        <span class="chip">${escapeHtml(d.venue || "Venue")}</span>
        <span class="chip">${escapeHtml(d.manual_topic_label || d.topic_label || "Topic")}</span>
      </div>
      <div class="detail-stats compact-stats">
        <div class="detail-stat"><b>${fmt(num(d.recognition_lag))}y</b><span>recognition lag</span></div>
        <div class="detail-stat"><b>${fmt(num(d.citation_count))}</b><span>citation depth</span></div>
        <div class="detail-stat"><b>${fmt1(num(d.impact_breadth_score))}</b><span>breadth proxy</span></div>
      </div>
      <p>${escapeHtml(timeMachineTakeaway(d))}</p>
      <button type="button" class="small-action" data-time-machine-id="${escapeHtml(d.paper_id)}">Open evidence card</button>
    `);
  target.selectAll("[data-time-machine-id]").on("click", function() {
    const paper = activePapers.find(d => d.paper_id === this.getAttribute("data-time-machine-id"));
    openEvidenceCard(paper);
  });
}

function timeMachineTakeaway(p) {
  const lag = num(p.recognition_lag);
  if (lag >= 25) return "This case is useful for the delayed-recognition story: the visible award signal arrived decades after publication.";
  if (num(p.impact_breadth_score) >= 60) return "This case lets the speaker contrast early publication metadata with later cross-context diffusion evidence.";
  if (num(p.citation_count) >= 2000) return "This case shows why high later citation depth should be read together with the time gap before retrospective recognition.";
  return "This case is a median-lag anchor: it keeps the time story representative rather than only extreme.";
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

  const legendHeight = 120;
  const legendWidth = 14;
  const legendX = width - margin.right + 10;
  const legendY = margin.top + 50;
  const legendGradientId = "venue-decade-legend-gradient";
  const defs = svg.append("defs");
  const gradient = defs.append("linearGradient").attr("id", legendGradientId).attr("x1", "0%").attr("x2", "0%").attr("y1", "100%").attr("y2", "0%");
  const legendScale = d3.scaleLinear().domain(fill.domain()).range([0, legendHeight]);
  const legendAxis = d3.axisRight(legendScale).ticks(5).tickSize(3);
  const nSteps = 10;
  for (let i = 0; i <= nSteps; i++) {
    const offset = (i / nSteps) * 100;
    const value = fill.domain()[0] + (i / nSteps) * (fill.domain()[1] - fill.domain()[0]);
    gradient.append("stop").attr("offset", `${offset}%`).attr("stop-color", fill(value));
  }
  svg.append("rect").attr("x", legendX).attr("y", legendY).attr("width", legendWidth).attr("height", legendHeight)
    .style("fill", `url(#${legendGradientId})`).attr("rx", 2);
  svg.append("g").attr("class", "axis").attr("transform", `translate(${legendX + legendWidth},0)`)
    .call(legendAxis.tickFormat(d3.format("d")).tickSize(2))
    .call(g => g.select(".domain").remove())
    .selectAll("text").attr("font-size", "9px").attr("fill", "#6b7a99");
  svg.append("text").attr("x", legendX + legendWidth / 2).attr("y", legendY + legendHeight + 14)
    .attr("text-anchor", "middle").attr("font-size", "9px").attr("fill", "#6b7a99")
    .text("1");
  svg.append("text").attr("x", legendX + legendWidth / 2).attr("y", legendY - 4)
    .attr("text-anchor", "middle").attr("font-size", "9px").attr("fill", "#6b7a99")
    .text(d3.format("d")(fill.domain()[1]));
}


function renderPaperLineage(papers) {
  const target = d3.select("#paper-lineage");
  if (target.empty()) return;
  const candidates = papers
    .filter(d => d.title && (d.one_sentence_contribution_zh || d.why_time_tested_zh || d.archetype_rationale))
    .sort((a,b) => d3.descending(num(a.display_priority === "presentation-ready" ? 1 : 0), num(b.display_priority === "presentation-ready" ? 1 : 0)) || d3.descending(num(a.citation_count), num(b.citation_count)));
  const seenTopics = new Set();
  const cards = [];
  for (const p of candidates) {
    const topic = p.manual_topic_label || p.topic_label || "Other";
    if (seenTopics.has(topic) && cards.length < 5) continue;
    seenTopics.add(topic);
    cards.push(p);
    if (cards.length >= 6) break;
  }
  target.selectAll("article.lineage-item").data(cards).join("article")
    .attr("class", "lineage-item")
    .html((d, i) => `
      <div class="lineage-index">${String(i + 1).padStart(2, "0")}</div>
      <div class="lineage-path">
        <span>${escapeHtml(d.manual_topic_label || d.topic_label || "Topic")}</span>
        <i></i>
        <span>${escapeHtml(lineageArchetype(d))}</span>
      </div>
      <h3>${escapeHtml(shortTitle(d.title))}</h3>
      <p><b>Reusable contribution</b>${escapeHtml(d.one_sentence_contribution_zh || d.abstract || "Needs evidence check before final contribution wording.")}</p>
      <p><b>Why it lasted</b>${escapeHtml(d.why_time_tested_zh || d.archetype_rationale || "Use this as a case after checking the evidence links.")}</p>
      <div class="lineage-footer">
        <span>${d.year || "Year"} → ${d.announcement_year || "Award"}</span>
        <button type="button" class="small-action" data-lineage-id="${escapeHtml(d.paper_id)}">Evidence</button>
      </div>
    `);
  target.selectAll("[data-lineage-id]").on("click", function() {
    const paper = activePapers.find(d => d.paper_id === this.getAttribute("data-lineage-id"));
    openEvidenceCard(paper);
  });
}

function lineageArchetype(p) {
  const text = `${p.contribution_archetype || ""} ${p.archetype || ""} ${p.archetype_rationale || ""}`.toLowerCase();
  if (text.includes("infrastructure") || text.includes("system")) return "infrastructure backbone";
  if (text.includes("paradigm") || text.includes("foundation")) return "paradigm founder";
  if (text.includes("tool") || text.includes("method")) return "reusable method";
  if (num(p.impact_breadth_score) >= 60) return "wide diffusion";
  if (num(p.recognition_lag) >= 20) return "slow-burn classic";
  return "case evidence";
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
    <span class="item-actions"><button type="button" data-action="compare-a" data-paper-id="${escapeHtml(d.paper_id)}">A</button><button type="button" data-action="compare-b" data-paper-id="${escapeHtml(d.paper_id)}">B</button><button type="button" data-action="evidence" data-paper-id="${escapeHtml(d.paper_id)}">Why?</button></span>
  `);
  items.selectAll(".item-actions button").on("click", (event) => {
    event.stopPropagation();
    const id = event.currentTarget.getAttribute("data-paper-id");
    const action = event.currentTarget.getAttribute("data-action");
    const paper = activePapers.find(d => d.paper_id === id);
    if (!paper) return;
    if (action === "compare-a") setComparePaper("a", paper);
    if (action === "compare-b") setComparePaper("b", paper);
    if (action === "evidence") openEvidenceCard(paper);
  });
}

function formatExplorerMetric(d, key) {
  if (key === "impact_breadth_score") return fmt1(num(d[key]));
  if (key === "recognition_lag") return `${fmt(num(d[key]))}y`;
  return fmt(num(d[key]));
}


function renderComparePanel(papers) {
  const controls = d3.select("#compare-controls");
  if (controls.empty()) return;
  const sorted = papers.slice().filter(d => d.title).sort((a,b) => d3.descending(num(a.citation_count), num(b.citation_count)));
  const highDepthBreadth = sorted.slice().filter(d => num(d.citation_count) && num(d.impact_breadth_score))
    .sort((a,b) => d3.descending(num(a.citation_count) * num(a.impact_breadth_score), num(b.citation_count) * num(b.impact_breadth_score)))[0];
  const citationQ = d3.quantile(sorted.map(d => num(d.citation_count)).filter(Boolean).sort(d3.ascending), 0.75) || 0;
  const breadthMed = d3.median(sorted, d => num(d.impact_breadth_score)) || 0;
  const mismatch = sorted.slice()
    .filter(d => num(d.citation_count) >= citationQ && num(d.impact_breadth_score) <= breadthMed)
    .sort((a,b) => d3.descending(num(a.citation_count), num(b.citation_count)))[0]
    || sorted.find(d => d.paper_id !== highDepthBreadth?.paper_id);
  compareSelection = {a: highDepthBreadth || sorted[0], b: mismatch || sorted[1] || sorted[0]};

  const options = sorted.slice(0, 80).map(d => `<option value="${escapeHtml(d.paper_id)}">${escapeHtml(shortTitle(d.title))} · ${escapeHtml(d.venue || "")}</option>`).join("");
  controls.html(`
    <label>Main case <select id="compare-a-select">${options}</select></label>
    <label>Contrast case <select id="compare-b-select">${options}</select></label>
    <button id="compare-open-a" type="button" class="small-action">Why A?</button>
    <button id="compare-open-b" type="button" class="small-action">Why B?</button>
  `);
  d3.select("#compare-a-select").property("value", compareSelection.a?.paper_id).on("change", function() { setComparePaper("a", sorted.find(d => d.paper_id === this.value)); });
  d3.select("#compare-b-select").property("value", compareSelection.b?.paper_id).on("change", function() { setComparePaper("b", sorted.find(d => d.paper_id === this.value)); });
  d3.select("#compare-open-a").on("click", () => openEvidenceCard(compareSelection.a));
  d3.select("#compare-open-b").on("click", () => openEvidenceCard(compareSelection.b));
  updateComparePanel();
}

function setComparePaper(slot, paper) {
  if (!paper) return;
  compareSelection[slot] = paper;
  d3.select(`#compare-${slot}-select`).property("value", paper.paper_id);
  updateComparePanel();
}

function updateComparePanel() {
  const target = d3.select("#case-compare-panel");
  if (target.empty()) return;
  const a = compareSelection.a;
  const b = compareSelection.b;
  if (!a || !b) {
    target.html(`<p class="reading-note mini-note">Select two papers to compare.</p>`);
    return;
  }
  const citDiff = num(a.citation_count) - num(b.citation_count);
  const breadthDiff = num(a.impact_breadth_score) - num(b.impact_breadth_score);
  const note = Math.abs(citDiff) < 1000 && Math.abs(breadthDiff) > 5
    ? "两篇论文 citation depth 接近，但 sampled breadth 有明显差异，适合说明 breadth 不是 citation count 的简单替代。"
    : "这组对比把 citation depth、sampled impact breadth 和 recognition lag 分开读，避免把单一引用数写成长期影响的完整解释。";
  target.html(`
    ${compareCaseHtml(a, "Main case")}
    <div class="compare-note">
      <div class="compare-symbol">↔</div>
      <p>${escapeHtml(note)}</p>
      <span>Proxy wording: impact breadth = OpenAlex sampled diffusion signal, not official award reason.</span>
    </div>
    ${compareCaseHtml(b, "Contrast case")}
  `);
  target.selectAll("[data-compare-evidence]").on("click", function() {
    const id = this.getAttribute("data-compare-evidence");
    openEvidenceCard(activePapers.find(d => d.paper_id === id));
  });
}

function compareCaseHtml(p, label) {
  return `<article class="compare-case">
    <div class="claim-type">${escapeHtml(label)}</div>
    <h3>${escapeHtml(shortTitle(p.title))}</h3>
    <div class="paper-meta">
      <span class="chip">${escapeHtml(p.venue || "Venue")}</span>
      <span class="chip">${p.year || "Year"} → ${p.announcement_year || "Award"}</span>
      <span class="chip">${escapeHtml(p.manual_topic_label || p.topic_label || "Topic")}</span>
    </div>
    <div class="detail-stats compact-stats">
      <div class="detail-stat"><b>${fmt(num(p.citation_count))}</b><span>citation depth</span></div>
      <div class="detail-stat"><b>${fmt1(num(p.impact_breadth_score))}</b><span>breadth proxy</span></div>
      <div class="detail-stat"><b>${fmt(num(p.recognition_lag))}y</b><span>recognition lag</span></div>
      <div class="detail-stat"><b>${escapeHtml(p.display_priority || p.evidence_checked || "check")}</b><span>evidence status</span></div>
    </div>
    <p class="abstract">${escapeHtml(p.one_sentence_contribution_zh || p.why_time_tested_zh || "Use evidence card / paper page before writing a paper-specific contribution claim.")}</p>
    <button type="button" class="small-action" data-compare-evidence="${escapeHtml(p.paper_id)}">Why this paper lasted?</button>
  </article>`;
}

function evidenceLinks(p) {
  return [p.evidence_url_1, p.evidence_url_2, p.paper_url, p.pdf_url, p.doi ? `https://doi.org/${p.doi}` : "", p.source_url]
    .filter(Boolean)
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .slice(0, 4);
}

function openEvidenceCard(p) {
  if (!p) return;
  const modal = document.getElementById("evidence-modal");
  const content = document.getElementById("evidence-modal-content");
  if (!modal || !content) return;
  const links = evidenceLinks(p);
  content.innerHTML = `
    <p class="section-kicker">Why this paper lasted?</p>
    <h2 id="evidence-modal-title">${escapeHtml(shortTitle(p.title))}</h2>
    <div class="paper-meta">
      <span class="chip">${escapeHtml(p.venue || "Venue")}</span>
      <span class="chip">${p.year || "Year"} → ${p.announcement_year || "Award"}</span>
      <span class="chip">${escapeHtml(p.manual_topic_label || p.topic_label || "Topic")}</span>
      <span class="chip">${escapeHtml(p.display_priority || p.evidence_checked || "needs check")}</span>
    </div>
    <div class="detail-stats">
      <div class="detail-stat"><b>${fmt(num(p.citation_count))}</b><span>citation depth</span></div>
      <div class="detail-stat"><b>${fmt1(num(p.impact_breadth_score))}</b><span>impact breadth proxy</span></div>
      <div class="detail-stat"><b>${fmt(num(p.recognition_lag))}y</b><span>recognition lag</span></div>
      <div class="detail-stat"><b>${fmt(num(p.citing_field_count || p.country_count))}</b><span>visible breadth fields/countries</span></div>
    </div>
    <div class="evidence-section"><b>Contribution</b><p>${escapeHtml(p.one_sentence_contribution_zh || p.abstract || "Needs check before final contribution wording.")}</p></div>
    <div class="evidence-section"><b>Why it lasted</b><p>${escapeHtml(p.why_time_tested_zh || p.archetype_rationale || "Use as a descriptive case after reading evidence links.")}</p></div>
    <div class="evidence-links"><b>Evidence links</b>${links.length ? links.map((url, i) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">Evidence ${i + 1}</a>`).join("") : `<span>needs check</span>`}</div>
    <p class="reading-note mini-note">Safe wording: 该案例用于说明数据中的长期影响线索，不直接等同于官方评奖原因；breadth 仍是 OpenAlex sampled proxy。</p>
  `;
  modal.hidden = false;
}

function closeEvidenceModal() {
  const modal = document.getElementById("evidence-modal");
  if (modal) modal.hidden = true;
}

document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeEvidenceModal));

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
  renderImpactSignature(metrics, p, activePapers);
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


function renderImpactSignature(metrics, p, papers) {
  const target = d3.select("#impact-signature");
  if (target.empty()) return;
  const dimensions = impactSignatureDimensions(metrics, p, papers);
  const avg = d3.mean(dimensions, d => d.value) || 0;
  const headline = signatureHeadline(dimensions, avg);
  const strongest = dimensions.slice().sort((a,b) => d3.descending(a.value, b.value))[0];
  const weakest = dimensions.slice().sort((a,b) => d3.ascending(a.value, b.value))[0];
  target.html(`
    <div class="signature-summary">
      <div>
        <p class="section-kicker">Selected paper profile</p>
        <h3>${escapeHtml(shortTitle(p.title))}</h3>
        <div class="paper-meta">
          <span class="chip">${escapeHtml(p.venue || "Venue")}</span>
          <span class="chip">${p.year || "Year"} → ${p.announcement_year || "Award"}</span>
          <span class="chip">${escapeHtml(p.manual_topic_label || p.topic_label || "Topic")}</span>
        </div>
      </div>
      <div class="signature-score-card">
        <b>${fmt1(avg)}</b>
        <span>mean signature percentile</span>
      </div>
    </div>
    <div class="signature-body">
      <div class="signature-bars">
        ${dimensions.map(d => `
          <div class="signature-row">
            <div class="signature-row-head"><b>${escapeHtml(d.label)}</b><span>${fmt1(d.value)}%</span></div>
            <div class="signature-track"><i style="width:${Math.max(4, Math.min(100, d.value))}%"></i></div>
            <p>${escapeHtml(d.note)}</p>
          </div>
        `).join("")}
      </div>
      <div class="signature-interpretation">
        <div class="archetype-badge">${escapeHtml(headline.title)}</div>
        <p class="abstract">${escapeHtml(headline.body)}</p>
        <div class="detail-stats compact-stats">
          <div class="detail-stat"><b>${escapeHtml(strongest.label)}</b><span>strongest signal · ${fmt1(strongest.value)}%</span></div>
          <div class="detail-stat"><b>${escapeHtml(weakest.label)}</b><span>weakest signal · ${fmt1(weakest.value)}%</span></div>
        </div>
        <p class="reading-note mini-note">Safe wording: this is a descriptive impact profile inside the current Test-of-Time sample. It should not be presented as a model that predicts future Best Paper or award outcomes.</p>
      </div>
    </div>
  `);
}

function impactSignatureDimensions(metrics, p, papers) {
  const byKey = Object.fromEntries(metrics.map(m => [m.key, m]));
  const topic = p.manual_topic_label || p.topic_label || "Other";
  const topicCount = papers.filter(d => (d.manual_topic_label || d.topic_label || "Other") === topic).length;
  const venueCount = papers.filter(d => (d.venue || "") === (p.venue || "")).length;
  const networkValue = Math.max(num(p.country_count || p.citing_country_count), num(p.institution_count));
  return [
    {
      label: "Citation depth",
      value: byKey.citation_count?.percentile || 0,
      note: "How large the citation signal is relative to the current dataset."
    },
    {
      label: "Impact breadth",
      value: byKey.impact_breadth_score?.percentile || 0,
      note: "OpenAlex sampled diffusion signal across fields, institutions, countries, and years."
    },
    {
      label: "Recognition lag",
      value: byKey.recognition_lag?.percentile || 0,
      note: "How strongly this case fits the delayed-recognition Test-of-Time story."
    },
    {
      label: "Topic generality",
      value: percentileRank(papers.map(d => papers.filter(x => (x.manual_topic_label || x.topic_label || "Other") === (d.manual_topic_label || d.topic_label || "Other")).length), topicCount),
      note: "Whether the paper sits inside a broad recurring technical lineage in this sample."
    },
    {
      label: "Venue memory",
      value: percentileRank(papers.map(d => papers.filter(x => (x.venue || "") === (d.venue || "")).length), venueCount),
      note: "How visible the venue is in the award records collected here; not a venue quality ranking."
    },
    {
      label: "Network spread",
      value: percentileRank(papers.map(d => Math.max(num(d.country_count || d.citing_country_count), num(d.institution_count))), networkValue),
      note: "Visible author/citing metadata spread; useful as context, not complete collaboration evidence."
    }
  ];
}

function signatureHeadline(dimensions, avg) {
  const get = label => dimensions.find(d => d.label === label)?.value || 0;
  const citation = get("Citation depth");
  const breadth = get("Impact breadth");
  const lag = get("Recognition lag");
  const topic = get("Topic generality");
  const venue = get("Venue memory");
  if (citation >= 75 && breadth >= 75) return {title: "Deep + broad classic", body: "This case is strong on both citation depth and diffusion breadth, so it can anchor the claim that long-term impact is more than one number."};
  if (lag >= 75 && citation >= 60) return {title: "Slow-burn classic", body: "This paper fits the delayed-recognition story: its award signal arrived late, while citation evidence still shows sustained uptake."};
  if (topic >= 75 && venue >= 65) return {title: "Community backbone", body: "This paper sits in a recurring topic and visible award community, making it useful for explaining how fields remember foundational work."};
  if (breadth >= 75 && avg >= 60) return {title: "Wide-diffusion method", body: "Breadth is the strongest signal here, so the safer story is cross-context reuse rather than raw citation dominance."};
  return {title: "Contextual evidence case", body: "This paper should be interpreted through the combination of topic, venue, timing, and evidence-card wording rather than a single extreme metric."};
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
  const {papers, venues, areas, topics, timeline = [], institutions, countries} = data;
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
      claim("Finding", `${topVenue?.venue || "Top venue"} 是记录数最多的 venue，${topArea?.venue_area || "top field"} 是记录中最大的领域聚集点。`, "Evidence", `${fmt(num(topVenue?.paper_count))} venue papers; ${fmt(num(topArea?.paper_count))} field papers`, "Boundary", "数据集中度高，呈现长尾分布，Test of Time Award 记录与具体会议是否设奖、何时设奖、公开记录是否完整高度相关，并不是会议绝对质量或学科重要性的线性排名。"),
      claim("Pattern", `${concentratedAreas} 个领域高于或接近领域中位数，说明长期影响记录呈多社区分布而非单一垄断，不同年代长期影响社区分布呈现不同的特征。`, "Evidence", "Field map + decade heatmap", "Interpretation", "由Field x decade heatmap看出，不同年代有不同的聚集特征，对应了不同技术范式与研究重点的演变。应强调学术社区结构和时间覆盖，而不是只比较总量。")
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
  document.body.dataset.selectedPaper = p.paper_id || "";
  d3.selectAll(".selected-paper").classed("selected-paper", false);
  d3.selectAll("circle").filter(d => d && d.paper_id === p.paper_id).classed("selected-paper", true);
  d3.selectAll(`[data-paper-id="${cssEscape(p.paper_id)}"], [data-time-machine-id="${cssEscape(p.paper_id)}"], [data-lineage-id="${cssEscape(p.paper_id)}"], [data-global-paper-id="${cssEscape(p.paper_id)}"]`).classed("selected-paper", true);
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
    <div class="detail-actions">
      <button type="button" data-detail-action="evidence">Why this paper lasted?</button>
      <button type="button" data-detail-action="compare-a">Compare A</button>
      <button type="button" data-detail-action="compare-b">Compare B</button>
    </div>
  `);
  d3.selectAll("#paper-detail [data-detail-action]").on("click", function() {
    const action = this.getAttribute("data-detail-action");
    if (action === "evidence") openEvidenceCard(p);
    if (action === "compare-a") setComparePaper("a", p);
    if (action === "compare-b") setComparePaper("b", p);
  });
  updateBenchmark(p);
  updateEvidenceThread(p);
}

function updateEvidenceThread(p) {
  const target = d3.select("#selected-evidence-thread");
  if (target.empty() || !p) return;
  const countries = parseListField(p.countries);
  const institutions = parseListField(p.institutions);
  const metrics = benchmarkMetrics(p, activePapers);
  const bestMetric = metrics.slice().sort((a,b) => d3.descending(a.percentile, b.percentile))[0];
  const topicPeers = activePapers
    .filter(d => d.paper_id !== p.paper_id && d.topic_label === p.topic_label)
    .sort((a,b) => d3.descending(num(a.citation_count), num(b.citation_count)))
    .slice(0, 3);
  const route = [
    {label: "Time", value: `${fmt(num(p.recognition_lag))} year lag`, note: "delayed retrospective recognition"},
    {label: "Topic", value: p.topic_label || "Topic", note: `same-topic peers: ${topicPeers.length || "needs review"}`},
    {label: "Citation", value: `${fmt(num(p.citation_count))} citations`, note: "depth signal, not sole value"},
    {label: "Signature", value: bestMetric ? `${bestMetric.label} p${fmt1(bestMetric.percentile)}` : "profile", note: "descriptive corpus profile"},
    {label: "Network", value: countries.slice(0, 3).join(" / ") || "metadata pending", note: `${institutions.length || 0} visible institution tags`}
  ];
  target.html(`
    <div class="thread-hero-card">
      <span class="thread-label">Selected paper</span>
      <h3>${escapeHtml(p.title || "Untitled")}</h3>
      <p>${escapeHtml(p.venue || "Venue")} · ${p.year || "year"} → ${p.announcement_year || "award"} · ${escapeHtml(p.topic_label || "topic")}</p>
      <div class="thread-actions">
        <button type="button" data-thread-action="evidence">Open evidence card</button>
        <button type="button" data-thread-action="benchmark">Jump to Benchmark</button>
      </div>
    </div>
    <div class="thread-route">
      ${route.map((d,i) => `
        <article>
          <span>0${i + 1} · ${escapeHtml(d.label)}</span>
          <b>${escapeHtml(d.value)}</b>
          <p>${escapeHtml(d.note)}</p>
        </article>
      `).join("")}
    </div>
    <div class="thread-script">
      <b>30-second demo script</b>
      <span>这篇论文先在 Time 维度展示 delayed recognition，再在 Topic 维度进入同类贡献路径；Citation 和 Signature 解释它的影响形态，Network 只作为 affiliation metadata 的可见扩散线索。</span>
    </div>
  `);
  target.select('[data-thread-action="evidence"]').on("click", () => openEvidenceCard(p));
  target.select('[data-thread-action="benchmark"]').on("click", () => document.getElementById("benchmark")?.scrollIntoView({behavior: "smooth", block: "start"}));
}

function cssEscape(value) {
  if (window.CSS?.escape) return CSS.escape(String(value || ""));
  return String(value || "").replace(/[^a-zA-Z0-9_-]/g, "\$&");
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

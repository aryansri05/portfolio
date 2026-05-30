const ARYAN_DATA_FALLBACK = {
  name: "Aryan Srivastava",
  title: "Computer Science Student | GPU Systems & AI Infrastructure Developer | Open Source Contributor",
  location: "Bengaluru, India",
  email: "aryansriva05@gmail.com",
  github: "https://github.com/aryansri05",
  linkedin: "https://www.linkedin.com/in/aryan-srivastava-821782333/",
  benchmarkRepo: "https://github.com/aryansri05/indicservebench",
  education: {
    school: "Manipal Institute of Technology, Bengaluru",
    degree: "B.Tech in Computer Science and Engineering",
    expectedGraduation: "January 2028"
  },
  summary:
    "Aryan is a second-year Computer Science student at Manipal Institute of Technology, Bengaluru, building CUDA-adjacent GPU systems, GPU dataframe internals, LLM inference benchmarks, backend infrastructure, and production-grade open-source software.",
  openSource: [
    {
      organization: "NVIDIA RAPIDS",
      project: "cuDF",
      status: "Merged",
      items: [
        "PR #20747: Boolean Casting Consistency Fix; fixed behavioral inconsistency between cuDF and Pandas, modified Python/C++ interop logic, and added regression tests.",
        "PR #20862: Hybrid Scan API; added a libcudf C++ API for all-true row masks with memory-safe null handling and unit tests."
      ]
    },
    {
      organization: "Polars",
      project: "High-Performance DataFrame Library",
      status: "Merged",
      url: "https://github.com/pola-rs/polars/pull/27669#event-25757194234",
      items: [
        "PR #27669: FixedRingBuffer Allocation Provenance; fixed a Rust allocation-provenance soundness issue in polars-utils by preserving the original Vec allocation for memory-safe deallocation."
      ]
    }
  ],
  projects: [
    {
      name: "MAHE Mobility Challenge 2026",
      status: "1st Place, AI Track",
      role: "Backend Architect",
      summary:
        "Built an intelligent notification management pipeline for connected vehicles with Phi-3 edge alert classification, Node.js/WebSocket priority triage, a network heatmap, and AI-generated recovery summaries."
    },
    {
      name: "LLM Inference Benchmarking | Sarvam 30B FP8",
      status: "Benchmarking project",
      url: "https://github.com/aryansri05/indicservebench",
      summary:
        "Benchmarked Sarvam 30B FP8 on H100 SXM using 240 measured inference requests across English, Hindi, Tamil, and Hinglish/code-mixed prompts. Tracked tokenization behavior, mean latency, P90/P95 latency, and throughput to analyze serving performance and deployment tradeoffs. Additional T4 and Apple M2 baselines are being expanded."
    },
    {
      name: "Paper Trading Platform",
      status: "Full-stack project",
      summary:
        "An options trading simulator with calls, puts, portfolio tracking, React, Node.js/Express, PostgreSQL, JWT auth, and real-time market data."
    }
  ],
  skills: {
    languages: ["Python", "C++", "JavaScript", "SQL", "Bash"],
    aiMl: ["LangGraph", "FastMCP", "ChromaDB", "Ollama", "Llama 3", "RAG", "LLM agents"],
    hpcGpu: ["CUDA", "cuDF", "RAPIDS AI", "LLM inference benchmarking", "Apple Silicon unified memory", "SLURM"],
    frameworks: ["React.js", "Node.js", "Express", "Pandas", "NumPy", "Pytest"],
    tools: ["Git", "GitHub Actions", "Docker", "CI/CD", "PostgreSQL", "GraphQL", "VS Code"]
  },
  achievements: [
    "1st Place, MAHE Mobility Challenge 2026, AI Track",
    "5 total merged open-source PRs",
    "Merged Rust memory-safety fix in Polars",
    "Experience navigating large C++/Python production codebases"
  ],
  interests:
    "Aryan is interested in internships and collaborative work across CUDA-adjacent GPU systems, LLM inference performance, backend infrastructure, HPC, and production-grade open source."
};

const UNKNOWN_RESPONSE = "I don’t have that information yet.";

let aryanData = ARYAN_DATA_FALLBACK;

const normalize = (value) =>
  value
    .toLowerCase()
    .replace(/[^\w\s+#.]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getTokens = (text) => new Set(text.split(" ").filter(Boolean));

const hasAny = (text, words) => {
  const tokens = getTokens(text);

  return words.some((word) => {
    const normalizedWord = normalize(word);

    if (!normalizedWord) return false;
    if (normalizedWord.includes(" ")) return text.includes(normalizedWord);
    if (normalizedWord.length <= 3) return tokens.has(normalizedWord);

    return text.includes(normalizedWord);
  });
};

const joinList = (items) => items.filter(Boolean).join(", ");

const compactProjectList = (projects) =>
  projects.map((project) => `${project.name}: ${project.summary}`).join(" ");

const compactOpenSource = (items) =>
  items
    .map((entry) => {
      const details = entry.items.join(" ");
      return `${entry.organization} ${entry.project}: ${details}`;
    })
    .join(" ");

function answerQuestion(question) {
  const q = normalize(question);

  if (!q) return UNKNOWN_RESPONSE;

  if (hasAny(q, ["phone", "mobile", "number", "call", "whatsapp"])) {
    return UNKNOWN_RESPONSE;
  }

  if (hasAny(q, ["hello", "hi", "hey"])) {
    return "Hi, I can answer questions about Aryan's projects, skills, education, open-source work, and contact links.";
  }

  if (hasAny(q, ["thanks", "thank", "ty", "tysm"])) {
    return "You're welcome.";
  }

  if (hasAny(q, ["ok", "okay", "cool", "great"])) {
    return "Got it.";
  }

  if (hasAny(q, ["who", "about", "profile", "intro", "summary", "aryan srivastava"])) {
    return aryanData.summary;
  }

  if (hasAny(q, ["contact", "email", "reach", "linkedin", "github"])) {
    return `Email: ${aryanData.email}. GitHub: ${aryanData.github}. LinkedIn: ${aryanData.linkedin}.`;
  }

  if (hasAny(q, ["education", "college", "university", "degree", "graduate", "graduation", "mit"])) {
    const education = aryanData.education;
    return `${education.school}; ${education.degree}; expected graduation ${education.expectedGraduation}.`;
  }

  if (hasAny(q, ["skill", "stack", "technology", "technologies", "language", "tools"])) {
    const skills = aryanData.skills;
    return `Main skills: ${joinList(skills.languages)}; AI/ML: ${joinList(skills.aiMl)}; GPU/HPC: ${joinList(skills.hpcGpu)}; backend/tools: ${joinList([...skills.frameworks, ...skills.tools])}.`;
  }

  if (hasAny(q, ["limitation", "limitations", "caveat", "caveats", "not measured", "missing"])) {
    return "Limitations: the H100 run is a preliminary single-H100 SGLang pilot, T4 uses median/P95 aggregate data rather than raw per-request mean latency, and Apple M2 values are placeholders until exported results are added.";
  }

  if (hasAny(q, ["input token", "output token", "tokens matter", "token budget"])) {
    return "Input tokens affect prefill work and memory pressure; output tokens affect decode time and throughput. For Indian-language prompts, tokenizer expansion can change latency and cost, so Aryan tracked token counts alongside mean and P95 latency.";
  }

  if (hasAny(q, ["ai infra team", "infra team", "help team", "fit for ai infra", "ai infrastructure team"])) {
    return "Aryan can help an AI infra team by designing reproducible inference benchmarks, analyzing tail latency and tokenization behavior, comparing hardware tradeoffs, and turning results into clear engineering decisions.";
  }

  if (hasAny(q, ["benchmark", "sarvam", "inference", "h100", "t4", "m2", "indicservebench", "latency", "throughput", "tokenizer", "measure", "measured", "metrics"])) {
    if (hasAny(q, ["language", "hindi", "tamil", "english", "hinglish", "codemix", "code mixed", "p95"])) {
      return "Language summary: H100 has measured mean/P95 total latency for English, Hindi, Tamil, and Hinglish across 240 requests. T4 has Hindi, Tamil, and code-mixed median/P95 aggregates. M2 is shown as a placeholder until exported language results are added.";
    }

    if (hasAny(q, ["explain", "what is this", "overview"])) {
      return "This benchmark evaluates Sarvam 30B FP8 inference on H100 SXM using 240 measured requests across English, Hindi, Tamil, and Hinglish/code-mixed prompts. It tracks tokenization, mean latency, P90/P95 latency, and throughput to understand serving tradeoffs.";
    }

    if (hasAny(q, ["what did", "measure", "measured", "metrics"])) {
      return "Aryan measured formatted input tokens, output tokens, mean latency, P90/P95 latency, throughput, TTFT, tokenizer behavior, and hardware deployment tradeoffs.";
    }

    if (hasAny(q, ["repo", "github", "code", "indicservebench"])) {
      return `Aryan's benchmark repo is indicservebench: ${aryanData.benchmarkRepo}.`;
    }

    if (hasAny(q, ["why", "faster", "compare", "comparison", "hardware"])) {
      return "H100 SXM is the strongest serving target because it has far more memory bandwidth, compute headroom, and FP8-oriented data-center capability than T4 or Apple M2. T4 is budget-constrained; M2 is useful as a local baseline.";
    }

    return "Aryan benchmarked Sarvam 30B FP8 on H100 SXM using 240 measured inference requests across English, Hindi, Tamil, and Hinglish/code-mixed prompts. He tracked tokenization behavior, mean latency, P90/P95 latency, and throughput; T4 and Apple M2 baselines are being expanded. Repo: https://github.com/aryansri05/indicservebench.";
  }

  if (hasAny(q, ["nvidia", "rapids", "cudf", "polars", "open source", "opensource", "contribution", "pr", "pull request"])) {
    return compactOpenSource(aryanData.openSource);
  }

  if (hasAny(q, ["system", "systems", "like", "interests", "focus", "domain"])) {
    return "Aryan likes building CUDA-adjacent GPU systems, GPU dataframe internals, LLM inference benchmarks, backend infrastructure, and high-performance open-source software.";
  }

  if (hasAny(q, ["project", "built", "build", "portfolio", "mobility", "trading", "benchmark", "sarvam", "inference", "h100", "t4"])) {
    return compactProjectList(aryanData.projects);
  }

  if (hasAny(q, ["achievement", "award", "won", "winner", "place", "mahe"])) {
    return aryanData.achievements.join("; ") + ".";
  }

  if (hasAny(q, ["internship", "intern", "opportunity", "hiring", "available", "interested"])) {
    return aryanData.interests;
  }

  return UNKNOWN_RESPONSE;
}

function appendMessage(container, message, type) {
  const node = document.createElement("div");
  node.className = `message message-${type}`;
  node.textContent = message;
  container.append(node);
  container.scrollTop = container.scrollHeight;
}

async function loadKnowledgeBase() {
  try {
    const response = await fetch("aryan-data.json", { cache: "no-store" });
    if (response.ok) {
      aryanData = await response.json();
    }
  } catch {
    aryanData = ARYAN_DATA_FALLBACK;
  }
}

function initReveal() {
  const revealNodes = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealNodes.forEach((node) => observer.observe(node));
}

function initHeader() {
  const header = document.querySelector("[data-header]");
  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

function initChat() {
  const widget = document.querySelector("[data-chat-widget]");
  const openButtons = document.querySelectorAll("[data-open-chat], [data-chat-toggle]");
  const closeButton = document.querySelector("[data-close-chat]");
  const form = document.querySelector("[data-chat-form]");
  const input = document.querySelector("[data-chat-input]");
  const messages = document.querySelector("[data-chat-messages]");
  const chips = document.querySelectorAll("[data-question]");

  const openChat = () => {
    widget.classList.add("is-open");
    widget.setAttribute("aria-hidden", "false");
    window.setTimeout(() => input.focus(), 80);
  };

  const closeChat = () => {
    widget.classList.remove("is-open");
    widget.setAttribute("aria-hidden", "true");
  };

  const submitQuestion = (question) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    appendMessage(messages, trimmed, "user");
    appendMessage(messages, answerQuestion(trimmed), "bot");
  };

  openButtons.forEach((button) => button.addEventListener("click", openChat));
  closeButton?.addEventListener("click", closeChat);

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    submitQuestion(input.value);
    input.value = "";
  });

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      openChat();
      submitQuestion(chip.dataset.question || "");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && widget.classList.contains("is-open")) {
      closeChat();
    }
  });
}

function formatMs(value) {
  return `${Math.round(value).toLocaleString()} ms`;
}

function formatTps(value) {
  return value.toFixed(1);
}

function formatUsd(value) {
  if (value >= 100) return `$${Math.round(value).toLocaleString()}`;
  return `$${value.toFixed(2)}`;
}

function calculateBenchmark(hardware, inputTokens, outputTokens) {
  const measured = hardware.measured;
  const inputDelta = inputTokens - measured.inputTokens;
  const outputDelta = outputTokens - measured.outputTokens;
  const outputLatencyDelta = (outputDelta / measured.tokensPerSecond) * 1000;
  const inputLatencyDelta = inputDelta * hardware.inputPenaltyMs;
  const meanLatencyMs = Math.max(80, measured.meanLatencyMs + inputLatencyDelta + outputLatencyDelta);
  const p90Ratio = measured.p90LatencyMs / measured.meanLatencyMs;
  const p95Ratio = measured.p95LatencyMs / measured.meanLatencyMs;
  const tokensPerSecond = Math.max(1, measured.tokensPerSecond * (1 - Math.max(0, outputTokens - measured.outputTokens) * 0.0008));
  const costPerMillion = (hardware.cost.hourlyUsd / (tokensPerSecond * 3600)) * 1_000_000;

  return {
    inputTokens,
    outputTokens,
    meanLatencyMs,
    p90LatencyMs: meanLatencyMs * p90Ratio,
    p95LatencyMs: meanLatencyMs * p95Ratio,
    tokensPerSecond,
    costPerMillion,
    requestCount: measured.requestCount
  };
}

function renderBarChart(container, rows, formatter = (value) => value.toString()) {
  const max = Math.max(...rows.map((row) => row.value), 1);
  container.innerHTML = rows
    .map((row) => {
      const width = Math.max(4, (row.value / max) * 100);
      return `
        <div class="bar-row">
          <span class="bar-label">${row.label}</span>
          <span class="bar-track"><span class="bar-fill" style="width:${width}%"></span></span>
          <span class="bar-value">${formatter(row.value)}</span>
        </div>
      `;
    })
    .join("");
}

function renderLineChart(container, hardware, inputTokens) {
  const points = [16, 32, 64, 96, 128, 160].map((outputTokens) => ({
    outputTokens,
    latency: calculateBenchmark(hardware, inputTokens, outputTokens).meanLatencyMs
  }));
  const width = 520;
  const height = 188;
  const pad = 28;
  const maxLatency = Math.max(...points.map((point) => point.latency));
  const minLatency = Math.min(...points.map((point) => point.latency));
  const range = Math.max(1, maxLatency - minLatency);
  const xFor = (value) => pad + ((value - 16) / (160 - 16)) * (width - pad * 2);
  const yFor = (value) => height - pad - ((value - minLatency) / range) * (height - pad * 2);
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"}${xFor(point.outputTokens).toFixed(1)} ${yFor(point.latency).toFixed(1)}`).join(" ");
  const circles = points
    .map((point) => `<circle cx="${xFor(point.outputTokens).toFixed(1)}" cy="${yFor(point.latency).toFixed(1)}" r="4" />`)
    .join("");

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Latency vs output tokens">
      <path d="M${pad} ${height - pad}H${width - pad}" stroke="#dfe4eb" />
      <path d="M${pad} ${pad}V${height - pad}" stroke="#dfe4eb" />
      <path d="${path}" fill="none" stroke="#214f91" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <g fill="#ffffff" stroke="#214f91" stroke-width="2">${circles}</g>
      <text x="${pad}" y="${height - 5}" fill="#5e6876" font-size="12">16 output tokens</text>
      <text x="${width - 130}" y="${height - 5}" fill="#5e6876" font-size="12">160 output tokens</text>
      <text x="${pad}" y="16" fill="#5e6876" font-size="12">${Math.round(maxLatency).toLocaleString()} ms</text>
    </svg>
  `;
}

function renderLanguageLatency(container, noteNode, languageLatency) {
  if (!container || !languageLatency) return;

  const hardwareColumns = [
    { id: "h100", label: "H100 SXM" },
    { id: "t4", label: "NVIDIA T4" },
    { id: "m2", label: "Apple M2" }
  ];
  const renderCell = (entry, hardwareLabel) => {
    if (!entry) {
      return `<td data-hardware="${hardwareLabel}"><div class="language-empty">No run yet</div></td>`;
    }

    const centralLabel = entry.centralLabel === "median" ? "Median proxy" : "Mean latency";

    return `
      <td data-hardware="${hardwareLabel}">
        <div class="language-metric-cell">
          <div>
            <span>${centralLabel}</span>
            <strong>${formatMs(entry.meanLatencyMs)}</strong>
          </div>
          <div>
            <span>P95 latency</span>
            <strong>${formatMs(entry.p95LatencyMs)}</strong>
          </div>
          <em>${entry.n} req · ${entry.quality}</em>
        </div>
      </td>
    `;
  };

  container.innerHTML = `
    <table class="language-table">
      <thead>
        <tr>
          <th>Language</th>
          ${hardwareColumns.map((column) => `<th>${column.label}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${languageLatency.languages
          .map(
            (language) => `
              <tr>
                <th scope="row">${language.label}</th>
                ${hardwareColumns.map((column) => renderCell(language[column.id], column.label)).join("")}
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;

  if (noteNode) noteNode.textContent = languageLatency.note;
}

function initInferenceLab() {
  const data = window.BENCHMARK_DATA;
  const lab = document.querySelector("[data-inference-lab]");
  if (!data || !lab) return;

  const state = {
    hardwareId: data.hardware[0].id,
    profileId: "measured",
    inputTokens: data.profiles.find((profile) => profile.id === "measured").inputTokens,
    outputTokens: data.profiles.find((profile) => profile.id === "measured").outputTokens,
    replayIndex: 0,
    replayTimer: null
  };

  const hardwareOptions = document.querySelector("[data-hardware-options]");
  const profileOptions = document.querySelector("[data-profile-options]");
  const inputRange = document.querySelector("[data-input-tokens]");
  const outputRange = document.querySelector("[data-output-tokens]");
  const inputValue = document.querySelector("[data-input-token-value]");
  const outputValue = document.querySelector("[data-output-token-value]");
  const note = document.querySelector("[data-lab-note]");
  const languageLatency = document.querySelector("[data-language-latency]");
  const languageNote = document.querySelector("[data-language-note]");
  const replayFlow = document.querySelector("[data-replay-flow]");
  const replayButton = document.querySelector("[data-replay-button]");
  const replayProgress = document.querySelector("[data-replay-progress]");
  const bottleneckGrid = document.querySelector("[data-bottleneck-grid]");
  const replayButtonLabel = replayButton?.textContent || "Replay request";

  const getHardware = () => data.hardware.find((hardware) => hardware.id === state.hardwareId);

  const updateActiveButtons = () => {
    hardwareOptions.querySelectorAll("button").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.hardware === state.hardwareId);
    });
    profileOptions.querySelectorAll("button").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.profile === state.profileId);
    });
  };

  const setMetric = (name, value) => {
    const node = document.querySelector(`[data-metric="${name}"]`);
    if (node) node.textContent = value;
  };

  const setContext = (name, value) => {
    const node = document.querySelector(`[data-context="${name}"]`);
    if (node) node.textContent = value;
  };

  const updateReplay = () => {
    const hardware = getHardware();
    const metrics = calculateBenchmark(hardware, state.inputTokens, state.outputTokens);
    const steps = data.replaySteps;
    const currentStep = steps[state.replayIndex] || steps[0];
    replayFlow.querySelectorAll(".replay-step").forEach((step, index) => {
      step.classList.toggle("is-complete", index < state.replayIndex);
      step.classList.toggle("is-current", index === state.replayIndex);
      step.classList.toggle("is-active", index <= state.replayIndex);
    });
    if (replayProgress) {
      replayProgress.style.width = `${((state.replayIndex + 1) / steps.length) * 100}%`;
    }
    document.querySelector('[data-replay="hardware"]').textContent = hardware.label;
    document.querySelector('[data-replay="step"]').textContent = currentStep.label;
    document.querySelector('[data-replay="inputTokens"]').textContent = state.inputTokens;
    document.querySelector('[data-replay="outputTokens"]').textContent = state.outputTokens;
    document.querySelector('[data-replay="latency"]').textContent = formatMs(metrics.meanLatencyMs);
    document.querySelector('[data-replay="bottleneck"]').textContent = hardware.bottleneck;
  };

  const updateLab = () => {
    const hardware = getHardware();
    const metrics = calculateBenchmark(hardware, state.inputTokens, state.outputTokens);
    const allMetrics = data.hardware.map((item) => ({
      hardware: item,
      metrics: calculateBenchmark(item, state.inputTokens, state.outputTokens)
    }));

    inputRange.value = state.inputTokens;
    outputRange.value = state.outputTokens;
    inputValue.textContent = state.inputTokens;
    outputValue.textContent = state.outputTokens;
    updateActiveButtons();

    document.querySelector('[data-lab-stat="requestCount"]').textContent = hardware.measured.requestCount.toLocaleString();
    document.querySelector('[data-lab-stat="meanLatency"]').textContent = formatMs(metrics.meanLatencyMs);
    document.querySelector('[data-lab-stat="tokensPerSecond"]').textContent = formatTps(metrics.tokensPerSecond);

    setMetric("meanLatency", formatMs(metrics.meanLatencyMs));
    setMetric("p90Latency", formatMs(metrics.p90LatencyMs));
    setMetric("p95Latency", formatMs(metrics.p95LatencyMs));
    setMetric("tokensPerSecond", formatTps(metrics.tokensPerSecond));
    setMetric("costPerMillion", formatUsd(metrics.costPerMillion));
    setContext("hardware", hardware.label);
    setContext("tokens", `${state.inputTokens} in / ${state.outputTokens} out`);
    setContext(
      "tokenizer",
      hardware.id === "h100"
        ? `${hardware.measured.rawInputTokens} raw -> ${hardware.measured.inputTokens} formatted tokens avg`
        : "Replaceable baseline; tokenization shape tracked separately"
    );
    setContext("tradeoff", hardware.tradeoff);

    renderLineChart(document.querySelector('[data-chart="latency-output"]'), hardware, state.inputTokens);
    renderBarChart(
      document.querySelector('[data-chart="hardware-latency"]'),
      allMetrics.map((item) => ({ label: item.hardware.shortLabel, value: item.metrics.meanLatencyMs })),
      formatMs
    );
    renderBarChart(
      document.querySelector('[data-chart="tail-latency"]'),
      [
        { label: "Mean", value: metrics.meanLatencyMs },
        { label: "P90", value: metrics.p90LatencyMs },
        { label: "P95", value: metrics.p95LatencyMs }
      ],
      formatMs
    );
    renderBarChart(
      document.querySelector('[data-chart="throughput"]'),
      allMetrics.map((item) => ({ label: item.hardware.shortLabel, value: item.metrics.tokensPerSecond })),
      formatTps
    );
    renderBarChart(
      document.querySelector('[data-chart="cost"]'),
      allMetrics.map((item) => ({ label: item.hardware.shortLabel, value: item.metrics.costPerMillion })),
      formatUsd
    );

    note.textContent = `${hardware.source} Current profile: ${state.inputTokens} input tokens, ${state.outputTokens} output tokens.`;
    state.replayIndex = Math.min(state.replayIndex, data.replaySteps.length - 1);
    updateReplay();
  };

  hardwareOptions.innerHTML = data.hardware
    .map((hardware) => `<button type="button" data-hardware="${hardware.id}">${hardware.label}</button>`)
    .join("");
  profileOptions.innerHTML = data.profiles
    .map((profile) => `<button type="button" data-profile="${profile.id}" title="${profile.note}">${profile.label}</button>`)
    .join("");
  replayFlow.innerHTML = data.replaySteps
    .map(
      (step, index) => `
        <article class="replay-step">
          <em class="replay-index">${String(index + 1).padStart(2, "0")}</em>
          <strong>${step.label}</strong>
          <span>${step.detail}</span>
        </article>
      `
    )
    .join("");
  bottleneckGrid.innerHTML = data.hardware
    .map(
      (hardware) => `
        <article class="bottleneck-card">
          <h3>${hardware.label}</h3>
          <p>${hardware.tradeoff}</p>
          <span class="source-tag">${hardware.dataQuality}</span>
        </article>
      `
    )
    .join("");
  renderLanguageLatency(languageLatency, languageNote, data.languageLatency);

  hardwareOptions.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-hardware]");
    if (!button) return;
    state.hardwareId = button.dataset.hardware;
    updateLab();
  });

  profileOptions.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-profile]");
    if (!button) return;
    const profile = data.profiles.find((item) => item.id === button.dataset.profile);
    state.profileId = profile.id;
    state.inputTokens = profile.inputTokens;
    state.outputTokens = profile.outputTokens;
    updateLab();
  });

  inputRange.addEventListener("input", () => {
    state.profileId = "custom";
    state.inputTokens = Number(inputRange.value);
    updateLab();
  });

  outputRange.addEventListener("input", () => {
    state.profileId = "custom";
    state.outputTokens = Number(outputRange.value);
    updateLab();
  });

  replayButton?.addEventListener("click", () => {
    window.clearInterval(state.replayTimer);
    state.replayIndex = 0;
    replayButton.disabled = true;
    replayButton.textContent = "Replaying trace";
    updateReplay();
    state.replayTimer = window.setInterval(() => {
      state.replayIndex += 1;
      if (state.replayIndex >= data.replaySteps.length - 1) {
        state.replayIndex = data.replaySteps.length - 1;
        window.clearInterval(state.replayTimer);
        window.setTimeout(() => {
          replayButton.disabled = false;
          replayButton.textContent = replayButtonLabel;
        }, 420);
      }
      updateReplay();
    }, 680);
  });

  updateLab();
}

document.addEventListener("DOMContentLoaded", async () => {
  initHeader();
  initReveal();
  initInferenceLab();
  initChat();
  await loadKnowledgeBase();
});

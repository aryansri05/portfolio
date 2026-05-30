import { mkdir, writeFile } from "node:fs/promises";

const outPath = new URL("../resume/Aryan_Srivastava_Resume.pdf", import.meta.url);

const lines = [
  { text: "ARYAN SRIVASTAVA", size: 20 },
  { text: "Bengaluru, India | aryansriva05@gmail.com | github.com/aryansri05", size: 10 },
  { text: "linkedin.com/in/aryan-srivastava-821782333", size: 10 },
  { text: "", size: 10 },
  { text: "PROFILE", size: 12 },
  {
    text:
      "Second-year engineering student focused on CUDA-adjacent GPU systems, GPU dataframe internals, LLM inference benchmarking, backend infrastructure, and production-grade open-source development.",
    size: 10
  },
  {
    text:
      "Contributes to large C++/Python and Rust codebases, writes tests, fixes behavioral inconsistencies, and works across backend, AI, and HPC systems.",
    size: 10
  },
  { text: "", size: 10 },
  { text: "EDUCATION", size: 12 },
  { text: "Manipal Institute of Technology, Bengaluru", size: 10 },
  { text: "B.Tech undergraduate | Expected January 2028", size: 10 },
  { text: "", size: 10 },
  { text: "OPEN SOURCE CONTRIBUTIONS", size: 12 },
  { text: "NVIDIA RAPIDS - cuDF", size: 10 },
  { text: "- PR #20747: Boolean Casting Consistency Fix, merged.", size: 10 },
  { text: "- Fixed behavioral inconsistency between cuDF and Pandas; modified Python/C++ interop logic and added regression tests.", size: 10 },
  { text: "- PR #20862: Hybrid Scan API, merged.", size: 10 },
  { text: "- Added a hybrid scan API in libcudf C++ for all-true row masks with memory-safe null handling and unit tests.", size: 10 },
  { text: "Polars - High-Performance DataFrame Library (Rust)", size: 10 },
  { text: "- PR #27669: FixedRingBuffer Allocation Provenance, merged.", size: 10 },
  { text: "- Fixed a Rust allocation-provenance soundness issue in polars-utils by preserving the original Vec allocation.", size: 10 },
  { text: "", size: 10 },
  { text: "PROJECTS", size: 12 },
  { text: "MAHE Mobility Challenge 2026 - 1st Place, AI Track | Backend Architect", size: 10 },
  { text: "- Built a connected-vehicle alert pipeline with local Phi-3 classification, Node.js/WebSocket triage, a heatmap, and recovery summaries.", size: 10 },
  { text: "LLM Inference Benchmarking | Sarvam 30B FP8", size: 10 },
  { text: "- Repo: github.com/aryansri05/indicservebench", size: 10 },
  { text: "- Benchmarked Sarvam 30B FP8 on H100 SXM using 240 measured inference requests across English, Hindi, Tamil, and Hinglish/code-mixed prompts.", size: 10 },
  { text: "- Tracked tokenization behavior, mean latency, P90/P95 latency, and throughput to analyze serving performance and deployment tradeoffs.", size: 10 },
  { text: "- Additional T4 and Apple M2 baselines are being expanded.", size: 10 },
  { text: "Paper Trading Platform", size: 10 },
  { text: "- Full-stack options simulator with React, Node.js/Express, PostgreSQL, JWT auth, portfolio tracking, and real-time market data.", size: 10 },
  { text: "", size: 10 },
  { text: "TECHNICAL SKILLS", size: 12 },
  { text: "Languages: Python, C++, JavaScript, SQL, Bash", size: 10 },
  { text: "AI / ML: LangGraph, FastMCP, ChromaDB, Ollama, Llama 3, RAG, LLM agents", size: 10 },
  { text: "HPC / GPU: CUDA, cuDF, RAPIDS AI, LLM inference benchmarking, Apple Silicon unified memory, SLURM", size: 10 },
  { text: "Frameworks: React.js, Node.js, Express, Pandas, NumPy, Pytest", size: 10 },
  { text: "Tools: Git, GitHub Actions, Docker, CI/CD, PostgreSQL, GraphQL, VS Code", size: 10 }
];

function escapePdfText(text) {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapLine(text, maxLength) {
  if (text.length <= maxLength) return [text];
  const words = text.split(" ");
  const output = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLength) {
      output.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) output.push(current);
  return output;
}

const contentParts = ["BT", "/F1 20 Tf", "72 760 Td"];
let currentSize = 20;
let firstText = true;

for (const line of lines) {
  const wrapped = line.text ? wrapLine(line.text, line.size >= 12 ? 64 : 96) : [""];
  for (const wrappedLine of wrapped) {
    if (line.size !== currentSize) {
      contentParts.push(`/F1 ${line.size} Tf`);
      currentSize = line.size;
    }
    if (!firstText) contentParts.push(`0 -${line.text === "" ? 10 : line.size + 5} Td`);
    contentParts.push(`(${escapePdfText(wrappedLine)}) Tj`);
    firstText = false;
  }
}

contentParts.push("ET");

const stream = contentParts.join("\n");
const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`
];

let pdf = "%PDF-1.4\n";
const offsets = [0];

objects.forEach((object, index) => {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
});

const xrefOffset = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += "0000000000 65535 f \n";
offsets.slice(1).forEach((offset) => {
  pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
});
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

await mkdir(new URL("../resume/", import.meta.url), { recursive: true });
await writeFile(outPath, pdf);
console.log(`Wrote ${outPath.pathname}`);

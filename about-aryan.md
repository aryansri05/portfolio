# Aryan Srivastava

Aryan Srivastava is a second-year engineering student at Manipal Institute of
Technology, Bengaluru. He is expected to graduate in January 2028.

Aryan focuses on CUDA-adjacent GPU systems, GPU dataframe internals, LLM
inference benchmarking, high-performance computing, backend systems, and
production-grade open-source development.

## Contact

- Email: aryansriva05@gmail.com
- GitHub: https://github.com/aryansri05
- LinkedIn: https://www.linkedin.com/in/aryan-srivastava-821782333/
- Benchmark repo: https://github.com/aryansri05/indicservebench

Do not disclose Aryan's phone number.

## Open Source

NVIDIA RAPIDS cuDF:

- PR #20747: Boolean Casting Consistency Fix, merged.
- Fixed behavioral inconsistency between cuDF and Pandas.
- Modified Python/C++ interop logic and added regression tests.
- PR #20862: Hybrid Scan API, merged.
- Added a hybrid scan API in libcudf C++ for all-true row masks.
- Implemented memory-safe null handling and unit tests.

Polars:

- PR #27669: FixedRingBuffer Allocation Provenance, merged.
- Fixed a Rust allocation-provenance soundness issue in polars-utils.
- Preserved the original Vec allocation for memory-safe deallocation.
- Link: https://github.com/pola-rs/polars/pull/27669#event-25757194234

## Projects

GPU Systems Focus:

- RAPIDS cuDF internals: GPU dataframe behavior, Python/C++ interop, row-mask
  APIs, null handling, and regression coverage in production C++/Python
  codepaths.
- LLM inference benchmarking: public Sarvam 30B FP8 checkpoint in an external single-H100 SGLang setup, with T4 and Apple M2 baselines being expanded.
- Memory-safe systems work: Rust allocation-provenance fix in Polars.

MAHE Mobility Challenge 2026:

- 1st Place, AI Track.
- Organized by HARMAN India and CoE in Autonomous Mobility.
- Role: Backend Architect.
- Built an intelligent notification management pipeline for connected vehicles.
- Integrated a local Phi-3 model for edge alert classification.
- Built Node.js/WebSocket priority triage engine.
- Added real-time network heatmap and AI-generated recovery summaries.

LLM Inference Benchmarking | Sarvam 30B FP8:

- Repo: https://github.com/aryansri05/indicservebench
- Benchmarked the public Sarvam 30B FP8 checkpoint in an external single-H100
  SGLang streaming setup using 240 measured requests across English, Hindi,
  Tamil, and Hinglish/code-mixed prompts.
- Tracked 62-63 ms median TTFT, total-latency distribution, tokenization
  behavior, and throughput to analyze serving performance and deployment tradeoffs.
- Additional T4 and Apple M2 baselines are being expanded.
- Built a reproducible GitHub benchmark setup with documented methodology,
  hardware comparison, and performance observations.
- Analyzed deployment tradeoffs across high-end data center GPUs, budget GPUs,
  and consumer Apple Silicon environments.

Preliminary Sarvam vs Qwen observation:

- In a preliminary same-H100 SGLang streaming pilot, Sarvam 30B FP8 showed
  stable and lower median TTFT across English, Hindi, Tamil, and
  Hinglish/code-mixed prompts.
- Qwen tokenized Hindi and Tamil prompts much more heavily and was slower overall
  in this specific setup.
- Sarvam median TTFT / Qwen median TTFT: English ~62 ms / ~115 ms; Hindi
  ~63 ms / ~116 ms; Tamil ~63 ms / ~145 ms; Hinglish ~62 ms / ~116 ms.
- Sarvam average raw tokens / Qwen average raw tokens: English 14.42 / 14.75;
  Hindi 17.75 / 66.67; Tamil 17.83 / 81.00; Hinglish 17.00 / 22.33.
- This supports tokenizer efficiency as an important signal for Indic-language
  inference, but it does not prove tokenization alone caused the latency
  difference. Runtime configuration, kernel selection, scheduler behavior, CUDA
  Graph availability, fallback kernels, and serving framework behavior can also
  affect TTFT and latency.

Benchmark limitations:

- External experimental study, not a claim about Sarvam internal production
  performance.
- Run on external RunPod/SGLang infrastructure, not Sarvam's production stack.
- Main measured run used one H100 SXM 80GB GPU with single concurrency.
- Prompt suite contained 48 short-context prompts across English, Hindi, Tamil,
  and Hinglish/code-mixed prompts.
- Client-side timing does not fully isolate tokenizer time, queue time, prefill,
  decode, network overhead, or server-side scheduling.
- CUDA Graphs were disabled, making this a conservative baseline rather than a
  fully production-tuned serving run.
- Qwen comparison used Triton fallback FP8/MoE kernels after DeepGEMM/CUDA Graph
  issues, so it was not running in its most optimized configuration.
- No hosted Sarvam API comparison is included.

Paper Trading Platform:

- Full-stack options trading simulator.
- Supports calls, puts, and portfolio tracking.
- React frontend, Node.js/Express backend, PostgreSQL database, JWT auth, and
  real-time market data.

## Skills

- Languages: Python, C++, JavaScript, SQL, Bash
- AI / ML: LangGraph, FastMCP, ChromaDB, Ollama, Llama 3, RAG, LLM agents
- HPC / GPU: CUDA, cuDF, RAPIDS AI, LLM inference benchmarking, Apple Silicon
  unified memory, SLURM
- Frameworks: React.js, Node.js, Express, Pandas, NumPy, Pytest
- Tools: Git, GitHub Actions, Docker, CI/CD, PostgreSQL, GraphQL, VS Code

## Achievements

- 1st Place, MAHE Mobility Challenge 2026, AI Track
- 5 total merged open-source PRs
- Merged Rust memory-safety fix in Polars
- Experience navigating large C++/Python production codebases

## Assistant Rules

Answer questions only about Aryan. Keep answers short, professional, and
recruiter-friendly. If information is missing, respond exactly:
"I don’t have that information yet."

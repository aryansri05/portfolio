window.BENCHMARK_DATA = {
  repoUrl: "https://github.com/aryansri05/indicservebench",
  profiles: [
    {
      id: "short",
      label: "Short",
      inputTokens: 32,
      outputTokens: 32,
      note: "Short support-style prompt"
    },
    {
      id: "measured",
      label: "Measured",
      inputTokens: 67,
      outputTokens: 32,
      note: "Closest to the H100 Sarvam 30B FP8 run"
    },
    {
      id: "long",
      label: "Long",
      inputTokens: 128,
      outputTokens: 96,
      note: "Synthetic longer serving request"
    }
  ],
  hardware: [
    {
      id: "h100",
      label: "H100 SXM",
      shortLabel: "H100",
      model: "Sarvam 30B FP8",
      source: "Measured: 240 successful Sarvam 30B FP8 requests, SGLang, single H100 SXM, single concurrency.",
      dataQuality: "measured",
      measured: {
        requestCount: 240,
        inputTokens: 67,
        rawInputTokens: 17,
        outputTokens: 32,
        meanLatencyMs: 890,
        p90LatencyMs: 897,
        p95LatencyMs: 900,
        tokensPerSecond: 36.0,
        ttftMs: 71
      },
      cost: {
        hourlyUsd: 3.0,
        label: "single-stream estimate"
      },
      inputPenaltyMs: 1.15,
      tradeoff: "Best fit for high-throughput FP8 serving, low tail latency, and production-style batching once concurrency is tuned.",
      bottleneck: "Decode bottleneck likely low in this pilot; H100 has headroom for batching and higher concurrency."
    },
    {
      id: "t4",
      label: "NVIDIA T4",
      shortLabel: "T4",
      model: "Sarvam baseline",
      source: "Desktop T4 aggregate summary. Treat as a replaceable baseline until the final Sarvam 30B FP8 T4 run is added.",
      dataQuality: "baseline",
      measured: {
        requestCount: 150,
        inputTokens: 16,
        rawInputTokens: 16,
        outputTokens: 57,
        meanLatencyMs: 2450,
        p90LatencyMs: 2893,
        p95LatencyMs: 2954,
        tokensPerSecond: 24.8,
        ttftMs: 340
      },
      cost: {
        hourlyUsd: 0,
        label: "cost disabled"
      },
      inputPenaltyMs: 4.2,
      tradeoff: "Budget-friendly GPU for smaller deployments, but large-model serving is constrained by VRAM and compute.",
      bottleneck: "VRAM and compute are likely bottlenecks for 30B-class models; expect more pressure at longer context or higher concurrency."
    },
    {
      id: "m2",
      label: "Apple M2",
      shortLabel: "M2",
      model: "Local baseline",
      source: "Structured placeholder from local MLX benchmark script; replace when the M2 result artifact is exported.",
      dataQuality: "placeholder",
      measured: {
        requestCount: 6,
        inputTokens: 24,
        rawInputTokens: 24,
        outputTokens: 80,
        meanLatencyMs: 7800,
        p90LatencyMs: 9100,
        p95LatencyMs: 9800,
        tokensPerSecond: 10.3,
        ttftMs: 900
      },
      cost: {
        hourlyUsd: 0,
        label: "cost disabled"
      },
      inputPenaltyMs: 9.5,
      tradeoff: "Useful local baseline for development and sanity checks, not a large-scale serving target for 30B-class models.",
      bottleneck: "Backend overhead and memory bandwidth are the likely limits; good for iteration, weak for production throughput."
    }
  ],
  replaySteps: [
    {
      id: "prompt",
      label: "Prompt received",
      detail: "Request enters the serving path with a language-specific user prompt."
    },
    {
      id: "tokenized",
      label: "Tokenized",
      detail: "Prompt is formatted and converted into model input tokens."
    },
    {
      id: "prefill",
      label: "Prefill",
      detail: "The model consumes input tokens and builds attention state."
    },
    {
      id: "decode",
      label: "Decode",
      detail: "Output tokens are generated step by step."
    },
    {
      id: "output",
      label: "Output generated",
      detail: "The response stream completes for the requested output token budget."
    },
    {
      id: "latency",
      label: "Latency recorded",
      detail: "Mean, P90, P95, tokens/sec, and bottleneck notes are logged."
    }
  ],
  languageLatency: {
    note: "H100 mean/P95 total latency is computed from 240 measured raw JSONL requests across five passes; P95 uses the same interpolated percentile convention as the summary analysis. T4 source exposes median and P95 language aggregates, so median is shown as the central-latency proxy until raw request data is added. M2 rows are placeholders from the local benchmark script until exported M2 results are available.",
    languages: [
      {
        id: "en",
        label: "English",
        h100: {
          n: 60,
          meanLatencyMs: 882.9,
          p95LatencyMs: 901.9,
          meanInputTokens: 61.3,
          meanOutputTokens: 32,
          tokensPerSecond: 36.25,
          quality: "measured",
          centralLabel: "mean"
        },
        t4: null,
        m2: null
      },
      {
        id: "hi",
        label: "Hindi",
        h100: {
          n: 60,
          meanLatencyMs: 904.6,
          p95LatencyMs: 924.1,
          meanInputTokens: 68.5,
          meanOutputTokens: 32,
          tokensPerSecond: 35.65,
          quality: "measured",
          centralLabel: "mean"
        },
        t4: {
          n: 50,
          meanLatencyMs: 2403.4,
          p95LatencyMs: 2700.8,
          meanInputTokens: 11.6,
          meanOutputTokens: 46.6,
          tokensPerSecond: 24.87,
          quality: "median proxy",
          centralLabel: "median"
        },
        m2: {
          n: 2,
          meanLatencyMs: 7600,
          p95LatencyMs: 9600,
          meanInputTokens: 8,
          meanOutputTokens: 100,
          tokensPerSecond: 10.5,
          quality: "placeholder",
          centralLabel: "mean"
        }
      },
      {
        id: "ta",
        label: "Tamil",
        h100: {
          n: 60,
          meanLatencyMs: 883.2,
          p95LatencyMs: 898.9,
          meanInputTokens: 71.7,
          meanOutputTokens: 32,
          tokensPerSecond: 36.24,
          quality: "measured",
          centralLabel: "mean"
        },
        t4: {
          n: 50,
          meanLatencyMs: 2483.2,
          p95LatencyMs: 3089.6,
          meanInputTokens: 12.5,
          meanOutputTokens: 62.5,
          tokensPerSecond: 24.67,
          quality: "median proxy",
          centralLabel: "median"
        },
        m2: {
          n: 2,
          meanLatencyMs: 8200,
          p95LatencyMs: 10300,
          meanInputTokens: 9,
          meanOutputTokens: 100,
          tokensPerSecond: 9.8,
          quality: "placeholder",
          centralLabel: "mean"
        }
      },
      {
        id: "code-mixed",
        label: "Hinglish / code-mixed",
        h100: {
          n: 60,
          meanLatencyMs: 890.7,
          p95LatencyMs: 898.9,
          meanInputTokens: 66.9,
          meanOutputTokens: 32,
          tokensPerSecond: 36.03,
          quality: "measured",
          centralLabel: "mean"
        },
        t4: {
          n: 50,
          meanLatencyMs: 2462.7,
          p95LatencyMs: 3072.0,
          meanInputTokens: 24.7,
          meanOutputTokens: 61.7,
          tokensPerSecond: 24.85,
          quality: "median proxy",
          centralLabel: "median"
        },
        m2: {
          n: 2,
          meanLatencyMs: 7800,
          p95LatencyMs: 9800,
          meanInputTokens: 13,
          meanOutputTokens: 100,
          tokensPerSecond: 10.3,
          quality: "placeholder",
          centralLabel: "mean"
        }
      }
    ]
  }
};

# Aryan Srivastava Portfolio

Minimal static portfolio for Aryan Srivastava, focused on AI systems,
LLM inference benchmarking, GPU/HPC work, and open-source contributions.

This project uses plain HTML, CSS, and JavaScript. There is no build step.

## Benchmark Data

Edit `benchmark-data.js` to update the Inference Lab hardware profiles,
latency numbers, token counts, throughput, cost estimates, replay steps, and
bottleneck notes.

## Local Preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.

If port 4173 is already in use, run another port:

```bash
python3 -m http.server 4174
```

Then open `http://localhost:4174`.

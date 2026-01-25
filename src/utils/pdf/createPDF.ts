import {
  IntervalReportType,
  CounterReportType,
  BaseReportType,
  ReportType,
} from "@/src/types/reportsTypes";
import { themeColors } from "../objects/styles";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function createReportHeader(report: BaseReportType) {
  const date = new Date(report.startedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return `
    <div class="header">
      <h1>${report.name}</h1>
      <div class="meta">
        <strong>Observation Type:</strong>
        ${report.type === "interval" ? "Interval Recording" : "Frequency Counter"}<br>
        <strong>Date:</strong> ${date}<br>
        <strong>Duration:</strong> ${formatTime(report.totalSeconds)}<br>
        <strong>Subject:</strong> ${report.subject}<br>
        <strong>Educational Setting:</strong> ${report.educationalSetting}<br>
        <strong>Instructional Setting:</strong> ${report.instructionalSetting}
      </div>
    </div>
  `;
}

function getSharedStyles() {
  return `
*{margin:0;padding:0;box-sizing:border-box}

body{
  font-family:-apple-system,BlinkMacSystemFont,Arial,sans-serif;
  color:#333;
}

.page{
  padding:40px;
}

.header{
  border-bottom:3px solid ${themeColors.blue};
  margin-bottom:30px;
  padding-bottom:20px;
}

h1{color:${themeColors.blue};font-size:28px;margin-bottom:10px}
.meta{font-size:14px;color:#666;line-height:1.8}

.stats-grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:20px;
  margin:30px 0;
}

.stat-card{
  border:1px solid #ddd;
  padding:20px;
  border-radius:8px;
}

.stat-label{font-size:12px;color:#666;text-transform:uppercase}
.stat-value{font-size:32px;font-weight:700}

.section-title{
  font-size:22px;
  margin-bottom:20px;
  padding-bottom:8px;
  border-bottom:2px solid #e0e0e0;
}

.chart-row{
  display:grid;
  grid-template-columns:400px 1fr;
  gap:40px;
  align-items:center;
  margin-bottom:60px;
}

.legend{
  display:flex;
  flex-direction:column;
  gap:14px;
  font-size:14px;
}

.legend-item{
  display:flex;
  align-items:center;
  gap:10px;
}

table{
  width:100%;
  border-collapse:collapse;
  font-size:13px;
}

th{border:1px solid #ddd;padding:12px;text-align:left}
td{padding:10px;border:1px solid #eee}

.status-badge{
  padding:4px 10px;
  border-radius:12px;
  font-size:11px;
  font-weight:600;
  text-transform:uppercase;
}

.on-task{border:1px solid ${themeColors.blue};color:${themeColors.blue}}
.off-task{border:1px solid ${themeColors.red};color:${themeColors.red}}
.skipped{border:1px solid ${themeColors.slate};color:${themeColors.slate}}

.page-break{page-break-before:always}

.footer{
  margin-top:50px;
  border-top:1px solid #ddd;
  padding-top:15px;
  font-size:12px;
  text-align:center;
  color:#999;
}
`;
}

function pieSVG(segments: { value: number; color: string }[]) {
  const nonZero = segments.filter((s) => s.value > 0);
  const total = nonZero.reduce((s, x) => s + x.value, 0);

  if (!total) {
    return `<circle cx="200" cy="200" r="150" fill="#e0e0e0"/>`;
  }

  if (nonZero.length === 1) {
    return `<circle cx="200" cy="200" r="150" fill="${nonZero[0].color}"/>`;
  }

  let angle = -90;
  return nonZero
    .map((s) => {
      const sweep = (s.value / total) * 360;
      const a1 = (angle * Math.PI) / 180;
      const a2 = ((angle + sweep) * Math.PI) / 180;
      angle += sweep;

      const x1 = 200 + 150 * Math.cos(a1);
      const y1 = 200 + 150 * Math.sin(a1);
      const x2 = 200 + 150 * Math.cos(a2);
      const y2 = 200 + 150 * Math.sin(a2);
      const large = sweep > 180 ? 1 : 0;

      return `<path d="M200 200 L${x1} ${y1} A150 150 0 ${large} 1 ${x2} ${y2} Z"
      fill="${s.color}" stroke="white" stroke-width="4"/>`;
    })
    .join("");
}

function legendItem(label: string, color: string) {
  return `
    <div class="legend-item">
      <svg width="16" height="16">
        <rect width="16" height="16" rx="3" fill="${color}" />
      </svg>
      <span>${label}</span>
    </div>
  `;
}

const behaviorPalette = [
  themeColors.blue,
  themeColors.red,
  themeColors.orange,
  themeColors.teal,
  themeColors.cyan,
  themeColors.indigo,
  themeColors.purple,
  "rgb(59, 130, 246)",
  "rgb(239, 68, 68)",
  "rgb(34, 197, 94)",
  "rgb(168, 85, 247)",
  "rgb(234, 179, 8)",
  "rgb(14, 165, 233)",
  "rgb(245, 158, 11)",
  "rgb(236, 72, 153)",
  "rgb(16, 185, 129)",
  "rgb(217, 70, 239)",
  "rgb(132, 204, 22)",
  "rgb(251, 191, 36)",
  "rgb(100, 116, 139)",
  "rgb(148, 163, 184)",
  "rgb(120, 113, 108)",
];

function createIntervalPDF(report: IntervalReportType) {
  const completed = report.observations.filter((o) => o.isOnTask !== null);
  const onTask = completed.filter((o) => o.isOnTask).length;
  const offTask = completed.filter((o) => o.isOnTask === false).length;
  const skipped = report.observations.length - completed.length;

  const behaviorCounts: Record<string, number> = {};
  completed.forEach((o) => {
    const k = o.value || "No Notes";
    behaviorCounts[k] = (behaviorCounts[k] || 0) + 1;
  });

  const intervalSeconds = report.totalSeconds / report.finalInterval;

  const statusSeg = [
    { label: "Engaged in Lesson", value: onTask, color: themeColors.blue },
    { label: "Off Task", value: offTask, color: themeColors.red },
  ];

  const behaviorSeg = Object.entries(behaviorCounts).map(
    ([label, value], i) => ({
      label,
      value,
      color: behaviorPalette[i % behaviorPalette.length],
    }),
  );

  return `
<!DOCTYPE html>
<html>
<head><style>${getSharedStyles()}</style></head>
<body>

<div class="page">
${createReportHeader(report)}

<div class="stats-grid">
  <div class="stat-card"><div class="stat-label">On-Task</div><div class="stat-value">${onTask}</div></div>
  <div class="stat-card"><div class="stat-label">Off-Task</div><div class="stat-value">${offTask}</div></div>
  <div class="stat-card"><div class="stat-label">Skipped</div><div class="stat-value">${skipped}</div></div>
  <div class="stat-card"><div class="stat-label">Total Intervals</div><div class="stat-value">${report.finalInterval}</div></div>
</div>
</div>

<div class="page page-break">
<h2 class="section-title">Detailed Observations</h2>
<table>
<thead>
<tr><th>Interval</th><th>Time</th><th>Status</th><th>Notes</th></tr>
</thead>
<tbody>
${report.observations
  .map((o, i) => {
    const cls =
      o.isOnTask === null ? "skipped" : o.isOnTask ? "on-task" : "off-task";
    const txt =
      o.isOnTask === null ? "Skipped" : o.isOnTask ? "On-Task" : "Off-Task";
    return `<tr>
    <td>#${i + 1}</td>
    <td>${formatTime(intervalSeconds * (i + 1))}</td>
    <td><span class="status-badge ${cls}">${txt}</span></td>
    <td>${o.value || "-"}</td>
  </tr>`;
  })
  .join("")}
</tbody>
</table>
</div>

<div class="page page-break">
<h2 class="section-title">On-Task vs Off-Task</h2>
<div class="chart-row">
  <svg viewBox="0 0 400 400" width="400" height="400">
    ${pieSVG(statusSeg)}
  </svg>
  <div class="legend">${statusSeg.map((s) => legendItem(s.label, s.color)).join("")}</div>
</div>
</div>

<div class="page page-break">
<h2 class="section-title">Behavior Breakdown</h2>
<div class="chart-row">
  <svg viewBox="0 0 400 400" width="400" height="400">
    ${pieSVG(behaviorSeg)}
  </svg>
  <div class="legend">${behaviorSeg.map((s) => legendItem(s.label, s.color)).join("")}</div>
</div>
</div>

</body>
</html>`;
}

function createCounterPDF(report: CounterReportType) {
  const behaviors = Object.keys(report.counter);
  const totalTime = report.totalSeconds;
  const bucketSize = totalTime / 5;

  const totalCounts: Record<string, number> = {};
  behaviors.forEach((b) => {
    totalCounts[b] = report.counter[b].length;
  });
  const totalEvents = Object.values(totalCounts).reduce((a, c) => a + c, 0);

  const buckets = Array.from(
    { length: 5 },
    () => ({}) as Record<string, number>,
  );

  behaviors.forEach((b) => {
    report.counter[b].forEach((o) => {
      const i = Math.min(4, Math.floor(o.secondsPassed / bucketSize));
      buckets[i][b] = (buckets[i][b] || 0) + 1;
    });
  });

  const maxStack = Math.max(
    ...buckets.map((b) => Object.values(b).reduce((a, c) => a + c, 0)),
    1,
  );

  const chartHeight = 360;
  const leftPad = 60;
  const topPad = 20;
  const bottomPad = 80;
  const rightPad = 20;

  const barWidthOverTime = 120;
  const chartWidthOverTime = leftPad + barWidthOverTime * 5 + rightPad;

  const barWidthTotal = Math.max(80, Math.min(120, 600 / behaviors.length));
  const chartWidthTotal = leftPad + barWidthTotal * behaviors.length + rightPad;

  const axisColor = "#666";
  const labelFont = 13;

  function yTicks(max: number, chartWidth: number) {
    const ticks = [];
    const interval = Math.max(1, Math.ceil(max / 5));
    const tickCount = Math.ceil(max / interval);

    for (let i = 0; i <= tickCount; i++) {
      const value = i * interval;
      const y = topPad + chartHeight - (value / max) * chartHeight;
      ticks.push(`
        <text
          x="${leftPad - 10}"
          y="${y + 5}"
          text-anchor="end"
          font-size="${labelFont}"
          fill="${axisColor}"
        >
          ${value}
        </text>
        <line
          x1="${leftPad}"
          y1="${y}"
          x2="${chartWidth - rightPad}"
          y2="${y}"
          stroke="#eee"
          stroke-width="1"
        />
      `);
    }

    return ticks;
  }

  return `
<!DOCTYPE html>
<html>
<head><style>${getSharedStyles()}</style></head>
<body>

<div class="page">
  ${createReportHeader(report)}

  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-label">Total Events</div>
      <div class="stat-value">${totalEvents}</div>
    </div>

    <div class="stat-card">
      <div class="stat-label">Session Length</div>
      <div class="stat-value">${formatTime(report.totalSeconds)}</div>
    </div>
  </div>
</div>

<div class="page page-break">
<h2 class="section-title">Detailed Events</h2>
<table>
<thead>
<tr><th>Event #</th><th>Time</th><th>Behavior</th></tr>
</thead>
<tbody>
${behaviors
  .flatMap((b) =>
    report.counter[b].map((event, idx) => ({
      behavior: b,
      time: event.secondsPassed,
      eventNum: idx,
    })),
  )
  .sort((a, b) => a.time - b.time)
  .map(
    (event, i) => `<tr>
  <td>#${i + 1}</td>
  <td>${formatTime(event.time)}</td>
  <td>${event.behavior}</td>
</tr>`,
  )
  .join("")}
</tbody>
</table>
</div>

<div class="page page-break">
  <h2 class="section-title">Behavior Over Time</h2>
  <svg width="${chartWidthOverTime}" height="${chartHeight + topPad + bottomPad}">
    ${yTicks(maxStack, chartWidthOverTime).join("")}

    ${buckets
      .map((bucket, i) => {
        let y = topPad + chartHeight;
        return behaviors
          .map((b, j) => {
            const h = ((bucket[b] || 0) / maxStack) * chartHeight;
            y -= h;
            return `<rect
              x="${leftPad + i * barWidthOverTime + 10}"
              y="${y}"
              width="${barWidthOverTime - 20}"
              height="${h}"
              fill="${behaviorPalette[j % behaviorPalette.length]}"
            />`;
          })
          .join("");
      })
      .join("")}

    ${Array.from({ length: 5 })
      .map(
        (_, i) => `
      <text
        x="${leftPad + i * barWidthOverTime + barWidthOverTime / 2}"
        y="${topPad + chartHeight + 25}"
        text-anchor="middle"
        font-size="${labelFont}"
        fill="${axisColor}"
      >
        ${Math.round(i * bucketSize)}–${Math.round((i + 1) * bucketSize)}s
      </text>
    `,
      )
      .join("")}
  </svg>

  <div class="legend">
    ${behaviors
      .map((b, i) => legendItem(b, behaviorPalette[i % behaviorPalette.length]))
      .join("")}
  </div>
</div>

<div class="page page-break">
  <h2 class="section-title">Total Count</h2>
  <svg width="${chartWidthTotal}" height="${chartHeight + topPad + bottomPad + 160}">
    ${yTicks(Math.max(...Object.values(totalCounts), 1), chartWidthTotal).join("")}

    ${behaviors
      .map((b, i) => {
        const count = report.counter[b].length;
        const max = Math.max(...Object.values(totalCounts), 1);
        const h = (count / max) * chartHeight;
        return `<rect
          x="${leftPad + i * barWidthTotal + 10}"
          y="${topPad + chartHeight - h}"
          width="${barWidthTotal - 20}"
          height="${h}"
          fill="${behaviorPalette[i % behaviorPalette.length]}"
        />`;
      })
      .join("")}

    ${behaviors
      .map(
        (b, i) => `
      <text
        x="${leftPad + i * barWidthTotal + barWidthTotal / 2}"
        y="${topPad + chartHeight + 45}"
        transform="rotate(-45 ${leftPad + i * barWidthTotal + barWidthTotal / 2} ${topPad + chartHeight + 45})"
        text-anchor="end"
        font-size="${labelFont}"
        fill="${axisColor}"
      >
        ${b}
      </text>
    `,
      )
      .join("")}
  </svg>
</div>

</body>
</html>`;
}

export function createPDF(type: string, report: ReportType): string {
  if (type === "interval")
    return createIntervalPDF(report as IntervalReportType);
  if (type === "counter") return createCounterPDF(report as CounterReportType);
  throw new Error(`Unknown report type: ${type}`);
}

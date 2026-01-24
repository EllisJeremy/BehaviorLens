import {
  IntervalReportType,
  CounterReportType,
  BaseReportType,
  ReportType,
} from "@/src/types/reportsTypes";

// Helper to format seconds to MM:SS
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Shared header component
function createReportHeader(report: BaseReportType) {
  const date = new Date(report.startedAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const duration = formatTime(report.totalSeconds);

  return `
    <div class="header">
      <h1>${report.name}</h1>
      <div class="meta">
        <strong>Observation Type:</strong> ${report.type === "interval" ? "Interval Recording" : "Frequency Counter"}<br>
        <strong>Date:</strong> ${formattedDate}<br>
        <strong>Duration:</strong> ${duration}<br>
        <strong>Subject:</strong> ${report.subject}<br>
        <strong>Educational Setting:</strong> ${report.educationalSetting}<br>
        <strong>Instructional Setting:</strong> ${report.instructionalSetting}
      </div>
    </div>
  `;
}

// Shared styles
function getSharedStyles() {
  return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
      padding: 40px;
      color: #333;
      line-height: 1.6;
    }
    
    .header {
      border-bottom: 3px solid #2196F3;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    
    h1 {
      color: #2196F3;
      font-size: 28px;
      margin-bottom: 10px;
    }
    
    .meta {
      color: #666;
      font-size: 14px;
      line-height: 1.8;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin: 30px 0;
    }
    
    .stat-card {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #2196F3;
    }
    
    .stat-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .stat-value {
      font-size: 32px;
      font-weight: bold;
      color: #333;
      margin-top: 5px;
    }
    
    .section {
      margin: 40px 0;
    }
    
    .section-title {
      font-size: 20px;
      color: #333;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e0e0e0;
    }
    
    .charts-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 40px;
      margin: 30px 0;
    }
    
    .chart-box {
      text-align: center;
    }
    
    .chart-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 20px;
      color: #555;
    }
    
    .pie-chart {
      width: 200px;
      height: 200px;
      margin: 0 auto 20px;
    }
    
    .legend {
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-size: 16px;
    }
    
    .legend-item {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .legend-color {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      flex-shrink: 0;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      font-size: 13px;
    }
    
    th {
      background: #f5f5f5;
      padding: 12px;
      text-align: left;
      font-weight: 600;
      border-bottom: 2px solid #ddd;
    }
    
    td {
      padding: 10px 12px;
      border-bottom: 1px solid #eee;
    }
    
    tr:hover {
      background: #fafafa;
    }
    
    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    .on-task {
      background: #E8F5E9;
      color: #2E7D32;
    }
    
    .off-task {
      background: #FFEBEE;
      color: #C62828;
    }
    
    .skipped {
      background: #F5F5F5;
      color: #757575;
    }
    
    .timeline-chart {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      text-align: center;
      color: #999;
      font-size: 12px;
    }
  `;
}

// Interval PDF
function createIntervalPDF(report: IntervalReportType) {
  const completedObservations = report.observations.filter(
    (obs) => obs.isOnTask !== null,
  );
  const onTaskCount = completedObservations.filter(
    (obs) => obs.isOnTask === true,
  ).length;
  const offTaskCount = completedObservations.filter(
    (obs) => obs.isOnTask === false,
  ).length;
  const skippedCount = report.observations.filter(
    (obs) => obs.isOnTask === null,
  ).length;

  // Helper to create SVG pie chart
  function createPieChartSVG(
    segments: Array<{ label: string; value: number; color: string }>,
  ) {
    const total = segments.reduce((sum, s) => sum + s.value, 0);
    if (total === 0)
      return '<circle cx="100" cy="100" r="100" fill="#e0e0e0"/>';

    let currentAngle = -90; // Start at top
    const paths: string[] = [];
    const labels: string[] = [];

    segments.forEach((seg) => {
      const percentage = seg.value / total;
      const angle = percentage * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      const x1 = 100 + 100 * Math.cos(startRad);
      const y1 = 100 + 100 * Math.sin(startRad);
      const x2 = 100 + 100 * Math.cos(endRad);
      const y2 = 100 + 100 * Math.sin(endRad);

      const largeArc = angle > 180 ? 1 : 0;

      paths.push(
        `<path d="M 100 100 L ${x1} ${y1} A 100 100 0 ${largeArc} 1 ${x2} ${y2} Z" fill="${seg.color}"/>`,
      );

      // Add label at midpoint of slice (only if slice is large enough)
      if (percentage > 0.08) {
        // Only show label if > 8%
        const midAngle = (startAngle + endAngle) / 2;
        const midRad = (midAngle * Math.PI) / 180;
        const labelRadius = 65; // Position label 65% from center
        const labelX = 100 + labelRadius * Math.cos(midRad);
        const labelY = 100 + labelRadius * Math.sin(midRad);

        labels.push(`
          <text x="${labelX}" y="${labelY}" 
                text-anchor="middle" 
                dominant-baseline="middle" 
                font-size="12" 
                font-weight="bold" 
                fill="white"
                stroke="rgba(0,0,0,0.3)"
                stroke-width="0.5">
            ${seg.value}
          </text>
        `);
      }

      currentAngle = endAngle;
    });

    return paths.join("") + labels.join("");
  }

  // Helper to create SVG pie chart without external labels
  function createPieChartSVG(
    segments: Array<{ label: string; value: number; color: string }>,
  ) {
    const total = segments.reduce((sum, s) => sum + s.value, 0);
    if (total === 0)
      return '<circle cx="200" cy="200" r="150" fill="#e0e0e0"/>';

    let currentAngle = -90;
    const paths: string[] = [];

    segments.forEach((seg) => {
      const percentage = (seg.value / total) * 100;
      const angle = (percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      const x1 = 200 + 150 * Math.cos(startRad);
      const y1 = 200 + 150 * Math.sin(startRad);
      const x2 = 200 + 150 * Math.cos(endRad);
      const y2 = 200 + 150 * Math.sin(endRad);

      const largeArc = angle > 180 ? 1 : 0;

      // Draw slice with white border
      paths.push(
        `<path d="M 200 200 L ${x1} ${y1} A 150 150 0 ${largeArc} 1 ${x2} ${y2} Z" fill="${seg.color}" stroke="white" stroke-width="4"/>`,
      );

      currentAngle = endAngle;
    });

    return paths.join("");
  }

  const total = onTaskCount + offTaskCount;

  // Count behaviors (excluding null/skipped)
  const behaviorCounts: Record<string, number> = {};
  completedObservations.forEach((obs) => {
    const behavior = obs.value || "No Notes";
    behaviorCounts[behavior] = (behaviorCounts[behavior] || 0) + 1;
  });

  // Generate behavior pie chart with multiple colors
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E2",
  ];
  const behaviorSegments = Object.entries(behaviorCounts).map(
    ([behavior, count], index) => ({
      label: behavior,
      value: count,
      color: colors[index % colors.length],
    }),
  );

  const onTaskOffTaskSegments = [
    { label: "On-Task", value: onTaskCount, color: "#4CAF50" },
    { label: "Off-Task", value: offTaskCount, color: "#F44336" },
  ];

  const pie1SVG = createPieChartSVG(onTaskOffTaskSegments);
  const pie2SVG = createPieChartSVG(behaviorSegments);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    ${getSharedStyles()}
    .chart-container-wrapper {
      position: relative;
      width: 100%;
      max-width: 350px;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  ${createReportHeader(report)}

  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-label">On-Task</div>
      <div class="stat-value" style="color: #4CAF50;">${onTaskCount}</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-label">Off-Task</div>
      <div class="stat-value" style="color: #F44336;">${offTaskCount}</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-label">Skipped</div>
      <div class="stat-value" style="color: #9E9E9E;">${skippedCount}</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-label">Total Intervals</div>
      <div class="stat-value">${report.finalInterval}</div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">On-Task vs Off-Task</h2>
    <div class="chart-page">
      <div class="chart-box">
        <svg viewBox="0 0 400 400" style="width: 100%; max-width: 400px;">
          ${pie1SVG}
        </svg>
      </div>
      <div class="legend-box">
        ${onTaskOffTaskSegments
          .map(
            (seg) => `
          <div class="legend-item">
            <div class="legend-color" style="background: ${seg.color};"></div>
            <span>${seg.label}: ${seg.value}</span>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Behavior Breakdown</h2>
    <div class="chart-page">
      <div class="chart-box">
        <svg viewBox="0 0 400 400" style="width: 100%; max-width: 400px;">
          ${pie2SVG}
        </svg>
      </div>
      <div class="legend-box">
        ${behaviorSegments
          .map(
            (seg) => `
          <div class="legend-item">
            <div class="legend-color" style="background: ${seg.color};"></div>
            <span>${seg.label}: ${seg.value}</span>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Detailed Observations</h2>
    <table>
      <thead>
        <tr>
          <th>Interval</th>
          <th>Status</th>
          <th>Behavior/Notes</th>
        </tr>
      </thead>
      <tbody>
        ${report.observations
          .map((obs, index) => {
            const status =
              obs.isOnTask === null
                ? "skipped"
                : obs.isOnTask
                  ? "on-task"
                  : "off-task";
            const statusText =
              obs.isOnTask === null
                ? "Skipped"
                : obs.isOnTask
                  ? "On-Task"
                  : "Off-Task";

            return `
            <tr>
              <td><strong>#${index + 1}</strong></td>
              <td><span class="status-badge ${status}">${statusText}</span></td>
              <td>${obs.value || "-"}</td>
            </tr>
          `;
          })
          .join("")}
      </tbody>
    </table>
  </div>

  <div class="footer">
    Generated on ${new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })}
  </div>
</body>
</html>
  `;
}

// Counter PDF
function createCounterPDF(report: CounterReportType) {
  const behaviors = Object.keys(report.counter);
  const totalOccurrences = Object.values(report.counter).reduce(
    (sum, observations) => sum + observations.length,
    0,
  );

  const ratePerMinute =
    report.totalSeconds > 0
      ? (totalOccurrences / (report.totalSeconds / 60)).toFixed(2)
      : "0";

  // Create timeline data - group by 30 second intervals
  const intervalSize = 30; // seconds
  const numIntervals = Math.ceil(report.totalSeconds / intervalSize);
  const timelineData: Record<string, number[]> = {};

  behaviors.forEach((behavior) => {
    timelineData[behavior] = new Array(numIntervals).fill(0);
    report.counter[behavior].forEach((obs) => {
      const intervalIndex = Math.floor(obs.secondsPassed / intervalSize);
      if (intervalIndex < numIntervals) {
        timelineData[behavior][intervalIndex]++;
      }
    });
  });

  // Generate line chart SVG
  const chartWidth = 600;
  const chartHeight = 200;
  const colors = [
    "#2196F3",
    "#4CAF50",
    "#F44336",
    "#FF9800",
    "#9C27B0",
    "#00BCD4",
  ];

  const maxCount = Math.max(...behaviors.flatMap((b) => timelineData[b]), 1);
  const xStep = chartWidth / numIntervals;
  const yScale = (chartHeight - 40) / maxCount;

  const lines = behaviors
    .map((behavior, bIndex) => {
      const points = timelineData[behavior]
        .map((count, i) => `${i * xStep},${chartHeight - 20 - count * yScale}`)
        .join(" ");
      return `<polyline points="${points}" fill="none" stroke="${colors[bIndex % colors.length]}" stroke-width="2"/>`;
    })
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    ${getSharedStyles()}
  </style>
</head>
<body>
  ${createReportHeader(report)}

  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-label">Total Occurrences</div>
      <div class="stat-value" style="color: #2196F3;">${totalOccurrences}</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-label">Behaviors Tracked</div>
      <div class="stat-value">${behaviors.length}</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-label">Rate Per Minute</div>
      <div class="stat-value">${ratePerMinute}</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-label">Total Duration</div>
      <div class="stat-value">${formatTime(report.totalSeconds)}</div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Behavior Frequency</h2>
    ${behaviors
      .map((behavior, index) => {
        const count = report.counter[behavior].length;
        return `
        <div style="margin: 20px 0;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <strong style="color: ${colors[index % colors.length]};">${behavior}</strong>
            <span>${count} occurrences</span>
          </div>
          <div style="background: #e0e0e0; height: 8px; border-radius: 4px;">
            <div style="background: ${colors[index % colors.length]}; width: ${(count / totalOccurrences) * 100}%; height: 100%; border-radius: 4px;"></div>
          </div>
        </div>
      `;
      })
      .join("")}
  </div>

  <div class="section">
    <h2 class="section-title">Behavior Timeline (30-second intervals)</h2>
    <div class="timeline-chart">
      <svg width="100%" height="${chartHeight}" viewBox="0 0 ${chartWidth} ${chartHeight}">
        <!-- Grid lines -->
        ${Array.from({ length: 5 })
          .map((_, i) => {
            const y = (chartHeight - 20) * (i / 4);
            return `<line x1="0" y1="${y}" x2="${chartWidth}" y2="${y}" stroke="#ddd" stroke-width="1"/>`;
          })
          .join("")}
        
        <!-- Lines -->
        ${lines}
        
        <!-- X-axis -->
        <line x1="0" y1="${chartHeight - 20}" x2="${chartWidth}" y2="${chartHeight - 20}" stroke="#333" stroke-width="2"/>
      </svg>
      <div class="legend" style="flex-direction: row; justify-content: center; margin-top: 15px;">
        ${behaviors
          .map(
            (behavior, index) => `
          <div class="legend-item">
            <div class="legend-color" style="background: ${colors[index % colors.length]};"></div>
            <span>${behavior}</span>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Detailed Timestamps</h2>
    <table>
      <thead>
        <tr>
          <th>Behavior</th>
          <th>Occurrence #</th>
          <th>Time Since Start</th>
        </tr>
      </thead>
      <tbody>
        ${behaviors
          .flatMap((behavior) =>
            report.counter[behavior].map(
              (obs, index) => `
            <tr>
              <td><strong>${behavior}</strong></td>
              <td>#${index + 1}</td>
              <td>${formatTime(obs.secondsPassed)}</td>
            </tr>
          `,
            ),
          )
          .join("")}
      </tbody>
    </table>
  </div>

  <div class="footer">
    Generated on ${new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })}
  </div>
</body>
</html>
  `;
}

// Main function to route to correct PDF generator
export function createPDF(type: string, report: ReportType): string {
  switch (type) {
    case "interval":
      return createIntervalPDF(report as IntervalReportType);
    case "counter":
      return createCounterPDF(report as CounterReportType);
    default:
      throw new Error(`Unknown report type: ${type}`);
  }
}

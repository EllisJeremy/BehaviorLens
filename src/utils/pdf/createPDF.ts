import {
  IntervalReportType,
  CounterReportType,
  BaseReportType,
  ReportType,
} from "@/src/types/reportsTypes";

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

  return `
    <div class="header">
      <h1>${report.name}</h1>
      <div class="meta">
        <strong>Observation Type:</strong> ${report.type === "interval" ? "Interval Recording" : "Frequency Counter"}<br>
        <strong>Date:</strong> ${formattedDate}<br>
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
    
    .legend {
      display: flex;
      gap: 20px;
      margin-top: 15px;
      font-size: 14px;
    }
    
    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .legend-color {
      width: 16px;
      height: 16px;
      border-radius: 3px;
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
    
    .pie-chart {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      margin: 20px auto;
    }
    
    .bar-container {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    
    .behavior-bar {
      margin: 15px 0;
    }
    
    .behavior-label {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
    }
    
    .bar-bg {
      background: #e0e0e0;
      height: 30px;
      border-radius: 15px;
      overflow: hidden;
      position: relative;
    }
    
    .bar-fill {
      background: linear-gradient(90deg, #2196F3, #1976D2);
      height: 100%;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 12px;
      color: white;
      font-weight: bold;
      font-size: 12px;
      transition: width 0.3s ease;
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

  const onTaskPercentage =
    completedObservations.length > 0
      ? ((onTaskCount / completedObservations.length) * 100).toFixed(1)
      : "0";

  const offTaskPercentage =
    completedObservations.length > 0
      ? ((offTaskCount / completedObservations.length) * 100).toFixed(1)
      : "0";

  const durationMinutes = Math.floor(
    (report.finalInterval * report.intervalSeconds) / 60,
  );

  const barWidth = 600 / report.finalInterval;
  const barChart = report.observations
    .map((obs, i) => {
      const color =
        obs.isOnTask === null
          ? "#9E9E9E"
          : obs.isOnTask
            ? "#4CAF50"
            : "#F44336";
      return `<rect x="${i * barWidth}" y="20" width="${barWidth - 2}" height="80" fill="${color}" rx="2"/>`;
    })
    .join("");

  const pieChartPercentage = parseFloat(onTaskPercentage);

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
      <div class="stat-label">On-Task Percentage</div>
      <div class="stat-value" style="color: #4CAF50;">${onTaskPercentage}%</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-label">Off-Task Percentage</div>
      <div class="stat-value" style="color: #F44336;">${offTaskPercentage}%</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-label">Duration</div>
      <div class="stat-value">${durationMinutes} min</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-label">Total Intervals</div>
      <div class="stat-value">${report.finalInterval}</div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Behavior Distribution</h2>
    <div class="pie-chart" style="background: conic-gradient(
      #4CAF50 0deg ${pieChartPercentage * 3.6}deg,
      #F44336 ${pieChartPercentage * 3.6}deg 360deg
    );"></div>
    <div class="legend" style="justify-content: center;">
      <div class="legend-item">
        <div class="legend-color" style="background: #4CAF50;"></div>
        <span>On-Task (${onTaskCount})</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: #F44336;"></div>
        <span>Off-Task (${offTaskCount})</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: #9E9E9E;"></div>
        <span>Skipped (${skippedCount})</span>
      </div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Interval Timeline</h2>
    <svg width="100%" height="120" viewBox="0 0 600 120">
      ${barChart}
    </svg>
    <div class="legend">
      <div class="legend-item">
        <div class="legend-color" style="background: #4CAF50;"></div>
        <span>On-Task</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: #F44336;"></div>
        <span>Off-Task</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: #9E9E9E;"></div>
        <span>Skipped</span>
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
          <th>Notes</th>
          <th>Time</th>
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
            const time = obs.timestamp
              ? new Date(obs.timestamp).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })
              : "-";

            return `
            <tr>
              <td><strong>#${index + 1}</strong></td>
              <td><span class="status-badge ${status}">${statusText}</span></td>
              <td>${obs.value || "-"}</td>
              <td>${time}</td>
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
    (sum, timestamps) => sum + timestamps.length,
    0,
  );

  // Calculate rate per minute
  const ratePerMinute =
    report.totalMins > 0
      ? (totalOccurrences / report.totalMins).toFixed(2)
      : "0";

  // Find max count for bar chart scaling
  const maxCount = Math.max(
    ...Object.values(report.counter).map((arr) => arr.length),
    1,
  );

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
      <div class="stat-label">Duration</div>
      <div class="stat-value">${report.totalMins} min</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-label">Rate Per Minute</div>
      <div class="stat-value">${ratePerMinute}</div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Behavior Frequency</h2>
    <div class="bar-container">
      ${behaviors
        .map((behavior) => {
          const count = report.counter[behavior].length;
          const percentage = (count / maxCount) * 100;

          return `
          <div class="behavior-bar">
            <div class="behavior-label">
              <span>${behavior}</span>
              <span>${count} occurrences</span>
            </div>
            <div class="bar-bg">
              <div class="bar-fill" style="width: ${percentage}%;">
                ${count}
              </div>
            </div>
          </div>
        `;
        })
        .join("")}
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Detailed Timestamps</h2>
    <table>
      <thead>
        <tr>
          <th>Behavior</th>
          <th>Occurrence #</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        ${behaviors
          .flatMap((behavior) =>
            report.counter[behavior].map(
              (timestamp, index) => `
            <tr>
              <td><strong>${behavior}</strong></td>
              <td>#${index + 1}</td>
              <td>${new Date(timestamp).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit",
              })}</td>
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

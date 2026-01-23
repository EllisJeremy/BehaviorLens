import { IntervalReportType } from "@/src/types/reportsTypes";

export function createIntervalPDF(report: IntervalReportType) {
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

  // Format date
  const date = new Date(report.startedAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  // Duration calculation
  const durationMinutes = Math.floor(
    (report.finalInterval * report.intervalSeconds) / 60,
  );

  // Create interval timeline data for graph
  const timelineData = report.observations.map((obs, index) => {
    const status =
      obs.isOnTask === null ? "skipped" : obs.isOnTask ? "on-task" : "off-task";
    return { interval: index + 1, status };
  });

  // Generate bar chart SVG
  const barWidth = 600 / report.finalInterval;
  const barChart = timelineData
    .map((data, i) => {
      const color =
        data.status === "on-task"
          ? "#4CAF50"
          : data.status === "off-task"
            ? "#F44336"
            : "#9E9E9E";
      return `<rect x="${i * barWidth}" y="20" width="${barWidth - 2}" height="80" fill="${color}" rx="2"/>`;
    })
    .join("");

  // Generate pie chart (simple approach with CSS conic-gradient)
  const pieChartPercentage = parseFloat(onTaskPercentage);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
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
    
    .chart-container {
      margin: 20px 0;
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
    
    .pie-chart {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background: conic-gradient(
        #4CAF50 0deg ${pieChartPercentage * 3.6}deg,
        #F44336 ${pieChartPercentage * 3.6}deg 360deg
      );
      margin: 20px auto;
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
    
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      text-align: center;
      color: #999;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${report.name}</h1>
    <div class="meta">
      <strong>Observation Type:</strong> interval Recording<br>
      <strong>Date:</strong> ${formattedDate}<br>
      <strong>Duration:</strong> ${durationMinutes} minutes (${report.finalInterval} intervals @ ${report.intervalSeconds}s each)
    </div>
  </div>

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
      <div class="stat-label">Completed Intervals</div>
      <div class="stat-value">${completedObservations.length}</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-label">Skipped Intervals</div>
      <div class="stat-value">${skippedCount}</div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Behavior Distribution</h2>
    <div class="pie-chart"></div>
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
    <h2 class="section-title">interval Timeline</h2>
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
          <th>interval</th>
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

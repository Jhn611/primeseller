import { chartBox } from './chartUtils.js';

export default function ChartGrid({ columns = 4, rows = 3, xLabelOffset = 13, xLabels, yLabelOffset = 9, yLabels }) {
  const columnCount = xLabels?.length || columns;
  const rowCount = yLabels?.length || rows;
  const horizontal = Array.from({ length: rowCount }, (_, index) =>
    chartBox.top + (chartBox.height / (rowCount - 1)) * index
  );
  const vertical = Array.from({ length: columnCount }, (_, index) =>
    chartBox.left + (chartBox.width / (columnCount - 1)) * index
  );

  return (
    <g className="feature-tabs__chart-grid">
      {horizontal.map((y) => (
        <line key={`h-${y}`} x1={chartBox.left} x2={chartBox.left + chartBox.width} y1={y} y2={y} />
      ))}
      {vertical.map((x) => (
        <line key={`v-${x}`} x1={x} x2={x} y1={chartBox.top} y2={chartBox.top + chartBox.height} />
      ))}
      {yLabels?.map((label, index) => (
        <text className="feature-tabs__chart-y-text" key={label} textAnchor="end" x={chartBox.left - yLabelOffset} y={horizontal[index] + 2.5}>
          {label}
        </text>
      ))}
      {xLabels?.map((label, index) => (
        <text className="feature-tabs__chart-x-text" key={label} textAnchor="middle" x={vertical[index]} y={chartBox.top + chartBox.height + xLabelOffset}>
          {label}
        </text>
      ))}
    </g>
  );
}

import { chartData } from '../data/charts.js';
import ChartFrame from './ChartFrame.jsx';
import ChartGrid from './ChartGrid.jsx';
import { chartBox, getDomainFromLabels, scale } from './chartUtils.js';

export default function DecisionChart({ tabId }) {
  const data = chartData.overlay[tabId] || chartData.overlay.sales;
  const [min, max] = getDomainFromLabels(data.decisionY, 0, Math.max(...data.decision));
  const baseY = chartBox.top + chartBox.height;
  const barWidth = 18;

  return (
    <ChartFrame title={data.decisionTitle}>
      <svg className="feature-tabs__decision-chart" viewBox="0 0 180 88">
        <ChartGrid xLabelOffset={16} xLabels={data.decisionLabels} yLabelOffset={13} yLabels={data.decisionY} />
        {data.decision.map((value, index) => {
          const x = scale(index, 0, data.decision.length - 1, chartBox.left, chartBox.left + chartBox.width);
          const y = scale(value, min, max, baseY, chartBox.top);

          return (
            <g className="feature-tabs__decision-bar" key={`${data.decisionLabels[index]}-${value}`}>
              <rect height={baseY - y} rx="5" width={barWidth} x={x - barWidth / 2} y={y} />
              <text x={x} y={Math.max(chartBox.top + 7, y - 8)}>{value}</text>
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
}

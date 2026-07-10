import { chartData, chartDates } from '../data/charts.js';
import ChartFrame from './ChartFrame.jsx';
import ChartGrid from './ChartGrid.jsx';
import { getDomainFromLabels, getPoint, toAreaPath, toPolyline } from './chartUtils.js';

export default function SignalChart({ tabId }) {
  const data = chartData.overlay[tabId] || chartData.overlay.sales;
  const [min, max] = getDomainFromLabels(data.signalY, Math.min(0, ...data.signal), Math.max(...data.signal));

  return (
    <ChartFrame title={data.signalTitle}>
      <svg className="feature-tabs__signal-chart" viewBox="0 0 180 88">
        <ChartGrid xLabels={chartDates} yLabels={data.signalY} />
        <path className="feature-tabs__signal-fill" d={toAreaPath(data.signal, min, max)} />
        <polyline className="feature-tabs__signal-line" points={toPolyline(data.signal, min, max)} />
        {data.signal.map((value, index) => {
          const point = getPoint(value, index, data.signal, min, max);

          return <circle className="feature-tabs__signal-dot" cx={point.x} cy={point.y} key={`${value}-${index}`} r={index === data.signal.length - 1 ? 3.8 : 2.4} />;
        })}
      </svg>
    </ChartFrame>
  );
}

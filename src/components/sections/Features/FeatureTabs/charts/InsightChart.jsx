import { chartData } from '../data/charts.js';
import ChartFrame from './ChartFrame.jsx';
import ChartGrid from './ChartGrid.jsx';
import { chartBox, getDomainFromLabels, getPoint, scale, toAreaPath, toPolyline, toStepPath } from './chartUtils.js';

export default function InsightChart({ insight }) {
  if (insight.type === 'heatmap') {
    return <HeatmapChart />;
  }

  if (insight.type === 'donut') {
    return <DonutChart />;
  }

  if (insight.type === 'scatter') {
    return <ScatterChart />;
  }

  if (insight.type === 'funnel') {
    return <FunnelChart />;
  }

  if (insight.type === 'step') {
    return <StepChart />;
  }

  return <AreaChart />;
}

function HeatmapChart() {
  const data = chartData.heatmap;
  const max = Math.max(...data.values.flat());

  return (
    <ChartFrame title="Риск out-of-stock">
      <svg className="feature-tabs__heatmap-chart" viewBox="0 0 184 96">
        {data.rows.map((row, rowIndex) => (
          <text className="feature-tabs__chart-axis-text" key={row} x="6" y={27 + rowIndex * 17}>{row}</text>
        ))}
        {data.labels.map((label, columnIndex) => (
          <text className="feature-tabs__chart-x-text" key={label} textAnchor="middle" x={58 + columnIndex * 32} y="90">{label}</text>
        ))}
        {data.values.flatMap((row, rowIndex) =>
          row.map((value, columnIndex) => (
            <rect
              className="feature-tabs__heat-cell"
              height="13"
              key={`${rowIndex}-${columnIndex}`}
              rx="3"
              style={{ opacity: 0.18 + (value / max) * 0.82 }}
              width="28"
              x={44 + columnIndex * 32}
              y={17 + rowIndex * 17}
            />
          ))
        )}
      </svg>
    </ChartFrame>
  );
}

function DonutChart() {
  const data = chartData.donut;
  let offset = 0;

  return (
    <ChartFrame title="Структура затрат">
      <svg className="feature-tabs__donut" viewBox="0 0 184 96">
        <circle className="feature-tabs__donut-base" cx="49" cy="45" r="27" pathLength="100" />
        {data.values.map((value, index) => {
          const dashOffset = -offset;

          offset += value;

          return (
            <circle
              className={`feature-tabs__donut-part feature-tabs__donut-part--${index + 1}`}
              cx="49"
              cy="45"
              key={data.labels[index]}
              pathLength="100"
              r="27"
              style={{ strokeDasharray: `${value} ${100 - value}`, strokeDashoffset: dashOffset }}
            />
          );
        })}
        {data.values.map((value, index) => (
          <g className="feature-tabs__donut-legend" key={data.labels[index]}>
            <rect height="5" rx="2" width="14" x="94" y={22 + index * 16} />
            <text x="114" y={27 + index * 16}>{data.labels[index]} {value}%</text>
          </g>
        ))}
      </svg>
    </ChartFrame>
  );
}

function ScatterChart() {
  const data = chartData.scatter;
  const xValues = data.points.map((point) => point.x);
  const yValues = data.points.map((point) => point.y);
  const minX = Math.min(...xValues) - 1;
  const maxX = Math.max(...xValues) + 1;
  const [minY, maxY] = getDomainFromLabels(data.yLabels, 0, Math.max(...yValues) + 0.8);

  return (
    <ChartFrame title="ROAS / ДРР">
      <svg className="feature-tabs__scatter" viewBox="0 0 180 88">
        <ChartGrid xLabels={data.labels} yLabels={data.yLabels} />
        <line
          className="feature-tabs__trend-line"
          x1={chartBox.left}
          x2={chartBox.left + chartBox.width}
          y1={scale(1.9, minY, maxY, chartBox.top + chartBox.height, chartBox.top)}
          y2={scale(5.3, minY, maxY, chartBox.top + chartBox.height, chartBox.top)}
        />
        {data.points.map((point) => {
          const x = scale(point.x, minX, maxX, chartBox.left, chartBox.left + chartBox.width);
          const y = scale(point.y, minY, maxY, chartBox.top + chartBox.height, chartBox.top);

          return (
            <g className="feature-tabs__scatter-point" key={point.label}>
              <circle cx={x} cy={y} r={point.y < 2.2 ? 4 : 5} />
              {point.y < 2.2 ? <text x={x + 6} y={y + 3}>risk</text> : null}
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
}

function FunnelChart() {
  const data = chartData.funnel;
  const max = Math.max(...data.values);

  return (
    <ChartFrame title="План закупки">
      <svg className="feature-tabs__funnel-chart" viewBox="0 0 184 96">
        {data.values.map((value, index) => {
          const width = scale(value, 0, max, 34, 132);
          const x = 92 - width / 2;

          return (
              <g className="feature-tabs__funnel-row" key={data.labels[index]}>
                <rect height="12" rx="6" width={width} x={x} y={18 + index * 17} />
                <text x="92" y={27 + index * 17}>{value}</text>
                <text className="feature-tabs__chart-axis-text" x="8" y={27 + index * 17}>{data.labels[index]}</text>
              </g>
            );
        })}
      </svg>
    </ChartFrame>
  );
}

function StepChart() {
  const data = chartData.step;
  const [min, max] = getDomainFromLabels(data.yLabels, 80, 112);

  return (
    <ChartFrame title="Цена / спрос">
      <svg className="feature-tabs__step-chart" viewBox="0 0 180 88">
        <ChartGrid xLabels={data.labels} yLabels={data.yLabels} />
        <path className="feature-tabs__step-price" d={toStepPath(data.price, min, max)} />
        <polyline className="feature-tabs__step-demand" points={toPolyline(data.demand, min, max)} />
        {data.price.map((value, index) => {
          const point = getPoint(value, index, data.price, min, max);

          return <circle key={`${value}-${index}`} cx={point.x} cy={point.y} r="3" />;
        })}
      </svg>
    </ChartFrame>
  );
}

function AreaChart() {
  const data = chartData.area;
  const [min, max] = getDomainFromLabels(data.yLabels, 0, 500);

  return (
    <ChartFrame title="Выручка за день">
      <svg className="feature-tabs__area-chart" viewBox="0 0 180 88">
        <defs>
          <linearGradient id="feature-area-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.46" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ChartGrid xLabels={data.labels} yLabels={data.yLabels} />
        {data.values.map((value, index) => {
          const point = getPoint(value, index, data.values, min, max);

          return (
            <line
              className="feature-tabs__area-bar"
              key={`${value}-${index}`}
              x1={point.x}
              x2={point.x}
              y1={chartBox.top + chartBox.height}
              y2={point.y}
            />
          );
        })}
        <path className="feature-tabs__area-fill" d={toAreaPath(data.values, min, max)} />
        <polyline className="feature-tabs__area-line" points={toPolyline(data.values, min, max)} />
      </svg>
    </ChartFrame>
  );
}

export const chartBox = {
  left: 42,
  top: 12,
  width: 122,
  height: 56
};

export function scale(value, min, max, start, end) {
  if (max === min) {
    return start;
  }

  return start + ((value - min) / (max - min)) * (end - start);
}

export function getDomainFromLabels(labels, fallbackMin, fallbackMax) {
  const values = labels
    ?.map((label) => {
      const match = String(label).replace(',', '.').match(/-?\d+(?:\.\d+)?/);

      return match ? Number(match[0]) : null;
    })
    .filter((value) => Number.isFinite(value));

  if (!values || values.length < 2) {
    return [fallbackMin, fallbackMax];
  }

  return [values[values.length - 1], values[0]];
}

export function getPoint(value, index, values, min, max) {
  return {
    x: scale(index, 0, values.length - 1, chartBox.left, chartBox.left + chartBox.width),
    y: scale(value, min, max, chartBox.top + chartBox.height, chartBox.top)
  };
}

export function toPolyline(values, min, max) {
  return values
    .map((value, index) => {
      const point = getPoint(value, index, values, min, max);

      return `${point.x.toFixed(1)},${point.y.toFixed(1)}`;
    })
    .join(' ');
}

export function toAreaPath(values, min, max) {
  const points = values.map((value, index) => getPoint(value, index, values, min, max));
  const line = points.map((point) => `${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join('L');
  const baseY = chartBox.top + chartBox.height;

  return `M${points[0].x.toFixed(1)} ${baseY}L${line}L${points[points.length - 1].x.toFixed(1)} ${baseY}Z`;
}

export function toStepPath(values, min, max) {
  const points = values.map((value, index) => getPoint(value, index, values, min, max));

  return points.reduce((path, point, index) => {
    if (index === 0) {
      return `M${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
    }

    return `${path}H${point.x.toFixed(1)}V${point.y.toFixed(1)}`;
  }, '');
}

export default function ChartFrame({ children, title, variant }) {
  return (
    <div className={variant ? `feature-tabs__chart-card feature-tabs__chart-card--${variant}` : 'feature-tabs__chart-card'} aria-hidden="true">
      <div className="feature-tabs__chart-title">{title}</div>
      <div className="feature-tabs__chart-body">{children}</div>
    </div>
  );
}

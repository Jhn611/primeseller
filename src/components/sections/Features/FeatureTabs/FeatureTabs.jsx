import { useMemo, useState } from 'react';
import DecisionChart from './charts/DecisionChart.jsx';
import InsightChart from './charts/InsightChart.jsx';
import SignalChart from './charts/SignalChart.jsx';
import { tabs } from './data/tabs.js';
import './FeatureTabs.css';

export default function FeatureTabs() {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const activeTab = useMemo(() => tabs.find((tab) => tab.id === activeId) || tabs[0], [activeId]);
  const ActiveIcon = activeTab.icon;

  return (
    <div className="feature-tabs">
      <div className="feature-tabs__nav" role="tablist" aria-label="Листы аналитики">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = tab.id === activeId;

          return (
            <button
              aria-selected={active}
              className={active ? 'feature-tabs__tab feature-tabs__tab--active' : 'feature-tabs__tab'}
              key={tab.id}
              onClick={() => setActiveId(tab.id)}
              role="tab"
              type="button"
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className={`feature-tabs__stage feature-tabs__stage--${activeTab.id}`}>
        <aside className="feature-tabs__note feature-tabs__note--left">
          <span>Сигнал</span>
          <strong>{activeTab.metrics[0]}</strong>
          <SignalChart tabId={activeTab.id} />
        </aside>

        <aside className="feature-tabs__note feature-tabs__note--right">
          <span>Решение</span>
          <strong>{activeTab.metrics[1]}</strong>
          <DecisionChart tabId={activeTab.id} />
        </aside>

        <article className="feature-tabs__screener" role="tabpanel">
          <div className="feature-tabs__screener-top">
            <div>
              <span>{activeTab.label}</span>
              <h3>{activeTab.title}</h3>
            </div>
            <div className="feature-tabs__badge">
              <ActiveIcon size={18} />
              AI лист
            </div>
          </div>

          <p>{activeTab.text}</p>

          <div className="feature-tabs__metrics">
            {activeTab.metrics.map((metric) => (
              <span key={metric}>{metric}</span>
            ))}
          </div>

          <div className="feature-tabs__table" aria-label={`Таблица: ${activeTab.title}`}>
            <div className="feature-tabs__row feature-tabs__row--head">
              <span>Позиция</span>
              <span>Показатель</span>
              <span>Динамика</span>
              <span>Действие</span>
            </div>
            {activeTab.rows.map((row) => (
              <div className="feature-tabs__row" key={row.join('-')}>
                {row.map((cell) => (
                  <span key={cell}>{cell}</span>
                ))}
              </div>
            ))}
          </div>
        </article>

        <aside className="feature-tabs__note feature-tabs__note--bottom">
          <span>AI вывод</span>
          <strong>{activeTab.metrics[2]}</strong>
        </aside>

        <aside className="feature-tabs__note feature-tabs__note--extra">
          <span>{activeTab.insight.label}</span>
          <strong>{activeTab.insight.value}</strong>
          <p>{activeTab.insight.text}</p>
          <InsightChart insight={activeTab.insight} />
        </aside>
      </div>
    </div>
  );
}

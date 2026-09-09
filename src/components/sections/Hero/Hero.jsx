import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Bot, LineChart, Sparkles } from 'lucide-react';
import './Hero.css';

const tableHead = ['Артикул', 'Выручка', 'Маржа', 'AI сигнал'];

const products = [
  { name: 'Платье PS-41', revenue: 1248900, margin: 31, signal: 'Поднять цену' },
  { name: 'Топ PS-12', revenue: 806400, margin: 24, signal: 'Дозаказ 470 шт' },
  { name: 'Костюм PS-09', revenue: 642100, margin: 18, signal: 'Проверить рекламу' }
];

const chartBars = [
  { min: 34, max: 68, start: 46 },
  { min: 50, max: 88, start: 68 },
  { min: 38, max: 76, start: 54 },
  { min: 62, max: 98, start: 82 },
  { min: 52, max: 92, start: 74 },
  { min: 68, max: 100, start: 92 }
];

const getChartValues = () =>
  chartBars.map(({ min, max }) => Math.round(min + Math.random() * (max - min)));

const formatRub = (value) => `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;

const formatPercent = (value) => `${value.toFixed(1).replace('.', ',')}%`;

function useSteppedNumber(target, { interval = 24, maxDuration = 900, precision = 0, step = 1 } = {}) {
  const scale = 10 ** precision;
  const targetValue = Math.round(target * scale);
  const stepValue = Math.max(1, Math.round(step * scale));
  const [value, setValue] = useState(target);
  const valueRef = useRef(targetValue);

  useEffect(() => {
    const startValue = valueRef.current;
    const distance = targetValue - startValue;

    if (distance === 0) {
      setValue(targetValue / scale);
      return undefined;
    }

    const ticks = Math.max(1, Math.ceil(maxDuration / interval));
    const animatedStep = Math.max(stepValue, Math.ceil(Math.abs(distance) / ticks));

    const intervalId = window.setInterval(() => {
      const current = valueRef.current;
      const currentDistance = targetValue - current;

      if (currentDistance === 0) {
        window.clearInterval(intervalId);
        return;
      }

      const next = current + Math.sign(currentDistance) * Math.min(Math.abs(currentDistance), animatedStep);

      valueRef.current = next;
      setValue(next / scale);
    }, interval);

    return () => window.clearInterval(intervalId);
  }, [interval, maxDuration, scale, stepValue, targetValue]);

  return value;
}

function AnimatedNumber({ formatter, interval, precision, step, target }) {
  const value = useSteppedNumber(target, { interval, precision, step });

  return formatter(value);
}

export default function Hero() {
  const [chartValues, setChartValues] = useState(() => chartBars.map((bar) => bar.start));

  const panelGrowth = useMemo(() => {
    const average = chartValues.reduce((sum, value) => sum + value, 0) / chartValues.length;

    return 6 + average * 0.18;
  }, [chartValues]);

  const tableRows = useMemo(() => {
    return products.map((product, index) => {
      const value = chartValues[index * 2] || chartValues[index] || 0;
      const baseValue = chartBars[index * 2]?.start || chartBars[index]?.start || value;
      const revenueRate = 1 + (value - baseValue) / 220;
      const marginDelta = Math.round((value - baseValue) / 8);

      return {
        margin: Math.max(12, product.margin + marginDelta),
        name: product.name,
        revenue: Math.round(product.revenue * revenueRate),
        signal: product.signal
      };
    });
  }, [chartValues]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setChartValues(getChartValues());
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="hero">
      <div className="section-shell hero__grid">
        <div className="hero__content glass-panel">
          <span className="eyebrow">Оцифровка Wildberries</span>
          <h1>Prime Seller</h1>
          <p>
            Более удобное представление данных селлера, чем в кабинете WB:
            дополнительные листы, понятные отчеты и AI-анализ для верных решений по продажам.
          </p>
          <div className="hero__buttons">
            <a className="primary-button" href="#pricing">
              <span>Смотреть тарифы</span>
              <ArrowRight size={19} />
            </a>
            <a className="secondary-button" href="#video">
              <span>Видео обзор</span>
            </a>
          </div>
          <div className="hero__stats" aria-label="Ключевые показатели">
            <span><strong>19</strong> листов</span>
            <span><strong>24/7</strong> AI-подсказки</span>
            <span><strong>3 мин</strong> до старта</span>
          </div>
        </div>

        <div className="hero__visual" aria-label="Демо интерфейса Prime Seller">
          <div className="hero__panel hero__panel--main">
            <div className="hero__panel-top">
              <div>
                <span>Сводка продаж</span>
                <strong>
                  +<AnimatedNumber formatter={formatPercent} maxDuration={950} precision={1} step={0.1} target={panelGrowth} /> за неделю
                </strong>
              </div>
              <LineChart size={24} />
            </div>
            <div className="hero__chart">
              {chartValues.map((value, index) => (
                <span
                  key={chartBars[index].start}
                  style={{ height: `${value}%` }}
                />
              ))}
            </div>
            <div className="hero__table">
              <div className="hero__table-row hero__table-row--head">
                {tableHead.map((cell) => (
                  <span key={cell}>{cell}</span>
                ))}
              </div>
              {tableRows.map((row) => (
                <div className="hero__table-row" key={row.name}>
                  <span>{row.name}</span>
                  <span>
                    <AnimatedNumber formatter={formatRub} interval={18} maxDuration={950} step={1000} target={row.revenue} />
                  </span>
                  <span>
                    <AnimatedNumber formatter={(value) => `${Math.round(value)}%`} interval={44} maxDuration={850} target={row.margin} />
                  </span>
                  <span>{row.signal}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero__panel hero__panel--ai glass-chip">
            <Bot size={22} />
            <div>
              <span>ИИ заметил</span>
              <strong>Маржа падает из-за роста логистики на 7%</strong>
            </div>
          </div>
          <div className="hero__panel hero__panel--spark glass-chip">
            <Sparkles size={22} />
            <span>Авто-рекомендации по закупке</span>
          </div>
        </div>
      </div>
    </section>
  );
}

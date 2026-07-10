import { useState } from 'react';
import { BarChart3, Bot, Boxes, Building2, ClipboardList, LineChart, Megaphone, ShieldCheck, Target } from 'lucide-react';
import './Pricing.css';

const plans = [
  {
    size: 'S',
    turnoverLabel: 'Оборот до',
    turnover: '500 000 ₽',
    monthlyPrice: 3990,
    action: 'Выбрать тариф'
  },
  {
    size: 'M',
    turnoverLabel: 'Оборот до',
    turnover: '1 500 000 ₽',
    monthlyPrice: 6990,
    action: 'Выбрать тариф'
  },
  {
    size: 'L',
    turnoverLabel: 'Оборот до',
    turnover: '3 000 000 ₽',
    monthlyPrice: 9990,
    action: 'Выбрать тариф',
    popular: true
  },
  {
    size: 'XL',
    turnoverLabel: 'Оборот до',
    turnover: '7 000 000 ₽',
    monthlyPrice: 14990,
    action: 'Выбрать тариф'
  },
  {
    size: 'XXL',
    turnoverLabel: 'Оборот до',
    turnover: '15 000 000 ₽',
    monthlyPrice: 19990,
    action: 'Выбрать тариф'
  },
  {
    size: 'Enterprise',
    turnoverLabel: 'Оборот от',
    turnover: '15 000 000 ₽',
    price: 'Индивидуально',
    action: 'Связаться с нами',
    enterprise: true
  }
];

const sharedFeatures = [
  ['Дашборд', BarChart3],
  ['РНП', ShieldCheck],
  ['ОПИУ', ClipboardList],
  ['ABC-анализ', LineChart],
  ['UNIT-экономика', Target],
  ['Реклама', Megaphone],
  ['Остатки', Boxes],
  ['AI-рекомендации', Bot]
];

const durations = [
  { value: 1, label: '1 месяц', discount: 0 },
  { value: 3, label: '3 месяца', discount: 10 },
  { value: 6, label: '6 месяцев', discount: 20 },
  { value: 12, label: '12 месяцев', discount: 30 }
];

const formatPrice = (value) => `${value.toLocaleString('ru-RU')} ₽`;

export default function Pricing() {
  const [selectedDuration, setSelectedDuration] = useState(durations[0].value);
  const selectedDurationOption = durations.find((duration) => duration.value === selectedDuration) || durations[0];
  const selectedDurationLabel = selectedDurationOption.label;
  const discountMultiplier = (100 - selectedDurationOption.discount) / 100;

  return (
    <section className="pricing" id="pricing">
      <div className="section-shell">
        <div className="pricing__intro">
          <span className="pricing__pill">Тарифы</span>
          <h2>Один функционал для всех - разные тарифы по обороту</h2>
          <p>Выберите тариф по вашему месячному обороту</p>
        </div>

        <div className="pricing__duration" aria-label="Выбор периода оплаты">
          {durations.map((duration) => (
            <button
              className={selectedDuration === duration.value ? 'pricing__duration-button pricing__duration-button--active' : 'pricing__duration-button'}
              key={duration.value}
              onClick={() => setSelectedDuration(duration.value)}
              type="button"
            >
              <span>{duration.label}</span>
              {duration.discount > 0 && <small>-{duration.discount}%</small>}
            </button>
          ))}
        </div>

        <div className="pricing__grid">
          {plans.filter((plan) => !plan.enterprise).map((plan) => (
            <article className={plan.popular ? 'pricing__card pricing__card--popular' : 'pricing__card'} key={plan.size}>
              {plan.popular && <span className="pricing__badge">Популярно</span>}
              <div className="pricing__head">
                <h3>{plan.size}</h3>
                <span>{plan.turnoverLabel}</span>
              </div>
              <strong className="pricing__turnover">{plan.turnover}</strong>
              <div className="pricing__line" />
              <div className="pricing__price-group">
                {selectedDurationOption.discount > 0 && (
                  <span className="pricing__old-price">{formatPrice(plan.monthlyPrice * selectedDuration)}</span>
                )}
                <strong className="pricing__price">
                  {formatPrice(Math.round(plan.monthlyPrice * selectedDuration * discountMultiplier))}
                </strong>
              </div>
              <span className="pricing__monthly">за {selectedDurationLabel}</span>
              <a className="secondary-button" href="#footer">
                <span>{plan.action}</span>
              </a>
            </article>
          ))}
        </div>

        {plans.filter((plan) => plan.enterprise).map((plan) => (
          <article className="pricing__enterprise" key={plan.size}>
            <div className="pricing__enterprise-head">
              <Building2 size={30} />
              <div>
                <h3>{plan.size}</h3>
                <span>{plan.turnoverLabel}</span>
              </div>
            </div>
            <strong className="pricing__turnover">{plan.turnover}</strong>
            <span className="pricing__monthly">{plan.price}</span>
            <a className="secondary-button" href="#footer">
              <span>{plan.action}</span>
            </a>
          </article>
        ))}

        <div className="pricing__shared">
          <ul>
            {sharedFeatures.map(([feature, Icon]) => (
              <li key={feature}><Icon size={22} /> {feature}</li>
            ))}
          </ul>
          <p>Все функции доступны на каждом тарифе. Отличается только цена в зависимости от оборота.</p>
        </div>
      </div>
    </section>
  );
}

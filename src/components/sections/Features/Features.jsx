import FeatureTabs from './FeatureTabs/FeatureTabs.jsx';
import './Features.css';

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="features__motion-bg" aria-hidden="true">
        <span className="features__beam features__beam--one" />
        <span className="features__beam features__beam--two" />
        {/* <span className="features__beam features__beam--three" />
        <span className="features__beam features__beam--four" /> */}
      </div>
      <div className="section-shell">
        <div className='section-header glass-panel'>
          <span className="eyebrow">Преимущества</span>
          <h2 className="section-title">Каждый лист отвечает за конкретное решение</h2>
          <p className="section-lead">
            Prime Seller раскладывает данные WB на рабочие листы, где сразу видно, что делать с товаром, деньгами и рекламой.
          </p>
        </div>

        <FeatureTabs />
      </div>
    </section>
  );
}

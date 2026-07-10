import { Quote, Star } from 'lucide-react';
import './Testimonials.css';

const reviews = [
  {
    initials: 'МП',
    name: 'Марина П.',
    role: 'Fashion seller',
    metric: '-6 часов в неделю',
    text: 'Раньше сводила WB руками по вечерам. Теперь вижу, где деньги зависли в остатках, и что реально стоит продвигать.'
  },
  {
    initials: 'ИК',
    name: 'Илья К.',
    role: 'Товары для дома',
    metric: '+18% к марже',
    text: 'Самое ценное - AI-пояснения. Не просто график упал, а почему упал и какой шаг сделать завтра.'
  },
  {
    initials: 'АС',
    name: 'Алена С.',
    role: 'Бренд одежды',
    metric: '1 отчет для команды',
    text: 'Отчеты стали понятными для всей команды: закупка, маркетинг и финансы смотрят одну картину.'
  }
];

export default function Testimonials() {
  const [featuredReview, ...secondaryReviews] = reviews;

  return (
    <section className="testimonials" id="testimonials">
      <div className="section-shell">
        <div className="testimonials__header">
          <div>
            <span className="eyebrow">Отзывы</span>
            <h2 className="section-title">Селлеры любят, когда цифры становятся понятными</h2>
          </div>
          <div className="testimonials__summary" aria-label="Средняя оценка сервиса">
            <strong>4.9</strong>
            <span>средняя оценка по интервью с селлерами</span>
          </div>
        </div>

        <div className="testimonials__layout">
          <article className="testimonials__card testimonials__card--featured">
            <div className="testimonials__rating" aria-label="Оценка 5 из 5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star fill="currentColor" key={index} size={16} />
              ))}
            </div>
            <Quote className="testimonials__quote" size={32} />
            <p>{featuredReview.text}</p>
            <div className="testimonials__author">
              <span className="testimonials__avatar">{featuredReview.initials}</span>
              <div>
                <strong>{featuredReview.name}</strong>
                <small>{featuredReview.role}</small>
              </div>
              <em>{featuredReview.metric}</em>
            </div>
          </article>

          <div className="testimonials__stack">
            {secondaryReviews.map((review) => (
              <article className="testimonials__card" key={review.name}>
                <div className="testimonials__card-top">
                  <span className="testimonials__avatar">{review.initials}</span>
                  <em>{review.metric}</em>
                </div>
                <p>{review.text}</p>
                <div className="testimonials__author testimonials__author--compact">
                  <div>
                    <strong>{review.name}</strong>
                    <small>{review.role}</small>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

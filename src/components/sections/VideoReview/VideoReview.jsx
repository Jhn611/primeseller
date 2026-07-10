import { Play, ScanSearch } from 'lucide-react';
import './VideoReview.css';

export default function VideoReview() {
  return (
    <section className="video-review" id="video">
      <div className="section-shell video-review__grid">
        <div>
          <span className="eyebrow">Видео обзор</span>
          <h2 className="section-title">Покажите командe цифры так, чтобы их сразу поняли</h2>
          <p className="section-lead">
            В одном обзоре видно продажи, остатки, рекламу, маржинальность и причины изменений. Без прыжков между вкладками личного кабинета.
          </p>
        </div>
        <div className="video-review__player" aria-label="Видео обзор сервиса">
          <button className="video-review__play" aria-label="Смотреть видео обзор">
            <Play size={34} fill="currentColor" />
          </button>
          <div className="video-review__screen">
            <div className="video-review__scan"><ScanSearch size={22} /> AI анализирует SKU</div>
            <div className="video-review__line video-review__line--wide" />
            <div className="video-review__line" />
            <div className="video-review__cards">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

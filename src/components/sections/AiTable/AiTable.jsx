import { Bot, MessageSquareText, WandSparkles } from 'lucide-react';
import './AiTable.css';

const rows = [
  ['Топ PS-12', '24%', '470 шт', 'Закупить до 12 июня'],
  ['Платье PS-41', '31%', '150 шт', 'Поднять цену на 4%'],
  ['Костюм PS-09', '18%', '620 шт', 'Снизить рекламу']
];

export default function AiTable() {
  return (
    <section className="ai-table" id="ai">
      <div className="section-shell ai-table__grid">
        <div className="ai-table__mock">
          <div className="ai-table__toolbar">
            <span><Bot size={18} /> AI в таблице</span>
            <button aria-label="Сгенерировать вывод"><WandSparkles size={18} /></button>
          </div>
          <div className="ai-table__sheet">
            <div className="ai-table__row ai-table__row--head">
              <span>SKU</span><span>Маржа</span><span>Остаток</span><span>Рекомендация</span>
            </div>
            {rows.map((row) => (
              <div className="ai-table__row" key={row[0]}>
                {row.map((cell) => <span key={cell}>{cell}</span>)}
              </div>
            ))}
          </div>
          <div className="ai-table__chat">
            <MessageSquareText size={20} />
            <p>Почему упала прибыль за неделю?</p>
            <strong>Логистика выросла на 7%, а реклама по 3 SKU вышла за целевой ДРР.</strong>
          </div>
        </div>

        <div className="ai-table__content">
          <span className="eyebrow">ИИ в таблице</span>
          <h2 className="section-title">ИИ объясняет цифры человеческим языком</h2>
          <p className="section-lead">
            Сервис не просто показывает данные. Он анализирует отклонения, подсвечивает причины и предлагает следующие действия для принятия решений.
          </p>
          <div className="ai-table__chips">
            <span>Причины падения</span>
            <span>Прогноз закупки</span>
            <span>Идеи по цене</span>
            <span>Контроль ДРР</span>
          </div>
        </div>
      </div>
    </section>
  );
}

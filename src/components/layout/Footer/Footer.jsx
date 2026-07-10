import { Mail, Send } from 'lucide-react';
import logo from '../../../assets/prime-seller-logo.svg';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="section-shell footer__grid">
        <div>
          <a className="footer__brand" href="#top">
            <span><img src={logo} alt="" /></span>
            Prime Seller
          </a>
          <p>Оцифровка Wildberries, отчеты и AI-анализ для селлеров, которые принимают решения по данным.</p>
        </div>

        <div className="footer__contacts">
          <a href="mailto:hello@primeseller.ru"><Mail size={18} /> hello@primeseller.ru</a>
          <a href="https://t.me/" target="_blank" rel="noreferrer"><Send size={18} /> Telegram</a>
        </div>
      </div>
    </footer>
  );
}

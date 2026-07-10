import logo from '../../../assets/prime-seller-logo.svg';
import BurgerMenu from './BurgerMenu.jsx';
import './Header.css';

const links = [
  ['Тарифы', '#pricing'],
  ['Обзор', '#video'],
  ['Отзывы', '#testimonials'],
  ['Фишки', '#features'],
  ['ИИ', '#ai']
];

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <a className="header__brand" href="#top" aria-label="Prime Seller">
          <span className="header__logo">
            <img src={logo} alt="" />
          </span>
          <span>Prime Seller</span>
        </a>

        <nav className="header__nav" aria-label="Навигация">
          {links.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <a className="header__action" href="#pricing">
          <span>Начать</span>
        </a>

        <BurgerMenu links={links} />
      </div>
    </header>
  );
}

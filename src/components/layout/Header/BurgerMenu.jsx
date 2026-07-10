import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './BurgerMenu.css';

export default function BurgerMenu({ links }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const menuLayer = (
    <div className={isOpen ? 'burger-menu__layer burger-menu__layer--open' : 'burger-menu__layer'}>
      <button
        aria-hidden={!isOpen}
        aria-label="Закрыть меню"
        className="burger-menu__backdrop"
        onClick={closeMenu}
        tabIndex={isOpen ? 0 : -1}
        type="button"
      />

      <nav
        aria-hidden={!isOpen}
        aria-label="Мобильная навигация"
        className="burger-menu__panel"
        id="mobile-navigation"
      >
        {links.map(([label, href]) => (
          <a href={href} key={href} onClick={closeMenu} tabIndex={isOpen ? 0 : -1}>
            {label}
          </a>
        ))}
        <a className="burger-menu__action" href="#pricing" onClick={closeMenu} tabIndex={isOpen ? 0 : -1}>
          Начать
        </a>
      </nav>
    </div>
  );

  return (
    <div className={isOpen ? 'burger-menu burger-menu--open' : 'burger-menu'}>
      <button
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
        className="burger-menu__button"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span className="burger-menu__button-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      {createPortal(menuLayer, document.body)}
    </div>
  );
}

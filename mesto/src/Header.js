import logo from './logo.svg';

import logoMesto from '../images/Logo_mesto.svg';

function Header() {
  return (
    <header className="header">
    <img className="header__logo" src={logoMesto} alt="логотип место россия" /> //

    <img className="header__logo" src="<%=require('./images/logo-Vector.png')%>" alt="логотип приложения Место" />
  </header>
  );
}

export default Header;
import headerLogo from '../images/logo-Vector.png';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="логотип приложения Место" />
    </header>
  );
}

export default Header;
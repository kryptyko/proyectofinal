
const Navbar = () => {
  return (
    <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span> 
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item" href="/">
            Inicio
          </a>
          <a className="navbar-item" href="/contacto">
            Contacto
          </a>
          <a className="navbar-item" href="/login">
            Login
          </a>
          <a className="navbar-item" href="/register">
            Registrarse
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
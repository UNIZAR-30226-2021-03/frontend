import React, { useState } from 'react';
import { NavbarItems } from './NavbarItems';
import { Link } from 'react-router-dom';
import './Navbar.css';

//Navbar con menú para vista desde web browser móvil:
//Fas fa-times y fa-bars iconos exportados desde fontawesome, ver index.html
//Línea 20 alterna la vista del ícono en función de si el menú esta abierto o no.

// TODO navbar en modviles pequeños (cambiar a mejor)

function Navbar() {

  // TODO se necesita un estado disponible desde todas partes para indicar si el usuario esta logeado?
  const [clicked, setClicked] = useState(false);
  const handleClick = () => setClicked(!clicked);
  //const closeMobileMenu = () => setClicked(false);

  const [userLogged, setUserLogged] = useState(false);

  //const handleTest = () => setUserLogged(true);

  const handleSignOut = () => setUserLogged(false);

  const mainLink = userLogged ? '/home' : '/'

  return (
    <>
      <nav className='navbar'>

        <Link to={mainLink} className="navbar-logo">
          <i class="fas fa-key navbar-logo-icon"></i>
          <div className="navbar-logo-name">
            KeyPaX
          </div>
        </Link>

        <div className='menu-icon' onClick={handleClick}>
          <i className={clicked ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
          {NavbarItems.map((item, index) => {
            if (item.showLoggedUser === userLogged) {
              if (item.url === '' && item.clickBehav === 'handleSignOut') {
                return (
                  <li>
                    <a className={item.cName} href={'/'} onClick={handleSignOut}>
                      {item.title}
                    </a>
                  </li>
                )
              } else {
                return (
                  <li>
                    <a className={item.cName} href={item.url}>
                      {item.title}
                    </a>
                  </li>
                )
              }
            } else {
              return (<></>)
            }
          })}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;

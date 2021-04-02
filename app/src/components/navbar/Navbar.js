import React, { useState } from 'react';
import { NavbarItems } from './NavbarItems';
import { Link } from 'react-router-dom';
import './Navbar.css';

//Navbar con menú para vista desde web browser móvil:
//Fas fa-times y fa-bars iconos exportados desde fontawesome, ver index.html
//Línea 20 alterna la vista del ícono en función de si el menú esta abierto o no.

function Navbar() {

  const [clicked, setClicked] = useState(false);
  const handleClick = () => setClicked(!clicked);
  const closeMobileMenu = () => setClicked(false);

  const [userLogged, setUserLogged] = useState(false);

  const handleTest = () => setUserLogged(true);

  const handleSignOut = () => setUserLogged(false);

  return (
    <>
      <nav className='navbar'>


        <Link to='/' className="navbar-logo" onClick={handleTest}>
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
            if (item.showLoggedUser == userLogged) {
              if (item.url == '' && item.clickBehav == 'handleSignOut') {
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
            }
          })}
        </ul>

        {/** 
          <Button
            className='nav-links'
            buttonStyle='btn--secondary'
            buttonSize='btn--large'
            path='/sign-up'
          >
            Sign-UP
        </Button>
          */}

      </nav>
    </>
  );
}

export default Navbar;

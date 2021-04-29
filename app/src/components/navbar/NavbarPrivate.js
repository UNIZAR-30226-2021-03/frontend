import React, { useState, useContext } from 'react';
import { NavbarItems } from './NavbarItems';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {AuthContext} from '../../context'

//Navbar con menú para vista desde web browser móvil:
//Fas fa-times y fa-bars iconos exportados desde fontawesome, ver index.html
//Línea 20 alterna la vista del ícono en función de si el menú esta abierto o no.

// TODO navbar en moviles pequeños (cambiar a mejor)

const NavbarPrivate = (props) => {

  const [clicked, setClicked] = useState(false);
  const handleClick = () => setClicked(!clicked);


  const { signOutToken } = useContext(AuthContext)

  const handleSignOut = () => {
    signOutToken()
  };

  const mainLink = '/home'

  return (
    <>
      <nav className='navbar'>

        <Link to={mainLink} className="navbar-logo">
          <i className="fas fa-key navbar-logo-icon"></i>
          <div className="navbar-logo-name">
            KeyPaX
          </div>
        </Link>

        <div className='menu-icon' onClick={handleClick}>
          <i className={clicked ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
          {NavbarItems.map((item, index) => {
            if (item.private === true) {
              return (
                <li key={index}>
                  <Link className={item.cName} to={item.url} onClick={handleSignOut}>
                    {item.title}
                  </Link>
                </li>
              )
            } else {
              return (<></>)
            }
          })}
        </ul>
      </nav>
    </>
  );
}

export default NavbarPrivate;

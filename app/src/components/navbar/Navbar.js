import React, { useState } from 'react';
import {NavbarItems} from './NavbarItems';
import {Button} from '../Button';
import { Link } from 'react-router-dom';
import './Navbar.css';  

//Navbar con menú para vista desde web browser móvil:
//Fas fa-times y fa-bars iconos exportados desde fontawesome, ver index.html
//Línea 20 alterna la vista del ícono en función de si el menú esta abierto o no.

function Navbar () {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => setClicked(!clicked);
  const closeMobileMenu = () => setClicked(false);
  return (
    <>
      <nav className='navbar'>
        <Link to='/' className="navbar-logo" onClick={closeMobileMenu}>
          <i class="fas fa-key"></i>
          KeyPax
        </Link>
        <div className='menu-icon' onClick={handleClick}>
            <i className={clicked ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
          {NavbarItems.map((item,index)=>{
            return(
              <li>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            )
          })}
        </ul>
        <Button
            className='nav-links'
            buttonStyle='btn--secondary'
            buttonSize='btn--large'
            path='/sign-up'
          >
            Sign-UP
        </Button>
      </nav>
    </>
    );
}

export default Navbar;  
import React, { useState, useContext, useEffect } from 'react';
import { NavbarItems } from './NavbarItems';
import { Link } from 'react-router-dom';
import './Navbar.css';
import AuthContext from '../../context'
import { Grid } from '@material-ui/core';

//Navbar con menú para vista desde web browser móvil:
//Fas fa-times y fa-bars iconos exportados desde fontawesome, ver index.html
//Línea 20 alterna la vista del ícono en función de si el menú esta abierto o no.

// TODO navbar en moviles pequeños (cambiar a mejor)

const NavbarPrivate = (props) => {

  const [nickname, setNickname] = useState("nada")

  const [clicked, setClicked] = useState(false);
  const handleClick = () => setClicked(!clicked);

  const { getNickname } = useContext(AuthContext)

  const { signOutToken } = useContext(AuthContext)

  const handleSignOut = () => {
    signOutToken()
  };

  useEffect(() => {
    setNickname(getNickname())
    console.log(getNickname())
  }, [getNickname()])
  const mainLink = '/home'

  return (
    <>
      <nav className='navbar'>
        <Grid container
          direction="row"
          alignItems="center"
          justify="center"

        >

          <Grid item xs={2}>
            <Link to={mainLink} className="navbar-logo">
              <i className="fas fa-key navbar-logo-icon"></i>
              <div className="navbar-logo-name">
                KeyPaX
          </div>
            </Link>
          </Grid>
          <Grid itemxs={2}>
            <div className='menu-icon' onClick={handleClick}>
              <i className={clicked ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
          </Grid>

          <Grid item xs={2}>
            <div className="navbar-logo navbar-logo-name">
              Bienvenido {nickname}
            </div>
          </Grid>

          <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
            {NavbarItems.map((item, index) => {
              if (item.private === true) {
                return (
                  <Grid item xs={2}>
                    <li key={index}>

                      <Link className={item.cName} to={item.url} onClick={handleSignOut}>
                        {item.title}
                      </Link>

                    </li>
                  </Grid>
                )
              } else {
                return (<></>)
              }
            })}
          </ul>
        </Grid>
      </nav>
    </>
  );
}

export default NavbarPrivate;

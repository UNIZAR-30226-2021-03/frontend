import React from 'react';
import './ButtonCustom.css';
import { Link } from 'react-router-dom';

const STYLES = [
  'btn--primary',
  'btn--secondary',
];

const SIZES = [
  'btn--medium',
  'btn--large'];

const ButtonCustom = ({ children, type, onClick, buttonStyle, buttonSize, path }) => {

  //Por defecto botones de estilo primarion y tamaño medio
  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  //El render del botón
  return (
    <Link to={path} className='btn-mobile'>
      <button
        className={`btn  ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};

export default ButtonCustom;
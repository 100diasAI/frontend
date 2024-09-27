import React from 'react';
import logoLight from './shopping.png';
import logoDark from './backshopping.png';

const Logo = ({ estilo }) => {
  return (
    <img
      src={estilo === 'light' ? logoDark : logoDark}
      alt="Shopping Logo"
      className={estilo}
    />
  );
};

export default Logo;

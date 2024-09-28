import React from 'react';

const NavbarComponent = () => {
  return (
    <nav className="p-2 flex items-center">
      <img src="/images/logo.png" alt="Logo" className="w-12 h-12" />
      <h1 className="text-2xl">
        <span className="tracking-widest" style={{ fontFamily: '"Kanit", sans-serif', fontWeight: "500" }}>Fin</span>
        <span className="tracking-widest" style={{ fontFamily: '"Kanit", sans-serif', fontWeight: "200" }}>track</span>
      </h1>
    </nav>
  );
};

export default NavbarComponent;

import React from 'react';

const NavbarComponent = () => {
  return (
    <nav className="p-2 sm:p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src="/images/logo.png" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
        <h1 className="text-xl sm:text-2xl md:text-3xl ml-2">
          <span className="tracking-widest" style={{ fontFamily: '"Kanit", sans-serif', fontWeight: "500" }}>Fin</span>
          <span className="tracking-widest" style={{ fontFamily: '"Kanit", sans-serif', fontWeight: "200" }}>track</span>
        </h1>
      </div>
    </nav>
  );
};

export default NavbarComponent;
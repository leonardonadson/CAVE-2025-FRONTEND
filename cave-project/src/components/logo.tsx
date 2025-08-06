import React from 'react';

const Logo = () => (
  <div className="text-center font-bold text-white py-6">
    {/* ADAPTAÇÃO RESPONSIVA: Tamanhos de fonte e espaçamento ajustados. */}
    <h1 className="text-xl sm:text-2xl tracking-widest">FESTIVAL</h1>
    <h2 className="text-4xl sm:text-5xl tracking-normal relative">
      C
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-7 sm:w-16 sm:h-8 border-2 border-[#F6648B] rounded-full"></span>
      AVE
    </h2>
    <p className="text-[10px] sm:text-xs tracking-[0.2em] font-light text-gray-300 mt-1">
      CULTURA • ALIMENTO • VINHO • ENCONTROS
    </p>
  </div>
);

export default Logo;

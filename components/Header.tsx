
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 mb-2">
        Générateur d'Idées de Monétisation IA
      </h1>
      <p className="text-lg text-gray-400">
        Transformez votre site web en une source de revenus.
      </p>
    </header>
  );
};


import React from 'react';
import type { Idea } from '../types';
import { Category } from '../types';
import {
  MegaphoneIcon,
  CreditCardIcon,
  ShoppingCartIcon,
  LinkIcon,
  WrenchScrewdriverIcon,
  LockClosedIcon,
  SparklesIcon
} from './icons';

interface IdeaCardProps {
  idea: Idea;
}

const categoryStyles: { [key in Category]: { icon: React.ReactNode; color: string } } = {
  [Category.ADVERTISING]: { icon: <MegaphoneIcon />, color: 'bg-green-500' },
  [Category.SUBSCRIPTIONS]: { icon: <CreditCardIcon />, color: 'bg-purple-500' },
  [Category.ECOMMERCE]: { icon: <ShoppingCartIcon />, color: 'bg-blue-500' },
  [Category.AFFILIATE]: { icon: <LinkIcon />, color: 'bg-yellow-500' },
  [Category.SERVICES]: { icon: <WrenchScrewdriverIcon />, color: 'bg-red-500' },
  [Category.PREMIUM_CONTENT]: { icon: <LockClosedIcon />, color: 'bg-indigo-500' },
  [Category.OTHER]: { icon: <SparklesIcon />, color: 'bg-gray-500' },
};

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  const { icon, color } = categoryStyles[idea.category] || categoryStyles[Category.OTHER];

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden shadow-lg p-6 flex flex-col h-full transform hover:scale-105 transition-transform duration-300 backdrop-blur-sm">
      <div className="flex items-center mb-4">
        <div className={`p-2 rounded-lg ${color} mr-4`}>
          {icon}
        </div>
        <span className={`px-3 py-1 text-sm font-semibold text-white ${color} rounded-full`}>
          {idea.category}
        </span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{idea.title}</h3>
      <p className="text-gray-300 text-base flex-grow">{idea.description}</p>
    </div>
  );
};

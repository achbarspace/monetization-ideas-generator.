
import React from 'react';

interface UrlInputFormProps {
  url: string;
  setUrl: (url: string) => void;
  onSubmit: (url:string) => void;
  isLoading: boolean;
}

export const UrlInputForm: React.FC<UrlInputFormProps> = ({ url, setUrl, onSubmit, isLoading }) => {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(url);
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="flex items-center bg-gray-800/50 border border-gray-700 rounded-full shadow-lg p-2 backdrop-blur-sm">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Entrez l'URL de votre site web (ex: https://example.com)"
          className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none px-4 py-2"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center whitespace-nowrap"
        >
          {isLoading ? 'Analyse...' : 'Générer Idées'}
        </button>
      </div>
    </form>
  );
};

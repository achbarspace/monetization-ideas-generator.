

import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { UrlInputForm } from './components/UrlInputForm';
import { IdeaCard } from './components/IdeaCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generateMonetizationIdeas } from './services/geminiService';
import type { Idea } from './types';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [ideas, setIdeas] = useState<Idea[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (submittedUrl: string) => {
    if (!submittedUrl) {
      setError('Veuillez entrer une URL de site web.');
      return;
    }
    setIsLoading(true);
    setIdeas(null);
    setError(null);

    try {
      const generatedIdeas = await generateMonetizationIdeas(submittedUrl);
      setIdeas(generatedIdeas);
    } catch (err) {
      console.error(err);
      setError('Une erreur est survenue lors de la génération des idées. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const WelcomeMessage = () => (
    <div className="text-center p-8 mt-10 bg-white/5 rounded-lg border border-gray-700 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">Débloquez le potentiel de revenus de votre site</h2>
      <p className="text-gray-400">
        Entrez l'URL de votre site web ci-dessus et laissez notre IA générer des stratégies de monétisation sur mesure pour vous aider à atteindre vos objectifs financiers.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 text-white font-sans">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <main>
          <UrlInputForm
            url={url}
            setUrl={setUrl}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <div className="mt-12">
            {isLoading && <LoadingSpinner />}
            {error && (
              <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg max-w-md mx-auto">
                <p>{error}</p>
              </div>
            )}
            {!isLoading && !error && !ideas && <WelcomeMessage />}
            {ideas && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ideas.map((idea, index) => (
                  <IdeaCard key={index} idea={idea} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
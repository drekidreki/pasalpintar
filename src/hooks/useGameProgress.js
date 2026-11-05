import { useState, useEffect } from 'react';

const STORAGE_KEY = 'pasalpintar_progress';

const defaultProgress = {
  characterId: null,
  completedCases: [],
  cityIndicators: {
    socialStability: 50,
    legalIntegrity: 50,
    regionalDevelopment: 50,
    publicTrust: 50,
  }
};

export const useGameProgress = () => {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultProgress;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const selectCharacter = (characterId) => {
    setProgress((prev) => ({ ...prev, characterId }));
  };

  return { progress, selectCharacter };
};
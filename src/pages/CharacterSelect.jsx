import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { characters } from '../data/characters';
import { useGameProgress } from '../hooks/useGameProgress';

export default function CharacterSelect() {
  const { progress, selectCharacter } = useGameProgress();
  // Pre-select the saved character so returning players see their choice.
  const [selectedId, setSelectedId] = useState(progress.characterId);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedId) {
      selectCharacter(selectedId);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen p-8 md:p-16">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-2">Select Your Officer</h1>
        <p className="text-gray-400 mb-10">Pilih karakter yang akan mewakilimu dalam investigasi.</p>

        <div role="radiogroup" aria-label="Pilih karakter" className="grid md:grid-cols-2 gap-6 mb-12">
          {characters.map((char) => (
            <motion.button
              type="button"
              role="radio"
              aria-checked={selectedId === char.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={char.id}
              onClick={() => setSelectedId(char.id)}
              className={`card-dark text-left cursor-pointer transition-all ${selectedId === char.id ? 'border-accent-blue ring-1 ring-accent-blue bg-navy-secondary/80' : 'hover:border-gray-500'}`}
            >
              <span className="block text-5xl mb-4" aria-hidden="true">{char.avatar}</span>
              <span className="block text-xl font-bold mb-1">{char.name}</span>
              <span className="block text-sm text-accent-blue mb-4">{char.role}</span>
              <span className="block text-gray-400 text-sm leading-relaxed">{char.description}</span>
            </motion.button>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedId}
            className={`btn-primary ${!selectedId ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Confirm & Continue
          </button>
        </div>
      </motion.div>
    </div>
  );
}
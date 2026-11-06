import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { characters } from '../data/characters';
import { chapters } from '../data/chapters';
import { boardPins } from '../data/board';
import { useGameProgress } from '../hooks/useGameProgress';
import { primaryCasesFor } from '../lib/commentary';
import InvestigatorAvatar from '../components/InvestigatorAvatar';

const TILTS = [-1.5, 1.2, 1, -1.2];

export default function CharacterSelect() {
  const { progress, selectCharacter } = useGameProgress();
  // Pre-select the saved character so returning players see their choice.
  const [selectedId, setSelectedId] = useState(progress.characterId);
  const navigate = useNavigate();
  const selected = characters.find((c) => c.id === selectedId);

  const handleContinue = () => {
    if (selectedId) {
      selectCharacter(selectedId);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 md:py-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 max-w-2xl">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl leading-none">Pilih penyidik</h1>
          <p className="text-gray-300 mt-3">
            Setiap penyidik melihat kasus dari sudut yang berbeda. Fakta dan dasar hukumnya tetap sama; yang berubah adalah apa
            yang pertama kali kamu perhatikan.
          </p>
        </header>

        <div className="wood-frame">
          <div className="cork px-4 py-8 sm:px-8">
            <div role="radiogroup" aria-label="Pilih penyidik" className="grid md:grid-cols-2 gap-x-8 gap-y-10">
              {characters.map((char, i) => {
                const isSelected = selectedId === char.id;
                const primary = primaryCasesFor(char.id)
                  .map((id) => ({ id, number: boardPins[id]?.number, title: chapters.find((c) => c.id === id)?.title }))
                  .sort((a, b) => a.number.localeCompare(b.number));
                return (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    key={char.id}
                    onClick={() => setSelectedId(char.id)}
                    className={`print on-paper relative text-left p-5 sm:p-6 origin-top transition-[transform,box-shadow] duration-200 hover:shadow-lifted ${
                      isSelected ? 'shadow-lifted ring-[3px] ring-crimson' : ''
                    }`}
                    style={{ transform: `rotate(${isSelected ? 0 : TILTS[i % TILTS.length]}deg)` }}
                  >
                    <span className={`pin ${isSelected ? 'pin-red' : ''}`} aria-hidden="true" />
                    <span className="flex gap-4 items-start">
                      <InvestigatorAvatar character={char} size={84} />
                      <span className="min-w-0">
                        <span className="block font-display font-extrabold text-3xl leading-none text-ink">{char.name}</span>
                        <span className="block text-sm font-semibold text-crimson mt-1">{char.roleLabel}</span>
                        <span className="block text-sm text-ink/80 leading-snug mt-2">{char.description}</span>
                      </span>
                    </span>

                    <span className="block mt-4 pt-3 border-t border-dashed border-ink/25">
                      <span className="block text-sm font-semibold text-ink">Yang ia perhatikan</span>
                      <span className="block font-hand text-[16px] leading-snug text-ink mt-1">
                        {char.focus.map((f) => (
                          <span key={f} className="block">
                            <span aria-hidden="true">– </span>
                            {f}
                          </span>
                        ))}
                      </span>
                    </span>

                    <span className="block mt-3 text-sm text-ink">
                      <span className="font-semibold">Paling dekat dengan: </span>
                      {primary.map((p, idx) => (
                        <span key={p.id}>
                          No. {p.number} {p.title}
                          {idx < primary.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </span>

                    {isSelected && (
                      <span className="stamp right-4 top-4 text-crimson" style={{ transform: 'rotate(8deg)' }} aria-hidden="true">
                        DIPILIH
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 mt-6">
          <p className="text-sm text-gray-300 sm:mr-auto" aria-live="polite">
            {selected ? `${selected.name} akan menemanimu di setiap kasus.` : 'Belum ada penyidik yang dipilih.'}
          </p>
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedId}
            className={`btn-primary ${!selectedId ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Confirm & Continue
          </button>
        </div>
      </div>
    </div>
  );
}

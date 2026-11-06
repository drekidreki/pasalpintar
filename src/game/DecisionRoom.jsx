import { useState } from 'react';
import { ShieldAlert, Building2, ArrowUp, ArrowDown, Minus, Clock, Coins, Users } from 'lucide-react';
import CommentaryPanel from '../components/CommentaryPanel';
import { getCommentary } from '../lib/commentary';
import { INDICATORS, DIRECTIONS } from '../data/indicators';

const DIRECTION_ICONS = { naik: ArrowUp, tetap: Minus, turun: ArrowDown };

function Tradeoffs({ t }) {
  if (!t) return null;
  const items = [
    [Clock, 'Hasil terlihat', t.speed],
    [Coins, 'Sumber daya', t.resources],
    [Users, 'Beban ditanggung', t.burden],
  ];
  return (
    <dl className="grid gap-1.5 text-xs border-t border-white/10 pt-3">
      {items.map(([Icon, label, value]) => (
        <div key={label} className="flex items-start gap-2">
          <Icon size={14} className="text-brass-light shrink-0 mt-0.5" aria-hidden="true" />
          <dt className="text-gray-400 shrink-0">{label}:</dt>
          <dd className="text-gray-200">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Decision Room.
 * 1. Compare strategies (each has real benefits and real costs).
 * 2. Predict how the chosen strategy moves each city indicator.
 *    The prediction is graded as "Impact Understanding" (10 points).
 */
export default function DecisionRoom({ caseData, characterId, cityIndicators, onDecisionChosen }) {
  const [selectedId, setSelectedId] = useState(null);
  const [prediction, setPrediction] = useState({});
  const selected = caseData.decisions.find((d) => d.id === selectedId) || null;
  const predictionDone = INDICATORS.every(({ key }) => prediction[key]);
  const ready = Boolean(selected) && predictionDone;

  // A prediction belongs to one strategy; start over when the strategy changes.
  const choose = (id) => {
    if (id === selectedId) return;
    setSelectedId(id);
    setPrediction({});
  };

  return (
    <div className="w-full">
      <div className="mb-8 border-b border-white/10 pb-6">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <ShieldAlert className="text-brass shrink-0" aria-hidden="true" /> Decision Room
        </h2>
        <p className="text-gray-300">
          Tidak ada strategi tanpa biaya. Bandingkan manfaat, konsekuensi, dan siapa yang menanggung bebannya, lalu pilih yang
          paling melindungi hak warga.
        </p>
      </div>

      <CommentaryPanel characterId={characterId} text={getCommentary(characterId, caseData.id, 'decision')} className="mb-8" />

      <fieldset className="mb-6">
        <legend className="text-lg font-bold mb-4">1. Pilih strategi penanganan</legend>
        <div className="grid md:grid-cols-2 gap-5">
          {caseData.decisions.map((dec) => {
            const isSelected = selectedId === dec.id;
            const titleId = `dec-title-${dec.id}`;
            return (
              <label
                key={dec.id}
                className={`card-dark cursor-pointer flex flex-col gap-4 border-2 transition-colors focus-within:ring-2 focus-within:ring-brass ${
                  isSelected ? 'border-brass bg-soot-raised/90' : 'border-white/10 hover:border-gray-500'
                }`}
              >
                <span className="flex items-start justify-between gap-3">
                  <span id={titleId} className="text-lg font-bold text-white leading-snug">
                    {dec.title}
                  </span>
                  <input
                    type="radio"
                    name="decision"
                    value={dec.id}
                    checked={isSelected}
                    onChange={() => choose(dec.id)}
                    aria-labelledby={titleId}
                    className="appearance-none shrink-0 w-6 h-6 mt-0.5 rounded-full border-2 border-gray-500 checked:border-brass checked:bg-brass checked:shadow-[inset_0_0_0_4px_#2A241E] cursor-pointer focus:outline-none"
                  />
                </span>
                <span className="text-xs text-brass flex items-center gap-1 font-semibold">
                  <Building2 size={14} aria-hidden="true" /> {dec.stakeholders}
                </span>
                <span className="block text-sm text-gray-300 leading-relaxed">{dec.description}</span>
                <span className="block space-y-2 text-xs">
                  <span className="block">
                    <span className="font-bold text-status-success">Manfaat: </span>
                    <span className="text-gray-300">{dec.benefits}</span>
                  </span>
                  <span className="block">
                    <span className="font-bold text-status-warning">Konsekuensi: </span>
                    <span className="text-gray-300">{dec.consequences}</span>
                  </span>
                  <span className="block">
                    <span className="font-bold text-gray-300">Kelayakan: </span>
                    <span className="text-gray-300">{dec.feasibility}</span>
                  </span>
                </span>
                <Tradeoffs t={dec.tradeoffs} />
              </label>
            );
          })}
        </div>
      </fieldset>

      <details className="mb-10 card-dark">
        <summary className="cursor-pointer font-semibold text-brass-light">Bandingkan trade-off dalam tabel</summary>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm text-left min-w-[520px]">
            <caption className="sr-only">Perbandingan trade-off strategi</caption>
            <thead className="text-gray-400 border-b border-white/10">
              <tr>
                <th scope="col" className="py-2 pr-3 font-semibold">Strategi</th>
                <th scope="col" className="py-2 pr-3 font-semibold">Hasil terlihat</th>
                <th scope="col" className="py-2 pr-3 font-semibold">Sumber daya</th>
                <th scope="col" className="py-2 font-semibold">Beban ditanggung</th>
              </tr>
            </thead>
            <tbody>
              {caseData.decisions.map((d) => (
                <tr key={d.id} className="border-b border-white/5 align-top">
                  <th scope="row" className="py-2 pr-3 font-semibold text-white">{d.title}</th>
                  <td className="py-2 pr-3 text-gray-300">{d.tradeoffs?.speed}</td>
                  <td className="py-2 pr-3 text-gray-300">{d.tradeoffs?.resources}</td>
                  <td className="py-2 text-gray-300">{d.tradeoffs?.burden}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <section aria-labelledby="predict-title" className={`card-dark mb-10 ${selected ? '' : 'opacity-60'}`}>
        <h3 id="predict-title" className="text-lg font-bold mb-1">2. Prediksi dampaknya ke kota</h3>
        <p className="text-sm text-gray-300 mb-5">
          {selected
            ? `Jika kota menjalankan "${selected.title}", apa yang terjadi pada setiap indikator? Prediksimu dinilai sebagai Impact Understanding.`
            : 'Pilih strategi dulu, lalu prediksi dampaknya.'}
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {INDICATORS.map(({ key, label }) => (
            <fieldset key={key} disabled={!selected} className="border border-white/10 rounded-lg p-3">
              <legend className="px-1 text-sm font-semibold text-white">
                {label}
                {Number.isFinite(cityIndicators?.[key]) && (
                  <span className="font-normal text-gray-400"> · sekarang {cityIndicators[key]}</span>
                )}
              </legend>
              <div className="flex flex-wrap gap-2 mt-1">
                {DIRECTIONS.map(({ id, label: dl }) => {
                  const Icon = DIRECTION_ICONS[id];
                  const checked = prediction[key] === id;
                  return (
                    <label
                      key={id}
                      className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm cursor-pointer focus-within:ring-2 focus-within:ring-brass ${
                        checked ? 'border-brass bg-brass/15 text-white' : 'border-white/15 text-gray-300 hover:border-gray-400'
                      } ${selected ? '' : 'cursor-not-allowed'}`}
                    >
                      <input
                        type="radio"
                        name={`predict-${key}`}
                        value={id}
                        checked={checked}
                        onChange={() => setPrediction((p) => ({ ...p, [key]: id }))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                      />
                      <Icon size={14} aria-hidden="true" /> {dl}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      </section>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
        {!ready && (
          <p className="text-sm text-gray-400" id="decision-hint">
            {!selected ? 'Pilih satu strategi.' : 'Lengkapi prediksi untuk keempat indikator.'}
          </p>
        )}
        <button
          type="button"
          onClick={() => onDecisionChosen(selected, prediction)}
          disabled={!ready}
          aria-describedby={!ready ? 'decision-hint' : undefined}
          className={`btn-primary ${!ready ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Confirm Decision & View Evaluation
        </button>
      </div>
    </div>
  );
}

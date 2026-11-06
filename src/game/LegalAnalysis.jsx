import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, CheckCircle, Check, CheckCircle2, XCircle, CircleAlert, ChevronLeft, ChevronRight } from 'lucide-react';
import { computeLegalScores, isLinkSupported } from '../data/scoring';
import { laws } from '../data/laws';
import CommentaryPanel from '../components/CommentaryPanel';
import { getCommentary, legalOutcome } from '../lib/commentary';

/**
 * Legal Analysis 2.0 — a five-step reasoning chain:
 *   facts that can be established → rights affected → duties neglected →
 *   legal basis → legal conclusion.
 * Rights and duties must be tied to the facts they rest on. Everything is
 * click-based (no drag and drop). Feedback appears after "Submit Analysis".
 */
const STEPS = [
  { id: 'facts', title: 'Fakta', prompt: 'Fakta mana yang bisa ditetapkan berdasarkan bukti? Pisahkan dari klaim, rumor, dan pengalih.' },
  { id: 'rights', title: 'Hak', prompt: 'Hak apa yang terdampak? Untuk setiap hak, tautkan fakta yang menjadi dasarnya.' },
  { id: 'duties', title: 'Kewajiban', prompt: 'Kewajiban siapa yang diabaikan? Tautkan juga fakta yang menunjukkannya.' },
  { id: 'articles', title: 'Dasar hukum', prompt: 'Pasal mana yang menjadi dasar hukumnya? Buka bunyi pasal sebelum memilih.' },
  { id: 'conclusion', title: 'Kesimpulan', prompt: 'Kesimpulan hukum mana yang paling tepat dan tidak melampaui bukti?' },
];

const lawById = Object.fromEntries(laws.map((l) => [l.id, l]));

function Toggle({ pressed, onToggle, disabled, children, className = '' }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onToggle}
      className={`w-full text-left p-4 rounded-lg border transition-colors ${disabled ? 'cursor-default' : 'cursor-pointer'} ${
        pressed ? 'border-brass bg-brass/10' : 'border-soot-line hover:border-gray-500'
      } ${className}`}
    >
      <span className="flex justify-between items-start gap-3">
        <span className="font-medium text-white">{children}</span>
        <span
          aria-hidden="true"
          className={`w-5 h-5 mt-0.5 shrink-0 rounded border flex items-center justify-center ${pressed ? 'bg-brass border-brass' : 'border-gray-500'}`}
        >
          {pressed && <Check size={14} className="text-ink" />}
        </span>
      </span>
    </button>
  );
}

function Verdict({ tone, children }) {
  const Icon = tone === 'good' ? CheckCircle2 : tone === 'bad' ? XCircle : CircleAlert;
  const color = tone === 'good' ? 'text-status-success' : tone === 'bad' ? 'text-status-danger' : 'text-status-warning';
  return (
    <p className={`flex items-start gap-2 text-sm font-semibold ${color}`}>
      <Icon size={18} aria-hidden="true" className="shrink-0 mt-0.5" />
      <span>{children}</span>
    </p>
  );
}

function LawText({ lawIds = [] }) {
  const [open, setOpen] = useState(false);
  const items = lawIds.map((id) => lawById[id]).filter(Boolean);
  if (!items.length) return null;
  return (
    <div className="mt-2">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="text-sm text-brass-light underline underline-offset-2"
      >
        {open ? 'Tutup bunyi pasal' : 'Lihat bunyi pasal'}
      </button>
      {open &&
        items.map((l) => (
          <div key={l.id} className="mt-2 text-sm bg-black/25 border border-soot-line rounded-md p-3">
            <p className="font-semibold text-gray-200">{l.title}</p>
            <p className="text-xs text-gray-400 mb-1">
              {l.textType === 'ringkasan' ? 'Ringkasan, bukan kutipan' : 'Kutipan'},{' '}
              {l.verification?.status === 'resmi' ? 'dicek ke sumber resmi' : 'dicek ke sumber sekunder'}
            </p>
            <p className="text-gray-200">{l.textType === 'ringkasan' ? l.text : `“${l.text}”`}</p>
          </div>
        ))}
    </div>
  );
}

export default function LegalAnalysis({ caseData, characterId, onStageComplete }) {
  const la = caseData.legalAnalysis;
  const [step, setStep] = useState(0);
  const [facts, setFacts] = useState([]);
  const [rights, setRights] = useState([]);
  const [duties, setDuties] = useState([]);
  const [articles, setArticles] = useState([]);
  const [links, setLinks] = useState({});
  const [conclusion, setConclusion] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const stepHeadingRef = useRef(null);

  const toggle = (id, list, setList) => {
    if (isSubmitted) return;
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  };
  const toggleLink = (optionId, factId) => {
    if (isSubmitted) return;
    setLinks((prev) => {
      const cur = prev[optionId] || [];
      return { ...prev, [optionId]: cur.includes(factId) ? cur.filter((x) => x !== factId) : [...cur, factId] };
    });
  };
  const toggleFact = (id) => {
    if (isSubmitted) return;
    const removing = facts.includes(id);
    setFacts(removing ? facts.filter((x) => x !== id) : [...facts, id]);
    // A fact that is no longer marked established can't support anything.
    if (removing) setLinks((prev) => Object.fromEntries(Object.entries(prev).map(([k, v]) => [k, v.filter((f) => f !== id)])));
  };

  const selections = { facts, rights, duties, articles, links, conclusion };
  const stepReady = [facts.length > 0, rights.length > 0, duties.length > 0, articles.length > 0, Boolean(conclusion)];
  const goTo = (i) => {
    setStep(i);
    requestAnimationFrame(() => stepHeadingRef.current?.focus({ preventScroll: false }));
  };

  const markedFacts = la.facts.filter((f) => facts.includes(f.id));
  const factText = (id) => la.facts.find((f) => f.id === id)?.text;

  // ------------------------------------------------------------- step bodies
  const renderFacts = () => (
    <div className="space-y-3">
      {la.facts.map((f) => {
        const marked = facts.includes(f.id);
        return (
          <div key={f.id}>
            <Toggle pressed={marked} disabled={isSubmitted} onToggle={() => toggleFact(f.id)}>
              {f.text}
            </Toggle>
            {isSubmitted && (
              <div className="mt-2 pl-1 space-y-1">
                <Verdict tone={marked === f.established ? 'good' : 'bad'}>
                  {f.established ? 'Dapat ditetapkan sebagai fakta.' : 'Belum dapat ditetapkan sebagai fakta.'}{' '}
                  {marked === f.established ? 'Penilaianmu tepat.' : marked ? 'Kamu menandainya sebagai fakta.' : 'Kamu tidak menandainya.'}
                </Verdict>
                <p className="text-sm text-gray-300">
                  {f.explanation} <span className="text-gray-400">Sumber: {f.basis}.</span>
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderLinked = (groupOptions, picked, setPicked) => (
    <div className="space-y-4">
      {groupOptions.map((o) => {
        const selected = picked.includes(o.id);
        const linked = links[o.id] || [];
        const supported = isLinkSupported(o, linked, facts, la.facts);
        return (
          <div key={o.id}>
            <Toggle pressed={selected} disabled={isSubmitted} onToggle={() => toggle(o.id, picked, setPicked)}>
              {o.label}
            </Toggle>
            {selected && !isSubmitted && (
              <fieldset className="mt-2 ml-1 pl-3 border-l-2 border-brass/50">
                <legend className="text-sm text-gray-300 mb-2">Dasar fakta untuk pilihan ini</legend>
                {markedFacts.length === 0 ? (
                  <p className="text-sm text-gray-400">Tandai fakta di langkah 1 dulu, lalu tautkan di sini.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {markedFacts.map((f) => {
                      const on = linked.includes(f.id);
                      return (
                        <button
                          key={f.id}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleLink(o.id, f.id)}
                          className={`text-left text-sm px-3 py-1.5 rounded-full border ${
                            on ? 'border-brass bg-brass/15 text-white' : 'border-soot-line text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          {f.text}
                        </button>
                      );
                    })}
                  </div>
                )}
              </fieldset>
            )}
            {isSubmitted && (
              <div className="mt-2 pl-1 space-y-1">
                {selected && o.isCorrect && (
                  <Verdict tone={supported ? 'good' : 'warn'}>
                    {supported
                      ? 'Tepat, dan didukung fakta yang kamu tautkan.'
                      : `Tepat, tetapi belum ditautkan ke fakta yang mendukungnya (nilai setengah). Fakta pendukung: ${o.supportedBy
                          .map(factText)
                          .join(' / ')}`}
                  </Verdict>
                )}
                {selected && !o.isCorrect && <Verdict tone="bad">Kurang tepat untuk kasus ini.</Verdict>}
                {!selected && o.isCorrect && <Verdict tone="warn">Terlewat: ini juga terdampak.</Verdict>}
                <p className={`text-sm ${o.isCorrect ? 'text-gray-200' : 'text-gray-400'}`}>{o.explanation}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderArticles = () => (
    <div className="space-y-4">
      {la.legalArticles.map((o) => {
        const selected = articles.includes(o.id);
        return (
          <div key={o.id}>
            <Toggle pressed={selected} disabled={isSubmitted} onToggle={() => toggle(o.id, articles, setArticles)}>
              {o.label}
            </Toggle>
            <LawText lawIds={o.lawIds} />
            {isSubmitted && (
              <div className="mt-2 pl-1 space-y-1">
                {selected && <Verdict tone={o.isCorrect ? 'good' : 'bad'}>{o.isCorrect ? 'Tepat.' : 'Kurang tepat untuk kasus ini.'}</Verdict>}
                {!selected && o.isCorrect && <Verdict tone="warn">Terlewat: pasal ini juga relevan.</Verdict>}
                <p className="text-sm text-gray-300">{o.explanation}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderConclusion = () => (
    <fieldset>
      <legend className="sr-only">Kesimpulan hukum</legend>
      <div className="space-y-3">
        {la.conclusions.map((c) => {
          const chosen = conclusion === c.id;
          return (
            <div key={c.id}>
              <label
                className={`flex gap-3 items-start p-4 rounded-lg border ${isSubmitted ? 'cursor-default' : 'cursor-pointer'} ${
                  chosen ? 'border-brass bg-brass/10' : 'border-soot-line hover:border-gray-500'
                }`}
              >
                <input
                  type="radio"
                  name="conclusion"
                  value={c.id}
                  checked={chosen}
                  disabled={isSubmitted}
                  onChange={() => setConclusion(c.id)}
                  className="mt-1 accent-[#D9A441]"
                />
                <span className="text-white">{c.text}</span>
              </label>
              {isSubmitted && (chosen || c.isCorrect) && (
                <div className="mt-2 pl-1 space-y-1">
                  <Verdict tone={c.isCorrect ? 'good' : 'bad'}>
                    {c.isCorrect ? (chosen ? 'Kesimpulan yang tepat.' : 'Ini kesimpulan yang tepat.') : 'Kesimpulan ini kurang tepat.'}
                  </Verdict>
                  <p className="text-sm text-gray-300">{c.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </fieldset>
  );

  const bodies = [
    renderFacts,
    () => renderLinked(la.rightsAffected, rights, setRights),
    () => renderLinked(la.dutiesNeglected, duties, setDuties),
    renderArticles,
    renderConclusion,
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Scale className="text-brass shrink-0" aria-hidden="true" /> Legal Analysis Phase
          </h2>
          <p className="text-gray-300">
            Bangun penalaranmu selangkah demi selangkah: dari fakta yang terbukti, ke hak dan kewajiban, ke dasar hukum, lalu
            kesimpulan.
          </p>
        </div>
      </div>

      <CommentaryPanel
        characterId={characterId}
        className="mb-6"
        text={
          isSubmitted
            ? getCommentary(characterId, caseData.id, 'legalResult', { outcome: legalOutcome(la, { rights, duties, articles }) })
            : getCommentary(characterId, caseData.id, 'legal')
        }
      />

      {!isSubmitted ? (
        <>
          <nav aria-label="Langkah analisis hukum" className="mb-6">
            <ol className="flex flex-wrap gap-2">
              {STEPS.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === step ? 'step' : undefined}
                    className={`text-sm px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${
                      i === step ? 'border-brass bg-brass/15 text-white' : 'border-soot-line text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {stepReady[i] && i !== step && <Check size={14} aria-hidden="true" className="text-status-success" />}
                    {i + 1}. {s.title}
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          <section aria-labelledby="legal-step-title" className="card-dark mb-8">
            <h3 id="legal-step-title" ref={stepHeadingRef} tabIndex={-1} className="text-xl font-bold mb-1 focus:outline-none">
              Langkah {step + 1}: {STEPS[step].title}
            </h3>
            <p className="text-sm text-gray-300 mb-4">{STEPS[step].prompt}</p>
            {bodies[step]()}
          </section>

          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              disabled={step === 0}
              className={`btn-secondary gap-1 ${step === 0 ? 'invisible' : ''}`}
            >
              <ChevronLeft size={18} aria-hidden="true" /> Kembali
            </button>
            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={() => goTo(step + 1)}
                disabled={!stepReady[step]}
                className={`btn-primary gap-1 ${!stepReady[step] ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Lanjut <ChevronRight size={18} aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(true);
                  window.scrollTo(0, 0);
                  requestAnimationFrame(() => document.getElementById('review-facts')?.focus({ preventScroll: true }));
                }}
                disabled={!stepReady.every(Boolean)}
                className={`btn-primary ${!stepReady.every(Boolean) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Submit Analysis
              </button>
            )}
          </div>
          {step === STEPS.length - 1 && !stepReady.every(Boolean) && (
            <p className="text-sm text-gray-400 text-right mt-2">Lengkapi setiap langkah yang belum bertanda centang.</p>
          )}
        </>
      ) : (
        <>
          {STEPS.map((s, i) => (
            <section key={s.id} aria-labelledby={`review-${s.id}`} className="card-dark mb-6">
              <h3 id={`review-${s.id}`} tabIndex={-1} className="text-xl font-bold mb-4 focus:outline-none">
                {i + 1}. {s.title}
              </h3>
              {bodies[i]()}
            </section>
          ))}
          <div className="flex justify-end">
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => onStageComplete(computeLegalScores(la, selections))}
              className="btn-primary flex items-center gap-2"
            >
              Proceed to Decision Room <CheckCircle size={18} aria-hidden="true" />
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
}

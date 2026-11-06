import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, BookOpen, ExternalLink, ShieldCheck, AlertTriangle, Copy, CheckCircle2, FolderOpen } from 'lucide-react';
import Navbar from '../components/Navbar';
import { laws } from '../data/laws';
import { chapters } from '../data/chapters';
import { useGameProgress } from '../hooks/useGameProgress';
import { copyText } from '../lib/actionGuide';
import { lawGroup, LAW_GROUPS, citationText } from '../lib/lawLibrary';

const VERIFICATION_LABELS = {
  resmi: { label: 'Dicek ke sumber resmi', className: 'bg-green-100 text-green-800', Icon: ShieldCheck },
  sekunder: { label: 'Dicek ke sumber sekunder', className: 'bg-amber-100 text-amber-900', Icon: AlertTriangle },
  'perlu-verifikasi': { label: 'Perlu verifikasi', className: 'bg-red-100 text-red-800', Icon: AlertTriangle },
};
const STATUS_OPTIONS = [
  ['all', 'Semua status'],
  ['resmi', 'Dicek ke sumber resmi'],
  ['sekunder', 'Dicek ke sumber sekunder'],
  ['perlu-verifikasi', 'Perlu verifikasi'],
];
const caseTitle = Object.fromEntries(chapters.map((c) => [c.id, c.title]));

function chipClass(active) {
  return `px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
    active ? 'bg-brass text-ink' : 'bg-soot-raised text-gray-400 hover:text-white'
  }`;
}

export default function LawLibrary() {
  const { progress } = useGameProgress();
  const { hash } = useLocation();
  const targetId = hash ? decodeURIComponent(hash.slice(1)) : '';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [group, setGroup] = useState('all');
  const [status, setStatus] = useState('all');
  const [onlyMet, setOnlyMet] = useState(false);
  const [copied, setCopied] = useState('');

  const completed = useMemo(() => new Set(progress.completedCases), [progress.completedCases]);
  const met = (law) => (law.relatedCases || []).some((id) => completed.has(id));

  // Derived from the data so new entries always appear under a filter.
  const categories = useMemo(() => ['All', ...new Set(laws.map((l) => l.category))], []);

  const query = searchQuery.trim().toLowerCase();
  const filteredLaws = laws.filter((law) => {
    const haystack = [law.title, law.article, law.text, law.simpleExplanation, law.source]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return (
      (query === '' || haystack.includes(query)) &&
      (selectedCategory === 'All' || law.category === selectedCategory) &&
      (group === 'all' || lawGroup(law) === group) &&
      (status === 'all' || (law.verification?.status || 'perlu-verifikasi') === status) &&
      (!onlyMet || met(law))
    );
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setGroup('all');
    setStatus('all');
    setOnlyMet(false);
  };

  // Deep link (#law-xx): make sure the entry is visible, then bring it into view.
  const targetExists = laws.some((l) => l.id === targetId);
  useEffect(() => {
    if (!targetExists) return;
    const el = document.getElementById(targetId);
    if (!el) return;
    el.scrollIntoView({ block: 'start' });
    el.focus({ preventScroll: true });
  }, [targetId, targetExists]);
  const targetHidden = targetExists && !filteredLaws.some((l) => l.id === targetId);

  const handleCopy = async (law) => {
    const ok = await copyText(citationText(law));
    setCopied(ok ? law.id : `fail:${law.id}`);
  };

  const uudCount = laws.filter((l) => lawGroup(l) === 'uud').length;

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <Navbar />

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <BookOpen className="text-brass" aria-hidden="true" /> Law Library
            </h1>
            <p className="text-gray-400">
              Rujukan undang-undang dan hak-kewajiban warga negara Republik Indonesia. Setiap entri menandai apakah teksnya kutipan atau ringkasan, beserta status pengecekannya.
            </p>
            <p className="text-sm text-gray-300 mt-2">
              {laws.length} rujukan, termasuk {uudCount} ketentuan hak dan kewajiban dari UUD 1945 Pasal 27–31.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} aria-hidden="true" />
              <label htmlFor="law-search" className="sr-only">Cari pasal</label>
              <input
                id="law-search"
                type="search"
                placeholder="Cari pasal, kata kunci, atau penjelasan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-soot-raised border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brass"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter kelompok">
              {LAW_GROUPS.map(([id, label]) => (
                <button type="button" key={id} aria-pressed={group === id} onClick={() => setGroup(id)} className={chipClass(group === id)}>
                  {label}
                </button>
              ))}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter kategori">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  aria-pressed={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={chipClass(selectedCategory === cat)}
                >
                  {cat === 'All' ? 'Semua kategori' : cat}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <label className="flex items-center gap-2 text-sm text-gray-300">
                Status pengecekan
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="bg-soot-raised border border-white/10 rounded-md px-2 py-1.5 text-white focus:outline-none focus:border-brass"
                >
                  {STATUS_OPTIONS.map(([id, label]) => (
                    <option key={id} value={id}>{label}</option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={onlyMet}
                  onChange={(e) => setOnlyMet(e.target.checked)}
                  className="w-4 h-4 accent-[#D9A441]"
                />
                Hanya yang muncul di kasus yang sudah kuselesaikan
              </label>
            </div>
            <p className="text-xs text-gray-400" aria-live="polite">{filteredLaws.length} rujukan ditemukan</p>
            {targetHidden && (
              <p className="text-sm text-gray-200">
                Pasal yang kamu buka tersembunyi oleh filter.{' '}
                <button type="button" className="text-brass-light underline" onClick={resetFilters}>
                  Tampilkan
                </button>
              </p>
            )}
          </div>

          {filteredLaws.length === 0 ? (
            <div className="card-dark text-center text-gray-400">
              Tidak ada rujukan yang cocok.{' '}
              <button type="button" className="text-brass-light underline" onClick={resetFilters}>
                Hapus pencarian & filter
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredLaws.map((law) => {
                const v = VERIFICATION_LABELS[law.verification?.status] || VERIFICATION_LABELS['perlu-verifikasi'];
                const isQuote = law.textType !== 'ringkasan';
                const related = (law.relatedCases || []).filter((id) => caseTitle[id]);
                const isTarget = law.id === targetId;
                return (
                  <article
                    key={law.id}
                    id={law.id}
                    tabIndex={-1}
                    aria-labelledby={`${law.id}-title`}
                    className={`light-interface p-6 rounded-xl shadow-lg border flex flex-col justify-between scroll-mt-24 focus:outline-none ${
                      isTarget ? 'border-brass ring-4 ring-brass/60' : 'border-ink/15'
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap gap-2 items-start mb-3">
                        <span className="text-xs font-bold px-2.5 py-1 bg-paper-deep text-crimson rounded-full">{law.category}</span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${v.className}`}>
                          <v.Icon size={12} aria-hidden="true" /> {v.label}
                        </span>
                        {met(law) && (
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 bg-ink text-paper">
                            <CheckCircle2 size={12} aria-hidden="true" /> Sudah kamu temui
                          </span>
                        )}
                      </div>
                      <h2 id={`${law.id}-title`} className="text-xl font-bold text-ink mb-3">{law.title}</h2>

                      <span className="block text-xs font-bold text-gray-600 uppercase mb-1">
                        {isQuote ? 'Kutipan' : 'Ringkasan (bukan kutipan)'}
                      </span>
                      {isQuote ? (
                        <blockquote className="text-sm text-ink italic bg-[#F3EBD9] p-3 rounded-md border border-ink/15 mb-4 leading-relaxed">
                          &ldquo;{law.text}&rdquo;
                        </blockquote>
                      ) : (
                        <p className="text-sm text-ink bg-[#F3EBD9] p-3 rounded-md border border-dashed border-ink/30 mb-4 leading-relaxed">
                          {law.text}
                        </p>
                      )}

                      <div className="bg-paper-deep p-3 rounded-lg border border-ink/15 mb-4">
                        <span className="block text-xs font-bold text-crimson uppercase mb-1">Penjelasan Sederhana</span>
                        <p className="text-sm text-ink/85">{law.simpleExplanation}</p>
                      </div>

                      <div className="mb-4 text-sm text-ink">
                        <span className="flex items-center gap-1 text-xs font-bold text-gray-600 uppercase mb-1">
                          <FolderOpen size={12} aria-hidden="true" /> Muncul di kasus
                        </span>
                        {related.length ? (
                          <ul className="flex flex-wrap gap-2">
                            {related.map((id) => (
                              <li key={id} className="text-xs px-2 py-1 rounded border border-ink/20 bg-[#F3EBD9]">
                                {caseTitle[id]}
                                {completed.has(id) && <span className="text-gray-600"> · selesai</span>}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-gray-600">Tidak terkait langsung dengan kasus mana pun.</p>
                        )}
                      </div>

                      {law.verification?.note && (
                        <p className="text-xs text-gray-600 mb-4">Catatan verifikasi: {law.verification.note}</p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-ink/15 flex flex-wrap justify-between items-center gap-3 text-xs text-gray-600">
                      <span className="min-w-0">Sumber: {law.source}</span>
                      <span className="flex items-center gap-4 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleCopy(law)}
                          className="text-crimson flex items-center gap-1 hover:underline"
                        >
                          <Copy size={14} aria-hidden="true" /> Salin
                          <span className="sr-only"> {law.title}</span>
                        </button>
                        {law.verification?.refs?.[0] && (
                          <a
                            href={law.verification.refs[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-crimson flex items-center gap-1 hover:underline"
                          >
                            Rujukan <ExternalLink size={14} aria-hidden="true" />
                            <span className="sr-only">(membuka tab baru)</span>
                          </a>
                        )}
                      </span>
                      <span className="w-full" role="status">
                        {copied === law.id && 'Disalin, lengkap dengan sumbernya.'}
                        {copied === `fail:${law.id}` && 'Gagal menyalin. Pilih teksnya lalu salin manual.'}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

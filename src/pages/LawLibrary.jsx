import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, ExternalLink, ShieldCheck, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';
import { laws } from '../data/laws';

const VERIFICATION_LABELS = {
  resmi: { label: 'Dicek ke sumber resmi', className: 'bg-green-100 text-green-800', Icon: ShieldCheck },
  sekunder: { label: 'Dicek ke sumber sekunder', className: 'bg-amber-100 text-amber-900', Icon: AlertTriangle },
  'perlu-verifikasi': { label: 'Perlu verifikasi', className: 'bg-red-100 text-red-800', Icon: AlertTriangle },
};

export default function LawLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Derived from the data so new entries always appear under a filter.
  const categories = useMemo(() => ['All', ...new Set(laws.map((l) => l.category))], []);

  const query = searchQuery.trim().toLowerCase();
  const filteredLaws = laws.filter((law) => {
    const haystack = [law.title, law.article, law.text, law.simpleExplanation, law.source]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    const matchesSearch = query === '' || haystack.includes(query);
    const matchesCategory = selectedCategory === 'All' || law.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

            <div className="flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter kategori">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  aria-pressed={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat ? 'bg-brass text-ink' : 'bg-soot-raised text-gray-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400" aria-live="polite">{filteredLaws.length} rujukan ditemukan</p>
          </div>

          {/* Laws Grid (Light Cards for Readability) */}
          {filteredLaws.length === 0 ? (
            <div className="card-dark text-center text-gray-400">
              Tidak ada rujukan yang cocok.{' '}
              <button
                type="button"
                className="text-brass-light underline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Hapus pencarian & filter
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredLaws.map((law) => {
                const v = VERIFICATION_LABELS[law.verification?.status] || VERIFICATION_LABELS['perlu-verifikasi'];
                const isQuote = law.textType !== 'ringkasan';
                return (
                  <article key={law.id} className="light-interface p-6 rounded-xl shadow-lg border border-ink/15 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2 items-start mb-3">
                        <span className="text-xs font-bold px-2.5 py-1 bg-paper-deep text-crimson rounded-full">{law.category}</span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${v.className}`}>
                          <v.Icon size={12} aria-hidden="true" /> {v.label}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-ink mb-3">{law.title}</h2>

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
                      {law.verification?.note && (
                        <p className="text-xs text-gray-600 mb-4">Catatan verifikasi: {law.verification.note}</p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-ink/15 flex justify-between items-center gap-3 text-xs text-gray-600">
                      <span>Sumber: {law.source}</span>
                      {law.verification?.refs?.[0] && (
                        <a
                          href={law.verification.refs[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-crimson flex items-center gap-1 shrink-0 hover:underline"
                        >
                          Rujukan <ExternalLink size={14} aria-hidden="true" />
                          <span className="sr-only">(membuka tab baru)</span>
                        </a>
                      )}
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

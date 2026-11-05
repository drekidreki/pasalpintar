import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import { laws } from '../data/laws';

export default function LawLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Hak Asasi Manusia', 'Kewajiban Warga Negara', 'Lingkungan & Kesejahteraan', 'Pengelolaan Sampah', 'Keselamatan Lalu Lintas', 'Hak Pendidikan'];

  const filteredLaws = laws.filter(law => {
    const matchesSearch = law.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          law.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          law.simpleExplanation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || law.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-navy-primary flex flex-col pb-20 md:pb-0">
      <Navbar />
      
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <BookOpen className="text-accent-blue" /> Law Library
            </h1>
            <p className="text-gray-400">Pusat rujukan resmi undang-undang dan hak-kewajiban warga negara Republik Indonesia.</p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari pasal, kata kunci, atau penjelasan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-navy-secondary border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat ? 'bg-accent-blue text-white' : 'bg-navy-secondary text-gray-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Laws Grid (Light Cards for Readability) */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredLaws.map(law => (
              <div key={law.id} className="light-interface p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 bg-blue-100 text-accent-blue rounded-full">
                      {law.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-navy-primary mb-3">{law.title}</h3>
                  <p className="text-sm text-gray-800 italic bg-white p-3 rounded-lg border border-gray-200 mb-4 leading-relaxed">
                    "{law.text}"
                  </p>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-4">
                    <span className="block text-xs font-bold text-accent-blue uppercase mb-1">Penjelasan Sederhana</span>
                    <p className="text-xs text-gray-700">{law.simpleExplanation}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
                  <span>Sumber: {law.source}</span>
                  <ExternalLink size={14} className="text-accent-blue" />
                </div>
              </div>
            ))}
          </div>

        </motion.div>
      </main>
    </div>
  );
}
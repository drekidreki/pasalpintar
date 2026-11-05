import { motion } from 'framer-motion';
import { X, FileText } from 'lucide-react';

export default function EvidenceCard({ evidence, onClose }) {
  if (!evidence) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="light-interface w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-2 text-navy-primary font-bold">
            <FileText size={20} className="text-accent-blue" />
            <span>Investigation Document</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto bg-ui-lightBg">
          <h2 className="text-2xl font-bold mb-4">{evidence.title}</h2>
          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 text-gray-800 leading-relaxed">
            {evidence.description}
          </div>
          <div className="bg-blue-50 border-l-4 border-accent-blue p-4 rounded-r-lg">
            <h4 className="text-sm font-bold text-accent-blue mb-1">🔍 Key Takeaway</h4>
            <p className="text-sm text-gray-700">{evidence.clue}</p>
          </div>
        </div>
        
        <div className="p-4 bg-white border-t border-gray-200 flex justify-end">
          <button onClick={onClose} className="btn-primary py-2 px-6">
            Log Evidence
          </button>
        </div>
      </motion.div>
    </div>
  );
}
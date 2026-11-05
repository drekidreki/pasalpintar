import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-navy-primary">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[100px]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 px-6 max-w-2xl"
      >
        <div className="flex justify-center mb-6">
          <Scale size={64} className="text-accent-blue" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
          PASAL<span className="text-accent-blue">PINTAR</span>
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-gray-300 mb-8">
          Know Your Rights. Make Your Move.
        </h2>
        <p className="text-gray-400 mb-12 leading-relaxed">
          Jadilah Civic Response Officer. Investigasi pelanggaran hak, identifikasi hukum yang berlaku, dan ambil keputusan yang akan mengubah masa depan kota.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/character-select" className="btn-primary">
            Start Your Journey
          </Link>
          <button className="btn-secondary">
            Explore the Game
          </button>
        </div>
      </motion.div>
    </div>
  );
}
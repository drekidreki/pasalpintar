import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';
import { CASE_COUNT } from '../data/caseCount';
import { useGameProgress } from '../hooks/useGameProgress';

export default function Landing() {
  const { progress } = useGameProgress();
  const returning = Boolean(progress.characterId);

  return (
    <div className="min-h-screen p-3 sm:p-5 flex overflow-x-hidden">
      <div className="wood-frame flex-1 flex">
        <main className="cork flex-1 flex items-center justify-center px-4 py-12 sm:px-8 overflow-hidden">
          <div className="relative w-full max-w-3xl">
            {/* Title card: the one moment of motion on this page */}
            <motion.section
              initial={{ opacity: 0, y: -24, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: -1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="light-interface relative shadow-lifted px-6 py-10 sm:px-12 sm:py-12 origin-top"
              aria-labelledby="game-title"
            >
              <span className="pin pin-red" aria-hidden="true" />
              <h1
                id="game-title"
                className="font-display font-extrabold uppercase text-ink leading-[0.85] tracking-[0.02em] text-[clamp(2.6rem,11vw,6.25rem)]"
              >
                Pasalpintar
              </h1>
              <p className="font-display font-bold text-2xl sm:text-3xl text-crimson mt-3">
                Know your rights. Make your move.
              </p>
              <p className="text-ink/85 text-lg leading-relaxed mt-5 max-w-[60ch]">
                Jadilah Civic Response Officer. Investigasi pelanggaran hak, identifikasi hukum yang berlaku, dan ambil
                keputusan yang akan mengubah masa depan kota.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link to={returning ? '/dashboard' : '/character-select'} className="btn-primary text-lg">
                  {returning ? 'Lanjutkan ke papan kasus' : 'Start Your Journey'}
                </Link>
                {/* Previously a button with no action; now opens the legal reference library. */}
                <Link
                  to="/law-library"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold text-ink border-2 border-ink/70 hover:bg-ink/5"
                >
                  Explore the Game
                </Link>
              </div>
            </motion.section>

            {/* Pinned scraps around the title card */}
            <div className="flex flex-wrap items-start justify-between gap-6 mt-10 sm:mt-0">
              <p className="sticky-note relative sm:absolute sm:-bottom-24 sm:left-0 lg:-left-10 rotate-[-4deg] w-56 text-xl leading-snug">
                <span className="pin" aria-hidden="true" />
                {CASE_COUNT} berkas kasus menunggu di papan.
              </p>
              <div className="print relative sm:absolute sm:-top-24 sm:-right-2 lg:-top-28 lg:-right-24 rotate-[5deg] w-40" aria-hidden="true">
                <span className="pin" />
                <span
                  className="photo block"
                  style={{ background: 'radial-gradient(circle at 30% 25%, #6B5B45, #2E261C)' }}
                >
                  <Scale size={56} strokeWidth={1.25} className="text-[#EFE6D2]/85" />
                </span>
                <span className="block font-hand text-center text-base mt-2">UUD 1945, Pasal 27–31</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

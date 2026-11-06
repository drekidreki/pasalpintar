import { Link } from 'react-router-dom';
import { SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-10 text-center">
      <SearchX size={48} className="text-accent-blue" aria-hidden="true" />
      <h1 className="text-2xl font-bold">Halaman tidak ditemukan</h1>
      <p className="text-gray-400 max-w-md">Alamat yang kamu buka tidak tersedia di PASALPINTAR.</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/dashboard" className="btn-primary">Ke Dashboard</Link>
        <Link to="/" className="btn-secondary">Ke Beranda</Link>
      </div>
    </main>
  );
}

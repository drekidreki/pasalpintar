import { Component } from 'react';

/**
 * Last line of defence: instead of a blank page, explain what happened and
 * offer a reload. Progress is stored in LocalStorage and is not affected.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('PASALPINTAR error:', error, info?.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="card-dark max-w-md text-center" role="alert">
          <h1 className="font-display font-bold text-2xl mb-2">Halaman gagal dimuat</h1>
          <p className="text-gray-300 text-sm mb-5">
            Mungkin koneksi terputus atau game baru saja diperbarui. Progresmu tersimpan di perangkat ini dan tidak hilang.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button type="button" className="btn-primary" onClick={() => window.location.reload()}>
              Muat ulang
            </button>
            <a href="/dashboard" className="px-4 py-2 rounded-md border border-white/20 hover:border-brass">
              Ke papan kasus
            </a>
          </div>
        </div>
      </main>
    );
  }
}

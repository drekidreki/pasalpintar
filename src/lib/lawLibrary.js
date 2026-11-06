/** Helpers for the Law Library page. */

export const LAW_GROUPS = [
  ['all', 'Semua rujukan'],
  ['uud', 'Hak & kewajiban UUD (Pasal 27–31)'],
  ['uu', 'Undang-undang & peraturan'],
];

const UUD_ARTICLE = /^UUD 1945 Pasal (\d+)/;

/** 'uud' for UUD 1945 Articles 27–31, otherwise 'uu'. */
export function lawGroup(law) {
  const m = UUD_ARTICLE.exec(law?.title || '');
  if (!m) return 'uu';
  const n = Number(m[1]);
  return n >= 27 && n <= 31 ? 'uud' : 'uu';
}

const STATUS_TEXT = {
  resmi: 'dicek ke sumber resmi',
  sekunder: 'dicek ke sumber sekunder',
  'perlu-verifikasi': 'perlu verifikasi',
};

/**
 * Plain text for copying. A summary is never presented as a quote, and the
 * verification status travels with the text.
 */
export function citationText(law) {
  const isQuote = law.textType !== 'ringkasan';
  const body = isQuote ? `"${law.text}"` : `Ringkasan (bukan kutipan): ${law.text}`;
  const status = STATUS_TEXT[law.verification?.status] || STATUS_TEXT['perlu-verifikasi'];
  return `${law.title}\n${body}\nSumber: ${law.source} (${status}).`;
}

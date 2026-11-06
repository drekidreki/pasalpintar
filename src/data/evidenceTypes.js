/**
 * Evidence categories used in the investigation stage.
 * Each one has a clear educational purpose; the player classifies every
 * document and gets feedback explaining the right category.
 */
export const EVIDENCE_CATEGORIES = [
  {
    id: 'primer',
    label: 'Bukti utama',
    purpose: 'Langsung menunjukkan peristiwa atau pelanggaran yang dipersoalkan.',
  },
  {
    id: 'pendukung',
    label: 'Bukti pendukung',
    purpose: 'Menguatkan bukti utama atau menunjukkan dampaknya, tetapi tidak membuktikannya sendirian.',
  },
  {
    id: 'konteks',
    label: 'Bukti konteks',
    purpose: 'Menjelaskan latar dan keadaan. Membantu memahami, tetapi tidak membuktikan pelanggaran.',
  },
  {
    id: 'kontradiktif',
    label: 'Bukti yang bertentangan',
    purpose: 'Berlawanan dengan temuan lain. Belum tentu salah; perlu diuji dengan bukti lain.',
  },
  {
    id: 'pengalih',
    label: 'Pengalih perhatian (red herring)',
    purpose: 'Tampak berkaitan, tetapi tidak membuktikan tuduhan pokok. Informasinya benar, hanya tidak relevan.',
  },
];

export const categoryById = Object.fromEntries(EVIDENCE_CATEGORIES.map((c) => [c.id, c]));

/** Qualitative reliability; the reason is always shown next to it. No percentages. */
export const RELIABILITY_LABELS = {
  tinggi: 'Keandalan tinggi',
  sedang: 'Keandalan sedang',
  rendah: 'Keandalan rendah',
};

export const RELATION_LABELS = {
  mendukung: 'mendukung',
  membantah: 'bertentangan dengan',
  konteks: 'memberi konteks untuk',
};

export const FINDING_STATUS = {
  'didukung-bukti': { label: 'Didukung bukti', tone: 'good' },
  'baru-kesaksian': { label: 'Baru berdasarkan kesaksian', tone: 'warn' },
  dipertentangkan: { label: 'Ada bukti yang bertentangan', tone: 'alert' },
  konteks: { label: 'Baru konteks', tone: 'neutral' },
};

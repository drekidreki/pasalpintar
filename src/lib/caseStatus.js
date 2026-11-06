/** Rubber-stamp text and ink colour for each real case state. */
export const STAMPS = {
  locked: { text: 'TERKUNCI', color: '#5B5248', action: 'Terkunci' },
  completed: { text: 'TERBUKTI', color: '#A8232D', action: 'Selidiki ulang' },
  inProgress: { text: 'DISELIDIKI', color: '#7A5212', action: 'Lanjutkan penyelidikan' },
  new: { text: 'CONFIDENTIAL', color: '#A8232D', action: 'Buka berkas' },
};

export function caseStatus(chapter, progress) {
  if (!chapter.isUnlocked) return 'locked';
  if (progress.completedCases.includes(chapter.id)) return 'completed';
  if (progress.inProgressCases.includes(chapter.id)) return 'inProgress';
  return 'new';
}

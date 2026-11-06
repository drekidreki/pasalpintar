/**
 * Real-World Action Guide helpers: plain-text export (for copying) and a
 * clipboard helper that also works where the async Clipboard API is missing.
 */
export const GUIDE_DISCLAIMER =
  'Panduan umum untuk belajar, bukan nasihat hukum. Kanal dan nomor layanan dapat berubah, jadi cek kembali di situs resmi lembaganya.';

export function formatCheckedAt(iso) {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function buildGuideText(caseData) {
  const g = caseData?.actionGuide;
  if (!g) return '';
  const lines = [`PANDUAN AKSI — ${caseData.title}`, g.title, '', 'Langkah:'];
  g.steps.forEach((s, i) => lines.push(`${i + 1}. ${s}`));
  if (g.contacts?.length) {
    lines.push('', 'Ke mana melapor:');
    for (const c of g.contacts) {
      lines.push(`- ${c.name}: ${c.use} ${c.how}`.trim());
    }
  }
  if (caseData.realWorldAction?.length) {
    lines.push('', 'Kebiasaan baik:');
    caseData.realWorldAction.forEach((a) => lines.push(`- ${a}`));
  }
  lines.push('', GUIDE_DISCLAIMER);
  if (g.checkedAt) lines.push(`Dicek pada ${formatCheckedAt(g.checkedAt)}.`);
  lines.push('Sumber: PASALPINTAR');
  return lines.join('\n');
}

/** Copy text; resolves true on success, false otherwise. Never throws. */
export async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy path
  }
  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

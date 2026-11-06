/**
 * Playable investigators.
 * char-01 and char-02 keep their original ids and fields (saved progress
 * references them). New fields are additive:
 * - roleLabel: Indonesian role shown in the UI
 * - focus: what this perspective tends to notice
 * - iconKey / tint: used by InvestigatorAvatar
 */
export const characters = [
  {
    id: "char-01",
    name: "Arya",
    role: "Investigative Journalist",
    roleLabel: "Jurnalis investigasi",
    description: "Mencari kebenaran di balik setiap peristiwa. Memiliki kemampuan analisis informasi yang tajam.",
    avatar: "🧑‍💻", // kept for backward compatibility
    iconKey: "newspaper",
    tint: ["#4E5D73", "#232B38"],
    focus: [
      "Memisahkan fakta, klaim, dan dugaan",
      "Menelusuri sumber dan urutan kejadian",
      "Kepentingan publik dan keterbukaan proses",
    ],
  },
  {
    id: "char-02",
    name: "Citra",
    role: "Legal Aid Volunteer",
    roleLabel: "Relawan bantuan hukum",
    description: "Berdedikasi membantu masyarakat memahami hak mereka. Ahli dalam merumuskan argumen hukum.",
    avatar: "👩‍⚖️",
    iconKey: "scale",
    tint: ["#6B4A3A", "#2E1F18"],
    focus: [
      "Hak siapa yang terdampak dan siapa pemikul kewajibannya",
      "Prosedur yang adil dan bukti yang bisa dipakai melapor",
      "Pemulihan bagi korban, bukan sekadar hukuman",
    ],
  },
  {
    id: "char-03",
    name: "Raka",
    role: "High School Student",
    roleLabel: "Siswa SMA kelas XI",
    description: "Aktif di grup angkatan dan berjalan kaki ke sekolah setiap hari. Melihat masalah dari sudut pandang teman sebaya.",
    avatar: "🧑‍🎓",
    iconKey: "backpack",
    tint: ["#4F6B66", "#24332F"],
    focus: [
      "Apa yang dialami dan dirasakan teman sebaya",
      "Tekanan kelompok dan budaya ikut-ikutan",
      "Saluran yang bisa dipakai siswa untuk melapor",
    ],
  },
  {
    id: "char-04",
    name: "Bu Laras",
    role: "Teacher & Homeroom Adviser",
    roleLabel: "Guru & wali kelas",
    description: "Guru Pendidikan Pancasila sekaligus wali kelas. Terbiasa menimbang keselamatan murid dan tanggung jawab sekolah.",
    avatar: "👩‍🏫",
    iconKey: "school",
    tint: ["#6E6250", "#332C22"],
    focus: [
      "Keselamatan dan kesejahteraan murid",
      "Kewajiban sekolah dan lembaga",
      "Rencana yang benar-benar bisa dijalankan",
    ],
  },
];

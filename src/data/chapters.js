export const chapters = [
  {
    id: "case-01",
    title: "Digital Responsibility",
    category: "Digital Rights",
    description: "Cyberbullying dan penyalahgunaan media sosial yang mengancam keamanan warga.",
    isUnlocked: true,
    briefing: {
      situation: "Seorang siswa SMA bernama Budi tidak masuk sekolah selama satu minggu. Keluarga melaporkan bahwa Budi mengalami depresi dan ketakutan setelah fotonya diedit menjadi meme dengan ancaman kekerasan fisik, lalu disebarkan di grup media sosial angkatan sekolah.",
      location: "SMA Negeri 1 Kota, Ruang Siber",
      characters: ["Budi (Korban)", "Siska (Ketua Kelas / Saksi)", "Anonim (Terduga Pelaku)"],
      report: "Laporan Wali Kelas kepada pihak Bimbingan Konseling dan Komite Sekolah.",
      objective: "Kumpulkan bukti penyebaran konten, temukan saksi kunci, dan identifikasi pelanggaran hak yang terjadi sebelum membawa kasus ini ke ruang keputusan."
    },
    investigation: {
      evidence: [
        { id: "ev-1", type: "document", title: "Screenshot Grup Chat", description: "Tangkapan layar grup 'Angkatan 2024'. Terlihat akun anonim mengirim meme wajah Budi dengan tulisan 'Habisi dia sepulang sekolah'. Pesan ini di-forward berkali-kali.", clue: "Ada unsur ancaman fisik yang jelas, bukan sekadar ejekan." },
        { id: "ev-2", type: "document", title: "Laporan Absensi & Konseling", description: "Catatan BK menunjukkan Budi absen 5 hari berturut-turut dengan keterangan 'Sakit'. Catatan wali kelas menyebutkan Budi sempat menangis di kelas sebelum pulang lebih awal minggu lalu.", clue: "Dampak psikologis dan terganggunya hak pendidikan korban sangat nyata." }
      ],
      witnesses: [
        {
          id: "wit-1", name: "Siska (Ketua Kelas)", avatar: "👧",
          dialogues: [
            "Awalnya saya kira itu cuma bercandaan biasa di grup kelas.",
            "Tapi makin lama komentarnya makin kasar. Ada yang bahas mau hadang Budi di gerbang sekolah.",
            "Saya sudah tegur mereka, tapi akun anonim itu malah mengancam saya juga kalau ikut campur."
          ]
        }
      ]
    },
    legalAnalysis: {
      rightsAffected: [
        { id: "r1", label: "Hak atas perlindungan diri pribadi, keluarga, kehormatan, dan rasa aman", isCorrect: true, explanation: "Setiap orang berhak atas rasa aman dan perlindungan dari ancaman ketakutan (UUD 1945 Pasal 28G ayat (1)). Sebagai anak, Budi juga berhak atas perlindungan dari kekerasan (Pasal 28B ayat (2))." },
        { id: "r2", label: "Hak untuk bebas dari pekerjaan paksa", isCorrect: false, explanation: "Kasus ini tidak berkaitan dengan eksploitasi tenaga kerja." },
        { id: "r3", label: "Hak memperoleh pendidikan yang layak tanpa intimidasi", isCorrect: true, explanation: "Aksi perundungan menyebabkan Budi takut pergi ke sekolah sehingga hak belajarnya terganggu (UUD 1945 Pasal 31 ayat (1) dan Pasal 28C ayat (1))." }
      ],
      dutiesNeglected: [
        { id: "d1", label: "Kewajiban menghormati hak asasi manusia orang lain dalam tertib kehidupan bermasyarakat", isCorrect: true, explanation: "Pelaku mengabaikan kewajiban menghormati hak asasi orang lain (UUD 1945 Pasal 28J ayat (1)). Kebebasan berekspresi di media sosial pun dibatasi demi hak orang lain (Pasal 28J ayat (2))." },
        { id: "d2", label: "Kewajiban membayar pajak tepat waktu", isCorrect: false, explanation: "Kewajiban perpajakan tidak relevan dengan konteks kasus siber di lingkungan sekolah ini." }
      ],
      legalArticles: [
        { id: "l1", label: "UUD 1945 Pasal 28G ayat (1) - Perlindungan Diri & Rasa Aman", isCorrect: true },
        { id: "l2", label: "UUD 1945 Pasal 28J ayat (1) - Menghormati Hak Orang Lain", isCorrect: true },
        { id: "l3", label: "UU ITE Pasal 29 (diubah UU No. 1 Tahun 2024) - Ancaman Kekerasan melalui Informasi Elektronik", isCorrect: true },
        { id: "l4", label: "UUD 1945 Pasal 33 - Perekonomian Nasional", isCorrect: false }
      ]
    },
    decisions: [
      {
        id: "dec-1",
        title: "Mediasi Sekolah & Program Edukasi Etika Digital",
        stakeholders: "Pihak Sekolah, Orang Tua, Konselor BK, Kepolisian (Bhabinkamtibmas)",
        description: "Lakukan investigasi internal sekolah untuk mengidentifikasi akun anonim, adakan mediasi keluarga, berikan pendampingan psikologis bagi Budi, serta terapkan program literasi digital wajib.",
        benefits: "Memulihkan kondisi Budi, memberikan edukasi menyeluruh kepada siswa, dan menjaga kondusivitas sekolah tanpa langsung mempidanakan anak.",
        consequences: "Proses penelusuran akun anonim membutuhkan waktu dan pendampingan ekstra.",
        feasibility: "Tinggi (Dapat segera dilaksanakan sekolah)",
        legalAccuracyScore: 25,
        solutionQualityScore: 30,
        cityImpact: { socialStability: 10, legalIntegrity: 10, regionalDevelopment: 0, publicTrust: 15 },
        isOptimal: true
      },
      {
        id: "dec-2",
        title: "Langsung Melaporkan Pelaku ke Jalur Hukum Pidana",
        stakeholders: "Kepolisian, Kuasa Hukum",
        description: "Mengajukan laporan pidana resmi atas dugaan pengancaman di media sosial tanpa melalui prosedur penanganan anak di lingkungan sekolah.",
        benefits: "Memberikan efek jera secara instan.",
        consequences: "Dapat menimbulkan trauma tambahan bagi siswa yang terlibat, memicu ketakutan massal, serta mengabaikan prinsip restoratif pada lingkungan pendidikan.",
        feasibility: "Sedang (Memerlukan proses hukum formal yang panjang)",
        legalAccuracyScore: 15,
        solutionQualityScore: 15,
        cityImpact: { socialStability: -10, legalIntegrity: 5, regionalDevelopment: 0, publicTrust: -5 },
        isOptimal: false
      },
      {
        id: "dec-3",
        title: "Mengabaikan Masalah & Menganggapnya Candaan Remaja",
        stakeholders: "Tidak Ada",
        description: "Menyarankan Budi untuk keluar dari grup dan membiarkan situasi mendingin dengan sendirinya.",
        benefits: "Tidak memerlukan usaha atau intervensi.",
        consequences: "Ancaman fisik berpotensi terealisasi, kesehatan mental Budi memburuk, dan iklim sekolah menjadi tidak aman.",
        feasibility: "Sangat Rendah (Tidak menyelesaikan masalah)",
        legalAccuracyScore: 0,
        solutionQualityScore: 0,
        cityImpact: { socialStability: -20, legalIntegrity: -15, regionalDevelopment: 0, publicTrust: -20 },
        isOptimal: false
      }
    ],
    realWorldAction: [
      "Simpan bukti percakapan atau tangkapan layar jika mengalami atau menyaksikan perundungan siber.",
      "Laporkan ke pihak sekolah (Wali Kelas, guru BK, atau kepala sekolah) dan gunakan fitur pelaporan di platform media sosial. Konten bermasalah juga dapat diadukan melalui kanal aduan konten resmi Kementerian Komunikasi dan Digital (Komdigi).",
      "Selalu junjung etika berinternet dan hormati hak privasi serta martabat orang lain di ruang digital."
    ]
  },
  {
    id: "case-02",
    title: "The Broken Environment",
    category: "Environmental Law",
    description: "Krisis pengelolaan sampah yang melanggar hak atas lingkungan yang sehat.",
    isUnlocked: true,
    briefing: {
      situation: "Tumpukan sampah liar menumpuk di bantaran Sungai Hijau dekat pemukiman Warga RW 04. Bau menyengat dan munculnya wabah penyakit kulit mulai mengganggu warga. Pengusaha lahan mengklaim pembuangan limbah tersebut sudah berizin informal.",
      location: "Bantaran Sungai Hijau, Kelurahan Mekar",
      characters: ["Pak RT (Pelapor)", "Pemilik Lahan Swasta", "Petugas Dinas Lingkungan Hidup"],
      report: "Aduan Masyarakat RW 04 kepada Posko Civic Response.",
      objective: "Investigasi sumber limbah, identifikasi pasal pengabaian lingkungan hidup, dan rumuskan solusi pengelolaan sampah yang terpadu."
    },
    investigation: {
      evidence: [
        { id: "ev-1", type: "document", title: "Sampel & Foto Lokasi", description: "Dokumentasi gunungan sampah plastik dan limbah rumah tangga cair yang merembes langsung ke aliran sungai.", clue: "Pencemaran sudah mengganggu ekosistem air dan kesehatan warga." },
        { id: "ev-2", type: "document", title: "Surat Aduan Puskesmas", description: "Laporan peningkatan kasus ISPA dan penyakit kulit pada anak-anak di RW 04 selama 2 bulan terakhir.", clue: "Pelanggaran hak atas lingkungan sehat berdampak langsung pada hak kesehatan." }
      ],
      witnesses: [
        {
          id: "wit-1", name: "Pak RT 04", avatar: "👨‍💼",
          dialogues: [
            "Warga sudah berulang kali menegur truk yang buang sampah malam-malam.",
            "Tapi pengelola lahan bilang ini area pribadi, padahal letaknya persis di pinggir sungai umum."
          ]
        }
      ]
    },
    legalAnalysis: {
      rightsAffected: [
        { id: "r1", label: "Hak atas lingkungan hidup yang baik dan sehat", isCorrect: true, explanation: "Diatur eksplisit dalam UUD 1945 Pasal 28H ayat (1): hak atas lingkungan hidup yang baik dan sehat serta pelayanan kesehatan." },
        { id: "r2", label: "Hak memilih kewarganegaraan", isCorrect: false, explanation: "Tidak ada hubungannya dengan status kewarganegaraan." }
      ],
      dutiesNeglected: [
        { id: "d1", label: "Kewajiban menangani sampah secara berwawasan lingkungan dan membuangnya pada tempat yang ditentukan", isCorrect: true, explanation: "Setiap orang wajib mengurangi dan menangani sampah secara berwawasan lingkungan (UU No. 18 Tahun 2008 Pasal 12 ayat (1)) dan dilarang membuang sampah tidak pada tempat yang ditentukan (Pasal 29 ayat (1) huruf e)." }
      ],
      legalArticles: [
        { id: "l1", label: "UUD 1945 Pasal 28H ayat (1) - Lingkungan Sehat", isCorrect: true },
        { id: "l2", label: "UU No. 18 Tahun 2008 Pasal 29 ayat (1) huruf e - Larangan Membuang Sampah Tidak pada Tempatnya", isCorrect: true }
      ]
    },
    decisions: [
      {
        id: "dec-1",
        title: "Pembersihan Terpadu & Penerapan Bank Sampah RW",
        stakeholders: "Dinas Lingkungan Hidup, Pengurus RT/RW, Warga",
        description: "Tutup TPS ilegal, koordinasikan pembersihan armada DLH, dan bentuk Bank Sampah kelolaan warga.",
        benefits: "Solusi jangka panjang yang memulihkan lingkungan dan memberdayakan ekonomi warga.",
        consequences: "Membutuhkan komitmen warga untuk memilah sampah dari rumah.",
        feasibility: "Tinggi",
        legalAccuracyScore: 25,
        solutionQualityScore: 30,
        cityImpact: { socialStability: 15, legalIntegrity: 15, regionalDevelopment: 10, publicTrust: 20 },
        isOptimal: true
      }
    ],
    realWorldAction: [
      "Pilahlah sampah organik dan anorganik dari rumah.",
      "Gunakan saluran resmi sistem pengaduan daerah jika menemukan TPS ilegal."
    ]
  },
  {
    id: "case-03",
    title: "Rules of The Road",
    category: "Public Safety",
    description: "Pelanggaran lalu lintas yang membahayakan keselamatan pengguna jalan.",
    isUnlocked: true,
    briefing: {
      situation: "Trotoar jalan utama Kota banyak diokupasi oleh pengendara motor yang melawan arus dan pedagang ilegal. Pejalan kaki dan penyandang disabilitas terpaksa berjalan di bahu jalan raya yang padat.",
      location: "Jl. Pemuda Km 4",
      characters: ["Pejalan Kaki", "Pengendara Motor", "Petugas Satpol PP & Dishub"],
      report: "Laporan Forum Pejalan Kaki Kota.",
      objective: "Identifikasi aturan lalu lintas yang dilanggar dan rancang penataan fasilitas publik yang aman."
    },
    investigation: {
      evidence: [
        { id: "ev-1", type: "document", title: "Rekaman CCTV Jalan", description: "Rekaman menunjukkan motor melintas cepat di atas trotoar saat jam macet.", clue: "Trotoar yang merupakan hak pejalan kaki diusik secara berbahaya." }
      ],
      witnesses: [
        {
          id: "wit-1", name: "Ibu Rahma (Pejalan Kaki)", avatar: "👩",
          dialogues: ["Saya hampir tertabrak motor saat menuntun anak saya di trotoar. Kami tidak punya ruang lagi."]
        }
      ]
    },
    legalAnalysis: {
      rightsAffected: [{ id: "r1", label: "Hak atas keselamatan dan kenyamanan fasilitas jalan umum bagi pejalan kaki", isCorrect: true, explanation: "Pejalan kaki berhak atas fasilitas pendukung seperti trotoar (UU No. 22 Tahun 2009 Pasal 131 ayat (1); trotoar termasuk fasilitas pendukung menurut Pasal 45 ayat (1)). Penyandang disabilitas berhak atas kemudahan khusus (UUD 1945 Pasal 28H ayat (2))." }],
      dutiesNeglected: [{ id: "d1", label: "Kewajiban pengemudi mengutamakan keselamatan pejalan kaki serta mengemudi dengan wajar dan penuh konsentrasi", isCorrect: true, explanation: "UU No. 22 Tahun 2009 Pasal 106 ayat (1) dan (2). Setiap warga negara juga wajib menjunjung hukum (UUD 1945 Pasal 27 ayat (1))." }],
      legalArticles: [{ id: "l1", label: "UU No. 22 Tahun 2009 Pasal 106 & Pasal 131 - Kewajiban Pengemudi dan Hak Pejalan Kaki", isCorrect: true }]
    },
    decisions: [
      {
        id: "dec-1",
        title: "Pemasangan Bolard Pembatas & Operasi Penertiban Berkelanjutan",
        stakeholders: "Dishub, Satlantas, Satpol PP",
        description: "Pasang pembatas fisik trotoar agar motor tidak bisa masuk dan tingkatkan penilangan elektronik.",
        benefits: "Mengembalikan fungsi penuh trotoar untuk pejalan kaki secara instan.",
        consequences: "Diperlukan pengawasan konsisten di lapangan.",
        feasibility: "Tinggi",
        legalAccuracyScore: 25,
        solutionQualityScore: 30,
        cityImpact: { socialStability: 10, legalIntegrity: 20, regionalDevelopment: 5, publicTrust: 15 },
        isOptimal: true
      }
    ],
    realWorldAction: ["Selalu utamakan keselamatan pejalan kaki dan jangan menggunakan trotoar saat berkendara."]
  },
  {
    id: "case-04",
    title: "The Right to Learn",
    category: "Education Rights",
    description: "Hambatan ekonomi yang mengancam keberlanjutan pendidikan anak daerah.",
    isUnlocked: true,
    briefing: {
      situation: "Anak usia sekolah di Kampung Pesisir berhenti sekolah untuk bekerja membantu ekonomi keluarga sebagai pemilah ikan. Pungutan liar di sekolah setempat memperburuk kondisi.",
      location: "Kampung Pesisir Indah",
      characters: ["Anak Pesisir", "Tokoh Masyarakat", "Kepala Dinas Pendidikan"],
      report: "Surat Terbuka Relawan Mengajar.",
      objective: "Analisislah kewajiban negara dalam menjamin pendidikan dasar dan selesaikan persoalan biaya pendidikan."
    },
    investigation: {
      evidence: [
        { id: "ev-1", type: "document", title: "Kwitansi Pungutan Sekolah", description: "Rincian biaya wajib yang dibebankan kepada siswa tidak mampu.", clue: "Bertentangan dengan prinsip pendidikan dasar bebas biaya." }
      ],
      witnesses: [
        { id: "wit-1", name: "Pak Budi (Relawan)", avatar: "👨‍🏫", dialogues: ["Anak-anak ingin belajar, tapi orang tua tidak mampu membayar biaya tambahan sekolah."] }
      ]
    },
    legalAnalysis: {
      rightsAffected: [{ id: "r1", label: "Hak memperoleh pendidikan dasar yang dibiayai negara", isCorrect: true, explanation: "UUD 1945 Pasal 31 ayat (1) dan (2): setiap warga negara berhak mendapat pendidikan dan wajib mengikuti pendidikan dasar yang dibiayai pemerintah." }],
      dutiesNeglected: [{ id: "d1", label: "Kewajiban negara memprioritaskan anggaran pendidikan dan membebaskan biaya pendidikan dasar", isCorrect: true, explanation: "Pemerintah wajib membiayai pendidikan dasar (UUD 1945 Pasal 31 ayat (2)) dan memprioritaskan anggaran pendidikan minimal 20% (Pasal 31 ayat (4)). Pungutan oleh oknum sekolah menghambat kewajiban ini, sehingga pemerintah daerah wajib menertibkannya." }],
      legalArticles: [{ id: "l1", label: "UUD 1945 Pasal 31 ayat (1), (2) & (4) - Hak dan Kewajiban Pendidikan", isCorrect: true }]
    },
    decisions: [
      {
        id: "dec-1",
        title: "Penertiban Pungli & Penyaluran Beasiswa Bantuan Kurang Mampu",
        stakeholders: "Dinas Pendidikan, Inspektorat Daerah",
        description: "Hapus seluruh biaya ilegal, tindak oknum, dan salurkan Kartu Indonesia Pintar/Bantuan Khusus.",
        benefits: "Anak-anak dapat kembali sekolah tanpa beban biaya.",
        consequences: "Membutuhkan audit finansial sekolah.",
        feasibility: "Tinggi",
        legalAccuracyScore: 25,
        solutionQualityScore: 30,
        cityImpact: { socialStability: 20, legalIntegrity: 15, regionalDevelopment: 20, publicTrust: 25 },
        isOptimal: true
      }
    ],
    realWorldAction: ["Laporkan pungutan yang tidak sah di sekolah kepada Dinas Pendidikan setempat atau Ombudsman Republik Indonesia."]
  },
  {
    id: "case-05",
    title: "The People's Voice",
    category: "Urban Development",
    description: "Konflik relokasi pembangunan yang berdampak pada masyarakat setempat.",
    isUnlocked: true,
    briefing: {
      situation: "Rencana pembangunan fasilitas publik berdampak pada penggusuran sepihak pemukiman warga tanpa adanya dialog ganti rugi yang layak dan musyawarah mufakat.",
      location: "Kawasan Bantaran Pinggir Kota",
      characters: ["Perwakilan Warga", "Pengembang", "Pemerintah Kota"],
      report: "Aduan Lembaga Bantuan Hukum (LBH).",
      objective: "Identifikasi hak atas penghidupan yang layak dan fasilitasi dialog partisipatif."
    },
    investigation: {
      evidence: [
        { id: "ev-1", type: "document", title: "Surat Peringatan Pengosongan", description: "Surat sepihak memberikan tenggat waktu 3 hari tanpa opsi relokasi.", clue: "Prosedur pengosongan tidak memenuhi prinsip musyawarah." }
      ],
      witnesses: [
        { id: "wit-1", name: "Ibu Nur (Perwakilan Warga)", avatar: "👵", dialogues: ["Kami tidak menolak pembangunan, tapi ajaklah kami bicara dan berikan tempat tinggal pengganti."] }
      ]
    },
    legalAnalysis: {
      rightsAffected: [{ id: "r1", label: "Hak atas tempat tinggal dan penghidupan yang layak", isCorrect: true, explanation: "UUD 1945 Pasal 28H ayat (1) (hak bertempat tinggal) dan Pasal 27 ayat (2) (penghidupan yang layak). Jika warga memiliki hak atas tanah/bangunannya, hak itu tidak boleh diambil alih sewenang-wenang (Pasal 28H ayat (4))." }],
      dutiesNeglected: [{ id: "d1", label: "Kewajiban pemerintah menghormati hak asasi warga dalam proses pembangunan publik", isCorrect: true, explanation: "Perlindungan dan pemenuhan hak asasi manusia adalah tanggung jawab negara, terutama pemerintah (UUD 1945 Pasal 28I ayat (4)). Pengembang dan semua pihak juga wajib menghormati hak orang lain (Pasal 28J ayat (1))." }],
      legalArticles: [{ id: "l1", label: "UUD 1945 Pasal 28H ayat (1) & (4), Pasal 28I ayat (4), Pasal 28J ayat (1)", isCorrect: true }]
    },
    decisions: [
      {
        id: "dec-1",
        title: "Pemberhentian Sementara Pengosongan & Musyawarah Relokasi Layak",
        stakeholders: "Pemkot, Warga, LBH, Pengembang",
        description: "Hentikan pengosongan sepihak dan adakan musyawarah terbuka untuk menentukan skema ganti rugi dan Rusunawa.",
        benefits: "Menjaga keadilan sosial dan keharmonisan kota.",
        consequences: "Jadwal proyek sedikit tertunda.",
        feasibility: "Tinggi",
        legalAccuracyScore: 25,
        solutionQualityScore: 30,
        cityImpact: { socialStability: 25, legalIntegrity: 20, regionalDevelopment: 10, publicTrust: 25 },
        isOptimal: true
      }
    ],
    realWorldAction: ["Gunakan musyawarah mufakat dalam menyelesaikan konflik kepentingan publik."]
  }
];
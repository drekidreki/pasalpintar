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
      "findings": [
        {
          "id": "f1",
          "text": "Ada pesan berisi ancaman kekerasan fisik terhadap Budi di grup angkatan."
        },
        {
          "id": "f2",
          "text": "Pesan itu disebarkan ulang oleh banyak anggota grup."
        },
        {
          "id": "f3",
          "text": "Budi tidak masuk sekolah dan menunjukkan tekanan setelah pesan beredar."
        },
        {
          "id": "f4",
          "text": "Ancaman juga ditujukan kepada siswa yang menegur."
        },
        {
          "id": "f5",
          "text": "Sekolah belum menindaklanjuti kejadian ini."
        }
      ],
      "openQuestions": [
        {
          "id": "oq1",
          "text": "Siapa pemilik akun anonim?",
          "resolvedBy": [],
          "unresolvedNote": "Bukti yang ada tidak menunjukkan pemiliknya. Rumor bukan bukti; penelusuran perlu melibatkan sekolah dan platform."
        },
        {
          "id": "oq2",
          "text": "Apakah ada orang lain yang ikut diancam?",
          "resolvedBy": [
            "wit-1:q3",
            "ev-6"
          ],
          "unresolvedNote": "Belum ditanyakan atau belum ada buktinya."
        }
      ],
      "evidence": [
        {
          "id": "ev-1",
          "type": "document",
          "title": "Screenshot Grup Chat",
          "description": "Tangkapan layar grup 'Angkatan 2024'. Terlihat akun anonim mengirim meme wajah Budi dengan tulisan 'Habisi dia sepulang sekolah'. Pesan ini di-forward berkali-kali.",
          "clue": "Ada unsur ancaman fisik yang jelas, bukan sekadar ejekan.",
          "category": "primer",
          "categoryReason": "Bukti ini langsung menunjukkan peristiwa pokoknya: ada ancaman kekerasan terhadap Budi yang disebarkan di grup.",
          "source": "Diserahkan keluarga Budi kepada wali kelas.",
          "context": "Grup 'Angkatan 2024', sekitar sepekan sebelum laporan dibuat.",
          "reliability": {
            "level": "tinggi",
            "reason": "Isinya jelas dan bisa dicocokkan dengan ponsel anggota grup lain."
          },
          "limitations": "Tidak menunjukkan siapa pemilik akun anonim. Tangkapan layar bisa dipotong, jadi pesan aslinya perlu diamankan.",
          "relations": [
            {
              "finding": "f1",
              "type": "mendukung"
            },
            {
              "finding": "f2",
              "type": "mendukung"
            }
          ]
        },
        {
          "id": "ev-2",
          "type": "document",
          "title": "Laporan Absensi & Konseling",
          "description": "Catatan BK menunjukkan Budi absen 5 hari berturut-turut dengan keterangan 'Sakit'. Catatan wali kelas menyebutkan Budi sempat menangis di kelas sebelum pulang lebih awal minggu lalu.",
          "clue": "Dampak psikologis dan terganggunya hak pendidikan korban sangat nyata.",
          "category": "pendukung",
          "categoryReason": "Tidak membuktikan ancamannya sendiri, tetapi menunjukkan dampaknya pada Budi dan menguatkan bukti utama.",
          "source": "Catatan resmi BK dan wali kelas.",
          "context": "Minggu setelah meme beredar.",
          "reliability": {
            "level": "tinggi",
            "reason": "Dokumen resmi sekolah yang dibuat oleh guru."
          },
          "limitations": "Keterangan 'Sakit' tidak menjelaskan penyebabnya. Perlu dibaca bersama catatan wali kelas.",
          "relations": [
            {
              "finding": "f3",
              "type": "mendukung"
            }
          ]
        },
        {
          "id": "ev-3",
          "type": "message",
          "title": "Pesan Admin Grup",
          "description": "Beberapa menit setelah meme beredar, admin grup menulis: 'Santai, itu cuma bercanda. Semua juga ketawa, kok.'",
          "clue": "Klaim 'bercanda' tidak menghapus isi ancaman yang tertulis.",
          "category": "kontradiktif",
          "categoryReason": "Pesan ini bertentangan dengan anggapan bahwa ini ancaman serius. Belum tentu bohong: admin mungkin sungguh menganggapnya candaan. Yang diuji adalah isi pesan ancamannya, bukan niat yang diklaim.",
          "source": "Tangkapan layar dari grup yang sama.",
          "context": "Dikirim tak lama setelah meme beredar.",
          "reliability": {
            "level": "sedang",
            "reason": "Pesannya asli, tetapi isinya pendapat admin, bukan fakta tentang niat pengirim meme."
          },
          "limitations": "Admin bukan pengirim meme. Ia tidak bisa memastikan niat orang lain.",
          "relations": [
            {
              "finding": "f1",
              "type": "membantah"
            }
          ]
        },
        {
          "id": "ev-4",
          "type": "document",
          "title": "Catatan Keterlambatan Budi",
          "description": "Buku piket mencatat Budi terlambat tiga kali pada semester lalu, jauh sebelum meme beredar.",
          "clue": "Catatan lama tentang Budi tidak menjawab siapa yang mengancam atau apa dampaknya.",
          "category": "pengalih",
          "categoryReason": "Catatan ini benar dan resmi, tetapi tidak ada hubungannya dengan ancaman. Menjadikannya alasan sama saja dengan menyalahkan korban.",
          "source": "Buku piket sekolah.",
          "context": "Semester lalu, sebelum kejadian.",
          "reliability": {
            "level": "tinggi",
            "reason": "Dokumen resmi. Bukti bisa andal sekaligus tidak relevan."
          },
          "limitations": "Tidak berkaitan dengan ancaman, penyebaran, maupun dampaknya.",
          "relations": []
        },
        {
          "id": "ev-5",
          "type": "document",
          "title": "Tata Tertib Grup Kelas",
          "description": "Aturan grup yang disepakati bersama wali kelas di awal tahun: anggota dilarang mengirim konten yang merendahkan atau mengancam anggota lain.",
          "clue": "Ada aturan yang sudah disepakati, dan aturan itu dilanggar.",
          "category": "konteks",
          "categoryReason": "Menjelaskan aturan yang berlaku di grup, tetapi tidak membuktikan bahwa ancaman itu terjadi.",
          "source": "Pengumuman wali kelas di grup.",
          "context": "Awal tahun ajaran.",
          "reliability": {
            "level": "tinggi",
            "reason": "Pengumuman tertulis yang bisa dicek siapa saja di grup."
          },
          "limitations": "Hanya menunjukkan aturan, bukan pelanggarannya.",
          "relations": [
            {
              "finding": "f1",
              "type": "konteks"
            }
          ]
        },
        {
          "id": "ev-6",
          "type": "message",
          "title": "Pesan Pribadi kepada Siska",
          "description": "Siska menunjukkan pesan dari akun anonim yang sama: 'Jangan ikut campur kalau nggak mau bernasib sama.'",
          "clue": "Ancaman ternyata tidak hanya ditujukan kepada Budi.",
          "category": "pendukung",
          "categoryReason": "Menguatkan pola ancaman dari akun yang sama dan menunjukkan ada korban kedua.",
          "source": "Ponsel Siska, ditunjukkan saat wawancara.",
          "context": "Dikirim setelah Siska menegur di grup.",
          "reliability": {
            "level": "tinggi",
            "reason": "Pesan masih tersimpan dan bisa ditunjukkan langsung."
          },
          "limitations": "Tetap tidak mengungkap pemilik akun.",
          "relations": [
            {
              "finding": "f4",
              "type": "mendukung"
            },
            {
              "finding": "f1",
              "type": "mendukung"
            }
          ],
          "unlockedBy": {
            "witness": "wit-1",
            "question": "q3"
          }
        }
      ],
      "witnesses": [
        {
          "id": "wit-1",
          "name": "Siska (Ketua Kelas)",
          "avatar": "👧",
          "dialogues": [
            "Awalnya saya kira itu cuma bercandaan biasa di grup kelas.",
            "Tapi makin lama komentarnya makin kasar. Ada yang bahas mau hadang Budi di gerbang sekolah.",
            "Saya sudah tegur mereka, tapi akun anonim itu malah mengancam saya juga kalau ikut campur."
          ],
          "questions": [
            {
              "id": "q1",
              "ask": "Siapa saja yang ikut menyebarkan meme itu?",
              "answer": [
                "Saya nggak hafal semuanya. Yang jelas banyak yang forward, sebagian ke grup lain juga."
              ],
              "relations": [
                {
                  "finding": "f2",
                  "type": "mendukung"
                }
              ]
            },
            {
              "id": "q2",
              "ask": "Kamu tahu siapa pemilik akun anonim itu?",
              "answer": [
                "Ada yang bilang itu akun anak kelas sebelah. Tapi saya nggak pernah lihat buktinya, itu cuma omongan."
              ],
              "relations": []
            },
            {
              "id": "q3",
              "ask": "Ancaman ke kamu dikirim lewat mana?",
              "answer": [
                "Lewat pesan pribadi dari akun yang sama. Masih ada di HP saya, belum saya hapus."
              ],
              "relations": [
                {
                  "finding": "f4",
                  "type": "mendukung"
                }
              ],
              "unlocks": "ev-6"
            }
          ],
          "openingRelations": [
            {
              "finding": "f1",
              "type": "mendukung"
            },
            {
              "finding": "f4",
              "type": "mendukung"
            }
          ]
        },
        {
          "id": "wit-2",
          "name": "Pak Hendra (Guru BK)",
          "avatar": "👨‍🏫",
          "dialogues": [
            "Budi datang ke ruang BK sekali, sebelum dia berhenti masuk. Dia lebih banyak diam."
          ],
          "questions": [
            {
              "id": "q1",
              "ask": "Apa yang Budi ceritakan waktu itu?",
              "answer": [
                "Dia bilang takut lewat gerbang sekolah. Dia tidak menyebut nama siapa pun."
              ],
              "relations": [
                {
                  "finding": "f3",
                  "type": "mendukung"
                }
              ]
            },
            {
              "id": "q2",
              "ask": "Apakah sekolah sudah menindaklanjuti?",
              "answer": [
                "Sejauh ini kami baru mencatat. Belum ada pertemuan dengan orang tua maupun siswa lain."
              ],
              "relations": [
                {
                  "finding": "f5",
                  "type": "mendukung"
                }
              ]
            },
            {
              "id": "q3",
              "ask": "Bagaimana Budi sebelum kejadian ini?",
              "answer": [
                "Anaknya pendiam, kadang terlambat, tapi rajin mengumpulkan tugas. Saya tidak melihat kaitan keterlambatannya dengan kejadian ini."
              ],
              "relations": []
            }
          ],
          "openingRelations": [
            {
              "finding": "f3",
              "type": "konteks"
            }
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
      "findings": [
        {
          "id": "f1",
          "text": "Sampah dan limbah cair mencemari Sungai Hijau di dekat RW 04."
        },
        {
          "id": "f2",
          "text": "Kasus ISPA dan penyakit kulit pada anak di RW 04 meningkat."
        },
        {
          "id": "f3",
          "text": "Truk membuang sampah di lokasi itu pada malam hari, berulang kali."
        },
        {
          "id": "f4",
          "text": "Lokasi itu bukan tempat pembuangan sampah berizin."
        },
        {
          "id": "f5",
          "text": "Warga sudah melapor, tetapi belum ada tindakan."
        }
      ],
      "openQuestions": [
        {
          "id": "oq1",
          "text": "Siapa pemilik atau pengangkut truk sampah itu?",
          "resolvedBy": [],
          "unresolvedNote": "Foto dan catatan warga belum menunjukkan identitas pengangkut."
        },
        {
          "id": "oq2",
          "text": "Apakah pencemaran ini penyebab kenaikan penyakit?",
          "resolvedBy": [],
          "unresolvedNote": "Butuh uji air dan penilaian tenaga kesehatan. Data kenaikan kasus saja belum cukup."
        },
        {
          "id": "oq3",
          "text": "Apakah lokasi itu punya izin resmi?",
          "resolvedBy": [
            "ev-3"
          ],
          "unresolvedNote": "Belum ada dokumen resmi yang menjawabnya."
        }
      ],
      "evidence": [
        {
          "id": "ev-1",
          "type": "document",
          "title": "Sampel & Foto Lokasi",
          "description": "Dokumentasi gunungan sampah plastik dan limbah rumah tangga cair yang merembes langsung ke aliran sungai.",
          "clue": "Pencemaran sudah mengganggu ekosistem air dan kesehatan warga.",
          "category": "primer",
          "categoryReason": "Langsung menunjukkan pencemaran yang menjadi pokok aduan.",
          "source": "Diambil warga RW 04 bersama relawan posko.",
          "context": "Bantaran Sungai Hijau, pagi hari.",
          "reliability": {
            "level": "tinggi",
            "reason": "Foto lokasi jelas dan bisa diulang kapan saja."
          },
          "limitations": "Belum menunjukkan siapa yang membuang. Sampel belum diuji di laboratorium.",
          "relations": [
            {
              "finding": "f1",
              "type": "mendukung"
            }
          ]
        },
        {
          "id": "ev-2",
          "type": "document",
          "title": "Surat Aduan Puskesmas",
          "description": "Laporan peningkatan kasus ISPA dan penyakit kulit pada anak-anak di RW 04 selama 2 bulan terakhir.",
          "clue": "Pelanggaran hak atas lingkungan sehat berdampak langsung pada hak kesehatan.",
          "category": "pendukung",
          "categoryReason": "Menunjukkan dampak yang dialami warga dan menguatkan aduan, tetapi tidak membuktikan pembuangannya.",
          "source": "Puskesmas Kelurahan Mekar.",
          "context": "Dua bulan terakhir.",
          "reliability": {
            "level": "tinggi",
            "reason": "Data resmi fasilitas kesehatan."
          },
          "limitations": "Kenaikan kasus belum dibuktikan disebabkan oleh pencemaran ini. Bisa ada faktor lain.",
          "relations": [
            {
              "finding": "f2",
              "type": "mendukung"
            }
          ]
        },
        {
          "id": "ev-3",
          "type": "document",
          "title": "Surat Kelurahan tentang Izin",
          "description": "Kelurahan menjawab pertanyaan posko secara tertulis: kelurahan tidak pernah menerbitkan izin tempat pembuangan sampah di bantaran Sungai Hijau.",
          "clue": "Klaim 'izin informal' tidak didukung dokumen resmi.",
          "category": "pendukung",
          "alsoAccepted": [
            "primer"
          ],
          "categoryReason": "Menguatkan bahwa pembuangan di lokasi itu tidak sah dan membantah klaim pemilik lahan.",
          "source": "Surat resmi Kelurahan Mekar.",
          "context": "Jawaban atas pertanyaan posko pekan ini.",
          "reliability": {
            "level": "tinggi",
            "reason": "Dokumen resmi dari pihak yang berwenang mencatat izin di wilayahnya."
          },
          "limitations": "Hanya mencakup izin dari kelurahan.",
          "relations": [
            {
              "finding": "f4",
              "type": "mendukung"
            }
          ]
        },
        {
          "id": "ev-4",
          "type": "statement",
          "title": "Pernyataan Pemilik Lahan",
          "description": "Pemilik lahan menulis bahwa lokasi itu 'sudah diizinkan secara lisan oleh pengurus lama' dan sampahnya akan diangkut 'secepatnya'.",
          "clue": "Klaim izin lisan perlu diuji dengan dokumen.",
          "category": "kontradiktif",
          "categoryReason": "Bertentangan dengan temuan bahwa lokasi itu tidak berizin. Klaim ini perlu diuji, bukan langsung dianggap bohong. Dokumen resmi kelurahan lebih kuat daripada klaim lisan.",
          "source": "Surat pemilik lahan kepada posko.",
          "context": "Setelah warga mengadu.",
          "reliability": {
            "level": "rendah",
            "reason": "Datang dari pihak yang berkepentingan dan tidak disertai dokumen."
          },
          "limitations": "Tidak menyebut siapa yang memberi izin dan kapan.",
          "relations": [
            {
              "finding": "f4",
              "type": "membantah"
            }
          ]
        },
        {
          "id": "ev-5",
          "type": "document",
          "title": "Piagam Lomba Kebersihan RW",
          "description": "RW 04 pernah menjadi juara 2 lomba kebersihan tingkat kelurahan tiga tahun lalu.",
          "clue": "Prestasi lama tidak menjelaskan siapa yang membuang sampah sekarang.",
          "category": "pengalih",
          "categoryReason": "Terlihat berkaitan dengan kebersihan, tetapi tidak membuktikan apa pun tentang pembuangan dan pencemaran saat ini.",
          "source": "Arsip RW 04.",
          "context": "Tiga tahun lalu.",
          "reliability": {
            "level": "tinggi",
            "reason": "Piagam asli. Andal, tetapi tidak relevan."
          },
          "limitations": "Tidak berkaitan dengan peristiwa yang diselidiki.",
          "relations": []
        },
        {
          "id": "ev-6",
          "type": "document",
          "title": "Buku Catatan Truk Pak RT",
          "description": "Catatan tanggal dan jam truk datang selama empat minggu: dua sampai tiga kali seminggu, selalu lewat pukul 22.00. Nomor pelat tidak terbaca jelas.",
          "clue": "Pembuangan terjadi berulang dan terpola.",
          "category": "pendukung",
          "categoryReason": "Menguatkan bahwa pembuangan terjadi berulang, tetapi belum menunjukkan pelakunya.",
          "source": "Catatan pribadi Pak RT 04.",
          "context": "Empat minggu terakhir.",
          "reliability": {
            "level": "sedang",
            "reason": "Dicatat rutin dan konsisten, tetapi oleh satu orang tanpa foto pendukung."
          },
          "limitations": "Nomor pelat tidak terbaca, jadi pengangkutnya belum bisa diidentifikasi.",
          "relations": [
            {
              "finding": "f3",
              "type": "mendukung"
            }
          ],
          "unlockedBy": {
            "witness": "wit-1",
            "question": "q1"
          }
        }
      ],
      "witnesses": [
        {
          "id": "wit-1",
          "name": "Pak RT 04",
          "avatar": "👨‍💼",
          "dialogues": [
            "Warga sudah berulang kali menegur truk yang buang sampah malam-malam.",
            "Tapi pengelola lahan bilang ini area pribadi, padahal letaknya persis di pinggir sungai umum."
          ],
          "questions": [
            {
              "id": "q1",
              "ask": "Kapan biasanya truk itu datang?",
              "answer": [
                "Lewat jam sepuluh malam, dua sampai tiga kali seminggu. Saya catat di buku sejak bulan lalu."
              ],
              "relations": [
                {
                  "finding": "f3",
                  "type": "mendukung"
                }
              ],
              "unlocks": "ev-6"
            },
            {
              "id": "q2",
              "ask": "Apakah ada warga yang sakit?",
              "answer": [
                "Cucu tetangga saya gatal-gatal. Tapi saya bukan dokter, saya tidak tahu pasti sebabnya."
              ],
              "relations": [
                {
                  "finding": "f2",
                  "type": "konteks"
                }
              ]
            },
            {
              "id": "q3",
              "ask": "Pernahkah warga melapor ke pemerintah?",
              "answer": [
                "Sudah ke kelurahan, tapi secara lisan. Tidak ada jawaban sampai kami lapor ke posko."
              ],
              "relations": [
                {
                  "finding": "f5",
                  "type": "mendukung"
                }
              ]
            }
          ],
          "openingRelations": [
            {
              "finding": "f3",
              "type": "mendukung"
            }
          ]
        },
        {
          "id": "wit-2",
          "name": "Bu Wulan (Petugas DLH)",
          "avatar": "👩‍💼",
          "dialogues": [
            "Lokasi itu tidak terdaftar sebagai tempat pembuangan sampah resmi."
          ],
          "questions": [
            {
              "id": "q1",
              "ask": "Apa yang dibutuhkan untuk menindak pembuangnya?",
              "answer": [
                "Bukti siapa pengangkutnya. Foto tumpukan sampah saja belum cukup untuk menentukan pelaku."
              ],
              "relations": []
            },
            {
              "id": "q2",
              "ask": "Apakah air sungainya sudah diuji?",
              "answer": [
                "Belum. Kami bisa mengambil sampel minggu ini. Hasilnya keluar sekitar dua minggu."
              ],
              "relations": [
                {
                  "finding": "f1",
                  "type": "konteks"
                }
              ]
            }
          ],
          "openingRelations": [
            {
              "finding": "f4",
              "type": "mendukung"
            }
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
      "findings": [
        {
          "id": "f1",
          "text": "Sepeda motor melintas di atas trotoar saat jam macet."
        },
        {
          "id": "f2",
          "text": "Lapak pedagang menutup sebagian besar trotoar."
        },
        {
          "id": "f3",
          "text": "Pejalan kaki terpaksa berjalan di bahu jalan yang padat."
        },
        {
          "id": "f4",
          "text": "Penyandang disabilitas tidak bisa memakai trotoar."
        }
      ],
      "openQuestions": [
        {
          "id": "oq1",
          "text": "Seberapa sering pelanggaran terjadi di luar jam macet?",
          "resolvedBy": [],
          "unresolvedNote": "Rekaman yang ada hanya mencakup jam sibuk di satu titik."
        },
        {
          "id": "oq2",
          "text": "Ke mana pedagang bisa berjualan jika trotoar dikosongkan?",
          "resolvedBy": [],
          "unresolvedNote": "Belum ada data lokasi pengganti. Ini perlu dipikirkan di ruang keputusan."
        }
      ],
      "evidence": [
        {
          "id": "ev-1",
          "type": "document",
          "title": "Rekaman CCTV Jalan",
          "description": "Rekaman menunjukkan motor melintas cepat di atas trotoar saat jam macet.",
          "clue": "Trotoar yang merupakan hak pejalan kaki diusik secara berbahaya.",
          "category": "primer",
          "categoryReason": "Langsung menunjukkan pelanggaran yang dilaporkan: kendaraan memakai trotoar.",
          "source": "CCTV di Jl. Pemuda Km 4, diminta Forum Pejalan Kaki.",
          "context": "Jam macet sore hari.",
          "reliability": {
            "level": "tinggi",
            "reason": "Rekaman kamera tetap dengan waktu yang tercatat."
          },
          "limitations": "Hanya satu titik dan jam sibuk. Tidak menunjukkan seberapa sering hal ini terjadi di jam lain.",
          "relations": [
            {
              "finding": "f1",
              "type": "mendukung"
            }
          ]
        },
        {
          "id": "ev-2",
          "type": "photo",
          "title": "Foto Lapak di Trotoar",
          "description": "Foto Forum Pejalan Kaki: tiga lapak permanen menutup lebih dari separuh lebar trotoar.",
          "clue": "Trotoar menyempit bukan hanya karena motor.",
          "category": "pendukung",
          "alsoAccepted": [
            "primer"
          ],
          "categoryReason": "Menguatkan bahwa trotoar tidak bisa dipakai pejalan kaki, dari sebab yang berbeda.",
          "source": "Forum Pejalan Kaki Kota.",
          "context": "Diambil siang hari.",
          "reliability": {
            "level": "tinggi",
            "reason": "Foto lokasi yang bisa diperiksa ulang."
          },
          "limitations": "Tidak menunjukkan apakah lapak itu punya izin.",
          "relations": [
            {
              "finding": "f2",
              "type": "mendukung"
            },
            {
              "finding": "f3",
              "type": "konteks"
            }
          ]
        },
        {
          "id": "ev-3",
          "type": "document",
          "title": "Surat Komunitas Penyandang Disabilitas",
          "description": "Komunitas penyandang disabilitas kota melaporkan anggota pengguna kursi roda tidak bisa melewati trotoar di ruas ini dan harus turun ke jalan.",
          "clue": "Dampaknya paling berat bagi kelompok rentan.",
          "category": "pendukung",
          "categoryReason": "Menunjukkan dampak pada kelompok rentan dan menguatkan aduan.",
          "source": "Surat komunitas kepada Forum Pejalan Kaki.",
          "context": "Bulan ini.",
          "reliability": {
            "level": "sedang",
            "reason": "Pengalaman langsung anggota, tetapi belum disertai foto atau tanggal kejadian."
          },
          "limitations": "Tidak merinci titik mana saja yang tidak bisa dilewati.",
          "relations": [
            {
              "finding": "f4",
              "type": "mendukung"
            },
            {
              "finding": "f3",
              "type": "mendukung"
            }
          ]
        },
        {
          "id": "ev-4",
          "type": "document",
          "title": "Data Jam Macet",
          "description": "Data dinas perhubungan: kemacetan terparah di ruas ini terjadi pukul 16.00–18.00.",
          "clue": "Menjelaskan kapan pelanggaran paling mungkin terjadi, bukan membenarkannya.",
          "category": "konteks",
          "categoryReason": "Menjelaskan keadaan yang mendorong motor naik ke trotoar, tetapi tidak membuktikan pelanggaran dan tidak membenarkannya.",
          "source": "Dinas perhubungan kota.",
          "context": "Rata-rata harian bulan lalu.",
          "reliability": {
            "level": "tinggi",
            "reason": "Data resmi dari instansi yang mengelola lalu lintas."
          },
          "limitations": "Hanya data kepadatan, bukan data pelanggaran.",
          "relations": [
            {
              "finding": "f1",
              "type": "konteks"
            }
          ]
        },
        {
          "id": "ev-5",
          "type": "document",
          "title": "Keluhan Tarif Parkir Mal",
          "description": "Surat warga yang mengeluhkan tarif parkir mal di ujung jalan yang dianggap terlalu mahal.",
          "clue": "Masalah lalu lintas lain, tetapi bukan soal trotoar.",
          "category": "pengalih",
          "categoryReason": "Terdengar berkaitan karena sama-sama soal jalan, tetapi tidak berhubungan dengan hak pejalan kaki atas trotoar.",
          "source": "Kotak aduan kelurahan.",
          "context": "Bulan lalu.",
          "reliability": {
            "level": "sedang",
            "reason": "Keluhan asli warga, tetapi tidak relevan dengan kasus."
          },
          "limitations": "Tidak menyebut trotoar maupun pejalan kaki.",
          "relations": []
        },
        {
          "id": "ev-6",
          "type": "statement",
          "title": "Pernyataan Paguyuban Pedagang",
          "description": "Ketua paguyuban: 'Kami sudah berjualan di sini sepuluh tahun dan tidak pernah ada yang protes.'",
          "clue": "Lamanya berjualan tidak menghapus fungsi trotoar.",
          "category": "kontradiktif",
          "categoryReason": "Bertentangan dengan aduan bahwa lapak mengganggu pejalan kaki. Belum tentu salah bahwa dulu tidak ada yang protes, tetapi itu tidak membuktikan bahwa trotoar tidak terganggu.",
          "source": "Wawancara posko dengan ketua paguyuban.",
          "context": "Pekan ini.",
          "reliability": {
            "level": "rendah",
            "reason": "Pernyataan pihak yang berkepentingan, tidak bisa diperiksa."
          },
          "limitations": "'Tidak ada yang protes' tidak sama dengan 'tidak ada yang terganggu'.",
          "relations": [
            {
              "finding": "f2",
              "type": "membantah"
            }
          ]
        }
      ],
      "witnesses": [
        {
          "id": "wit-1",
          "name": "Ibu Rahma (Pejalan Kaki)",
          "avatar": "👩",
          "dialogues": [
            "Saya hampir tertabrak motor saat menuntun anak saya di trotoar. Kami tidak punya ruang lagi."
          ],
          "openingRelations": [
            {
              "finding": "f1",
              "type": "mendukung"
            }
          ],
          "questions": [
            {
              "id": "q1",
              "ask": "Kapan kejadiannya?",
              "answer": [
                "Sore hari, waktu macet. Saya baru menjemput anak pulang sekolah."
              ],
              "relations": [
                {
                  "finding": "f1",
                  "type": "mendukung"
                }
              ]
            },
            {
              "id": "q2",
              "ask": "Kenapa tidak lewat trotoar di seberang?",
              "answer": [
                "Trotoar seberang dipakai lapak. Mau tidak mau saya jalan di pinggir jalan."
              ],
              "relations": [
                {
                  "finding": "f2",
                  "type": "mendukung"
                },
                {
                  "finding": "f3",
                  "type": "mendukung"
                }
              ]
            },
            {
              "id": "q3",
              "ask": "Apakah Ibu sempat melihat nomor kendaraannya?",
              "answer": [
                "Tidak sempat. Semuanya terjadi cepat sekali."
              ],
              "relations": []
            }
          ]
        },
        {
          "id": "wit-2",
          "name": "Pak Darto (Pedagang)",
          "avatar": "🧔",
          "dialogues": [
            "Saya jualan di sini karena pembelinya ada di sini."
          ],
          "questions": [
            {
              "id": "q1",
              "ask": "Bapak tahu trotoar itu untuk pejalan kaki?",
              "answer": [
                "Tahu. Tapi sewa kios di pasar mahal. Kalau pindah, pembeli saya hilang."
              ],
              "relations": [
                {
                  "finding": "f2",
                  "type": "konteks"
                }
              ]
            },
            {
              "id": "q2",
              "ask": "Apakah motor juga lewat di depan lapak Bapak?",
              "answer": [
                "Sering. Kalau macet, motor naik ke trotoar. Pembeli saya juga ikut minggir."
              ],
              "relations": [
                {
                  "finding": "f1",
                  "type": "mendukung"
                }
              ]
            }
          ]
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
      "findings": [
        {
          "id": "f1",
          "text": "Sekolah menagih biaya 'wajib' kepada siswa yang tidak mampu."
        },
        {
          "id": "f2",
          "text": "Sejumlah anak berhenti sekolah dan bekerja sebagai pemilah ikan."
        },
        {
          "id": "f3",
          "text": "Orang tua tidak pernah diajak membahas biaya itu."
        },
        {
          "id": "f4",
          "text": "Kebutuhan ekonomi keluarga ikut mendorong anak bekerja."
        }
      ],
      "openQuestions": [
        {
          "id": "oq1",
          "text": "Untuk apa uang pungutan itu dipakai?",
          "resolvedBy": [],
          "unresolvedNote": "Belum ada laporan penggunaan dana dari sekolah."
        },
        {
          "id": "oq2",
          "text": "Apakah komite pernah menyepakati 'sumbangan' itu?",
          "resolvedBy": [],
          "unresolvedNote": "Klaim bendahara dan kesaksian orang tua bertentangan. Perlu notulen rapat komite untuk mengujinya."
        }
      ],
      "evidence": [
        {
          "id": "ev-1",
          "type": "document",
          "title": "Kwitansi Pungutan Sekolah",
          "description": "Rincian biaya wajib yang dibebankan kepada siswa tidak mampu.",
          "clue": "Bertentangan dengan prinsip pendidikan dasar bebas biaya.",
          "category": "primer",
          "categoryReason": "Langsung menunjukkan pungutan yang menjadi pokok masalah.",
          "source": "Diserahkan orang tua siswa kepada relawan.",
          "context": "Semester ini.",
          "reliability": {
            "level": "tinggi",
            "reason": "Dokumen tertulis berkop sekolah."
          },
          "limitations": "Tidak menjelaskan dasar penetapan biaya atau penggunaannya.",
          "relations": [
            {
              "finding": "f1",
              "type": "mendukung"
            }
          ]
        },
        {
          "id": "ev-2",
          "type": "document",
          "title": "Daftar Siswa Tidak Aktif",
          "description": "Data sekolah: sembilan siswa kelas 4–6 tidak hadir lebih dari sebulan pada semester ini.",
          "clue": "Dampaknya terlihat pada kehadiran siswa.",
          "category": "pendukung",
          "categoryReason": "Menunjukkan dampaknya, yaitu anak berhenti hadir, tetapi tidak membuktikan penyebabnya sendirian.",
          "source": "Data kehadiran sekolah.",
          "context": "Semester berjalan.",
          "reliability": {
            "level": "tinggi",
            "reason": "Data resmi sekolah."
          },
          "limitations": "Tidak mencatat alasan siswa berhenti hadir.",
          "relations": [
            {
              "finding": "f2",
              "type": "mendukung"
            }
          ]
        },
        {
          "id": "ev-3",
          "type": "document",
          "title": "Catatan Relawan tentang Musim Ikan",
          "description": "Musim tangkap sedang ramai. Pemilah ikan dibayar harian, dan upahnya dipakai untuk kebutuhan dapur keluarga.",
          "clue": "Ekonomi keluarga menjadi tekanan tambahan.",
          "category": "konteks",
          "categoryReason": "Menjelaskan mengapa anak bekerja, tetapi tidak membuktikan pungutannya. Konteks membantu merancang solusi yang menyentuh akar masalah.",
          "source": "Catatan lapangan relawan mengajar.",
          "context": "Bulan ini.",
          "reliability": {
            "level": "sedang",
            "reason": "Pengamatan langsung, tetapi bukan data resmi."
          },
          "limitations": "Tidak menyebut berapa keluarga yang bergantung pada upah anak.",
          "relations": [
            {
              "finding": "f4",
              "type": "mendukung"
            },
            {
              "finding": "f2",
              "type": "konteks"
            }
          ]
        },
        {
          "id": "ev-4",
          "type": "statement",
          "title": "Pernyataan Bendahara Sekolah",
          "description": "Bendahara sekolah: 'Itu sumbangan sukarela yang sudah disepakati komite.'",
          "clue": "'Sukarela' bertentangan dengan kata 'wajib' di kwitansi.",
          "category": "kontradiktif",
          "categoryReason": "Bertentangan dengan kwitansi yang menyebut biaya wajib dan dengan kesaksian orang tua. Belum tentu bohong, tetapi perlu diuji dengan notulen rapat komite.",
          "source": "Wawancara relawan dengan bendahara.",
          "context": "Pekan ini.",
          "reliability": {
            "level": "rendah",
            "reason": "Datang dari pihak yang berkepentingan dan belum disertai dokumen kesepakatan."
          },
          "limitations": "Tidak disertai notulen atau daftar hadir rapat komite.",
          "relations": [
            {
              "finding": "f1",
              "type": "membantah"
            },
            {
              "finding": "f3",
              "type": "membantah"
            }
          ]
        },
        {
          "id": "ev-5",
          "type": "document",
          "title": "Nilai Rapor Anak Pesisir",
          "description": "Rata-rata nilai rapor anak-anak yang berhenti sekolah lebih rendah daripada rata-rata kelas.",
          "clue": "Nilai tidak menentukan hak seseorang atas pendidikan.",
          "category": "pengalih",
          "categoryReason": "Terlihat seperti penjelasan, tetapi hak atas pendidikan dasar tidak bergantung pada nilai. Menjadikannya alasan sama dengan menyalahkan anak.",
          "source": "Arsip nilai sekolah.",
          "context": "Semester lalu.",
          "reliability": {
            "level": "tinggi",
            "reason": "Data resmi, tetapi tidak relevan dengan pelanggaran hak."
          },
          "limitations": "Tidak berkaitan dengan pungutan atau hak atas pendidikan.",
          "relations": []
        }
      ],
      "witnesses": [
        {
          "id": "wit-1",
          "name": "Pak Budi (Relawan)",
          "avatar": "👨‍🏫",
          "dialogues": [
            "Anak-anak ingin belajar, tapi orang tua tidak mampu membayar biaya tambahan sekolah."
          ],
          "openingRelations": [
            {
              "finding": "f1",
              "type": "mendukung"
            }
          ],
          "questions": [
            {
              "id": "q1",
              "ask": "Berapa anak yang sudah berhenti sekolah?",
              "answer": [
                "Yang saya kenal ada sembilan. Data lengkapnya ada di sekolah."
              ],
              "relations": [
                {
                  "finding": "f2",
                  "type": "mendukung"
                }
              ]
            },
            {
              "id": "q2",
              "ask": "Kenapa orang tua tidak protes ke sekolah?",
              "answer": [
                "Mereka takut anaknya dipersulit. Banyak juga yang tidak tahu bahwa mereka boleh bertanya."
              ],
              "relations": [
                {
                  "finding": "f3",
                  "type": "konteks"
                }
              ]
            },
            {
              "id": "q3",
              "ask": "Apakah keluarga pernah menerima bantuan pendidikan?",
              "answer": [
                "Beberapa pernah dengar soal Kartu Indonesia Pintar, tapi tidak tahu cara mengurusnya."
              ],
              "relations": [
                {
                  "finding": "f4",
                  "type": "konteks"
                }
              ]
            }
          ]
        },
        {
          "id": "wit-2",
          "name": "Ibu Sari (Orang Tua Siswa)",
          "avatar": "👩‍🦱",
          "dialogues": [
            "Anak saya sekarang ikut memilah ikan di dermaga."
          ],
          "openingRelations": [
            {
              "finding": "f2",
              "type": "mendukung"
            }
          ],
          "questions": [
            {
              "id": "q1",
              "ask": "Kenapa anak Ibu berhenti sekolah?",
              "answer": [
                "Ada tagihan yang katanya wajib. Uangnya tidak ada, anak saya malu ke sekolah."
              ],
              "relations": [
                {
                  "finding": "f1",
                  "type": "mendukung"
                },
                {
                  "finding": "f2",
                  "type": "mendukung"
                }
              ]
            },
            {
              "id": "q2",
              "ask": "Apakah tagihan itu pernah dijelaskan dalam rapat?",
              "answer": [
                "Tidak pernah ada rapat. Tiba-tiba saja ada kwitansi."
              ],
              "relations": [
                {
                  "finding": "f3",
                  "type": "mendukung"
                }
              ]
            }
          ]
        }
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
      "findings": [
        {
          "id": "f1",
          "text": "Warga diberi tenggat tiga hari untuk mengosongkan rumah tanpa pilihan relokasi."
        },
        {
          "id": "f2",
          "text": "Warga terdampak belum pernah diajak bermusyawarah."
        },
        {
          "id": "f3",
          "text": "Warga tidak menolak pembangunan, tetapi meminta dialog dan tempat tinggal pengganti."
        },
        {
          "id": "f4",
          "text": "Belum ada keputusan tertulis tentang relokasi atau ganti rugi."
        }
      ],
      "openQuestions": [
        {
          "id": "oq1",
          "text": "Apakah warga memiliki hak atas tanahnya?",
          "resolvedBy": [],
          "unresolvedNote": "Bukti pembayaran PBB menunjukkan lamanya warga tinggal, tetapi bukan bukti kepemilikan. Perlu data pertanahan."
        },
        {
          "id": "oq2",
          "text": "Dari mana angka tenggat tiga hari berasal?",
          "resolvedBy": [],
          "unresolvedNote": "Pemerintah kota dan pengembang belum menunjukkan dasarnya."
        }
      ],
      "evidence": [
        {
          "id": "ev-1",
          "type": "document",
          "title": "Surat Peringatan Pengosongan",
          "description": "Surat sepihak memberikan tenggat waktu 3 hari tanpa opsi relokasi.",
          "clue": "Prosedur pengosongan tidak memenuhi prinsip musyawarah.",
          "category": "primer",
          "categoryReason": "Langsung menunjukkan tindakan yang dipersoalkan: perintah pengosongan sepihak.",
          "source": "Diterima warga, lalu diserahkan ke LBH.",
          "context": "Bulan ini.",
          "reliability": {
            "level": "tinggi",
            "reason": "Dokumen tertulis yang diterima langsung oleh warga."
          },
          "limitations": "Tidak menjelaskan rencana relokasi atau ganti rugi.",
          "relations": [
            {
              "finding": "f1",
              "type": "mendukung"
            }
          ]
        },
        {
          "id": "ev-2",
          "type": "document",
          "title": "Undangan Sosialisasi Proyek",
          "description": "Undangan 'sosialisasi' proyek hanya ditujukan kepada ketua RT. Tidak ada daftar hadir warga terdampak.",
          "clue": "Memberi tahu satu orang tidak sama dengan bermusyawarah dengan warga.",
          "category": "pendukung",
          "categoryReason": "Menguatkan bahwa warga terdampak tidak dilibatkan.",
          "source": "Salinan undangan dari ketua RT.",
          "context": "Dua minggu sebelum surat peringatan.",
          "reliability": {
            "level": "tinggi",
            "reason": "Dokumen tertulis dengan penerima yang jelas."
          },
          "limitations": "Tidak menunjukkan isi pembicaraan dalam pertemuan itu.",
          "relations": [
            {
              "finding": "f2",
              "type": "mendukung"
            }
          ]
        },
        {
          "id": "ev-3",
          "type": "document",
          "title": "Dokumen Rencana Pembangunan",
          "description": "Lahan akan dipakai untuk fasilitas publik berupa puskesmas dan taman kota.",
          "clue": "Kepentingan umumnya nyata. Yang dipersoalkan adalah caranya.",
          "category": "konteks",
          "categoryReason": "Menjelaskan tujuan proyek. Tidak membuktikan atau membantah cara pengosongan yang dipersoalkan.",
          "source": "Pemerintah kota.",
          "context": "Rencana tahun ini.",
          "reliability": {
            "level": "tinggi",
            "reason": "Dokumen resmi pemerintah kota."
          },
          "limitations": "Tidak memuat rencana relokasi warga.",
          "relations": [
            {
              "finding": "f3",
              "type": "konteks"
            }
          ]
        },
        {
          "id": "ev-4",
          "type": "statement",
          "title": "Siaran Pers Pengembang",
          "description": "Pengembang menyatakan: 'Warga sudah diajak bicara dan menyetujui rencana ini.'",
          "clue": "Klaim persetujuan perlu dibuktikan dengan daftar hadir dan notulen.",
          "category": "kontradiktif",
          "categoryReason": "Bertentangan dengan temuan bahwa warga belum diajak bermusyawarah. Klaim ini harus diuji dengan dokumen, bukan langsung dipercaya atau ditolak.",
          "source": "Siaran pers di media lokal.",
          "context": "Setelah warga mengadu ke LBH.",
          "reliability": {
            "level": "rendah",
            "reason": "Pernyataan pihak yang berkepentingan tanpa dokumen pendukung."
          },
          "limitations": "Tidak menyebut kapan, di mana, dan dengan siapa pembicaraan dilakukan.",
          "relations": [
            {
              "finding": "f2",
              "type": "membantah"
            }
          ]
        },
        {
          "id": "ev-5",
          "type": "photo",
          "title": "Foto Bangunan Semipermanen",
          "description": "Sebagian rumah warga terbuat dari papan dan seng.",
          "clue": "Kondisi bangunan tidak menentukan hak warga atas proses yang adil.",
          "category": "pengalih",
          "categoryReason": "Mudah dipakai untuk menganggap warga tidak berhak, padahal bahan bangunan tidak menentukan hak atas musyawarah dan perlakuan yang adil.",
          "source": "Foto pengembang.",
          "context": "Survei lokasi.",
          "reliability": {
            "level": "tinggi",
            "reason": "Foto asli. Andal, tetapi tidak relevan dengan pokok masalah."
          },
          "limitations": "Tidak menunjukkan status tanah atau proses yang ditempuh.",
          "relations": []
        },
        {
          "id": "ev-6",
          "type": "document",
          "title": "Bukti Pembayaran PBB Warga",
          "description": "Beberapa warga menyimpan bukti pembayaran Pajak Bumi dan Bangunan (PBB) selama bertahun-tahun.",
          "clue": "Menunjukkan lamanya warga tinggal, bukan bukti kepemilikan tanah.",
          "category": "konteks",
          "categoryReason": "Menunjukkan lama penguasaan dan itikad warga. Bukti bayar PBB bukan sertifikat, jadi tidak membuktikan kepemilikan.",
          "source": "Arsip pribadi warga.",
          "context": "Sejak akhir 1990-an.",
          "reliability": {
            "level": "tinggi",
            "reason": "Bukti pembayaran resmi."
          },
          "limitations": "Tidak membuktikan kepemilikan tanah.",
          "relations": [
            {
              "finding": "f3",
              "type": "konteks"
            }
          ],
          "unlockedBy": {
            "witness": "wit-1",
            "question": "q2"
          }
        }
      ],
      "witnesses": [
        {
          "id": "wit-1",
          "name": "Ibu Nur (Perwakilan Warga)",
          "avatar": "👵",
          "dialogues": [
            "Kami tidak menolak pembangunan, tapi ajaklah kami bicara dan berikan tempat tinggal pengganti."
          ],
          "openingRelations": [
            {
              "finding": "f3",
              "type": "mendukung"
            }
          ],
          "questions": [
            {
              "id": "q1",
              "ask": "Apakah warga pernah diundang rapat?",
              "answer": [
                "Yang diundang cuma Pak RT. Kami tahunya dari surat itu."
              ],
              "relations": [
                {
                  "finding": "f2",
                  "type": "mendukung"
                }
              ]
            },
            {
              "id": "q2",
              "ask": "Sudah berapa lama Ibu tinggal di sini?",
              "answer": [
                "Sejak 1998. Kami bayar PBB setiap tahun, buktinya masih saya simpan."
              ],
              "relations": [
                {
                  "finding": "f3",
                  "type": "konteks"
                }
              ],
              "unlocks": "ev-6"
            },
            {
              "id": "q3",
              "ask": "Apa yang sebenarnya warga minta?",
              "answer": [
                "Duduk bersama, ganti rugi yang layak, dan tempat tinggal pengganti yang dekat dengan tempat kerja kami."
              ],
              "relations": [
                {
                  "finding": "f3",
                  "type": "mendukung"
                }
              ]
            }
          ]
        },
        {
          "id": "wit-2",
          "name": "Pak Yusuf (Staf Pemkot)",
          "avatar": "👨‍💼",
          "dialogues": [
            "Proyek ini untuk kepentingan umum. Jadwalnya sudah ditetapkan."
          ],
          "questions": [
            {
              "id": "q1",
              "ask": "Apakah ada rencana relokasi untuk warga?",
              "answer": [
                "Masih dibahas. Belum ada keputusan tertulis."
              ],
              "relations": [
                {
                  "finding": "f4",
                  "type": "mendukung"
                },
                {
                  "finding": "f1",
                  "type": "mendukung"
                }
              ]
            },
            {
              "id": "q2",
              "ask": "Kenapa tenggatnya hanya tiga hari?",
              "answer": [
                "Itu dari pengembang. Saya tidak tahu dasar angkanya."
              ],
              "relations": []
            }
          ]
        }
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
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
      "facts": [
        {
          "id": "fa1",
          "text": "Akun anonim mengirim meme Budi bertuliskan 'Habisi dia sepulang sekolah' ke grup angkatan.",
          "established": true,
          "basis": "Screenshot Grup Chat",
          "explanation": "Terlihat langsung di bukti utama."
        },
        {
          "id": "fa2",
          "text": "Meme itu disebarkan ulang oleh banyak anggota grup.",
          "established": true,
          "basis": "Screenshot Grup Chat, kesaksian Siska",
          "explanation": "Tangkapan layar menunjukkan pesan di-forward berkali-kali, dan Siska menguatkannya."
        },
        {
          "id": "fa3",
          "text": "Budi absen lima hari dan terlihat tertekan setelah meme beredar.",
          "established": true,
          "basis": "Laporan Absensi & Konseling, kesaksian Pak Hendra",
          "explanation": "Tercatat di dokumen resmi sekolah."
        },
        {
          "id": "fa4",
          "text": "Siswa yang menegur ikut menerima ancaman.",
          "established": true,
          "basis": "Kesaksian Siska, Pesan Pribadi kepada Siska",
          "explanation": "Siska menyatakannya dan pesannya masih tersimpan di ponselnya."
        },
        {
          "id": "fa8",
          "text": "Sekolah belum menindaklanjuti kejadian ini.",
          "established": true,
          "basis": "Kesaksian Pak Hendra (Guru BK)",
          "explanation": "Diakui sendiri oleh guru BK. Pengakuan pihak sekolah tentang tindakannya sendiri cukup kuat."
        },
        {
          "id": "fa5",
          "text": "Pesan itu hanya candaan, jadi tidak ada ancaman.",
          "established": false,
          "basis": "Pesan Admin Grup",
          "explanation": "Ini klaim admin, bukan fakta. Isi pesannya jelas berupa ancaman kekerasan, dan admin bukan pengirimnya."
        },
        {
          "id": "fa6",
          "text": "Pemilik akun anonim adalah siswa kelas sebelah.",
          "established": false,
          "basis": "Rumor yang disebut Siska",
          "explanation": "Siska sendiri menyebutnya 'cuma omongan'. Rumor tidak bisa dijadikan fakta."
        },
        {
          "id": "fa7",
          "text": "Budi sering terlambat, jadi ia ikut bertanggung jawab.",
          "established": false,
          "basis": "Catatan Keterlambatan Budi",
          "explanation": "Catatan lama itu tidak berhubungan dengan ancaman. Kesimpulan ini menyalahkan korban."
        }
      ],
      "rightsAffected": [
        {
          "id": "r1",
          "label": "Hak atas perlindungan diri pribadi, keluarga, kehormatan, dan rasa aman",
          "isCorrect": true,
          "explanation": "Setiap orang berhak atas rasa aman dan perlindungan dari ancaman ketakutan (UUD 1945 Pasal 28G ayat (1)). Sebagai anak, Budi juga berhak atas perlindungan dari kekerasan (Pasal 28B ayat (2)).",
          "supportedBy": [
            "fa1",
            "fa4"
          ]
        },
        {
          "id": "r2",
          "label": "Hak untuk bebas dari pekerjaan paksa",
          "isCorrect": false,
          "explanation": "Kasus ini tidak berkaitan dengan eksploitasi tenaga kerja."
        },
        {
          "id": "r3",
          "label": "Hak memperoleh pendidikan yang layak tanpa intimidasi",
          "isCorrect": true,
          "explanation": "Aksi perundungan menyebabkan Budi takut pergi ke sekolah sehingga hak belajarnya terganggu (UUD 1945 Pasal 31 ayat (1) dan Pasal 28C ayat (1)).",
          "supportedBy": [
            "fa3"
          ]
        },
        {
          "id": "r4",
          "label": "Hak anak atas perlindungan dari kekerasan",
          "isCorrect": true,
          "explanation": "Budi masih anak. UUD 1945 Pasal 28B ayat (2) menjamin perlindungan anak dari kekerasan; ancaman yang membuatnya takut termasuk kekerasan psikis.",
          "supportedBy": [
            "fa1",
            "fa3"
          ]
        },
        {
          "id": "r5",
          "label": "Hak atas pekerjaan dan penghidupan yang layak",
          "isCorrect": false,
          "explanation": "Pasal 27 ayat (2) memang hak warga negara, tetapi tidak ada fakta dalam kasus ini tentang pekerjaan atau penghidupan."
        },
        {
          "id": "r6",
          "label": "Hak pengirim meme untuk bebas berpendapat",
          "isCorrect": false,
          "explanation": "Kebebasan berpendapat dijamin (Pasal 28E ayat (3)), tetapi dibatasi undang-undang demi hak orang lain (Pasal 28J ayat (2)). Tidak ada hak untuk mengancam."
        }
      ],
      "dutiesNeglected": [
        {
          "id": "d1",
          "label": "Kewajiban menghormati hak asasi manusia orang lain dalam tertib kehidupan bermasyarakat",
          "isCorrect": true,
          "explanation": "Pelaku mengabaikan kewajiban menghormati hak asasi orang lain (UUD 1945 Pasal 28J ayat (1)). Kebebasan berekspresi di media sosial pun dibatasi demi hak orang lain (Pasal 28J ayat (2)).",
          "supportedBy": [
            "fa1",
            "fa2"
          ]
        },
        {
          "id": "d2",
          "label": "Kewajiban membayar pajak tepat waktu",
          "isCorrect": false,
          "explanation": "Kewajiban perpajakan tidak relevan dengan konteks kasus siber di lingkungan sekolah ini."
        },
        {
          "id": "d3",
          "label": "Kewajiban sekolah melindungi murid dari kekerasan di lingkungan sekolah",
          "isCorrect": true,
          "explanation": "Anak di lingkungan satuan pendidikan wajib dilindungi dari kekerasan (UU No. 35 Tahun 2014 Pasal 54), dan aturan terbaru menempatkan kepala sekolah sebagai penanggung jawab budaya sekolah yang aman. Sekolah belum bertindak.",
          "supportedBy": [
            "fa8",
            "fa3"
          ]
        },
        {
          "id": "d4",
          "label": "Kewajiban Budi untuk datang tepat waktu",
          "isCorrect": false,
          "explanation": "Keterlambatan Budi tidak berkaitan dengan ancaman yang ia terima. Pilihan ini menggeser kesalahan kepada korban."
        }
      ],
      "legalArticles": [
        {
          "id": "l1",
          "label": "UUD 1945 Pasal 28G ayat (1) - Perlindungan Diri & Rasa Aman",
          "isCorrect": true,
          "explanation": "Inti kasus: Budi kehilangan rasa aman karena ancaman.",
          "lawIds": [
            "law-01"
          ]
        },
        {
          "id": "l2",
          "label": "UUD 1945 Pasal 28J ayat (1) - Menghormati Hak Orang Lain",
          "isCorrect": true,
          "explanation": "Dasar kewajiban yang diabaikan para pelaku.",
          "lawIds": [
            "law-02"
          ]
        },
        {
          "id": "l3",
          "label": "UU ITE Pasal 29 (diubah UU No. 1 Tahun 2024) - Ancaman Kekerasan melalui Informasi Elektronik",
          "isCorrect": true,
          "explanation": "Relevan, terutama untuk pesan ancaman yang dikirim langsung ke Siska. Untuk meme yang disebar di grup, unsur 'secara langsung kepada korban' perlu dikaji lebih cermat.",
          "lawIds": [
            "law-33"
          ]
        },
        {
          "id": "l4",
          "label": "UUD 1945 Pasal 33 - Perekonomian Nasional",
          "isCorrect": false,
          "explanation": "Pasal ini mengatur perekonomian nasional, tidak berkaitan dengan perundungan."
        },
        {
          "id": "l5",
          "label": "UUD 1945 Pasal 28B ayat (2) - Perlindungan Anak dari Kekerasan",
          "isCorrect": true,
          "explanation": "Korban dan saksi masih anak; pasal ini menjamin perlindungan mereka dari kekerasan.",
          "lawIds": [
            "law-14"
          ]
        },
        {
          "id": "l6",
          "label": "UUD 1945 Pasal 31 ayat (1) - Hak atas Pendidikan",
          "isCorrect": true,
          "explanation": "Ancaman membuat Budi tidak bisa bersekolah.",
          "lawIds": [
            "law-06"
          ]
        },
        {
          "id": "l7",
          "label": "UUD 1945 Pasal 28E ayat (3) - Kebebasan Mengeluarkan Pendapat",
          "isCorrect": false,
          "explanation": "Pasal ini justru menjamin kebebasan berpendapat dan tidak menjadi dasar pelanggarannya. Yang relevan adalah pembatasannya dalam Pasal 28J.",
          "lawIds": [
            "law-18"
          ]
        },
        {
          "id": "l8",
          "label": "UUD 1945 Pasal 27 ayat (3) - Bela Negara",
          "isCorrect": false,
          "explanation": "Bela negara tidak berkaitan dengan kasus ini.",
          "lawIds": [
            "law-11"
          ]
        }
      ],
      "conclusions": [
        {
          "id": "c1",
          "text": "Ancaman dan penyebarannya melanggar hak Budi atas rasa aman, perlindungan anak, dan pendidikan. Para pelaku mengabaikan kewajiban menghormati hak orang lain, dan sekolah wajib bertindak. Karena pelaku kemungkinan juga anak, penanganannya harus mengikuti aturan perlindungan anak.",
          "isCorrect": true,
          "explanation": "Kesimpulan ini sesuai fakta yang terbukti, menyebut hak dan kewajiban yang tepat, dan tidak melampaui bukti: pemilik akun belum diketahui."
        },
        {
          "id": "c2",
          "text": "Pemilik akun anonim sudah pasti siswa kelas sebelah dan harus langsung dipenjara.",
          "isCorrect": false,
          "explanation": "Identitasnya belum terbukti (hanya rumor). Jika pelakunya anak, hukum mewajibkan perlakuan khusus, termasuk upaya diversi."
        },
        {
          "id": "c3",
          "text": "Karena pesannya hanya di grup dan admin menyebutnya candaan, tidak ada hak yang dilanggar.",
          "isCorrect": false,
          "explanation": "Klaim 'candaan' tidak menghapus isi ancaman dan dampaknya yang nyata pada Budi."
        }
      ]
    },
    decisions: [
      {
        "id": "dec-1",
        "title": "Penanganan Sekolah, Pemulihan Korban & Edukasi Etika Digital",
        "stakeholders": "Kepala Sekolah, Guru BK, Orang Tua, Siswa",
        "description": "Sekolah mengamankan bukti, melindungi Budi dan siswa yang ikut diancam, menyediakan pendampingan, menelusuri pemilik akun anonim bersama orang tua, lalu menjalankan program etika digital. Jika keluarga melapor ke polisi, proses untuk pelaku anak mengikuti sistem peradilan pidana anak.",
        "benefits": "Budi dan saksi terlindungi, pelaku dimintai tanggung jawab, dan seluruh angkatan belajar dari kasus ini.",
        "consequences": "Butuh waktu, tenaga guru BK, dan kerja sama orang tua. Penelusuran akun anonim bisa lama.",
        "feasibility": "Tinggi (dapat segera dimulai sekolah)",
        "legalAccuracyScore": 25,
        "solutionQualityScore": 30,
        "cityImpact": {
          "socialStability": 10,
          "legalIntegrity": 10,
          "regionalDevelopment": 0,
          "publicTrust": 15
        },
        "isOptimal": true,
        "tradeoffs": {
          "speed": "Sedang",
          "resources": "Sedang",
          "burden": "Sekolah dan guru BK"
        },
        "explanation": "Strategi ini menjawab semua hak yang dilanggar: rasa aman (Pasal 28G ayat 1), perlindungan anak (Pasal 28B ayat 2), dan pendidikan (Pasal 31 ayat 1). Sekolah menjalankan kewajibannya, dan jalur hukum tetap terbuka tanpa mengabaikan perlindungan pelaku yang juga anak.",
        "lawIds": [
          "law-01",
          "law-14",
          "law-06",
          "law-34",
          "law-37"
        ],
        "impactReasons": {
          "socialStability": "Ancaman berhenti dan siswa kembali merasa aman.",
          "legalIntegrity": "Pelanggaran ditangani menurut aturan, termasuk aturan perlindungan anak.",
          "regionalDevelopment": "Kasus ini tidak menyentuh pembangunan daerah.",
          "publicTrust": "Orang tua melihat sekolah melindungi muridnya."
        }
      },
      {
        "id": "dec-2",
        "title": "Menyerahkan Sepenuhnya ke Laporan Polisi",
        "stakeholders": "Keluarga Budi, Kepolisian",
        "description": "Sekolah menyarankan keluarga Budi melapor ke polisi atas dugaan ancaman lewat media elektronik, lalu menganggap urusannya selesai. Tidak ada pendampingan untuk Budi dan tidak ada langkah di sekolah.",
        "benefits": "Melapor adalah hak korban, dan ancaman kekerasan lewat media elektronik dapat diproses menurut UU ITE.",
        "consequences": "Budi dan siswa yang diancam tidak didampingi. Jika pelaku masih anak, penyidik wajib lebih dulu mengupayakan diversi, jadi hasilnya tidak instan. Sekolah tetap belum menjalankan kewajibannya.",
        "feasibility": "Sedang (proses hukum formal memerlukan waktu)",
        "legalAccuracyScore": 15,
        "solutionQualityScore": 15,
        "cityImpact": {
          "socialStability": -10,
          "legalIntegrity": 5,
          "regionalDevelopment": 0,
          "publicTrust": -5
        },
        "isOptimal": false,
        "tradeoffs": {
          "speed": "Butuh waktu",
          "resources": "Rendah bagi sekolah",
          "burden": "Keluarga Budi"
        },
        "explanation": "Jalur hukum sah, tetapi tidak cukup. Kewajiban sekolah melindungi murid dari kekerasan tidak bisa dialihkan ke polisi, dan pemulihan Budi tidak tertangani.",
        "lawIds": [
          "law-33",
          "law-37",
          "law-34"
        ],
        "impactReasons": {
          "socialStability": "Suasana sekolah tetap tegang selama proses berjalan.",
          "legalIntegrity": "Dugaan pelanggaran diproses oleh penegak hukum.",
          "regionalDevelopment": "Kasus ini tidak menyentuh pembangunan daerah.",
          "publicTrust": "Sekolah terlihat lepas tangan."
        }
      },
      {
        "id": "dec-3",
        "title": "Mengabaikan Masalah & Menganggapnya Candaan Remaja",
        "stakeholders": "Tidak ada",
        "description": "Menyarankan Budi keluar dari grup dan membiarkan situasi mendingin dengan sendirinya.",
        "benefits": "Tidak memerlukan usaha atau biaya.",
        "consequences": "Ancaman bisa terwujud, kondisi Budi memburuk, dan siswa belajar bahwa ancaman tidak ada akibatnya.",
        "feasibility": "Sangat rendah (tidak menyelesaikan masalah)",
        "legalAccuracyScore": 0,
        "solutionQualityScore": 0,
        "cityImpact": {
          "socialStability": -20,
          "legalIntegrity": -15,
          "regionalDevelopment": 0,
          "publicTrust": -20
        },
        "isOptimal": false,
        "tradeoffs": {
          "speed": "Cepat terlihat",
          "resources": "Rendah",
          "burden": "Budi (korban)"
        },
        "explanation": "Bukti menunjukkan ancaman nyata, bukan candaan. Membiarkannya berarti hak Budi atas rasa aman dan pendidikan terus dilanggar, dan sekolah melalaikan kewajibannya.",
        "lawIds": [
          "law-01",
          "law-02"
        ],
        "impactReasons": {
          "socialStability": "Ancaman dibiarkan dan ketakutan menyebar.",
          "legalIntegrity": "Pelanggaran tidak ditangani sama sekali.",
          "regionalDevelopment": "Kasus ini tidak menyentuh pembangunan daerah.",
          "publicTrust": "Korban dan orang tua kehilangan kepercayaan pada sekolah."
        }
      },
      {
        "id": "dec-4",
        "title": "Hapus Konten & Skors Semua Anggota Grup",
        "stakeholders": "Kepala Sekolah, Admin Grup",
        "description": "Sekolah meminta admin menghapus meme, lalu menskors semua siswa yang ada di grup tanpa memilah peran masing-masing. Kasus dianggap selesai.",
        "benefits": "Cepat, konten berhenti beredar, dan orang tua melihat sekolah bertindak.",
        "consequences": "Bukti bisa hilang jika dihapus sebelum diamankan. Siswa yang menegur ikut dihukum, pemilik akun anonim tidak ditelusuri, dan Budi tetap tidak didampingi.",
        "feasibility": "Tinggi (bisa dilakukan hari ini)",
        "legalAccuracyScore": 10,
        "solutionQualityScore": 10,
        "cityImpact": {
          "socialStability": -5,
          "legalIntegrity": -5,
          "regionalDevelopment": 0,
          "publicTrust": 5
        },
        "isOptimal": false,
        "tradeoffs": {
          "speed": "Cepat terlihat",
          "resources": "Rendah",
          "burden": "Siswa yang tidak bersalah"
        },
        "explanation": "Hukuman massal tanpa memeriksa peran setiap siswa tidak adil (Pasal 28D ayat 1). Langkah ini juga tidak memulihkan Budi dan tidak menyentuh pelaku utama.",
        "lawIds": [
          "law-17",
          "law-01"
        ],
        "impactReasons": {
          "socialStability": "Siswa yang dihukum tanpa alasan merasa diperlakukan tidak adil.",
          "legalIntegrity": "Sanksi dijatuhkan tanpa memeriksa siapa berbuat apa.",
          "regionalDevelopment": "Kasus ini tidak menyentuh pembangunan daerah.",
          "publicTrust": "Sebagian orang tua menilai sekolah tegas dan cepat."
        }
      }
    ],
    realWorldAction: [
      "Simpan bukti percakapan atau tangkapan layar jika mengalami atau menyaksikan perundungan siber.",
      "Laporkan ke pihak sekolah (Wali Kelas, guru BK, atau kepala sekolah) dan gunakan fitur pelaporan di platform media sosial. Konten bermasalah juga dapat diadukan melalui kanal aduan konten resmi Kementerian Komunikasi dan Digital (Komdigi).",
      "Selalu junjung etika berinternet dan hormati hak privasi serta martabat orang lain di ruang digital."
    ],
    actionGuide: {
      "title": "Kalau kamu mengalami atau melihat ancaman di grup chat",
      "steps": [
        "Jangan membalas ancaman dan jangan ikut meneruskan pesannya.",
        "Simpan bukti: tangkapan layar yang memperlihatkan nama grup, akun pengirim, tanggal, dan jam.",
        "Ceritakan kepada orang dewasa yang kamu percaya: orang tua, wali kelas, guru BK, atau kepala sekolah.",
        "Laporkan konten itu lewat fitur pelaporan di aplikasinya.",
        "Jika ada bahaya langsung, minta orang dewasa segera menghubungi polisi."
      ],
      "contacts": [
        {
          "name": "Sekolah: wali kelas, guru BK, atau kepala sekolah",
          "use": "Sekolah wajib mencegah dan menangani kekerasan, termasuk di ruang digital.",
          "how": "Datang langsung dan bawa bukti. Minta laporanmu dicatat.",
          "source": "Permendikdasmen 6/2026 (dicek ke sumber sekunder)"
        },
        {
          "name": "SAPA 129 (Kementerian PPPA)",
          "use": "Pengaduan kekerasan terhadap perempuan dan anak, termasuk pendampingan psikologis dan hukum.",
          "how": "Telepon 129 atau WhatsApp 08-111-129-129.",
          "source": "InfoPublik (Juli 2025)"
        },
        {
          "name": "aduankonten.id (Komdigi)",
          "use": "Aduan konten negatif di internet.",
          "how": "Kirim aduan beserta tautan dan tangkapan layar kontennya.",
          "source": "InfoPublik"
        },
        {
          "name": "Polisi (110)",
          "use": "Keadaan darurat atau ancaman yang akan segera terjadi.",
          "how": "Telepon 110.",
          "source": "Layanan darurat Polri"
        }
      ],
      "checkedAt": "2026-11-06"
    }
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
      "facts": [
        {
          "id": "fa1",
          "text": "Sampah plastik dan limbah cair merembes ke Sungai Hijau.",
          "established": true,
          "basis": "Sampel & Foto Lokasi",
          "explanation": "Terlihat langsung di dokumentasi lokasi."
        },
        {
          "id": "fa2",
          "text": "Kasus ISPA dan penyakit kulit anak di RW 04 meningkat dalam dua bulan terakhir.",
          "established": true,
          "basis": "Surat Aduan Puskesmas",
          "explanation": "Data resmi fasilitas kesehatan."
        },
        {
          "id": "fa3",
          "text": "Kelurahan tidak pernah menerbitkan izin pembuangan sampah di lokasi itu.",
          "established": true,
          "basis": "Surat Kelurahan tentang Izin",
          "explanation": "Dokumen resmi dari pihak yang mencatat izin."
        },
        {
          "id": "fa4",
          "text": "Truk membuang sampah di lokasi itu pada malam hari, berulang kali.",
          "established": true,
          "basis": "Kesaksian Pak RT, Buku Catatan Truk",
          "explanation": "Keterangan warga yang konsisten dan tercatat rutin."
        },
        {
          "id": "fa8",
          "text": "Warga sudah melapor, tetapi belum ada tindakan.",
          "established": true,
          "basis": "Kesaksian Pak RT, surat Kelurahan",
          "explanation": "Pak RT menyatakannya, dan kelurahan baru menjawab setelah posko bertanya."
        },
        {
          "id": "fa5",
          "text": "Pencemaran ini sudah terbukti menyebabkan penyakit warga.",
          "established": false,
          "basis": "Surat Aduan Puskesmas",
          "explanation": "Kenaikan kasus belum membuktikan penyebabnya. Masih perlu uji air dan penilaian tenaga kesehatan."
        },
        {
          "id": "fa6",
          "text": "Lokasi itu sudah diizinkan secara lisan.",
          "established": false,
          "basis": "Pernyataan Pemilik Lahan",
          "explanation": "Klaim pihak yang berkepentingan tanpa dokumen, dan dibantah surat kelurahan."
        },
        {
          "id": "fa7",
          "text": "Warga RW 04 tidak mungkin ikut membuang sampah karena pernah juara lomba kebersihan.",
          "established": false,
          "basis": "Piagam Lomba Kebersihan",
          "explanation": "Prestasi tiga tahun lalu tidak membuktikan apa pun tentang kejadian sekarang."
        }
      ],
      "rightsAffected": [
        {
          "id": "r1",
          "label": "Hak atas lingkungan hidup yang baik dan sehat",
          "isCorrect": true,
          "explanation": "Diatur eksplisit dalam UUD 1945 Pasal 28H ayat (1): hak atas lingkungan hidup yang baik dan sehat serta pelayanan kesehatan.",
          "supportedBy": [
            "fa1"
          ]
        },
        {
          "id": "r2",
          "label": "Hak memilih kewarganegaraan",
          "isCorrect": false,
          "explanation": "Tidak ada hubungannya dengan status kewarganegaraan."
        },
        {
          "id": "r3",
          "label": "Hak warga atas pelayanan pengelolaan sampah yang baik dan berwawasan lingkungan",
          "isCorrect": true,
          "explanation": "UU No. 18 Tahun 2008 Pasal 11 ayat (1) huruf a. Pembuangan liar yang dibiarkan menunjukkan layanan itu tidak terpenuhi.",
          "supportedBy": [
            "fa1",
            "fa8"
          ]
        },
        {
          "id": "r4",
          "label": "Hak pemilik lahan memakai tanahnya sesuka hati",
          "isCorrect": false,
          "explanation": "Hak milik dilindungi (Pasal 28H ayat (4)), tetapi tidak berarti boleh mencemari lingkungan dan merugikan orang lain (Pasal 28J)."
        },
        {
          "id": "r5",
          "label": "Hak atas pendidikan",
          "isCorrect": false,
          "explanation": "Tidak ada fakta dalam kasus ini yang berkaitan dengan pendidikan."
        }
      ],
      "dutiesNeglected": [
        {
          "id": "d1",
          "label": "Kewajiban menangani sampah secara berwawasan lingkungan dan membuangnya pada tempat yang ditentukan",
          "isCorrect": true,
          "explanation": "Setiap orang wajib mengurangi dan menangani sampah secara berwawasan lingkungan (UU No. 18 Tahun 2008 Pasal 12 ayat (1)) dan dilarang membuang sampah tidak pada tempat yang ditentukan (Pasal 29 ayat (1) huruf e).",
          "supportedBy": [
            "fa1",
            "fa4",
            "fa3"
          ]
        },
        {
          "id": "d2",
          "label": "Kewajiban pemerintah daerah melindungi hak warga atas lingkungan yang sehat",
          "isCorrect": true,
          "explanation": "Perlindungan dan pemenuhan HAM adalah tanggung jawab negara, terutama pemerintah (UUD 1945 Pasal 28I ayat (4)). Laporan warga belum ditindaklanjuti.",
          "supportedBy": [
            "fa8"
          ]
        },
        {
          "id": "d3",
          "label": "Kewajiban warga RW 04 membersihkan sendiri sampah kiriman truk",
          "isCorrect": false,
          "explanation": "Warga bisa ikut berpartisipasi, tetapi mereka bukan pihak yang membuang. Kewajiban utama ada pada pembuang dan pemerintah daerah."
        }
      ],
      "legalArticles": [
        {
          "id": "l1",
          "label": "UUD 1945 Pasal 28H ayat (1) - Lingkungan Sehat",
          "isCorrect": true,
          "explanation": "Dasar hak warga atas lingkungan yang baik dan sehat.",
          "lawIds": [
            "law-03"
          ]
        },
        {
          "id": "l2",
          "label": "UU No. 18 Tahun 2008 Pasal 29 ayat (1) huruf e - Larangan Membuang Sampah Tidak pada Tempatnya",
          "isCorrect": true,
          "explanation": "Larangan yang langsung dilanggar oleh pembuangan di lokasi tak berizin.",
          "lawIds": [
            "law-04"
          ]
        },
        {
          "id": "l3",
          "label": "UU No. 18 Tahun 2008 Pasal 12 ayat (1) - Kewajiban Menangani Sampah",
          "isCorrect": true,
          "explanation": "Kewajiban setiap orang menangani sampah secara berwawasan lingkungan.",
          "lawIds": [
            "law-32"
          ]
        },
        {
          "id": "l4",
          "label": "UUD 1945 Pasal 28I ayat (4) - Tanggung Jawab Negara",
          "isCorrect": true,
          "explanation": "Dasar kewajiban pemerintah daerah untuk bertindak.",
          "lawIds": [
            "law-24"
          ]
        },
        {
          "id": "l5",
          "label": "UUD 1945 Pasal 27 ayat (2) - Pekerjaan dan Penghidupan Layak",
          "isCorrect": false,
          "explanation": "Tidak ada fakta tentang pekerjaan atau penghidupan yang terganggu.",
          "lawIds": [
            "law-10"
          ]
        },
        {
          "id": "l6",
          "label": "UUD 1945 Pasal 31 ayat (1) - Hak atas Pendidikan",
          "isCorrect": false,
          "explanation": "Kasus ini tidak berkaitan dengan pendidikan.",
          "lawIds": [
            "law-06"
          ]
        }
      ],
      "conclusions": [
        {
          "id": "c1",
          "text": "Pembuangan sampah di lokasi tak berizin yang mencemari sungai melanggar hak warga atas lingkungan yang baik dan sehat. Pembuangnya melanggar UU Pengelolaan Sampah, dan pemerintah daerah wajib bertindak. Kaitannya dengan penyakit warga masih perlu dibuktikan.",
          "isCorrect": true,
          "explanation": "Sesuai fakta, menyebut hak dan kewajiban yang tepat, dan jujur tentang hal yang belum terbukti."
        },
        {
          "id": "c2",
          "text": "Pemilik lahan sudah pasti menyebabkan penyakit warga dan wajib membayar biaya pengobatan.",
          "isCorrect": false,
          "explanation": "Hubungan sebab-akibat dengan penyakit belum terbukti. Kesimpulan ini melampaui bukti."
        },
        {
          "id": "c3",
          "text": "Karena pemilik lahan mengaku punya izin lisan, kasus ini bukan pelanggaran.",
          "isCorrect": false,
          "explanation": "Klaim izin lisan dibantah surat resmi kelurahan dan tidak menghapus pencemarannya."
        }
      ]
    },
    decisions: [
      {
        "id": "dec-1",
        "title": "Pembersihan Terpadu & Penerapan Bank Sampah RW",
        "stakeholders": "Dinas Lingkungan Hidup, Pengurus RT/RW, Warga",
        "description": "Hentikan pembuangan di lokasi yang tidak berizin, telusuri pemilik truk dan pengelola lahan untuk dikenai sanksi, bersihkan bantaran bersama armada DLH, periksakan kesehatan warga, dan bentuk Bank Sampah kelolaan warga.",
        "benefits": "Sumber pencemaran dihentikan, sungai dipulihkan, dan warga mendapat sistem pengelolaan sampah jangka panjang.",
        "consequences": "Butuh anggaran dan armada DLH, serta komitmen warga untuk memilah sampah dari rumah.",
        "feasibility": "Tinggi",
        "legalAccuracyScore": 25,
        "solutionQualityScore": 30,
        "cityImpact": {
          "socialStability": 15,
          "legalIntegrity": 15,
          "regionalDevelopment": 10,
          "publicTrust": 20
        },
        "isOptimal": true,
        "tradeoffs": {
          "speed": "Sedang",
          "resources": "Tinggi",
          "burden": "Pemerintah daerah dan warga"
        },
        "explanation": "Strategi ini menegakkan larangan membuang sampah tidak pada tempatnya (UU 18/2008 Pasal 29), menjalankan kewajiban pemerintah daerah (Pasal 28I ayat 4), dan memulihkan hak warga atas lingkungan yang sehat (Pasal 28H ayat 1).",
        "lawIds": [
          "law-03",
          "law-04",
          "law-32",
          "law-24"
        ],
        "impactReasons": {
          "socialStability": "Bau dan pencemaran berkurang, warga lebih tenang.",
          "legalIntegrity": "Pembuang sampah ilegal ditelusuri dan dikenai sanksi.",
          "regionalDevelopment": "Bank sampah membuka kegiatan ekonomi warga.",
          "publicTrust": "Aduan warga akhirnya ditindaklanjuti."
        }
      },
      {
        "id": "dec-2",
        "title": "Gotong Royong Bersih-Bersih Sekali Jalan",
        "stakeholders": "Warga RW 04, Relawan",
        "description": "Warga dan relawan membersihkan bantaran sungai bersama-sama, tanpa menelusuri siapa yang membuang sampah.",
        "benefits": "Cepat, murah, dan menguatkan kebersamaan warga.",
        "consequences": "Truk tetap membuang sampah di malam hari, jadi tumpukan akan kembali. Warga menanggung kerja dan risiko kesehatan, sementara pemerintah tidak menjalankan kewajibannya.",
        "feasibility": "Tinggi (dapat dilakukan akhir pekan ini)",
        "legalAccuracyScore": 10,
        "solutionQualityScore": 10,
        "cityImpact": {
          "socialStability": 5,
          "legalIntegrity": -5,
          "regionalDevelopment": 0,
          "publicTrust": -5
        },
        "isOptimal": false,
        "tradeoffs": {
          "speed": "Cepat terlihat",
          "resources": "Rendah",
          "burden": "Warga RW 04"
        },
        "explanation": "Gotong royong baik, tetapi tidak menghentikan sumber pencemaran. Kewajiban pemerintah daerah menangani sampah (UU 18/2008 Pasal 12 dan Pasal 28I ayat 4) tidak dijalankan.",
        "lawIds": [
          "law-32",
          "law-24"
        ],
        "impactReasons": {
          "socialStability": "Warga merasa kompak setelah bekerja bersama.",
          "legalIntegrity": "Pembuangan ilegal tidak ditindak.",
          "regionalDevelopment": "Tidak ada sistem baru yang dibangun.",
          "publicTrust": "Warga merasa ditinggal pemerintah."
        }
      },
      {
        "id": "dec-3",
        "title": "Pindahkan Tumpukan ke Lahan Kosong Lain",
        "stakeholders": "Kelurahan, Pengusaha Lahan",
        "description": "Kelurahan meminta tumpukan sampah dipindahkan ke lahan kosong di pinggir kelurahan agar RW 04 segera lega.",
        "benefits": "Keluhan RW 04 cepat mereda.",
        "consequences": "Pencemaran berpindah ke warga lain. Lokasi baru juga bukan tempat pembuangan berizin.",
        "feasibility": "Tinggi, tetapi melanggar hukum",
        "legalAccuracyScore": 0,
        "solutionQualityScore": 5,
        "cityImpact": {
          "socialStability": -5,
          "legalIntegrity": -10,
          "regionalDevelopment": -5,
          "publicTrust": -5
        },
        "isOptimal": false,
        "tradeoffs": {
          "speed": "Cepat terlihat",
          "resources": "Sedang",
          "burden": "Warga di lokasi baru"
        },
        "explanation": "Memindahkan sampah ke lokasi tak berizin mengulang pelanggaran yang sama (UU 18/2008 Pasal 29) dan memindahkan pelanggaran hak atas lingkungan sehat ke warga lain.",
        "lawIds": [
          "law-04",
          "law-03"
        ],
        "impactReasons": {
          "socialStability": "Konflik baru muncul dengan warga di lokasi baru.",
          "legalIntegrity": "Pelanggaran yang sama diulang.",
          "regionalDevelopment": "Kawasan lain ikut tercemar.",
          "publicTrust": "Warga menilai masalah hanya dipindahkan."
        }
      },
      {
        "id": "dec-4",
        "title": "Fokus pada Sanksi Hukum untuk Pembuang",
        "stakeholders": "DLH, Penegak Hukum",
        "description": "Pembuang sampah dilaporkan dan diproses secara hukum. Pembersihan menunggu sampai proses selesai.",
        "benefits": "Memberi efek jera dan kepastian hukum.",
        "consequences": "Selama proses berjalan, sungai tetap tercemar dan warga terus terpapar. Pengelolaan sampah warga tidak disentuh.",
        "feasibility": "Sedang (proses hukum memerlukan waktu)",
        "legalAccuracyScore": 20,
        "solutionQualityScore": 15,
        "cityImpact": {
          "socialStability": 0,
          "legalIntegrity": 10,
          "regionalDevelopment": 0,
          "publicTrust": 5
        },
        "isOptimal": false,
        "tradeoffs": {
          "speed": "Butuh waktu",
          "resources": "Sedang",
          "burden": "Warga yang terus terpapar"
        },
        "explanation": "Menegakkan hukum itu penting, tetapi hak warga atas lingkungan sehat (Pasal 28H ayat 1) perlu dipulihkan sekarang, bukan setelah putusan.",
        "lawIds": [
          "law-04",
          "law-03"
        ],
        "impactReasons": {
          "socialStability": "Kondisi warga belum berubah.",
          "legalIntegrity": "Pelanggar diproses secara hukum.",
          "regionalDevelopment": "Tidak ada perbaikan lingkungan atau sistem baru.",
          "publicTrust": "Warga melihat ada tindakan, walau lambat."
        }
      }
    ],
    realWorldAction: [
      "Pilahlah sampah organik dan anorganik dari rumah.",
      "Gunakan saluran resmi sistem pengaduan daerah jika menemukan TPS ilegal."
    ],
    actionGuide: {
      "title": "Kalau kamu melihat pembuangan sampah ilegal",
      "steps": [
        "Catat lokasi, tanggal, jam, dan nomor kendaraan jika terlihat jelas. Jangan mendekat atau menegur pelaku sendirian, apalagi di malam hari.",
        "Ambil foto atau video dari tempat yang aman.",
        "Laporkan kepada pengurus RT/RW dan kelurahan, lalu ke Dinas Lingkungan Hidup kabupaten/kota.",
        "Jika tidak ditanggapi, buat aduan di SP4N-LAPOR! dan simpan nomor tiket aduannya.",
        "Jika ada keluhan kesehatan, periksakan diri ke puskesmas dan simpan catatan pemeriksaannya."
      ],
      "contacts": [
        {
          "name": "Dinas Lingkungan Hidup kabupaten/kota",
          "use": "Penanganan sampah dan pencemaran di daerahmu.",
          "how": "Lihat kontak aduan di situs resmi pemerintah daerahmu.",
          "source": "Dibuat umum karena kontaknya berbeda di setiap daerah"
        },
        {
          "name": "SP4N-LAPOR! (lapor.go.id)",
          "use": "Kanal aduan pelayanan publik nasional. Aduan diteruskan ke instansi yang berwenang, termasuk Kementerian Lingkungan Hidup.",
          "how": "Buat aduan di lapor.go.id. Sertakan lokasi, waktu, dan foto.",
          "source": "Situs Kementerian Lingkungan Hidup (kemenlh.go.id)"
        },
        {
          "name": "Puskesmas",
          "use": "Pemeriksaan kesehatan dan catatan medis jika ada keluhan.",
          "how": "Datang langsung ke puskesmas terdekat.",
          "source": "Layanan kesehatan umum"
        }
      ],
      "checkedAt": "2026-11-06"
    }
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
      "facts": [
        {
          "id": "fa1",
          "text": "Sepeda motor melintas di atas trotoar saat jam macet.",
          "established": true,
          "basis": "Rekaman CCTV, kesaksian Ibu Rahma dan Pak Darto",
          "explanation": "Terekam kamera dan dikuatkan dua saksi dari pihak berbeda."
        },
        {
          "id": "fa2",
          "text": "Lapak pedagang menutup lebih dari separuh lebar trotoar.",
          "established": true,
          "basis": "Foto Lapak di Trotoar",
          "explanation": "Terlihat di foto lokasi."
        },
        {
          "id": "fa3",
          "text": "Pejalan kaki terpaksa berjalan di bahu jalan yang padat.",
          "established": true,
          "basis": "Kesaksian Ibu Rahma, surat komunitas penyandang disabilitas",
          "explanation": "Dikuatkan oleh dua sumber."
        },
        {
          "id": "fa4",
          "text": "Pengguna kursi roda tidak bisa melintasi trotoar di ruas ini.",
          "established": true,
          "basis": "Surat Komunitas Penyandang Disabilitas",
          "explanation": "Laporan langsung dari anggota yang mengalaminya."
        },
        {
          "id": "fa5",
          "text": "Motor naik ke trotoar sepanjang hari.",
          "established": false,
          "basis": "Rekaman CCTV",
          "explanation": "Rekaman hanya mencakup jam macet. Pelanggaran di jam lain belum diketahui."
        },
        {
          "id": "fa6",
          "text": "Karena sudah sepuluh tahun dan tidak ada yang protes, lapak di trotoar sah.",
          "established": false,
          "basis": "Pernyataan Paguyuban Pedagang",
          "explanation": "Lamanya berjualan tidak mengubah fungsi trotoar. 'Tidak ada yang protes' juga bukan bukti tidak ada yang terganggu."
        },
        {
          "id": "fa7",
          "text": "Tarif parkir mal yang mahal membuat motor naik ke trotoar.",
          "established": false,
          "basis": "Keluhan Tarif Parkir Mal",
          "explanation": "Tidak ada bukti yang menghubungkan tarif parkir dengan pelanggaran ini."
        }
      ],
      "rightsAffected": [
        {
          "id": "r1",
          "label": "Hak atas keselamatan dan kenyamanan fasilitas jalan umum bagi pejalan kaki",
          "isCorrect": true,
          "explanation": "Pejalan kaki berhak atas fasilitas pendukung seperti trotoar (UU No. 22 Tahun 2009 Pasal 131 ayat (1); trotoar termasuk fasilitas pendukung menurut Pasal 45 ayat (1)). Penyandang disabilitas berhak atas kemudahan khusus (UUD 1945 Pasal 28H ayat (2)).",
          "supportedBy": [
            "fa1",
            "fa2",
            "fa3"
          ]
        },
        {
          "id": "r2",
          "label": "Hak penyandang disabilitas atas kemudahan dan perlakuan khusus",
          "isCorrect": true,
          "explanation": "UUD 1945 Pasal 28H ayat (2). Trotoar yang tertutup membuat pengguna kursi roda harus turun ke jalan.",
          "supportedBy": [
            "fa4"
          ]
        },
        {
          "id": "r3",
          "label": "Hak pedagang berjualan di trotoar demi penghidupan",
          "isCorrect": false,
          "explanation": "Hak atas penghidupan yang layak (Pasal 27 ayat (2)) nyata, tetapi tidak memberi hak memakai trotoar yang fungsinya untuk pejalan kaki. Nasib pedagang tetap perlu dipikirkan di ruang keputusan."
        },
        {
          "id": "r4",
          "label": "Hak atas status kewarganegaraan",
          "isCorrect": false,
          "explanation": "Tidak berkaitan dengan kasus ini."
        }
      ],
      "dutiesNeglected": [
        {
          "id": "d1",
          "label": "Kewajiban pengemudi mengutamakan keselamatan pejalan kaki serta mengemudi dengan wajar dan penuh konsentrasi",
          "isCorrect": true,
          "explanation": "UU No. 22 Tahun 2009 Pasal 106 ayat (1) dan (2). Setiap warga negara juga wajib menjunjung hukum (UUD 1945 Pasal 27 ayat (1)).",
          "supportedBy": [
            "fa1"
          ]
        },
        {
          "id": "d2",
          "label": "Kewajiban pedagang dan pengendara menghormati hak pejalan kaki",
          "isCorrect": true,
          "explanation": "Setiap orang wajib menghormati hak asasi orang lain (UUD 1945 Pasal 28J ayat (1)).",
          "supportedBy": [
            "fa1",
            "fa2"
          ]
        },
        {
          "id": "d3",
          "label": "Kewajiban pemerintah kota menjaga fungsi trotoar bagi pejalan kaki",
          "isCorrect": true,
          "explanation": "Perlindungan dan pemenuhan hak warga adalah tanggung jawab negara, terutama pemerintah (UUD 1945 Pasal 28I ayat (4)).",
          "supportedBy": [
            "fa2",
            "fa3",
            "fa4"
          ]
        },
        {
          "id": "d4",
          "label": "Kewajiban pejalan kaki mengalah kepada kendaraan saat macet",
          "isCorrect": false,
          "explanation": "Justru sebaliknya: pengemudi wajib mengutamakan keselamatan pejalan kaki (UU No. 22 Tahun 2009 Pasal 106 ayat (2))."
        }
      ],
      "legalArticles": [
        {
          "id": "l1",
          "label": "UU No. 22 Tahun 2009 Pasal 106 & Pasal 131 - Kewajiban Pengemudi dan Hak Pejalan Kaki",
          "isCorrect": true,
          "explanation": "Inti kasus: kewajiban pengemudi dan hak pejalan kaki atas trotoar.",
          "lawIds": [
            "law-05",
            "law-07"
          ]
        },
        {
          "id": "l2",
          "label": "UU No. 22 Tahun 2009 Pasal 45 ayat (1) - Trotoar sebagai Fasilitas Pendukung",
          "isCorrect": true,
          "explanation": "Menegaskan trotoar dan fasilitas bagi penyandang disabilitas sebagai bagian resmi fasilitas lalu lintas.",
          "lawIds": [
            "law-08"
          ]
        },
        {
          "id": "l3",
          "label": "UUD 1945 Pasal 28H ayat (2) - Kemudahan bagi Kelompok Rentan",
          "isCorrect": true,
          "explanation": "Dasar hak penyandang disabilitas atas kemudahan khusus.",
          "lawIds": [
            "law-21"
          ]
        },
        {
          "id": "l4",
          "label": "UUD 1945 Pasal 27 ayat (1) - Kewajiban Menjunjung Hukum",
          "isCorrect": true,
          "explanation": "Setiap warga negara, termasuk pengendara, wajib menjunjung hukum.",
          "lawIds": [
            "law-09"
          ]
        },
        {
          "id": "l5",
          "label": "UUD 1945 Pasal 28D ayat (4) - Status Kewarganegaraan",
          "isCorrect": false,
          "explanation": "Tidak berkaitan dengan kasus ini."
        },
        {
          "id": "l6",
          "label": "UUD 1945 Pasal 31 ayat (4) - Anggaran Pendidikan",
          "isCorrect": false,
          "explanation": "Tidak berkaitan dengan lalu lintas atau trotoar.",
          "lawIds": [
            "law-29"
          ]
        }
      ],
      "conclusions": [
        {
          "id": "c1",
          "text": "Pemakaian trotoar oleh motor dan lapak melanggar hak pejalan kaki, terutama penyandang disabilitas. Pengendara melanggar kewajibannya menurut UU LLAJ, dan pemerintah kota wajib mengembalikan fungsi trotoar sambil memikirkan nasib pedagang.",
          "isCorrect": true,
          "explanation": "Sesuai fakta dan menyeimbangkan hak semua pihak tanpa membenarkan pelanggaran."
        },
        {
          "id": "c2",
          "text": "Semua pedagang harus diusir hari ini juga karena mereka pelaku utama.",
          "isCorrect": false,
          "explanation": "Fakta menunjukkan dua sumber masalah: motor dan lapak. Solusi yang hanya mengusir tanpa proses juga mengabaikan hak penghidupan pedagang."
        },
        {
          "id": "c3",
          "text": "Karena macet, motor yang naik trotoar bisa dimaklumi.",
          "isCorrect": false,
          "explanation": "Kemacetan menjelaskan keadaan, tetapi tidak menghapus kewajiban pengemudi mengutamakan pejalan kaki."
        }
      ]
    },
    decisions: [
      {
        "id": "dec-1",
        "title": "Pemasangan Bolard Pembatas & Operasi Penertiban Berkelanjutan",
        "stakeholders": "Dishub, Satlantas, Satpol PP, Pedagang",
        "description": "Pasang pembatas fisik yang menghalangi motor tetapi tetap bisa dilalui kursi roda, lakukan penertiban rutin (termasuk tilang elektronik jika tersedia), dan pindahkan pedagang ke lokasi resmi yang disiapkan bersama mereka.",
        "benefits": "Trotoar kembali berfungsi untuk pejalan kaki dan pengguna kursi roda, dan pedagang tetap punya tempat berjualan.",
        "consequences": "Butuh anggaran, pengawasan rutin, dan waktu untuk menyiapkan lokasi pedagang.",
        "feasibility": "Tinggi",
        "legalAccuracyScore": 25,
        "solutionQualityScore": 30,
        "cityImpact": {
          "socialStability": 10,
          "legalIntegrity": 20,
          "regionalDevelopment": 5,
          "publicTrust": 15
        },
        "isOptimal": true,
        "tradeoffs": {
          "speed": "Sedang",
          "resources": "Tinggi",
          "burden": "Pemerintah kota"
        },
        "explanation": "Strategi ini memulihkan fungsi trotoar (UU 22/2009 Pasal 45 dan 131), memberi kemudahan bagi penyandang disabilitas (Pasal 28H ayat 2), dan tetap memperhatikan penghidupan pedagang (Pasal 27 ayat 2).",
        "lawIds": [
          "law-08",
          "law-07",
          "law-05",
          "law-21",
          "law-10"
        ],
        "impactReasons": {
          "socialStability": "Pedagang dipindahkan dengan dialog, tidak diusir.",
          "legalIntegrity": "Aturan lalu lintas ditegakkan secara konsisten.",
          "regionalDevelopment": "Lokasi dagang resmi menata kawasan.",
          "publicTrust": "Pejalan kaki merasakan hasilnya setiap hari."
        }
      },
      {
        "id": "dec-2",
        "title": "Razia Gabungan Besar-Besaran Sekali",
        "stakeholders": "Satpol PP, Satlantas",
        "description": "Operasi gabungan satu hari: pengendara di trotoar ditilang dan semua lapak diangkut.",
        "benefits": "Trotoar langsung bersih dan hasilnya mudah dilihat.",
        "consequences": "Tanpa pengawasan lanjutan, pelanggaran kembali dalam beberapa hari. Pedagang kehilangan nafkah tanpa tempat pengganti.",
        "feasibility": "Tinggi",
        "legalAccuracyScore": 15,
        "solutionQualityScore": 10,
        "cityImpact": {
          "socialStability": -10,
          "legalIntegrity": 5,
          "regionalDevelopment": -5,
          "publicTrust": 0
        },
        "isOptimal": false,
        "tradeoffs": {
          "speed": "Cepat terlihat",
          "resources": "Sedang",
          "burden": "Pedagang kecil"
        },
        "explanation": "Penegakan aturan memang perlu, tetapi tindakan sekali tanpa tindak lanjut tidak menjaga fungsi trotoar. Hilangnya nafkah pedagang juga menyentuh hak atas penghidupan yang layak (Pasal 27 ayat 2).",
        "lawIds": [
          "law-05",
          "law-10"
        ],
        "impactReasons": {
          "socialStability": "Pedagang yang kehilangan nafkah memicu ketegangan.",
          "legalIntegrity": "Pelanggaran ditindak, walau hanya sekali.",
          "regionalDevelopment": "Kegiatan ekonomi kecil di kawasan itu terhenti.",
          "publicTrust": "Pejalan kaki senang, pedagang kecewa."
        }
      },
      {
        "id": "dec-3",
        "title": "Izinkan Lapak di Trotoar dengan Retribusi",
        "stakeholders": "Pemerintah Kota, Pedagang",
        "description": "Pedagang boleh tetap berjualan di trotoar dengan membayar retribusi. Motor tetap dilarang naik trotoar.",
        "benefits": "Pedagang tenang, dan kota mendapat pemasukan.",
        "consequences": "Lapak tetap menutup sebagian besar trotoar, jadi pejalan kaki dan pengguna kursi roda tetap tidak bisa lewat.",
        "feasibility": "Tinggi",
        "legalAccuracyScore": 5,
        "solutionQualityScore": 5,
        "cityImpact": {
          "socialStability": 5,
          "legalIntegrity": -10,
          "regionalDevelopment": 5,
          "publicTrust": -5
        },
        "isOptimal": false,
        "tradeoffs": {
          "speed": "Cepat terlihat",
          "resources": "Rendah",
          "burden": "Pejalan kaki dan penyandang disabilitas"
        },
        "explanation": "Selama lapak menutup sebagian besar lebar trotoar, fungsinya sebagai fasilitas pejalan kaki (UU 22/2009 Pasal 45) hilang dan hak penyandang disabilitas (Pasal 28H ayat 2) tetap terabaikan.",
        "lawIds": [
          "law-08",
          "law-21"
        ],
        "impactReasons": {
          "socialStability": "Pedagang tidak lagi khawatir digusur.",
          "legalIntegrity": "Fungsi trotoar dikorbankan secara resmi.",
          "regionalDevelopment": "Kota mendapat pemasukan retribusi.",
          "publicTrust": "Pejalan kaki merasa diabaikan."
        }
      },
      {
        "id": "dec-4",
        "title": "Kampanye Kesadaran Tanpa Penegakan",
        "stakeholders": "Dishub, Komunitas",
        "description": "Pasang spanduk dan jalankan kampanye media sosial tentang hak pejalan kaki, tanpa penertiban.",
        "benefits": "Murah dan tidak menimbulkan konflik.",
        "consequences": "Pelanggaran berlanjut karena tidak ada akibatnya. Pengguna kursi roda tetap tidak bisa lewat.",
        "feasibility": "Tinggi",
        "legalAccuracyScore": 5,
        "solutionQualityScore": 5,
        "cityImpact": {
          "socialStability": 0,
          "legalIntegrity": -5,
          "regionalDevelopment": 0,
          "publicTrust": -5
        },
        "isOptimal": false,
        "tradeoffs": {
          "speed": "Butuh waktu",
          "resources": "Rendah",
          "burden": "Pejalan kaki"
        },
        "explanation": "Edukasi berguna sebagai pelengkap, tetapi pemerintah kota tetap wajib mengembalikan fungsi trotoar (Pasal 28I ayat 4). Tanpa penegakan, kewajiban pengendara dalam UU 22/2009 Pasal 106 tidak ditegakkan.",
        "lawIds": [
          "law-24",
          "law-05"
        ],
        "impactReasons": {
          "socialStability": "Situasi di jalan tidak berubah.",
          "legalIntegrity": "Pelanggaran dibiarkan.",
          "regionalDevelopment": "Kawasan tidak ditata.",
          "publicTrust": "Warga melihat tidak ada perubahan nyata."
        }
      }
    ],
    realWorldAction: ["Selalu utamakan keselamatan pejalan kaki dan jangan menggunakan trotoar saat berkendara."],
    actionGuide: {
      "title": "Kalau trotoar di jalanmu tidak bisa dipakai",
      "steps": [
        "Saat berkendara, jangan pernah naik ke trotoar, termasuk saat macet.",
        "Catat lokasi dan waktu, lalu foto kondisi trotoar dari tempat yang aman.",
        "Laporkan ke Dinas Perhubungan atau kanal aduan pemerintah kotamu.",
        "Jika tidak ditanggapi, buat aduan di SP4N-LAPOR! dan simpan nomor tiketnya.",
        "Saat berjalan kaki, beri jalan kepada pengguna kursi roda dan orang lanjut usia."
      ],
      "contacts": [
        {
          "name": "Dinas Perhubungan atau Satpol PP kota",
          "use": "Penataan trotoar dan penertiban sesuai peraturan daerah.",
          "how": "Lihat kanal aduan di situs resmi pemerintah kotamu.",
          "source": "Dibuat umum karena kontaknya berbeda di setiap daerah"
        },
        {
          "name": "SP4N-LAPOR! (lapor.go.id)",
          "use": "Kanal aduan pelayanan publik nasional. Aduan diteruskan ke instansi yang berwenang, misalnya pemerintah kota atau dinas terkait.",
          "how": "Buat aduan di lapor.go.id. Sertakan lokasi, waktu, dan foto.",
          "source": "Laporan pengelolaan aduan SP4N-LAPOR! instansi pemerintah (2025–2026)"
        }
      ],
      "checkedAt": "2026-11-06"
    }
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
      "facts": [
        {
          "id": "fa1",
          "text": "Sekolah menagih biaya 'wajib' kepada siswa yang tidak mampu.",
          "established": true,
          "basis": "Kwitansi Pungutan Sekolah, kesaksian Ibu Sari",
          "explanation": "Tertulis di kwitansi berkop sekolah dan dikuatkan orang tua."
        },
        {
          "id": "fa2",
          "text": "Sembilan siswa kelas 4–6 tidak hadir lebih dari sebulan.",
          "established": true,
          "basis": "Daftar Siswa Tidak Aktif, kesaksian Pak Budi",
          "explanation": "Data resmi sekolah, dikuatkan relawan."
        },
        {
          "id": "fa7",
          "text": "Ada anak yang berhenti sekolah dan bekerja sebagai pemilah ikan.",
          "established": true,
          "basis": "Kesaksian Ibu Sari, briefing kasus",
          "explanation": "Dinyatakan langsung oleh orang tuanya."
        },
        {
          "id": "fa4",
          "text": "Kebutuhan ekonomi keluarga ikut mendorong anak bekerja.",
          "established": true,
          "basis": "Catatan relawan, kesaksian Ibu Sari",
          "explanation": "Pengamatan lapangan yang konsisten dengan kesaksian orang tua."
        },
        {
          "id": "fa3",
          "text": "Orang tua tidak pernah diajak membahas biaya itu.",
          "established": false,
          "basis": "Kesaksian Ibu Sari, dibantah bendahara",
          "explanation": "Belum bisa ditetapkan: kesaksian orang tua bertentangan dengan klaim bendahara. Perlu notulen rapat komite."
        },
        {
          "id": "fa5",
          "text": "Biaya itu sumbangan sukarela yang disepakati komite.",
          "established": false,
          "basis": "Pernyataan Bendahara Sekolah",
          "explanation": "Klaim tanpa dokumen, dan bertentangan dengan kata 'wajib' di kwitansi."
        },
        {
          "id": "fa6",
          "text": "Anak-anak berhenti sekolah karena nilainya rendah.",
          "established": false,
          "basis": "Nilai Rapor Anak Pesisir",
          "explanation": "Tidak ada bukti hubungan itu. Hak atas pendidikan juga tidak bergantung pada nilai."
        }
      ],
      "rightsAffected": [
        {
          "id": "r1",
          "label": "Hak memperoleh pendidikan dasar yang dibiayai negara",
          "isCorrect": true,
          "explanation": "UUD 1945 Pasal 31 ayat (1) dan (2): setiap warga negara berhak mendapat pendidikan dan wajib mengikuti pendidikan dasar yang dibiayai pemerintah.",
          "supportedBy": [
            "fa1",
            "fa2"
          ]
        },
        {
          "id": "r2",
          "label": "Hak anak untuk tumbuh dan berkembang",
          "isCorrect": true,
          "explanation": "UUD 1945 Pasal 28B ayat (2). Anak usia sekolah dasar yang harus bekerja kehilangan kesempatan tumbuh dan berkembang.",
          "supportedBy": [
            "fa7",
            "fa2"
          ]
        },
        {
          "id": "r3",
          "label": "Hak anak untuk bekerja membantu keluarga",
          "isCorrect": false,
          "explanation": "Hak atas pekerjaan (Pasal 27 ayat (2) dan 28D ayat (2)) tidak dimaksudkan untuk membenarkan anak usia sekolah dasar meninggalkan sekolah demi bekerja."
        },
        {
          "id": "r4",
          "label": "Hak memilih kewarganegaraan",
          "isCorrect": false,
          "explanation": "Tidak berkaitan dengan kasus ini."
        }
      ],
      "dutiesNeglected": [
        {
          "id": "d1",
          "label": "Kewajiban negara memprioritaskan anggaran pendidikan dan membebaskan biaya pendidikan dasar",
          "isCorrect": true,
          "explanation": "Pemerintah wajib membiayai pendidikan dasar (UUD 1945 Pasal 31 ayat (2)) dan memprioritaskan anggaran pendidikan minimal 20% (Pasal 31 ayat (4)). Pungutan oleh oknum sekolah menghambat kewajiban ini, sehingga pemerintah daerah wajib menertibkannya.",
          "supportedBy": [
            "fa1"
          ]
        },
        {
          "id": "d2",
          "label": "Kewajiban pemerintah dan pemerintah daerah menjamin wajib belajar tanpa memungut biaya",
          "isCorrect": true,
          "explanation": "UU No. 20 Tahun 2003 Pasal 34 ayat (2). Sejak putusan MK tahun 2025, jaminan tanpa biaya ini berlaku untuk sekolah dasar negeri maupun yang diselenggarakan masyarakat.",
          "supportedBy": [
            "fa1",
            "fa2"
          ]
        },
        {
          "id": "d3",
          "label": "Kewajiban anak-anak pesisir mengikuti pendidikan dasar",
          "isCorrect": false,
          "explanation": "Kewajiban itu memang ada (Pasal 31 ayat (2)), tetapi anak-anak tidak mengabaikannya karena lalai. Mereka terhalang biaya, dan kewajiban menghapus hambatan itu ada pada pemerintah."
        },
        {
          "id": "d4",
          "label": "Kewajiban orang tua membayar semua biaya yang ditetapkan sekolah",
          "isCorrect": false,
          "explanation": "Pendidikan dasar dibiayai pemerintah. Pungutan wajib yang menghalangi siswa tidak mampu justru yang dipersoalkan."
        }
      ],
      "legalArticles": [
        {
          "id": "l1",
          "label": "UUD 1945 Pasal 31 ayat (1), (2) & (4) - Hak dan Kewajiban Pendidikan",
          "isCorrect": true,
          "explanation": "Inti kasus: hak atas pendidikan dasar yang dibiayai pemerintah.",
          "lawIds": [
            "law-06",
            "law-29"
          ]
        },
        {
          "id": "l2",
          "label": "UU No. 20 Tahun 2003 Pasal 34 ayat (2) - Wajib Belajar Tanpa Memungut Biaya",
          "isCorrect": true,
          "explanation": "Kewajiban pemerintah menjamin pendidikan dasar tanpa biaya, sebagaimana dimaknai putusan MK tahun 2025.",
          "lawIds": [
            "law-35"
          ]
        },
        {
          "id": "l3",
          "label": "UUD 1945 Pasal 28B ayat (2) - Tumbuh Kembang Anak",
          "isCorrect": true,
          "explanation": "Anak yang harus bekerja kehilangan haknya untuk tumbuh dan berkembang.",
          "lawIds": [
            "law-14"
          ]
        },
        {
          "id": "l4",
          "label": "UUD 1945 Pasal 28I ayat (4) - Tanggung Jawab Negara",
          "isCorrect": true,
          "explanation": "Dasar kewajiban pemerintah daerah untuk bertindak.",
          "lawIds": [
            "law-24"
          ]
        },
        {
          "id": "l5",
          "label": "UUD 1945 Pasal 27 ayat (2) - Hak atas Pekerjaan",
          "isCorrect": false,
          "explanation": "Hak atas pekerjaan tidak menjadi dasar bagi anak usia sekolah dasar untuk bekerja menggantikan sekolah.",
          "lawIds": [
            "law-10"
          ]
        },
        {
          "id": "l6",
          "label": "UUD 1945 Pasal 29 ayat (2) - Kebebasan Beragama",
          "isCorrect": false,
          "explanation": "Tidak berkaitan dengan kasus ini.",
          "lawIds": [
            "law-26"
          ]
        }
      ],
      "conclusions": [
        {
          "id": "c1",
          "text": "Pungutan wajib yang menghalangi siswa tidak mampu melanggar hak anak atas pendidikan dasar yang dibiayai pemerintah dan hak mereka untuk tumbuh kembang. Pemerintah daerah wajib menertibkan pungutan, sementara dasar penetapannya masih perlu diperiksa.",
          "isCorrect": true,
          "explanation": "Sesuai fakta, menempatkan kewajiban pada pemerintah, dan jujur bahwa sah tidaknya kesepakatan komite belum terbukti."
        },
        {
          "id": "c2",
          "text": "Anak-anak berhenti sekolah karena malas dan nilainya rendah, jadi tidak ada pelanggaran hak.",
          "isCorrect": false,
          "explanation": "Tidak didukung bukti dan menyalahkan anak. Hak atas pendidikan dasar tidak bergantung pada nilai."
        },
        {
          "id": "c3",
          "text": "Karena bendahara menyebutnya sumbangan sukarela, pungutan itu pasti sah.",
          "isCorrect": false,
          "explanation": "Klaim itu belum terbukti dan bertentangan dengan kwitansi yang menyebut 'wajib'."
        }
      ]
    },
    decisions: [
      {
        "id": "dec-1",
        "title": "Penertiban Pungli & Penyaluran Bantuan Pendidikan",
        "stakeholders": "Dinas Pendidikan, Inspektorat Daerah, Sekolah, Orang Tua",
        "description": "Periksa dasar penetapan biaya dan hentikan pungutan yang tidak sah, kembalikan dana yang terlanjur ditagih, data anak yang berhenti sekolah, lalu ajak mereka kembali dengan bantuan seperti Program Indonesia Pintar (PIP).",
        "benefits": "Anak-anak kembali bersekolah tanpa beban biaya, dan penyebab utamanya dihentikan.",
        "consequences": "Butuh audit keuangan sekolah dan pendataan keluarga, yang memerlukan waktu.",
        "feasibility": "Tinggi",
        "legalAccuracyScore": 25,
        "solutionQualityScore": 30,
        "cityImpact": {
          "socialStability": 20,
          "legalIntegrity": 15,
          "regionalDevelopment": 20,
          "publicTrust": 25
        },
        "isOptimal": true,
        "tradeoffs": {
          "speed": "Sedang",
          "resources": "Sedang",
          "burden": "Pemerintah daerah"
        },
        "explanation": "Strategi ini menjalankan kewajiban negara membiayai pendidikan dasar (Pasal 31 ayat 2 dan UU Sisdiknas Pasal 34 ayat 2) dan memulihkan hak anak atas pendidikan serta tumbuh kembang (Pasal 31 ayat 1 dan Pasal 28B ayat 2).",
        "lawIds": [
          "law-06",
          "law-35",
          "law-29",
          "law-14"
        ],
        "impactReasons": {
          "socialStability": "Keluarga tidak lagi terbebani biaya yang tidak sah.",
          "legalIntegrity": "Pungutan diperiksa dan dihentikan sesuai aturan.",
          "regionalDevelopment": "Anak-anak pesisir kembali belajar, modal masa depan daerah.",
          "publicTrust": "Warga melihat aduan relawan ditindaklanjuti."
        }
      },
      {
        "id": "dec-2",
        "title": "Beri Bantuan, Biarkan Pungutan",
        "stakeholders": "Dinas Pendidikan",
        "description": "Sembilan siswa yang berhenti mendapat bantuan biaya, tetapi pungutan untuk siswa lain tetap berjalan.",
        "benefits": "Anak-anak yang berhenti bisa cepat kembali bersekolah.",
        "consequences": "Bantuan negara justru dipakai untuk membayar pungutan yang belum tentu sah. Keluarga lain tetap terbebani.",
        "feasibility": "Tinggi",
        "legalAccuracyScore": 10,
        "solutionQualityScore": 15,
        "cityImpact": {
          "socialStability": 5,
          "legalIntegrity": -5,
          "regionalDevelopment": 5,
          "publicTrust": 0
        },
        "isOptimal": false,
        "tradeoffs": {
          "speed": "Cepat terlihat",
          "resources": "Sedang",
          "burden": "Keluarga siswa lain"
        },
        "explanation": "Bantuan menolong sebagian anak, tetapi pungutan yang menghalangi pendidikan dasar tetap berjalan. Kewajiban pemerintah menjamin wajib belajar tanpa biaya (UU Sisdiknas Pasal 34 ayat 2) belum dijalankan.",
        "lawIds": [
          "law-35",
          "law-06"
        ],
        "impactReasons": {
          "socialStability": "Sebagian keluarga lega.",
          "legalIntegrity": "Pungutan bermasalah tetap berjalan.",
          "regionalDevelopment": "Beberapa anak kembali belajar.",
          "publicTrust": "Sebagian warga puas, sebagian tetap merasa diperas."
        }
      },
      {
        "id": "dec-3",
        "title": "Copot Kepala Sekolah Saat Itu Juga",
        "stakeholders": "Dinas Pendidikan",
        "description": "Kepala sekolah langsung dicopot tanpa pemeriksaan siapa yang menetapkan pungutan. Anak-anak yang berhenti tidak didata.",
        "benefits": "Memberi sinyal tegas bahwa pungutan tidak dibiarkan.",
        "consequences": "Belum jelas siapa yang menetapkan biaya itu, jadi sanksi bisa salah sasaran. Anak-anak yang sudah bekerja tidak otomatis kembali ke sekolah.",
        "feasibility": "Tinggi",
        "legalAccuracyScore": 10,
        "solutionQualityScore": 10,
        "cityImpact": {
          "socialStability": -5,
          "legalIntegrity": 0,
          "regionalDevelopment": 0,
          "publicTrust": 5
        },
        "isOptimal": false,
        "tradeoffs": {
          "speed": "Cepat terlihat",
          "resources": "Rendah",
          "burden": "Kepala sekolah dan siswa"
        },
        "explanation": "Sanksi tanpa pemeriksaan mengabaikan kepastian hukum yang adil (Pasal 28D ayat 1), dan hak anak atas pendidikan belum dipulihkan.",
        "lawIds": [
          "law-17",
          "law-06"
        ],
        "impactReasons": {
          "socialStability": "Sekolah bergejolak setelah pergantian mendadak.",
          "legalIntegrity": "Ada sanksi, tetapi tanpa pemeriksaan yang semestinya.",
          "regionalDevelopment": "Anak-anak tetap putus sekolah.",
          "publicTrust": "Sebagian warga menilai pemerintah tegas."
        }
      },
      {
        "id": "dec-4",
        "title": "Denda Orang Tua yang Membiarkan Anak Bekerja",
        "stakeholders": "Pemerintah Desa",
        "description": "Orang tua didenda jika anaknya bekerja dan tidak sekolah. Pungutan di sekolah tidak diperiksa.",
        "benefits": "Memberi tekanan agar anak kembali ke sekolah.",
        "consequences": "Keluarga miskin makin terbebani, sementara penyebab di sekolah tetap ada. Anak bisa makin terdesak bekerja untuk membayar denda.",
        "feasibility": "Sedang",
        "legalAccuracyScore": 0,
        "solutionQualityScore": 5,
        "cityImpact": {
          "socialStability": -10,
          "legalIntegrity": 0,
          "regionalDevelopment": -5,
          "publicTrust": -10
        },
        "isOptimal": false,
        "tradeoffs": {
          "speed": "Sedang",
          "resources": "Rendah",
          "burden": "Keluarga miskin"
        },
        "explanation": "Kewajiban membiayai pendidikan dasar ada pada negara (Pasal 31 ayat 2), bukan dipindahkan menjadi hukuman bagi keluarga yang tidak mampu.",
        "lawIds": [
          "law-06",
          "law-29"
        ],
        "impactReasons": {
          "socialStability": "Keluarga miskin makin tertekan.",
          "legalIntegrity": "Tidak ada perubahan: pungutan bermasalah tidak disentuh.",
          "regionalDevelopment": "Ekonomi keluarga pesisir makin lemah.",
          "publicTrust": "Warga merasa disalahkan atas masalah yang bukan dari mereka."
        }
      }
    ],
    realWorldAction: ["Laporkan pungutan yang tidak sah di sekolah kepada Dinas Pendidikan setempat atau Ombudsman Republik Indonesia."],
    actionGuide: {
      "title": "Kalau sekolah menagih biaya yang memberatkan",
      "steps": [
        "Tanyakan secara sopan dasar tertulis setiap biaya: siapa yang menetapkan, untuk apa, dan apakah wajib.",
        "Simpan bukti tagihan, kuitansi, atau pesan yang meminta pembayaran.",
        "Bicarakan bersama orang tua lain dengan kepala sekolah atau komite sekolah.",
        "Jika tidak ada penyelesaian, laporkan ke Dinas Pendidikan kabupaten/kota, lalu ke Ombudsman RI.",
        "Tanyakan ke sekolah atau dinas pendidikan apakah kamu berhak atas Program Indonesia Pintar (PIP)."
      ],
      "contacts": [
        {
          "name": "Dinas Pendidikan kabupaten/kota",
          "use": "Pengawasan sekolah dan aduan biaya pendidikan.",
          "how": "Datang langsung atau lihat kanal aduan di situs pemerintah daerahmu.",
          "source": "Dibuat umum karena kontaknya berbeda di setiap daerah"
        },
        {
          "name": "Ombudsman RI (perwakilan provinsi)",
          "use": "Aduan maladministrasi pelayanan publik, misalnya pungutan sekolah yang tidak sah atau proses pemerintah yang tidak patut.",
          "how": "Datang ke kantor perwakilan Ombudsman di provinsimu atau lihat ombudsman.go.id. Bawa bukti dan catatan aduan yang sudah kamu sampaikan ke instansinya.",
          "source": "Berita resmi Ombudsman RI (2025–2026)"
        },
        {
          "name": "Program Indonesia Pintar (PIP)",
          "use": "Bantuan pendidikan dari pemerintah untuk siswa dari keluarga kurang mampu.",
          "how": "Tanyakan cara pengajuan dan pengecekan kepada sekolah.",
          "source": "Pemberitaan penyaluran PIP 2026"
        }
      ],
      "checkedAt": "2026-11-06"
    }
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
      "facts": [
        {
          "id": "fa1",
          "text": "Warga diberi tenggat tiga hari tanpa pilihan relokasi.",
          "established": true,
          "basis": "Surat Peringatan Pengosongan",
          "explanation": "Tertulis di surat yang diterima warga."
        },
        {
          "id": "fa2",
          "text": "Undangan sosialisasi hanya ditujukan kepada ketua RT.",
          "established": true,
          "basis": "Undangan Sosialisasi Proyek, kesaksian Ibu Nur",
          "explanation": "Dokumen tertulis, dikuatkan kesaksian warga."
        },
        {
          "id": "fa3",
          "text": "Warga tidak menolak pembangunan, tetapi meminta dialog dan tempat tinggal pengganti.",
          "established": true,
          "basis": "Kesaksian Ibu Nur",
          "explanation": "Pernyataan langsung perwakilan warga tentang tuntutan mereka sendiri."
        },
        {
          "id": "fa4",
          "text": "Belum ada keputusan tertulis tentang relokasi atau ganti rugi.",
          "established": true,
          "basis": "Kesaksian Pak Yusuf (Staf Pemkot)",
          "explanation": "Diakui sendiri oleh staf pemerintah kota."
        },
        {
          "id": "fa5",
          "text": "Warga sudah diajak bicara dan menyetujui rencana ini.",
          "established": false,
          "basis": "Siaran Pers Pengembang",
          "explanation": "Klaim pihak berkepentingan tanpa dokumen, dan bertentangan dengan undangan yang hanya ditujukan ke ketua RT."
        },
        {
          "id": "fa6",
          "text": "Warga terbukti memiliki tanahnya karena rutin membayar PBB.",
          "established": false,
          "basis": "Bukti Pembayaran PBB Warga",
          "explanation": "Bukti bayar PBB bukan sertifikat. Status kepemilikan tanah belum diketahui."
        },
        {
          "id": "fa7",
          "text": "Rumah semipermanen boleh dikosongkan tanpa prosedur.",
          "established": false,
          "basis": "Foto Bangunan Semipermanen",
          "explanation": "Bahan bangunan tidak menentukan hak warga atas proses yang adil."
        }
      ],
      "rightsAffected": [
        {
          "id": "r1",
          "label": "Hak atas tempat tinggal dan penghidupan yang layak",
          "isCorrect": true,
          "explanation": "UUD 1945 Pasal 28H ayat (1) (hak bertempat tinggal) dan Pasal 27 ayat (2) (penghidupan yang layak). Jika warga memiliki hak atas tanah/bangunannya, hak itu tidak boleh diambil alih sewenang-wenang (Pasal 28H ayat (4)).",
          "supportedBy": [
            "fa1",
            "fa3"
          ]
        },
        {
          "id": "r2",
          "label": "Hak atas kepastian hukum yang adil",
          "isCorrect": true,
          "explanation": "UUD 1945 Pasal 28D ayat (1). Perintah pengosongan tiga hari tanpa keputusan tertulis soal relokasi tidak memberi kepastian.",
          "supportedBy": [
            "fa1",
            "fa4"
          ]
        },
        {
          "id": "r3",
          "label": "Hak menyampaikan pendapat dan memperoleh informasi tentang rencana pembangunan",
          "isCorrect": true,
          "explanation": "UUD 1945 Pasal 28E ayat (3) dan Pasal 28F. Warga terdampak tidak diundang dan tidak diberi informasi.",
          "supportedBy": [
            "fa2"
          ]
        },
        {
          "id": "r4",
          "label": "Hak milik pribadi warga atas tanahnya sudah pasti dilanggar",
          "isCorrect": false,
          "explanation": "Pasal 28H ayat (4) baru bisa dipakai jika kepemilikan terbukti. Bukti bayar PBB belum membuktikannya."
        },
        {
          "id": "r5",
          "label": "Hak beragama",
          "isCorrect": false,
          "explanation": "Tidak berkaitan dengan kasus ini."
        }
      ],
      "dutiesNeglected": [
        {
          "id": "d1",
          "label": "Kewajiban pemerintah menghormati hak asasi warga dalam proses pembangunan publik",
          "isCorrect": true,
          "explanation": "Perlindungan dan pemenuhan hak asasi manusia adalah tanggung jawab negara, terutama pemerintah (UUD 1945 Pasal 28I ayat (4)). Pengembang dan semua pihak juga wajib menghormati hak orang lain (Pasal 28J ayat (1)).",
          "supportedBy": [
            "fa1",
            "fa2",
            "fa4"
          ]
        },
        {
          "id": "d2",
          "label": "Kewajiban pengembang menghormati hak warga",
          "isCorrect": true,
          "explanation": "UUD 1945 Pasal 28J ayat (1). Tenggat tiga hari datang dari pengembang tanpa dasar yang jelas.",
          "supportedBy": [
            "fa1"
          ]
        },
        {
          "id": "d3",
          "label": "Kewajiban warga mengosongkan rumah dalam tiga hari demi kepentingan umum",
          "isCorrect": false,
          "explanation": "Kepentingan umum itu nyata, tetapi tidak menghapus kewajiban menempuh proses yang adil. Hak warga hanya boleh dibatasi dengan undang-undang (Pasal 28J ayat (2))."
        },
        {
          "id": "d4",
          "label": "Kewajiban bela negara",
          "isCorrect": false,
          "explanation": "Tidak berkaitan dengan kasus ini."
        }
      ],
      "legalArticles": [
        {
          "id": "l1",
          "label": "UUD 1945 Pasal 28H ayat (1) - Hak Bertempat Tinggal",
          "isCorrect": true,
          "explanation": "Dasar hak warga atas tempat tinggal.",
          "lawIds": [
            "law-03"
          ]
        },
        {
          "id": "l2",
          "label": "UUD 1945 Pasal 28D ayat (1) - Kepastian Hukum yang Adil",
          "isCorrect": true,
          "explanation": "Pengosongan tanpa keputusan tertulis yang jelas tidak memberi kepastian hukum.",
          "lawIds": [
            "law-17"
          ]
        },
        {
          "id": "l3",
          "label": "UUD 1945 Pasal 28I ayat (4) - Tanggung Jawab Negara",
          "isCorrect": true,
          "explanation": "Dasar kewajiban pemerintah kota.",
          "lawIds": [
            "law-24"
          ]
        },
        {
          "id": "l4",
          "label": "UUD 1945 Pasal 28J ayat (1) - Menghormati Hak Orang Lain",
          "isCorrect": true,
          "explanation": "Dasar kewajiban pengembang.",
          "lawIds": [
            "law-02"
          ]
        },
        {
          "id": "l5",
          "label": "UUD 1945 Pasal 27 ayat (2) - Penghidupan yang Layak",
          "isCorrect": true,
          "explanation": "Penggusuran tanpa relokasi dapat memutus mata pencaharian warga.",
          "lawIds": [
            "law-10"
          ]
        },
        {
          "id": "l6",
          "label": "UUD 1945 Pasal 28H ayat (4) - Hak Milik Pribadi",
          "isCorrect": false,
          "explanation": "Belum bisa dipakai karena status tanah belum diketahui. Pasal ini menjadi relevan jika kepemilikan warga terbukti.",
          "lawIds": [
            "law-22"
          ]
        },
        {
          "id": "l7",
          "label": "UUD 1945 Pasal 31 ayat (1) - Hak atas Pendidikan",
          "isCorrect": false,
          "explanation": "Tidak berkaitan dengan kasus ini.",
          "lawIds": [
            "law-06"
          ]
        }
      ],
      "conclusions": [
        {
          "id": "c1",
          "text": "Pengosongan sepihak tanpa musyawarah dan tanpa kepastian relokasi melanggar hak warga atas tempat tinggal, kepastian hukum, dan informasi. Pemerintah kota dan pengembang wajib menempuh proses yang adil. Status kepemilikan tanah masih perlu diperiksa.",
          "isCorrect": true,
          "explanation": "Sesuai fakta, mengakui kepentingan umum tanpa membenarkan proses yang tidak adil, dan jujur bahwa status tanah belum diketahui."
        },
        {
          "id": "c2",
          "text": "Karena untuk kepentingan umum, warga wajib pindah sesuai jadwal tanpa perlu dialog.",
          "isCorrect": false,
          "explanation": "Kepentingan umum tidak menghapus hak warga atas proses yang adil dan kepastian hukum."
        },
        {
          "id": "c3",
          "text": "Warga sudah pasti pemilik sah tanahnya, jadi proyek harus dibatalkan.",
          "isCorrect": false,
          "explanation": "Kepemilikan belum terbukti, dan fakta tidak menunjukkan proyek harus dibatalkan. Warga sendiri tidak menolak pembangunan."
        }
      ]
    },
    decisions: [
      {
        "id": "dec-1",
        "title": "Pemberhentian Sementara Pengosongan & Musyawarah Relokasi Layak",
        "stakeholders": "Pemkot, Warga, LBH, Pengembang",
        "description": "Hentikan pengosongan sepihak, periksa status tanah, dan adakan musyawarah terbuka dengan semua warga terdampak untuk menyepakati relokasi atau kompensasi, misalnya Rusunawa, secara tertulis.",
        "benefits": "Pembangunan tetap berjalan, dan warga mendapat kepastian tempat tinggal.",
        "consequences": "Jadwal proyek tertunda beberapa waktu.",
        "feasibility": "Tinggi",
        "legalAccuracyScore": 25,
        "solutionQualityScore": 30,
        "cityImpact": {
          "socialStability": 25,
          "legalIntegrity": 20,
          "regionalDevelopment": 10,
          "publicTrust": 25
        },
        "isOptimal": true,
        "tradeoffs": {
          "speed": "Butuh waktu",
          "resources": "Sedang",
          "burden": "Pemerintah kota dan pengembang (waktu)"
        },
        "explanation": "Strategi ini menghormati hak atas tempat tinggal (Pasal 28H ayat 1), kepastian hukum yang adil (Pasal 28D ayat 1), dan hak atas informasi (Pasal 28F), tanpa menolak pembangunan yang dibutuhkan kota.",
        "lawIds": [
          "law-03",
          "law-17",
          "law-19",
          "law-24",
          "law-10"
        ],
        "impactReasons": {
          "socialStability": "Konflik mereda karena warga dilibatkan.",
          "legalIntegrity": "Prosesnya tertulis, jelas, dan dapat diuji.",
          "regionalDevelopment": "Pembangunan tetap berjalan, hanya tertunda.",
          "publicTrust": "Warga merasa didengar."
        }
      },
      {
        "id": "dec-2",
        "title": "Lanjutkan Pengosongan dengan Uang Pindah",
        "stakeholders": "Pemkot, Pengembang",
        "description": "Tenggat diperpanjang dua minggu dan warga diberi uang pindah, tanpa musyawarah dan tanpa tempat tinggal pengganti.",
        "benefits": "Proyek tepat waktu, dan warga mendapat sejumlah dana.",
        "consequences": "Warga tidak mendapat kepastian tempat tinggal, dan keputusan dibuat tanpa melibatkan mereka.",
        "feasibility": "Tinggi",
        "legalAccuracyScore": 10,
        "solutionQualityScore": 10,
        "cityImpact": {
          "socialStability": -10,
          "legalIntegrity": -5,
          "regionalDevelopment": 10,
          "publicTrust": -10
        },
        "isOptimal": false,
        "tradeoffs": {
          "speed": "Cepat terlihat",
          "resources": "Sedang",
          "burden": "Warga terdampak"
        },
        "explanation": "Uang pindah tidak menggantikan hak atas tempat tinggal (Pasal 28H ayat 1) dan proses yang adil (Pasal 28D ayat 1). Warga sudah menyatakan tidak menolak pembangunan, jadi musyawarah sebenarnya mungkin.",
        "lawIds": [
          "law-03",
          "law-17"
        ],
        "impactReasons": {
          "socialStability": "Warga terpaksa pindah tanpa tujuan jelas.",
          "legalIntegrity": "Prosesnya tidak memberi kepastian hukum.",
          "regionalDevelopment": "Proyek selesai sesuai jadwal.",
          "publicTrust": "Warga merasa diabaikan."
        }
      },
      {
        "id": "dec-3",
        "title": "Batalkan Proyek Sepenuhnya",
        "stakeholders": "Pemkot",
        "description": "Pembangunan fasilitas publik dibatalkan agar warga tidak perlu pindah.",
        "benefits": "Warga tetap tinggal di rumahnya.",
        "consequences": "Fasilitas yang dibutuhkan kota batal, padahal warga sendiri tidak menolak pembangunan. Status tanah dan nasib warga tetap belum jelas.",
        "feasibility": "Sedang",
        "legalAccuracyScore": 10,
        "solutionQualityScore": 10,
        "cityImpact": {
          "socialStability": 5,
          "legalIntegrity": 0,
          "regionalDevelopment": -15,
          "publicTrust": 0
        },
        "isOptimal": false,
        "tradeoffs": {
          "speed": "Cepat terlihat",
          "resources": "Rendah",
          "burden": "Warga kota yang butuh fasilitas"
        },
        "explanation": "Melindungi warga tidak berarti harus menghentikan pembangunan. Yang dibutuhkan adalah proses yang adil dan berdasarkan hak, bukan pembatalan.",
        "lawIds": [
          "law-24",
          "law-03"
        ],
        "impactReasons": {
          "socialStability": "Warga terdampak lega untuk sementara.",
          "legalIntegrity": "Status tanah tetap tidak diperiksa.",
          "regionalDevelopment": "Fasilitas publik batal dibangun.",
          "publicTrust": "Sebagian warga puas, sebagian kecewa fasilitasnya batal."
        }
      },
      {
        "id": "dec-4",
        "title": "Serahkan Negosiasi ke Pengembang",
        "stakeholders": "Pengembang",
        "description": "Pemerintah kota lepas tangan dan meminta pengembang bernegosiasi langsung dengan warga.",
        "benefits": "Pemerintah kota tidak perlu mengeluarkan anggaran atau tenaga.",
        "consequences": "Posisi tawar warga lemah, dan tidak ada pihak yang menjamin hak mereka. Negara tetap bertanggung jawab atas perlindungan hak warga.",
        "feasibility": "Tinggi",
        "legalAccuracyScore": 0,
        "solutionQualityScore": 5,
        "cityImpact": {
          "socialStability": -5,
          "legalIntegrity": -10,
          "regionalDevelopment": 5,
          "publicTrust": -15
        },
        "isOptimal": false,
        "tradeoffs": {
          "speed": "Sedang",
          "resources": "Rendah",
          "burden": "Warga terdampak"
        },
        "explanation": "Perlindungan dan pemenuhan hak asasi adalah tanggung jawab negara, terutama pemerintah (Pasal 28I ayat 4). Kewajiban itu tidak bisa diserahkan kepada pengembang.",
        "lawIds": [
          "law-24",
          "law-02"
        ],
        "impactReasons": {
          "socialStability": "Warga menghadapi pengembang sendirian.",
          "legalIntegrity": "Pemerintah melepaskan kewajibannya.",
          "regionalDevelopment": "Proyek berjalan.",
          "publicTrust": "Warga merasa ditinggalkan pemerintahnya."
        }
      }
    ],
    realWorldAction: ["Gunakan musyawarah mufakat dalam menyelesaikan konflik kepentingan publik."],
    actionGuide: {
      "title": "Kalau tempat tinggalmu terdampak rencana pembangunan",
      "steps": [
        "Minta pemberitahuan dan rencana tertulis: siapa yang membangun, kapan, dan apa pilihan untuk warga.",
        "Kumpulkan dokumen: bukti kepemilikan atau hak atas tanah, bukti pembayaran PBB, KTP, dan KK.",
        "Minta musyawarah yang melibatkan semua warga terdampak, bukan hanya ketua RT, dan catat hasilnya secara tertulis.",
        "Minta pendampingan lembaga bantuan hukum (LBH) sebelum menandatangani apa pun.",
        "Jika pemerintah tidak menjalankan prosedur yang patut, adukan ke Ombudsman RI. Dugaan pelanggaran hak asasi dapat diadukan ke Komnas HAM."
      ],
      "contacts": [
        {
          "name": "Lembaga Bantuan Hukum (LBH) atau organisasi bantuan hukum",
          "use": "Pendampingan dan nasihat hukum bagi warga.",
          "how": "Hubungi LBH atau organisasi bantuan hukum di kotamu.",
          "source": "Dibuat umum karena lembaganya berbeda di setiap daerah"
        },
        {
          "name": "Ombudsman RI (perwakilan provinsi)",
          "use": "Aduan maladministrasi pelayanan publik, misalnya pungutan sekolah yang tidak sah atau proses pemerintah yang tidak patut.",
          "how": "Datang ke kantor perwakilan Ombudsman di provinsimu atau lihat ombudsman.go.id. Bawa bukti dan catatan aduan yang sudah kamu sampaikan ke instansinya.",
          "source": "Berita resmi Ombudsman RI (2025–2026)"
        },
        {
          "name": "Komnas HAM",
          "use": "Pengaduan dugaan pelanggaran hak asasi manusia.",
          "how": "Lihat cara pengaduan di situs resmi Komnas HAM.",
          "source": "Pemberitaan pengaduan Komnas HAM"
        }
      ],
      "checkedAt": "2026-11-06"
    }
  }
];
/**
 * Perspective layer for each investigator.
 *
 * Rules for this content:
 * 1. A perspective changes what the character NOTICES and ASKS, never the
 *    facts. Every line may only use facts already present in chapters.js.
 * 2. Commentary prompts reasoning; it must not name the correct answers.
 * 3. Not every perspective fits every case. relevance:
 *      'utama'      — the case is part of this character's daily world
 *      'pendukung'  — the character has a real but indirect connection
 *      'luar'       — outside their world; they say so instead of
 *                     inventing a connection
 *
 * Lookup order (see lib/commentary.js): case-specific line → generic line.
 */

export const RELEVANCE_LABELS = {
  utama: 'Dekat dengan keseharianmu',
  pendukung: 'Ada kaitan dengan keseharianmu',
  luar: 'Di luar keseharianmu',
};

export const perspectives = {
  // ------------------------------------------------------------------ Arya
  'char-01': {
    generic: {
      outsideIntro: null,
      investigationStart: 'Mulai dari dokumen, lalu saksi. Catat siapa sumber setiap informasi.',
      evidence: 'Apa yang benar-benar dibuktikan dokumen ini, dan apa yang belum?',
      witnessBefore: 'Pertanyaan pertamaku: apa yang dia lihat sendiri, dan apa yang hanya dia dengar dari orang lain?',
      witnessAfter: 'Kesaksian sudah kucatat. Sekarang cocokkan dengan dokumen sebelum dijadikan fakta.',
      investigationComplete: 'Semua bahan terkumpul. Saatnya memisahkan fakta, klaim, dan dugaan.',
      legal: 'Sebelum memilih pasal, pastikan setiap pilihan bisa ditunjukkan buktinya.',
      decision: 'Solusi yang baik bisa dijelaskan terbuka ke publik: siapa yang bertindak, kapan, dan bagaimana diawasi.',
      legalResult: {
        perfect: 'Semua pilihanmu bisa dipertanggungjawabkan. Itu dasar yang kuat untuk keputusan.',
        wrong: 'Ada pilihan yang ternyata tidak relevan. Baca penjelasannya: bagian fakta mana yang tidak mendukungnya?',
        missed: 'Ada yang terlewat. Penjelasan di tiap pilihan menunjukkan bukti mana yang seharusnya mengarah ke sana.',
      },
    },
    cases: {
      'case-01': {
        relevance: 'utama',
        intro: 'Meme ini sudah di-forward berkali-kali. Tugasku melacak jejaknya tanpa ikut menyebarkannya lagi.',
        evidence: {
          'ev-1': 'Perhatikan kata-katanya: ini ancaman fisik, bukan sekadar ejekan. Tapi akunnya anonim, jadi jangan menebak pelaku sebelum ada bukti.',
          'ev-2': 'Absensi menulis "Sakit", sementara wali kelas mencatat Budi menangis. Dua dokumen, dua sudut. Keduanya perlu dicatat.',
        },
        witness: {
          'wit-1': {
            before: 'Aku ingin tahu sejak kapan candaan di grup berubah jadi ancaman.',
            after: 'Kesaksian Siska menguatkan isi screenshot, tapi tetap kesaksian. Catat juga bahwa dia sendiri ikut diancam.',
          },
        },
        legal: 'Pisahkan dulu: siapa yang dirugikan, apa yang diabaikan pelaku, dan aturan mana yang mengatur perbuatannya.',
        decision: 'Pertanyaan editorku selalu sama: solusi mana yang menghentikan ancaman sekarang dan mencegahnya berulang?',
      },
      'case-02': {
        relevance: 'utama',
        intro: 'Truk yang membuang sampah malam-malam. Pola seperti ini biasanya meninggalkan jejak: jadwal, rute, dan saksi.',
        evidence: {
          'ev-1': 'Foto menunjukkan limbah cair merembes ke sungai. Siapa pemilik sampahnya belum terjawab oleh foto ini.',
          'ev-2': 'Data puskesmas menunjukkan kenaikan kasus, tapi data saja belum membuktikan penyebabnya. Perlu dikaitkan dengan bukti lain.',
        },
        witness: {
          'wit-1': {
            before: 'Aku ingin tahu siapa yang sudah ditegur warga, dan apa jawabannya.',
            after: 'Klaim "area pribadi" datang dari pengelola lahan, bukan dari dokumen. Itu perlu dicek.',
          },
        },
        decision: 'Pembersihan sekali jalan mudah diberitakan. Pertanyaannya: apa yang mencegah truk itu kembali?',
      },
      'case-03': {
        relevance: 'pendukung',
        intro: 'Rekaman CCTV adalah awal yang bagus. Aku perlu tahu seberapa sering ini terjadi.',
        evidence: {
          'ev-1': 'CCTV merekam saat jam macet. Apakah pelanggaran yang sama terjadi di jam lain? Rekaman ini belum menjawabnya.',
        },
        witness: {
          'wit-1': {
            after: 'Satu kesaksian yang kuat, tapi tetap satu orang. Forum Pejalan Kaki yang melapor mungkin punya catatan lebih banyak.',
          },
        },
      },
      'case-04': {
        relevance: 'pendukung',
        intro: 'Kwitansi adalah dokumen yang kuat. Aku perlu tahu siapa yang menerbitkannya dan untuk apa uangnya.',
        evidence: {
          'ev-1': 'Kwitansi menyebut biaya wajib. Pertanyaan berikutnya: atas dasar keputusan siapa pungutan itu ditetapkan?',
        },
        witness: {
          'wit-1': {
            after: 'Relawan melihat dampaknya langsung. Suara orang tua dan pihak sekolah juga perlu didengar.',
          },
        },
      },
      'case-05': {
        relevance: 'utama',
        intro: '"Kepentingan umum" sering dipakai sebagai alasan. Tugasku menanyakan apakah prosesnya terbuka.',
        evidence: {
          'ev-1': 'Tenggat tiga hari tanpa opsi relokasi. Aku ingin tahu siapa yang menerbitkan surat ini dan atas dasar apa.',
        },
        witness: {
          'wit-1': {
            after: 'Ibu Nur tidak menolak pembangunan. Detail itu penting dan sering hilang dari berita.',
          },
        },
        decision: 'Publik perlu melihat bahwa warga ikut menentukan, bukan hanya diberi tahu.',
      },
    },
  },

  // ------------------------------------------------------------------ Citra
  'char-02': {
    generic: {
      outsideIntro: null,
      investigationStart: 'Aku kumpulkan bukti yang bisa dipakai melapor, lalu mendengarkan pihak yang terdampak.',
      evidence: 'Bisakah dokumen ini dipakai dalam pengaduan resmi? Apa yang masih kurang?',
      witnessBefore: 'Aku mendengarkan dulu, lalu menanyakan hal-hal yang bisa diverifikasi.',
      witnessAfter: 'Kesaksian ini penting, tapi perlu dicocokkan dengan bukti tertulis.',
      investigationComplete: 'Bukti sudah cukup untuk mulai menyusun dasar hukumnya.',
      legal: 'Hak siapa yang terdampak, dan siapa yang memikul kewajibannya?',
      decision: 'Pilihan yang tepat tidak hanya efektif, tapi juga sesuai prosedur dan menghormati hak semua pihak.',
      legalResult: {
        perfect: 'Analisis yang rapi. Dasar hukumnya bisa kita bawa ke ruang keputusan.',
        wrong: 'Ada pasal atau hak yang tidak cocok dengan fakta kasus. Dalam pengaduan sungguhan, itu melemahkan argumen.',
        missed: 'Analisisnya belum lengkap. Hak atau kewajiban yang terlewat bisa membuat korban kehilangan perlindungan.',
      },
    },
    cases: {
      'case-01': {
        relevance: 'pendukung',
        intro: 'Korban dan terduga pelaku sama-sama anak. Itu memengaruhi cara penanganan yang patut.',
        evidence: {
          'ev-1': 'Bukti elektronik seperti ini sebaiknya diamankan utuh: nama grup, waktu, dan isi pesan.',
          'ev-2': 'Dampaknya terdokumentasi. Hari absen dan catatan wali kelas bisa menjadi bukti kerugian.',
        },
        witness: {
          'wit-1': {
            before: 'Aku perlu tahu apakah ada ancaman lanjutan, termasuk kepada saksi.',
            after: 'Saksi yang ikut diancam juga perlu dilindungi. Daftar pihak yang terdampak bertambah.',
          },
        },
        legal: 'Hak mana yang langsung terganggu oleh ancaman itu, dan hak mana yang terganggu sebagai akibatnya?',
        decision: 'Melapor ke polisi adalah hak korban. Untuk anak-anak, pertimbangkan juga dampak setiap jalur bagi semua anak yang terlibat.',
      },
      'case-02': {
        relevance: 'utama',
        intro: 'Izin informal bukan izin resmi. Hak warga atas lingkungan yang sehat tidak hilang karena kesepakatan tidak tertulis.',
        evidence: {
          'ev-1': 'Bukti pencemaran sebaiknya dilengkapi tanggal dan lokasi pengambilan agar bisa dipakai dalam pengaduan resmi.',
          'ev-2': 'Ini menunjukkan dampak kesehatan. Catat sejak kapan kenaikan kasus terjadi.',
        },
        witness: {
          'wit-1': {
            before: 'Apakah warga pernah menyampaikan keberatan secara tercatat? Itu menentukan langkah berikutnya.',
            after: 'Teguran langsung tidak dihiraukan. Saatnya memakai jalur pengaduan yang tercatat.',
          },
        },
        decision: 'Siapa yang wajib bertindak lebih dulu: pemilik lahan, warga, atau pemerintah daerah? Jawabannya bisa lebih dari satu.',
      },
      'case-03': {
        relevance: 'pendukung',
        intro: 'Trotoar bukan ruang kosong yang boleh dipakai siapa saja. Ada aturan yang menetapkan fungsinya.',
        evidence: {
          'ev-1': 'Rekaman ini bisa menjadi bukti pelanggaran berulang jika lokasi dan waktunya tercatat jelas.',
        },
        witness: {
          'wit-1': {
            after: 'Kesaksian Ibu Rahma menunjukkan risiko nyata, termasuk bagi anak yang ia tuntun.',
          },
        },
        legal: 'Bedakan kewajiban pengendara dengan kewajiban pihak yang mengelola jalan.',
        decision: 'Pedagang juga warga. Penertiban yang adil ikut memikirkan ke mana mereka bisa berjualan.',
      },
      'case-04': {
        relevance: 'utama',
        intro: 'Pendidikan dasar adalah hak sekaligus kewajiban, dan pembiayaannya ditanggung pemerintah. Pungutan yang menghalanginya harus diperiksa.',
        evidence: {
          'ev-1': 'Simpan kwitansi aslinya. Ini bukti tertulis yang bisa dipakai saat melapor.',
        },
        witness: {
          'wit-1': {
            after: 'Ketika biaya menghalangi sekolah, anak-anak jadi bekerja. Pikirkan semua hak yang terdampak dari rantai itu.',
          },
        },
        legal: 'Siapa pemegang kewajiban di sini: sekolah, pemerintah daerah, atau keduanya?',
        decision: 'Menghapus pungutan menyelesaikan satu sebab. Apa yang membuat keluarga tetap butuh anaknya bekerja?',
      },
      'case-05': {
        relevance: 'utama',
        intro: 'Laporan ini datang dari LBH. Yang dipersoalkan bukan pembangunannya, tapi caranya.',
        evidence: {
          'ev-1': 'Tiga hari, tanpa musyawarah dan tanpa pilihan relokasi. Periksa apakah surat itu menyebutkan dasar hukumnya.',
        },
        witness: {
          'wit-1': {
            after: 'Tuntutannya jelas dan wajar: diajak bicara dan diberi tempat tinggal pengganti.',
          },
        },
        legal: 'Apakah warga memiliki hak atas tanahnya? Jawaban itu memengaruhi pasal yang relevan, jadi jangan diasumsikan.',
        decision: 'Menunda proyek ada biayanya. Mengosongkan rumah tanpa proses yang adil juga ada biayanya, dan warga yang menanggungnya.',
      },
    },
  },

  // ------------------------------------------------------------------ Raka
  'char-03': {
    generic: {
      outsideIntro: 'Kasus ini jauh dari keseharianku sebagai siswa. Aku belajar dari dokumen dan saksi, bukan dari pengalaman sendiri.',
      investigationStart: 'Oke, mulai dari yang paling bikin penasaran dulu.',
      evidence: 'Dokumen orang dewasa, nih. Aku baca pelan-pelan: apa yang sebenarnya terjadi?',
      witnessBefore: 'Aku dengerin dulu ceritanya sampai selesai.',
      witnessAfter: 'Ceritanya masuk akal, tapi itu kata dia. Harus dicek sama bukti lain.',
      investigationComplete: 'Oke, semua udah kubaca. Sekarang bagian yang bikin mikir.',
      legal: 'Coba hubungkan yang kulihat di bukti dengan hak dan kewajiban yang dibahas di pelajaran Pendidikan Pancasila.',
      decision: 'Kalau aku yang kena dampaknya, solusi mana yang beneran ngebantu?',
      legalResult: {
        perfect: 'Pas semua! Ternyata pelajaran Pendidikan Pancasila kepake juga.',
        wrong: 'Ada yang kepilih padahal nggak nyambung sama kasusnya. Baca penjelasannya biar nggak keulang.',
        missed: 'Masih ada yang kelewat. Cek lagi penjelasannya satu-satu.',
      },
    },
    cases: {
      'case-01': {
        relevance: 'utama',
        intro: 'Grup angkatan kayak gini aku juga punya. Yang nyebar biasanya ngerasa cuma ikut-ikutan.',
        evidence: {
          'ev-1': '"Di-forward berkali-kali." Berarti banyak yang ikut nyebar, bukan cuma akun anonim itu.',
          'ev-2': 'Lima hari nggak masuk itu lama. Kalau aku jadi Budi, mungkin aku juga takut lewat gerbang sekolah.',
        },
        witness: {
          'wit-1': {
            before: 'Siska ketua kelas. Dia pasti lihat semuanya dari awal.',
            after: 'Siska udah berani negur, malah ikut diancam. Pantes yang lain diem aja.',
          },
        },
        legal: 'Coba pikir dari posisi Budi: apa saja yang berubah dalam hidupnya sejak meme itu menyebar?',
        decision: 'Buatku, solusi yang bagus itu yang bikin Budi berani sekolah lagi.',
      },
      'case-02': { relevance: 'luar' },
      'case-03': {
        relevance: 'pendukung',
        intro: 'Aku tiap hari jalan kaki ke sekolah. Motor naik trotoar udah jadi pemandangan biasa, dan justru itu masalahnya.',
        evidence: {
          'ev-1': 'Pas macet, trotoar jadi jalan pintas. Yang jalan kaki yang harus minggir.',
        },
        witness: {
          'wit-1': {
            after: 'Kebayang nggak, nuntun anak kecil sambil menghindari motor?',
          },
        },
        decision: 'Kalau trotoarnya dipasangi pembatas, kami yang jalan kaki aman. Tapi pedagangnya pindah ke mana?',
      },
      'case-04': {
        relevance: 'utama',
        intro: 'Mereka seumuran aku. Bedanya, mereka harus milih antara sekolah atau bantu orang tua.',
        evidence: {
          'ev-1': 'Biaya wajib buat siswa yang nggak mampu? Aku nggak kepikiran ada yang sampai berhenti sekolah gara-gara ini.',
        },
        witness: {
          'wit-1': {
            after: 'Anak-anaknya pengin belajar. Masalahnya bukan di mereka.',
          },
        },
        decision: 'Bantuan biaya itu bagus. Tapi aku penasaran, pungutannya sendiri gimana?',
      },
      'case-05': { relevance: 'luar' },
    },
  },

  // ------------------------------------------------------------------ Bu Laras
  'char-04': {
    generic: {
      outsideIntro: 'Kasus ini di luar lingkungan sekolah. Aku memakai kebiasaanku sebagai guru: dengarkan semua pihak, lalu periksa catatannya.',
      investigationStart: 'Pertama, aku ingin memahami apa yang dialami orang yang paling rentan dalam kasus ini.',
      evidence: 'Apa yang dokumen ini katakan tentang keselamatan orang yang paling rentan?',
      witnessBefore: 'Aku ingin saksi merasa aman untuk bercerita.',
      witnessAfter: 'Terima kasih atas ceritanya. Tetap perlu dicocokkan dengan catatan resmi.',
      investigationComplete: 'Bahan sudah lengkap. Saatnya menimbang kewajiban setiap pihak.',
      legal: 'Tanyakan: kewajiban siapa yang diabaikan, dan siapa yang wajib memperbaikinya?',
      decision: 'Rencana yang baik harus bisa dijalankan oleh lembaga yang bertanggung jawab, bukan hanya bagus di atas kertas.',
      legalResult: {
        perfect: 'Bagus. Kamu menghubungkan hak, kewajiban, dan aturannya dengan tepat.',
        wrong: 'Ada pilihan yang kurang tepat. Itu bagian dari belajar; baca alasannya pelan-pelan.',
        missed: 'Belum lengkap. Ingat, satu peristiwa bisa menyentuh lebih dari satu hak.',
      },
    },
    cases: {
      'case-01': {
        relevance: 'utama',
        intro: 'Laporan ini berawal dari wali kelas. Sebagai guru, aku wajib memastikan Budi aman kembali ke kelas.',
        evidence: {
          'ev-1': 'Pesan ini menyebut "sepulang sekolah". Risikonya ada di sekitar sekolah, dan sekolah harus bertindak.',
          'ev-2': 'Catatan "Sakit" di absensi tidak menceritakan semuanya. Catatan wali kelas melengkapinya.',
        },
        witness: {
          'wit-1': {
            before: 'Siska perlu didengar dengan aman. Saksi juga murid yang harus dilindungi.',
            after: 'Ada murid kedua yang diancam. Penanganan harus mencakup Siska juga.',
          },
        },
        legal: 'Selain hak Budi, pikirkan kewajiban siapa yang dilanggar, dan kewajiban siapa yang sekarang harus dijalankan.',
        decision: 'Menurut aturan terbaru, kepala sekolah bertanggung jawab atas budaya sekolah yang aman. Rencana apa pun harus bisa dijalankan sekolah.',
      },
      'case-02': { relevance: 'luar' },
      'case-03': {
        relevance: 'pendukung',
        intro: 'Banyak muridku berjalan kaki ke sekolah. Trotoar yang aman adalah bagian dari perjalanan mereka belajar.',
        witness: {
          'wit-1': {
            after: 'Kesaksian ini mengingatkanku pada murid-murid yang berangkat sekolah sendiri.',
          },
        },
      },
      'case-04': {
        relevance: 'utama',
        intro: 'Sebagai guru, aku tahu sekolah sering kekurangan dana. Tapi kekurangan itu tidak boleh menghentikan anak dari sekolah.',
        evidence: {
          'ev-1': 'Kwitansi ini menyebut "wajib" untuk siswa tidak mampu. Aku ingin tahu siapa yang memutuskan dan apakah orang tua pernah diajak bicara.',
        },
        witness: {
          'wit-1': {
            after: 'Relawan mengisi kekosongan yang seharusnya diisi sekolah dan pemerintah.',
          },
        },
        decision: 'Apa pun pilihannya, sekolah harus memastikan anak yang sudah berhenti bisa kembali tanpa merasa malu.',
      },
      'case-05': { relevance: 'luar' },
    },
  },
};

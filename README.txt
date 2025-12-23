STANDAR OPERASIONAL PROSEDUR (SOP) PORTAL CBT V2.0 PLATINUM
BAGIAN 1: PANDUAN TEKNIS GURU (ADMINISTRATOR)
1. Persiapan Basis Data (Google Sheets)
Sistem ini bergantung pada Google Sheets sebagai database. Pastikan struktur Sheet memiliki kolom berikut:
Sheet "Siswa": Kolom (NISN, Nama, Sekolah).
Sheet "Mapel": Daftar nama mata pelajaran (contoh: Matematika-D, Informatika-E).
Sheet "Soal": Kolom (No, KodeMapel, Teks Soal, Opsi A, Opsi B, Opsi C, Opsi D, Kunci).
Sheet "Token": Untuk menyimpan token yang ter-generate otomatis saat siswa registrasi.
2. Cara Mengisi Soal Multimedia (Inovasi Platinum)
Sistem telah dilengkapi dengan Smart Media Engine. Guru tidak perlu mengubah kode, cukup isi di kolom Teks Soal:
Menampilkan Gambar: Masukkan link URL gambar di akhir kalimat soal.
Contoh: Perhatikan organ ini: https://link-gambar.com/jantung.jpg. Apa fungsinya?
Menampilkan Audio: Masukkan link URL file audio.
Contoh: Listen to the dialog: https://link-audio.com/percakapan1.mp3. What are they talking about?
Penting: Pastikan link gambar berakhiran .jpg/.png dan audio berakhiran .mp3.

BAGIAN 2: ALUR KERJA PESERTA (SISWA)
Langkah 1: Registrasi & Pengambilan Token
Siswa masuk ke portal dan klik REGISTRASI PESERTA.
Input NISN (10 digit). Jika valid, nama dan sekolah muncul otomatis.
Pilih Mata Pelajaran.
Klik AMBIL TOKEN. Token unik akan muncul (Contoh: CB7X99).
Klik SALIN & LANJUT LOGIN.
Langkah 2: Pengerjaan Ujian
Masukkan token di layar Login.
Klik MULAI UJIAN (Sistem akan masuk mode Fullscreen).
Navigasi:
Klik nomor soal di panel kiri untuk melompat.
Warna Biru = Terjawab, Kuning = Ragu-ragu, Putih = Belum.
Akomodasi: Jika teks kurang jelas, klik tombol A+ di pojok kanan atas soal.
Langkah 3: Penyelesaian
Setelah semua soal biru, klik SELESAI di nomor terakhir.
Konfirmasi pengiriman jawaban. Skor akan muncul otomatis di layar.

BAGIAN 3: TROUBLESHOOTING & MITIGASI TEKNIS
Kendala
Penyebab
Solusi Teknis
NISN Tidak Ditemukan
Data di Sheet Siswa belum diupdate.
Pastikan guru sudah memasukkan NISN siswa ke Sheet "Siswa".
Soal Tidak Muncul
Koneksi API Google Apps Script terputus.
Lakukan Refresh (F5). Jawaban yang sudah terisi tetap aman karena fitur Auto-Save.
Gambar/Audio Rusak
Link URL tidak valid atau kadaluwarsa.
Guru harus memastikan link bisa dibuka secara publik (tidak diprivat).
Ujian Terhenti Otomatis
Siswa pindah tab/membuka aplikasi lain.
Ini adalah fitur Anti-Cheat. Siswa harus lapor guru untuk di-reset (opsional) atau masuk kembali.
Token Tidak Valid
Siswa salah pilih Mapel saat login.
Pastikan Mapel yang dipilih saat Registrasi sama dengan saat Login.


BAGIAN 4: PEMELIHARAAN SISTEM (BACKEND)
Cara Update Kode
Jika ada perubahan fitur:
Buka Google Apps Script.
Ganti isi file Index.html dengan kode terbaru yang saya berikan.
Klik Deploy -> Manage Deployments -> Edit -> New Version.
Simpan dan bagikan URL yang baru (jika berubah).
Catatan Keamanan: Selalu ingatkan siswa untuk tidak membagikan Token mereka kepada orang lain, karena satu token hanya berlaku untuk satu sesi ujian mata pelajaran tersebut.

SPESIFIKASI MINIMAL SISTEM
Sistem ini berbasis web (Web-Based), sehingga tidak memerlukan instalasi aplikasi berat. Namun, untuk performa optimal, berikut syaratnya:
1. Perangkat Siswa (Client):
Smartphone: Android 7.0+ / iOS 12+ dengan RAM minimal 2GB.
Laptop/PC: Windows 7 / MacOS / ChromeOS dengan RAM minimal 2GB.
Browser (Wajib): Google Chrome atau Microsoft Edge versi terbaru (Sangat disarankan karena engine JavaScript-nya paling stabil untuk fitur Auto-Save).
Layar: Resolusi minimal 360p (Smartphone) atau 1024x768 (Laptop).
2. Infrastruktur Jaringan:
Bandwidth: Minimal 512 Kbps per siswa (Jika ada audio/gambar besar, disarankan 1 Mbps per siswa).
Stabilitas: Jaringan WiFi atau Seluler yang tidak sering Request Timeout (RTO).

TATA TERTIB TEKNIS PESERTA UJIAN (TATIB)
Tujuan: Meminimalisir kesalahan sistem dan mencegah indikasi kecurangan.
A. Pra-Ujian (Persiapan):
Peserta wajib memastikan Baterai Perangkat terisi minimal 80% atau membawa charger.
Peserta wajib menonaktifkan Notifikasi WhatsApp, Telegram, atau Media Sosial lainnya agar tidak mengganggu mode fullscreen.
Peserta dilarang menggunakan browser dalam mode "Incognito/Penyamaran" agar fitur Auto-Save berfungsi maksimal.
Peserta wajib melakukan Clear Cache browser sebelum ujian dimulai untuk menghindari data lama yang menumpuk.
B. Saat Pengerjaan:
Dilarang Keluar Tab/Aplikasi: Sistem akan mencatat setiap kali peserta keluar dari halaman ujian. Jika mencapai batas 5 kali (setelan default), sistem akan Mengunci/Mengakhiri ujian secara otomatis.
Mode Fullscreen: Saat ujian dimulai, browser akan masuk ke mode layar penuh. Dilarang menekan tombol Home atau Back kecuali jika sudah selesai.
Penggunaan Token: Token bersifat rahasia dan hanya dapat digunakan untuk satu perangkat. Jangan mencoba login di dua perangkat sekaligus dengan token yang sama karena akan memicu Error Session.
Kendala Teknis: Jika soal tidak muncul atau media (audio/gambar) tidak loading, segera tekan tombol Refresh (F5) satu kali. Jangan panik, jawaban Anda sudah tersimpan otomatis di memori lokal browser.
C. Pasca-Ujian:
Sebelum klik SELESAI, pastikan semua nomor pada navigasi sudah berwarna Biru (Terjawab).
Jika ada nomor berwarna Kuning, segera klik nomor tersebut dan hilangkan status "Ragu-Ragu".
Setelah muncul Skor Akhir, peserta dilarang menutup browser sebelum mengklik tombol KELUAR untuk memastikan data terkirim sempurna ke server guru.

TIPS TAMBAHAN UNTUK GURU (PROCTOR):
Cek Kuota Spreadsheet: Pastikan Google Drive tempat menyimpan database tidak penuh.
Cadangan Token: Selalu siapkan rekap token di meja pengawas untuk membantu siswa yang tidak sengaja ter-logout.
Sinkronisasi Waktu: Pastikan jam di HP/Laptop siswa sesuai dengan waktu Indonesia Barat (WIB) agar durasi timer berjalan akurat.

MATRIKS KONSEKUENSI & SOLUSI PELANGGARAN
Portal CBT Digital V2.0 Platinum
Jenis Pelanggaran
Konsekuensi Sistem/Akademik
Solusi & Tindakan Teknis
Keluar Tab/Membuka Aplikasi Lain (Cheat Detection)
Peringatan 1-4: Muncul notifikasi blokir layar.

Peringatan 5: Ujian otomatis terkunci (Force Close) dan nilai terkirim apa adanya.
Siswa: Harus melapor ke pengawas.

Guru: Melakukan reset status login siswa di spreadsheet (jika diizinkan) atau memberikan ujian susulan.
Menggunakan Mode Incognito (Penyamaran)
Fitur Auto-Save tidak aktif. Jika perangkat mati/restart, jawaban akan hilang total.
Siswa: Wajib logout dan login kembali menggunakan mode browser normal sebelum pengerjaan jauh.
Login Ganda (Satu Token di Dua Perangkat)
Sesi ujian pada perangkat pertama akan tertendang (Session Conflict) dan data jawaban bisa korup.
Guru: Mematikan salah satu koneksi perangkat dan melakukan clear session pada database agar siswa bisa login kembali di satu perangkat utama.
Tidak Melakukan Registrasi Sesuai SOP
Siswa tidak bisa login karena Token tidak terdaftar di database mata pelajaran tersebut.
Siswa: Kembali ke menu Registrasi dan mengikuti alur input NISN yang benar.
Menekan Tombol 'Selesai' Secara Prematur
Ujian berakhir seketika dan siswa tidak bisa masuk kembali untuk memperbaiki jawaban.
Siswa: Tidak ada solusi mandiri.

Guru: Guru harus masuk ke backend database untuk mengubah status "Selesai" menjadi "Aktif" kembali agar siswa bisa login.


PROSEDUR SOLUSI DARURAT (GURU/TEKNISI)
Jika terjadi kendala teknis atau pelanggaran yang menyebabkan siswa terhenti, berikut adalah langkah solusinya:
Reset Token/Status: Guru membuka Google Sheets (Database), cari nama siswa tersebut, lalu hapus atau ubah status "Sudah Ujian" menjadi "Belum" agar token bisa digunakan kembali.
Audit Pelanggaran: Guru dapat mengecek kolom "Log Aktivitas" di spreadsheet untuk melihat berapa kali siswa tersebut melakukan window switching (pindah tab) sebagai bukti otentik sebelum memberikan konsekuensi nilai.
Sinkronisasi Manual: Jika nilai tidak muncul karena masalah internet saat klik selesai, guru dapat melihat jawaban mentah (raw data) di Sheet "Jawaban" yang masuk secara background.
NARASI UNTUK SISWA:
"Anak-anak, sistem ini memiliki kecerdasan buatan yang memantau kejujuran kalian. Setiap tindakan keluar dari layar ujian akan tercatat. Jika kalian sengaja melanggar SOP, sistem akan mengunci jawaban kalian secara permanen. Kerjakan dengan jujur, karena sistem tidak hanya menilai jawaban, tapi juga perilaku kalian selama ujian."


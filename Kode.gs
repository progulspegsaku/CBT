/**
 * CBT PLATINUM v9.0 - Ultra Optimized Edition
 * Developed by: Catur Pamungkas, S.Pd (s.id/toer)
 * Perbaikan: Auto-Sync Mapel, Error Handling, & Detail Analysis
 */

function doGet(e) {
  var template = HtmlService.createTemplateFromFile('Index');
  // Menangkap parameter 'mapel' dari URL
  template.mapelUrl = e.parameter.mapel || ""; 
  
  return template.evaluate()
    .setTitle('CBT Platinum | Catur Pamungkas, S.Pd')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Tambahkan fungsi ini untuk fitur Reset Token (Menghapus registrasi lama jika siswa ingin daftar ulang)
function cekUserAktif(nisn, mapel) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Registrasi");
  if (!sheet) return false;
  const data = sheet.getDataRange().getValues();
  // Cek apakah NISN sudah ada untuk mapel yang sama
  return data.some(row => row[1].toString() === nisn.toString() && row[7] === mapel);
}

// FUNGSI AMBIL MAPEL DARI SHEET KHUSUS "Daftar_Mapel"
function getDaftarMapel() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Daftar_Mapel");
    
    // Jika sheet belum ada, buatkan otomatis agar tidak error
    if (!sheet) {
      ss.insertSheet("Daftar_Mapel");
      return ["Buat daftar mapel di sheet Daftar_Mapel"];
    }
    
    const data = sheet.getDataRange().getValues();
    if (data.length < 1) return ["Sheet masih kosong"];
    
    // Ambil semua data di kolom A, saring yang tidak kosong
    let list = data.map(row => row[0]).filter(m => m !== "" && m !== "Nama Mapel");
    
    return list.sort(); 
  } catch(e) {
    return ["Error: " + e.message];
  }
}

// 2. PENCARIAN DAPODIK LOKAL (NISN)
function cariSiswaByNISN(nisn) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Database_Siswa");
  if (!sheet) return null;
  
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0].toString() === nisn.toString()) {
      return {
        nama: data[i][1],
        sekolah: data[i][2],
        provinsi: data[i][3],
        kabupaten: data[i][4]
      };
    }
  }
  return null;
}

// 3. REGISTRASI & GENERATE TOKEN
function registerSiswa(d) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Registrasi") || ss.insertSheet("Registrasi");
  const token = "CBT-" + Math.random().toString(36).substring(2, 7).toUpperCase();
  const now = new Date();
  
  // Header: Waktu, NISN, Nama, Sekolah, Prov, Kab, Kelas, Mapel, Token, Absen
  sheet.appendRow([now, d.nisn, d.nama, d.sekolah, d.provinsi, d.kabupaten, d.kelas, d.mapel, token, d.absen]);
  return { token: token };
}

// 4. VALIDASI TOKEN SEBELUM UJIAN
function cekTokenValidasi(mapel, tokenInput) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Registrasi");
  if (!sheet) return { status: "INVALID" };
  
  const data = sheet.getDataRange().getValues();
  const now = new Date().getTime();
  const LIMIT = 15 * 60 * 1000; // 15 Menit

  for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][8] === tokenInput && data[i][7] === mapel) {
      let regTime = new Date(data[i][0]).getTime();
      if (now - regTime <= LIMIT) {
        return { 
          status: "VALID", 
          nama: data[i][2], 
          sekolah: data[i][3],
          nisn: data[i][1] 
        };
      }
    }
  }
  return { status: "INVALID" };
}

// 5. AMBIL SOAL (ACAK)
function getSoal(mapelID) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Soal");
  const data = sheet.getDataRange().getValues();
  data.shift(); 
  
  let soalFiltered = data.filter(r => r[1] == mapelID);
  // Acak urutan soal
  return soalFiltered.sort(() => Math.random() - 0.5);
}

// 6. SIMPAN HASIL LENGKAP (Support Analisis Butir Soal)
function simpanHasilFull(d) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Hasil") || ss.insertSheet("Hasil");
    
    // Simpan data: Waktu, NISN, Nama, Sekolah, Mapel, Skor, Detail Jawaban (JSON)
    sheet.appendRow([
      new Date(), 
      d.nisn, 
      d.nama, 
      d.sekolah, 
      d.mapel, 
      d.skor, 
      JSON.stringify(d.detail)
    ]);
    return true;
  } catch(e) {
    return false;
  }
}

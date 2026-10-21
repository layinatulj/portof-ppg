# Portofolio Mahasiswa PPG Calon Guru Informatika

Website statis multi-halaman menggunakan HTML, CSS, dan JavaScript murni.

## Struktur
- `index.html`: beranda
- `pages/profil.html`: foto bersama dan lima profil mahasiswa
- `pages/mengajar.html`: dokumentasi mengajar lima mahasiswa
- `pages/non-mengajar.html`: enam kartu kegiatan sekolah
- `pages/media-pembelajaran.html`: delapan media dengan iframe live demo
- `pages/karya-inovasi.html`: lima karya individu dan tiga inovasi kelompok
- `assets/css/style.css`: tampilan dan desain responsif
- `assets/js/script.js`: menu seluler, mode gelap, animasi, lightbox, filter, pencarian, dan demo iframe

## Cara mengganti konten
1. Buka file HTML terkait.
2. Cari teks placeholder seperti `Nama Mahasiswa 1`, deskripsi contoh, atau `https://example.github.io/nama-repository/`.
3. Ganti teks dan URL dengan informasi asli.
4. Untuk gambar, ganti nilai `src` pada tag `<img>` dengan URL gambar yang dapat diakses publik atau path aset lokal.

## Foto dari Google Drive
Tautan berbagi Google Drive biasa sering membuka halaman pratinjau, bukan file gambar langsung. Pastikan file dapat dilihat oleh siapa pun yang memiliki tautan dan gunakan URL gambar yang benar-benar dapat ditampilkan oleh browser. Untuk stabilitas terbaik, simpan gambar di `assets/images/` pada repository.

## Live demo dari GitHub Pages atau Vercel
Pada halaman Media Pembelajaran, ganti URL `https://example.github.io/nama-repository/` pada:
- atribut `data-url` dan `href` tombol demo,
- atribut `data-src` pada iframe.

Pada halaman Karya Inovasi, ganti URL pada `href` tombol Live Demo dan Buka Proyek.

Contoh URL GitHub Pages: `https://username.github.io/nama-repository/`
Contoh URL Vercel: `https://nama-proyek.vercel.app/`

Tidak semua situs mengizinkan penyematan iframe. Bila pratinjau tidak tampil, tombol Buka tab baru dapat digunakan.

## Menjalankan lokal
Cara paling sederhana adalah membuka `index.html` di browser. Disarankan memakai ekstensi Live Server di Visual Studio Code agar navigasi dan pengujian lebih konsisten.

## Deploy
- **GitHub Pages:** unggah seluruh folder ke repository, lalu aktifkan Pages dari Settings.
- **Vercel:** import repository GitHub sebagai proyek statis. Tidak diperlukan build command; root directory adalah folder proyek.

<template>
  <div class="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300 px-4 py-8 relative">
    <!-- Background Elements -->
    <div class="absolute top-0 left-0 w-full h-32 bg-primary/5 -skew-y-2"></div>
    <div class="absolute bottom-0 right-0 w-full h-24 bg-accent/5 skew-y-2"></div>
    
    <!-- Container -->
    <div class="container mx-auto max-w-4xl relative z-10">
      <!-- Header with Logo -->
      <div class="flex flex-col items-center mb-8">
        <img src="../../assets/finako.svg" alt="Finako Logo" class="h-16 mb-4" />
        <h1 class="text-3xl font-bold text-center">Syarat & Ketentuan</h1>
        <p class="text-base-content/70 mt-2 text-center">Terakhir diperbarui: 1 Agustus 2025</p>
      </div>
      
      <!-- Content Card -->
      <div class="card bg-base-100 shadow-lg mb-8 overflow-hidden">
        <div class="card-body p-6 md:p-8">
          <!-- Quick Navigation -->
          <div class="bg-base-200 p-4 rounded-lg mb-6">
            <h3 class="font-bold mb-2">Daftar Isi</h3>
            <ol class="list-decimal list-inside space-y-1 text-sm">
              <li><a href="#section-1" class="link" style="color: #20c997">Ketentuan Umum</a></li>
              <li><a href="#section-2" class="link" style="color: #20c997">Akun dan Pendaftaran</a></li>
              <li><a href="#section-3" class="link" style="color: #20c997">Layanan dan Fitur</a></li>
              <li><a href="#section-4" class="link" style="color: #20c997">Masa Uji Coba dan Berlangganan</a></li>
              <li><a href="#section-5" class="link" style="color: #20c997">Pembayaran dan Pengembalian Dana</a></li>
              <li><a href="#section-6" class="link" style="color: #20c997">Hak dan Batasan Penggunaan</a></li>
              <li><a href="#section-7" class="link" style="color: #20c997">Penutupan Akun</a></li>
              <li><a href="#section-8" class="link" style="color: #20c997">Perubahan Syarat & Ketentuan</a></li>
            </ol>
          </div>

          <!-- Main Content -->
          <section id="section-1" class="mb-8">
            <h2 class="text-xl font-bold mb-3">1. Ketentuan Umum</h2>
            <p class="mb-3">Selamat datang di Finako OS, sebuah platform pengelolaan bisnis untuk UMKM Indonesia. Dengan mengakses atau menggunakan layanan kami, Anda menyetujui untuk terikat oleh syarat dan ketentuan ini.</p>
            <p class="mb-3">Finako OS ("kami", "platform", atau "layanan") adalah layanan yang disediakan oleh PT Finako Teknologi Indonesia ("Perusahaan"), sebuah perusahaan yang terdaftar di Indonesia.</p>
            <p class="mb-3">Syarat & Ketentuan ini mengatur hubungan antara Anda (sebagai pengguna) dengan kami, serta penggunaan dan akses ke platform, aplikasi, dan layanan kami.</p>
          </section>

          <section id="section-2" class="mb-8">
            <h2 class="text-xl font-bold mb-3">2. Akun dan Pendaftaran</h2>
            <p class="mb-3">Untuk menggunakan layanan Finako OS, Anda perlu membuat akun dengan memberikan informasi yang akurat dan terkini. Anda bertanggung jawab untuk menjaga kerahasiaan kredensial akun Anda dan semua aktivitas yang terjadi di akun Anda.</p>
            
            <h3 class="font-semibold mt-4 mb-2">2.1 Persyaratan Pendaftaran</h3>
            <p class="mb-3">Anda harus berusia minimal 18 tahun atau memiliki kewenangan hukum untuk mengadakan kontrak. Anda harus memberikan informasi yang akurat dan lengkap saat mendaftar, termasuk nama lengkap, alamat email, dan informasi bisnis yang relevan.</p>

            <h3 class="font-semibold mt-4 mb-2">2.2 Verifikasi Akun</h3>
            <p class="mb-3">Kami berhak memverifikasi identitas Anda dan informasi bisnis Anda. Kami dapat meminta dokumentasi tambahan untuk memastikan akurasi informasi yang diberikan.</p>
            
            <h3 class="font-semibold mt-4 mb-2">2.3 Tanggung Jawab Akun</h3>
            <p class="mb-3">Anda bertanggung jawab penuh atas semua aktivitas yang terjadi melalui akun Anda. Jika Anda mengetahui adanya penggunaan yang tidak sah terhadap akun Anda, Anda harus segera memberitahukan kepada kami.</p>
          </section>

          <section id="section-3" class="mb-8">
            <h2 class="text-xl font-bold mb-3">3. Layanan dan Fitur</h2>
            <p class="mb-3">Finako OS menyediakan berbagai fitur untuk membantu UMKM dalam mengelola bisnis mereka, termasuk namun tidak terbatas pada manajemen inventaris, penjualan, keuangan, laporan, dan lainnya.</p>

            <h3 class="font-semibold mt-4 mb-2">3.1 Ketersediaan Layanan</h3>
            <p class="mb-3">Kami berusaha menjaga ketersediaan layanan secara terus-menerus, namun tidak menjamin bahwa layanan akan selalu tersedia tanpa gangguan atau kesalahan. Kami berhak untuk melakukan pemeliharaan atau peningkatan sistem yang mungkin menyebabkan gangguan sementara pada layanan.</p>

            <h3 class="font-semibold mt-4 mb-2">3.2 Perubahan pada Layanan</h3>
            <p class="mb-3">Kami berhak untuk memodifikasi, menangguhkan, atau menghentikan sebagian atau seluruh layanan kami kapan saja dengan atau tanpa pemberitahuan sebelumnya. Kami juga berhak menambah atau mengurangi fitur dari layanan kami.</p>
          </section>

          <section id="section-4" class="mb-8">
            <h2 class="text-xl font-bold mb-3">4. Masa Uji Coba dan Berlangganan</h2>
            <p class="mb-3">Finako OS menawarkan masa uji coba gratis dan berbagai paket berlangganan berbayar.</p>

            <h3 class="font-semibold mt-4 mb-2">4.1 Masa Uji Coba</h3>
            <p class="mb-3">Pengguna baru berhak mendapatkan masa uji coba gratis selama 30 hari. Selama masa uji coba, Anda dapat mengakses semua fitur yang tersedia. Pada akhir masa uji coba, akun Anda akan dikonversi ke model berlangganan berbayar atau dibatasi aksesnya jika Anda tidak berlangganan.</p>

            <h3 class="font-semibold mt-4 mb-2">4.2 Paket Berlangganan</h3>
            <p class="mb-3">Kami menawarkan berbagai paket berlangganan dengan fitur dan harga yang berbeda. Detail tentang setiap paket berlangganan dan fiturnya dapat dilihat di halaman Paket kami.</p>

            <h3 class="font-semibold mt-4 mb-2">4.3 Perpanjangan dan Pembatalan</h3>
            <p class="mb-3">Berlangganan akan diperpanjang secara otomatis kecuali Anda memilih untuk membatalkannya sebelum tanggal perpanjangan. Anda dapat membatalkan langganan Anda kapan saja melalui pengaturan akun Anda.</p>
          </section>

          <section id="section-5" class="mb-8">
            <h2 class="text-xl font-bold mb-3">5. Pembayaran dan Pengembalian Dana</h2>
            <p class="mb-3">Dengan berlangganan layanan berbayar kami, Anda setuju untuk membayar semua biaya sesuai dengan paket yang Anda pilih.</p>

            <h3 class="font-semibold mt-4 mb-2">5.1 Metode Pembayaran</h3>
            <p class="mb-3">Kami menerima berbagai metode pembayaran termasuk transfer bank, kartu kredit, dan metode pembayaran online lainnya yang tersedia di Indonesia. Anda bertanggung jawab untuk memberikan informasi pembayaran yang akurat dan menjaga agar informasi tersebut tetap terkini.</p>

            <h3 class="font-semibold mt-4 mb-2">5.2 Pengembalian Dana</h3>
            <p class="mb-3">Kami menawarkan kebijakan pengembalian dana dalam 7 hari untuk pelanggan baru. Jika Anda tidak puas dengan layanan kami, Anda dapat meminta pengembalian dana dalam 7 hari pertama berlangganan. Setelah periode ini, pengembalian dana umumnya tidak tersedia kecuali diwajibkan oleh hukum.</p>
          </section>

          <section id="section-6" class="mb-8">
            <h2 class="text-xl font-bold mb-3">6. Hak dan Batasan Penggunaan</h2>
            <p class="mb-3">Anda diizinkan menggunakan layanan kami sesuai dengan Syarat & Ketentuan ini.</p>

            <h3 class="font-semibold mt-4 mb-2">6.1 Hak Kekayaan Intelektual</h3>
            <p class="mb-3">Semua hak kekayaan intelektual terkait dengan layanan kami, termasuk tetapi tidak terbatas pada perangkat lunak, desain, logo, teks, grafik, dan konten lainnya, adalah milik PT Finako Teknologi Indonesia atau pemberi lisensinya. Tidak ada hak kekayaan intelektual yang dialihkan kepada Anda.</p>

            <h3 class="font-semibold mt-4 mb-2">6.2 Batasan Penggunaan</h3>
            <p class="mb-3">Anda tidak diperbolehkan untuk:</p>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Menggunakan layanan kami untuk tujuan ilegal atau melanggar hak pihak ketiga</li>
              <li>Merekayasa balik, mendekompilasi, atau mencoba untuk mendapatkan kode sumber dari layanan kami</li>
              <li>Menyewakan, menjual kembali, atau mendistribusikan layanan kami tanpa izin tertulis dari kami</li>
              <li>Mengunggah konten yang melanggar hukum, berbahaya, atau melanggar hak privasi</li>
              <li>Melakukan tindakan yang dapat membahayakan keamanan atau integritas layanan kami</li>
            </ul>
          </section>

          <section id="section-7" class="mb-8">
            <h2 class="text-xl font-bold mb-3">7. Penutupan Akun</h2>
            <p class="mb-3">Anda dapat menutup akun Anda kapan saja melalui pengaturan akun atau dengan menghubungi tim dukungan kami.</p>

            <h3 class="font-semibold mt-4 mb-2">7.1 Penutupan oleh Pengguna</h3>
            <p class="mb-3">Jika Anda menutup akun Anda, kami akan menyimpan data Anda selama periode waktu tertentu sesuai dengan kebijakan retensi data kami atau sebagaimana diwajibkan oleh hukum. Setelah periode ini, data Anda akan dihapus secara permanen.</p>

            <h3 class="font-semibold mt-4 mb-2">7.2 Penutupan oleh Finako OS</h3>
            <p class="mb-3">Kami berhak untuk menangguhkan atau menutup akun Anda jika Anda melanggar Syarat & Ketentuan ini, atau jika kami percaya bahwa akun Anda digunakan untuk aktivitas yang melanggar hukum atau merugikan.</p>
          </section>

          <section id="section-8" class="mb-8">
            <h2 class="text-xl font-bold mb-3">8. Perubahan Syarat & Ketentuan</h2>
            <p class="mb-3">Kami berhak untuk mengubah Syarat & Ketentuan ini kapan saja. Perubahan akan berlaku segera setelah dipublikasikan di situs kami. Kami akan memberitahu Anda tentang perubahan signifikan melalui email atau pemberitahuan di platform.</p>
            <p>Dengan terus menggunakan layanan kami setelah perubahan tersebut, Anda menyetujui Syarat & Ketentuan yang direvisi.</p>
          </section>
          
          <!-- Contact Information -->
          <section class="mt-12 p-6 bg-base-200 rounded-lg">
            <h2 class="font-bold text-xl mb-4">Kontak Kami</h2>
            <p class="mb-3">Jika Anda memiliki pertanyaan tentang Syarat & Ketentuan ini, silakan hubungi kami melalui:</p>
            <ul class="space-y-2">
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>Email: <a href="mailto:legal@finako.app" class="link" style="color: #20c997">legal@finako.app</a></span>
              </li>
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                <span>Alamat: Jl. Teknologi Maju No. 88, Jakarta 12940, Indonesia</span>
              </li>
              <li class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>Telepon: +62 21 5678 9012</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="flex flex-col md:flex-row justify-center gap-4 mb-8">
        <router-link to="/privacy-policy" class="btn btn-outline" style="color: #20c997; border-color: #20c997;">
          Lihat Kebijakan Privasi
        </router-link>
        <router-link to="/register" class="btn" style="background-color: #20c997; color: white; border-color: #20c997;">
          Kembali ke Pendaftaran
        </router-link>
      </div>
      
      <!-- Footer -->
      <div class="text-center text-base-content/60 text-sm pb-8">
        &copy; 2025 Finako OS. Semua hak dilindungi. <br class="md:hidden" />
        <span class="hidden md:inline">|</span> PT Finako Teknologi Indonesia
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional logic needed for this view
</script>

<style scoped>
/* Smooth scroll behavior for section navigation */
html {
  scroll-behavior: smooth;
}

/* Add a slight highlight to section being viewed */
section:target {
  animation: highlight 2s ease;
}

@keyframes highlight {
  0% { background-color: rgba(32, 201, 151, 0.1); }
  100% { background-color: transparent; }
}
</style>

// script.js
// Variabel global untuk menyimpan nama
let userName = '';

// Fungsi untuk menampilkan popup
function showPopup() {
    const nameModal = document.getElementById('nameModal');
    nameModal.classList.remove('hidden');
    
    // Fokus ke input
    document.getElementById('nameInput').focus();
    
    // Reset input
    document.getElementById('nameInput').value = '';
}

// Fungsi untuk menyembunyikan popup
function hidePopup() {
    const nameModal = document.getElementById('nameModal');
    nameModal.classList.add('hidden');
}

// Fungsi untuk menampilkan halaman utama
function showMainContent(name) {
    const mainContent = document.getElementById('mainContent');
    const displayName = document.getElementById('displayName');
    const mainHeader = document.getElementById('mainHeader');
    const footer = document.querySelector('footer');
    
    // Set nama
    displayName.textContent = name;
    
    // Tampilkan halaman, header, dan footer
    mainContent.classList.remove('hidden');
    mainHeader.classList.remove('hidden');
    if (footer) {
        footer.classList.remove('hidden');
    }
}

// Fungsi untuk memproses input nama
function processNameInput() {
    const nameInput = document.getElementById('nameInput');
    const inputName = nameInput.value.trim();
    
    if (inputName) {
        // Simpan nama di variabel (tidak di localStorage)
        userName = inputName;
        
        // Sembunyikan popup
        hidePopup();
        
        // Tampilkan halaman utama
        showMainContent(userName);
        
        // Tunggu sebentar untuk memastikan halaman sudah di-render, kemudian tampilkan halaman beranda
        setTimeout(function() {
            showPage('beranda');
        }, 100);
    } else {
        // Jika input kosong, beri peringatan
        alert('Silakan masukkan nama Anda terlebih dahulu!');
        nameInput.focus();
    }
}

// Event listener saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Selalu tampilkan popup saat halaman dimuat
    showPopup();
    
    // Event listener untuk tombol submit
    document.getElementById('submitName').addEventListener('click', processNameInput);
    
    // Event listener untuk tombol Enter di input
    document.getElementById('nameInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            processNameInput();
        }
    });
    
    // Event listener untuk klik di luar modal (opsional)
    document.getElementById('nameModal').addEventListener('click', function(e) {
        if (e.target === this) {
            // Fokus kembali ke input jika mengklik di luar modal
            document.getElementById('nameInput').focus();
        }
    });
    
    // Event listener untuk beforeunload (saat halaman akan direfresh)
    window.addEventListener('beforeunload', function() {
        // Hapus variabel userName saat halaman akan direfresh
        userName = '';
    });
    
    // Elemen navigasi dan halaman
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    // Fungsi untuk mengganti halaman
    function showPage(pageId) {
        // Sembunyikan semua halaman
        pages.forEach(page => {
            page.classList.add('hidden');
            page.classList.remove('active');
        });
        
        // Tampilkan halaman yang dipilih
        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.classList.remove('hidden');
            activePage.classList.add('active');
        }
        
        // Update navigasi aktif
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });
        
        // Scroll ke atas halaman
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Event listener untuk navigasi
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
            
            // Update URL hash tanpa scroll
            history.pushState(null, null, `#${pageId}`);
        });
    });
    
    // Tangani perubahan hash URL
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash && ['beranda', 'profil', 'portfolio', 'kontak'].includes(hash)) {
            showPage(hash);
        }
    });
    
    // Tangani tombol back/forward browser
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1);
        if (hash && ['beranda', 'profil', 'portfolio', 'kontak'].includes(hash)) {
            showPage(hash);
        }
    });
    
    // Tampilkan halaman berdasarkan hash URL saat pertama kali dimuat
    const initialHash = window.location.hash.substring(1);
    if (initialHash && ['beranda', 'profil', 'portfolio', 'kontak'].includes(initialHash)) {
        showPage(initialHash);
    }
    
    // Form kontak handler
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ambil data dari form
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validasi sederhana
            if (!name || !email || !subject || !message) {
                showFormMessage('Harap isi semua field!', 'error');
                return;
            }
            
            // Tampilkan pesan sukses (dalam aplikasi nyata, ini akan mengirim ke server)
            showFormMessage(`Terima kasih ${name}! Pesan Anda telah berhasil dikirim. Saya akan membalas pesan Anda ke ${email} segera.`, 'success');
            
            // Reset form
            contactForm.reset();
            
            // Simulasi pengiriman data (untuk demo)
            console.log('Data form:', { name, email, subject, message });
        });
    }
    
    // Fungsi untuk menampilkan pesan form
    function showFormMessage(text, type) {
        if (!formMessage) return;
        
        formMessage.textContent = text;
        formMessage.className = 'mt-4 p-4 rounded-lg';
        
        if (type === 'success') {
            formMessage.classList.add('bg-green-100', 'text-green-800');
        } else if (type === 'error') {
            formMessage.classList.add('bg-red-100', 'text-red-800');
        }
        
        formMessage.classList.remove('hidden');
        
        // Sembunyikan pesan setelah 10 detik
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 10000);
    }
    
    // Efek scroll untuk navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll ke bawah
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scroll ke atas
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
});
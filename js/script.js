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
    
    // Set nama
    displayName.textContent = name;
    
    // Tampilkan halaman
    mainContent.classList.remove('hidden');
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
});

// Event listener untuk beforeunload (saat halaman akan direfresh)
window.addEventListener('beforeunload', function() {
    // Hapus variabel userName saat halaman akan direfresh
    userName = '';
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
            
            // Smooth scroll
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
        // Light mode
        document.documentElement.style.setProperty('--primary', '#F8F9FA');
        document.documentElement.style.setProperty('--secondary', '#E9ECEF');
        document.documentElement.style.setProperty('--accent', '#339AF0');
        document.body.classList.remove('bg-primary');
        document.body.classList.add('bg-gray-50', 'text-gray-900');
        themeIcon.className = 'fas fa-sun text-yellow-500';
        
        // Update all cards
        document.querySelectorAll('.experience-card, .skill-card, .project-card, .contact-card').forEach(card => {
            card.classList.remove('bg-secondary', 'border-gray-800');
            card.classList.add('bg-white', 'border-gray-200', 'shadow-md');
        });
        
        // Update text colors
        document.querySelectorAll('.text-text-secondary, .text-text-light').forEach(text => {
            text.classList.remove('text-text-secondary', 'text-text-light');
            text.classList.add('text-gray-600');
        });
    } else {
        // Dark mode
        document.documentElement.style.setProperty('--primary', '#0A0A0A');
        document.documentElement.style.setProperty('--secondary', '#1A1A1A');
        document.documentElement.style.setProperty('--accent', '#4DABF7');
        document.body.classList.add('bg-primary', 'text-text-primary');
        document.body.classList.remove('bg-gray-50', 'text-gray-900');
        themeIcon.className = 'fas fa-moon text-accent';
        
        // Restore dark mode classes
        document.querySelectorAll('.experience-card, .skill-card, .project-card, .contact-card').forEach(card => {
            card.classList.add('bg-secondary', 'border-gray-800');
            card.classList.remove('bg-white', 'border-gray-200', 'shadow-md');
        });
        
        // Restore text colors
        document.querySelectorAll('[class*="text-gray"]').forEach(text => {
            if (text.classList.contains('text-gray-600')) {
                text.classList.remove('text-gray-600');
                text.classList.add('text-text-light');
            }
        });
    }
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('shadow-lg', 'bg-primary');
        header.classList.remove('bg-primary/95');
    } else {
        header.classList.remove('shadow-lg');
        header.classList.add('bg-primary/95');
    }
});

// Project Detail Modal
const projectModal = document.getElementById('projectModal');

// Project details content
const projectDetails = {
    'buku-tamu': `
        <h3 class="text-2xl font-bold mb-4 text-accent">Website Buku Tamu Digital</h3>
        <div class="mb-6">
            <p class="text-text-light mb-4">
                <strong>Deskripsi:</strong> Sistem buku tamu online yang memungkinkan pengunjung website untuk meninggalkan pesan, nama, dan tanggal kunjungan. Dilengkapi dengan panel admin untuk melihat dan mengelola pesan yang masuk.
            </p>
            
            <p class="font-bold mb-2">Fitur Utama:</p>
            <ul class="list-disc pl-5 mb-4 text-text-light space-y-1">
                <li>Form input untuk pengunjung mengisi data</li>
                <li>Penyimpanan data ke database MySQL</li>
                <li>Halaman admin dengan autentikasi sederhana</li>
                <li>Fitur hapus dan lihat pesan untuk admin</li>
                <li>Desain responsif dan user-friendly</li>
            </ul>
            
            <p class="font-bold mb-2">Teknologi yang Digunakan:</p>
            <div class="flex flex-wrap gap-2 mb-6">
                <span class="tech-tag">PHP</span>
                <span class="tech-tag">MySQL</span>
                <span class="tech-tag">HTML</span>
                <span class="tech-tag">CSS</span>
                <span class="tech-tag">JavaScript</span>
            </div>
            
            <p class="font-bold mb-2">Status Proyek:</p>
            <p class="text-text-light mb-6">Selesai dan berfungsi dengan baik</p>
        </div>
        
        <div class="flex gap-3">
            <a href="https://github.com/ikhsanfauzan/buku_tamu" 
               target="_blank" 
               class="btn-primary">
                <i class="fab fa-github mr-2"></i>Lihat Kode di GitHub
            </a>
            <button onclick="closeProjectDetail()" class="btn-outline">
                Tutup
            </button>
        </div>
    `,
    
    'desain-grafis': `
        <h3 class="text-2xl font-bold mb-4 text-accent">Portfolio Desain Grafis OSIS</h3>
        <div class="mb-6">
            <p class="text-text-light mb-4">
                <strong>Deskripsi:</strong> Koleksi karya desain grafis yang dibuat selama menjabat sebagai Ketua Divisi PDD OSIS SMK BPP Bandung. Meliputi berbagai materi publikasi untuk kegiatan sekolah.
            </p>
            
            <p class="font-bold mb-2">Jenis Desain:</p>
            <ul class="list-disc pl-5 mb-4 text-text-light space-y-1">
                <li>Poster kegiatan sekolah (MOS, Peringatan Hari Besar, dll)</li>
                <li>Spanduk untuk acara sekolah</li>
                <li>Konten media sosial OSIS</li>
                <li>Sertifikat dan piagam penghargaan</li>
                <li>Brosur informasi kegiatan</li>
            </ul>
            
            <p class="font-bold mb-2">Tools yang Digunakan:</p>
            <div class="flex flex-wrap gap-2 mb-6">
                <span class="tech-tag">Canva</span>
                <span class="tech-tag">Photoshop</span>
                <span class="tech-tag">CorelDraw</span>
                <span class="tech-tag">Figma</span>
            </div>
            
            <p class="font-bold mb-4">Contoh Karya:</p>
            <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-primary p-4 rounded-lg text-center">
                    <i class="fas fa-image text-3xl text-accent mb-2"></i>
                    <p class="text-sm">Poster MOS 2023</p>
                </div>
                <div class="bg-primary p-4 rounded-lg text-center">
                    <i class="fas fa-image text-3xl text-accent mb-2"></i>
                    <p class="text-sm">Spanduk Seminar</p>
                </div>
                <div class="bg-primary p-4 rounded-lg text-center">
                    <i class="fas fa-image text-3xl text-accent mb-2"></i>
                    <p class="text-sm">Feed Instagram OSIS</p>
                </div>
                <div class="bg-primary p-4 rounded-lg text-center">
                    <i class="fas fa-image text-3xl text-accent mb-2"></i>
                    <p class="text-sm">Sertifikat Lomba</p>
                </div>
            </div>
        </div>
        
        <div class="flex gap-3">
            <a href="https://drive.google.com" 
               target="_blank" 
               class="btn-primary">
                <i class="fas fa-external-link-alt mr-2"></i>Lihat Portfolio Lengkap
            </a>
            <button onclick="closeProjectDetail()" class="btn-outline">
                Tutup
            </button>
        </div>
    `
};

// Show project detail modal
function showProjectDetail(projectId) {
    const modalContent = projectModal.querySelector('.p-6');
    modalContent.innerHTML = projectDetails[projectId] || '<p>Detail proyek tidak ditemukan.</p>';
    projectModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Close project detail modal
function closeProjectDetail() {
    projectModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeProjectDetail();
    }
});

// Add scroll animation to elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observe all cards for animation
document.querySelectorAll('.experience-card, .skill-card, .project-card').forEach(card => {
    observer.observe(card);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('opacity-0', 'transition-opacity', 'duration-700');
        setTimeout(() => {
            section.classList.remove('opacity-0');
        }, 100);
    });
    
    // Check if links need to be updated
    document.querySelectorAll('a[href="#"]').forEach(link => {
        if (link.getAttribute('onclick') === null) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Silakan ganti link dengan URL yang sesuai untuk proyek Anda.');
            });
        }
    });
    
    console.log('Portfolio Ikhsan Fauzan loaded successfully!');
});
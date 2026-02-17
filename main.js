// =============================================
// 1. MOBILE MENU
// =============================================
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('is-active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('is-active');
        navLinks.classList.remove('active');
    });
});

// =============================================
// 2. NAVBAR ACTIVE STATE ON SCROLL
// =============================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link[data-section]');

function updateActiveNav() {
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === currentSection) {
            link.classList.add('active');
        }
    });

    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', updateActiveNav);

// =============================================
// 3. SCROLL REVEAL
// =============================================
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
            entry.target.querySelectorAll('.count-up').forEach(startCount);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

// =============================================
// 4. COUNT-UP ANIMATION
// =============================================
function startCount(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1200;
    const start = performance.now();
    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
    }
    requestAnimationFrame(update);
}

// =============================================
// 5. TYPEWRITER EFFECT
// =============================================
const phrases = {
    id: [
        "Mengubah logika menjadi kode.",
        "Dan data menjadi cerita.",
        "Belajar tanpa henti.",
    ],
    en: [
        "Turning logic into code.",
        "And data into stories.",
        "Learning without limits.",
    ]
};

let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimeout;

function type() {
    const lang = currentLang || 'id';
    const currentPhrases = phrases[lang];
    const current = currentPhrases[typeIndex % currentPhrases.length];
    const display = isDeleting
        ? current.substring(0, charIndex--)
        : current.substring(0, charIndex++);

    document.getElementById('typewriter').textContent = display;

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex > current.length) {
        delay = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typeIndex++;
        delay = 300;
    }

    typeTimeout = setTimeout(type, delay);
}

setTimeout(type, 1200);

// =============================================
// 6. SKILL BAR ANIMATION
// =============================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-fill').forEach(bar => {
                bar.classList.add('animate');
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));

// =============================================
// 7. I18N LANGUAGE TOGGLE
// =============================================
const translations = {
    id: {
        nav_about: "Tentang", nav_skills: "Skills", nav_projects: "Project",
        nav_exp: "Pengalaman", nav_contact: "Kontak",
        hero_badge: "Mahasiswa Teknik Informatika",
        hero_greeting: "Halo, Saya",
        hero_desc: "Fokus pada <strong>Data Analysis & Science</strong>, <strong>Web Development</strong>, dan <strong>UI Design</strong>. Saat ini sedang mendalami Data Science dengan Python dan SQL, serta mengasah kemampuan Web Development menggunakan React dan Tailwind CSS.",
        btn_project: "Lihat Project", btn_contact: "Hubungi Saya",
        section_about: "Tentang Saya",
        about_p1: "Hai! Saya adalah mahasiswa Teknik Informatika semester 6 di Institut Teknologi Sumatera (ITERA). Saya memiliki ketertarikan mendalam pada dunia pengembangan perangkat lunak dan analisis data.",
        about_p2: "Sehari-hari saya sering berkutat dengan logika C++ untuk memecahkan masalah algoritma, namun belakangan ini saya sedang antusias mengeksplorasi dunia Web Development menggunakan React dan Tailwind CSS.",
        stat_semester: "Semester", stat_project: "Projects",
        section_skills: "Tech Stack",
        skill_cat_prog: '<i class="fas fa-code"></i> Programming & Logic',
        skill_cat_tools: '<i class="fas fa-tools"></i> Tools & Environment',
        skill_cat_data: '<i class="fas fa-chart-line"></i> Data Analysis & Science',
        skill_cat_web: '<i class="fas fa-laptop-code"></i> Web Development',
        section_projects: "Featured Projects",
        proj1_desc: "Web aplikasi interaktif untuk kuis online yang memanfaatkan Smart TV. Dibangun dengan arsitektur modern.",
        proj2_desc: "Implementasi struktur data kompleks menggunakan C++ murni dengan manajemen memori yang efisien.",
        proj3_desc: "Tugas besar pemrograman web. Frontend development untuk platform kesehatan dan kebugaran.",
        proj4_desc: "Dashboard visualisasi data interaktif. Analisis tren penjualan dan prediksi berbasis machine learning.",
        section_exp: "Pengalaman",
        date_exp1: "Agustus 2024 - Desember 2025", date_exp2: "Agustus 2024 - Mei 2025", date_exp3: "Agustus - Desember 2024",
        exp1_role: "Asisten Praktikum Dasar Teknologi Digital",
        exp2_role: "Asisten Praktikum Pengantar Komputer",
        exp3_role: "Asisten Tutorial Matematika Dasar",
        exp_desc_teach: "Mengajar dan membimbing 70+ mahasiswa dalam praktikum dasar komputer (Python/C++).",
        exp_desc_eval: "Melakukan evaluasi tugas mingguan dan memberikan feedback teknis yang konstruktif.",
        exp_desc_coord: "Berkoordinasi dengan dosen pengampu untuk penyiapan modul dan materi ajar.",
        exp3_desc1: "Memfasilitasi sesi tutorial tambahan untuk mahasiswa tahun pertama.",
        exp3_desc2: "Membuat dan membahas soal-soal latihan kalkulus dan aljabar.",
        exp3_desc3: "Meningkatkan pemahaman mahasiswa yang kesulitan dengan materi kuliah.",
        contact_title: "Mari Terhubung!",
        contact_desc: "Sedang mencari partner kolaborasi atau ingin berdiskusi soal teknologi? Sapa saya di:",
        btn_download: "Download CV",
        scroll_hint: "scroll down"
    },
    en: {
        nav_about: "About", nav_skills: "Skills", nav_projects: "Projects",
        nav_exp: "Experience", nav_contact: "Contact",
        hero_badge: "Informatics Engineering Student",
        hero_greeting: "Hello, I'm",
        hero_desc: "Focusing on <strong>Data Analysis & Science</strong>, <strong>Web Development</strong>, and <strong>UI Design</strong>. Currently diving deep into Data Science with Python and SQL, while sharpening Web Development skills using React and Tailwind CSS.",
        btn_project: "View Projects", btn_contact: "Contact Me",
        section_about: "About Me",
        about_p1: "Hi! I am a 6th-semester Informatics Engineering student at the Sumatra Institute of Technology (ITERA). I have a deep interest in software development and data analysis.",
        about_p2: "I spend my days solving algorithmic problems with C++, but recently I've been enthusiastically exploring Web Development using React and Tailwind CSS.",
        stat_semester: "Semester", stat_project: "Projects",
        section_skills: "Tech Stack",
        skill_cat_prog: '<i class="fas fa-code"></i> Programming & Logic',
        skill_cat_tools: '<i class="fas fa-tools"></i> Tools & Environment',
        skill_cat_data: '<i class="fas fa-chart-line"></i> Data Analysis & Science',
        skill_cat_web: '<i class="fas fa-laptop-code"></i> Web Development',
        section_projects: "Featured Projects",
        proj1_desc: "Interactive web application for online quizzes utilizing Smart TV. Built with modern architecture.",
        proj2_desc: "Implementation of complex data structures using pure C++ with efficient memory management.",
        proj3_desc: "Major web programming assignment. Frontend development for a health and fitness platform.",
        proj4_desc: "Interactive data visualization dashboard. Sales trend analysis and machine learning-based predictions.",
        section_exp: "Experience",
        date_exp1: "August 2024 - December 2025", date_exp2: "August 2024 - May 2025", date_exp3: "August - December 2024",
        exp1_role: "Practicum Assistant - Digital Technology Basics",
        exp2_role: "Practicum Assistant - Introduction to Computers",
        exp3_role: "Tutorial Assistant - Basic Mathematics",
        exp_desc_teach: "Teaching and guiding 70+ students in basic computer practicum (Python/C++).",
        exp_desc_eval: "Conducting weekly assignment evaluations and providing constructive technical feedback.",
        exp_desc_coord: "Coordinating with lecturers to prepare modules and teaching materials.",
        exp3_desc1: "Facilitating additional tutorial sessions for first-year students.",
        exp3_desc2: "Creating and discussing calculus and algebra practice problems.",
        exp3_desc3: "Improving students' understanding of difficult course materials.",
        contact_title: "Let's Connect!",
        contact_desc: "Looking for a collaboration partner or want to discuss technology? Say hi at:",
        btn_download: "Download CV",
        scroll_hint: "scroll down"
    }
};

const langToggle = document.getElementById('lang-toggle');
const langText = document.getElementById('lang-text');
const flagIcon = document.getElementById('flag-icon');

let currentLang = localStorage.getItem('selectedLang') || 'id';
updateLanguage(currentLang);

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    updateLanguage(currentLang);
    clearTimeout(typeTimeout);
    typeIndex = 0; charIndex = 0; isDeleting = false;
    document.getElementById('typewriter').textContent = '';
    setTimeout(type, 400);
});

function updateLanguage(lang) {
    localStorage.setItem('selectedLang', lang);
    langText.textContent = lang === 'id' ? 'ID' : 'EN';
    flagIcon.src = lang === 'id' ? 'https://flagcdn.com/w20/id.png' : 'https://flagcdn.com/w20/us.png';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.innerHTML = translations[lang][key];
    });
}

// =============================================
// 8. PROJECT MODAL
// =============================================
const projectData = {
    1: {
        title: "Sistem Kuis Online (60KUIZ)",
        imgClass: "p1",
        imgSrc: "./file/project-60kuiz.png",
        descId: "Web aplikasi interaktif untuk kuis online berbasis Smart TV. Aplikasi ini memungkinkan host membuat sesi kuis secara real-time, sementara peserta bergabung dan menjawab menggunakan perangkat masing-masing. Dibangun dengan arsitektur modern menggunakan Next.js dan di-deploy di Vercel untuk performa optimal.",
        descEn: "An interactive web application for Smart TV-based online quizzes. Allows hosts to create real-time quiz sessions while participants join and answer from their own devices. Built with modern architecture using Next.js and deployed on Vercel for optimal performance.",
        tags: ["Next.js", "Tailwind", "Vercel"],
        links: [
            { label: "Code", icon: "fab fa-github", href: "#", type: "code" },
            { label: "Demo", icon: "fas fa-external-link-alt", href: "#", type: "demo" }
        ]
    },
    2: {
        title: "Double Linked List Manager",
        imgClass: "p2",
        imgSrc: "./file/project-dll.png",
        descId: "Implementasi struktur data Double Linked List menggunakan C++ murni, tanpa library eksternal. Program ini mendukung operasi insert, delete, search, dan traversal dengan manajemen memori yang efisien menggunakan pointer. Cocok sebagai referensi belajar struktur data dan algoritma.",
        descEn: "An implementation of Double Linked List data structure using pure C++, without external libraries. Supports insert, delete, search, and traversal operations with efficient memory management using pointers. Useful as a reference for studying data structures and algorithms.",
        tags: ["C++", "Algorithm", "CLI"],
        links: [
            { label: "Code", icon: "fab fa-github", href: "#", type: "code" }
        ]
    },
    3: {
        title: "Hexafit Website",
        imgClass: "p3",
        imgSrc: "./file/project-hexafit.png",
        descId: "Tugas besar mata kuliah Pemrograman Web. Frontend development untuk platform kesehatan dan kebugaran 'Hexafit'. Menampilkan fitur tracking aktivitas, artikel kesehatan, dan kalkulator BMI dengan integrasi API eksternal. Fokus pada UI yang bersih dan pengalaman pengguna yang baik.",
        descEn: "Major project for the Web Programming course. Frontend development for the 'Hexafit' health and fitness platform. Features activity tracking, health articles, and a BMI calculator with external API integration. Focused on clean UI and good user experience.",
        tags: ["HTML/CSS", "JS", "API"],
        links: [
            { label: "Code", icon: "fab fa-github", href: "#", type: "code" },
            { label: "Demo", icon: "fas fa-external-link-alt", href: "#", type: "demo" }
        ]
    },
    4: {
        title: "Data Analysis Dashboard",
        imgClass: "p4",
        imgSrc: "./file/project-dashboard.png",
        descId: "Dashboard visualisasi data interaktif yang dibangun menggunakan Python, Pandas, dan Tableau. Menampilkan analisis tren penjualan, segmentasi pelanggan, dan prediksi berbasis machine learning. Data diproses dan divisualisasikan secara real-time untuk mendukung pengambilan keputusan bisnis.",
        descEn: "An interactive data visualization dashboard built with Python, Pandas, and Tableau. Displays sales trend analysis, customer segmentation, and machine learning-based predictions. Data is processed and visualized in real-time to support business decision-making.",
        tags: ["Python", "Pandas", "Tableau"],
        links: [
            { label: "Code", icon: "fab fa-github", href: "#", type: "code" },
            { label: "Demo", icon: "fas fa-external-link-alt", href: "#", type: "demo" }
        ]
    }
};

// =============================================
// CAROUSEL DOT SYNC
// =============================================
const track = document.querySelector('.projects-track');
const dots = document.querySelectorAll('.carousel-dot');

if (track && dots.length) {
    track.addEventListener('scroll', () => {
        const cardWidth = track.querySelector('.project-card').offsetWidth + 24;
        const idx = Math.round(track.scrollLeft / cardWidth);
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }, { passive: true });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const idx = parseInt(dot.getAttribute('data-idx'));
            const cardWidth = track.querySelector('.project-card').offsetWidth + 24;
            track.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
        });
    });
}

const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.project-card[data-project]').forEach(card => {
    card.addEventListener('click', () => {
        const id = card.getAttribute('data-project');
        const data = projectData[id];
        const lang = currentLang || 'id';

        document.getElementById('modalTitle').textContent = data.title;

        // Modal image: pakai <img> jika ada, fallback ke placeholder
        const imgWrap = document.getElementById('modalImgWrap');
        if (data.imgSrc) {
            imgWrap.innerHTML = `<img src="${data.imgSrc}" alt="${data.title}" class="modal-img" id="modalImgTag">`;
            const modalImg = imgWrap.querySelector('.modal-img');
            const setModalBg = () => {
                imgWrap.style.setProperty('--modal-thumb-bg', `url('${data.imgSrc}')`);
            };
            modalImg.addEventListener('load', setModalBg);
            if (modalImg.complete && modalImg.naturalWidth) setModalBg();
        } else {
            imgWrap.innerHTML = `<div class="modal-placeholder-img ${data.imgClass}"></div>`;
        }
        document.getElementById('modalDesc').textContent = lang === 'id' ? data.descId : data.descEn;

        const tagsEl = document.getElementById('modalTags');
        tagsEl.innerHTML = data.tags.map(t => `<span>${t}</span>`).join('');

        const linksEl = document.getElementById('modalLinks');
        linksEl.innerHTML = data.links.map(l =>
            `<a href="${l.href}" class="overlay-btn ${l.type === 'demo' ? 'overlay-demo' : ''}">
                <i class="${l.icon}"></i> ${l.label}
            </a>`
        ).join('');

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
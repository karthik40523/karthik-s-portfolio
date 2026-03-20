// ==========================================
// DEFAULT DATA STRUCTURE
// ==========================================
const DATA_VERSION = 12; // Increment to force localStorage reset

const defaultData = {
    version: DATA_VERSION,
    general: {
        logo: "KKR",
        tagline: "Software Developer | Full-Stack | AI",
        title: 'Building <span class="highlight">AI-Powered</span> Full-Stack Solutions',
        subtitle: "",
        about1: "Software Developer with experience in building AI-powered full-stack applications using React, Flask, and PostgreSQL. Skilled in LLM integration, SQL query optimization, and cloud-based backend services.",
        about2: "Passionate about developing scalable, secure, and data-driven systems. Whether it's crafting multi-LLM pipelines, building intelligent browser extensions, or designing robust backend architectures — I thrive on solving complex problems with elegant engineering.",
        contactText: "Have a project in mind or want to collaborate? Let's connect.",
        footerText: "© 2026 G. Karthik Kumar Reddy. All Rights Reserved.",
        theme: "dark"
    },
    skills: [
        { id: 1, name: "React & Flask", category: "Full-Stack Development", icon: "fa-brands fa-react" },
        { id: 2, name: "PostgreSQL & SQL", category: "Database & Query Optimization", icon: "fa-solid fa-database" },
        { id: 3, name: "Prompt Engineering", category: "Few-shot, Zero-shot, OpenAI API", icon: "fa-solid fa-brain" },
        { id: 4, name: "LLM Integration", category: "Gemini, Claude, Llama", icon: "fa-solid fa-robot" },
        { id: 5, name: "Java", category: "Programming Language", icon: "fa-brands fa-java" },
        { id: 6, name: "Supabase", category: "Backend-as-a-Service", icon: "fa-solid fa-bolt" }
    ],
    projects: [
        {
            id: 1,
            title: "Quizzy AI Paper Forge",
            problem: "Creating syllabus-aligned question papers from PDFs is manual, time-consuming, and error-prone — requiring instructors to spend hours on mark distribution and formatting.",
            solution: "Developed a full-stack AI-powered web application with a multi-LLM pipeline (Gemini, Claude, Llama) and automatic fallback. Implemented automated mark distribution using PostgreSQL, secured with JWT-based role access and RLS. Achieved 92% relevance and reduced manual effort by 70%.",
            tools: ["React", "Flask", "PostgreSQL", "Gemini", "Claude", "Llama", "JWT"],
            link: "https://quizzy-ai-paper-forge.vercel.app"
        },
        {
            id: 2,
            title: "AI-Based Phishing Detection System",
            problem: "Users browsing the web are frequently exposed to phishing attacks through malicious URLs — traditional blacklist-based detection is too slow and misses new threats.",
            solution: "Built a real-time phishing detection system using a browser extension integrated with a Flask-based ML backend. Implemented a Random Forest classifier to analyze URL features and detect malicious websites with high accuracy. Enabled instant threat warnings with minimal data collection.",
            tools: ["JavaScript", "Python", "Flask", "Scikit-learn", "Browser Extension"],
            link: "#"
        }
    ],
    links: {
        linkedin: "https://www.linkedin.com/in/karthik-kumar-a54743268/",
        github: "https://github.com/karthik40523",
        instagram: "https://instagram.com/karthik",
        email: "karthikkumargonapati@gmail.com"
    },
    education: [
        { degree: "B.Tech in Computer Science and Engineering", institution: "Kalasalingam University, Madurai", period: "08/2022 – 05/2026", score: "CGPA: 7.33 / 10.0" },
        { degree: "Intermediate (MPC)", institution: "Narayana Junior College, Nellore", period: "06/2020 – 03/2022", score: "Percentage: 88.5%" },
        { degree: "10th Grade", institution: "Sri Chaitanya School, Ananthapur", period: "06/2019 – 03/2020", score: "Percentage: 100%" }
    ],
    certifications: [
        { id: 1, name: "Foundations of Cybersecurity", organization: "Cisco", category: "Cisco", year: "2024", certificateLink: "https://drive.google.com/file/d/1RlHiExO-TFdcMiM7EpDM5kLPhAoPr3LY/view", previewLink: "https://drive.google.com/file/d/1RlHiExO-TFdcMiM7EpDM5kLPhAoPr3LY/preview" },
        { id: 2, name: "SQL and Relational Databases 101", organization: "IBM Cognitive Class", category: "IBM", year: "2026", certificateLink: "https://drive.google.com/file/d/1QD5SFcAUUbGV-tEl0exrZOxOcL5jKhMx/view", previewLink: "https://drive.google.com/file/d/1QD5SFcAUUbGV-tEl0exrZOxOcL5jKhMx/preview" },
        { id: 3, name: "Ethical Hacker", organization: "Cisco", category: "Cisco", year: "2024", certificateLink: "https://drive.google.com/file/d/1LHVimSFs72UgWmVY3Gn8LIPekksFeT9N/view", previewLink: "https://drive.google.com/file/d/1LHVimSFs72UgWmVY3Gn8LIPekksFeT9N/preview" },
        { id: 4, name: "Cyber Threat Management", organization: "Cisco", category: "Cisco", year: "2024", certificateLink: "https://drive.google.com/file/d/1zbq1Qhto8IMHey8VPhv1m9H1CXCbbzCP/view", previewLink: "https://drive.google.com/file/d/1zbq1Qhto8IMHey8VPhv1m9H1CXCbbzCP/preview" },
        { id: 5, name: "Endpoint Security", organization: "Cisco", category: "Cisco", year: "2024", certificateLink: "https://drive.google.com/file/d/1N6StHt8p8gnyYw-kakgqFA-rEkuxnxaB/view", previewLink: "https://drive.google.com/file/d/1N6StHt8p8gnyYw-kakgqFA-rEkuxnxaB/preview" },
        { id: 6, name: "Introduction to Cybersecurity", organization: "Cisco", category: "Cisco", year: "2024", certificateLink: "https://drive.google.com/file/d/1kJH9k8G-TeYFHTm8nAqUod2qu5yPUlmP/view", previewLink: "https://drive.google.com/file/d/1kJH9k8G-TeYFHTm8nAqUod2qu5yPUlmP/preview" }
    ]
};

// ==========================================
// DATA MANAGEMENT
// ==========================================
let portfolioData = JSON.parse(localStorage.getItem('portfolioData'));

// Force reset if data version is outdated or missing
if (!portfolioData || portfolioData.version !== DATA_VERSION) {
    console.info("Data version mismatch or missing. Applying fresh data.");
    portfolioData = defaultData;
    localStorage.removeItem('userThemePref');
    saveData();
}

// Ensure theme exists in older saves
if (!portfolioData.general.theme) {
    portfolioData.general.theme = "light";
    saveData();
}

function saveData() {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
}

// ==========================================
// RENDER FUNCTIONS
// ==========================================
function renderAll() {
    renderGeneral();
    renderSkills();
    renderProjects();
    renderEducation();
    renderCertifications();
    renderLinks();
}

function renderGeneral() {
    document.getElementById('site-logo').innerHTML = portfolioData.general.logo;
    document.getElementById('hero-tagline').innerHTML = portfolioData.general.tagline;
    document.getElementById('hero-title').innerHTML = portfolioData.general.title;

    const subtitleEl = document.getElementById('hero-subtitle');
    if (subtitleEl) {
        if (portfolioData.general.subtitle.trim() === '') {
            subtitleEl.style.display = 'none';
        } else {
            subtitleEl.style.display = 'block';
            subtitleEl.innerHTML = portfolioData.general.subtitle;
        }
    }

    document.getElementById('about-p1').innerHTML = portfolioData.general.about1;
    document.getElementById('about-p2').innerHTML = portfolioData.general.about2;
    document.getElementById('contact-text').innerHTML = portfolioData.general.contactText;
    document.getElementById('footer-text').innerHTML = portfolioData.general.footerText;
}

function renderSkills() {
    const container = document.getElementById('skills-container');
    container.innerHTML = '';

    portfolioData.skills.forEach(skill => {
        const div = document.createElement('div');
        div.className = 'skill-card fade-in-up visible';
        const iconClass = skill.icon || 'fa-solid fa-code';
        div.innerHTML = `
            <i class="${iconClass}"></i>
            <div class="skill-category">${skill.category}</div>
            <div class="skill-name">${skill.name}</div>
        `;
        container.appendChild(div);
    });
}

function renderProjects() {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';

    portfolioData.projects.forEach(project => {
        const toolsHtml = project.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('');
        const div = document.createElement('div');
        div.className = 'project-card fade-in-up visible';
        div.innerHTML = `
            <div class="project-header">
                <h3 class="project-title">${project.title}</h3>
                <a href="${project.link}" target="_blank" class="project-link-icon">
                    <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 1.2rem;"></i>
                </a>
            </div>
            <div class="project-details" style="margin-bottom: 2rem; flex-grow: 1;">
                <div class="project-problem" style="margin-bottom: 1rem;">
                    <strong style="color: var(--text-main);">Problem:</strong> <span style="color: var(--text-muted);">${project.problem}</span>
                </div>
                <div class="project-solution">
                    <strong style="color: var(--text-main);">Solution:</strong> <span style="color: var(--text-muted);">${project.solution}</span>
                </div>
            </div>
            <div class="project-tools">
                ${toolsHtml}
            </div>
        `;
        container.appendChild(div);
    });
}

function renderEducation() {
    const container = document.getElementById('education-container');
    if (!container || !portfolioData.education) return;
    container.innerHTML = '';

    portfolioData.education.forEach((edu, i) => {
        const div = document.createElement('div');
        div.className = 'edu-card fade-in-up';
        div.style.setProperty('--delay', `${i * 0.15}s`);
        div.innerHTML = `
            <div class="edu-period">${edu.period}</div>
            <h3 class="edu-degree">${edu.degree}</h3>
            <p class="edu-institution">${edu.institution}</p>
            <span class="edu-score">${edu.score}</span>
        `;
        container.appendChild(div);
    });
}

function renderCertifications() {
    const container = document.getElementById('certifications-container');
    if (!container || !portfolioData.certifications) return;
    container.innerHTML = '';

    const orgIcons = {
        'Cisco': 'fa-network-wired',
        'IBM': 'fa-cube',
        'IBM Cognitive Class': 'fa-cube',
        'Coursera': 'fa-graduation-cap'
    };

    portfolioData.certifications.forEach((cert, i) => {
        if (typeof cert === 'string') {
            cert = { id: Date.now() + i, name: cert, organization: '', category: '', certificateLink: '', previewLink: '' };
            portfolioData.certifications[i] = cert;
        }

        const title = cert.name || cert.title || '';
        const org = cert.organization || cert.issuer || '';
        const year = cert.year || '';
        const cat = cert.category || org;
        const certUrl = cert.certificateLink || cert.link || '';
        const prevUrl = cert.previewLink || certUrl;
        const icon = orgIcons[org] || 'fa-award';

        const div = document.createElement('div');
        div.className = 'cert-gallery-card fade-in-up';
        div.setAttribute('data-category', cat);
        div.style.setProperty('--delay', `${i * 0.08}s`);

        div.innerHTML = `
            <div class="cgc-top">
                <div class="cgc-org-badge">
                    <i class="fa-solid ${icon}"></i>
                    <span>${org}</span>
                </div>
                <div class="cgc-glow"></div>
            </div>
            <div class="cgc-body">
                <h3 class="cgc-title">${title}</h3>
                <div class="cgc-meta">
                    <span class="cgc-org-name">${org}</span>
                    ${year ? `<span class="cgc-year-badge"><i class="fa-regular fa-calendar"></i> ${year}</span>` : ''}
                </div>
            </div>
            <div class="cgc-actions">
                <button class="cgc-btn cgc-btn--preview" data-preview="${prevUrl}" data-title="${title}">
                    <i class="fa-solid fa-eye"></i> Preview
                </button>
                <a href="${certUrl}" target="_blank" rel="noopener noreferrer" class="cgc-btn cgc-btn--view">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> View
                </a>
            </div>
        `;
        container.appendChild(div);
    });
}


function renderLinks() {
    const linkedin = document.getElementById('link-linkedin');
    const github = document.getElementById('link-github');
    const email = document.getElementById('link-email');
    if (linkedin) linkedin.href = portfolioData.links.linkedin;
    if (github) github.href = portfolioData.links.github;
    if (email) email.href = `mailto:${portfolioData.links.email}`;
}

// ==========================================
// ADMIN DASHBOARD LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    renderAll();
    initTheme();
    initUIBehaviors();
    initAdminDashboard();
    initFireParticles();
    initPreloader();
    initContactForm();
    initCertGallery();
});

// ==========================================
// CERTIFICATE GALLERY — FILTER + MODAL
// ==========================================
function initCertGallery() {
    // --- Filter buttons ---
    const filterBtns = document.querySelectorAll('.cert-filter-btn');
    const container = document.getElementById('certifications-container');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            const cards = container ? container.querySelectorAll('.cert-gallery-card') : [];

            cards.forEach(card => {
                const match = filter === 'all' || card.getAttribute('data-category') === filter;
                card.style.display = match ? '' : 'none';
                if (match) {
                    // Re-trigger entrance animation
                    card.classList.remove('visible');
                    requestAnimationFrame(() => card.classList.add('visible'));
                }
            });
        });
    });

    // --- Preview Modal ---
    const modal = document.getElementById('cert-modal');
    const modalClose = document.getElementById('cert-modal-close');
    const modalTitle = document.getElementById('cert-modal-title');
    const modalBody = document.getElementById('cert-modal-body');

    if (!modal) return;

    function openModal(title, previewUrl) {
        modalTitle.textContent = title;
        modalBody.innerHTML = `
            <div class="cgc-preview-note">
                <p><i class="fa-solid fa-circle-info"></i> Google Drive preview may require sign-in.</p>
            </div>
            <iframe
                src="${previewUrl}"
                title="${title} Certificate"
                width="100%"
                height="480"
                style="border:none; border-radius: 8px;"
                allowfullscreen
                loading="lazy"
            ></iframe>
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalBody.innerHTML = '';
    }

    // Delegated click on preview buttons
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.cgc-btn--preview');
        if (btn) {
            openModal(btn.getAttribute('data-title'), btn.getAttribute('data-preview'));
        }
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// ==========================================
// CONTACT FORM (JS-controlled, secure)
// ==========================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // API key stored in JS (not visible in HTML source)
    const W3F_KEY = '87f18a6d-2cd9-4d63-8f64-a35cefade500';

    const nameEl = document.getElementById('form-name');
    const emailEl = document.getElementById('form-email');
    const messageEl = document.getElementById('form-message');
    const statusEl = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit-btn');

    function showStatus(type, msg) {
        statusEl.textContent = msg;
        statusEl.className = `form-status form-status--${type}`;
        statusEl.style.display = 'block';
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Honeypot check — bots fill the hidden checkbox
        if (form.querySelector('[name="botcheck"]').checked) return;

        // Field validation
        const name = nameEl.value.trim();
        const email = emailEl.value.trim();
        const message = messageEl.value.trim();

        if (!name) { showStatus('error', 'Please enter your name.'); nameEl.focus(); return; }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showStatus('error', 'Please enter a valid email address.'); emailEl.focus(); return; }
        if (!message) { showStatus('error', 'Please enter a message.'); messageEl.focus(); return; }

        // UI feedback while sending
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending... <span class="arrow">⌛</span>';
        statusEl.style.display = 'none';

        try {
            const payload = {
                access_key: W3F_KEY,
                name,
                email,
                message,
                botcheck: false
            };

            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (data.success) {
                showStatus('success', '✅ Message sent successfully! I\'ll get back to you soon.');
                form.reset();
            } else {
                showStatus('error', '❌ Something went wrong. Please try again.');
            }
        } catch (err) {
            showStatus('error', '❌ Network error. Please check your connection and try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message <span class="arrow">↗</span>';
        }
    });
}

function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const iconSun = document.getElementById('theme-icon-sun');
    const iconMoon = document.getElementById('theme-icon-moon');

    function applyTheme(isDark) {
        if (isDark) {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
            if (iconSun) iconSun.style.display = 'block';
            if (iconMoon) iconMoon.style.display = 'none';
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.remove('light-theme');
            if (iconSun) iconSun.style.display = 'none';
            if (iconMoon) iconMoon.style.display = 'block';
        }
    }

    const userThemePref = localStorage.getItem('userThemePref');
    let isDarkTheme = false;

    if (userThemePref !== null) {
        isDarkTheme = userThemePref === 'dark';
    } else {
        isDarkTheme = portfolioData.general.theme === 'dark';
    }
    applyTheme(isDarkTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            isDarkTheme = !document.body.classList.contains('dark-theme');
            localStorage.setItem('userThemePref', isDarkTheme ? 'dark' : 'light');
            applyTheme(isDarkTheme);
        });
    }
}

function initUIBehaviors() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Stagger delays for children
    document.querySelectorAll('.skill-card').forEach((card, i) => {
        card.classList.add('fade-in-up');
        card.style.setProperty('--delay', `${i * 0.1}s`);
    });

    document.querySelectorAll('.project-card').forEach((card, i) => {
        card.classList.add('fade-in-up');
        card.style.setProperty('--delay', `${i * 0.15}s`);
        card.querySelectorAll('.tool-tag').forEach((tag, j) => {
            tag.style.setProperty('--delay', `${0.3 + j * 0.08}s`);
        });
    });

    document.querySelectorAll('.social-link-item').forEach((item, i) => {
        item.style.setProperty('--delay', `${0.2 + i * 0.12}s`);
    });

    // Intersection Observer for all animated elements
    const animSelectors = '.fade-in-up, .slide-in-left, .slide-in-right, .scale-in, .footer';
    const animatedElements = document.querySelectorAll(animSelectors);

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => scrollObserver.observe(el));

    initCursorGlow();
    init3DCardTilt();
    initParallax();

    // Hero blob parallax on mouse move
    const heroBlob1 = document.querySelector('.hero-blob-1');
    const heroBlob2 = document.querySelector('.hero-blob-2');
    const hero = document.querySelector('.hero');
    if (hero && heroBlob1) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            heroBlob1.style.transform = `translate(${x * 40}px, ${y * 30}px)`;
            if (heroBlob2) heroBlob2.style.transform = `translate(${-x * 30}px, ${-y * 20}px)`;
        });
        hero.addEventListener('mouseleave', () => {
            heroBlob1.style.transform = '';
            heroBlob1.style.transition = 'transform 0.6s ease-out';
            if (heroBlob2) {
                heroBlob2.style.transform = '';
                heroBlob2.style.transition = 'transform 0.6s ease-out';
            }
            setTimeout(() => {
                heroBlob1.style.transition = '';
                if (heroBlob2) heroBlob2.style.transition = '';
            }, 600);
        });
    }
}

function initAdminDashboard() {
    const modal = document.getElementById('admin-modal');
    const openBtn = document.getElementById('open-dashboard-btn');
    const closeBtn = document.getElementById('close-modal');

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            populateAdminForms();
            modal.classList.add('active');
        });
    }


    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Tab Switching
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
        });
    });

    // Save General Settings
    document.querySelector('.save-general-btn').addEventListener('click', () => {
        portfolioData.general.theme = document.getElementById('input-theme').value;
        portfolioData.general.logo = document.getElementById('input-logo').value;
        portfolioData.general.tagline = document.getElementById('input-tagline').value;
        portfolioData.general.title = document.getElementById('input-title').value;

        const inputSubtitleEl = document.getElementById('input-subtitle');
        portfolioData.general.subtitle = inputSubtitleEl ? inputSubtitleEl.value : '';

        portfolioData.general.about1 = document.getElementById('input-about1').value;
        portfolioData.general.about2 = document.getElementById('input-about2').value;
        portfolioData.general.contactText = document.getElementById('input-contact-text').value;
        portfolioData.general.footerText = document.getElementById('input-footer').value;

        saveData();
        renderGeneral();
        alert('General settings saved!');
    });

    // Save Links
    document.querySelector('.save-links-btn').addEventListener('click', () => {
        portfolioData.links.linkedin = document.getElementById('input-link-linkedin').value;
        portfolioData.links.github = document.getElementById('input-link-github').value;
        const igEl = document.getElementById('input-link-instagram');
        if (igEl) portfolioData.links.instagram = igEl.value;
        portfolioData.links.email = document.getElementById('input-link-email').value;

        saveData();
        renderLinks();
        alert('Links saved!');
    });

    // Add new skill
    document.getElementById('add-skill-btn').addEventListener('click', () => {
        const newId = Date.now();
        portfolioData.skills.push({ id: newId, name: "New Skill", category: "Category", icon: "fa-solid fa-code" });
        saveData();
        renderAdminSkills();
        renderSkills();
    });

    // Add new project
    document.getElementById('add-project-btn').addEventListener('click', () => {
        const newId = Date.now();
        portfolioData.projects.push({
            id: newId,
            title: "New Project",
            problem: "Description of the problem...",
            solution: "Description of the solution...",
            tools: ["Tool 1", "Tool 2"],
            link: "#"
        });
        saveData();
        renderAdminProjects();
        renderProjects();
    });

    // Add new certification
    if (document.getElementById('add-cert-btn')) {
        document.getElementById('add-cert-btn').addEventListener('click', () => {
            const newId = Date.now();
            portfolioData.certifications.push({
                id: newId,
                name: "New Certification",
                link: ""
            });
            saveData();
            renderAdminCertifications();
            renderCertifications();
        });
    }
}

function initFireParticles() {
    const canvas = document.getElementById('fire-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

    function setSize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    setSize();
    window.addEventListener('resize', setSize);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 100;
            this.size = Math.random() * 3 + 1;
            this.speedY = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 1.5;
            this.opacity = Math.random() * 0.8 + 0.2;

            // Fire colors: Red, Orange, Gold
            const colors = ['#d9381e', '#e69c24', '#ff4d00', '#ffaa00'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.y -= this.speedY;
            this.x += this.speedX;

            // Wiggle effect
            this.x += Math.sin(this.y * 0.01) * 0.5;

            // Fade out as it goes up
            this.opacity -= 0.003;

            if (this.y < 0 || this.opacity <= 0) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();

            // Glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
        }
    }

    function createParticles() {
        const particleCount = Math.floor(width / 15);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
            particles[i].y = Math.random() * height;
        }
    }

    createParticles();

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        requestAnimationFrame(animate);
    }

    animate();
}

function populateAdminForms() {
    const inputThemeEl = document.getElementById('input-theme');
    if (inputThemeEl) inputThemeEl.value = portfolioData.general.theme || 'light';

    document.getElementById('input-logo').value = portfolioData.general.logo;
    document.getElementById('input-tagline').value = portfolioData.general.tagline;
    document.getElementById('input-title').value = portfolioData.general.title;

    const inputSubtitleEl = document.getElementById('input-subtitle');
    if (inputSubtitleEl) inputSubtitleEl.value = portfolioData.general.subtitle;

    document.getElementById('input-about1').value = portfolioData.general.about1;
    document.getElementById('input-about2').value = portfolioData.general.about2;
    document.getElementById('input-contact-text').value = portfolioData.general.contactText;
    document.getElementById('input-footer').value = portfolioData.general.footerText;

    // Populate Links
    document.getElementById('input-link-linkedin').value = portfolioData.links.linkedin;
    document.getElementById('input-link-github').value = portfolioData.links.github;
    const igEl = document.getElementById('input-link-instagram');
    if (igEl) igEl.value = portfolioData.links.instagram || '';
    document.getElementById('input-link-email').value = portfolioData.links.email;

    renderAdminSkills();
    renderAdminProjects();
    renderAdminCertifications();
}

function renderAdminSkills() {
    const list = document.getElementById('admin-skills-list');
    list.innerHTML = '';

    portfolioData.skills.forEach((skill) => {
        const div = document.createElement('div');
        div.className = 'admin-list-item';
        div.innerHTML = `
            <button class="delete-item-btn" onclick="deleteSkill(${skill.id})">Delete</button>
            <div class="admin-group">
                <label>Icon (FontAwesome Class)</label>
                <input type="text" value="${skill.icon || ''}" onchange="updateSkill(${skill.id}, 'icon', this.value)">
            </div>
            <div class="admin-group">
                <label>Skill Name</label>
                <input type="text" value="${skill.name}" onchange="updateSkill(${skill.id}, 'name', this.value)">
            </div>
            <div class="admin-group">
                <label>Category</label>
                <input type="text" value="${skill.category}" onchange="updateSkill(${skill.id}, 'category', this.value)">
            </div>
        `;
        list.appendChild(div);
    });
}

function renderAdminProjects() {
    const list = document.getElementById('admin-projects-list');
    list.innerHTML = '';

    portfolioData.projects.forEach((proj) => {
        const toolsStr = proj.tools.join(', ');
        const div = document.createElement('div');
        div.className = 'admin-list-item';
        div.innerHTML = `
            <button class="delete-item-btn" onclick="deleteProject(${proj.id})">Delete</button>
            <div class="admin-group">
                <label>Project Title</label>
                <input type="text" value="${proj.title}" onchange="updateProject(${proj.id}, 'title', this.value)">
            </div>
            <div class="admin-group">
                <label>Problem Statement</label>
                <textarea rows="2" onchange="updateProject(${proj.id}, 'problem', this.value)">${proj.problem}</textarea>
            </div>
            <div class="admin-group">
                <label>Solution Statement</label>
                <textarea rows="3" onchange="updateProject(${proj.id}, 'solution', this.value)">${proj.solution}</textarea>
            </div>
            <div class="admin-group">
                <label>Tools (comma separated)</label>
                <input type="text" value="${toolsStr}" onchange="updateProjectTools(${proj.id}, this.value)">
            </div>
            <div class="admin-group">
                <label>Project Link</label>
                <input type="text" value="${proj.link}" onchange="updateProject(${proj.id}, 'link', this.value)">
            </div>
        `;
        list.appendChild(div);
    });
}

function renderAdminCertifications() {
    const list = document.getElementById('admin-certs-list');
    if (!list) return;
    list.innerHTML = '';

    portfolioData.certifications.forEach((cert, i) => {
        // Ensure object structure for backwards compatibility
        if (typeof cert === 'string') {
            cert = { id: Date.now() + i, name: cert, link: "" };
            portfolioData.certifications[i] = cert;
        }

        const div = document.createElement('div');
        div.className = 'admin-list-item';
        const linkPreview = cert.link && cert.link.trim() !== "" ? `<a href="${cert.link}" target="_blank" style="color: #6366f1; font-size: 0.9rem;"><i class="fa-solid fa-link"></i> Link Preview</a>` : '<span style="color: #999; font-size: 0.9rem;">No link added yet</span>';
        div.innerHTML = `
            <button class="delete-item-btn" onclick="deleteCert(${cert.id})">Delete</button>
            <div class="admin-group">
                <label><i class="fa-solid fa-certificate"></i> Certification Name</label>
                <input type="text" value="${cert.name}" onchange="updateCert(${cert.id}, 'name', this.value)" placeholder="e.g., AWS Solutions Architect">
            </div>
            <div class="admin-group">
                <label><i class="fa-solid fa-link"></i> Certificate Link</label>
                <input type="url" value="${cert.link || ''}" onchange="updateCert(${cert.id}, 'link', this.value)" placeholder="https://example.com/certificate">
                <small style="color: #999; margin-top: 0.5rem; display: block;">Add the URL to view/verify your certificate. ${linkPreview}</small>
            </div>
        `;
        list.appendChild(div);
    });
}

// Admin API Functions (Global scope for inline onclick)
window.updateSkill = function (id, field, value) {
    const skill = portfolioData.skills.find(s => s.id === id);
    if (skill) skill[field] = value;
    saveData();
    renderSkills();
};

window.deleteSkill = function (id) {
    if (confirm('Delete this skill?')) {
        portfolioData.skills = portfolioData.skills.filter(s => s.id !== id);
        saveData();
        renderAdminSkills();
        renderSkills();
    }
};

window.updateProject = function (id, field, value) {
    const proj = portfolioData.projects.find(p => p.id === id);
    if (proj) proj[field] = value;
    saveData();
    renderProjects();
};

window.updateProjectTools = function (id, value) {
    const proj = portfolioData.projects.find(p => p.id === id);
    if (proj) proj.tools = value.split(',').map(t => t.trim()).filter(t => t);
    saveData();
    renderProjects();
};

window.deleteProject = function (id) {
    if (confirm('Delete this project?')) {
        portfolioData.projects = portfolioData.projects.filter(p => p.id !== id);
        saveData();
        renderAdminProjects();
        renderProjects();
    }
};

window.updateCert = function (id, field, value) {
    const cert = portfolioData.certifications.find(c => c.id === id);
    if (cert) cert[field] = value;
    saveData();
    renderCertifications();
};

window.deleteCert = function (id) {
    if (confirm('Delete this certification?')) {
        portfolioData.certifications = portfolioData.certifications.filter(c => c.id !== id);
        saveData();
        renderAdminCertifications();
        renderCertifications();
    }
};

// ==========================================
// ADVANCED UI / UX FEATURES
// ==========================================

function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                preloader.style.transition = 'opacity 0.6s ease-out, visibility 0.6s ease-out';
                setTimeout(() => {
                    preloader.remove();
                }, 600);
            }, 500); // 500ms min delay for aesthetic purposes
        });
    }
}

function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;

    // Performance optimization: lerp the position
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateGlow() {
        // Smooth lerping (0.1 for subtle lag / premium feel)
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;

        glow.style.left = `${glowX}px`;
        glow.style.top = `${glowY}px`;

        requestAnimationFrame(updateGlow);
    }
    updateGlow();
}

function initParallax() {
    const bg = document.getElementById('parallax-bg');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Background moves slower
        if (bg) bg.style.transform = `translateY(${scrolled * 0.15}px)`;

        // Hero content moves slightly for depth
        if (heroContent && scrolled < 800) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / 800);
        }
    });
}

function init3DCardTilt() {
    // Media query to check if we should run tilt logic
    const isMobile = window.innerWidth < 1024;
    if (isMobile) return;

    // Use event delegation for better performance and dynamic compatibility
    document.addEventListener('mousemove', (e) => {
        const card = e.target.closest('.project-card, .skill-card, .cert-gallery-card, .edu-card');
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Slightly more tilt
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        card.style.transition = 'transform 0.1s ease-out';
        card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5)';
        card.style.zIndex = '10';
    });

    document.addEventListener('mouseout', (e) => {
        const card = e.target.closest('.project-card, .skill-card, .cert-gallery-card, .edu-card');
        if (!card) return;

        // Reset with smooth transition
        card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)';
        card.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
        card.style.boxShadow = '';
        card.style.zIndex = '';
    });
}

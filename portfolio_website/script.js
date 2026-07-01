/**
 * ==========================================================================
 * PORTFOLIO ARCHITECTURE CORE ENGINE (script.js)
 * ==========================================================================
 * Description: Orchestrates dynamic rendering, database synchronization via
 * LocalStorage, admin dashboard customizer interfaces, credentials gallery filtering,
 * interactive modal systems, scroll observers, and 3D geometric tilt mechanics.
 * Redesigned to follow cinematic, premium luxury editorial design rules.
 */

// ==========================================
// DEFAULT DATA STRUCTURE
// ==========================================
// Increment to force client browser localStorage reset during updates
const DATA_VERSION = 19; 

// Initial schema blueprint served on first load or database reset
const defaultData = {
    version: DATA_VERSION,
    general: {
        logo: "kkr_logo.png",
        tagline: "Software Developer | Full-Stack | AI",
        title: 'Building <span class="highlight">AI-Powered</span> Full-Stack Solutions',
        subtitle: "",
        about1: "Software Developer with experience in building full-stack applications using React, Flask, and PostgreSQL. Skilled in LLM integration, SQL query optimization, and cloud-based backend services.",
        about2: "Passionate about developing scalable, secure, and data-driven systems. Whether it's crafting multi-LLM pipelines, building intelligent browser extensions, or designing robust backend architectures — I thrive on solving complex problems with elegant engineering.",
        contactText: "Have a project in mind or want to collaborate? Let's connect.",
        footerText: "© 2026 G. Karthik Kumar Reddy. All Rights Reserved."
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
            link: "https://github.com/sujan7989/phishing-extension.git",
            isExtension: true
        }
    ],
    links: {
        linkedin: "https://www.linkedin.com/in/karthik-kumar-a54743268/",
        github: "https://github.com/karthik40523",
        instagram: "https://instagram.com/karthik",
        email: "karthikkumargonapati@gmail.com",
    },
    education: [
        { degree: "B.Tech in Computer Science and Engineering", institution: "Kalasalingam University, Madurai", period: "08/2022 – 05/2026", score: "CGPA: 7.5/ 10.0" },
        { degree: "Intermediate (MPC)", institution: "Narayana Junior College, Nellore", period: "06/2020 – 03/2022", score: "Percentage: 88.5%" },
        { degree: "10th Grade", institution: "Sri Chaitanya School, Ananthapur", period: "06/2019 – 03/2020", score: "Percentage: 100%" }
    ],
    certifications: [
        { id: 1, name: "Foundations of Cybersecurity", organization: "Coursera", category: "Coursera", year: "2024", certificateLink: "https://drive.google.com/file/d/1RlHiExO-TFdcMiM7EpDM5kLPhAoPr3LY/view", previewLink: "https://drive.google.com/file/d/1RlHiExO-TFdcMiM7EpDM5kLPhAoPr3LY/preview" },
        { id: 2, name: "SQL and Relational Databases 101", organization: "IBM Cognitive Class", category: "IBM", year: "2026", certificateLink: "https://drive.google.com/file/d/1QD5SFcAUUbGV-tEl0exrZOxOcL5jKhMx/view", previewLink: "https://drive.google.com/file/d/1QD5SFcAUUbGV-tEl0exrZOxOcL5jKhMx/preview" },
        { id: 3, name: "Ethical Hacker", organization: "Cisco", category: "Cisco", year: "2024", certificateLink: "https://drive.google.com/file/d/1LHVimSFs72UgWmVY3Gn8LIPekksFeT9N/view", previewLink: "https://drive.google.com/file/d/1LHVimSFs72UgWmVY3Gn8LIPekksFeT9N/preview" },
        { id: 4, name: "Cyber Threat Management", organization: "Cisco", category: "Cisco", year: "2024", certificateLink: "https://drive.google.com/file/d/1zbq1Qhto8IMHey8VPhv1m9H1CXCbbzCP/view", previewLink: "https://drive.google.com/file/d/1zbq1Qhto8IMHey8VPhv1m9H1CXCbbzCP/preview" },
        { id: 5, name: "Endpoint Security", organization: "Cisco", category: "Cisco", year: "2024", certificateLink: "https://drive.google.com/file/d/1N6StHt8p8gnyYw-kakgqFA-rEkuxnxaB/view", previewLink: "https://drive.google.com/file/d/1N6StHt8p8gnyYw-kakgqFA-rEkuxnxaB/preview" },
        { id: 6, name: "Introduction to Cybersecurity", organization: "Cisco", category: "Cisco", year: "2024", certificateLink: "https://drive.google.com/file/d/1kJH9k8G-TeYFHTm8nAqUod2qu5yPUlmP/view", previewLink: "https://drive.google.com/file/d/1kJH9k8G-TeYFHTm8nAqUod2qu5yPUlmP/preview" }
    ]
};

// ==========================================
// DATA MANAGEMENT (LocalStorage Synchronization)
// ==========================================
let portfolioData = JSON.parse(localStorage.getItem('portfolioData'));

// Force data reset if version mismatch occurs or data is empty
if (!portfolioData || portfolioData.version !== DATA_VERSION) {
    console.info("Data version mismatch or missing. Applying fresh data.");
    portfolioData = defaultData;
    saveData();
}

/**
 * Saves current local state of portfolioData to client localStorage.
 */
function saveData() {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
}

// ==========================================
// RENDER FUNCTIONS (Dynamic DOM Population)
// ==========================================

/**
 * Master render command. Synchronizes all UI components with the current local dataset.
 */
function renderAll() {
    renderGeneral();
    renderSkills();
    renderProjects();
    renderEducation();
    renderCertifications();
    renderLinks();
}

/**
 * Populates logo text, hero title layouts, about blocks, and copyrights.
 */
function renderGeneral() {
    const logoVal = portfolioData.general.logo;
    const logoEl = document.getElementById('site-logo');
    if (logoEl) {
        if (logoVal.includes('.') && (logoVal.endsWith('.png') || logoVal.endsWith('.jpg') || logoVal.endsWith('.jpeg') || logoVal.endsWith('.svg') || logoVal.endsWith('.gif'))) {
            logoEl.innerHTML = `<img src="${logoVal}" alt="Logo" style="height: 36px; display: block; border-radius: 4px;">`;
        } else {
            logoEl.innerHTML = `${logoVal}<span>.</span>`;
        }
    }
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

/**
 * Generates tech stack bento layout elements dynamically.
 */
function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;
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

/**
 * Generates project cards styled as clean preowned automotive listings.
 */
function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;
    container.innerHTML = '';

    // Synchronize cockpit telemetry stats in the hero panel dynamically
    const statProjects = document.getElementById('stat-projects');
    const statSkills = document.getElementById('stat-skills');
    const statCerts = document.getElementById('stat-certs');
    if (statProjects) statProjects.textContent = portfolioData.projects.length + '+';
    if (statSkills) statSkills.textContent = portfolioData.skills.length + '+';
    if (statCerts) statCerts.textContent = (portfolioData.certifications || []).length + '+';

    portfolioData.projects.forEach((project, index) => {
        // Build tool tags utilizing a stagger animation delay index
        const toolsHtml = project.tools.map((tool, j) =>
            `<span class="tool-tag" style="--delay:${0.3 + j * 0.07}s">${tool}</span>`
        ).join('');

        const isFeatured = index === 0;
        const isExt = project.isExtension === true;
        const linkHref = isExt ? 'javascript:void(0)' : project.link;
        const linkIconAttr = isExt
            ? `onclick="openProjectModal(${index})" title="View Extension Details"`
            : `target="_blank" rel="noopener" title="Open Live Project"`;

        // Render live system telemetry console logs for the featured project
        const aiPreviewHtml = isFeatured ? `
            <div class="ai-project-preview">
                <div class="ai-step">
                    <span class="ai-step-icon"><i class="fa-solid fa-file-pdf"></i></span>
                    <span class="ai-step-text">PDF Syllabus Upload &amp; Parsing</span>
                    <span class="ai-step-status">&#10003; Done</span>
                </div>
                <div class="ai-step">
                    <span class="ai-step-icon"><i class="fa-solid fa-brain"></i></span>
                    <span class="ai-step-text">Multi-LLM Pipeline (Gemini &rarr; Claude &rarr; Llama)</span>
                    <span class="ai-step-status">&#10003; Done</span>
                </div>
                <div class="ai-step">
                    <span class="ai-step-icon"><i class="fa-solid fa-database"></i></span>
                    <span class="ai-step-text">PostgreSQL mark distribution &amp; JWT/RLS</span>
                    <span class="ai-step-status">&#10003; Done</span>
                </div>
                <div class="ai-step">
                    <span class="ai-step-icon"><i class="fa-solid fa-file-lines"></i></span>
                    <span class="ai-step-text"><span class="ai-typing">Generating exam-ready question paper&hellip;</span></span>
                    <span class="ai-step-status" style="color:var(--primary);">Live</span>
                </div>
            </div>` : '';

        const badgeHtml = isFeatured
            ? `<div class="project-badge"><i class="fa-solid fa-star"></i> Featured</div>` : '';

        const div = document.createElement('div');
        div.className = `project-card fade-in-up visible${isFeatured ? ' featured' : ''}`;
        div.style.setProperty('--delay', `${index * 0.15}s`);

        div.innerHTML = `
            ${badgeHtml}
            <div class="project-header">
                <h3 class="project-title">${project.title}</h3>
                <a href="${linkHref}" ${linkIconAttr} class="project-link-icon" aria-label="Project Link">
                    <i class="fa-solid fa-${isExt ? 'puzzle-piece' : 'arrow-up-right-from-square'}"></i>
                </a>
            </div>
            ${aiPreviewHtml}
            <div class="project-details">
                <div class="project-problem">
                    <strong>Problem:</strong>
                    <span>${project.problem}</span>
                </div>
                <div class="project-solution">
                    <strong>Solution:</strong>
                    <span>${project.solution}</span>
                </div>
            </div>
            <div class="project-tools">
                ${toolsHtml}
            </div>
        `;

        // If project is a browser extension, configure modal open triggers
        if (isExt) {
            div.style.cursor = 'pointer';
            div.addEventListener('click', (e) => {
                if (!e.target.closest('.project-link-icon')) {
                    openProjectModal(index);
                }
            });
        }

        container.appendChild(div);
    });
}

/**
 * Renders extension detail guides in a minimal dark-theme popup overlay.
 * @param {number} projectIndex Index position of project in database
 */
function openProjectModal(projectIndex) {
    const project = portfolioData.projects[projectIndex];
    if (!project) return;

    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('project-modal-title');
    const modalBody = document.getElementById('project-modal-body');
    if (!modal) return;

    // Map tech tools to minimal inline badge indicators
    const toolsHtml = project.tools.map(t =>
        `<span style="display:inline-flex;align-items:center;gap:4px;padding:4px 12px;background:var(--canvas);border:1px solid var(--hairline);border-radius:var(--rounded-full);font-size:0.78rem;font-weight:600;color:var(--primary);">${t}</span>`
    ).join('');

    const isExt = project.isExtension === true;

    // Load installation guidelines for chrome unpacking
    const linkSection = isExt ? `
        <div style="background:var(--canvas);border:1px solid var(--hairline);padding:16px 20px;border-radius:var(--rounded-none);margin:16px 0;">
            <p style="font-size:0.78rem;font-weight:800;color:var(--primary);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">
                <i class="fa-brands fa-github"></i> GitHub Repository
            </p>
            <a href="${project.link}" target="_blank" rel="noopener"
               style="color:var(--primary);font-weight:600;word-break:break-all;text-decoration:underline;font-size:0.9rem;">
                ${project.link}
            </a>
        </div>
        <div style="margin-top:24px;padding:16px 20px;border:1px solid var(--hairline);border-radius:var(--rounded-none);background:var(--canvas);">
            <p style="font-size:0.85rem;font-weight:700;color:var(--ink);margin-bottom:12px;">
                <i class="fa-solid fa-puzzle-piece" style="color:var(--primary)"></i> How to Load as Extension
            </p>
            <ol style="padding-left:20px;color:var(--body);font-size:0.88rem;line-height:2.1;">
                <li>Clone/Download the repository from GitHub.</li>
                <li>Open <code style="background:var(--canvas);color:var(--primary);padding:2px 6px;border-radius:var(--rounded-sm);">chrome://extensions</code> in your browser.</li>
                <li>Enable <strong style="color:var(--ink)">Developer mode</strong> (top-right toggle).</li>
                <li>Click <strong style="color:var(--ink)">Load unpacked</strong> and select the project folder.</li>
            </ol>
        </div>` : `
        <div style="margin-top:16px;">
            <a href="${project.link}" target="_blank" rel="noopener"
               style="display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:var(--primary);color:var(--on-primary);border-radius:var(--rounded-none);font-weight:700;font-size:0.85rem;letter-spacing:1px;text-transform:uppercase;text-decoration:none;">
                View Live Project
            </a>
        </div>`;

    const extBadge = isExt ? `
        <div class="cgc-preview-note" style="margin-bottom:16px;">
            <p><i class="fa-solid fa-puzzle-piece"></i> Browser Extension — Cannot be previewed in-browser</p>
        </div>` : '';

    modalTitle.textContent = project.title;
    modalBody.innerHTML = `
        <div style="line-height:1.7;color:var(--ink);">
            ${extBadge}
            <div style="margin-bottom:20px;">
                <p style="font-size:0.75rem;font-weight:800;color:var(--primary);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;">Problem</p>
                <p style="color:var(--body);font-size:0.95rem;">${project.problem}</p>
            </div>
            <div style="margin-bottom:24px;">
                <p style="font-size:0.75rem;font-weight:800;color:var(--primary);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;">Solution</p>
                <p style="color:var(--body);font-size:0.95rem;">${project.solution}</p>
            </div>
            <div style="margin-bottom:24px;">
                <p style="font-size:0.75rem;font-weight:800;color:var(--primary);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:12px;">Tech Stack</p>
                <div style="display:flex;flex-wrap:wrap;gap:8px;">${toolsHtml}</div>
            </div>
            ${linkSection}
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Closes project info modal screen and restores body scrolling.
 */
function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Renders education timelines as structural 3-column rows matching the race schedule layout.
 */
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
            <div>
                <h3 class="edu-degree">${edu.degree}</h3>
                <p class="edu-institution">${edu.institution}</p>
            </div>
            <span class="edu-score">${edu.score}</span>
        `;
        container.appendChild(div);
    });
}

/**
 * Populates certification credentials cards grid.
 */
function renderCertifications() {
    const container = document.getElementById('certifications-container');
    if (!container || !portfolioData.certifications) return;
    container.innerHTML = '';

    // Assign appropriate vector icons matching certification organizations
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
                    Preview
                </button>
                <a href="${certUrl}" target="_blank" rel="noopener noreferrer" class="cgc-btn cgc-btn--view">
                    View Link
                </a>
            </div>
        `;
        container.appendChild(div);
    });
}

/**
 * Populates external social platform links in contact listings.
 */
function renderLinks() {
    const linkedin = document.getElementById('link-linkedin');
    const github = document.getElementById('link-github');
    const email = document.getElementById('link-email');
    if (linkedin) linkedin.href = portfolioData.links.linkedin;
    if (github) github.href = portfolioData.links.github;
    if (email) email.href = `mailto:${portfolioData.links.email}`;
}

// ==========================================
// CORE APP HANDLER INITIALIZATIONS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Render dynamic datasets
    renderAll();

    // Bind interaction engines and observer matrices
    initUIBehaviors();
    initAdminDashboard();
    initFireParticles();
    initPreloader();
    initContactForm();
    initCertGallery();
    initProjectModal();
});

// ==========================================
// CREDENTIALS GALLERY ENGINE
// ==========================================
function initCertGallery() {
    const filterBtns = document.querySelectorAll('.cert-filter-btn');
    const container = document.getElementById('certifications-container');

    // Attach click filters to certification organization buttons
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
                    card.classList.remove('visible');
                    requestAnimationFrame(() => card.classList.add('visible'));
                }
            });
        });
    });

    // Preview modal element bindings
    const modal = document.getElementById('cert-modal');
    const modalClose = document.getElementById('cert-modal-close');
    const modalTitle = document.getElementById('cert-modal-title');
    const modalBody = document.getElementById('cert-modal-body');

    if (!modal) return;

    /**
     * Loads credential verification details in modal iframe viewer.
     */
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
                style="border:none;"
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

    // Capture dynamic delegated clicks on credential preview triggers
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

function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('project-modal-close');

    if (!modal || !modalClose) return;

    modalClose.addEventListener('click', closeProjectModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeProjectModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeProjectModal();
    });
}

// ==========================================
// SECURE EMAIL DISPATCH (Web3Forms API)
// ==========================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Public API Key for Web3Forms transaction endpoints
    const W3F_KEY = '87f18a6d-2cd9-4d63-8f64-a35cefade500';

    const nameEl = document.getElementById('form-name');
    const emailEl = document.getElementById('form-email');
    const messageEl = document.getElementById('form-message');
    const statusEl = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit-btn');

    /**
     * Controls styling of status banners.
     */
    function showStatus(type, msg) {
        statusEl.textContent = msg;
        statusEl.className = `form-status form-status--${type}`;
        statusEl.style.display = 'block';
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Honeypot spam defense trigger
        if (form.querySelector('[name="botcheck"]').checked) return;

        // Perform static text validations
        const name = nameEl.value.trim();
        const email = emailEl.value.trim();
        const message = messageEl.value.trim();

        if (!name) { showStatus('error', 'Please enter your name.'); nameEl.focus(); return; }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showStatus('error', 'Please enter a valid email address.'); emailEl.focus(); return; }
        if (!message) { showStatus('error', 'Please enter a message.'); messageEl.focus(); return; }

        // Block form adjustments during transaction processes
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
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
                showStatus('success', 'Message sent successfully! I\'ll get back to you soon.');
                form.reset();
            } else {
                showStatus('error', 'Something went wrong. Please try again.');
            }
        } catch (err) {
            showStatus('error', 'Network error. Please check your connection and try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message';
        }
    });
}

// ==========================================
// INTERACTIVE TRANSITIONS & UTILITIES
// ==========================================
function initUIBehaviors() {
    // Dynamic anchors scrolling
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

    // Toggle navbar dark border on window scrolling thresholds
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.style.borderBottomColor = 'var(--ink)';
        } else {
            navbar.style.borderBottomColor = 'var(--hairline)';
        }
    });

    // Stagger observers elements targets
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

    init3DCardTilt();
    initParallax();
}

/**
 * Particle background logic. Disabled in current build per luxury editorial rules.
 */
function initFireParticles() {
    const canvas = document.getElementById('fire-particles');
    if (!canvas) return; // Exit immediately to save process execution cycles
}

/**
 * Removes preloader element once page load operations complete.
 */
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
            }, 500);
        });
    }
}

/**
 * Updates vertical position matrix parameters on scroll calculations.
 */
function initParallax() {
    // Parallax disabled as hero text content is now positioned in the flow below the video viewport.
}

/**
 * Triggers interactive geometric tilts on desktop grids based on mouse movement coordinates.
 */
function init3DCardTilt() {
    const isMobile = window.innerWidth < 1024;
    if (isMobile) return;

    document.addEventListener('mousemove', (e) => {
        const card = e.target.closest('.project-card, .skill-card, .cert-gallery-card, .edu-card');
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        card.style.transition = 'transform 0.05s ease-out';
        card.style.boxShadow = 'var(--shadow-hover)';
        card.style.zIndex = '10';
    });

    document.addEventListener('mouseout', (e) => {
        const card = e.target.closest('.project-card, .skill-card, .cert-gallery-card, .edu-card');
        if (!card) return;

        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        card.style.transition = 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)';
        card.style.boxShadow = '';
        card.style.zIndex = '';
    });
}

// ==========================================
// ADMIN DASHBOARD CORE CONTROLLERS
// ==========================================
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

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    // Dashboard tab-routing triggers
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

    // Bind General Settings Save buttons
    const saveGenBtn = document.querySelector('.save-general-btn');
    if (saveGenBtn) {
        saveGenBtn.addEventListener('click', () => {
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
    }

    // Bind Social Links Save buttons
    const saveLinksBtn = document.querySelector('.save-links-btn');
    if (saveLinksBtn) {
        saveLinksBtn.addEventListener('click', () => {
            portfolioData.links.linkedin = document.getElementById('input-link-linkedin').value;
            portfolioData.links.github = document.getElementById('input-link-github').value;
            const igEl = document.getElementById('input-link-instagram');
            if (igEl) portfolioData.links.instagram = igEl.value;
            portfolioData.links.email = document.getElementById('input-link-email').value;

            saveData();
            renderLinks();
            alert('Links saved!');
        });
    }

    // Configure new item addition triggers
    const addSkillBtn = document.getElementById('add-skill-btn');
    if (addSkillBtn) {
        addSkillBtn.addEventListener('click', () => {
            const newId = Date.now();
            portfolioData.skills.push({ id: newId, name: "New Skill", category: "Category", icon: "fa-solid fa-code" });
            saveData();
            renderAdminSkills();
            renderSkills();
        });
    }

    const addProjBtn = document.getElementById('add-project-btn');
    if (addProjBtn) {
        addProjBtn.addEventListener('click', () => {
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
    }

    const addCertBtn = document.getElementById('add-cert-btn');
    if (addCertBtn) {
        addCertBtn.addEventListener('click', () => {
            const newId = Date.now();
            portfolioData.certifications.push({
                id: newId,
                name: "New Certification",
                organization: "Organization",
                year: "2026",
                link: ""
            });
            saveData();
            renderAdminCertifications();
            renderCertifications();
        });
    }
}

/**
 * Loads values from database into configuration input elements.
 */
function populateAdminForms() {
    document.getElementById('input-logo').value = portfolioData.general.logo;
    document.getElementById('input-tagline').value = portfolioData.general.tagline;
    document.getElementById('input-title').value = portfolioData.general.title;

    const inputSubtitleEl = document.getElementById('input-subtitle');
    if (inputSubtitleEl) inputSubtitleEl.value = portfolioData.general.subtitle || '';

    document.getElementById('input-about1').value = portfolioData.general.about1;
    document.getElementById('input-about2').value = portfolioData.general.about2;
    document.getElementById('input-contact-text').value = portfolioData.general.contactText;
    document.getElementById('input-footer').value = portfolioData.general.footerText;

    document.getElementById('input-link-linkedin').value = portfolioData.links.linkedin;
    document.getElementById('input-link-github').value = portfolioData.links.github;
    const igEl = document.getElementById('input-link-instagram');
    if (igEl) igEl.value = portfolioData.links.instagram || '';
    document.getElementById('input-link-email').value = portfolioData.links.email;

    renderAdminSkills();
    renderAdminProjects();
    renderAdminCertifications();
}

/**
 * Renders items dynamically inside the Admin Skills configuration manager.
 */
function renderAdminSkills() {
    const list = document.getElementById('admin-skills-list');
    if (!list) return;
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

/**
 * Renders items dynamically inside the Admin Projects configuration manager.
 */
function renderAdminProjects() {
    const list = document.getElementById('admin-projects-list');
    if (!list) return;
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

/**
 * Renders items dynamically inside the Admin Credentials configuration manager.
 */
function renderAdminCertifications() {
    const list = document.getElementById('admin-certs-list');
    if (!list) return;
    list.innerHTML = '';

    portfolioData.certifications.forEach((cert, i) => {
        if (typeof cert === 'string') {
            cert = { id: Date.now() + i, name: cert, organization: '', category: '', certificateLink: '', previewLink: '' };
            portfolioData.certifications[i] = cert;
        }

        const div = document.createElement('div');
        div.className = 'admin-list-item';
        const linkPreview = cert.certificateLink && cert.certificateLink.trim() !== "" ? `<a href="${cert.certificateLink}" target="_blank" style="color:var(--primary); font-size: 0.9rem;"><i class="fa-solid fa-link"></i> Link Preview</a>` : '<span style="color: #999; font-size: 0.9rem;">No link added yet</span>';
        div.innerHTML = `
            <button class="delete-item-btn" onclick="deleteCert(${cert.id})">Delete</button>
            <div class="admin-group">
                <label><i class="fa-solid fa-certificate"></i> Certification Name</label>
                <input type="text" value="${cert.name}" onchange="updateCert(${cert.id}, 'name', this.value)" placeholder="e.g., AWS Solutions Architect">
            </div>
            <div class="admin-group">
                <label><i class="fa-solid fa-link"></i> Certificate Link</label>
                <input type="url" value="${cert.certificateLink || ''}" onchange="updateCert(${cert.id}, 'certificateLink', this.value)" placeholder="https://example.com/certificate">
                <small style="color: #999; margin-top: 0.5rem; display: block;">Add the URL to view/verify your certificate. ${linkPreview}</small>
            </div>
        `;
        list.appendChild(div);
    });
}

// Global hook triggers for Admin actions (required for inline onchange callbacks)
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

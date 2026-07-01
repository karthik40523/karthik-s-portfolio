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
const DATA_VERSION = 21; 

// Initial schema blueprint served on first load or database reset
const defaultData = {
    version: DATA_VERSION,
    general: {
        logo: "favicon.svg",
        tagline: "Software Developer | Full-Stack | AI",
        title: 'Building <span class="highlight">AI-Powered</span> Full-Stack Solutions',
        subtitle: "",
        about1: "Software Developer with experience in building full-stack applications using React, Flask, and PostgreSQL. Skilled in LLM integration, SQL query optimization, and cloud-based backend services.",
        about2: "Passionate about developing scalable, secure, and data-driven systems. Whether it's crafting multi-LLM pipelines, building intelligent browser extensions, or designing robust backend architectures — I thrive on solving complex problems with elegant engineering.",
        contactText: "Have a project in mind or want to collaborate? Let's connect.",
        footerText: "© 2026 G. Karthik Kumar Reddy. All Rights Reserved."
    },
    skills: [
        { id: 1, name: "Java", category: "Languages", svg: "java" },
        { id: 2, name: "SQL", category: "Languages", svg: "sql" },
        { id: 3, name: "Spring Boot", category: "Backend", svg: "springboot" },
        { id: 4, name: "Hibernate", category: "Backend", svg: "hibernate" },
        { id: 5, name: "REST APIs", category: "Backend", svg: "restapi" },
        { id: 6, name: "React.js", category: "Frontend", svg: "react" },
        { id: 7, name: "HTML5", category: "Frontend", svg: "html5" },
        { id: 8, name: "CSS3", category: "Frontend", svg: "css3" },
        { id: 9, name: "JavaScript", category: "Frontend", svg: "javascript" },
        { id: 10, name: "MySQL", category: "Databases", svg: "mysql" },
        { id: 11, name: "Supabase", category: "Databases", svg: "supabase" },
        { id: 12, name: "Git", category: "Tools & Platforms", svg: "git" },
        { id: 13, name: "GitHub", category: "Tools & Platforms", svg: "github" },
        { id: 14, name: "IntelliJ IDEA", category: "Tools & Platforms", svg: "intellij" }
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
 * SVG icon map for tech stack items — inline SVGs for crisp rendering at any size.
 */
const SKILL_SVGS = {
    java: `<svg viewBox="0 0 128 128"><path fill="#EA2D2E" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/><path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.793 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"/><path fill="#EA2D2E" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"/><path fill="#EA2D2E" d="M76.491 1.587S89.459 14.563 64.188 33.21c-20.266 14.98-4.621 23.528-.004 33.293C52.515 55.534 43.467 46.15 48.877 37.47 56.713 24.636 80.842 18.384 76.491 1.587z"/><path fill="#EA2D2E" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"/></svg>`,
    sql: `<svg viewBox="0 0 64 64"><path fill="#4479A1" d="M32 6C18.745 6 8 10.477 8 16v32c0 5.523 10.745 10 24 10s24-4.477 24-10V16c0-5.523-10.745-10-24-10z" opacity=".2"/><ellipse cx="32" cy="16" rx="24" ry="10" fill="#4479A1"/><path fill="#4479A1" d="M56 16v32c0 5.523-10.745 10-24 10S8 53.523 8 48V16" fill="none" stroke="#4479A1" stroke-width="2"/><path fill="none" stroke="#fff" stroke-width="2" d="M8 16c0 5.523 10.745 10 24 10s24-4.477 24-10"/><path fill="none" stroke="#fff" stroke-width="2" d="M8 28c0 5.523 10.745 10 24 10s24-4.477 24-10"/><path fill="none" stroke="#fff" stroke-width="2" d="M8 40c0 5.523 10.745 10 24 10s24-4.477 24-10"/><text x="32" y="38" text-anchor="middle" fill="#fff" font-size="14" font-weight="700" font-family="Inter,sans-serif">SQL</text></svg>`,
    springboot: `<svg viewBox="0 0 128 128"><path fill="#6DB33F" d="M116.452 6.643a59.104 59.104 0 0 1-6.837 12.136A64.249 64.249 0 0 0 64.205-.026C28.984-.026 0 28.958 0 64.179a64.088 64.088 0 0 0 19.88 46.412l1.105.96a64.264 64.264 0 0 0 86.907-3.326 64.098 64.098 0 0 0 18.108-44.046c0-20.56-9.83-39.834-27.161-52.746l-.002.004a59.154 59.154 0 0 1 17.615-4.794zM97.1 116.339a57.857 57.857 0 0 1-33.108 10.47 57.856 57.856 0 0 1-41.154-17.022l-1.105-.96A57.65 57.65 0 0 1 6.39 64.179a57.855 57.855 0 0 1 57.815-57.815A57.856 57.856 0 0 1 105.36 23.39c-11.78-5.867-34.718-6.473-53.275 5.453C30.56 43.727 22.325 68.18 34.3 89.836c.96 1.605 1.92 3.21 3.093 4.814l1.281 1.726c17.156 21.056 44.817 24.883 58.426 20.003v-.04z"/><path fill="#6DB33F" d="M51.893 91.14l-1.281-1.726a47.36 47.36 0 0 1-2.773-4.334C36.592 64.06 44.122 41.223 65.645 27.445c17.674-11.322 39.145-11.061 51.08-5.015a52.4 52.4 0 0 0-5.866-4.455l-.12-.08c-16.073-10.87-38.653-10.775-56.14.053C33.471 31.036 24.673 55.553 36.152 76.963c.96 1.605 2.08 3.21 3.253 4.814l1.281 1.726c13.55 16.651 33.96 22.404 49.292 20.144-14.08 3.493-26.027-.04-38.085-12.507z"/></svg>`,
    hibernate: `<svg viewBox="0 0 128 128"><path fill="#59666C" d="M22 0l28 48.5L22 97h28.5l28-48.5L50.5 0zm35.5 31L85.5 79l-28 49H86l28-49-28-48z"/></svg>`,
    restapi: `<svg viewBox="0 0 64 64"><rect width="64" height="64" rx="8" fill="#3B82F6"/><path d="M14 20h8v4h-8zm0 10h12v4H14zm0 10h8v4h-8z" fill="#fff" opacity=".6"/><path d="M36 18h14a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H36" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="M36 36h14a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H36" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><circle cx="46" cy="25" r="2" fill="#fff"/><circle cx="46" cy="43" r="2" fill="#fff"/><path d="M32 18v28" stroke="#fff" stroke-width="2" stroke-dasharray="3 3" opacity=".5"/></svg>`,
    react: `<svg viewBox="0 0 128 128"><g fill="#61DAFB"><circle cx="64" cy="64" r="11.4"/><path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2 2.3-4.1 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.1 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2-2.3 4.1-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22 10 22 15.6 0 4.7-5.8 9.7-15.6 13.4z"/></g></svg>`,
    html5: `<svg viewBox="0 0 128 128"><path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"/><path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"/><path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"/><path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z"/></svg>`,
    css3: `<svg viewBox="0 0 128 128"><path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543z"/><path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16z"/><path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114H64.001z"/><path fill="#EBEBEB" d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018z"/><path fill="#fff" d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881z"/><path fill="#EBEBEB" d="M64.048 23.435v13.831H30.64l-.277-3.108-.634-7.012-.331-3.711zm-.047 27.994v13.831H48.792l-.277-3.108-.634-7.012-.331-3.711z"/></svg>`,
    javascript: `<svg viewBox="0 0 128 128"><path fill="#F0DB4F" d="M1.408 1.408h125.184v125.184H1.408z"/><path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.21 58.943l-.009-.001c-.002 0-.003 0-.009-.001H69.2c-.009 11.247-.003 22.491-.012 33.735-.142 2.317.036 4.831-.399 7.018-.966 3.458-3.399 4.454-6.312 3.715-2.975-.78-4.449-2.547-5.879-5.209-.398-.659-.741-1.348-1.202-2.054l-9.199 5.626c1.533 3.264 3.741 6.112 6.716 8.016 4.407 2.835 9.737 3.738 15.265 2.224 3.633-1.148 6.766-3.523 8.282-7.102 2.104-4.677 1.641-10.337 1.639-15.734.012-10.038.004-20.078.004-30.157l.002-.077z"/></svg>`,
    mysql: `<svg viewBox="0 0 128 128"><path fill="#00618A" d="M2.001 90.458h4.108V74.235l6.36 14.087c.725 1.663 1.753 2.282 3.654 2.282 1.9 0 2.907-.619 3.632-2.282l6.36-14.087v16.223h4.108V72.044c0-1.663-.78-2.478-2.257-2.862-3.456-.884-5.754.147-6.76 2.478l-6.51 14.48-6.36-14.48c-.929-2.331-3.306-3.362-6.762-2.478C.779 69.566 0 70.381 0 72.044v18.414h2.001zm35.791-14.777h-.15c0-4.697 3.164-7.274 6.956-7.274 1.621 0 3.312.377 4.258.916l1.398-3.562c-1.17-.57-3.085-1.136-5.656-1.136-6.583 0-11.397 4.149-11.397 11.143 0 7.183 4.588 10.836 10.695 10.836 2.718 0 5.063-.672 6.36-1.396l-.928-3.416c-1.17.57-2.792.996-4.71.996-4.168-.001-7.826-2.332-7.826-7.107zm25.942-11.312c-6.136 0-10.249 4.542-10.249 11.263 0 6.808 4.112 10.985 10.249 10.985 6.136 0 10.249-4.177 10.249-10.985 0-6.722-4.113-11.263-10.249-11.263zm0 18.665c-3.829 0-5.877-3.269-5.877-7.402 0-4.134 2.048-7.68 5.877-7.68s5.877 3.546 5.877 7.68c0 4.133-2.048 7.402-5.877 7.402z"/><path fill="#E48E00" d="M83.671 85.226c-2.57-.232-4.319-.848-5.729-1.98V72.044c0-1.663.78-2.478 2.258-2.862 3.455-.884 5.753.147 6.76 2.478l6.36 14.48 6.51-14.48c.93-2.331 3.307-3.362 6.762-2.478 1.477.384 2.258 1.199 2.258 2.862v18.414h-4.109V74.235l-6.36 14.087c-.724 1.663-1.731 2.282-3.632 2.282-1.9 0-2.929-.619-3.654-2.282l-6.36-14.087v14.468c0 .844-.024 1.606-.024 2.503v8.277c0 .647.093 1.245.24 1.794.473 2.269 1.753 3.803 4.075 4.858 1.976.895 3.282 1.142 3.282 1.142l-1.101 3.746s-1.619-.371-2.535-.727c-3.793-1.467-5.898-3.755-6.762-6.771-.27-.949-.423-1.975-.423-3.042v-4.462h.184zm30.353 5.23h4.108V72.044c0-1.663-.78-2.478-2.258-2.862-3.455-.884-5.753.147-6.76 2.478l-6.36 14.48h.001v4.318h.001l6.508-14.405v14.18h4.76z"/></svg>`,
    supabase: `<svg viewBox="0 0 109 113" fill="none"><path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874l-43.151 54.347z" fill="url(#a)"/><path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874l-43.151 54.347z" fill="url(#b)" fill-opacity=".2"/><path d="M45.317 2.071c2.86-3.601 8.657-1.628 8.726 2.97l.442 67.251H9.83c-8.19 0-12.759-9.46-7.665-15.875L45.317 2.071z" fill="#3ECF8E"/><defs><linearGradient id="a" x1="53.974" y1="54.974" x2="94.163" y2="71.829" gradientUnits="userSpaceOnUse"><stop stop-color="#249361"/><stop offset="1" stop-color="#3ECF8E"/></linearGradient><linearGradient id="b" x1="36.156" y1="30.578" x2="54.484" y2="72.263" gradientUnits="userSpaceOnUse"><stop/><stop offset="1" stop-opacity="0"/></linearGradient></defs></svg>`,
    git: `<svg viewBox="0 0 128 128"><path fill="#F34F29" d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 0 1-13.683 0 9.677 9.677 0 0 1-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 0 1 2.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 0 1 3.167-2.11V47.333a9.581 9.581 0 0 1-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 0 0 0 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 0 0-.001-11.501z"/></svg>`,
    github: `<svg viewBox="0 0 128 128"><g fill="#fff"><path fill-rule="evenodd" clip-rule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"/><path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zm2.382 3.477c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.528-.486-.675-1.18-.345-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.544zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.878 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.882zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.127.714-.123 1.354.17 1.444.663z"/></g></svg>`,
    intellij: `<svg viewBox="0 0 128 128"><defs><linearGradient id="ij-a" x1="20.4" y1="114.2" x2="80.4" y2="76.6" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#F97A12"/><stop offset=".07" stop-color="#B07B58"/><stop offset=".15" stop-color="#577BAE"/><stop offset=".21" stop-color="#1E7CE5"/><stop offset=".25" stop-color="#087CFA"/></linearGradient><linearGradient id="ij-b" x1="87.1" y1="5" x2="58.5" y2="72.5" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#F97A12"/><stop offset=".07" stop-color="#CB7A3E"/><stop offset=".15" stop-color="#9B7B6A"/><stop offset=".24" stop-color="#757B91"/><stop offset=".35" stop-color="#587BB0"/><stop offset=".47" stop-color="#447BC9"/><stop offset=".61" stop-color="#367BDC"/><stop offset=".78" stop-color="#2E7BE8"/><stop offset="1" stop-color="#2B7BED"/></linearGradient><linearGradient id="ij-c" x1="18.6" y1="35" x2="95.6" y2="88" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FE315D"/><stop offset=".04" stop-color="#CB417E"/><stop offset=".1" stop-color="#9E4E9B"/><stop offset=".16" stop-color="#6F5EB8"/><stop offset=".22" stop-color="#5065CE"/><stop offset=".29" stop-color="#3A6BDE"/><stop offset=".37" stop-color="#2B6FEA"/><stop offset=".48" stop-color="#2171F1"/><stop offset=".66" stop-color="#1D72F6"/><stop offset="1" stop-color="#1C72F7"/></linearGradient></defs><path fill="url(#ij-a)" d="M23.7 118.6L0 95.4l16.4-27.2 32.8 27.5z"/><path fill="url(#ij-b)" d="M128 49.2L121.1 2.5 75.8 0 42.4 32l18.7 52 44 18.7z"/><path fill="url(#ij-c)" d="M61.1 84L23.5 104.7 35 59l-22.6-25L35.2 8l35.6 23.7L128 49.2 61.1 84z"/><path d="M25.6 25.6h76.8v76.8H25.6z"/><path fill="#fff" d="M33.6 88.8h28.8v4.8H33.6zm.4-57.6h10.7c7.1 0 11.4 4 11.4 9.8v.1c0 6.6-5.4 10-12 10h-4.9v10.1h-5.2V31.2zm10.3 15.4c4.3 0 6.7-2.5 6.7-5.6v-.1c0-3.6-2.6-5.6-6.8-5.6h-5v11.3h5.1zM66 31.2H71v37.1H66z"/></svg>`
};

/**
 * Generates tech stack bento layout elements dynamically, grouped by category.
 */
function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;
    container.innerHTML = '';

    // Group skills by category while preserving order
    const categoryOrder = [];
    const categoryMap = {};
    portfolioData.skills.forEach(skill => {
        if (!categoryMap[skill.category]) {
            categoryMap[skill.category] = [];
            categoryOrder.push(skill.category);
        }
        categoryMap[skill.category].push(skill);
    });

    categoryOrder.forEach(category => {
        const groupEl = document.createElement('div');
        groupEl.className = 'skills-category-group fade-in-up visible';

        const headerEl = document.createElement('div');
        headerEl.className = 'skills-category-header';
        headerEl.innerHTML = `<span class="skills-category-label">${category}</span>`;
        groupEl.appendChild(headerEl);

        const gridEl = document.createElement('div');
        gridEl.className = 'skills-category-grid';

        categoryMap[category].forEach(skill => {
            const card = document.createElement('div');
            card.className = 'skill-card';
            const svgMarkup = SKILL_SVGS[skill.svg] || '';
            card.innerHTML = `
                <div class="skill-svg-icon">${svgMarkup}</div>
                <div class="skill-name">${skill.name}</div>
            `;
            gridEl.appendChild(card);
        });

        groupEl.appendChild(gridEl);
        container.appendChild(groupEl);
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
            portfolioData.skills.push({ id: newId, name: "New Skill", category: "Category", svg: "" });
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
                <label>SVG Key (e.g. java, react, git)</label>
                <input type="text" value="${skill.svg || ''}" onchange="updateSkill(${skill.id}, 'svg', this.value)">
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

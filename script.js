// Synth Audio Engine using Web Audio API (No files to load, completely dynamic)
let audioContext = null;
let soundEnabled = false;

function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playClick() {
  if (!soundEnabled) return;
  initAudio();
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, audioContext.currentTime);
  osc.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.05);
  
  gain.gain.setValueAtTime(0.05, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
  
  osc.connect(gain);
  gain.connect(audioContext.destination);
  
  osc.start();
  osc.stop(audioContext.currentTime + 0.05);
}

function playAccessGrantedSound() {
  if (!soundEnabled) return;
  initAudio();
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  const now = audioContext.currentTime;
  
  // High-tech rising arpeggio
  const notes = [220, 330, 440, 660, 880, 1320];
  notes.forEach((freq, idx) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now + idx * 0.08);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.2, now + idx * 0.08 + 0.2);
    
    // Low-pass filter for warmer sound
    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1500, now);
    
    gain.gain.setValueAtTime(0.08, now + idx * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);
    
    osc.start(now + idx * 0.08);
    osc.stop(now + idx * 0.08 + 0.3);
  });
}

function playTerminalBeep() {
  if (!soundEnabled) return;
  initAudio();
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(800, audioContext.currentTime);
  
  gain.gain.setValueAtTime(0.02, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.08);
  
  osc.connect(gain);
  gain.connect(audioContext.destination);
  
  osc.start();
  osc.stop(audioContext.currentTime + 0.08);
}

// Particle Background Canvas
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 65;
const maxDistance = 120;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.radius = Math.random() * 2 + 1;
    this.color = Math.random() > 0.3 ? 'rgba(0, 255, 102, 0.45)' : 'rgba(182, 36, 255, 0.45)';
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < maxDistance) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        
        // Gradient color for connecting lines
        const grad = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
        grad.addColorStop(0, particles[i].color.replace('0.45', '0.12'));
        grad.addColorStop(1, particles[j].color.replace('0.45', '0.12'));
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }
  
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Terminal Boot Sequence Log lines
const bootLogs = [
  { text: "ECHO_CORE [Version 4.9.112-SEC-AMDGPU]", type: "info" },
  { text: "Initializing kernel subsystems... DONE", type: "success" },
  { text: "Loading network configuration and dynamic routes...", type: "info" },
  { text: "Secure tunnel: establishing connection to EC2 WireGuard VPN gateway...", type: "info" },
  { text: "Tunnel Status: ESTABLISHED | Interface: wg0 | IP: 10.8.0.1", type: "success" },
  { text: "Scanning local interfaces for unauthorized listeners...", type: "info" },
  { text: "WARNING: Port 22 SSH listening detected (Cowrie honeypot active)", type: "warning" },
  { text: "Starting AI-based SSH connection analyzer...", type: "info" },
  { text: "Behavior module: Random Forest loaded. Accuracy target = 98.4%", type: "success" },
  { text: "Fetching repository index from API: github.com/b-satwik...", type: "info" },
  { text: "Repositories verified: Cowrie honeypot, Steganography, WireGuard, Phishing Scanner", type: "success" },
  { text: "Decrypting portfolio payload using key RSA-4096...", type: "info" },
  { text: "Verifying SHA-256 hash checksums...", type: "info" },
  { text: "Payload signature integrity: VERIFIED", type: "success" },
  { text: "==========================================", type: "info" },
  { text: "SYSTEM STATUS: SECURE | CORE SYSTEM READY", type: "success" }
];

const bootContent = document.getElementById("boot-log-content");
let logIndex = 0;

function printBootLog() {
  if (logIndex < bootLogs.length) {
    const log = bootLogs[logIndex];
    const line = document.createElement("div");
    line.className = `boot-line ${log.type}`;
    line.textContent = `> ${log.text}`;
    
    // Add typewriter cursor placeholder to moving lines
    const cursor = document.querySelector(".boot-cursor");
    bootContent.insertBefore(line, cursor);
    
    // Auto-scroll boot terminal
    const bootContainer = document.querySelector(".boot-content");
    bootContainer.scrollTop = bootContainer.scrollHeight;
    
    playTerminalBeep();
    
    logIndex++;
    setTimeout(printBootLog, Math.random() * 150 + 80);
  } else {
    // Show ACCESS GRANTED panel
    document.getElementById("access-panel").style.display = "block";
    const bootContainer = document.querySelector(".boot-content");
    bootContainer.scrollTop = bootContainer.scrollHeight;
  }
}

// Start Boot Sequence on Load
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(printBootLog, 1000);
});

// Access Button Event Listener
const accessBtn = document.getElementById("access-btn");
accessBtn.addEventListener("click", () => {
  playAccessGrantedSound();
  const overlay = document.getElementById("boot-overlay");
  overlay.style.opacity = 0;
  setTimeout(() => {
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
    // Trigger scroll reveals initially
    revealElements();
  }, 800);
});

// Audio Toggle Controller
const audioToggle = document.getElementById("audio-toggle");
audioToggle.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    audioToggle.innerHTML = '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="18" width="18"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
    audioToggle.style.color = 'var(--accent-green)';
    audioToggle.style.borderColor = 'var(--accent-green)';
    initAudio();
  } else {
    audioToggle.innerHTML = '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="18" width="18"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';
    audioToggle.style.color = 'var(--text-main)';
    audioToggle.style.borderColor = 'var(--border-color)';
  }
  playClick();
});

// Click Sound Event Binder for Interactive Elements
document.addEventListener("click", (e) => {
  if (e.target.closest("a") || e.target.closest("button") || e.target.closest(".blog-nav-item")) {
    playClick();
  }
});

// Global Databases
let projectsData = [];
let blogPostsData = [];

// Fetch Projects and Blog posts data
async function loadData() {
  try {
    const response = await fetch("projects.json");
    const data = await response.json();
    projectsData = data.projects;
    blogPostsData = data.blog_posts;
    
    renderProjects();
    renderBlogSidebar();
    
    // Load initial blog post
    if (blogPostsData.length > 0) {
      loadBlogPost(blogPostsData[0].id);
    }
    
    // After rendering projects, attempt to fetch GitHub API data for real-time stats
    fetchGitHubStats();
  } catch (error) {
    console.error("Error loading portfolio data:", error);
  }
}

// Render Project Cards
function renderProjects() {
  const container = document.getElementById("projects-container");
  container.innerHTML = "";
  
  projectsData.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card neon-border scroll-reveal";
    card.dataset.repo = p.repo;
    
    const tagsHTML = p.tech_stack.map(tag => `<span class="project-tag">${tag}</span>`).join("");
    
    card.innerHTML = `
      <div class="project-header">
        <h3 class="project-title">${p.name}</h3>
        <div class="project-icon">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="20" width="20">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
      </div>
      <div class="project-body">
        <p class="project-desc">${p.description}</p>
        <div class="project-snippet">${p.command}</div>
        <div class="project-tags">${tagsHTML}</div>
        <div class="project-footer">
          <div class="github-stats" id="stats-${p.repo}">
            <span class="stat-item">
              <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="14" width="14"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span class="stars-val">--</span>
            </span>
            <span class="stat-item">
              <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="14" width="14"><path d="M15 14c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3zm-9 0c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3zm3-9h6"></path><circle cx="6" cy="5" r="3"></circle><circle cx="18" cy="5" r="3"></circle></svg>
              <span class="forks-val">--</span>
            </span>
          </div>
          <a href="https://github.com/b-satwik/${p.repo}" target="_blank" class="btn btn-secondary" style="padding: 6px 14px; font-size: 0.75rem;">
            ACCESS CODE
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="12" width="12"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Fetch GitHub Stats dynamically (Stars, Forks, Updates)
async function fetchGitHubStats() {
  try {
    const res = await fetch("https://api.github.com/users/b-satwik/repos?per_page=100");
    if (!res.ok) throw new Error("GitHub API limit exceeded or network failure");
    const repos = await res.json();
    
    repos.forEach(repo => {
      const statsEl = document.getElementById(`stats-${repo.name}`);
      if (statsEl) {
        statsEl.querySelector(".stars-val").textContent = repo.stargazers_count;
        statsEl.querySelector(".forks-val").textContent = repo.forks_count;
      }
    });
  } catch (err) {
    console.warn("GitHub dynamic sync failed: fallback values loaded.", err);
    // Fill fallback defaults
    projectsData.forEach(p => {
      const statsEl = document.getElementById(`stats-${p.repo}`);
      if (statsEl) {
        statsEl.querySelector(".stars-val").textContent = "0";
        statsEl.querySelector(".forks-val").textContent = "0";
      }
    });
  }
}

// Render Blog Sidebar
function renderBlogSidebar() {
  const sidebar = document.getElementById("blog-sidebar");
  sidebar.innerHTML = "";
  
  blogPostsData.forEach((post, index) => {
    const item = document.createElement("div");
    item.className = `blog-nav-item ${index === 0 ? "active" : ""}`;
    item.dataset.id = post.id;
    item.innerHTML = `
      <span>${post.title}</span>
      <span class="blog-nav-meta">${post.category} // ${post.date}</span>
    `;
    
    item.addEventListener("click", () => {
      document.querySelectorAll(".blog-nav-item").forEach(el => el.classList.remove("active"));
      item.classList.add("active");
      loadBlogPost(post.id);
    });
    
    sidebar.appendChild(item);
  });
}

// Dynamic Typing Load of Blog Content
let typingTimeout = null;

function loadBlogPost(id) {
  const post = blogPostsData.find(p => p.id === id);
  if (!post) return;
  
  const display = document.getElementById("terminal-display");
  display.innerHTML = "";
  display.className = "terminal-display"; // remove read-mode while typing
  
  // Clear any existing typing loops
  if (typingTimeout) clearTimeout(typingTimeout);
  
  const commandLine = `guest@echo-security:~$ cat blogs/${post.id}.md\n`;
  const decryptLine = `[Decrypting document payload with RSA-4096 signature verification...]\n`;
  const successLine = `[Payload Decrypted. Document size: ${post.content.length} bytes]\n\n`;
  
  let i = 0;
  const fullInitialStr = commandLine + decryptLine + successLine;
  
  function typeIntro() {
    if (i < fullInitialStr.length) {
      // Handle line breaks
      const char = fullInitialStr.charAt(i);
      if (char === '\n') {
        display.innerHTML += '<br>';
      } else {
        display.innerHTML += char;
      }
      display.scrollTop = display.scrollHeight;
      i++;
      typingTimeout = setTimeout(typeIntro, 15);
    } else {
      // Type intro finished, convert Markdown-like text to rich HTML inside terminal
      display.className = "terminal-display read-mode";
      display.innerHTML = parseMarkdown(post.content);
      
      // Add command line inputs at bottom
      const promptLine = document.createElement("div");
      promptLine.className = "terminal-prompt-line";
      promptLine.innerHTML = `guest@echo-security:~$ <span class="boot-cursor"></span>`;
      display.appendChild(promptLine);
      
      display.scrollTop = 0; // scroll back to top of document
    }
  }
  
  typeIntro();
}

// Basic Custom Markdown Parser for blog content
function parseMarkdown(md) {
  let html = md;
  
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  
  // Bold
  html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
  
  // Code Blocks
  html = html.replace(/```text([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');
  html = html.replace(/```bash([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');
  html = html.replace(/```python([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');
  html = html.replace(/```ini([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');
  
  // Inline Code
  html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');
  
  // Paragraphs (surround unformatted text blocks with p tags)
  const paragraphs = html.split('\n\n');
  const formattedParagraphs = paragraphs.map(p => {
    if (p.trim().startsWith('<h') || p.trim().startsWith('<pre')) {
      return p;
    }
    // Replace markdown double spaces/newlines with p
    return `<p>${p.replace(/\n/g, '<br>')}</p>`;
  });
  
  return formattedParagraphs.join('\n');
}

// Scroll Reveal Observer
const revealElements = () => {
  const elements = document.querySelectorAll(".scroll-reveal");
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight * 0.9) {
      el.classList.add("revealed");
      // If the revealed element is a skill section, animate progress bars
      if (el.classList.contains("skills-grid")) {
        document.querySelectorAll(".skill-bar-inner").forEach(bar => {
          bar.style.width = bar.parentElement.previousElementSibling.querySelector(".skill-percent").textContent;
        });
      }
    }
  });
};

window.addEventListener("scroll", revealElements);

// Mobile Nav Toggle
const mobileNavToggle = document.getElementById("mobile-nav-toggle");
const navMenu = document.querySelector("nav");
mobileNavToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  mobileNavToggle.textContent = navMenu.classList.contains("active") ? "✕" : "☰";
});

// Close Mobile Nav on menu link click
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    mobileNavToggle.textContent = "☰";
  });
});

// Hero Typing Effect (Loops security warnings/quotes)
const typingElement = document.getElementById("typing-effect");
const phrases = [
  "status: monitor_active // encrypt: AES_256",
  "analyzing honeypot command queues...",
  "defending interfaces. packets routing wg0...",
  "initializing decryption protocols...",
  "integrity: valid. systems operational."
];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;

function typeHeroPhrase() {
  const currentPhrase = phrases[phraseIdx];
  
  if (isDeleting) {
    typingElement.textContent = currentPhrase.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typingElement.textContent = currentPhrase.substring(0, charIdx + 1);
    charIdx++;
  }
  
  let typingSpeed = isDeleting ? 30 : 60;
  
  if (!isDeleting && charIdx === currentPhrase.length) {
    typingSpeed = 2200; // Pause at end of phrase
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    typingSpeed = 500; // Pause before typing next phrase
  }
  
  setTimeout(typeHeroPhrase, typingSpeed);
}

setTimeout(typeHeroPhrase, 3000);

// Contact Shell Form Submission
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const name = document.getElementById("sender-name").value;
  const email = document.getElementById("sender-email").value;
  const message = document.getElementById("sender-message").value;
  
  formStatus.style.display = "block";
  formStatus.className = "form-status info";
  formStatus.textContent = "guest@echo-security:~$ ./send_message.sh --target protonmail";
  
  let step = 0;
  const logSteps = [
    `Connecting secure gateway: balasatwikcontact@proton.me...`,
    `Encrypting payload using recipient's public key (RSA-4096)...`,
    `Transmitting message logs packets. IP logged.`,
    `Status code: 200 SUCCESS. Mail transmitted.`
  ];
  
  const submitBtn = document.querySelector(".shell-submit-btn");
  submitBtn.disabled = true;
  submitBtn.style.opacity = 0.5;
  
  function animateSubmission() {
    if (step < logSteps.length) {
      const newLine = document.createElement("div");
      newLine.textContent = `> ${logSteps[step]}`;
      formStatus.appendChild(newLine);
      playTerminalBeep();
      step++;
      setTimeout(animateSubmission, 1000);
    } else {
      formStatus.className = "form-status success";
      const finalMsg = document.createElement("div");
      finalMsg.style.fontWeight = "bold";
      finalMsg.textContent = "Message transmitted successfully! Echo Satwik will respond shortly.";
      formStatus.appendChild(finalMsg);
      
      // Clear form
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.style.opacity = 1;
    }
  }
  
  setTimeout(animateSubmission, 800);
});

// Load everything on startup
loadData();

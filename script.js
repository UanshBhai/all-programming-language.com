// Language data with more comprehensive information
const languages = [
    {
        name: 'Python',
        description: 'A versatile language known for its simplicity and readability',
        icon: '🐍',
        category: 'general',
        version: '3.11.0',
        size: '25MB',
        popularity: 95,
        windowsCommand: 'winget install Python.Python.3.11',
        unixCommand: 'curl https://pyenv.run | bash',
        features: ['Data Science', 'Web Development', 'AI/ML', 'Automation']
    },
    {
        name: 'Node.js',
        description: 'JavaScript runtime built on Chrome\'s V8 engine',
        icon: '⚡',
        category: 'web',
        version: '18.17.0',
        size: '30MB',
        popularity: 90,
        windowsCommand: 'winget install OpenJS.NodeJS.LTS',
        unixCommand: 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash',
        features: ['Backend Development', 'Real-time Applications', 'API Development']
    },
    {
        name: 'Java',
        description: 'Popular language for enterprise applications',
        icon: '☕',
        category: 'general',
        version: '17.0.7',
        size: '150MB',
        popularity: 85,
        windowsCommand: 'winget install Oracle.JDK.17',
        unixCommand: 'curl -s "https://get.sdkman.io" | bash',
        features: ['Enterprise Applications', 'Android Development', 'Big Data']
    },
    {
        name: 'Go',
        description: 'Fast, statically typed language by Google',
        icon: '🔵',
        category: 'general',
        version: '1.21.0',
        size: '40MB',
        popularity: 80,
        windowsCommand: 'winget install GoLang.Go',
        unixCommand: 'curl -OL https://golang.org/dl/go1.21.0.linux-amd64.tar.gz',
        features: ['Cloud Native', 'Microservices', 'High Performance']
    },
    {
        name: 'Ruby',
        description: 'Dynamic language focused on simplicity and productivity',
        icon: '💎',
        category: 'web',
        version: '3.2.2',
        size: '35MB',
        popularity: 75,
        windowsCommand: 'winget install RubyInstallerTeam.RubyWithDevKit',
        unixCommand: 'curl -sSL https://get.rvm.io | bash -s stable',
        features: ['Web Development', 'Scripting', 'DevOps']
    },
    {
        name: 'Rust',
        description: 'Systems programming language focused on safety and performance',
        icon: '🦀',
        category: 'general',
        version: '1.71.0',
        size: '45MB',
        popularity: 70,
        windowsCommand: 'winget install Rust.Rust',
        unixCommand: 'curl --proto "=https" --tlsv1.2 -sSf https://sh.rustup.rs | sh',
        features: ['Systems Programming', 'WebAssembly', 'Embedded Systems']
    },
    {
        name: 'Swift',
        description: 'Modern language for iOS and macOS development',
        icon: '🕊️',
        category: 'mobile',
        version: '5.9.0',
        size: '60MB',
        popularity: 65,
        windowsCommand: 'winget install Swift.Swift',
        unixCommand: 'curl -s https://swift.org/builds/swift-5.9-release/ubuntu2004/swift-5.9-RELEASE/swift-5.9-RELEASE-ubuntu20.04.tar.gz | tar xz',
        features: ['iOS Development', 'macOS Development', 'Server-side Swift']
    },
    {
        name: 'R',
        description: 'Statistical programming language for data analysis',
        icon: '📊',
        category: 'data',
        version: '4.3.1',
        size: '50MB',
        popularity: 60,
        windowsCommand: 'winget install RProject.R',
        unixCommand: 'sudo apt-get install r-base',
        features: ['Data Analysis', 'Statistical Computing', 'Machine Learning']
    }
];

// State management
let state = {
    installedLanguages: [],
    currentSection: 'home',
    searchQuery: '',
    selectedCategory: 'all',
    installationInProgress: false,
    stats: {
        totalDownloads: 0,
        activeUsers: 0,
        successRate: 100
    }
};

// UI Functions
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    const targetSection = document.getElementById(sectionId);
    targetSection.classList.add('active');
    state.currentSection = sectionId;

    // Update active nav button
    document.querySelectorAll('.nav-button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`.nav-button[onclick="showSection('${sectionId}')"]`).classList.add('active');
}

function createLanguageCard(language) {
    const card = document.createElement('div');
    card.className = 'language-card animate__animated animate__fadeIn';
    
    const isInstalled = state.installedLanguages.includes(language.name);
    
    card.innerHTML = `
        <div class="flex items-center mb-4">
            <span class="text-4xl mr-4">${language.icon}</span>
            <div>
                <h2 class="text-2xl font-semibold text-gray-800">${language.name}</h2>
                <p class="text-sm text-gray-500">v${language.version} • ${language.size}</p>
            </div>
        </div>
        <p class="text-gray-600 mb-4">${language.description}</p>
        <div class="flex flex-wrap gap-2 mb-4">
            ${language.features.map(feature => `
                <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">${feature}</span>
            `).join('')}
        </div>
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
                <div class="w-24 bg-gray-200 rounded-full h-2 mr-2">
                    <div class="bg-blue-600 h-2 rounded-full" style="width: ${language.popularity}%"></div>
                </div>
                <span class="text-sm text-gray-500">${language.popularity}%</span>
            </div>
            <span class="text-sm text-gray-500">${language.category}</span>
        </div>
        <button
            class="install-button w-full py-2 px-4 rounded-md text-white font-medium ${
                isInstalled ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
            }"
            onclick="handleInstall('${language.name}')"
            id="install-${language.name.toLowerCase().replace(/\s+/g, '-')}"
            ${isInstalled ? 'disabled' : ''}
        >
            ${isInstalled ? 'Installed' : 'Install'}
        </button>
    `;
    
    return card;
}

function updateLanguagesGrid() {
    const grid = document.getElementById('languagesGrid');
    grid.innerHTML = '';
    
    const filteredLanguages = languages.filter(lang => {
        const matchesSearch = lang.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                            lang.description.toLowerCase().includes(state.searchQuery.toLowerCase());
        const matchesCategory = state.selectedCategory === 'all' || lang.category === state.selectedCategory;
        return matchesSearch && matchesCategory;
    });
    
    filteredLanguages.forEach((language, index) => {
        const card = createLanguageCard(language);
        card.style.animationDelay = `${index * 0.1}s`;
        grid.appendChild(card);
    });
}

function updateInstalledLanguages() {
    const grid = document.getElementById('installedLanguages');
    grid.innerHTML = '';
    
    if (state.installedLanguages.length === 0) {
        grid.innerHTML = `
            <div class="text-center py-12 animate__animated animate__fadeIn">
                <i class="fas fa-box-open text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-500">No languages installed yet</p>
            </div>
        `;
        return;
    }
    
    state.installedLanguages.forEach((languageName, index) => {
        const language = languages.find(lang => lang.name === languageName);
        if (language) {
            const card = createLanguageCard(language);
            card.style.animationDelay = `${index * 0.1}s`;
            grid.appendChild(card);
        }
    });
}

function updateSystemInfo() {
    const systemInfo = document.getElementById('systemInfo');
    const os = navigator.platform;
    const userAgent = navigator.userAgent;
    
    systemInfo.innerHTML = `
        <div class="space-y-2 animate__animated animate__fadeIn">
            <p class="flex items-center">
                <i class="fas fa-desktop text-blue-600 mr-2"></i>
                <strong>Operating System:</strong> ${os}
            </p>
            <p class="flex items-center">
                <i class="fas fa-globe text-blue-600 mr-2"></i>
                <strong>Browser:</strong> ${userAgent}
            </p>
            <p class="flex items-center">
                <i class="fas fa-desktop text-blue-600 mr-2"></i>
                <strong>Screen Resolution:</strong> ${window.screen.width}x${window.screen.height}
            </p>
            <p class="flex items-center">
                <i class="fas fa-code text-blue-600 mr-2"></i>
                <strong>Available Languages:</strong> ${languages.length}
            </p>
            <p class="flex items-center">
                <i class="fas fa-check-circle text-blue-600 mr-2"></i>
                <strong>Installed Languages:</strong> ${state.installedLanguages.length}
            </p>
        </div>
    `;
}

function updateStats() {
    document.getElementById('totalLanguages').textContent = languages.length;
    document.getElementById('totalDownloads').textContent = state.stats.totalDownloads;
    document.getElementById('activeUsers').textContent = state.stats.activeUsers;
    document.getElementById('successRate').textContent = `${state.stats.successRate}%`;
}

// Installation Functions
function showInstallModal() {
    const modal = document.getElementById('installModal');
    modal.classList.remove('hidden');
    modal.querySelector('.modal-content').classList.add('animate__animated', 'animate__fadeInUp');
}

function closeModal() {
    const modal = document.getElementById('installModal');
    modal.querySelector('.modal-content').classList.remove('animate__animated', 'animate__fadeInUp');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

function updateProgress(progress, status, step) {
    const progressFill = document.querySelector('.progress-fill');
    const statusText = document.getElementById('installStatus');
    const steps = document.querySelectorAll('.step');
    
    progressFill.style.width = `${progress}%`;
    statusText.textContent = status;
    
    steps.forEach((s, index) => {
        if (index < step) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });
}

async function handleInstall(languageName) {
    if (state.installationInProgress) return;
    
    const language = languages.find(lang => lang.name === languageName);
    if (!language) return;
    
    state.installationInProgress = true;
    showInstallModal();
    
    // Simulate installation steps
    const steps = [
        { progress: 25, status: 'Downloading installation files...', step: 1 },
        { progress: 50, status: 'Verifying package integrity...', step: 2 },
        { progress: 75, status: 'Installing dependencies...', step: 3 },
        { progress: 100, status: 'Installation complete!', step: 4 }
    ];
    
    for (const step of steps) {
        updateProgress(step.progress, step.status, step.step);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Add to installed languages
    if (!state.installedLanguages.includes(languageName)) {
        state.installedLanguages.push(languageName);
        state.stats.totalDownloads++;
        state.stats.activeUsers++;
    }
    
    // Update UI
    updateLanguagesGrid();
    updateInstalledLanguages();
    updateStats();
    
    // Close modal after delay
    setTimeout(() => {
        closeModal();
        state.installationInProgress = false;
    }, 1000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI
    updateLanguagesGrid();
    updateInstalledLanguages();
    updateSystemInfo();
    updateStats();
    
    // Search functionality with debounce
    let searchTimeout;
    document.getElementById('searchInput').addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            state.searchQuery = e.target.value;
            updateLanguagesGrid();
        }, 300);
    });
    
    // Category filter
    document.getElementById('categoryFilter').addEventListener('change', (e) => {
        state.selectedCategory = e.target.value;
        updateLanguagesGrid();
    });
    
    // Settings
    document.getElementById('autoUpdate').addEventListener('change', (e) => {
        // Handle auto-update setting
        console.log('Auto-update:', e.target.checked);
    });
    
    document.getElementById('verifyInstall').addEventListener('change', (e) => {
        // Handle verification setting
        console.log('Verify installation:', e.target.checked);
    });

    // Add scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .language-card, .stat-card').forEach(card => {
        observer.observe(card);
    });
}); 
const fs = require('fs');
const path = require('path');

const files = ['index.html', 'marvel-comics.html', 'dc-movies.html', 'dc-comics.html'];

const activeTabs = {
    'index.html': 'Marvel Movies',
    'marvel-comics.html': 'Marvel Comics',
    'dc-movies.html': 'DC Movies',
    'dc-comics.html': 'DC Comics'
};

const tabs = [
    { href: 'index.html', label: 'Marvel Movies' },
    { href: 'marvel-comics.html', label: 'Marvel Comics' },
    { href: 'dc-movies.html', label: 'DC Movies' },
    { href: 'dc-comics.html', label: 'DC Comics' }
];

for (const file of files) {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Update Tailwind config
    // We will inject the new CSS variable setup and dark mode toggle support
    const configRegex = /tailwind\.config\s*=\s*{[\s\S]*?}/;
    const newConfig = `tailwind.config = {
            darkMode: 'class',
            theme: {
                screens: {
                    "sm": "640px",
                    "md": "768px",
                    "lg": "1024px",
                    "xl": "1280px",
                    "2xl": "1536px",
                    "3xl": "1920px",
                    "4xl": "2560px"
                },
                extend: {
                    fontFamily: { sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'] },
                    colors: {
                        apple: {
                            bg: 'var(--apple-bg)',
                            card: 'var(--apple-card)',
                            text: 'var(--apple-text)',
                            muted: 'var(--apple-muted)',
                            border: 'var(--apple-border)',
                            blue: 'var(--apple-blue)',
                            hover: 'var(--apple-hover)'
                        }
                    },
                    animation: {
                        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                        'modal-in': 'modalIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    },
                    keyframes: {
                        fadeInUp: {
                            '0%': { opacity: 0, transform: 'translateY(20px)' },
                            '100%': { opacity: 1, transform: 'translateY(0)' },
                        },
                        modalIn: {
                            '0%': { opacity: 0, transform: 'scale(0.95) translateY(10px)' },
                            '100%': { opacity: 1, transform: 'scale(1) translateY(0)' },
                        }
                    }
                }
            }
        }`;
    content = content.replace(configRegex, newConfig);

    // 2. Update <style> with CSS Variables
    const styleRegex = /body\s*{\s*background-color:\s*#000000;[\s\S]*?}/;
    const newStyles = `:root {
            /* Apple HIG Dark Theme (Default) */
            --apple-bg: #000000;
            --apple-card: #1c1c1e;
            --apple-text: #f5f5f7;
            --apple-muted: #86868b;
            --apple-border: #333336;
            --apple-blue: #0a84ff;
            --apple-glass: rgba(0, 0, 0, 0.7);
            --apple-hover: #2c2c2e;
        }

        html.light {
            /* Apple HIG Light Theme */
            --apple-bg: #f5f5f7;
            --apple-card: #ffffff;
            --apple-text: #1d1d1f;
            --apple-muted: #86868b;
            --apple-border: #d2d2d7;
            --apple-blue: #0071e3;
            --apple-glass: rgba(255, 255, 255, 0.85);
            --apple-hover: #e8e8ed;
        }

        body {
            background-color: var(--apple-bg);
            color: var(--apple-text);
            overscroll-behavior-y: none;
            transition: background-color 0.3s ease, color 0.3s ease;
        }`;
    content = content.replace(styleRegex, newStyles);
    
    // Also update glass-nav background
    content = content.replace(/background:\s*rgba\(0, 0, 0, 0\.7\);/g, 'background: var(--apple-glass);');
    content = content.replace(/background:\s*rgba\(28, 28, 30, 0\.85\);/g, 'background: var(--apple-card);');

    // Replace hardcoded utility classes across the file
    content = content.replace(/bg-\[\#1c1c1e\]/g, 'bg-apple-card');
    content = content.replace(/bg-\[\#000000\]/g, 'bg-apple-bg');
    content = content.replace(/bg-\[\#333336\]/g, 'bg-apple-border');
    content = content.replace(/text-\[\#f5f5f7\]/g, 'text-apple-text');
    content = content.replace(/text-white/g, 'text-apple-text'); 
    // Fix exceptions where white is actually needed inside blue buttons
    content = content.replace(/text-apple-text hover:bg-blue-600/g, 'text-white hover:bg-blue-600');
    // For progress bar gradient, map it properly
    content = content.replace(/from-\[\#1c1c1e\]/g, 'from-apple-card');
    content = content.replace(/to-\[\#0f0f10\]/g, 'to-apple-bg');
    content = content.replace(/border-white\/5/g, 'border-apple-border');
    content = content.replace(/border-white\/10/g, 'border-apple-border');
    content = content.replace(/bg-\[\#2c2c2e\]/g, 'bg-apple-hover');
    content = content.replace(/bg-\[\#3a3a3c\]/g, 'bg-apple-border'); // Active tab
    content = content.replace(/text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white\/50/g, 'text-transparent bg-clip-text bg-gradient-to-r from-apple-text via-apple-text to-apple-muted');

    // Build Tab Links
    const tabLinksHTML = tabs.map(tab => {
        const isActive = file === tab.href;
        if (isActive) {
            return `<a href="${tab.href}" class="px-5 py-3 lg:py-2 rounded-xl lg:rounded-full text-base lg:text-sm font-semibold transition-all whitespace-nowrap bg-apple-border text-apple-text shadow-sm text-center lg:text-left">${tab.label}</a>`;
        } else {
            return `<a href="${tab.href}" class="px-5 py-3 lg:py-2 rounded-xl lg:rounded-full text-base lg:text-sm font-semibold transition-all whitespace-nowrap text-apple-muted hover:text-apple-text hover:bg-apple-hover text-center lg:text-left">${tab.label}</a>`;
        }
    }).join('\n                        ');

    const newNav = `<nav class="sticky top-0 z-50 glass-nav border-b border-apple-border mb-8">
        <div class="px-6 md:px-12 py-4 max-w-screen-2xl mx-auto w-full relative">

            <!-- Mobile/Tablet Top Row -->
            <div class="flex items-center justify-between w-full lg:hidden mb-4">
                <span class="text-apple-text font-bold tracking-wide">The Omniverse</span>
                <div class="flex items-center gap-2">
                    <button class="themeToggleBtn text-apple-text p-2 hover:bg-apple-hover rounded-xl transition-colors">
                        <svg class="sunIcon w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        <svg class="moonIcon w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                    </button>
                    <button id="mobileMenuBtn" class="text-apple-text p-2 hover:bg-apple-hover rounded-xl transition-colors">
                        <svg id="hamburgerIcon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        <svg id="closeIcon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
            </div>

            <!-- MAIN ROW -->
            <div class="flex flex-col lg:flex-row items-center justify-between gap-4 w-full">
                
                <!-- Search (Always visible, Desktop Center, Mobile Persistent) -->
                <div class="relative w-full lg:flex-1 lg:max-w-[400px] shrink-0 group order-1 lg:order-2">
                    <svg class="absolute left-4 lg:left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-apple-muted group-focus-within:text-apple-text transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text" id="searchInput" placeholder="Search movies, series, or universes..."
                        class="w-full bg-apple-card border border-apple-border rounded-2xl lg:rounded-full pl-12 lg:pl-10 pr-4 py-3.5 lg:py-2.5 text-base lg:text-sm text-apple-text focus:outline-none focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/20 transition-all placeholder-apple-muted">
                </div>

                <!-- Collapsible Overlay (Tabs & Filters) -->
                <div id="mobileMenuContent" class="hidden lg:contents absolute top-full left-0 w-full px-6 py-6 z-40 border-b border-apple-border shadow-2xl glass-nav flex-col gap-6 order-2 mt-4 pointer-events-auto">
                    
                    <!-- TABS (Desktop Left) -->
                    <div class="w-full lg:w-auto overflow-x-auto hide-scroll shrink-0 order-2 lg:order-1 flex justify-start">
                        <div class="bg-apple-card border border-apple-border p-1.5 rounded-2xl lg:rounded-full flex flex-col lg:flex-row gap-2 lg:gap-1 w-full lg:w-max">
                            ${tabLinksHTML}
                        </div>
                    </div>

                    <!-- FILTERS (Desktop Right) -->
                    <div class="w-full lg:w-auto overflow-x-auto hide-scroll shrink-0 order-3 flex justify-start lg:justify-end pb-2 lg:pb-0">
                        <div class="flex flex-nowrap items-center gap-3 lg:gap-2 w-max">
                            
                            <!-- Act Dropdown -->
                            <div class="relative w-max" id="actDropdownContainer">
                                <button id="actDropdownBtn" class="bg-apple-card text-base lg:text-sm text-apple-text px-5 py-3.5 lg:py-2.5 rounded-2xl lg:rounded-full border border-apple-border hover:bg-apple-hover focus:outline-none transition-colors flex justify-between items-center gap-3 whitespace-nowrap">
                                    <span id="actDropdownText">All Timelines</span>
                                    <svg class="w-5 h-5 lg:w-4 lg:h-4 text-apple-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                                <div id="actDropdownMenu" class="absolute left-0 lg:right-0 lg:left-auto w-56 mt-2 bg-apple-card/95 backdrop-blur-xl border border-apple-border rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] hidden opacity-0 scale-95 transition-all duration-200 overflow-hidden custom-dropdown-menu z-50">
                                    <ul class="py-1 text-base lg:text-sm text-apple-text font-medium">
                                        <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer" data-value="All">All Timelines</li>
                                        <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer" data-value="Progenitors">Progenitors</li>
                                        <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer" data-value="Legacy">Legacy (Pre-MCU)</li>
                                        <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer" data-value="Infinity Saga">Infinity Saga</li>
                                        <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer" data-value="Spider-Verse">Spider-Verse & SSU</li>
                                        <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer" data-value="Multiverse Saga">Multiverse Saga</li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Platform Dropdown -->
                            <div class="relative w-max" id="platformDropdownContainer">
                                <button id="platformDropdownBtn" class="bg-apple-card text-base lg:text-sm text-apple-text px-5 py-3.5 lg:py-2.5 rounded-2xl lg:rounded-full border border-apple-border hover:bg-apple-hover focus:outline-none transition-colors flex justify-between items-center gap-3 whitespace-nowrap">
                                    <span id="platformDropdownText">All Platforms</span>
                                    <svg class="w-5 h-5 lg:w-4 lg:h-4 text-apple-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                                <div id="platformDropdownMenu" class="absolute left-0 lg:right-0 lg:left-auto w-48 mt-2 bg-apple-card/95 backdrop-blur-xl border border-apple-border rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] hidden opacity-0 scale-95 transition-all duration-200 overflow-hidden custom-dropdown-menu z-50">
                                    <ul class="py-1 text-base lg:text-sm text-apple-text font-medium">
                                        <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer" data-value="All">All Platforms</li>
                                        <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer" data-value="Disney+ Hotstar">Disney+ Hotstar</li>
                                        <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer" data-value="Netflix">Netflix</li>
                                        <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer" data-value="Prime Video">Prime Video</li>
                                        <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer" data-value="SonyLIV">SonyLIV</li>
                                        <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer" data-value="JioCinema">JioCinema</li>
                                    </ul>
                                </div>
                            </div>

                            <label class="flex items-center gap-3 lg:gap-2 cursor-pointer bg-apple-card border border-apple-border rounded-2xl lg:rounded-full px-5 py-3.5 lg:py-2.5 hover:bg-apple-hover transition-colors w-max shrink-0">
                                <input type="checkbox" id="requiredFilter" class="accent-apple-blue w-5 h-5 lg:w-4 lg:h-4 rounded">
                                <span class="text-base lg:text-sm font-medium text-apple-text">Required Only</span>
                            </label>

                            <!-- Desktop Theme Toggle -->
                            <button class="themeToggleBtn hidden lg:flex text-apple-text p-2.5 bg-apple-card border border-apple-border rounded-full hover:bg-apple-hover transition-colors items-center justify-center">
                                <svg class="sunIcon w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                <svg class="moonIcon w-4 h-4 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>`;

    content = content.replace(/<nav class="sticky top-0 z-50 glass-nav border-b border-apple-border mb-8 relative">[\s\S]*?<\/nav>/, newNav);

    // Replace the old JS toggles with updated ones (combining theme and mobile toggles)
    const newJS = `
    <script>
        // Theme Management
        const htmlEl = document.documentElement;
        const themeToggles = document.querySelectorAll('.themeToggleBtn');
        const sunIcons = document.querySelectorAll('.sunIcon');
        const moonIcons = document.querySelectorAll('.moonIcon');

        function setTheme(isLight) {
            if (isLight) {
                htmlEl.classList.add('light');
                localStorage.setItem('theme', 'light');
                sunIcons.forEach(icon => icon.classList.add('hidden'));
                moonIcons.forEach(icon => icon.classList.remove('hidden'));
            } else {
                htmlEl.classList.remove('light');
                localStorage.setItem('theme', 'dark');
                sunIcons.forEach(icon => icon.classList.remove('hidden'));
                moonIcons.forEach(icon => icon.classList.add('hidden'));
            }
        }

        // Initialize Theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') setTheme(true);
        else setTheme(false); // Dark default

        themeToggles.forEach(btn => {
            btn.addEventListener('click', () => {
                const isLight = !htmlEl.classList.contains('light');
                setTheme(isLight);
            });
        });

        // Mobile Menu Management
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenuContent = document.getElementById('mobileMenuContent');
        const hamburgerIcon = document.getElementById('hamburgerIcon');
        const closeIcon = document.getElementById('closeIcon');

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuContent.classList.toggle('hidden');
                mobileMenuContent.classList.toggle('flex');
                hamburgerIcon.classList.toggle('hidden');
                closeIcon.classList.toggle('hidden');
                
                // Prevent background scrolling when menu is open on mobile
                if (!mobileMenuContent.classList.contains('hidden')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });

            // Reset menu state on resize
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 1024) {
                    mobileMenuContent.classList.remove('hidden');
                    mobileMenuContent.classList.add('flex');
                    document.body.style.overflow = '';
                } else if (!hamburgerIcon.classList.contains('hidden')) {
                    mobileMenuContent.classList.add('hidden');
                    mobileMenuContent.classList.remove('flex');
                }
            });
        }
    </script>
</body>`;
    
    // Replace old script
    content = content.replace(/<script>\s*const mobileMenuBtn = document\.getElementById\('mobileMenuBtn'\);[\s\S]*?<\/script>\s*<\/body>/, newJS);

    // Also fix the fact that "text-white" in the progress text might have been replaced.
    content = content.replace(/<span id="progressPercentage" class="text-apple-text font-bold text-lg">/g, '<span id="progressPercentage" class="text-apple-text font-bold text-lg">');

    fs.writeFileSync(filePath, content);
}
console.log("Refactored layout and Light theme deployed.");

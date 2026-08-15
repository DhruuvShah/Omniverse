const fs = require('fs');
const path = require('path');

const files = ['index.html', 'marvel-comics.html', 'dc-movies.html', 'dc-comics.html'];

for (const file of files) {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Restore text-white where we modified it
    content = content.replace(/text-apple-text/g, 'text-white');
    content = content.replace(/bg-apple-bg/g, 'bg-[#000000]');
    
    const isMM = file === 'index.html';
    const isMC = file === 'marvel-comics.html';
    const isDM = file === 'dc-movies.html';
    const isDC = file === 'dc-comics.html';

    const actMM = isMM ? 'bg-[#3a3a3c] text-white shadow-sm' : 'text-apple-muted hover:text-white hover:bg-[#2c2c2e]/70';
    const actMC = isMC ? 'bg-[#3a3a3c] text-white shadow-sm' : 'text-apple-muted hover:text-white hover:bg-[#2c2c2e]/70';
    const actDM = isDM ? 'bg-[#3a3a3c] text-white shadow-sm' : 'text-apple-muted hover:text-white hover:bg-[#2c2c2e]/70';
    const actDC = isDC ? 'bg-[#3a3a3c] text-white shadow-sm' : 'text-apple-muted hover:text-white hover:bg-[#2c2c2e]/70';

    const tabsHTML = '<a href="index.html" class="px-5 py-3 lg:py-2 rounded-xl lg:rounded-full text-base lg:text-sm font-semibold transition-all whitespace-nowrap ' + actMM + ' text-center lg:text-left">Marvel Movies</a>\\n' +
                     '<a href="marvel-comics.html" class="px-5 py-3 lg:py-2 rounded-xl lg:rounded-full text-base lg:text-sm font-semibold transition-all whitespace-nowrap ' + actMC + ' text-center lg:text-left">Marvel Comics</a>\\n' +
                     '<a href="dc-movies.html" class="px-5 py-3 lg:py-2 rounded-xl lg:rounded-full text-base lg:text-sm font-semibold transition-all whitespace-nowrap ' + actDM + ' text-center lg:text-left">DC Movies</a>\\n' +
                     '<a href="dc-comics.html" class="px-5 py-3 lg:py-2 rounded-xl lg:rounded-full text-base lg:text-sm font-semibold transition-all whitespace-nowrap ' + actDC + ' text-center lg:text-left">DC Comics</a>';

    let fileNav = '<nav class="sticky top-0 z-50 glass-nav border-b border-apple-border mb-8 relative">\\n' +
'        <!-- Mobile Header Bar -->\\n' +
'        <div class="px-6 md:px-12 py-4 max-w-screen-2xl mx-auto flex items-center justify-between lg:hidden">\\n' +
'            <span class="text-white font-bold tracking-wide">The Omniverse Database</span>\\n' +
'            <button id="mobileMenuBtn" class="text-white p-2 focus:outline-none hover:bg-[#2c2c2e] rounded-xl transition-colors">\\n' +
'                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">\\n' +
'                    <path id="hamburgerIcon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>\\n' +
'                    <path id="closeIcon" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>\\n' +
'                </svg>\\n' +
'            </button>\\n' +
'        </div>\\n' +
'\\n' +
'        <!-- Collapsible Menu Content / Desktop Row -->\\n' +
'        <div id="mobileMenuContent" class="hidden lg:flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 lg:gap-8 w-full max-w-screen-2xl mx-auto px-6 md:px-12 py-6 lg:py-4 absolute lg:static top-full left-0 glass-nav lg:bg-transparent shadow-2xl lg:shadow-none border-b border-apple-border lg:border-none z-40 max-h-[calc(100vh-70px)] overflow-y-auto lg:overflow-visible lg:max-h-none">\\n' +
'            \\n' +
'            <!-- Tabs Group -->\\n' +
'            <div class="w-full lg:w-auto flex flex-col lg:flex-row justify-start lg:justify-start lg:overflow-x-auto hide-scroll shrink-0">\\n' +
'                <div class="bg-apple-card border border-apple-border p-2 lg:p-1.5 rounded-2xl lg:rounded-full flex flex-col lg:flex-row gap-2 lg:gap-1 w-full lg:w-max">\\n' +
'                    ' + tabsHTML + '\\n' +
'                </div>\\n' +
'            </div>\\n' +
'\\n' +
'            <!-- Controls Group (Search + Filters) -->\\n' +
'            <div class="flex flex-col lg:flex-row items-stretch lg:items-center justify-start lg:justify-end gap-4 lg:gap-3 w-full lg:w-auto">\\n' +
'                \\n' +
'                <!-- Apple-style Search Bar -->\\n' +
'                <div class="relative w-full lg:w-[320px] 2xl:w-[400px] shrink-0 group">\\n' +
'                    <svg class="absolute left-4 lg:left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-apple-muted group-focus-within:text-white transition-colors"\\n' +
'                        fill="none" viewBox="0 0 24 24" stroke="currentColor">\\n' +
'                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\\n' +
'                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />\\n' +
'                    </svg>\\n' +
'                    <input type="text" id="searchInput" placeholder="Search movies, series, or universes..."\\n' +
'                        class="w-full bg-apple-card border border-transparent rounded-2xl lg:rounded-full pl-12 lg:pl-10 pr-4 py-3.5 lg:py-2.5 text-base lg:text-sm text-white focus:outline-none focus:border-apple-blue focus:bg-apple-bg focus:ring-4 focus:ring-apple-blue/20 transition-all placeholder-apple-muted">\\n' +
'                </div>\\n' +
'\\n' +
'                <!-- Custom Segmented Filters -->\\n' +
'                <div class="flex flex-col sm:flex-row lg:flex-row flex-wrap items-stretch sm:items-center justify-start lg:justify-center gap-3 lg:gap-2 w-full lg:w-auto relative z-50">\\n' +
'                    \\n' +
'                    <!-- Custom Act Dropdown -->\\n' +
'                    <div class="relative w-full sm:w-auto" id="actDropdownContainer">\\n' +
'                        <button id="actDropdownBtn"\\n' +
'                            class="w-full sm:w-auto bg-apple-card text-base lg:text-sm text-white px-5 py-3.5 lg:py-2.5 rounded-2xl lg:rounded-full border border-apple-border hover:bg-[#2c2c2e] focus:outline-none focus:border-apple-blue transition-colors flex justify-between items-center gap-3 whitespace-nowrap">\\n' +
'                            <span id="actDropdownText">All Timelines</span>\\n' +
'                            <svg class="w-5 h-5 lg:w-4 lg:h-4 text-apple-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">\\n' +
'                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7">\\n' +
'                                </path>\\n' +
'                            </svg>\\n' +
'                        </button>\\n' +
'                        <div id="actDropdownMenu"\\n' +
'                            class="absolute left-0 lg:right-auto lg:left-0 w-full lg:w-56 mt-2 bg-apple-card/95 backdrop-blur-xl border border-apple-border rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] hidden opacity-0 scale-95 transition-all duration-200 overflow-hidden custom-dropdown-menu z-50">\\n' +
'                            <ul class="py-1 text-base lg:text-sm text-white font-medium">\\n' +
'                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="All">All Timelines</li>\\n' +
'                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="Progenitors">Progenitors</li>\\n' +
'                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="Legacy">Legacy (Pre-MCU)</li>\\n' +
'                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="Infinity Saga">Infinity Saga</li>\\n' +
'                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="Spider-Verse">Spider-Verse & SSU</li>\\n' +
'                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="Multiverse Saga">Multiverse Saga</li>\\n' +
'                            </ul>\\n' +
'                        </div>\\n' +
'                    </div>\\n' +
'\\n' +
'                    <!-- Custom Platform Dropdown -->\\n' +
'                    <div class="relative w-full sm:w-auto" id="platformDropdownContainer">\\n' +
'                        <button id="platformDropdownBtn"\\n' +
'                            class="w-full sm:w-auto bg-apple-card text-base lg:text-sm text-white px-5 py-3.5 lg:py-2.5 rounded-2xl lg:rounded-full border border-apple-border hover:bg-[#2c2c2e] focus:outline-none focus:border-apple-blue transition-colors flex justify-between items-center gap-3 whitespace-nowrap">\\n' +
'                            <span id="platformDropdownText">All Platforms</span>\\n' +
'                            <svg class="w-5 h-5 lg:w-4 lg:h-4 text-apple-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">\\n' +
'                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7">\\n' +
'                                </path>\\n' +
'                            </svg>\\n' +
'                        </button>\\n' +
'                        <div id="platformDropdownMenu"\\n' +
'                            class="absolute left-0 lg:right-auto lg:left-0 w-full lg:w-48 mt-2 bg-apple-card/95 backdrop-blur-xl border border-apple-border rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] hidden opacity-0 scale-95 transition-all duration-200 overflow-hidden custom-dropdown-menu z-50">\\n' +
'                            <ul class="py-1 text-base lg:text-sm text-white font-medium">\\n' +
'                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="All">All Platforms</li>\\n' +
'                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="Disney+ Hotstar">Disney+ Hotstar</li>\\n' +
'                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="Netflix">Netflix</li>\\n' +
'                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="Prime Video">Prime Video</li>\\n' +
'                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="SonyLIV">SonyLIV</li>\\n' +
'                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="JioCinema">JioCinema</li>\\n' +
'                            </ul>\\n' +
'                        </div>\\n' +
'                    </div>\\n' +
'\\n' +
'                    <label class="flex items-center gap-3 lg:gap-2 cursor-pointer bg-apple-card border border-apple-border rounded-2xl lg:rounded-full px-5 py-3.5 lg:py-2.5 hover:bg-[#2c2c2e] transition-colors w-full sm:w-auto justify-center sm:justify-start">\\n' +
'                        <input type="checkbox" id="requiredFilter" class="accent-apple-blue w-5 h-5 lg:w-4 lg:h-4 rounded">\\n' +
'                        <span class="text-base lg:text-sm font-medium text-white">Required Only</span>\\n' +
'                    </label>\\n' +
'                </div>\\n' +
'            </div>\\n' +
'        </div>\\n' +
'    </nav>';

    // Replace the completely busted new nav
    content = content.replace(/<nav class="sticky top-0 z-50 glass-nav border-b border-apple-border mb-8[\s\S]*?<\/nav>/, fileNav);

const oldConfig = 'tailwind.config = {\\n' +
'            theme: {\\n' +
'                screens: {\\n' +
'                    "sm": "640px",\\n' +
'                    "md": "768px",\\n' +
'                    "lg": "1024px",\\n' +
'                    "xl": "1280px",\\n' +
'                    "2xl": "1536px",\\n' +
'                    "3xl": "1920px",\\n' +
'                    "4xl": "2560px"\\n' +
'                },\\n' +
'                extend: {\\n' +
'                    fontFamily: { sans: [\\'Inter\\', \\'-apple-system\\', \\'BlinkMacSystemFont\\', \\'sans-serif\\'] },\\n' +
'                    colors: {\\n' +
'                        apple: {\\n' +
'                            bg: \\'#000000\\',\\n' +
'                            card: \\'#1c1c1e\\',\\n' +
'                            text: \\'#f5f5f7\\',\\n' +
'                            muted: \\'#86868b\\',\\n' +
'                            border: \\'#333336\\',\\n' +
'                            blue: \\'#0a84ff\\'\\n' +
'                        }\\n' +
'                    },\\n' +
'                    animation: {\\n' +
'                        \\'fade-in-up\\': \\'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards\\',\\n' +
'                        \\'modal-in\\': \\'modalIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards\\',\\n' +
'                    },\\n' +
'                    keyframes: {\\n' +
'                        fadeInUp: {\\n' +
'                            \\'0%\\': { opacity: 0, transform: \\'translateY(20px)\\' },\\n' +
'                            \\'100%\\': { opacity: 1, transform: \\'translateY(0)\\' },\\n' +
'                        },\\n' +
'                        modalIn: {\\n' +
'                            \\'0%\\': { opacity: 0, transform: \\'scale(0.95) translateY(10px)\\' },\\n' +
'                            \\'100%\\': { opacity: 1, transform: \\'scale(1) translateY(0)\\' },\\n' +
'                        }\\n' +
'                    }\\n' +
'                }\\n' +
'            }\\n' +
'        }';

const oldStyles = 'body {\\n' +
'            background-color: #000000;\\n' +
'            color: #f5f5f7;\\n' +
'            overscroll-behavior-y: none;\\n' +
'        }';

const oldJS = '<script>\\n' +
'        const mobileMenuBtn = document.getElementById(\\'mobileMenuBtn\\');\\n' +
'        const mobileMenuContent = document.getElementById(\\'mobileMenuContent\\');\\n' +
'        const hamburgerIcon = document.getElementById(\\'hamburgerIcon\\');\\n' +
'        const closeIcon = document.getElementById(\\'closeIcon\\');\\n' +
'\\n' +
'        if (mobileMenuBtn) {\\n' +
'            mobileMenuBtn.addEventListener(\\'click\\', () => {\\n' +
'                mobileMenuContent.classList.toggle(\\'hidden\\');\\n' +
'                mobileMenuContent.classList.toggle(\\'flex\\');\\n' +
'                hamburgerIcon.classList.toggle(\\'hidden\\');\\n' +
'                closeIcon.classList.toggle(\\'hidden\\');\\n' +
'                \\n' +
'                if (!mobileMenuContent.classList.contains(\\'hidden\\')) {\\n' +
'                    document.body.style.overflow = \\'hidden\\';\\n' +
'                } else {\\n' +
'                    document.body.style.overflow = \\'\\';\\n' +
'                }\\n' +
'            });\\n' +
'\\n' +
'            window.addEventListener(\\'resize\\', () => {\\n' +
'                if (window.innerWidth >= 1024) {\\n' +
'                    mobileMenuContent.classList.remove(\\'hidden\\');\\n' +
'                    mobileMenuContent.classList.add(\\'flex\\');\\n' +
'                    document.body.style.overflow = \\'\\';\\n' +
'                } else if (!hamburgerIcon.classList.contains(\\'hidden\\')) {\\n' +
'                    mobileMenuContent.classList.add(\\'hidden\\');\\n' +
'                    mobileMenuContent.classList.remove(\\'flex\\');\\n' +
'                }\\n' +
'            });\\n' +
'        }\\n' +
'    </script>\\n' +
'</body>';

    // Replace Tailwind Config
    content = content.replace(/tailwind\.config\s*=\s*{[\s\S]*?}/, oldConfig);

    // Replace Style Config
    content = content.replace(/:root\s*{[\s\S]*?body\s*{[\s\S]*?}/, oldStyles);

    // Replace JS
    content = content.replace(/<script>\s*\/\/\s*Theme Management[\s\S]*?<\/script>\s*<\/body>/, oldJS);
    
    // Header gradient fix
    content = content.replace(/text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-apple-muted/g, 'text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50');
    
    fs.writeFileSync(filePath, content);
}
console.log("Revert complete.");

const fs = require('fs');
const path = require('path');

const files = ['index.html', 'marvel-comics.html', 'dc-movies.html', 'dc-comics.html'];

for (const file of files) {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove the old nav completely
    const navRegex = /<nav class="sticky top-0 z-40 glass-nav border-b border-apple-border px-6 md:px-12 py-4 mb-8">([\s\S]*?)<\/nav>/;
    
    // Define the new Mobile-First Nav
    // We need to determine active tab based on the file name
    const tabs = [
        { href: 'index.html', label: 'Marvel Movies' },
        { href: 'marvel-comics.html', label: 'Marvel Comics' },
        { href: 'dc-movies.html', label: 'DC Movies' },
        { href: 'dc-comics.html', label: 'DC Comics' }
    ];

    const tabLinksHTML = tabs.map(tab => {
        const isActive = file === tab.href;
        if (isActive) {
            return `<a href="${tab.href}" class="px-5 py-3 lg:py-2 rounded-xl lg:rounded-full text-base lg:text-sm font-semibold transition-all whitespace-nowrap bg-[#3a3a3c] text-white shadow-sm text-center lg:text-left">${tab.label}</a>`;
        } else {
            return `<a href="${tab.href}" class="px-5 py-3 lg:py-2 rounded-xl lg:rounded-full text-base lg:text-sm font-semibold transition-all whitespace-nowrap text-apple-muted hover:text-white hover:bg-[#2c2c2e]/70 text-center lg:text-left">${tab.label}</a>`;
        }
    }).join('\n                ');

    const newNav = `<nav class="sticky top-0 z-50 glass-nav border-b border-apple-border mb-8 relative">
        <!-- Mobile Header Bar -->
        <div class="px-6 md:px-12 py-4 max-w-screen-2xl mx-auto flex items-center justify-between lg:hidden">
            <span class="text-white font-bold tracking-wide">The Omniverse Database</span>
            <button id="mobileMenuBtn" class="text-white p-2 focus:outline-none hover:bg-[#2c2c2e] rounded-xl transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path id="hamburgerIcon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    <path id="closeIcon" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>

        <!-- Collapsible Menu Content / Desktop Row -->
        <div id="mobileMenuContent" class="hidden lg:flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 lg:gap-8 w-full max-w-screen-2xl mx-auto px-6 md:px-12 py-6 lg:py-4 absolute lg:static top-full left-0 glass-nav lg:bg-transparent shadow-2xl lg:shadow-none border-b border-apple-border lg:border-none z-40 max-h-[calc(100vh-70px)] overflow-y-auto lg:overflow-visible lg:max-h-none">
            
            <!-- Tabs Group -->
            <div class="w-full lg:w-auto flex flex-col lg:flex-row justify-start lg:justify-start lg:overflow-x-auto hide-scroll shrink-0">
                <div class="bg-apple-card border border-apple-border p-2 lg:p-1.5 rounded-2xl lg:rounded-full flex flex-col lg:flex-row gap-2 lg:gap-1 w-full lg:w-max">
                    ${tabLinksHTML}
                </div>
            </div>

            <!-- Controls Group (Search + Filters) -->
            <div class="flex flex-col lg:flex-row items-stretch lg:items-center justify-start lg:justify-end gap-4 lg:gap-3 w-full lg:w-auto">
                
                <!-- Apple-style Search Bar -->
                <div class="relative w-full lg:w-[320px] 2xl:w-[400px] shrink-0 group">
                    <svg class="absolute left-4 lg:left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-apple-muted group-focus-within:text-white transition-colors"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text" id="searchInput" placeholder="Search movies, series, or universes..."
                        class="w-full bg-apple-card border border-transparent rounded-2xl lg:rounded-full pl-12 lg:pl-10 pr-4 py-3.5 lg:py-2.5 text-base lg:text-sm text-white focus:outline-none focus:border-apple-blue focus:bg-apple-bg focus:ring-4 focus:ring-apple-blue/20 transition-all placeholder-apple-muted">
                </div>

                <!-- Custom Segmented Filters -->
                <div class="flex flex-col sm:flex-row lg:flex-row flex-wrap items-stretch sm:items-center justify-start lg:justify-center gap-3 lg:gap-2 w-full lg:w-auto relative z-50">
                    
                    <!-- Custom Act Dropdown -->
                    <div class="relative w-full sm:w-auto" id="actDropdownContainer">
                        <button id="actDropdownBtn"
                            class="w-full sm:w-auto bg-apple-card text-base lg:text-sm text-white px-5 py-3.5 lg:py-2.5 rounded-2xl lg:rounded-full border border-apple-border hover:bg-[#2c2c2e] focus:outline-none focus:border-apple-blue transition-colors flex justify-between items-center gap-3 whitespace-nowrap">
                            <span id="actDropdownText">All Timelines</span>
                            <svg class="w-5 h-5 lg:w-4 lg:h-4 text-apple-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7">
                                </path>
                            </svg>
                        </button>
                        <div id="actDropdownMenu"
                            class="absolute left-0 lg:right-auto lg:left-0 w-full lg:w-56 mt-2 bg-apple-card/95 backdrop-blur-xl border border-apple-border rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] hidden opacity-0 scale-95 transition-all duration-200 overflow-hidden custom-dropdown-menu z-50">
                            <ul class="py-1 text-base lg:text-sm text-white font-medium">
                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="All">All Timelines</li>
                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="Progenitors">Progenitors</li>
                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="Legacy">Legacy (Pre-MCU)</li>
                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="Infinity Saga">Infinity Saga</li>
                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="Spider-Verse">Spider-Verse & SSU</li>
                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="Multiverse Saga">Multiverse Saga</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Custom Platform Dropdown -->
                    <div class="relative w-full sm:w-auto" id="platformDropdownContainer">
                        <button id="platformDropdownBtn"
                            class="w-full sm:w-auto bg-apple-card text-base lg:text-sm text-white px-5 py-3.5 lg:py-2.5 rounded-2xl lg:rounded-full border border-apple-border hover:bg-[#2c2c2e] focus:outline-none focus:border-apple-blue transition-colors flex justify-between items-center gap-3 whitespace-nowrap">
                            <span id="platformDropdownText">All Platforms</span>
                            <svg class="w-5 h-5 lg:w-4 lg:h-4 text-apple-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7">
                                </path>
                            </svg>
                        </button>
                        <div id="platformDropdownMenu"
                            class="absolute left-0 lg:right-auto lg:left-0 w-full lg:w-48 mt-2 bg-apple-card/95 backdrop-blur-xl border border-apple-border rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] hidden opacity-0 scale-95 transition-all duration-200 overflow-hidden custom-dropdown-menu z-50">
                            <ul class="py-1 text-base lg:text-sm text-white font-medium">
                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="All">All Platforms</li>
                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="Disney+ Hotstar">Disney+ Hotstar</li>
                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="Netflix">Netflix</li>
                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="Prime Video">Prime Video</li>
                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="SonyLIV">SonyLIV</li>
                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="JioCinema">JioCinema</li>
                            </ul>
                        </div>
                    </div>

                    <label class="flex items-center gap-3 lg:gap-2 cursor-pointer bg-apple-card border border-apple-border rounded-2xl lg:rounded-full px-5 py-3.5 lg:py-2.5 hover:bg-[#2c2c2e] transition-colors w-full sm:w-auto justify-center sm:justify-start">
                        <input type="checkbox" id="requiredFilter" class="accent-apple-blue w-5 h-5 lg:w-4 lg:h-4 rounded">
                        <span class="text-base lg:text-sm font-medium text-white">Required Only</span>
                    </label>
                </div>
            </div>
        </div>
    </nav>`;

    content = content.replace(navRegex, newNav);

    // Also inject the Mobile Menu JS before </body> if it doesn't exist
    const mobileMenuJS = `
    <script>
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
                    // If hamburger is showing (menu closed), ensure content is hidden
                    mobileMenuContent.classList.add('hidden');
                    mobileMenuContent.classList.remove('flex');
                }
            });
        }
    </script>
</body>`;
    
    if (!content.includes('mobileMenuBtn.addEventListener')) {
        content = content.replace(/<\/body>/, mobileMenuJS);
    }

    fs.writeFileSync(filePath, content);
}

console.log("Mobile-first nav layout deployed to all files.");

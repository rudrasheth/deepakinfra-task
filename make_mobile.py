import glob
import re

html_files = glob.glob('*.html')

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add Mobile Menu Checkbox and styles if not present
    if '.mobile-menu' not in content:
        # 1. Update Navigation Bar to include mobile menu button
        # The original desktop menu has classes like 'hidden md:flex space-x-10 items-center'
        # The original buttons section has 'hidden md:flex items-center'
        
        # We need to add the mobile menu button right after the logo / dark mode toggle wrapper and before desktop menu?
        # Actually it's easier to explicitly find the nav bar and replace.
        nav_match = re.search(r'(<nav.*?<div.*?>)\s*<!-- Logo -->.*?</div>\s*<!-- Desktop Menu -->', content, re.DOTALL)
        
        # Instead, let's use a targeted replace for the navbar end.
        # Find:             </button>
        #        </div>
        #        </div>
        #    </nav>
        
        nav_end = """            </button>
        </div>
        
        <!-- Mobile Menu Button -->
        <button id="mobile-menu-btn" class="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur text-slate-500 dark:text-slate-300 ml-4">
            <i class="fas fa-bars"></i>
        </button>
        </div>
        
        <!-- Mobile Dropdown -->
        <div id="mobile-menu" class="hidden md:hidden absolute top-full left-0 right-0 mt-2 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col space-y-4">
            <a href="index.html" class="nav-link uppercase text-center py-2">Home</a>
            <a href="about.html" class="nav-link uppercase text-center py-2">About</a>
            <a href="services.html" class="nav-link uppercase text-center py-2">Services</a>
            <a href="team.html" class="nav-link uppercase text-center py-2">Team</a>
            <a href="contact.html" class="btn-solid py-3 text-center w-full">Get Quote</a>
        </div>
    </nav>"""
        
        content = re.sub(r'            </button>\s*</div>\s*</div>\s*</nav>', nav_end, content)
        
        # Add JS for mobile menu toggle
        js_logic = """
        window.addEventListener('DOMContentLoaded', () => {
            updateThemeIcon(document.documentElement.classList.contains('dark'));
            
            const mobileBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileBtn && mobileMenu) {
                mobileBtn.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                });
            }
        });
"""
        content = re.sub(r"window\.addEventListener\('DOMContentLoaded',\s*\(\)\s*=>\s*\{[^}]+\}\);", js_logic.strip(), content)
        
        # 2. Hero Section Mobile Fixes
        if "hero.png" in content:
            # Drop size of hero text on very small screens
            content = content.replace('text-6xl md:text-7xl lg:text-9xl', 'text-5xl sm:text-6xl md:text-7xl lg:text-9xl')
            content = content.replace('text-lg md:text-xl', 'text-base sm:text-lg md:text-xl')

        # 3. Footer Mobile Fixes
        # Stack footer links appropriately on mobile. 
        # Using md:flex-row is already there, but let's check grid-cols.
        # "grid grid-cols-1 md:grid-cols-4 gap-12" handles mobile, but maybe the contact box overflows.
        content = content.replace('w-3/4', 'w-full md:w-3/4')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Injected mobile menu and responsive utility classes.")

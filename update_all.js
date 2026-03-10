const fs = require('fs');

const dir = 'c:/Users/HP/Downloads/assets/website';
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const modalHTML = 
<!-- Quote Modal -->
<div id="quoteModal" class="fixed inset-0 z-[100] hidden items-center justify-center bg-slate-900/80 backdrop-blur-sm opacity-0 transition-opacity duration-300">
    <div class="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl relative overflow-hidden transform scale-95 transition-transform duration-300 mx-4">
        <button onclick="closeQuoteModal()" class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 hover:text-slate-800 dark:hover:text-white transition-colors z-10">
            <i class="fas fa-times"></i>
        </button>
        <div class="p-8">
            <h3 class="text-3xl font-black text-slate-900 dark:text-white mb-2">Get a Free Quote</h3>
            <p class="text-slate-500 font-medium mb-8">Fill out the form below and we'll get back to you shortly.</p>
            <form class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="flex flex-col space-y-1">
                        <label class="text-slate-700 dark:text-slate-300 text-sm font-bold tracking-wide">Full Name</label>
                        <input type="text" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium shadow-sm" placeholder="Enter your name">
                    </div>
                    <div class="flex flex-col space-y-1">
                        <label class="text-slate-700 dark:text-slate-300 text-sm font-bold tracking-wide">Email Address</label>
                        <input type="email" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium shadow-sm" placeholder="Enter your email">
                    </div>
                </div>
                <div class="flex flex-col space-y-1">
                    <label class="text-slate-700 dark:text-slate-300 text-sm font-bold tracking-wide">Select Service</label>
                    <div class="relative">
                        <select class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white appearance-none cursor-pointer font-medium shadow-sm">
                            <option value="" disabled selected class="text-slate-400">Select...</option>
                            <option value="Laptop Services">Laptop Services</option>
                            <option value="Hardware Sales">Hardware Sales</option>
                            <option value="CCTV / IP CAM">CCTV / IP CAM</option>
                            <option value="Networking">Networking & Server</option>
                            <option value="ITAD">ITAD Services</option>
                        </select>
                        <i class="fas fa-chevron-down absolute right-4 top-3.5 text-slate-500 pointer-events-none"></i>
                    </div>
                </div>
                <div class="flex flex-col space-y-1">
                    <label class="text-slate-700 dark:text-slate-300 text-sm font-bold tracking-wide">Your Requirements</label>
                    <textarea rows="3" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-slate-900 dark:text-white font-medium shadow-sm" placeholder="Describe your needs..."></textarea>
                </div>
                <button type="submit" class="btn-solid !bg-yellow-400 hover:!bg-yellow-500 !text-slate-900 w-full py-3.5 text-sm tracking-widest font-bold flex items-center justify-center gap-2 mt-4 rounded-lg shadow-md transition-all">
                    SUBMIT REQUEST <i class="fas fa-paper-plane"></i>
                </button>
            </form>
        </div>
    </div>
</div>

<script>
    function openQuoteModal() {
        const modal = document.getElementById('quoteModal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        // trigger reflow
        void modal.offsetWidth;
        modal.classList.remove('opacity-0');
        modal.querySelector('div').classList.remove('scale-95');
        modal.querySelector('div').classList.add('scale-100');
    }
    
    function closeQuoteModal() {
        const modal = document.getElementById('quoteModal');
        modal.classList.add('opacity-0');
        modal.querySelector('div').classList.remove('scale-100');
        modal.querySelector('div').classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
    }
</script>
;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(${dir}/\, 'utf-8');

    // 1. Fix Logo
    // The user wants the logo to sit nicely without color change. Let's make the navbar white container perfectly fit the logo.
    const logoRegex = /<a href="index\.html"[^>]*>\s*<img[^>]*src="assets\/dielogo\.png" alt="Logo">\s*<\/a>/;
    const newLogo = <a href="index.html" class="bg-white rounded-lg p-2 shadow-sm flex items-center justify-center" style="width: fit-content; height: 50px;">\n                    <img class="h-full w-auto object-contain" src="assets/dielogo.png" alt="Logo">\n                </a>;
    content = content.replace(logoRegex, newLogo);

    // 2. Change Quote Links to Modal Open
    content = content.replace(/href="quote\.html"/g, 'onclick="openQuoteModal()" href="javascript:void(0);"');
    
    // 3. Add Modal HTML before </body>
    if (!content.includes('id="quoteModal"')) {
        content = content.replace('</body>', '\\n</body>');
    }

    // 4. Contact Us page specific changes
    if (file === 'contact.html') {
        const phoneRegex = /<p(\s+class="[^"]*text-\[10px\][^"]*")>(\s*Phone\s*)<\/p>\s*<h4(\s+class="[^"]*text-3xl[^"]*")>\s*022 31920610\s*<\/h4>/;
        
        // Add Mobile and WhatsApp
        const newPhoneBlock = <p></p>\n                            <h4>022 31920610</h4>\n                        </div>\n                        <div class="group cursor-default">\n                            <p>Mobile / WhatsApp</p>\n                            <h4>+91 9004070009</h4>\n                            <p class="text-slate-500 font-medium text-sm mt-1">Available 24/7 for urgent IT interventions</p>;
        
        content = content.replace(phoneRegex, newPhoneBlock);
    }

    fs.writeFileSync(${dir}/\, content, 'utf-8');
    console.log(Processed \);
});

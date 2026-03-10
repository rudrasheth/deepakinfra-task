const fs = require('fs');
const dir = 'c:/Users/HP/Downloads/assets/website';
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const whatsappButton = `
<!-- WhatsApp Float -->
<a href="https://wa.me/919552084097" target="_blank" class="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-[1rem] flex items-center justify-center text-3xl shadow-[0_10px_20px_rgba(37,211,102,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_25px_rgba(37,211,102,0.4)] transition-all z-[100] group" aria-label="WhatsApp">
    <i class="fab fa-whatsapp"></i>
</a>
`;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(`${dir}/${file}`, 'utf-8');

    // WhatsApp float
    if (!content.includes('wa.me/919552084097')) {
        content = content.replace('</body>', `${whatsappButton}\n</body>`);
    }

    // About Us modification
    if (file === 'about.html') {
        const regex = /<p class="text-slate-600 dark:text-gray-300 text-xl mb-10 leading-relaxed font-medium">\s*Located in Vashi Plaza, Navi Mumbai, Deepak Infra Engineering discards the traditional "fix-it"\s*mentality\. We treat IT infrastructure with surgical precision, serving a clientele that demands\s*absolute reliability\.\s*<\/p>/;
        content = content.replace(regex, `
                <div class="space-y-8 mb-10 w-full" data-aos="fade-up">
                    <div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <i class="fas fa-bullseye"></i>
                            </div>
                            <h3 class="text-2xl font-black text-slate-900 dark:text-white">Mission Statement</h3>
                        </div>
                        <p class="text-slate-600 dark:text-gray-300 text-lg leading-relaxed font-medium">
                            Our mission is to provide outstanding IT services that boost the efficiency & reliability of our clients’ Tech operations. We're fueled by a commitment to innovation & passion for delivering top-notch results.
                        </p>
                    </div>
                    <div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                         <div class="flex items-center gap-3 mb-4">
                            <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <i class="fas fa-history"></i>
                            </div>
                            <h3 class="text-2xl font-black text-slate-900 dark:text-white">Brief History</h3>
                        </div>
                        <p class="text-slate-600 dark:text-gray-300 text-lg leading-relaxed font-medium">
                            Established in 2012, Deepak Infra-Engineering has evolved from a humble startup into a leading IT service provider. Over time, we've broadened our range of services & earned trust of a loyal client base, thanks to our commitment & expertise.
                        </p>
                    </div>
                </div>`);
    }

    fs.writeFileSync(`${dir}/${file}`, content, 'utf-8');
});
console.log('Update finished.');

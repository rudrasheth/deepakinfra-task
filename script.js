// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Navbar Scroll Effect
    const nav = document.querySelector('nav div');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('shadow-xl', 'bg-slate-900');
            nav.classList.remove('bg-slate-900/90');
        } else {
            nav.classList.remove('shadow-xl', 'bg-slate-900');
            nav.classList.add('bg-slate-900/90');
        }
    });

    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 900, once: true });
    }

    // Modal Handling
    window.openQuoteModal = function(serviceOption = null) {
        const modal = document.getElementById('quoteModal');
        if (!modal) return;
        modal.classList.remove('opacity-0', 'pointer-events-none');
        const content = modal.querySelector('div');
        if (content) {
            content.classList.remove('scale-95');
            content.classList.add('scale-100');
        }
        if (serviceOption) {
            const selectElement = modal.querySelector('select[name="service"]');
            if (selectElement) {
                for (let i = 0; i < selectElement.options.length; i++) {
                    if (selectElement.options[i].value === serviceOption) {
                        selectElement.selectedIndex = i;
                        break;
                    }
                }
            }
        }
    };

    window.closeQuoteModal = function() {
        const modal = document.getElementById('quoteModal');
        if (!modal) return;
        modal.classList.add('opacity-0', 'pointer-events-none');
        const content = modal.querySelector('div');
        if (content) {
            content.classList.remove('scale-100');
            content.classList.add('scale-95');
        }
    };

    // Generic Form Handler
    function handleFormSubmit(formId, btnId, responseId, formType) {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = document.getElementById(btnId);
            const responseDiv = document.getElementById(responseId);
            const formData = new FormData(this);
            formData.append('form_type', formType);

            btn.disabled = true;
            const originalText = btn.innerHTML;
            btn.innerHTML = 'SENDING... <i class="fas fa-spinner fa-spin"></i>';
            if (responseDiv) {
                responseDiv.classList.add('hidden');
            }

            fetch('send-mail.php', { method: 'POST', body: formData })
            .then(r => {
                return r.text().then(text => {
                    try {
                        return JSON.parse(text);
                    } catch (e) {
                        console.error("Raw response:", text);
                        throw new Error("Invalid JSON response from server");
                    }
                });
            })
            .then(data => {
                btn.disabled = false;
                btn.innerHTML = originalText;
                if (responseDiv) {
                    responseDiv.classList.remove('hidden');
                    if (data.status === 'success') {
                        responseDiv.className = "mt-4 p-3 rounded-lg text-sm font-semibold text-center bg-green-100 text-green-800";
                        responseDiv.innerHTML = data.message;
                        form.reset();
                        if (formId === 'quoteForm') {
                            setTimeout(() => {
                                window.closeQuoteModal();
                                responseDiv.classList.add('hidden');
                            }, 3000);
                        }
                    } else {
                        responseDiv.className = "mt-4 p-3 rounded-lg text-sm font-semibold text-center bg-red-100 text-red-800";
                        responseDiv.innerHTML = data.message;
                    }
                }
            })
            .catch((err) => {
                console.error("Submission error:", err);
                btn.disabled = false;
                btn.innerHTML = originalText;
                if (responseDiv) {
                    responseDiv.classList.remove('hidden');
                    responseDiv.className = "mt-4 p-3 rounded-lg text-sm font-semibold text-center bg-red-100 text-red-800";
                    responseDiv.innerHTML = 'An error occurred. Please try again later.';
                }
            });
        });
    }

    // Initialize forms
    handleFormSubmit('quoteForm', 'quoteSubmitBtn', 'formResponse', 'Service Quote');
    handleFormSubmit('contactForm', 'contactSubmitBtn', 'contactResponse', 'Contact Inquiry');

    // Service card hover effect
    const cards = document.querySelectorAll('.service-card');
    if (cards.length > 0) {
        document.body.addEventListener('mousemove', e => {
            requestAnimationFrame(() => {
                for (const card of cards) {
                    const rect = card.getBoundingClientRect();
                    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
                }
            });
        });
    }
});

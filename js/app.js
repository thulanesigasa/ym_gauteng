import { validateRegistrationForm } from './validation.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal-up');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Toast Notification System
    const toastContainer = document.getElementById('toast-container');
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }

    // 5. YVP Form Submission Logic with Validation
    const yvpForm = document.getElementById('yvp-form');
    const successMessage = document.getElementById('success-message');
    const submitBtn = document.getElementById('submit-btn');

    if (yvpForm) {
        yvpForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(yvpForm);
            const data = Object.fromEntries(formData.entries());
            
            // Input Validation & Sanitization via Module
            const validationResult = validateRegistrationForm(data);
            if (!validationResult.isValid) {
                showToast(validationResult.errors[0], 'error');
                return;
            }

            // UI Feedback
            submitBtn.textContent = 'Registering...';
            submitBtn.disabled = true;

            // Simulate Backend Call with sanitized data
            try {
                await simulateBackendCall(validationResult.sanitizedData);
                
                // Success State
                yvpForm.classList.add('hidden');
                successMessage.classList.remove('hidden');
                showToast('Registration successful! Check your email.', 'success');
                
                // Entrance animation for success message
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    successMessage.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'translateY(0)';
                }, 100);

            } catch (error) {
                console.error('Registration failed:', error);
                showToast('Registration failed. Please try again.', 'error');
                submitBtn.textContent = 'Try Again';
                submitBtn.disabled = false;
            }
        });
    }

    // 6. Helper: Simulate Backend API Call
    function simulateBackendCall() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, message: 'Partner registered successfully' });
            }, 1500);
        });
    }

    // 7. Mobile Menu Toggle with ARIA & Focus Trap
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            mobileMenu.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : 'initial';
            
            if (isOpen) {
                const firstFocusable = navLinks.querySelectorAll(focusableElements)[0];
                if (firstFocusable) firstFocusable.focus();
            }
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('open');
                mobileMenu.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'initial';
            });
        });
    }

    // 7. Smooth Scroll for Anchor Links (using Lenis)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                lenis.scrollTo(targetElement, {
                    offset: -80,
                    duration: 1.5
                });
            }
        });
    });
});

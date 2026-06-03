document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations (fade-up elements that aren't already animated on load)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation to elements as they scroll into view
    const animateElements = document.querySelectorAll('.differentiator-card, .treatment-card, .highlight-card, .team-image-frame, .team-content, .testimonial-card, .benefit-card, .card.v3');
    animateElements.forEach(el => {
        el.style.opacity = '0'; // hide initially
        observer.observe(el);
    });

    // Mobile Menu Toggle
    const hamburgerBtn = document.querySelector('.hamburger-menu-btn');
    const mobileDrawer = document.querySelector('.mobile-drawer');

    if (hamburgerBtn && mobileDrawer) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            mobileDrawer.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close drawer when clicking a link (except the dropdown toggle)
        mobileDrawer.querySelectorAll('a').forEach(link => {
            if (!link.classList.contains('mobile-dropdown-toggle')) {
                link.addEventListener('click', () => {
                    hamburgerBtn.classList.remove('active');
                    mobileDrawer.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                });
            }
        });
    }

    // Mobile Dropdown Toggle
    const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');
    const mobileDropdownMenu = document.querySelector('.mobile-dropdown-menu');
    if (mobileDropdownToggle && mobileDropdownMenu) {
        mobileDropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            mobileDropdownMenu.classList.toggle('active');
            const arrow = mobileDropdownToggle.querySelector('.arrow');
            if (arrow) {
                arrow.style.transform = mobileDropdownMenu.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });
    }
});

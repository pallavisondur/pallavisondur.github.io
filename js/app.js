/**
 * Pallavi Sondur Portfolio & Insights Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initCVTabs();
    initBlogReaderDrawer();
    initNavHighlighting();
    initAmbientParallax();
});

/**
 * Extended CV Tab Switcher
 */
function initCVTabs() {
    const tabBtns = document.querySelectorAll('.cv-tab-btn');
    const tabContents = {
        'timeline': document.getElementById('tab-timeline'),
        'skills': document.getElementById('tab-skills'),
        'education': document.getElementById('tab-education')
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Update tab button active states
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle visibility of content layers with smooth fade
            Object.keys(tabContents).forEach(key => {
                if (tabContents[key]) {
                    if (key === targetTab) {
                        tabContents[key].style.display = 'block';
                        tabContents[key].style.opacity = '0';
                        setTimeout(() => {
                            tabContents[key].style.opacity = '1';
                            tabContents[key].style.transition = 'opacity 0.35s ease';
                        }, 20);
                    } else {
                        tabContents[key].style.display = 'none';
                    }
                }
            });
        });
    });
}

/**
 * Immersion Blog Reader Drawer Modal
 */
function initBlogReaderDrawer() {
    const drawer = document.getElementById('blog-drawer');
    const backdrop = document.getElementById('reader-overlay');
    const closeBtn = document.getElementById('close-drawer-btn');
    const progressBar = document.getElementById('reader-progress');

    // Selectable blog elements (featured hero + cards)
    const blogTriggerCards = document.querySelectorAll('[data-blog-id]');

    blogTriggerCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent triggering if clicked on direct links inside card
            if (e.target.tagName === 'A' && e.target.getAttribute('href') !== '#') {
                return;
            }

            const blogId = card.getAttribute('data-blog-id');
            const blogData = BLOGS_DATA.find(b => b.id === blogId);

            if (blogData) {
                openBlogDrawer(blogData);
            }
        });
    });

    function openBlogDrawer(data) {
        document.getElementById('drawer-title').innerText = data.title;
        document.getElementById('drawer-subtitle').innerText = data.subtitle;
        document.getElementById('drawer-category').innerText = data.category;
        document.getElementById('drawer-author').innerText = data.author;
        document.getElementById('drawer-date').innerText = `${data.date} • ${data.readTime}`;
        document.getElementById('drawer-hero-img').src = data.image;
        document.getElementById('drawer-hero-img').alt = data.title;
        document.getElementById('drawer-content').innerHTML = data.content;

        // Reset scroll position and progress bar
        drawer.scrollTop = 0;
        if (progressBar) progressBar.style.width = '0%';

        // Open Drawer
        drawer.classList.add('active');
        backdrop.classList.add('active');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeBlogDrawer() {
        drawer.classList.remove('active');
        backdrop.classList.remove('active');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeBlogDrawer);
    if (backdrop) backdrop.addEventListener('click', closeBlogDrawer);

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('active')) {
            closeBlogDrawer();
        }
    });

    // Reading progress calculation
    drawer.addEventListener('scroll', () => {
        const totalHeight = drawer.scrollHeight - drawer.clientHeight;
        if (totalHeight > 0 && progressBar) {
            const progress = (drawer.scrollTop / totalHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }
    });
}

/**
 * Floating Navigation Active State on Scroll
 */
function initNavHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.scrollY + 250;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Soft Ambient Parallax Effect on Mouse Move
 */
function initAmbientParallax() {
    const orbs = document.querySelectorAll('.orb');

    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

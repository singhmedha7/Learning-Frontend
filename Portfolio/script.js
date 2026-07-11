// ============================================================
// 1. NAVIGATION: Hamburger Toggle
// ============================================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
}

// ============================================================
// 2. SMOOTH SCROLL (with fixed nav offset)
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const navHeight = 80;
            const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
    });
});

// ============================================================
// 3. PROFILE CARD: 3D TILT & SHINE
// ============================================================
const profileCard = document.getElementById('profileCard');
if (profileCard) {
    const inner = profileCard.querySelector('.profile-card-inner');
    const shine = profileCard.querySelector('.profile-shine');

    profileCard.addEventListener('mousemove', (e) => {
        const rect = profileCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        if (shine) {
            shine.style.setProperty('--mouse-x', (x / rect.width) * 100 + '%');
            shine.style.setProperty('--mouse-y', (y / rect.height) * 100 + '%');
        }
    });

    profileCard.addEventListener('mouseleave', () => {
        inner.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
}

// ============================================================
// 4. PORTFOLIO GALLERY: PANORAMA (Drag + Wheel + Click)
// ============================================================
const galleryData = [
    { id: 1, title: 'Project Alpha', category: 'Brand Identity', img: 'https://picsum.photos/seed/1/600/800', challenge: 'The client needed a cohesive brand identity to stand out in a saturated market.', process: 'We conducted extensive competitor research and developed a modular design system.', solution: 'A distinctive visual language that increased brand recognition by 40%.' },
    { id: 2, title: 'Brand Refresh', category: 'Visual Identity', img: 'https://picsum.photos/seed/2/600/800', challenge: 'An established company needed to modernize without alienating their loyal audience.', process: 'We preserved core brand elements while introducing a contemporary palette and typography.', solution: 'A refreshed identity that felt both familiar and forward-looking.' },
    { id: 3, title: 'Campaign X', category: 'Creative Direction', img: 'https://picsum.photos/seed/3/600/800', challenge: 'The campaign needed to resonate across multiple demographics and platforms.', process: 'We developed a flexible campaign architecture with modular creative assets.', solution: 'A campaign that performed 25% above benchmark across all channels.' },
    { id: 4, title: 'Editorial Suite', category: 'Print & Digital', img: 'https://picsum.photos/seed/4/600/800', challenge: 'Creating a consistent editorial language across quarterly publications.', process: 'We designed a grid system and typographic hierarchy that scaled beautifully.', solution: 'A cohesive editorial suite that reduced production time by 30%.' },
    { id: 5, title: 'Packaging Overhaul', category: 'Packaging Design', img: 'https://picsum.photos/seed/5/600/800', challenge: 'The packaging needed to communicate premium quality on a crowded shelf.', process: 'We explored structural design and material choices that elevated the unboxing experience.', solution: 'Packaging that increased shelf appeal and drove a 15% sales uplift.' },
    { id: 6, title: 'Digital Ecosystem', category: 'Web & Interactive', img: 'https://picsum.photos/seed/6/600/800', challenge: 'A fragmented digital presence needed to be unified into a seamless ecosystem.', process: 'We mapped user journeys and designed a connected system of touchpoints.', solution: 'A unified digital experience that improved user engagement by 60%.' }
];

const track = document.getElementById('galleryTrack');
const overlay = document.getElementById('projectOverlay');
const overlayBody = document.getElementById('overlayBody');
const overlayClose = document.getElementById('overlayClose');

// Render gallery items
if (track) {
    galleryData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.dataset.id = item.id;
        div.innerHTML = `
            <img src="${item.img}" alt="${item.title}" loading="lazy" />
            <div class="gallery-item-overlay">
                <h4>${item.title}</h4>
                <span>${item.category}</span>
            </div>
        `;
        div.addEventListener('click', () => openOverlay(item));
        track.appendChild(div);
    });

    // --- Drag to Scroll ---
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let currentTranslate = 0;

    track.addEventListener('mousedown', (e) => {
        isDown = true;
        track.style.cursor = 'grabbing';
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
        isDown = false;
        if (track) track.style.cursor = 'grab';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDown || !track) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.5;
        track.scrollLeft = scrollLeft - walk;
    });

    // --- Wheel Scroll ---
    const wrapper = document.getElementById('galleryWrapper');
    if (wrapper) {
        wrapper.addEventListener('wheel', (e) => {
            if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)){
            e.preventDefault();
            track.scrollLeft += e.deltaX || e.deltaY * 0.8;
            }
        }, { passive: false });
    }

    // --- Touch Drag for Mobile ---
    let touchStartX = 0;
    let touchScrollLeft = 0;
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX - track.offsetLeft;
        touchScrollLeft = track.scrollLeft;
    });

    track.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - track.offsetLeft;
        const walk = (x - touchStartX) * 1.2;
        track.scrollLeft = touchScrollLeft - walk;
    });
}

// ============================================================
// 5. PROJECT OVERLAY (Lightbox)
// ============================================================
function openOverlay(item) {
    if (!overlayBody) return;
    overlayBody.innerHTML = `
        <h2>${item.title}</h2>
        <p style="font-family: 'Inter', sans-serif; font-size: 0.9rem; opacity: 0.6; margin-top: -8px;">${item.category}</p>
        <div class="overlay-image" style="background: rgba(163,137,106,0.1); padding: 40px; text-align: center; border-radius: 12px; margin: 16px 0; color: var(--forest); opacity: 0.5;">[ Project Image Placeholder — Replace with your own ]</div>
        <h4>Challenge</h4>
        <p>${item.challenge}</p>
        <h4>Process</h4>
        <p>${item.process}</p>
        <h4>Solution</h4>
        <p>${item.solution}</p>
    `;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeOverlay() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

if (overlayClose) {
    overlayClose.addEventListener('click', closeOverlay);
}

// Close overlay on backdrop click
if (overlay) {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeOverlay();
    });
}

// Close overlay with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('open')) {
        closeOverlay();
    }
});

// ============================================================
// 6. CONTACT FORM: mailto: handler (optional improvement)
// ============================================================
// The form already uses mailto: in the HTML action.
// If you want to intercept and add a custom subject/body, you can use this:
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    // The default mailto behavior works fine.
    // This is just to show you can customize if needed.
    console.log('Form submitted via mailto.');
});
// ============================================================
// 7. SERVICES: Staggered Entrance Animation (Intersection Observer)
// ============================================================
const servicesSection = document.querySelector('.services-section');
const serviceCards = document.querySelectorAll('.service-card');

if (servicesSection && serviceCards.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                serviceCards.forEach((card, index) => {
                    // Read delay from data attribute, fallback to index * 0.1
                    const delay = parseFloat(card.dataset.delay) || (index * 0.1);
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, delay * 1000);
                });
                observer.unobserve(servicesSection); // Only trigger once
            }
        });
    }, {
        threshold: 0.15, // Triggers when 15% of the section is visible
        rootMargin: '0px 0px -50px 0px' // Slightly offset for better feel
    });

    observer.observe(servicesSection);
}


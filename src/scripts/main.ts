// Small, dependency-free progressive enhancements. The site works without any of this;
// each feature is opt-in via a data attribute so new markup can reuse it.

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Header: add a backdrop once the page is scrolled, and drive the mobile menu. */
function initHeader() {
    const header = document.querySelector<HTMLElement>('[data-header]');
    if (!header) return;

    const onScroll = () => header.toggleAttribute('data-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const toggle = header.querySelector<HTMLButtonElement>('[data-menu-toggle]');
    const menu = header.querySelector<HTMLElement>('[data-menu]');
    if (!toggle || !menu) return;

    const setOpen = (open: boolean) => {
        toggle.setAttribute('aria-expanded', String(open));
        menu.hidden = !open;
        header.toggleAttribute('data-scrolled', open || window.scrollY > 8);
    };

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !menu.hidden) {
            setOpen(false);
            toggle.focus();
        }
    });
    window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => e.matches && setOpen(false));
}

/** [data-reveal]: fade elements up as they scroll into view. Optional data-reveal-delay="120" (ms). */
function initReveal() {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
        elements.forEach((el) => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
    );

    elements.forEach((el) => {
        if (el.dataset.revealDelay) el.style.setProperty('--reveal-delay', `${el.dataset.revealDelay}ms`);
        observer.observe(el);
    });
}

/** [data-spotlight]: a soft glow that follows the cursor across a card. */
function initSpotlight() {
    document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((el) => {
        el.addEventListener('pointermove', (e) => {
            const rect = el.getBoundingClientRect();
            el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
            el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
        });
    });
}

/** [data-rotator]: cycle the data-active attribute through its children (styling lives in the markup). */
function initRotator() {
    if (prefersReducedMotion) return;

    document.querySelectorAll<HTMLElement>('[data-rotator]').forEach((el) => {
        const items = Array.from(el.children);
        if (items.length < 2) return;

        let index = 0;
        window.setInterval(() => {
            items[index].removeAttribute('data-active');
            index = (index + 1) % items.length;
            items[index].setAttribute('data-active', '');
        }, 2600);
    });
}

initHeader();
initReveal();
initSpotlight();
initRotator();

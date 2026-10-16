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

/** [data-count="5000"]: count up from zero when scrolled into view. Optional data-prefix / data-suffix wrap the number. */
function initCountUp() {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

    const format = new Intl.NumberFormat('en-US');
    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                observer.unobserve(entry.target);

                const el = entry.target as HTMLElement;
                const target = Number(el.dataset.count);
                const finalText = el.textContent;
                const { prefix = '', suffix = '' } = el.dataset;
                const duration = 1400;
                const start = performance.now();

                const tick = (now: number) => {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = `${prefix}${format.format(Math.round(target * eased))}${suffix}`;
                    if (progress < 1) requestAnimationFrame(tick);
                    else el.textContent = finalText;
                };
                requestAnimationFrame(tick);
            }
        },
        { threshold: 0.6 }
    );

    document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => observer.observe(el));
}

/** [data-copy="text"]: copy to the clipboard. Buttons start hidden and are only shown when the Clipboard API exists. */
function initCopy() {
    if (!navigator.clipboard) return;

    document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((button) => {
        const status = button.querySelector<HTMLElement>('[data-copy-status]');
        const idleText = status?.textContent ?? '';
        button.hidden = false;
        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(button.dataset.copy ?? '');
            } catch {
                return;
            }
            button.setAttribute('data-copied', '');
            if (status) status.textContent = 'Copied!';
            window.setTimeout(() => {
                button.removeAttribute('data-copied');
                if (status) status.textContent = idleText;
            }, 2000);
        });
    });
}

/** [data-print]: open the print dialog (buttons start hidden, since printing needs JS). */
function initPrint() {
    document.querySelectorAll<HTMLButtonElement>('[data-print]').forEach((button) => {
        button.hidden = false;
        button.addEventListener('click', () => window.print());
    });
}

initHeader();
initReveal();
initSpotlight();
initRotator();
initCountUp();
initCopy();
initPrint();

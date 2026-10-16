// ─────────────────────────────────────────────────────────────────────────────
// Site configuration — identity, navigation, links and page copy.
// Career facts (jobs, skills, stats, education) live in src/data/resume.ts.
// ─────────────────────────────────────────────────────────────────────────────
import type { IconName } from '../lib/icons';

export interface NavItem {
    label: string;
    href: string;
}

export interface SocialLink {
    label: string;
    href: string;
    icon: IconName;
}

const email = 'treyhemond@gmail.com';
const linkedin = 'https://www.linkedin.com/in/treyhemond';

export const site = {
    /** Full name — used in the header, footer, page titles and meta tags. */
    name: 'Trey Hemond',
    /** Short first name used in casual copy ("Hi, I'm …"). */
    shortName: 'Trey',
    /** Two-letter monogram for the logo mark. Keep public/favicon.svg in sync. */
    initials: 'TH',
    /** Appended to the name in the home page <title>. */
    tagline: 'Sales, Communications & PR, Campaigns & Advocacy',
    /** Default meta description for search engines and link previews. */
    description:
        'Trey Hemond is a sales and communications professional in Palm Harbor, FL: #1 in sales every month, PR that earned Wall Street Journal and AP coverage, and $10,000+ raised for campaigns.',
    /** Default social preview image (1200×630) in /public. */
    ogImage: '/og-image.png',
    /** Version label shown in the footer while the site is a work in progress. */
    version: 'v0.2',

    email,
    linkedin,

    hero: {
        /** Small status pill above the headline. Set to null to hide it. */
        status: { label: 'Open to new opportunities', href: '/#contact' } as { label: string; href: string } | null,
        /** Lead-in for the rotating phrases below the headline. */
        lead: 'I help organizations',
        /** Phrases that rotate after the lead-in. The first one is shown when motion is reduced. */
        roles: ['win customers.', 'earn headlines.', 'mobilize communities.', 'raise funds.'],
        intro: "I'm a client-focused sales and communications professional based in Palm Harbor, FL — with a track record in retail sales, public relations and political campaigns."
    },

    about: {
        title: 'Sales instincts, a communicator’s toolkit, and an organizer’s drive',
        /** Each string is a paragraph. */
        bio: [
            'I hold an M.S. in Business Management and a B.A. in Political Science, with a minor in Mass Communication Studies, from the University of Florida.',
            "My experience spans target-driven retail sales, public relations and political campaigns. I've been the #1 sales rep every month, led a PR strategy that earned coverage in the Wall Street Journal and the Associated Press, and organized fundraisers that raised $10,000+.",
            "Along the way I've built teams and grown organizations — from founding a student group that registered 200+ new voters to leading a national honor society chapter to a record induction class."
        ]
    },

    contact: {
        title: "Let's work together",
        body: "I'm looking for my next role in sales, communications and PR, or campaigns and advocacy. If you're hiring — or just want to connect — I'd love to hear from you."
    },

    /** Primary navigation. Anchor links (/#about) scroll to sections on the home page. */
    nav: [
        { label: 'About', href: '/#about' },
        { label: 'Work', href: '/work' },
        { label: 'Experience', href: '/#experience' },
        { label: 'Resume', href: '/resume' },
        { label: 'Blog', href: '/blog' }
    ] satisfies NavItem[],

    /** Profiles shown in the hero, footer, contact section and résumé. */
    socials: [
        { label: 'LinkedIn', href: linkedin, icon: 'linkedin' },
        { label: 'Email', href: `mailto:${email}`, icon: 'mail' }
    ] satisfies SocialLink[],

    /**
     * The semi-hidden "After Hours" section for fun projects (src/pages/after-hours/).
     * It's left out of the nav, sitemap and search engines, and reached via a small moon icon in the footer.
     * Hidden is not private: anyone with the link can open it.
     */
    afterHours: {
        title: 'After Hours',
        href: '/after-hours',
        intro: "You found the back room. This corner of the site isn't in the menu: it's for fun stuff, side projects and things I want to share with friends. If you're here, someone probably sent you."
    },

    /** Repository for this site — linked from the footer. Set to '' to hide. */
    sourceUrl: 'https://github.com/treyhemond/astro-platform-starter'
};

export type SiteConfig = typeof site;

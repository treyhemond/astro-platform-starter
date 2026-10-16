// ─────────────────────────────────────────────────────────────────────────────
// Site configuration — the single source of truth for who you are and what the
// site says. Most copy changes start (and end) here.
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

export interface FocusArea {
    title: string;
    description: string;
    icon: IconName;
}

export const site = {
    /** Full name — used in the header, footer, page titles and meta tags. */
    name: 'Trey Hemond',
    /** Short first name used in casual copy ("Hi, I'm …"). */
    shortName: 'Trey',
    /** Two-letter monogram for the logo mark. Keep public/favicon.svg in sync. */
    initials: 'TH',
    /** Default meta description for search engines and link previews. */
    description: 'The personal website of Trey Hemond — projects, writing, and experiments, built in public.',
    /** Version label shown in the status pill and footer while the site is a work in progress. */
    version: 'v0.1',

    hero: {
        /** Small status pill above the headline. Set to null to hide it. */
        status: { label: 'Work in progress — building in public', href: '/blog/hello-world' } as { label: string; href: string } | null,
        /** Phrases that rotate after "I build …". The first one is shown when motion is reduced. */
        roles: ['things for the web.', 'side projects.', 'tools that help.', 'ideas into prototypes.'],
        intro: 'Welcome to my corner of the internet — a home for the things I make, the things I learn, and the experiments in between.',
        /** Lines printed in the hero's terminal card. */
        now: ['Building this site', 'Exploring Astro + Netlify', 'Collecting ideas for the next project']
    },

    about: {
        title: 'A little about me',
        /** Each string is a paragraph. */
        bio: [
            "I'm a builder at heart: I like taking an idea, poking at it until it works, and then making it a little better every day.",
            'This site is my home base on the web. It is intentionally a work in progress — expect it to grow as I add projects, write things down, and try out new tech.'
        ],
        focus: [
            { title: 'Build', description: 'Turning ideas into working software, from quick prototypes to polished projects.', icon: 'code' },
            { title: 'Explore', description: 'Trying new tools and platforms, and finding better ways to make things.', icon: 'compass' },
            { title: 'Share', description: 'Writing down what I learn so others (and future me) can benefit.', icon: 'book' }
        ] satisfies FocusArea[]
    },

    contact: {
        title: "Let's connect",
        body: "Have an idea, a question, or just want to say hi? I'd love to hear from you.",
        /** If set, the primary contact button becomes a mailto: link. Otherwise it links to the first social profile. */
        email: '' as string
    },

    /** Primary navigation. Anchor links (/#about) scroll to sections on the home page. */
    nav: [
        { label: 'About', href: '/#about' },
        { label: 'Projects', href: '/projects' },
        { label: 'Blog', href: '/blog' },
        { label: 'Lab', href: '/lab' }
    ] satisfies NavItem[],

    /** Profiles shown in the hero, footer and contact section. */
    socials: [{ label: 'GitHub', href: 'https://github.com/treyhemond', icon: 'github' }] satisfies SocialLink[],

    /** Repository for this site — linked from the footer. */
    sourceUrl: 'https://github.com/treyhemond/astro-platform-starter'
};

export type SiteConfig = typeof site;

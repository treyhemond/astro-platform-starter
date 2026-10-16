// ─────────────────────────────────────────────────────────────────────────────
// Résumé data — the single source of truth for career facts. The home page
// (stats, skills, timeline, education), the /resume page and the structured
// data for search engines all read from here. Update a job once, here.
// Dates use 'YYYY-MM'; `end: null` means "Present".
// ─────────────────────────────────────────────────────────────────────────────
import type { IconName } from '../lib/icons';

export interface Role {
    role: string;
    org: string;
    start: string;
    end: string | null;
    note?: string;
    bullets: string[];
}

export interface SkillArea {
    area: string;
    icon: IconName;
    /** One concrete result that backs up the skill area. */
    proof: string;
    items: string[];
}

export interface Stat {
    /** What's displayed, e.g. "$10K+". */
    value: string;
    label: string;
    /** Optional count-up animation: animates from 0 to `count`, wrapped in prefix/suffix. */
    count?: number;
    prefix?: string;
    suffix?: string;
}

export const resume = {
    headline: ['Sales', 'Communications & PR', 'Campaigns & Advocacy'],
    location: { city: 'Palm Harbor', region: 'FL' },

    summary:
        'Client-focused sales and communications professional with an M.S. in Business Management from the University of Florida. Ranked #1 sales representative every month in a target-driven retail role and led a PR strategy that earned coverage in the Wall Street Journal and the Associated Press. Brings campaign field experience, $10,000+ in fundraising results, and a record of building teams and growing organizations.',

    /** Headline numbers for the hero card. */
    stats: [
        { value: '#1', label: 'Sales rep, every month' },
        { value: '$10K+', label: 'Raised in statewide fundraisers', count: 10, prefix: '$', suffix: 'K+' },
        { value: '5,000+', label: 'Voter contact calls made', count: 5000, suffix: '+' },
        { value: '200+', label: 'New voters registered', count: 200, suffix: '+' }
    ] satisfies Stat[],

    /** Outlets where earned media was secured (shown as plain-text names, not logos). */
    press: ['The Wall Street Journal', 'Associated Press', 'ABC Canberra'],

    skills: [
        {
            area: 'Sales & Client Relations',
            icon: 'trending-up',
            proof: 'Ranked #1 sales rep among peers every month at Alliance Mobile.',
            items: ['Consultative selling', 'Upselling & cross-selling', 'Objection handling', 'Customer retention']
        },
        {
            area: 'Communications & PR',
            icon: 'megaphone',
            proof: 'Earned coverage in the Wall Street Journal, the AP and ABC Canberra.',
            items: ['Media relations', 'Press releases', 'Crisis communications', 'Messaging', 'Public speaking']
        },
        {
            area: 'Campaigns & Organizing',
            icon: 'users',
            proof: 'Raised $10,000+ and made 5,000+ voter contact calls in one cycle.',
            items: ['Voter outreach', 'Phone banking', 'Fundraising events', 'Volunteer recruitment & training']
        },
        {
            area: 'Operations',
            icon: 'clipboard',
            proof: 'Managed a $4,000+ annual budget and planned statewide events.',
            items: ['Event planning', 'Budgeting', 'Scheduling & coordination', 'Stakeholder management']
        }
    ] satisfies SkillArea[],

    experience: [
        {
            role: 'Sales Representative',
            org: 'Alliance Mobile',
            start: '2023-08',
            end: '2024-02',
            bullets: [
                'Ranked #1 sales representative among peers every month, consistently exceeding individual and store sales targets.',
                'Identified customer needs and matched them with tailored product and service plans, driving upsell and cross-sell revenue.',
                'Built customer loyalty through empathetic, solutions-focused service in a fast-paced retail environment.'
            ]
        },
        {
            role: 'Event Server',
            org: 'Delectables Fine Catering, Inc.',
            note: 'Part-time',
            start: '2016-11',
            end: null,
            bullets: ['Deliver polished, client-facing service at private and corporate catered events of all sizes; team member for nearly 10 years.']
        },
        {
            role: 'Field Organizer',
            org: 'Florida Democratic Party',
            start: '2020-06',
            end: '2020-11',
            bullets: [
                'Planned and executed 2 statewide virtual fundraisers featuring Florida senators and representatives, raising $10,000+.',
                'Recruited, trained, and led a team of 10 volunteers; personally made 5,000+ voter contact calls.'
            ]
        }
    ] satisfies Role[],

    leadership: [
        {
            role: 'Public Relations Director',
            org: 'University of Florida College Democrats',
            start: '2019-01',
            end: '2021-05',
            bullets: [
                'Directed PR for the largest political organization on campus (100+ members) during a presidential election year, securing earned media in the Wall Street Journal, the Associated Press, and ABC Canberra.',
                'Wrote press releases, coordinated interviews, and managed crisis communications; drove an approximately 20% increase in event attendance and membership.'
            ]
        },
        {
            role: 'President',
            org: 'UF Tau Sigma National Honor Society',
            start: '2020-05',
            end: '2021-05',
            bullets: ['Led a 7-member executive board; launched a mentorship program and inducted a record 27 new members.']
        },
        {
            role: 'Co-Founder & President',
            org: 'St. Petersburg College Young Democrats',
            start: '2018-08',
            end: '2018-12',
            bullets: [
                'Founded the organization and registered 200+ new voters in partnership with local campaigns.',
                'Also served as Student Government President, securing funding for 20+ student organizations and leading homecoming festivities for 500+ students.'
            ]
        }
    ] satisfies Role[],

    education: [
        { school: 'University of Florida', degree: 'M.S. in Business Management', date: '2022-08' },
        { school: 'University of Florida', degree: 'B.A. in Political Science; Minor in Mass Communication Studies', date: '2021-05' },
        { school: 'St. Petersburg College', degree: 'Associate of Arts', date: '2018-12' }
    ],

    /** The "Additional" section on /resume, worded as on the PDF résumé. */
    additional: [
        'UF Club Table Tennis Treasurer: managed a $4,000+ annual budget; ran a fundraising tournament generating $800+.',
        'Completed an 11-month, 20-state solo road trip across 15 national parks (2022–2023).'
    ],

    /** "Off the clock" cards on the home page. */
    beyond: [
        {
            title: '20-state solo road trip',
            icon: 'mountain' as IconName,
            text: 'Completed an 11-month, 20-state solo road trip across 15 national parks (2022–2023).',
            stats: [
                { value: '11', label: 'months' },
                { value: '20', label: 'states' },
                { value: '15', label: 'national parks' }
            ]
        },
        {
            title: 'UF Club Table Tennis',
            icon: 'award' as IconName,
            text: 'Treasurer: managed a $4,000+ annual budget and ran a fundraising tournament generating $800+.',
            stats: [
                { value: '$4K+', label: 'annual budget' },
                { value: '$800+', label: 'tournament raised' }
            ]
        }
    ]
};

const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

/** '2023-08' → 'Aug 2023'; null → 'Present'. */
export function formatMonth(value: string | null) {
    if (!value) return 'Present';
    const [year, month] = value.split('-').map(Number);
    return monthFormatter.format(new Date(Date.UTC(year, month - 1)));
}

export function formatRange(start: string, end: string | null) {
    return `${formatMonth(start)} – ${formatMonth(end)}`;
}

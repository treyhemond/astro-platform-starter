// schema.org structured data, so search engines understand the site is a person's profile.
import { site } from '../config/site';
import { resume } from '../data/resume';

export function personSchema(siteUrl?: URL) {
    const schools = [...new Set(resume.education.map((e) => e.school))];
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: site.name,
        url: siteUrl?.href,
        email: `mailto:${site.email}`,
        jobTitle: resume.headline.join(', '),
        description: site.description,
        address: { '@type': 'PostalAddress', addressLocality: resume.location.city, addressRegion: resume.location.region, addressCountry: 'US' },
        alumniOf: schools.map((name) => ({ '@type': 'CollegeOrUniversity', name })),
        knowsAbout: resume.skills.flatMap((s) => s.items),
        sameAs: site.socials.map((s) => s.href).filter((href) => href.startsWith('http'))
    };
}

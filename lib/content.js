// All Seenteco wording lives here (taken from "Seenteco Website Content.docx").
// Services come from data/services.json. Fill CONTACT when the client sends the details: they then appear everywhere.
import DOC from '../data/services.json';
import { STORIES } from './stories';

export const DOMAIN = 'https://seenteco.com';
export const SHOW_TEAM = false;   // set true when the client sends team photos and details: shows the team section, the home 'Meet the team' block and the footer link
export const CONTACT = { address: ['King Fahad Road | Ar Rahmaniyah', 'Riyadh 12341 | Kingdom of Saudi Arabia'], email: 'info@seenteco.com', phone: '+966 11 270 1448', linkedin: '', reg: '', social: [] };   // social: [{ name: 'Instagram', url: 'https://...' }]
export const FOOT_DESC = 'Sustainability, energy, technology, operational excellence and agriculture consulting for the Kingdom of Saudi Arabia.';
export const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const DESIGN = {
  'sustainability-esg': { word: 'SUSTAIN', fit: 0.9, fitm: 0.94, theme: 'moss', tag: 'Strategy → Accountability', row: 'Make sustainability measurable, reportable and investor-ready.',
    sectors: ['Industrial & Manufacturing', 'Real Estate & Facilities', 'Government & Public Sector'], conn: ['energy', 'technology'],
    title: 'ESG & Carbon Reporting in Saudi Arabia | Seenteco', desc: 'GHG inventories, GRI and ISSB reporting, Tadawul ESG readiness and net-zero roadmaps, built on verified data.' },
  energy: { word: 'ENERGY', fit: 0.72, fitm: 0.94, theme: 'cream', outline: true, tag: 'Less consumption. More value.', row: 'Cut the costs. Keep the comfort. Prove the savings.',
    sectors: ['Real Estate & Facilities', 'Hospitality, Tourism & Events', 'Industrial & Manufacturing'], conn: ['technology', 'operational-excellence'],
    title: 'Energy Audits & Efficiency in Saudi Arabia | Seenteco', desc: 'ASHRAE energy audits, cooling optimisation, rooftop solar studies and IPMVP-verified savings for buildings and factories.' },
  technology: { word: 'DIGITAL', fit: 0.7, fitm: 0.94, theme: 'deep', tag: 'Connected systems. Clearer decisions.', row: 'Turn energy and operations data into decisions.',
    sectors: ['Data Centres & Technology', 'Industrial & Manufacturing', 'Mining & Utilities'], conn: ['energy', 'operational-excellence'],
    title: 'Energy Monitoring & Industrial Tech | Seenteco', desc: 'IoT energy monitoring, BMS optimisation, carbon dashboards and AI predictive maintenance for Saudi facilities.' },
  'operational-excellence': { word: 'EXCEL', fit: 0.62, fitm: 0.94, theme: 'green', tag: 'Better every day, by design', btnclass: 'dark', row: 'Leaner processes. Certified systems. Clearer results.',
    sectors: ['Industrial & Manufacturing', 'Logistics & Warehousing', 'Government & Public Sector'], conn: ['technology', 'sustainability-esg'],
    title: 'ISO 9001, 14001, 45001 & 50001 Consulting | Seenteco', desc: 'Integrated ISO management systems, Lean Six Sigma and KPI frameworks that pass audit and improve performance.' },
  government: { word: '2030', fit: 0.5, fitm: 0.94, theme: 'deep', photo: true, tag: 'National ambition. Practical delivery.', row: 'Delivering on Vision 2030, project by project.',
    sectors: ['Government & Public Sector', 'Real Estate & Facilities', 'Mining & Utilities'], conn: ['sustainability-esg', 'energy'],
    title: 'Vision 2030 & IKTVA Advisory | Seenteco', desc: 'Local content and IKTVA strategy, project sustainability management and energy transition advisory for public entities.' },
  agriculture: { word: 'GROW', fit: 0.46, fitm: 0.94, theme: 'cream', tag: 'Smarter resources. Healthier harvests.', row: 'Grow more with less water.',
    sectors: ['Agriculture & Food Production', 'Government & Public Sector', 'Logistics & Warehousing'], conn: ['energy', 'sustainability-esg'],
    title: 'Smart Irrigation & Agri Consulting, Saudi Arabia | Seenteco', desc: 'Smart irrigation, solar water pumping, fertigation and precision agriculture that help Saudi farms grow more with less water.' },
};
export const ORDER = Object.keys(DESIGN);
export const S = Object.fromEntries(ORDER.map((k) => [k, { slug: k, href: `/services/${k}/`, btn: 'Explore this practice', ...DESIGN[k], ...DOC[k] }]));
export const THEME = { moss: 't-moss', deep: 't-deep', green: 't-green', cream: 't-cream' };
export const wordColor = (s) => (s.slug === 'government' ? '#F7F7EF' : { moss: 'var(--green)', deep: 'var(--green)', green: 'var(--moss)', cream: 'var(--moss)' }[s.theme]);

export const STEPS = [
  ['Assess', 'Know where you stand.', 'Site visits, data collection and a clear, defensible baseline.'],
  ['Plan', 'Know what pays back.', 'Prioritised measures with costs, savings and a board-ready business case.'],
  ['Implement', 'Make it happen on site.', 'Hands-on support through procurement, installation and change management.'],
  ['Verify', 'Prove it. Report it.', 'Measurement, verification and reporting, so every result stands up to scrutiny.'],
];

export const STANDARDS = ['ISO 50001', 'ASHRAE L1–L3', 'IPMVP', 'GHG Protocol', 'ISSB S1 · S2', 'GRI', 'Mostadam', 'LEED', 'ISO 14001', 'ISO 45001', 'SBC 601/602', 'IKTVA'];

export const OFFERS = [
  ['Energy Audit & Savings Plan', 'Find the savings hiding in your bills.', 'A full audit of your factory, building or warehouse, with a costed list of savings measures ranked by payback.', 'Savings register with cost and payback for every measure'],
  ['ESG & Carbon Starter', 'Your first report, done right.', 'Your first GHG inventory and ESG report, built for Tadawul guidelines, investor requests and supplier questionnaires.', 'Scope 1–3 inventory and a publication-ready ESG report'],
  ['Integrated ISO Systems', 'Four standards. One system. Zero duplication.', 'Quality, environment, safety and energy, designed and implemented as a single management system.', 'Documented system, trained team, ready for certification audit'],
];

export const V2030 = [
  ['Energy efficiency', 'SEEC · Saudi Building Code 601/602'], ['Environmental compliance', 'National Center for Environmental Compliance'],
  ['Waste management', 'National Center for Waste Management (MWAN)'], ['ESG disclosure', 'Saudi Exchange · Capital Market Authority'],
  ['Local content', 'IKTVA and national localisation programmes'],
];

export const INDUSTRIES = [
  ['Industrial & Manufacturing', "Energy is often a factory's second-largest operating cost. Major buyers now send ESG questionnaires with every tender, and certification is the entry ticket to new contracts.", 'Energy audits · Integrated ISO systems · GHG inventory · Supplier ESG readiness · Predictive maintenance'],
  ['Real Estate & Facilities', "Cooling drives most of a building's energy use. Building codes and green certifications keep tightening, and tenants increasingly expect efficient, certified space.", 'Cooling optimisation · BMS tuning · Mostadam and LEED · Rooftop solar · SBC 601/602 compliance'],
  ['Logistics & Warehousing', 'Vast roofs, temperature-controlled space and large fleets, with clients asking more and more about the emissions in their supply chain.', 'Rooftop solar · Warehouse energy audits · Fleet emissions · Scope 3 reporting · ISO 50001'],
  ['Hospitality, Tourism & Events', 'Guests and event partners expect visible sustainability, and the Kingdom has a decade of world-class tourism and events ahead.', 'Hotel energy and water efficiency · Event carbon footprints · Sustainable event management (ISO 20121) · ESG reporting'],
  ['Data Centres & Technology', 'Power and cooling demand at a scale few sectors match, in one of the hottest climates on earth, with customers asking for low-carbon capacity.', 'Cooling efficiency · PUE improvement · Energy monitoring · Renewable sourcing feasibility · Carbon reporting'],
  ['Mining & Utilities', "Water, emissions and community impact under close investor scrutiny, in one of Vision 2030's priority sectors.", 'GHG inventory · ESG reporting · Climate risk assessment · ISO 14001 and 45001'],
  ['Government & Public Sector', 'National targets, local content requirements and programmes that must show measurable results to leadership and the public.', 'Energy transition advisory · Public building efficiency · IKTVA and local content · Project sustainability management'],
  ['Agriculture & Food Production', 'Water scarcity, rising input costs and national food-security targets, with buyers and investors asking for proof of good practice.', 'Smart irrigation · Solar pumping · Fertigation · Precision agriculture · Saudi GAP readiness'],
];
export const IND_NAMES = INDUSTRIES.map((i) => i[0]);

export const ARTICLES = [
  ['ESG & carbon', 'Your first GHG inventory: a practical guide for Saudi companies.', 'What to measure, which data to collect, and the mistakes that make first-year numbers unreliable.', 'field', true, 'first-ghg-inventory-saudi-companies'],
  ['ESG & carbon', 'ESG disclosure in Saudi Arabia: what listed companies should prepare for.', 'Where Tadawul guidance and CMA expectations are heading, and how to get ready before reporting becomes mandatory.', 'sand', false, 'esg-disclosure-saudi-arabia'],
  ['Energy', "Cooling is your biggest energy bill. Here's where to start.", 'Five checks on chillers, controls and setpoints that often pay back within the first year.', 'steel', false, 'cooling-biggest-energy-bill'],
  ['Green buildings', 'Mostadam or LEED: which rating fits your project?', 'How the Saudi and international systems compare on cost, effort and market recognition.', 'sky', false, 'mostadam-or-leed'],
  ['ESG & carbon', 'Supplier ESG questionnaires: how to answer with confidence.', 'What major buyers are really asking, and how to build answers you can stand behind.', 'dark', false, 'supplier-esg-questionnaires'],
  ['Energy', 'Paying for upgrades from savings: energy performance contracting explained.', 'How shared-savings models work, who carries the risk, and when they make sense.', 'steel', true, 'energy-performance-contracting-explained'],
];

export const FAQ = [
  ['How do we get started?', 'Book a consultation. We will discuss your goals, look at any data you already have and recommend a first step, usually an audit, a carbon baseline or a gap assessment.'],
  ['How long does an energy audit take?', 'It depends on the size of the site and the audit level. A Level 1 walk-through of a single building takes days; a Level 2 or 3 audit of a large factory takes several weeks. You receive a fixed quote after a short scoping call.'],
  ['We are not a listed company. Do we still need ESG reporting?', 'Increasingly, yes. Large buyers, banks and investors now ask suppliers and borrowers for emissions and ESG data. Having it ready helps you win contracts and access finance.'],
  ['What are Scope 1, 2 and 3 emissions?', 'Scope 1 is fuel you burn directly, such as generators and vehicles. Scope 2 is the electricity you buy. Scope 3 is everything else in your value chain, from purchased goods to transport and business travel.'],
  ['Can you get us ISO certified?', 'We design and implement your management system, train your team and prepare you for the audit. The certificate itself is issued by an independent accredited certification body, which keeps the process credible.'],
  ['Do you only advise, or do you help implement?', 'Both. We support procurement, oversee installation, train your team and verify the results, so recommendations become real savings.'],
  ['How do you prove the savings are real?', 'We follow IPMVP, the international measurement and verification protocol. We fix a baseline before any change, adjust for weather and occupancy, and report verified savings against it.'],
  ['What is Mostadam?', "Mostadam is Saudi Arabia's own green building rating system, designed for the Kingdom's climate and priorities. We guide projects from design to certification."],
  ['What does a performance-linked fee mean?', "On selected energy projects, part or all of our fee is paid from the savings we verify. If the savings don't materialise, neither does that part of the fee."],
  ['Do you work outside Riyadh?', 'Yes. We are based in Riyadh and work with clients across the Kingdom.'],
  ['Do you deliver reports in Arabic?', 'Yes. We deliver in Arabic, English or both, depending on your audience.'],
];

export const VALUES = [['Integrity', 'We only report what we can verify.'], ['Precision', 'Decisions rest on measured data, not assumptions.'],
  ['Partnership', "We succeed when our clients' results hold up a year later."], ['Local commitment', "We build Saudi capability, in our team and in our clients' teams."]];
export const PRINCIPLES = [['Measured, not promised', 'Every engagement starts with a baseline and ends with verified results.'], ['Saudi context first', 'We work to Saudi regulations, codes and Vision 2030 programmes from day one.'],
  ['With you on site', 'We stay through implementation, not just until the report is delivered.']];
export const MODELS = [['Fixed-scope studies', 'Audits, assessments and reports with a defined scope, timeline and price.'], ['Ongoing advisory', 'Monthly support for reporting, compliance and management systems.'],
  ['Performance-linked', 'Selected energy projects where our fees are tied to verified savings.']];

export const NAV = [['Home', '/'], ['Services', '/services/'], ['Industries', '/industries/'], ['Insights', '/insights/'], ...(STORIES.length ? [['Client stories', '/client-stories/']] : []), ['About', '/about/'], ['Contact', '/contact/']];

// ARTICLES: [category, title, summary, picture, featured, slug]. Add `body` later, e.g. body: [{ h: 'Heading', p: 'Paragraph' }], to publish the full article.
export const ARTICLE_BODIES = {};   // slug -> [{ h, p }]   (800-1,200 words, written by a named expert)
export const ARTICLE_BYLINES = {};  // slug -> 'Name, role'

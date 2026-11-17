import ContactForm from '../../components/ContactForm';
import { S, ORDER, CONTACT } from '../../lib/content';

export const metadata = {
  title: { absolute: 'Book a Consultation | Seenteco' },
  description: 'Tell us about your site, targets or reporting deadline. A senior consultant will come back with a clear first step.',
  alternates: { canonical: '/contact/' },
};

const Card = ({ t, ico, children }) => (
  <div className="icard rv"><span className="ico">{ico}</span><div><b>{t}</b><span>{children}</span></div></div>
);

export default function Contact() {
  const areas = ['Not sure yet', ...ORDER.map((k) => S[k].name)];
  return (
    <>
      <section className="sec t-green chero">
        <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />
        <div className="wrap">
          <h1 className="h-xl rv">Let’s find<br />your quickest wins.</h1>
          <div className="bar">
            <p className="lead">Tell us about your site, your targets or your next reporting deadline. Our team will come back to you with a clear first step.</p>
            <a className="circle" href="#form" aria-label="Scroll to form">↘</a>
          </div>
        </div>
      </section>

      <section className="sec t-deep cform" id="form">
        <i className="wv" />
        <div className="wrap">
          <div className="ct-g">
            <div className="ct-l">
              <h2 className="h-l rv">Speak with<br /><span className="acc">a consultant</span></h2>
              <p className="lead">Every enquiry is reviewed by a senior consultant, not a sales desk.</p>
              <div className="icards">
                <Card t="Office" ico="⌂">{CONTACT.address.map((l, i) => <span key={i}>{i > 0 && <br />}{l}</span>)}</Card>
                <Card t="Working hours" ico="◷">Sunday to Thursday, 8:00 am to 5:00 pm</Card>
                {CONTACT.email && <Card t="Email" ico="@"><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></Card>}
                {CONTACT.phone && <Card t="Phone" ico="☎"><a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a></Card>}
                {CONTACT.linkedin && <Card t="LinkedIn" ico="in"><a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">Seenteco on LinkedIn ↗</a></Card>}
              </div>
              <h3 className="nxt-h">What happens next</h3>
              <ol className="nxt">
                {['We review your enquiry and match it to the right specialist.', 'We arrange a short call to understand your site and goals.', 'You receive a clear proposal with scope, timeline and fee.'].map((t, i) => (
                  <li className="rv" key={t}><span>{i + 1}</span><div><p>{t}</p></div></li>
                ))}
              </ol>
            </div>
            <ContactForm areas={areas} />
          </div>
        </div>
      </section>

      <section className="sec t-moss last cmap">
        <i className="wv" />
        <div className="wrap">
          <h2 className="h-l rv">Based in <span className="acc">Riyadh.</span></h2>
          <p className="lead rv">We are based in Riyadh and work with clients across the Kingdom.</p>
          <div className="mapbox rv">
            <iframe title="Seenteco is based in Riyadh, Kingdom of Saudi Arabia" src="https://www.google.com/maps?q=Riyadh%2C+Saudi+Arabia&z=11&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>
          <a className="maplink" href="https://www.google.com/maps/search/?api=1&query=Riyadh%2C+Saudi+Arabia" target="_blank" rel="noopener noreferrer">Open in Google Maps ↗</a>
        </div>
      </section>
    </>
  );
}

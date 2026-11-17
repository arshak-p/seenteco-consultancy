import { Cta, Tags } from '../../components/blocks';
import { INDUSTRIES } from '../../lib/content';
import { BASE } from '../../lib/base';

export const metadata = {
  title: { absolute: 'Industries We Serve | Seenteco' },
  description: 'Sustainability and energy consulting for manufacturing, real estate, logistics, hospitality, data centres, mining and government.',
  alternates: { canonical: '/industries/' },
};

export default function Industries() {
  return (
    <>
      <section className="sec ind-hero">
        <div className="wrap">
          <div className="head"><h1 className="h-xl rv">Deep in the sectors that power the Kingdom.</h1></div>
          <div className="bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, marginTop: 6 }}>
            <p className="lead">Every sector has its own energy profile, regulators and pressure points. We focus where energy, emissions and compliance have the biggest impact on cost and reputation, and we speak the language of each sector.</p>
            <a className="circle" href="#sectors" aria-label="Scroll to sectors">↘</a>
          </div>
          <div className="photo"><img src={BASE + '/img/riyadh.jpg'} alt="Riyadh skyline" loading="lazy" data-par="" /></div>
          <p className="cap">Illustrative imagery — not a SEENTECO project</p>
        </div>
      </section>
      <section className="sec ind-list" id="sectors" style={{ paddingBottom: 'var(--wh)' }}>
        <div className="wrap">
          {INDUSTRIES.map(([n, ch, hw]) => (
            <div className="ind rv" key={n}>
              <h3>{n}</h3>
              <div><div className="k">The challenge</div><p>{ch}</p><div className="k">How we help</div><Tags items={hw.split(' · ')} /></div>
            </div>
          ))}
        </div>
      </section>
      <Cta heading={<>Don’t see<br />your sector?</>} text="If you use energy, report emissions or answer to regulators, we can help. Tell us about your operation." />
    </>
  );
}

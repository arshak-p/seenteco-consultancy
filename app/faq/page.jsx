import Btn from '../../components/Btn';
import Faq from '../../components/Faq';
import { Cta } from '../../components/blocks';
import { FAQ } from '../../lib/content';

export const metadata = {
  title: { absolute: 'FAQ | Seenteco' },
  description: 'Answers to the questions buyers ask before they reach out: audits, ESG reporting, ISO certification, savings verification and more.',
  alternates: { canonical: '/faq/' },
};

export default function FaqPage() {
  return (
    <>
      <section className="sec page-hero" style={{ paddingBottom: 'var(--wh)' }}>
        <div className="wrap">
          <h1 className="h-xl rv">Questions<br />we hear often.</h1>
          <div className="faq-g" id="qs">
            <div className="side"><p>Can’t find your answer? Talk to a consultant.</p><Btn href="/contact/" cls="sm">Contact the team</Btn></div>
            <Faq items={FAQ} />
          </div>
        </div>
      </section>
      <Cta heading={<>Ready to see<br />what you could save?</>} text="Book a consultation and we will map your quickest wins." />
    </>
  );
}

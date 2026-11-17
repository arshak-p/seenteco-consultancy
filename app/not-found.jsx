import Btn from '../components/Btn';

export const metadata = { title: { absolute: 'Page not found | Seenteco' } };

export default function NotFound() {
  return (
    <section className="sec page-hero" style={{ paddingBottom: 'var(--wh)', minHeight: '80vh' }}>
      <div className="wrap">
        <h1 className="h-xl rv">Page not<br />found.</h1>
        <p className="lead" style={{ margin: '20px 0 28px' }}>The page you are looking for may have moved. Try the home page or tell us what you need.</p>
        <div className="btns"><Btn href="/" cls="dark">Back to home</Btn><Btn href="/contact/" cls="line">Contact the team</Btn></div>
      </div>
    </section>
  );
}

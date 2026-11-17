import './globals.css';
import { DM_Sans, Caveat } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';
import BackToTop from '../components/BackToTop';
import SiteEffects from '../components/SiteEffects';
import { DOMAIN } from '../lib/content';
import { BASE, DEMO } from '../lib/base';

const dm = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-dm', display: 'swap' });
const caveat = Caveat({ subsets: ['latin'], weight: ['600'], variable: '--font-caveat', display: 'swap' });

export const metadata = {
  metadataBase: new URL(DOMAIN),
  title: { absolute: 'Seenteco | Sustainability & Energy Consulting, Riyadh' },
  description: 'Cut energy costs, report ESG with confidence and deliver on Vision 2030. Saudi consultancy for sustainability, energy and operations.',
  openGraph: { type: 'website', siteName: 'Seenteco', images: ['/assets/og.png'] },
  twitter: { card: 'summary_large_image' },
  ...(DEMO ? { robots: { index: false, follow: false } } : {}),     // the public demo copy must not compete with seenteco.com in search
  icons: { icon: [{ url: BASE + '/favicon.ico' }, { url: BASE + '/assets/favicon-32.png', sizes: '32x32', type: 'image/png' }], apple: BASE + '/assets/apple-touch-icon.png' },
};
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#F7F7EF' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dm.variable} ${caveat.variable}`} suppressHydrationWarning>
      <head><script src={BASE + '/boot.js'} /></head>
      <body>
        <div className="pt" id="pt" aria-hidden="true"><img src={BASE + '/assets/logo.png'} alt="" /></div>
        <Preloader />
        <Header />
        <main>{children}</main>
        <Footer />
        <div className="prog" id="prog" aria-hidden="true" />
        <div className="toast" id="toast" role="status" />
        <BackToTop />
        <SiteEffects />
      </body>
    </html>
  );
}

import { notFound } from 'next/navigation';
import { ServiceDetail } from '../../../components/blocks';
import { S, ORDER } from '../../../lib/content';

export const dynamicParams = false;
export function generateStaticParams() { return ORDER.map((slug) => ({ slug })); }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = S[slug];
  if (!s) return {};
  return { title: { absolute: s.title }, description: s.desc, alternates: { canonical: s.href }, openGraph: { title: s.title, description: s.desc } };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const s = S[slug];
  if (!s) notFound();
  return <ServiceDetail s={s} />;
}

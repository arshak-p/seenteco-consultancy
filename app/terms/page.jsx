import Legal from '../../components/Legal';

export const metadata = { title: { absolute: 'Terms of Use | Seenteco' }, description: 'The terms for using the Seenteco website.', alternates: { canonical: '/terms/' } };

export default function Terms() {
  return (
    <Legal title="Terms of Use" intro="The terms that apply when you use the Seenteco website." ctaHeading={<>Questions about<br />these terms?</>} sections={[
      ['Using this website', 'The information on this website is general and is provided to help you understand our services. It is not professional advice for your specific situation.'],
      ['Our services', 'Scope, fees and deliverables for any engagement are set out in a written proposal agreed with you. Savings and outcomes are never guaranteed unless stated in that agreement.'],
      ['Intellectual property', 'The content, design and logo on this website belong to Seenteco. You may not copy or reuse them without permission.'],
      ['Links and availability', 'We try to keep the website accurate and available, but we do not promise it will be free of errors or interruptions. Links to other websites are provided for convenience only.'],
      ['Changes and law', 'We may update these terms from time to time. They are governed by the laws of the Kingdom of Saudi Arabia.'],
    ]} />
  );
}

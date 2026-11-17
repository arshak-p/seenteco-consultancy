import Legal from '../../components/Legal';

export const metadata = { title: { absolute: 'Privacy Policy | Seenteco' }, description: 'How Seenteco collects, uses and protects personal data.', alternates: { canonical: '/privacy/' } };

export default function Privacy() {
  return (
    <Legal title="Privacy Policy" intro="How Seenteco collects, uses and protects your information." ctaHeading={<>Questions about<br />your data?</>} sections={[
      ['What we collect', 'When you send an enquiry or subscribe to our newsletter, we collect the details you give us: your name, company, job title, email address, phone number and message.'],
      ['How we use it', 'We use your details to reply to your enquiry, prepare proposals and, if you subscribe, send our monthly updates. We do not sell your personal data.'],
      ['Sharing', 'We share personal data only with service providers who help us run the website and email, and where the law requires it.'],
      ['Keeping it safe', 'We keep your information only as long as needed for these purposes and take reasonable steps to protect it, in line with the Saudi Personal Data Protection Law.'],
      ['Your rights', 'You may ask to see, correct or delete your personal data, or unsubscribe at any time, by contacting us through the contact page.'],
    ]} />
  );
}

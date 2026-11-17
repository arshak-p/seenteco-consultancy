import Link from 'next/link';

// Button with the arrow on the left that glides to the right on hover (see .btn in globals.css)
export default function Btn({ href, children, cls = '', ...rest }) {
  const inner = (<>{children}<i aria-hidden="true">→</i></>);
  const className = `btn ${cls}`.trim();
  if (href.startsWith('#') || href.startsWith('http')) return <a className={className} href={href} {...rest}>{inner}</a>;
  return <Link className={className} href={href} {...rest}>{inner}</Link>;
}

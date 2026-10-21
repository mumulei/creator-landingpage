import { T } from '../i18n/locale';
import { useReducedMotion } from 'framer-motion';
import AnimatedContent from './ui/AnimatedContent';
import arrowLight from '../assets/footer/arrow-light.svg';
import arrowDark from '../assets/footer/arrow-dark.svg';

function ReadyButton({ href, secondary = false, children }) {
  const arrow = <img src={secondary ? arrowDark : arrowLight} alt="" />;
  return <a href={href} className={`ready-btn ready-btn-${secondary ? 'secondary' : 'primary'} group`}>
    <span className="btn-arrow-left" aria-hidden="true">{arrow}</span>
    <span className="btn-text">{children}</span>
    <span className="btn-arrow-right" aria-hidden="true">{arrow}</span>
  </a>;
}

export default function ReadyToScale({ tokenFactory = false }) {
  const reduced = useReducedMotion();
  const content = <div className="ready-scale-content">
    <h2 className="ready-scale-title"><T>{tokenFactory ? 'Ready to build the future?' : 'Ready to scale your UGC?'}</T></h2>
    <p className="ready-scale-subtitle">{tokenFactory
      ? <><T>{"Join the next generation of creators and developers"}</T><br /><T>{"building on Creatorial's AI infrastructure."}</T></>
      : <><T>{"Connect with creators that get your brand."}</T><br /><T>{"Take your business to the next level."}</T></>}</p>
    <div className="ready-scale-buttons">
      {tokenFactory ? <ReadyButton href="mailto:support@creatorial.com?subject=Token%20Factory%20enquiry"><T>{"Talk to Us"}</T></ReadyButton> : <>
        <ReadyButton href="#get-started"><T>{"Get Started"}</T></ReadyButton>
        <ReadyButton href="#book-demo" secondary><T>{"Book A Demo"}</T></ReadyButton>
      </>}
    </div>
  </div>;
  return <section className="ready-scale-section" id={tokenFactory ? 'tf-contact' : 'ready-to-scale'}>
    <div className="ready-scale-container">{reduced ? content : <AnimatedContent scale={0.95} distance={50} delay={0.1}>{content}</AnimatedContent>}</div>
  </section>;
}

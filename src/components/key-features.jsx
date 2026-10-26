import { T } from '../i18n/locale';
import { GlobeInteractive } from './ui/cobe-globe';
import AnimatedContent from './ui/AnimatedContent';
import { SmoothCorners } from '@lisse/react';
import { MapPin, Venus, Mars } from 'lucide-react';
import avatar1 from '../assets/features/avatar-1.png';
import avatar2 from '../assets/features/avatar-2.png';
import avatar3 from '../assets/features/avatar-3.png';
import pricingIcon1 from '../assets/features/pricing-icon-1.svg';
import pricingIcon2 from '../assets/features/pricing-icon-2.svg';
import pricingIcon3 from '../assets/features/pricing-icon-3.svg';
import youtube from '../assets/features/icon-youtube.svg';
import instagram from '../assets/features/icon-instagram.svg';
import tiktok from '../assets/features/icon-tiktok.svg';
import ariaPortrait from '../assets/features/creator-profiles/aria.jpg';
import liamPortrait from '../assets/features/creator-profiles/liam.jpg';
import sofiaPortrait from '../assets/features/creator-profiles/sofia.jpg';
import ninaPortrait from '../assets/features/creator-profiles/nina.jpg';
import xLogo from '../assets/features/creator-profiles/x.svg';

const creators = [
  { name: 'Arya', image: avatar1, category: 'Lifestyle', location: 'Texas, USA' },
  { name: 'Alex', image: avatar2, category: 'Gaming', location: 'Peoria, AZ' },
  { name: 'Drake', image: avatar3, category: 'Travel', location: 'Paris, France' },
];
const features = [
  { title: '4,000+ in-platform human creators', copy: 'Browse and hire vetted creators directly on Creatorial across multiple markets, languages and content categories.' },
  { title: 'Access to 14M+ influencers globally', copy: 'Tap into a much broader influencer network when you need specific markets, niches, or audience reach beyond our in-platform creator base.' },
  { title: 'Flexible pricing for any campaign size', copy: 'Start with a single video or scale with a subscription. No minimum spend, long-term contracts, or bundled packages.' },
];

function CreatorLibraryArt() {
  const stack = [
    { name: 'Aria Smith', image: ariaPortrait, country: 'United States', language: 'English', gender: 'female', platform: instagram, phase: 'yt' },
    { name: 'Liam Chen', image: liamPortrait, country: 'Canada', language: 'French', gender: 'male', platform: tiktok, phase: 'fb' },
    { name: 'Sofia Martinez', image: sofiaPortrait, country: 'Mexico', language: 'Spanish', gender: 'female', platform: youtube, phase: 'ig' },
    { name: 'Nina Patel', image: ninaPortrait, country: 'India', language: 'Hindi', gender: 'female', platform: xLogo, phase: 'tt' },
  ];
  return <div className="feature-card__illustration feature-card__illustration--social kf-creator-stack" aria-hidden="true">
    {stack.map((creator) => <div className={`social-platform social-platform--${creator.phase} kf-creator-profile`} key={creator.phase}>
      <div className="social-platform__header">
        <div className="social-platform__icon-wrap kf-creator-avatar">
          <img className="social-platform__logo" src={creator.image} alt="" />
          <span className={`kf-creator-platform${creator.platform === xLogo ? ' kf-creator-platform--x' : ''}`}><img src={creator.platform} alt="" /></span>
        </div>
        <div className="social-platform__name-group">
          <span className="social-platform__name kf-creator-name">{creator.name}{creator.gender === 'female' ? <Venus className="kf-gender kf-gender--female" /> : <Mars className="kf-gender kf-gender--male" />}</span>
          <span className="kf-creator-details"><T>{creator.country}</T><i /><T>{creator.language}</T></span>
        </div>
      </div>
    </div>)}
  </div>;
}

function NetworkArt({ isActive }) {
  return <div className="feature-card__illustration feature-card__illustration--globe kf-original-globe" aria-hidden="true">
    <div className="globe-container"><GlobeInteractive className="kf-square-globe" isActive={isActive} /></div>
    {creators.map((creator, i) => <div className={`avatar-tag avatar-tag--${i + 1}`} key={creator.name}>
      <img className="avatar-img" src={creator.image} alt="" />
      <div className="avatar-info"><span className="avatar-name kf-capsule-name">{creator.name}<img className="kf-capsule-platform" src={[instagram, youtube, tiktok][i]} alt="" /></span><span className="avatar-loc"><MapPin className="avatar-loc-icon" /><T>{creator.location}</T></span></div>
    </div>)}
  </div>;
}

function PricingArt() {
  return <div className="feature-card__illustration feature-card__illustration--pricing">
    <div className="pricing-bars">{[pricingIcon1, pricingIcon2, pricingIcon3].map((icon, i) =>
      <div className={`pricing-bar pricing-bar--${i + 1}`} key={icon}><div className="pricing-bar__icon"><span className="pricing-bar__icon-mask" style={{ '--mask-url': `url("${icon}")` }} /></div></div>)}
    </div>
    <div className="pricing-progress"><span className="pricing-label"><T>Start small</T></span><div className="pricing-track"><div className="pricing-fill" /></div><span className="pricing-label"><T>Scale anytime</T></span></div>
  </div>;
}

export default function KeyFeatures({ sectionRef, isActive = true }) {
  return <section id="key-features" ref={sectionRef} className={`key-features-section kf-campaigns${isActive ? '' : ' is-paused'}`}>
    <div className="key-features-container">
      <AnimatedContent distance={60} duration={1}><header className="key-features-header"><h2><T>One platform for all your creator marketing campaigns</T></h2></header></AnimatedContent>
      <div className="key-features-grid">
        {features.map((feature, i) => <AnimatedContent className="feature-card-wrapper" delay={0.1 + i * 0.15} distance={80} duration={1} key={feature.title}>
          <div className={`feature-card-shell kf-campaign-card kf-campaign-card--${i + 1}`}>
            <div className="feature-card-bg-wrapper base-layer"><SmoothCorners className="feature-card-bg-base" corners={{ radius: 16, smoothing: 0.6 }} /></div>
            <div className="feature-card-bg-wrapper hover-layer"><SmoothCorners className="feature-card-bg-hover" corners={{ radius: 16, smoothing: 0.6 }} aria-hidden="true" /></div>
            <div className="feature-card-content-layer">
              <div className="feature-card__content"><h3><T>{feature.title}</T></h3><p><T>{feature.copy}</T></p></div>
              {i === 0 ? <CreatorLibraryArt /> : i === 1 ? <NetworkArt isActive={isActive} /> : <PricingArt />}
            </div>
          </div>
        </AnimatedContent>)}
      </div>
    </div>
  </section>;
}

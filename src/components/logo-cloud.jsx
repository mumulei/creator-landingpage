import logoCom2us from "../assets/local-logos/logo-com2us.svg";
import logoJoycity from "../assets/local-logos/logo-joycity.svg";
import logoRealme from "../assets/local-logos/logo-realme.svg";
import logoTecno from "../assets/local-logos/logo-tecno.svg";
import logoFunplus from "../assets/local-logos/logo-funplus.svg";
import logoMetajoy from "../assets/local-logos/logo-metajoy.svg";
import logoTencent from "../assets/local-logos/logo-tencent.svg";
import logoQingci from "../assets/local-logos/logo-qingci.svg";
import AnimatedContent from "./ui/AnimatedContent";

const logos = [
  { src: logoCom2us, alt: "Com2uS" },
  { src: logoJoycity, alt: "Joycity" },
  { src: logoRealme, alt: "realme" },
  { src: logoTecno, alt: "TECNO" },
  { src: logoFunplus, alt: "FUNPLUS" },
  { src: logoMetajoy, alt: "MetaJoy" },
  { src: logoTencent, alt: "Tencent" },
  { src: logoQingci, alt: "Qingci Games" },
];

function LogoCloud() {
  const repeatedLogos = [...logos, ...logos];

  return (
    <section className="trusted-cloud" aria-labelledby="trusted-cloud-title">
      <AnimatedContent distance={50} duration={1.0}>
        <h2 id="trusted-cloud-title" className="trusted-cloud__title">
          <span className="is-strong">Trusted by Top Gaming Publishers</span>
        </h2>

        <div className="trusted-cloud__rule" aria-hidden="true" />

        <div className="logo-marquee" aria-label="Trusted publisher logos">
          <div className="logo-marquee__track">
            {repeatedLogos.map((logo, index) => (
              <img
                key={`${logo.alt}-${index}`}
                src={logo.src}
                alt={logo.alt}
                className="logo-marquee__image"
                loading="lazy"
                height="40"
              />
            ))}
          </div>
        </div>

        <div className="trusted-cloud__rule is-bottom" aria-hidden="true" />
      </AnimatedContent>
    </section>
  );
}

export default LogoCloud;

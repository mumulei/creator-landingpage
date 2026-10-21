import { useEffect, useRef } from 'react';
import Computer from 'anatomy-figures/computer';
import brandLogo from '../../assets/local-logos/brand-logo.svg';
import { useLocale } from '../../i18n/use-locale';

export default function ComputerFigure() {
  const { locale } = useLocale();
  const ref=useRef(null);
  useEffect(()=>{
    const root=ref.current?.shadowRoot;
    if(!root)return;
    const style=document.createElement('style');
    style.textContent='.iso-plate-corners{display:none!important}.iso-plate{padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;border-radius:0!important;overflow:visible!important}.iso-stage{outline-offset:-8px}';
    root.append(style);
    const logo=root.querySelector('.pc-logo');
    if(logo){
      const image=document.createElementNS('http://www.w3.org/2000/svg','image');
      image.setAttribute('href',brandLogo);image.setAttribute('x','-13');image.setAttribute('y','-139');image.setAttribute('width','26');image.setAttribute('height','26');
      logo.replaceWith(image);
    }
    const svg=root.querySelector('svg');
    svg?.setAttribute('aria-label','Creatorial desktop computer with an interactive screen, keyboard, vents and coiled cable.');
    return()=>style.remove();
  },[]);
  useEffect(() => {
    const root = ref.current?.shadowRoot;
    const stage = root?.querySelector('.iso-stage');
    stage?.setAttribute('aria-label', locale === 'zh' ? '交互电脑：键入文字，按 Escape 切换电源。' : 'Desk computer. Type to write on its screen; Escape switches the power.');
    root?.querySelector('svg')?.setAttribute('aria-label', locale === 'zh' ? 'Creatorial 桌面电脑，配有交互屏幕、键盘和连接线。' : 'Creatorial desktop computer with an interactive screen, keyboard, vents and coiled cable.');
  }, [locale]);
  return <Computer ref={ref} theme="light" className="tf-computer" tokens={{'--anatomy-card':'transparent','--anatomy-paper':'#ffffff'}} />;
}

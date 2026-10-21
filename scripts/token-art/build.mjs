import { writeFileSync, mkdirSync } from 'node:fs';
import * as k from './anatomy-kit.mjs';

// Three conceptual mechanisms, all drawn by the Anatomy kit in one shared camera.
const W=680,H=560;
const P=k.fitProjection([[-110,-85,-20],[110,85,-20],[-110,-85,155],[110,85,155]],W,H,{pad:56,azimuth:40,elevation:32});
function makeScene(type) {
  const items=[];let count=0;
  const box=(name,x,y,w,d,z,h,tone='hi',lift=0,accent=false,inner='')=>{
    const plan={x,y,w,d,r:Math.min(2.4,w/4,d/4)};
    const svg=k.solidSvg(k.slabOf(plan,z,h,P,8,.65),{tone,className:accent?'tf-machine-accent':undefined,inner});
    const [sx,sy]=k.iso(Array.isArray(lift)?lift:[0,0,lift],P),[ox,oy]=k.iso([0,0,0],P);
    items.push({key:k.depthOf([x+w/2,y+d/2,z+h/2],P),svg:`<g data-machine-part="${name}" data-move="${sx-ox},${sy-oy}" data-phase="${count*.13}">${svg}</g>`});count++;
  };
  const screws=(x,y,w,d,z)=>{
    for(const [px,py]of [[x+4,y+4],[x+w-4,y+4],[x+4,y+d-4],[x+w-4,y+d-4]]){
      box('fastener',px-1.2,py-1.2,2.4,2.4,z,1,'mid');
    }
  };
  if(type==='gpu') {
    box('base',-108,-67,216,134,-12,10,'lo');
    for(const x of [-99,88])for(const y of [-57,46])box('foot',x,y,11,11,-20,8,'mid');
    box('pcb',-99,-58,198,116,0,5);screws(-99,-58,198,116,5);
    for(let side=0;side<2;side++)for(let i=0;i<6;i++)box('memory',-84+i*28,side?-49:34,22,13,5,7,'mid');
    box('socket',-43,-31,86,62,5,9,'mid');
    box('die',-33,-22,66,44,14,8,'hi',28,true);
    for(const x of [-45,40])for(const y of [-33,28])box('post',x,y,5,5,14,38,'mid');
    box('cooler-base',-48,-35,96,70,52,5,'hi',45);
    for(let i=0;i<15;i++)box('cooling-fin',-46+i*6.3,-33,2.6,66,57,29,'hi',45);
    for(let i=0;i<7;i++)box('capacitor',-92+i*12,8,7,13,5,12,'mid');
    for(let i=0;i<8;i++)box('port',67,-24+i*6,26,3,5,7,'mid');
    for(let i=0;i<9;i++)box('board-trace',-75+i*17,-3,12,1,5,.3,'lo');
  } else if(type==='rack') {
    box('plinth',-72,-60,144,120,-12,12,'lo');
    for(const x of [-68,61])for(const y of [-55,48])box('rack-post',x,y,7,7,0,141,'mid');
    for(let level=0;level<4;level++) {
      const z=4+level*32;
      const move=level===1?[0,66,0]:0;
      box('server-tray',-61,-48,122,96,z,5,'hi',move);
      box('server',-57,-44,114,88,z+5,19,'hi',move);
      for(let i=0;i<12;i++)box('vent',-51+i*8.5,42,3,2,z+9,10,'lo',move);
      for(let i=0;i<6;i++)box('rack-slot',-50+i*17,-37,12,68,z+24,1.6,'mid',move);
      box('status',49,43,3,2,z+18,3,'hi',move,level===1);
    }
    box('rack-cap',-72,-60,144,120,141,7);screws(-72,-60,144,120,148);
  } else {
    box('router-base',-105,-75,210,150,-12,12,'lo');
    box('router-board',-100,-70,200,140,0,5);
    for(const x of [-86,65])for(const y of [-53,34]){
      box('port-body',x,y,22,24,5,15,'mid');
      for(let j=0;j<4;j++)box('port-contact',x+4+j*4,y+3,1.5,17,20,1,'hi');
    }
    for(const y of [-48,42])box('gantry-rail',-71,y,142,6,24,6,'mid');
    for(const x of [-71,65])for(const y of [-48,42])box('rail-mount',x,y,6,6,5,19,'mid');
    box('carriage',-35,-43,70,86,30,7,'hi',18);
    box('router-core',-24,-24,48,48,37,15,'hi',18,true);
    for(let i=0;i<9;i++)box('core-fin',-21+i*5,-21,2,42,52,13,'mid',18);
    for(let i=0;i<8;i++)for(const side of [-1,1])box('trace',-70+i*18,side<0?-28:27,12,1,5,.5,'lo');
    screws(-100,-70,200,140,5);
  }
  items.sort((a,b)=>a.key-b.key);
  const svg=k.figureSvg({width:W,height:H,label:`Conceptual ${type} compute mechanism`,standalone:'light',body:items.map(i=>i.svg)});
  return {id:type,title:({gpu:'GPU compute',rack:'Compute cluster',router:'Model inference'})[type],parts:count,svg};
}
const scenes=['gpu','rack','router'].map(makeScene);
mkdirSync(new URL('../../public/token-art/',import.meta.url),{recursive:true});
for(const scene of scenes)writeFileSync(new URL(`../../public/token-art/scene-${scene.id}.svg`,import.meta.url),scene.svg);
for(const scene of scenes)console.log(`${scene.title}: ${scene.parts} solids`);

import { mountStackFigure } from './hairline-stack.js';

// Geometry and lifecycle use the unmodified Hairline kernel.
export function mountHairline(HL, stage, svg, read, kind) {
  if(['creator-globe','agent-dot','brain-compute','ai-network'].includes(kind))return mountStackFigure(HL,stage,svg,read,kind);
  const { Cam, fit, proj, facing, rings, prism, solid, put, mk, seg, poly, rrect, pointer, register, tween, tset, tval, tdone, disposer } = HL;
  const bag = disposer();
  const C = Cam(45, .5, 1.6);
  fit(C, [[-62,-48,0],[62,48,0],[-62,-48,102],[62,48,102]],200,166);
  const P = proj(C), front = facing(C);
  const parts = [];
  const base = mk('g', {}, svg);
  const add = (x,y,w,d,z,h,r=3) => {
    const [ring, inner] = rings(x,y,x+w,y+d,r,Math.min(1,w/5,d/5));
    const shape = solid(base);
    put(shape, prism(P,front,ring,inner,z,z+h));
    parts.push({shape, ring, inner, z, h, lift:tween(0), x:x+w/2,y:y+d/2});
    return shape.g;
  };
  const line = (parent,a,b) => mk('path',{d:seg(P(...a),P(...b)),class:'nf lo'},parent);
  if (kind === 'studio') {
    // A reel-to-reel creative console, distinct from the portrait plates above.
    const deck=add(-53,-33,106,70,0,12,6);
    for(const x of [-28,28]){
      const g=add(x-19,-23,38,38,12,6,18);
      const [,ring]=rings(x-9,-13,x+9,5,8,1);
      mk('path',{d:poly(HL.ringAt(P,ring,19)),class:'nf lo'},g);
      for(let j=0;j<3;j++){
        const a=j*Math.PI*2/3;
        line(g,[x+Math.cos(a)*5,-4+Math.sin(a)*5,19],[x+Math.cos(a)*14,-4+Math.sin(a)*14,19]);
      }
    }
    line(deck,[-28,11,13],[28,11,13]);
    for(let i=0;i<6;i++)add(-43+i*15,24,9,7,12,3,2);
    const meter=add(-17,12,34,7,12,3,2);
    for(let i=0;i<8;i++)line(meter,[-13+i*3.7,13,16],[-13+i*3.7,17,16]);
  } else if (kind === 'archive') {
    // Three open model-library drawers, with indexed folders in each tray.
    add(-35,-30,70,62,0,7,5);
    for(const x of [-35,30])add(x,-30,5,62,7,76,2);
    add(-35,-30,70,62,83,5,3);
    for(let i=0;i<3;i++){
      const y=-23+i*6,z=11+i*24;
      add(-28,y,56,54,z,5,3);
      const front=add(-28,y+47,56,7,z+5,13,3);
      const [,ring]=rings(-9,y+54,9,y+58,2,.6);
      mk('path',{d:poly(HL.ringAt(P,ring,z+10)),class:'nf lo'},front);
      for(let j=0;j<5;j++)add(-23+j*9,y+3,3,35,z+5,13,1);
    }
  } else if (kind === 'processor') {
    // One dense processor board; no stacked server chassis is reused here.
    const board=add(-54,-44,108,88,0,6,5);
    for(let i=0;i<9;i++){
      const x=-40+i*10;
      line(board,[x,-39,7],[x,-27,7]);line(board,[x,27,7],[x,39,7]);
    }
    for(let i=0;i<7;i++){
      const y=-30+i*10;
      line(board,[-49,y,7],[-31,y,7]);line(board, [31,y,7],[49,y,7]);
    }
    add(-30,-26,60,52,6,9,4);
    add(-21,-18,42,36,15,12,4);
    for(let i=0;i<8;i++)add(-19+i*5,-16,2,32,27,9,1);
    for(const x of [-46,36])for(let j=0;j<3;j++)add(x,-19+j*15,10,10,6,5,2);
  } else if (kind === 'switchboard') {
    // API distribution: a routing console with banks of real output sockets.
    const panel=add(-53,-36,106,72,0,10,5);
    const bus=add(-42,-27,84,18,10,7,3);
    for(let i=0;i<8;i++)line(bus,[-35+i*10,-23,18],[-35+i*10,-13,18]);
    for(let row=0;row<2;row++)for(let col=0;col<4;col++){
      const x=-40+col*23,y=1+row*18;
      const socket=add(x,y,15,12,10,7,3);
      const [,ring]=rings(x+3,y+3,x+12,y+9,1,.5);
      mk('path',{d:poly(HL.ringAt(P,ring,18)),class:'nf lo'},socket);
      line(panel,[x+7,-8,11],[x+7,y,11]);
    }
  } else if (kind === 'creators') {
    // Three portrait plates: rounded heads and shoulders carry the human identity.
    [-32,0,32].forEach((x,i)=>{
      const g=add(x-16,-16,28,20,4+i*7,54,5,i===1);
      const top=32+i*7;
      const face=rrect(-7,-7,7,7,7,12).map(q=>P(x+q.u,-7,top+q.v));
      mk('path',{d:poly(face),class:'nf'},g);
      const shoulder=[P(x-10,-7,top-18),P(x-7,-7,top-10),P(x+7,-7,top-10),P(x+10,-7,top-18)];
      mk('path',{d:HL.open(shoulder),class:'nf lo'},g);
      for(let j=0;j<3;j++)line(g,[x-8,-7,top-23-j*4],[x+8,-7,top-23-j*4]);
      add(x-15,-15,26,18,0,3,3);
    });
    const camera=add(21,22,34,26,2,21,4);
    const lens=rrect(-6,-6,6,6,6,12).map(q=>P(38+q.u,49,12+q.v));
    mk('path',{d:poly(lens),class:'nf lo'},camera);
    add(25,27,10,7,23,4,2);
  } else if(kind === 'content') {
    add(-48,-36,90,65,0,4,5);
    [0,1,2].forEach(i=>{
      const z=7+i*10; const g=add(-38+i*7,-26-i*7,70,50,z,3,4,i===2);
      const x=-28+i*7,y=-17-i*7;
      line(g,[x,y,z+3],[x+46,y,z+3]);
      mk('path',{d:poly([[x+16,y+8,z+3],[x+16,y+24,z+3],[x+32,y+16,z+3]].map(v=>P(...v))),class:'nf lo'},g);
      for(let j=0;j<3;j++)line(g,[x,y+29+j*3,z+3],[x+46,y+29+j*3,z+3]);
      for(let j=0;j<3;j++)mk('circle',{cx:P(x+j*4,y-5,z+3)[0],cy:P(x+j*4,y-5,z+3)[1],r:.6,class:'dot off'},g);
    });
  } else if(kind === 'gpu') {
    add(-52,-38,104,76,0,8,5);
    for(let i=0;i<3;i++){
      const g=add(-42,-30,84,56,12+i*19,14,3,i===1);
      for(let j=0;j<9;j++)line(g,[-34+j*8,-23,26+i*19],[-34+j*8,18,26+i*19]);
      for(let j=0;j<8;j++)line(g,[-32+j*9,26,17+i*19],[-32+j*9,26,22+i*19]);
      line(g,[-37,26,15+i*19],[37,26,15+i*19]);
    }
    for(const x of [-46,41])for(const y of [-32,26])add(x,y,5,5,8,63,2);
  } else if(kind === 'models') {
    add(-48,-40,96,80,0,6,5);
    [[-27,-22],[27,-22],[-27,22],[27,22]].forEach(([x,y])=>{
      const p=P(x,y,15),q=P(0,0,48);
      mk('path',{d:seg(p,q),class:'nf lo'},base);
      const g=add(x-9,y-9,18,18,6,15,4);
      for(let j=0;j<3;j++)line(g,[x-5+j*5,y-5,22],[x-5+j*5,y+5,22]);
    });
    const hub=add(-15,-15,30,30,34,21,5);
    for(let j=0;j<5;j++)line(hub,[-10+j*5,-10,56],[-10+j*5,10,56]);
    for(let j=0;j<5;j++)add(-39+j*16,31,10,5,6,3,1);
  } else {
    add(-48,-32,96,64,0,7,5);
    [0,1,2,3].forEach(i=>{
      const x=-29+i*12,y=-17-i*5,z=8+i*11;
      const coin=add(x,y,30,30,z,6,14);
      const [,inner]=rings(x+7,y+7,x+23,y+23,7,1);
      mk('path',{d:poly(HL.ringAt(P,inner,z+6)),class:'nf lo'},coin);
    });
    for(let j=0;j<5;j++)add(-37+j*15,24,9,4,7,3,1);
  }
  // Each mechanism is built base-first, then its supported parts and front details.
  let selected=-1,hovering=false,focused=false,ambient=0;
  const last=new Map();
  const clock = register(stage, (dt,now)=>{
    ambient+=dt;
    const calm=HL.reducedMotion();
    const touring=!calm&&!hovering&&!focused;
    let moving=false;
    parts.forEach((p,i)=>{
      const breathe=touring?(Math.sin(ambient*.8-i*.45)*.5+.5)*3:0;
      const lift=tval(p.lift,now)+breathe;
      const rounded=Math.round(lift*100)/100;
      if(last.get(i)!==rounded){p.shape.g.setAttribute('transform',`translate(0 ${-rounded*1.6})`);last.set(i,rounded);}
      moving ||= !tdone(p.lift,now);
    });
    return moving||touring;
  });
  const choose=(index)=>{
    if(index===selected)return;
    selected=index;
    parts.forEach((p,i)=>{
      tset(p.lift,i===index?8:0,performance.now(),Math.abs(i-Math.max(index,0))*40);
      p.shape.sil.classList.toggle('hi',index>=0&&i===index);
    });
    read.textContent=index<0?'rest':`${index+1}`;
    clock.wake();
  };
  bag.add(pointer(stage,{move:([x,y])=>{
    hovering=true;
    let nearest=-1,distance=65;
    parts.forEach((p,i)=>{const q=P(p.x,p.y,p.z+p.h);const d=Math.hypot(x-q[0],y-q[1]);if(d<distance){nearest=i;distance=d;}});
    choose(nearest);
  },leave:()=>{hovering=false;choose(-1);clock.wake();}}));
  bag.on(stage,'focus',()=>{focused=true;clock.wake();});
  bag.on(stage,'blur',()=>{focused=false;choose(-1);clock.wake();});
  bag.on(stage,'keydown',(event)=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();choose((selected+(event.key==='ArrowRight'?1:parts.length-1)+parts.length)%parts.length);}});
  bag.add(clock.unregister);bag.add(()=>svg.replaceChildren());
  clock.wake();
  return {set(){},destroy:bag.dispose};
}

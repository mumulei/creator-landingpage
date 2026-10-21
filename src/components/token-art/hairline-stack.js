// Rounded solids, opaque plates and motion use the unmodified Hairline kernel.
export function mountStackFigure(HL,stage,svg,read,kind){
  const {Cam,fit,proj,facing,rings,prism,solid,put,mk,open,poly,seg,fillet,pointer,register,disposer,tween,tset,tval,tdone,spring,stepS}=HL;
  const bag=disposer(),C=Cam(45,.5,1.95);
  const top=kind==='ai-network'?32:kind==='agent-dot'?60:108;
  fit(C,[[-54,-54,0],[54,54,0],[-54,-54,top],[54,54,top]],200,164);
  const P=proj(C),front=facing(C),root=mk('g',{},svg),parts=[],links=[],updates=[];
  const aim={x:spring(0),y:spring(0)};let active=-1,clock=0,hovering=false,pulseClock=0;
  read.textContent='rest';
  const path=(d,cls='nf lo',parent=root)=>mk('path',{d,class:cls},parent);
  const ellipse=(x,y,rx,ry,cls,parent=root)=>mk('ellipse',{cx:x,cy:y,rx,ry,class:cls},parent);
  const plate=(parent,x,y,w,d,z,h,r=4)=>{
    const [a,b]=rings(x-w/2,y-d/2,x+w/2,y+d/2,r,.9);
    const s=solid(parent);put(s,prism(P,front,a,b,z,z+h));return s;
  };
  const slot=(parent,x,y,z,w=16,d=3)=>{
    const [a]=rings(x-w/2,y-d/2,x+w/2,y+d/2,1,.3);
    path(poly(a.map(q=>P(q.u,q.v,z))),'nf lo',parent);
  };
  const movable=(x,y,z,label,lift=12)=>{
    const g=mk('g',{},root),part={g,hit:P(x,y,z),label,lift,v:tween(0),last:null,edge:null};
    parts.push(part);return part;
  };
  const base=(w,d)=>{
    const s=plate(root,0,0,w,d,0,5,6);
    for(let i=0;i<4;i++)slot(s.g,-24+i*16,d/2-7,5,9,2);
  };
  if(kind==='creator-globe'){
    const cx=200,cy=156,r=74;
    ellipse(cx,cy,128,52,'nf lo').setAttribute('transform',`rotate(-22 ${cx} ${cy})`);
    [[108,103],[298,140],[175,236]].forEach(([x,y])=>path(seg([cx+(x-cx)*.59,cy+(y-cy)*.59],[x,y]),'nf lo'));
    ellipse(cx,cy,r,r,'sil');
    // Orthographic surface rotation: hidden longitudes disappear behind the limb.
    const rad=Math.PI/180,tiltView=.18;
    const sphere=([lon,lat],phase)=>{
      const a=lon*rad+phase,b=lat*rad,x=Math.cos(b)*Math.sin(a),z=Math.cos(b)*Math.cos(a),y=Math.sin(b);
      return [x,-y*Math.cos(tiltView)+z*Math.sin(tiltView),y*Math.sin(tiltView)+z*Math.cos(tiltView)];
    };
    const grid=[...[-45,0,45].map(lat=>Array.from({length:121},(_,i)=>[-180+i*3,lat])),...Array.from({length:8},(_,j)=>Array.from({length:61},(_,i)=>[j*45,-90+i*3]))];
    const gridPaths=grid.map(()=>path('','nf lo'));
    const drawSurface=time=>{
      const phase=-.35+time*.12;
      grid.forEach((points,i)=>{let d='',front=false;points.forEach(q=>{const [x,y,z]=sphere(q,phase);if(z>=0){d+=`${front?'L':'M'}${cx+x*r} ${cy+y*r}`;front=true;}else front=false;});gridPaths[i].setAttribute('d',d);});
    };
    drawSurface(0);updates.push(drawSurface);
    // The near half of the orbit passes in front of the globe, not behind it.
    const tilt=-22*Math.PI/180;
    path(open(Array.from({length:65},(_,i)=>{
      const angle=i*Math.PI/64,x=128*Math.cos(angle),y=52*Math.sin(angle);
      return [cx+x*Math.cos(tilt)-y*Math.sin(tilt),cy+x*Math.sin(tilt)+y*Math.cos(tilt)];
    })),'nf lo');
    [[108,103,'Video creator'],[298,140,'Image creator'],[175,250,'Voice creator']].forEach(([x,y,label],i)=>{
      const p=movable(0,0,0,label,9);p.hit=[x,y-7];
      if(i===2){p.restY=-14;p.hit[1]-=14;}
      const Q=(u,v)=>[x+u*.94,y+u*.35-v],outline=fillet([[-17,-17],[17,-17],[17,26],[-17,26]],[4,4,4,4],6);
      path(poly(outline.map(([u,v])=>{const q=Q(u,v);return [q[0]+4,q[1]-2];})),'lo',p.g);
      p.edge=path(poly(outline.map(([u,v])=>Q(u,v))),'sil',p.g);
      path(poly(Array.from({length:32},(_,j)=>{const a=j*Math.PI/16;return Q(Math.cos(a)*6,10+Math.sin(a)*6);})), 'nf',p.g);
      path(open(Array.from({length:21},(_,j)=>{const a=j*Math.PI/20;return Q(Math.cos(a)*10,-7+Math.sin(a)*9);})), 'nf',p.g);
      for(let k=0;k<3;k++){const q=Q(-5+k*5,-12);mk('circle',{cx:q[0],cy:q[1],r:.8,class:k===i?'dot m':'dot off'},p.g);}
    });
  }else if(kind==='agent-dot'){
    // One neural lattice: open manufactured frames, with actual connections through the apertures.
    const layers=[
      {y:-25,nodes:[[-13,25],[0,50],[13,25]],label:'Input layer'},
      {y:0,nodes:[[-13,24],[-13,49],[13,24],[13,49]],label:'Hidden layer'},
      {y:25,nodes:[[-13,25],[0,50],[13,25]],label:'Output layer'},
    ];
    const wires=mk('g',{},root);
    layers.forEach((layer,i)=>{
      const p=movable(0,layer.y,37,layer.label,9);layer.part=p;
      const Q=(u,v,depth=0)=>P(u,layer.y+depth,v);
      const outer=fillet([[-26,8],[26,8],[26,66],[-26,66]],[5,5,5,5],8);
      const inner=fillet([[-22,12],[22,12],[22,62],[-22,62]],[3,3,3,3],8);
      const outline=depth=>poly(outer.map(([u,v])=>Q(u,v,depth)))+poly(inner.map(([u,v])=>Q(u,v,depth)));
      const back=path(outline(-2.4),'lo',p.g);back.setAttribute('fill-rule','evenodd');
      p.edge=path(outline(0),'sil',p.g);p.edge.setAttribute('fill-rule','evenodd');
      for(const x of [-19,19])path(seg(Q(x,9),Q(x,3)),'nf lo',p.g);
      for(let k=0;k<3;k++){const q=Q(-5+k*5,10);mk('circle',{cx:q[0],cy:q[1],r:.7,class:k===i?'dot m':'dot off'},p.g);}
      layer.nodes.forEach(([u,v])=>{
        const q=Q(u,v);ellipse(q[0],q[1],4,4,'sil',p.g);ellipse(q[0],q[1],1.3,1.3,'dot off',p.g);
      });
    });
    layers.slice(0,-1).forEach((layer,i)=>layer.nodes.forEach(([u,v],j)=>{
      layers[i+1].nodes.forEach(([u2,v2],k)=>{
        if(Math.abs(v-v2)>26||Math.abs(j-k)>1)return;
        const a=P(u,layer.y,v),b=P(u2,layers[i+1].y,v2);
        links.push({node:path(seg(a,b),'nf lo',wires),a,b,from:layer.part,to:layers[i+1].part});
      });
    }));
  }else if(kind==='brain-compute'){
    base(100,86);
    for(const x of [-39,39])for(let i=0;i<4;i++)plate(root,x,-24+i*16,9,10,5,4,2);
    for(let i=0;i<8;i++){const x=-28+i*8;path(open([P(x,-37,6),P(x,-27,6),P(x*.65,-19,6)]));}
    for(let layer=0;layer<3;layer++){
      const z=12+layer*19,p=movable(0,0,z,`Compute module ${layer+1}`,10+layer*3);
      p.edge=plate(p.g,0,0,59,51,z,7).sil;
      if(layer<2)for(let i=0;i<6;i++)slot(p.g,-21+i*8,16,z+7,4,2);
      else{plate(p.g,0,0,43,36,z+7,5);for(let i=0;i<7;i++)plate(p.g,-18+i*6,0,2.8,30,z+12,8,1);}
    }
  }else if(kind==='ai-network'){
    // A complete orbit: Creatorial routes intelligence to five model providers.
    const cx=200,cy=160,radius=88;
    const point=(angle,r)=>[cx+Math.cos(angle)*r,cy+Math.sin(angle)*r];
    const angleAt=t=>(-225+270*t)*Math.PI/180;
    ellipse(cx,cy,radius,radius,'nf lo');
    const tools=[['gemini','Gemini'],['openai','GPT'],['claude','Claude'],['deepseek','DeepSeek'],['grok','Grok']];
    tools.forEach(([slug,name],i)=>{
      const angle=angleAt(i/(tools.length-1)),[x,y]=point(angle,radius);
      const a=point(angle,24),b=point(angle,radius-17),control=point(angle+.13,54);
      const connection=path(`M${a[0]} ${a[1]}Q${control[0]} ${control[1]} ${b[0]} ${b[1]}`,'nf lo');
      const p=movable(0,0,0,name,0);p.hit=[x,y];p.connection=connection;
      p.channel={a,b,control};
      p.edge=ellipse(x,y,17,17,'sil',p.g);
      p.logo=mk('image',{href:`/token-art/ai-logos/${slug}.svg`,x:x-9,y:y-9,width:18,height:18},p.g);
      p.logoPath=`/token-art/ai-logos/${slug}`;
    });
    ellipse(cx,cy,25,25,'sil');ellipse(cx,cy,20,20,'nf lo');
    mk('image',{href:'/token-art/creatorial.svg',x:cx-12,y:cy-12,width:24,height:24},root);
  }
  // Normalize the rest composition once; motion never changes this frame or picking.
  const bounds=root.getBBox();
  const visualWidth=250;
  const scale=Math.min(visualWidth/bounds.width,200/bounds.height);
  const offsetX=200-(bounds.x+bounds.width/2)*scale;
  const offsetY=254-(bounds.y+bounds.height)*scale;
  root.setAttribute('transform',`translate(${offsetX} ${offsetY}) scale(${scale})`);
  root.setAttribute('data-rest-frame',JSON.stringify({left:200-bounds.width*scale/2,right:200+bounds.width*scale/2,top:254-bounds.height*scale,bottom:254}));
  // Pulse overlay is excluded from the fixed rest-frame measurement.
  const pulse=kind==='ai-network'?mk('g',{'data-network-pulse':'',visibility:'hidden'},root):null;
  const pulseRing=pulse?ellipse(200,160,26,26,'nf lo',pulse):null;
  const streams=pulse?parts.map(p=>{
    const node=path(p.connection.getAttribute('d'),'nf hi tf-network-trace',pulse);
    const length=100,segment=46;node.setAttribute('pathLength',length);
    return {node,length,segment};
  }):[];
  const choose=index=>{
    if(index===active)return;const from=index<0?active:index,now=performance.now();active=index;
    parts.forEach((p,i)=>{tset(p.v,index<0?0:i===index?p.lift:p.lift*.16,now,Math.abs(i-from)*40);p.edge?.classList.toggle('hi',i===index);p.connection?.classList.toggle('hi',i===index);if(p.logo)p.logo.setAttribute('href',`${p.logoPath}${i===index?'-active':''}.svg`);});
    read.textContent=index<0?'rest':parts[index].label;loop.wake();
  };
  const loop=register(stage,(dt,now)=>{
    const reduced=HL.reducedMotion();if(!reduced)clock+=dt;stepS(aim.x,dt);stepS(aim.y,dt);
    updates.forEach(draw=>draw(reduced?0:clock));
    if(pulse){
      const playing=hovering&&!reduced;pulse.setAttribute('visibility',playing?'visible':'hidden');
      if(playing){
        pulseClock+=dt;
        const cycle=pulseClock%1.15;
        const ringSize=26+Math.min(cycle/.65,1)*8;
        pulseRing.setAttribute('rx',ringSize);pulseRing.setAttribute('ry',ringSize);
        streams.forEach(({node,length,segment},i)=>{
          const phase=cycle-i*.055,t=Math.max(0,Math.min(phase/.62,1));
          node.setAttribute('visibility',phase>=0&&phase<=.62?'visible':'hidden');
          node.setAttribute('stroke-dashoffset',segment-(length+segment)*t);
        });
      }
    }
    parts.forEach((p,i)=>{const fixed=kind==='ai-network',idle=reduced||fixed?0:Math.sin(clock*.65+i*.9)*.85;p.dx=fixed?0:aim.x.x*.9;p.dy=fixed?0:(p.restY||0)-tval(p.v,now)+idle+aim.y.x*.5;const transform=`translate(${p.dx} ${p.dy})`;if(transform!==p.last){p.g.setAttribute('transform',transform);p.last=transform;}});
    links.forEach(({node,a,b,from,to})=>node.setAttribute('d',seg([a[0]+from.dx,a[1]+from.dy],[b[0]+to.dx,b[1]+to.dy])));
    return !reduced||parts.some(p=>!tdone(p.v,now));
  });
  bag.add(pointer(stage,{move:([screenX,screenY])=>{
    const x=(screenX-offsetX)/scale,y=(screenY-offsetY)/scale;
    aim.x.t=HL.clamp((x-200)/100,-1,1);aim.y.t=HL.clamp((y-160)/100,-1,1);let picked=-1,best=42;
    parts.forEach((p,i)=>{const d=Math.hypot(x-p.hit[0],y-p.hit[1]);if(d<best){best=d;picked=i;}});choose(picked);loop.wake();
  },leave:()=>{aim.x.t=0;aim.y.t=0;choose(-1);loop.wake();}}));
  bag.on(stage,'keydown',e=>{if(['ArrowRight','ArrowLeft'].includes(e.key)){e.preventDefault();choose((active+(e.key==='ArrowRight'?1:parts.length-1)+parts.length)%parts.length);}});
  bag.on(stage,'blur',()=>choose(-1));
  bag.add(loop.unregister);bag.add(()=>svg.replaceChildren());loop.wake();
  return {set(){},setHover(value){hovering=value;if(value)pulseClock=0;if(!value)pulse?.setAttribute('visibility','hidden');loop.wake();},destroy:bag.dispose,tour:[...parts.map(p=>[p.hit[0]*scale+offsetX,p.hit[1]*scale+offsetY]),null]};
}

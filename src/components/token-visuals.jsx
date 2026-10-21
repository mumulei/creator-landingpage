import { useEffect, useRef } from 'react';

export function DotField() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false });
    if (!gl) return;
    const compile = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source); gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
      return shader;
    };
    const vertex = compile(gl.VERTEX_SHADER, 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}');
    const fragment = compile(gl.FRAGMENT_SHADER, `precision mediump float;
      uniform vec2 resolution;uniform float time;
      void main(){
        vec2 p=gl_FragCoord.xy/resolution;vec2 q=gl_FragCoord.xy/1.5;
        vec2 cell=floor(q/9.);vec2 local=mod(q,9.)-4.5;
        float wave=sin(cell.x*.12+cell.y*.1-time*.45)*cos(cell.y*.1-time*.25);
        float radius=.65+1.1*pow(wave*.5+.5,3.);
        float dot=1.-smoothstep(radius-.35,radius+.35,length(local));
        float sides=smoothstep(.12,.5,abs(p.x-.5));
        float fade=smoothstep(0.,.18,p.y)*(1.-smoothstep(.8,1.,p.y));
        vec3 ink=mix(vec3(.44,.48,.53),vec3(.91,.17,.48),smoothstep(.45,.95,wave));
        gl_FragColor=vec4(ink,dot*(.10+sides*.32)*fade);
      }`);
    if (!vertex || !fragment) return;
    const program = gl.createProgram(); gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);
    const buffer=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buffer); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
    const a=gl.getAttribLocation(program,'a');gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
    const resolution=gl.getUniformLocation(program,'resolution'), time=gl.getUniformLocation(program,'time');
    let frame=0, active=true, previous=0;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    const resize=()=>{const r=canvas.getBoundingClientRect();const ratio=Math.min(window.devicePixelRatio,1.5);canvas.width=Math.round(r.width*ratio);canvas.height=Math.round(r.height*ratio);gl.viewport(0,0,canvas.width,canvas.height);};
    const draw=(now)=>{if(active && now-previous>32){gl.uniform2f(resolution,canvas.width,canvas.height);gl.uniform1f(time,reduced.matches?0:now/1000);gl.drawArrays(gl.TRIANGLES,0,6);previous=now;}if(!reduced.matches)frame=requestAnimationFrame(draw);};
    const observer=new IntersectionObserver(([entry])=>{active=entry.isIntersecting;});observer.observe(canvas);
    const ro=new ResizeObserver(()=>{resize();if(reduced.matches)draw(100);});ro.observe(canvas);resize();draw(100);
    return()=>{cancelAnimationFrame(frame);observer.disconnect();ro.disconnect();gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(vertex);gl.deleteShader(fragment);};
  },[]);
  return <canvas className="tf-dot-field" ref={ref} aria-hidden="true" />;
}

// Shared isometric projection keeps the five objects and the core at the same camera angle.
const project=(x,y,z)=>[150+(x-y)*.86,125+(x+y)*.43-z];
const points=(vertices)=>vertices.map(v=>project(...v).join(',')).join(' ');
function Block({x=0,y=0,z=0,w=60,d=60,h=12,accent=false}) {
  const top=[[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]];
  return <g className={accent?'tf-solid tf-solid--accent':'tf-solid'}>
    <polygon className="tf-face-left" points={points([[x,y+d,z],[x+w,y+d,z],[x+w,y+d,z+h],[x,y+d,z+h]])}/>
    <polygon className="tf-face-right" points={points([[x+w,y,z],[x+w,y+d,z],[x+w,y+d,z+h],[x+w,y,z+h]])}/>
    <polygon className="tf-face-top" points={points(top)}/>
  </g>;
}
function Line({from,to,...props}) { const a=project(...from),b=project(...to);return <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} {...props}/>; }
function Chip({hero=false}) {return <>
  <Block x={-57} y={-57} w={114} d={114} h={8}/>
  {Array.from({length:12},(_,i)=><g key={i}><Line from={[-48+i*8,-53,9]} to={[-48+i*8,-36,9]}/><Line from={[-48+i*8,36,9]} to={[-48+i*8,53,9]}/><Line from={[-53,-48+i*8,9]} to={[-36,-48+i*8,9]}/><Line from={[36,-48+i*8,9]} to={[53,-48+i*8,9]}/></g>)}
  <g className={hero?'tf-core-lift':undefined}><Block x={-35} y={-35} z={10} w={70} d={70} h={16}/><Block x={-24} y={-24} z={26} w={48} d={48} h={4} accent/>
  {Array.from({length:7},(_,i)=><Line key={i} from={[-18+i*6,-20,31]} to={[-18+i*6,20,31]} className="tf-chip-etch"/>)}</g>
  {[[-49,-49],[49,-49],[-49,49],[49,49]].map(([x,y])=>{const p=project(x,y,9);return <circle key={`${x},${y}`} cx={p[0]} cy={p[1]} r="2"/>;})}
  </>; }
export function TechnicalArt({kind=2,hero=false}) {
  return <svg className={`tf-technical-art${hero?' tf-technical-art--hero':''}`} viewBox="0 0 300 230" fill="none" stroke="currentColor" strokeWidth=".8" strokeLinejoin="round" aria-hidden="true">
    {kind===0 && <>{[-30,30].map((x,i)=><g key={x}><Block x={x-12} y={-12} w={25} d={28} h={5}/><path d={`M${150+x-17} 121 Q${150+x-17} 91 ${150+x} 91 Q${150+x+17} 91 ${150+x+17} 121 Z`} fill="#fafafa"/><circle cx={150+x} cy="77" r="12" fill="#fafafa"/>{i===1&&<path d="M167 78 Q180 59 193 78"/>}</g>)}<path d="M131 145 Q150 155 169 145" stroke="#e72b87"/></>}
    {kind===1 && <>{[0,1,2].map(i=><g key={i} transform={`translate(${i*11-11} ${-i*12})`}><Block x={-36} y={-25} w={72} d={50} h={5}/><Line from={[-28,-17,6]} to={[26,-17,6]}/><Line from={[-28,-8,6]} to={[-6,-8,6]}/><polygon points={points([[4,-4,6],[4,16,6],[24,6,6]])} fill="#f4c4d9"/></g>)}</>}
    {kind===2 && <Chip hero={hero}/>}
    {kind===3 && <><Block x={-48} y={-43} w={96} d={86} h={6}/>{[-28,0,28].flatMap(x=>[-23,23].map(y=><g key={`${x},${y}`}><Line from={[x,y,8]} to={[0,0,45]}/><Block x={x-7} y={y-7} z={10} w={14} d={14} h={10}/></g>))}<Block x={-12} y={-12} z={35} w={24} d={24} h={18} accent/></>}
    {kind===4 && <>{[0,1,2].map(i=><g key={i} transform={`translate(${i*25-25} ${-i*10})`}><ellipse cx="145" cy="130" rx="27" ry="14" fill="#f0d7e3"/><path d="M118 118v12a27 14 0 0 0 54 0v-12" fill="#ebc2d5"/><ellipse cx="145" cy="118" rx="27" ry="14" fill="#fff4f9"/>{Array.from({length:7},(_,n)=><line key={n} x1={125+n*6} x2={125+n*6} y1="132" y2="136"/>)}<path d="m139 115 6-3 6 3v6l-6 3-6-3z" stroke="#d52c79"/></g>)}</>}
  </svg>;
}

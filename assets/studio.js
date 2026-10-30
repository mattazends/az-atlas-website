/* ===== AZ Atlas 3D home studio ===== */
(function(){
const sec=document.getElementById("design");if(!sec)return;
const canvas=document.getElementById("studioCanvas"),stageEl=sec.querySelector(".studio-stage");
const THREE_URL="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js";

/* ---------- UI state ---------- */
const RANGES={home:[1400,5000,100,2600],addition:[200,1000,50,500],casita:[300,1000,50,600]};
const NAMES={home:"Custom home",addition:"Home addition",casita:"Casita"};
const ROOFS={flat:"Desert flat roof",metal:"Standing-seam metal roof",tile:"Clay tile roof"};
const COLORS={white:["Desert white","#ece5d9"],sand:["Sand","#d6bf9c"],adobe:["Adobe","#bf8a63"],char:["Charcoal","#4a4743"]};
const cfg={type:"home",sqft:2600,stories:1,roof:"flat",color:"white",patio:true,garage:true,deck:false};
const $=s=>sec.querySelector(s),$$=s=>[...sec.querySelectorAll(s)];
const fmt=n=>n.toLocaleString("en-US");

function syncUI(){
 $$("[data-type]").forEach(b=>b.classList.toggle("on",b.dataset.type===cfg.type));
 $$("[data-stories]").forEach(b=>{b.classList.toggle("on",+b.dataset.stories===cfg.stories);b.disabled=cfg.type==="casita"&&b.dataset.stories==="2"});
 $$("[data-roof]").forEach(b=>b.classList.toggle("on",b.dataset.roof===cfg.roof));
 $$("[data-color]").forEach(b=>b.classList.toggle("on",b.dataset.color===cfg.color));
 $$("[data-x]").forEach(b=>{b.classList.toggle("on",!!cfg[b.dataset.x]);b.hidden=cfg.type!=="home"&&b.dataset.x==="garage"});
 const r=RANGES[cfg.type],sl=$("#stSize");sl.min=r[0];sl.max=r[1];sl.step=r[2];sl.value=cfg.sqft;
 sl.style.setProperty("--f",((cfg.sqft-r[0])/(r[1]-r[0])*100)+"%");
 $("#stSqft").textContent=fmt(cfg.sqft);
 $("#stSum").textContent=summary();
}
function summary(){const x=[];if(cfg.patio)x.push("covered patio");if(cfg.garage&&cfg.type==="home")x.push("3-car garage");if(cfg.deck)x.push("deck");
 return `${NAMES[cfg.type]}, ${fmt(cfg.sqft)} sq ft, ${cfg.stories} ${cfg.stories>1?"stories":"story"}, ${ROOFS[cfg.roof].toLowerCase()}, ${COLORS[cfg.color][0].toLowerCase()} stucco${x.length?", "+x.join(", "):""}`}

let api=null;
function changed(){syncUI();api&&api.rebuild(cfg)}
sec.addEventListener("click",e=>{const b=e.target.closest("button");if(!b||!sec.contains(b))return;
 if(b.dataset.type){cfg.type=b.dataset.type;cfg.sqft=RANGES[cfg.type][3];if(cfg.type==="casita")cfg.stories=1;changed()}
 else if(b.dataset.stories){cfg.stories=+b.dataset.stories;changed()}
 else if(b.dataset.roof){cfg.roof=b.dataset.roof;changed()}
 else if(b.dataset.color){cfg.color=b.dataset.color;syncUI();api&&api.recolor(cfg)}
 else if(b.dataset.x){cfg[b.dataset.x]=!cfg[b.dataset.x];changed()}
 else if(b.dataset.tab){$$("[data-tab]").forEach(t=>t.classList.toggle("on",t===b));$$(".sg").forEach(g=>g.classList.toggle("show",g.dataset.g===b.dataset.tab))}
 else if(b.dataset.light){$$("[data-light]").forEach(t=>t.classList.toggle("on",t===b));api&&api.light(b.dataset.light)}
 else if(b.dataset.stage!=null){api&&api.goStage(+b.dataset.stage)}
 else if(b.id==="stReplay"){api&&api.replay()}
 else if(b.id==="stSend"){const slug=cfg.type==="home"?"custom-homes":"additions-casitas";if(window.AZ){AZ.Form.design(slug,"3D design: "+summary());AZ.scrollToId("estimate")}}
});
let sizeT;$("#stSize").addEventListener("input",e=>{cfg.sqft=+e.target.value;syncUI();clearTimeout(sizeT);sizeT=setTimeout(()=>api&&api.rebuild(cfg,true),140)});
syncUI();

/* ---------- lazy boot ---------- */
let booted=false;
const bootIO=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)&&!booted){booted=true;bootIO.disconnect();boot()}},{rootMargin:"900px 0px"});
bootIO.observe(sec);
function fail(){stageEl.classList.add("nogl")}
async function boot(){let THREE;
 try{const t=document.createElement("canvas");if(!(t.getContext("webgl2")||t.getContext("webgl")))return fail();THREE=await import(THREE_URL)}catch(e){console.warn(e);return fail()}
 try{api=init(THREE);api.rebuild(cfg);stageEl.classList.add("ready")}catch(e){console.warn(e);fail()}
}

/* ---------- 3D ---------- */
function init(T){
const mob=innerWidth<720;
const R=new T.WebGLRenderer({canvas,antialias:true,powerPreference:"high-performance"});
R.setPixelRatio(Math.min(devicePixelRatio,mob?1.5:1.75));
R.shadowMap.enabled=true;R.shadowMap.type=T.PCFSoftShadowMap;
R.outputColorSpace=T.SRGBColorSpace;R.toneMapping=T.ACESFilmicToneMapping;R.toneMappingExposure=1;
const S=new T.Scene();
const cam=new T.PerspectiveCamera(mob?40:32,1,.5,900);

/* textures */
const ctex=(w,h,draw,rep)=>{const c=document.createElement("canvas");c.width=w;c.height=h;const g=c.getContext("2d");draw(g,w,h);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.wrapS=t.wrapT=T.RepeatWrapping;t.anisotropy=4;if(rep)t.repeat.set(rep[0],rep[1]);return t};
const noise=(g,w,h,base,amp)=>{const d=g.createImageData(w,h);for(let i=0;i<d.data.length;i+=4){const n=base+(Math.random()-.5)*amp;d.data[i]=d.data[i+1]=d.data[i+2]=n;d.data[i+3]=255}g.putImageData(d,0,0)};
const stuccoTex=ctex(256,256,(g,w,h)=>noise(g,w,h,238,30),[3,3]);
const sandTex=ctex(512,512,(g,w,h)=>{noise(g,w,h,226,34);for(let i=0;i<900;i++){g.fillStyle=`rgba(${120+Math.random()*60},${90+Math.random()*40},60,${Math.random()*.18})`;g.beginPath();g.arc(Math.random()*w,Math.random()*h,Math.random()*3+.5,0,7);g.fill()}},[60,60]);
const woodTex=ctex(256,256,(g,w,h)=>{g.fillStyle="#fff";g.fillRect(0,0,w,h);for(let y=0;y<h;y+=2){g.fillStyle=`rgba(80,45,20,${.05+Math.random()*.12})`;g.fillRect(0,y,w,1+Math.random())}for(let y=0;y<h;y+=32){g.fillStyle="rgba(40,20,8,.35)";g.fillRect(0,y,w,2)}},[1,1]);
const tileTex=ctex(256,256,(g,w,h)=>{g.fillStyle="#fff";g.fillRect(0,0,w,h);for(let y=0;y<h;y+=32){const gr=g.createLinearGradient(0,y,0,y+32);gr.addColorStop(0,"rgba(255,255,255,1)");gr.addColorStop(.75,"rgba(205,190,180,1)");gr.addColorStop(1,"rgba(110,80,70,1)");g.fillStyle=gr;g.fillRect(0,y,w,32)}for(let x=0;x<w;x+=21){g.fillStyle="rgba(90,50,40,.28)";g.fillRect(x,0,2,h)}},[1,1]);
const seamTex=ctex(128,128,(g,w,h)=>{g.fillStyle="#fff";g.fillRect(0,0,w,h);for(let x=0;x<w;x+=32){g.fillStyle="rgba(0,0,0,.35)";g.fillRect(x,0,3,h);g.fillStyle="rgba(255,255,255,.6)";g.fillRect(x+3,0,2,h)}},[1,1]);
const slatTex=ctex(128,128,(g,w,h)=>{g.fillStyle="#fff";g.fillRect(0,0,w,h);for(let y=0;y<h;y+=10){g.fillStyle="rgba(40,20,8,.35)";g.fillRect(0,y,w,2)}},[1,4]);

/* materials */
const M={
 stucco:new T.MeshStandardMaterial({color:COLORS[cfg.color][1],map:stuccoTex,roughness:.92}),
 trim:new T.MeshStandardMaterial({color:"#2c2724",roughness:.6,metalness:.2}),
 glass:new T.MeshStandardMaterial({color:"#6f8b9a",roughness:.18,metalness:.15,emissive:"#ffb867",emissiveIntensity:0}),
 wood:new T.MeshStandardMaterial({color:"#9a6438",map:woodTex,roughness:.7}),
 deck:new T.MeshStandardMaterial({color:"#8d5c3a",map:woodTex,roughness:.8}),
 timber:new T.MeshStandardMaterial({color:"#dcb47c",roughness:.85}),
 concrete:new T.MeshStandardMaterial({color:"#bdb5aa",roughness:.95}),
 metal:new T.MeshStandardMaterial({color:"#5d656d",map:seamTex,roughness:.5,metalness:.25}),
 tile:new T.MeshStandardMaterial({color:"#b5552c",map:tileTex,roughness:.75,side:T.DoubleSide}),
 flat:new T.MeshStandardMaterial({color:"#cfc8be",roughness:.95}),
 garage:new T.MeshStandardMaterial({color:"#7a5234",map:slatTex,roughness:.7}),
 ghost:new T.MeshStandardMaterial({color:"#ffffff",transparent:true,opacity:.26,roughness:1,depthWrite:false}),
 ghostLine:new T.LineBasicMaterial({color:"#ffffff",transparent:true,opacity:.75}),
 sand:new T.MeshStandardMaterial({color:"#dcc6a6",map:sandTex,roughness:1}),
 pad:new T.MeshStandardMaterial({color:"#e8d8bf",map:sandTex,roughness:1}),
 gravel:new T.MeshStandardMaterial({color:"#8a6b52",roughness:1}),
 cactus:new T.MeshStandardMaterial({color:"#5d7a48",roughness:.85,flatShading:true}),
 shrub:new T.MeshStandardMaterial({color:"#7f8f5a",roughness:.9,flatShading:true}),
 agave:new T.MeshStandardMaterial({color:"#86a3a0",roughness:.8,flatShading:true}),
 rock:new T.MeshStandardMaterial({color:"#a78a6c",roughness:1,flatShading:true}),
 mtn:new T.MeshStandardMaterial({color:"#a49099",roughness:1,flatShading:true}),
 lamp:new T.MeshStandardMaterial({color:"#2a2522",emissive:"#ffc27a",emissiveIntensity:0}),
 water:new T.MeshStandardMaterial({color:"#4fb3c8",roughness:.1,metalness:.1})
};

/* sky */
const skyU={top:{value:new T.Color("#3d527c")},hor:{value:new T.Color("#f3a967")},low:{value:new T.Color("#e9c9a2")}};
const sky=new T.Mesh(new T.SphereGeometry(600,32,16),new T.ShaderMaterial({side:T.BackSide,depthWrite:false,uniforms:skyU,
 vertexShader:"varying vec3 vP;void main(){vP=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
 fragmentShader:"uniform vec3 top;uniform vec3 hor;uniform vec3 low;varying vec3 vP;void main(){float h=vP.y;vec3 c=h>0.?mix(hor,top,pow(clamp(h*1.6,0.,1.),.7)):mix(hor,low,clamp(-h*4.,0.,1.));gl_FragColor=vec4(c,1.);}"}));
S.add(sky);
S.fog=new T.Fog("#e3e0d6",140,560);

/* lights */
const hemi=new T.HemisphereLight("#ffe9d0","#8a6a4a",.5);S.add(hemi);
const sun=new T.DirectionalLight("#ffb978",2.4);sun.castShadow=true;
sun.shadow.mapSize.set(mob?1024:2048,mob?1024:2048);const sc=sun.shadow.camera;sc.left=-34;sc.right=34;sc.top=34;sc.bottom=-34;sc.near=1;sc.far=220;
sun.shadow.bias=-.0004;sun.shadow.normalBias=.03;S.add(sun);S.add(sun.target);

/* ground + world */
const ground=new T.Mesh(new T.CircleGeometry(520,64),M.sand);ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;S.add(ground);
const pad=new T.Mesh(new T.PlaneGeometry(64,50),M.pad);pad.rotation.x=-Math.PI/2;pad.position.y=.02;pad.receiveShadow=true;S.add(pad);
const rnd=(a,b)=>a+Math.random()*(b-a);
// Catalina-style ridgeline
for(let i=0;i<26;i++){const r=rnd(28,70),h=rnd(26,70);const m=new T.Mesh(new T.ConeGeometry(r,h,6,1),M.mtn);m.position.set(rnd(-320,320),h/2-4,rnd(-330,-230));m.rotation.y=rnd(0,3);m.scale.z=rnd(.6,1);S.add(m)}
function saguaro(x,z,h){const g=new T.Group(),rad=h*.065;
 const tr=new T.Mesh(new T.CapsuleGeometry(rad,h,4,8),M.cactus);tr.position.y=h/2+rad*.5;g.add(tr);
 const arms=Math.random()<.3?1:2;for(let a=0;a<arms;a++){const s=a?-1:1,ay=h*rnd(.38,.6),al=h*rnd(.22,.36);
  const e=new T.Mesh(new T.CapsuleGeometry(rad*.75,rad*1.6,4,8),M.cactus);e.rotation.z=Math.PI/2;e.position.set(s*rad*1.6,ay,0);g.add(e);
  const up=new T.Mesh(new T.CapsuleGeometry(rad*.75,al,4,8),M.cactus);up.position.set(s*rad*2.9,ay+al/2,0);g.add(up)}
 g.position.set(x,0,z);g.rotation.y=rnd(0,6);g.traverse(o=>{o.castShadow=true});return g}
const world=new T.Group();S.add(world);
[[-30,-18,7],[34,-22,8.5],[-38,14,6],[40,16,7.5],[-22,-34,9],[18,-38,6.5],[-60,-40,8],[62,-30,9],[-80,10,7],[85,20,8],[0,-60,10],[-45,40,6]].forEach(p=>world.add(saguaro(...p)));
const shrubGeo=new T.IcosahedronGeometry(1,0),rockGeo=new T.DodecahedronGeometry(1,0);
for(let i=0;i<70;i++){const a=rnd(0,6.28),d=rnd(30,120);const m=new T.Mesh(Math.random()<.7?shrubGeo:rockGeo,Math.random()<.7?M.shrub:M.rock);const s=rnd(.5,1.6);m.scale.set(s,s*rnd(.5,.8),s);m.position.set(Math.cos(a)*d,s*.3,Math.sin(a)*d);m.castShadow=true;world.add(m)}

/* ---------- house builder ---------- */
let house=null,items=[],P=4.99,Ptarget=4.99,lastBuild=0;
const H=3.1;// floor height
function box(w,h,d,mat,x,y,z,o={}){const g=new T.BoxGeometry(w,h,d);if(o.base)g.translate(0,h/2,0);const m=new T.Mesh(g,mat);m.position.set(x,y,z);m.castShadow=o.cast!==false;m.receiveShadow=true;return m}
function anim(obj,s,dl,mode,extra){obj.userData.a={s,dl,mode,by:obj.position.y,...extra};items.push(obj);return obj}

function studs(w,d,h,x,y,z){// framing as instanced studs + plates
 const pts=[];const sp=.61;
 for(let i=0;i<=Math.floor(w/sp);i++){const px=-w/2+Math.min(w,i*sp);pts.push([px,d/2-.08],[px,-d/2+.08])}
 for(let i=1;i<Math.floor(d/sp);i++){const pz=-d/2+i*sp;pts.push([w/2-.08,pz],[-w/2+.08,pz])}
 const geo=new T.BoxGeometry(.06,h-.1,.11);geo.translate(0,(h-.1)/2,0);
 const im=new T.InstancedMesh(geo,M.timber,pts.length);const mx=new T.Matrix4();
 pts.forEach((p,i)=>{mx.makeTranslation(p[0],0,p[1]);im.setMatrixAt(i,mx)});im.castShadow=true;im.receiveShadow=true;
 const g=new T.Group();g.add(im);
 [[w,.1,.12,0,h-.05,d/2-.08],[w,.1,.12,0,h-.05,-d/2+.08],[.12,.1,d,w/2-.08,h-.05,0],[.12,.1,d,-w/2+.08,h-.05,0]].forEach(b=>g.add(box(b[0],b[1],b[2],M.timber,b[3],b[4],b[5])));
 g.position.set(x,y,z);return g}

function windowsOn(g,w,d,y0,floors,doorX){// returns window meshes on 4 faces
 const out=[];const add=(ww,hh,x,y,z,ry)=>{const f=new T.Group();
  const fr=box(ww+.16,hh+.16,.1,M.trim,0,0,0,{cast:false});const gl=box(ww,hh,.12,M.glass,0,0,0,{cast:false});f.add(fr,gl);
  f.position.set(x,y,z);f.rotation.y=ry;out.push(f);return f};
 for(let f=0;f<floors;f++){const yb=y0+f*H;
  // front: big glazing rhythm
  const n=Math.max(1,Math.floor(w/3.4));for(let i=0;i<n;i++){const x=-w/2+(i+.5)*w/n;if(f===0&&doorX!=null&&Math.abs(x-doorX)<1.9)continue;
   const tall=(i+f)%2===0;add(tall?1.3:1.9,tall?2.3:1.5,x,yb+(tall?1.25:1.55),d/2+.02,0)}
  // back: sliders
  const nb=Math.max(1,Math.floor(w/4.2));for(let i=0;i<nb;i++)add(2.4,2.3,-w/2+(i+.5)*w/nb,yb+1.25,-d/2-.02,Math.PI);
  // sides
  const ns=Math.max(1,Math.floor(d/5));for(let i=0;i<ns;i++){const z=-d/2+(i+.5)*d/ns;add(1.2,1.5,w/2+.02,yb+1.6,z,Math.PI/2);add(1.2,1.5,-w/2-.02,yb+1.6,z,-Math.PI/2)}}
 out.forEach(o=>g.add(o));return out}

function hipRoof(W,D,y0,mat){// long axis x
 const r=Math.min(D,W)/2*Math.tan(22*Math.PI/180),hx=Math.max(0,W/2-D/2);
 const A=[-W/2,y0,D/2],B=[W/2,y0,D/2],C=[W/2,y0,-D/2],Dd=[-W/2,y0,-D/2],E=[-hx,y0+r,0],F=[hx,y0+r,0];
 const tris=[A,B,F,A,F,E,C,Dd,E,C,E,F,B,C,F,Dd,A,E];
 const pos=new Float32Array(tris.flat());const g=new T.BufferGeometry();g.setAttribute("position",new T.BufferAttribute(pos,3));
 const uv=[];for(let i=0;i<tris.length;i++){const p=tris[i];const onX=i<12;uv.push((onX?p[0]:p[2])*.45,(p[1]-y0)*2.6+(onX?0:.0))}
 g.setAttribute("uv",new T.Float32BufferAttribute(uv,2));g.computeVertexNormals();
 const m=new T.Mesh(g,mat);m.castShadow=true;m.receiveShadow=true;return m}

function gableRoof(W,D,y0){// ridge along x, standing seam
 const g=new T.Group(),a=24*Math.PI/180,rise=D/2*Math.tan(a),run=D/2+.45,L=run/Math.cos(a);
 [1,-1].forEach(s=>{const geo=new T.BoxGeometry(W+.7,.14,L);const uv=geo.attributes.uv;for(let i=0;i<uv.count;i++)uv.setXY(i,uv.getX(i)*(W+.7)/1.1,uv.getY(i));
  const p=new T.Mesh(geo,M.metal);p.rotation.x=s*a;p.position.set(0,y0+rise-run*Math.tan(a)/2+.08,s*run/2);p.castShadow=true;p.receiveShadow=true;g.add(p)});
 const sh=new T.Shape();sh.moveTo(-D/2,0);sh.lineTo(D/2,0);sh.lineTo(0,rise);sh.closePath();
 [W/2,-W/2].forEach(x=>{const e=new T.Mesh(new T.ExtrudeGeometry(sh,{depth:.2,bevelEnabled:false}),M.stucco);e.rotation.y=Math.PI/2;e.position.set(x-.1,y0,0);e.castShadow=true;g.add(e)});
 g.add(box(W+.8,.16,.16,M.trim,0,y0+rise+.1,0));
 return g}

function flatRoof(W,D,y0,canopy){const g=new T.Group();
 g.add(box(W-.2,.25,D-.2,M.flat,0,y0+.05,0,{base:true}));
 [[W,.75,.22,0,D/2-.11],[W,.75,.22,0,-D/2+.11],[.22,.75,D,W/2-.11,0],[.22,.75,D,-W/2+.11,0]].forEach(b=>g.add(box(b[0],b[1],b[2],M.stucco,b[3],y0,b[4],{base:true})));
 g.add(box(W+.02,.12,.24,M.trim,0,y0+.75,D/2-.11,{base:true}));
 if(canopy){const c=box(W*.62,.28,1.8,M.wood,-W*.1,y0-.55,D/2+.9,{base:true});g.add(c);g.add(box(W*.62,.06,1.8,M.trim,-W*.1,y0-.29,D/2+.9,{base:true}))}
 return g}

function roofFor(W,D,y0,style,canopy){
 if(style==="flat")return flatRoof(W,D,y0,canopy);
 const long=W>=D,ww=long?W:D,dd=long?D:W;let r;
 if(style==="metal")r=gableRoof(ww,dd,y0);else{r=new T.Group();r.add(hipRoof(ww+.9,dd+.9,y0,M.tile));r.add(box(ww+.95,.18,dd+.95,M.trim,0,y0-.18,0,{base:true}))}
 if(!long){const w=new T.Group();r.rotation.y=Math.PI/2;w.add(r);return w}
 return r}

/* a full block = slab, framing per floor, walls, windows, roof */
function block(b,ctx){const {x,z,w,d,floors,ghost,canopy,door,roofStyle,noWin}=b;const g=new T.Group();g.position.set(x,0,z);house.add(g);
 const top=floors*H+.3;
 if(ghost){g.add(box(w,top-.3,d,M.ghost,0,.3,0,{base:true,cast:false}));
  const e=new T.LineSegments(new T.EdgesGeometry(new T.BoxGeometry(w,top-.3,d)),M.ghostLine);e.position.y=.3+(top-.3)/2;g.add(e);
  const rf=flatRoof(w,d,top,false);rf.traverse(o=>{if(o.isMesh){o.material=M.ghost;o.castShadow=false}});g.add(rf);
  g.add(box(w+.5,.3,d+.5,M.concrete,0,0,0,{base:true}));return g}
 const slab=box(w+.6,.3,d+.6,M.concrete,0,0,0,{base:true});g.add(slab);anim(slab,0,ctx.dl,"grow");
 for(let f=0;f<floors;f++){const st=studs(w,d,H,0,.3+f*H,0);g.add(st);anim(st,1,ctx.dl+f*.25,"grow");
  if(f>0){const fl=box(w,.25,d,M.timber,0,.3+f*H-.12,0,{base:true});g.add(fl);anim(fl,1,ctx.dl+f*.25-.1,"grow")}}
 const wall=box(w,floors*H,d,M.stucco,0,.3,0,{base:true});g.add(wall);anim(wall,2,ctx.dl,"grow");
 if(floors>1){const band=box(w+.06,.18,d+.06,M.trim,0,.3+H-.09,0,{base:true});g.add(band);anim(band,2,ctx.dl+.35,"grow")}
 const dX=door?-w*.18:null;
 if(!noWin)windowsOn(g,w,d,.3,floors,dX).forEach((m,i)=>anim(m,2,ctx.dl+.45+(i%6)*.04,"pop"));
 if(door){const dr=new T.Group();dr.add(box(1.5,2.75,.14,M.wood,0,0,0,{base:true}),box(1.8,.12,.22,M.trim,0,2.75,0,{base:true}));dr.position.set(dX,.3,d/2+.03);g.add(dr);anim(dr,2,ctx.dl+.5,"pop");
  [-1.15,1.15].forEach(o=>{const lp=box(.16,.32,.12,M.lamp,dX+o,2.15,d/2+.08,{cast:false});g.add(lp);anim(lp,4,0,"pop")})}
 const rf=roofFor(w,d,top,roofStyle,canopy);g.add(rf);anim(rf,3,ctx.dl,"drop");
 return g}

function landscape(bounds){const g=new T.Group();house.add(g);const [x0,x1,z0,z1]=bounds;
 const bed=(x,z,w,d)=>{const m=box(w,.06,d,M.gravel,x,.03,z,{base:true,cast:false});g.add(m);anim(m,4,0,"grow")};
 bed((x0+x1)/2-4,z1+2.2,8,1.6);bed((x0+x1)/2+6,z1+2.2,5,1.6);
 for(let i=0;i<7;i++){const a=new T.Group();for(let k=0;k<7;k++){const l=new T.Mesh(new T.ConeGeometry(.12,1.1,4),M.agave);l.position.y=.4;l.rotation.z=(k/7)*1.2-.6;l.rotation.y=k*.9;a.add(l)}
  a.position.set(x0+2+i*((x1-x0-4)/6),.05,z1+2.2+rnd(-.3,.3));a.traverse(o=>o.castShadow=true);g.add(a);anim(a,4,.05*i,"pop")}
 const yuc=[[x1+4,z1-1],[x0-3.5,z0+2],[x1+3,z0-2]];yuc.forEach((p,i)=>{const s=saguaro(p[0],p[1],rnd(3.6,5.2));g.add(s);anim(s,4,.2+i*.1,"pop")});
 for(let i=0;i<6;i++){const lp=new T.Group();lp.add(box(.08,.55,.08,M.trim,0,0,0,{base:true}),box(.2,.14,.2,M.lamp,0,.55,0,{base:true,cast:false}));lp.position.set(x0+1+i*((x1-x0-2)/5),0,z1+5.6);g.add(lp);anim(lp,4,.3,"pop")}
}

const labels=[];const lv=new T.Vector3();
function addLabel(txt,x,y,z,cls){const el=document.createElement("span");el.className="st-tag "+(cls||"");el.textContent=txt;stageEl.appendChild(el);labels.push({el,p:new T.Vector3(x,y,z)})}
function placeLabels(){const w=canvas.clientWidth,h=canvas.clientHeight;labels.forEach(l=>{lv.copy(l.p).add(house.position);lv.project(cam);const vis=lv.z<1&&P>2.2;l.el.style.opacity=vis?1:0;l.el.style.transform=`translate(-50%,-100%) translate(${(lv.x*.5+.5)*w}px,${(-lv.y*.5+.5)*h}px)`})}
function build(c){labels.forEach(l=>l.el.remove());labels.length=0;
 if(house){S.remove(house);house.traverse(o=>{if(o.geometry)o.geometry.dispose()})}
 house=new T.Group();S.add(house);items=[];
 const A=c.sqft*.0929,st=c.stories;let bx=[-10,10,-8,8];
 const roof=c.roof;
 if(c.type==="home"){
  const wingShare=c.sqft>=1800?(st>1?.2:.32):0,mainA=st>1?(A*(1-wingShare))/2:A*(1-wingShare),wingA=A*wingShare;
  const d=Math.sqrt(mainA/1.75),w=d*1.75;
  block({x:0,z:0,w,d,floors:st,canopy:roof==="flat",door:true,roofStyle:roof},{dl:0});
  bx=[-w/2,w/2,-d/2,d/2];
  if(wingA>0){const w2=Math.max(6,d*.72),d2=wingA/w2;block({x:w/2-w2/2,z:d/2+d2/2,w:w2,d:d2,floors:1,roofStyle:roof},{dl:.15});bx[3]=d/2+d2}
  if(c.garage){const gw=9.6,gd=7.2,gx=-w/2-gw/2,gz=d/2-gd/2;const g=block({x:gx,z:gz,w:gw,d:gd,floors:1,roofStyle:roof,noWin:true},{dl:.25});
   for(let i=0;i<3;i++){const gdm=box(2.6,2.3,.12,M.garage,-gw/2+1.6+i*3.2,.3,gd/2+.04,{base:true,cast:false});g.add(gdm);anim(gdm,2,.7+i*.08,"grow")}
   const drive=box(gw,.04,14,M.concrete,gx,0,gz+gd/2+7,{base:true,cast:false});house.add(drive);anim(drive,0,.1,"grow");bx[0]=gx-gw/2}
  if(c.patio){const pg=new T.Group();const pw=w*.6,pd=4.2,pz=-d/2-pd/2;pg.position.set(w*.12,0,pz);house.add(pg);
   const slab=box(pw,.2,pd,M.concrete,0,0,0,{base:true});pg.add(slab);anim(slab,0,.3,"grow");
   const posts=[];for(let i=0;i<4;i++){const p=box(.3,2.9,.3,M.wood,-pw/2+.3+i*(pw-.6)/3,.2,-pd/2+.25,{base:true});pg.add(p);posts.push(p);anim(p,1,.4+i*.05,"grow")}
   const top=box(pw+.4,.28,pd+.3,roof==="flat"?M.wood:M.trim,0,3.1,0,{base:true});pg.add(top);anim(top,3,.3,"drop");
   bx[2]=Math.min(bx[2],pz-pd/2)}
  if(c.deck){const dg=new T.Group();const dw=6,dd=5,dx=w/2+dw/2+.3,dz=-d/2+dd/2;dg.position.set(dx,0,dz);house.add(dg);
   const pl=box(dw,.18,dd,M.deck,0,.75,0,{base:true});dg.add(pl);anim(pl,1,.5,"grow");
   for(let i=0;i<4;i++){const p=box(.18,.78,.18,M.deck,(i%2?1:-1)*(dw/2-.2),0,(i<2?1:-1)*(dd/2-.2),{base:true});dg.add(p);anim(p,1,.45,"grow")}
   [[dw,.08,.08,0,1.85,dd/2-.05],[.08,.08,dd,dw/2-.05,1.85,0],[dw,.08,.08,0,1.85,-dd/2+.05]].forEach(b=>{const r=box(b[0],b[1],b[2],M.trim,b[3],b[4],b[5]);dg.add(r);anim(r,2,.8,"pop")});
   for(let i=0;i<12;i++){const t=i/11;const pp=box(.05,.95,.05,M.trim,-dw/2+.05+t*(dw-.1),.93,dd/2-.05,{base:true,cast:false});dg.add(pp);anim(pp,2,.8,"grow")}
   bx[1]=Math.max(bx[1],dx+dw/2)}
 }else{
  // existing home (ghost) + new work
  const ed=9.5,ew=17;block({x:-3,z:-2,w:ew,d:ed,floors:1,ghost:true},{dl:0});
  addLabel("Your home",-3,H+2.2,-2,"ghost");
  if(c.type==="addition"){const ad=ed*.85,aw=Math.max(4,(A/st)/ad);block({x:-3+ew/2+aw/2,z:-2+(ed-ad)/2,w:aw,d:ad,floors:st,roofStyle:roof,canopy:false},{dl:0});addLabel("New addition",-3+ew/2+aw/2,st*H+3.6,-2+(ed-ad)/2);bx=[-3-ew/2,-3+ew/2+aw,-2-ed/2,-2+ed/2]}
  else{const cd=Math.sqrt(A/1.5),cw=cd*1.5,cx=ew/2+2,cz=ed/2+cd/2+4.5;block({x:cx,z:cz,w:cw,d:cd,floors:1,roofStyle:roof,door:true,canopy:roof==="flat"},{dl:0});addLabel("New casita",cx,H+3.6,cz);
   const path=box(1.4,.05,6,M.concrete,cx-cw/3,0,cz-cd/2-2.8,{base:true,cast:false});house.add(path);anim(path,0,.2,"grow");bx=[-3-ew/2,cx+cw/2,-2-ed/2,cz+cd/2]}
  if(c.patio){const pw=c.type==="casita"?5:7,pd=3.8,pg=new T.Group();house.add(pg);
   if(c.type==="casita"){const cd=Math.sqrt(A/1.5),cw=cd*1.5,cx=ew/2+2,cz=ed/2+cd/2+4.5;pg.position.set(cx+cw/2+pw/2,0,cz);pg.rotation.y=0;bx[1]=cx+cw/2+pw}
   else{const ad=ed*.85,aw=Math.max(4,(A/st)/ad);pg.position.set(-3+ew/2+aw/2,0,-2+(ed-ad)/2-ad/2-pd/2);bx[2]=Math.min(bx[2],pg.position.z-pd/2)}
   const slab=box(pw,.2,pd,M.concrete,0,0,0,{base:true});pg.add(slab);anim(slab,0,.3,"grow");
   for(let i=0;i<4;i++){const p=box(.28,2.8,.28,M.wood,(i%2?1:-1)*(pw/2-.3),.2,(i<2?1:-1)*(pd/2-.3),{base:true});pg.add(p);anim(p,1,.4+i*.04,"grow")}
   const top=box(pw+.3,.26,pd+.3,M.wood,0,3,0,{base:true});pg.add(top);anim(top,3,.3,"drop")}
  if(c.deck){const dg=new T.Group();dg.position.set(-3-ew/2-3.2,0,-2);house.add(dg);const pl=box(6,.18,6,M.deck,0,.7,0,{base:true});dg.add(pl);anim(pl,1,.5,"grow");
   for(let i=0;i<4;i++){const p=box(.18,.72,.18,M.deck,(i%2?1:-1)*2.8,0,(i<2?1:-1)*2.8,{base:true});dg.add(p);anim(p,1,.45,"grow")}
   [[6,.08,.08,0,1.8,2.95],[.08,.08,6,-2.95,1.8,0],[6,.08,.08,0,1.8,-2.95]].forEach(b=>{const r=box(b[0],b[1],b[2],M.trim,b[3],b[4],b[5]);dg.add(r);anim(r,2,.8,"pop")});bx[0]=Math.min(bx[0],-3-ew/2-6.2)}
 }
 landscape(bx);
 const cx=(bx[0]+bx[1])/2,cz=(bx[2]+bx[3])/2;house.position.set(-cx,0,-cz);
 const span=Math.max(bx[1]-bx[0],(bx[3]-bx[2])*1.15,14)+(st>1?3:0);
 view.dist=mob?span*1.8+8:span*1.75+16;view.ty=st>1?2.8:1.8;
 applyColor(c);
}
function applyColor(c){M.stucco.color.set(COLORS[c.color][1])}

/* ---------- animation of stages ---------- */
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,back=t=>{const c1=1.5,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2)};
function applyStage(){items.forEach(o=>{const a=o.userData.a;let k=(P-a.s-a.dl)/.75;k=Math.max(0,Math.min(1,k));
 o.visible=k>0.001;if(!o.visible)return;
 if(a.mode==="grow"){o.scale.set(1,Math.max(.001,ease(k)),1)}
 else if(a.mode==="pop"){const e=back(k);o.scale.setScalar(Math.max(.001,e))}
 else if(a.mode==="drop"){o.position.y=a.by+(1-ease(k))*7}});
 const cur=Math.min(4,Math.floor(P+.02));
 stageBtns.forEach((b,i)=>{b.classList.toggle("on",i===cur);b.classList.toggle("done",i<cur)});
 sec.style.setProperty("--sp",(Math.min(P,4.999)/4.999).toFixed(3))}
const stageBtns=$$("[data-stage]");

/* ---------- light presets ---------- */
const LP={
 day:{top:"#5f93cf",hor:"#e7e0d2",low:"#e3cfb0",fog:"#e3e0d6",sun:"#fff4e2",si:2.8,el:50,az:-35,hemi:.85,hs:"#e3f0ff",hg:"#a08462",win:0,lamp:0,exp:1},
 dusk:{top:"#536a98",hor:"#f6c08e",low:"#eddcc4",fog:"#f2d2b0",sun:"#ffcf9a",si:2.7,el:18,az:-58,hemi:.95,hs:"#fff0de",hg:"#b49878",win:.8,lamp:1.4,exp:1},
 night:{top:"#070d22",hor:"#1f2547",low:"#1a1730",fog:"#1b2040",sun:"#9fb6ff",si:.45,el:38,az:40,hemi:.3,hs:"#8fa3d9",hg:"#2b2230",win:2.6,lamp:3.2,exp:1.1}};
let Lcur=JSON.parse(JSON.stringify(LP.day)),Lto=LP.day,Lt=1;const Lfrom={};
const col=new T.Color(),c2=new T.Color();
function lerpC(a,b,t){col.set(a);c2.set(b);return col.lerp(c2,t).getHex()}
function setLight(L){skyU.top.value.set(L.top);skyU.hor.value.set(L.hor);skyU.low.value.set(L.low);S.fog.color.set(L.fog);
 sun.color.set(L.sun);sun.intensity=L.si;const el=L.el*Math.PI/180,az=L.az*Math.PI/180;sun.position.set(Math.sin(az)*Math.cos(el)*90,Math.sin(el)*90,Math.cos(az)*Math.cos(el)*90);
 hemi.intensity=L.hemi;hemi.color.set(L.hs);hemi.groundColor.set(L.hg);M.glass.emissiveIntensity=L.win;M.lamp.emissiveIntensity=L.lamp;R.toneMappingExposure=L.exp}
setLight(LP.day);
function tweenLight(dt){if(Lt>=1)return;Lt=Math.min(1,Lt+dt/1.1);const t=ease(Lt),o={};
 for(const k in Lto){const a=Lfrom[k],b=Lto[k];o[k]=typeof b==="string"?"#"+new T.Color(lerpC(a,b,t)).getHexString():a+(b-a)*t}
 setLight(o);Lcur=o}

/* ---------- camera + controls ---------- */
const view={yaw:-.62,pitch:mob?.34:.27,dist:40,ty:2.4,cd:40,cty:2.4,vy:0,idle:0};
let drag=null;
canvas.addEventListener("pointerdown",e=>{drag={x:e.clientX,y:e.clientY,id:e.pointerId,t:e.pointerType,lock:e.pointerType!=="touch"};view.vy=0;view.idle=0;if(drag.lock)canvas.setPointerCapture(e.pointerId)});
canvas.addEventListener("pointermove",e=>{if(!drag||e.pointerId!==drag.id)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
 if(!drag.lock){if(Math.abs(dx)<5&&Math.abs(dy)<5)return;if(Math.abs(dy)>Math.abs(dx)){drag=null;return}drag.lock=true;try{canvas.setPointerCapture(e.pointerId)}catch(_){}}
 drag.x=e.clientX;drag.y=e.clientY;view.yaw-=dx*.006;view.vy=-dx*.006;if(drag.t!=="touch")view.pitch=Math.max(.12,Math.min(.85,view.pitch+dy*.004));view.idle=0;sec.classList.add("touched")});
["pointerup","pointercancel","lostpointercapture"].forEach(t=>canvas.addEventListener(t,()=>{drag=null}));
canvas.addEventListener("wheel",e=>{if(!e.ctrlKey&&!e.metaKey)return;e.preventDefault();view.zoom=Math.max(.7,Math.min(1.5,(view.zoom||1)*(1+e.deltaY*.001)))},{passive:false});

function resize(){const r=canvas.getBoundingClientRect();R.setSize(r.width,r.height,false);cam.aspect=r.width/r.height;cam.updateProjectionMatrix()}
addEventListener("resize",resize);resize();

let visible=true,last=performance.now();
new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible){last=performance.now();requestAnimationFrame(loop)}}).observe(canvas);
const FRAME=mob?32:0;
function loop(now){if(!visible)return;if(FRAME&&now-last<FRAME){requestAnimationFrame(loop);return}const dt=Math.min(.2,(now-last)/1000);last=now;
 if(Math.abs(Ptarget-P)>.001){const sp=Ptarget>P?1.5:3.4;P+=Math.sign(Ptarget-P)*Math.min(Math.abs(Ptarget-P),dt*sp);applyStage()}
 tweenLight(dt);
 if(!drag){view.yaw+=view.vy;view.vy*=.94;view.idle+=dt;if(view.idle>2.2)view.yaw+=dt*.07}
 view.cd+=(view.dist*(view.zoom||1)-view.cd)*.06;view.cty+=(view.ty-view.cty)*.06;
 const cp=Math.cos(view.pitch);cam.position.set(Math.sin(view.yaw)*cp*view.cd,Math.sin(view.pitch)*view.cd+view.cty,Math.cos(view.yaw)*cp*view.cd);cam.lookAt(0,view.cty,0);
 sun.target.position.set(0,0,0);if(labels.length)placeLabels();
 R.render(S,cam);requestAnimationFrame(loop)}
requestAnimationFrame(loop);

/* first-view build animation */
let played=false;
const playIO=new IntersectionObserver(es=>{if(es[0].isIntersecting&&!played){played=true;P=0;Ptarget=4.999;applyStage()}},{threshold:.45});playIO.observe(canvas);

window.__st={set(p,l){P=Ptarget=p;applyStage();if(l){Object.assign(Lfrom,Lcur);Lto=LP[l];Lt=.999}}};
return{
 rebuild(c,quiet){build(c);if(!played){P=0;Ptarget=0;applyStage();return}
  if(quiet){P=Math.min(P,4.999);applyStage();Ptarget=4.999;return}
  P=Math.min(P,1.2);Ptarget=4.999;applyStage()},
 recolor(c){applyColor(c)},
 goStage(i){Ptarget=i+.999;view.idle=0},
 replay(){P=0;Ptarget=4.999;applyStage()},
 light(k){Object.assign(Lfrom,Lcur);Lto=LP[k];Lt=0}
};
}
})();

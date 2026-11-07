(function(){
"use strict";

const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];

const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE=matchMedia('(pointer:fine)').matches;
const SMALL=matchMedia('(max-width:900px)').matches;
const TOUCH=matchMedia('(hover:none)').matches;
const MOBILE=SMALL||TOUCH||(navigator.hardwareConcurrency||8)<=4;
const G=!!window.gsap&&!RM;
const I={
  s:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
  x:'<svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19"/></svg>',
  l:'<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
  r:'<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>',
  h:'<svg viewBox="0 0 24 24"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"/></svg>',
  d:'<svg viewBox="0 0 24 24"><path d="M12 3v12m0 0l-5-5m5 5l5-5M4 20h16"/></svg>'
};
$$('[data-i]').forEach(e=>{const k=e.dataset.i;if(I[k])e.insertAdjacentHTML('afterbegin',I[k])});

/* ============================================================
   WALLPAPER DATA + PROCEDURAL ART
   ============================================================ */
const PAL={Nature:['#171717','#a3a3a3','#e5e5e5'],Cars:['#171717','#a3a3a3','#e5e5e5'],Supercars:['#171717','#a3a3a3','#e5e5e5'],Gaming:['#171717','#a3a3a3','#e5e5e5'],Anime:['#171717','#a3a3a3','#e5e5e5'],Space:['#171717','#a3a3a3','#e5e5e5'],Abstract:['#171717','#a3a3a3','#e5e5e5'],Technology:['#171717','#a3a3a3','#e5e5e5'],Minimal:['#171717','#a3a3a3','#e5e5e5'],Architecture:['#171717','#a3a3a3','#e5e5e5'],Animals:['#171717','#a3a3a3','#e5e5e5'],Fantasy:['#171717','#a3a3a3','#e5e5e5']}
let CATS=[]; // Automatically populated from the wallpaper data below.
const STY={Nature:'m',Fantasy:'m',Architecture:'b',Cars:'r',Supercars:'r',Gaming:'g',Technology:'g',Space:'s',Anime:'u',Animals:'u',Abstract:'o',Minimal:'o'};
const NM={Nature:['Emerald Ridge','Misty Valley'],Cars:['Midnight Coupe','Chrome Drive'],Supercars:['Apex Velocity','Neon Hypercar'],Gaming:['Pixel Arena','Final Boss'],Anime:['Sakura Skyline','Spirit Lantern'],Space:['Nebula Drift','Orbit Eclipse'],Abstract:['Liquid Aurora','Prism Flow'],Technology:['Quantum Grid','Circuit Bloom'],Minimal:['Soft Horizon','Quiet Arc'],Architecture:['Glass Spire','Concrete Light'],Animals:['Arctic Fox','Night Owl'],Fantasy:['Dragon Peak','Crystal Realm']};

function art(w,h,cat,seed){
  const c=document.createElement('canvas');c.width=w;c.height=h;
  const x=c.getContext('2d'),[a,b,d]=PAL[cat],st=STY[cat],u=Math.min(w,h);
  let s=(seed*2654435761)%2147483647||7;
  const r=()=>(s=s*16807%2147483647)/2147483647;
  const g=x.createLinearGradient(0,0,w*.6,h);
  g.addColorStop(0,a);g.addColorStop(1,'#04050d');
  x.fillStyle=g;x.fillRect(0,0,w,h);
  const glow=(px,py,rad,col)=>{const q=x.createRadialGradient(px,py,0,px,py,rad);q.addColorStop(0,col);q.addColorStop(1,col.slice(0,7)+'00');x.fillStyle=q;x.fillRect(0,0,w,h)};
  glow(w*(.25+r()*.5),h*(.15+r()*.3),Math.max(w,h)*.7,b+'88');

  if(st==='m'){
    glow(w*.5,h*.45,u*.5,d+'aa');
    for(let i=0;i<4;i++){x.beginPath();x.moveTo(0,h);const by=h*(.5+i*.12);
      for(let j=0;j<=8;j++)x.lineTo(w*j/8,by-r()*h*(.22-i*.03));
      x.lineTo(w,h);x.fillStyle=`rgba(4,6,16,${.3+i*.22})`;x.fill()}
  }else if(st==='b'){
    const n=14,bw=w/n;
    for(let i=0;i<n;i++){const bh=h*(.25+r()*.55);
      x.fillStyle=`rgba(6,10,26,${.55+r()*.4})`;x.fillRect(i*bw,h-bh,bw*.9,bh);
      x.fillStyle=d+'cc';
      for(let k=0;k<bh/(u*.05);k++)if(r()>.6)x.fillRect(i*bw+bw*.15,h-bh+k*u*.05+4,bw*.18,u*.02)}
  }else if(st==='r'){
    const hy=h*.55;x.fillStyle='rgba(3,4,12,.85)';x.fillRect(0,hy,w,h-hy);
    x.strokeStyle=b;x.lineWidth=u*.006;x.globalAlpha=.7;
    for(let i=-6;i<=6;i++){x.beginPath();x.moveTo(w/2+i*u*.02,hy);x.lineTo(w/2+i*w*.22,h);x.stroke()}
    x.globalAlpha=.8;x.lineWidth=u*.004;
    for(let i=0;i<24;i++){x.strokeStyle=r()>.5?b:d;const y=hy-r()*hy*.9,l=r()*w*.3,px=r()*w;
      x.beginPath();x.moveTo(px,y);x.lineTo(px+l,y);x.stroke()}
    x.globalAlpha=1;glow(w/2,hy,u*.45,d+'cc');
  }else if(st==='g'){
    const hy=h*.5;x.strokeStyle=b;x.lineWidth=u*.004;
    for(let i=0;i<14;i++){const y=hy+(h-hy)*Math.pow(i/13,2);x.globalAlpha=.25+i/20;
      x.beginPath();x.moveTo(0,y);x.lineTo(w,y);x.stroke()}
    for(let i=-10;i<=10;i++){x.beginPath();x.moveTo(w/2+i*u*.03,hy);x.lineTo(w/2+i*w*.12,h);x.stroke()}
    x.globalAlpha=1;glow(w/2,hy,u*.5,d+'99');
    x.fillStyle=d;x.beginPath();x.arc(w/2,hy-u*.12,u*.1,0,7);x.fill();
  }else if(st==='s'){
    x.fillStyle='#fff';
    for(let i=0;i<w*h/2500;i++){x.globalAlpha=r();const z=u*.004*(1+r()*2);x.fillRect(r()*w,r()*h,z,z)}
    x.globalAlpha=1;
    const px=w*(.35+r()*.3),py=h*(.4+r()*.2),pr=u*.22;
    const q=x.createRadialGradient(px-pr*.4,py-pr*.4,pr*.1,px,py,pr);
    q.addColorStop(0,d);q.addColorStop(.6,b);q.addColorStop(1,'#04050d');
    x.fillStyle=q;x.beginPath();x.arc(px,py,pr,0,7);x.fill();
    x.strokeStyle=d+'aa';x.lineWidth=u*.012;
    x.beginPath();x.ellipse(px,py,pr*1.6,pr*.35,-.4,0,7);x.stroke();
  }else if(st==='u'){
    const px=w*.5,py=h*.42;
    glow(px,py,u*.7,d+'99');
    x.fillStyle=d;x.beginPath();x.arc(px,py,u*.2,0,7);x.fill();
    for(let i=0;i<3;i++){x.beginPath();x.moveTo(0,h);
      for(let j=0;j<=12;j++)x.lineTo(w*j/12,h*(.72+i*.08)-Math.sin(j*.9+i+seed)*h*.05);
      x.lineTo(w,h);x.fillStyle=`rgba(4,6,16,${.4+i*.25})`;x.fill()}
  }else{
    for(let i=0;i<6;i++){const px=r()*w,py=r()*h,rad=u*(.25+r()*.35);
      const q=x.createRadialGradient(px,py,0,px,py,rad),col=[b,d,a][i%3];
      q.addColorStop(0,col+'cc');q.addColorStop(1,col+'00');
      x.fillStyle=q;x.beginPath();x.arc(px,py,rad,0,7);x.fill()}
    x.strokeStyle='rgba(255,255,255,.25)';x.lineWidth=u*.004;
    for(let i=0;i<5;i++){x.beginPath();x.arc(w*.5,h*.5,u*(.15+i*.07),0,7);x.stroke()}
  }
  return c;
}

const dims=(A,L)=>A[0]>=A[1]?[L,Math.round(L*A[1]/A[0])]:[Math.round(L*A[0]/A[1]),L];

/*
  YOUR WALLPAPERS — add a separate direct image URL in each image: "" field.
  Example: image: "https://yourwebsite.com/images/wallpaper-01.jpg"
  Keep the quotes. Use a direct image URL ending in .jpg, .png, .webp, etc.
*/
const W=[
  {
    id: 0,
    title: "Emerald Ridge",
    cat: "Fantasy",
    image: "Pic/1794035022741_upscaled.jpg", // Paste this wallpaper's direct image URL here
    A: [16, 10],
    w: 2560, h: 1600,
    res: "2560×1600",
    dl: 1800,
    tr: 0,
  },
  {
    id: 1,
    title: "Misty Valley",
    cat: "Nature",
    image: "Pic/Minimal Metallic Coming Soon Splash.png", // Paste this wallpaper's direct image URL here
    A: [4, 5],
    w: 2048, h: 2560,
    res: "2048×2560",
    dl: 9719,
    tr: 13,
  },
  {
    id: 2,
    title: "Midnight Coupe",
    cat: "Cars",
    image: "Pic/Minimal Metallic Coming Soon Splash.png", // Paste this wallpaper's direct image URL here
    A: [10, 16],
    w: 1600, h: 2560,
    res: "1600×2560",
    dl: 8638,
    tr: 2,
  },
  {
    id: 3,
    title: "Chrome Drive",
    cat: "Cars",
    image: "Pic/Minimal Metallic Coming Soon Splash.png", // Paste this wallpaper's direct image URL here
    A: [16, 10],
    w: 2560, h: 1600,
    res: "2560×1600",
    dl: 7557,
    tr: 15,
  },
  {
    id: 4,
    title: "Apex Velocity",
    cat: "Supercars",
    image: "Pic/Minimal Metallic Coming Soon Splash.png", // Paste this wallpaper's direct image URL here
    A: [1, 1],
    w: 2560, h: 2560,
    res: "2560×2560",
    dl: 6476,
    tr: 4,
  },
  {
    id: 5,
    title: "Neon Hypercar",
    cat: "Supercars",
    image: "Pic/Minimal Metallic Coming Soon Splash.png", // Paste this wallpaper's direct image URL here
    A: [10, 16],
    w: 1600, h: 2560,
    res: "1600×2560",
    dl: 5395,
    tr: 17,
  },
  {
    id: 6,
    title: "Pixel Arena",
    cat: "Gaming",
    image: "Pic/Minimal Metallic Coming Soon Splash.png", // Paste this wallpaper's direct image URL here
    A: [16, 9],
    w: 2560, h: 1440,
    res: "2560×1440",
    dl: 4314,
    tr: 6,
  },
  {
    id: 7,
    title: "Final Boss",
    cat: "Gaming",
    image: "Pic/Minimal Metallic Coming Soon Splash.png", // Paste this wallpaper's direct image URL here
    A: [1, 1],
    w: 2560, h: 2560,
    res: "2560×2560",
    dl: 3233,
    tr: 19,
  },
  {
    id: 8,
    title: "Sakura Skyline",
    cat: "Anime",
    image: "Pic/Minimal Metallic Coming Soon Splash.png", // Paste this wallpaper's direct image URL here
    A: [4, 5],
    w: 2048, h: 2560,
    res: "2048×2560",
    dl: 2152,
    tr: 8,
  },
  {
    id: 9,
    title: "Spirit Lantern",
    cat: "Anime",
    image: "Pic/Minimal Metallic Coming Soon Splash.png", // Paste this wallpaper's direct image URL here
    A: [16, 9],
    w: 2560, h: 1440,
    res: "2560×1440",
    dl: 10071,
    tr: 21,
  },
  {
    id: 10,
    title: "Nebula Drift",
    cat: "Space",
    image: "Pic/Minimal Metallic Coming Soon Splash.png", // Paste this wallpaper's direct image URL here
    A: [16, 10],
    w: 2560, h: 1600,
    res: "2560×1600",
    dl: 8990,
    tr: 10,
  },
  {
    id: 11,
    title: "Orbit Eclipse",
    cat: "Space",
    image: "Pic/Minimal Metallic Coming Soon Splash.png", // Paste this wallpaper's direct image URL here
    A: [4, 5],
    w: 2048, h: 2560,
    res: "2048×2560",
    dl: 7909,
    tr: 23,
  },
  {
    id: 12,
    title: "Liquid Aurora",
    cat: "Abstract",
    image: "Pic/Minimal Metallic Coming Soon Splash.png", // Paste this wallpaper's direct image URL here
    A: [10, 16],
    w: 1600, h: 2560,
    res: "1600×2560",
    dl: 6828,
    tr: 12,
  },
  {
    id: 13,
    title: "Prism Flow",
    cat: "Abstract",
    image: "Pic/Minimal Metallic Coming Soon Splash.png", // Paste this wallpaper's direct image URL here
    A: [16, 10],
    w: 2560, h: 1600,
    res: "2560×1600",
    dl: 5747,
    tr: 1,
  },
  {
    id: 14,
    title: "Quantum Grid",
    cat: "Technology",
    image: "Pic/Minimal Metallic Coming Soon Splash.png", // Paste this wallpaper's direct image URL here
    A: [1, 1],
    w: 2560, h: 2560,
    res: "2560×2560",
    dl: 4666,
    tr: 14,
  },
  {
    id: 15,
    title: "Circuit Bloom",
    cat: "Technology",
    image: "Pic/Minimal Metallic Coming Soon Splash.png", // Paste this wallpaper's direct image URL here
    A: [10, 16],
    w: 1600, h: 2560,
    res: "1600×2560",
    dl: 3585,
    tr: 3,
  },
  {
    id: 16,
    title: "Soft Horizon",
    cat: "Minimal",
    image: "Pic/Minimal Metallic Coming Soon Splash.png", // Paste this wallpaper's direct image URL here
    A: [16, 9],
    w: 2560, h: 1440,
    res: "2560×1440",
    dl: 2504,
    tr: 16,
  },
  {
    id: 17,
    title: "Quiet Arc",
    cat: "Minimal",
    image: "Pic/Minimal Metallic Coming Soon Splash.png", // Paste this wallpaper's direct image URL here
    A: [1, 1],
    w: 2560, h: 2560,
    res: "2560×2560",
    dl: 10423,
    tr: 5,
  },
  {
    id: 18,
    title: "Glass Spire",
    cat: "Architecture",
    image: "Pic/Minimal Metallic Coming Soon Splash.png", // Paste this wallpaper's direct image URL here
    A: [4, 5],
    w: 2048, h: 2560,
    res: "2048×2560",
    dl: 9342,
    tr: 18,
  },
  {
    id: 19,
    title: "Concrete Light",
    cat: "Architecture",
    image: "Pic/Minimal Metallic Coming Soon Splash.png", // Paste this wallpaper's direct image URL here
    A: [16, 9],
    w: 2560, h: 1440,
    res: "2560×1440",
    dl: 8261,
    tr: 7,
  },
  {
    id: 20,
    title: "Arctic Fox",
    cat: "Animals",
    image: "Pic/Minimal Metallic Coming Soon Splash.png", // Paste this wallpaper's direct image URL here
    A: [16, 10],
    w: 2560, h: 1600,
    res: "2560×1600",
    dl: 7180,
    tr: 20,
  },
  {
    id: 21,
    title: "Night Owl",
    cat: "Animals",
    image: "Pic/Minimal Metallic Coming Soon Splash.png", // Paste this wallpaper's direct image URL here
    A: [4, 5],
    w: 2048, h: 2560,
    res: "2048×2560",
    dl: 6099,
    tr: 9,
  },
  {
    id: 22,
    title: "Dragon Peak",
    cat: "Fantasy",
    image: "Pic/Minimal Metallic Coming Soon Splash.png", // Paste this wallpaper's direct image URL here
    A: [10, 16],
    w: 1600, h: 2560,
    res: "1600×2560",
    dl: 5018,
    tr: 22,
  },
  {
    id: 23,
    title: "Crystal Realm",
    cat: "Fantasy",
    image: "Pic/Minimal Metallic Coming Soon Splash.png", // Paste this wallpaper's direct image URL here
    A: [16, 10],
    w: 2560, h: 1600,
    res: "2560×1600",
    dl: 3937,
    tr: 11,
  }
];

/* ============================================================
   AUTOMATIC CATEGORIES
   Add a wallpaper with cat: "Your New Category" in W above.
   The category cards, wallpaper counts, gallery chips and art
   palette are generated from W automatically.
   ============================================================ */
CATS=[...new Set(W.map(p=>(p.cat||'Uncategorized').trim()).filter(Boolean))];
CATS.forEach(cat=>{
  if(!PAL[cat]) PAL[cat]=['#071323','#168bff','#7dd3fc'];
  if(!STY[cat]) STY[cat]='o';
});
$$('[data-n]').forEach(el=>{
  if(el.nextElementSibling?.textContent.trim()==='Wallpapers') el.dataset.n=W.length;
  if(el.nextElementSibling?.textContent.trim()==='Categories') el.dataset.n=CATS.length;
});
const renderCategories=()=>{
  $('#cats').innerHTML=CATS.map(c=>`<button class="cat" data-cat="${c}" style="--a:${PAL[c][0]};--b:${PAL[c][1]}55"><span>${c}</span><small>${W.filter(p=>(p.cat||'Uncategorized').trim()===c).length} wallpapers</small></button>`).join('');
  $('#chips').innerHTML=['All',...CATS].map(c=>`<button class="chip${c==='All'?' on':''}" data-cat="${c}">${c}</button>`).join('');
};
renderCategories();

 /* ============================================================
   FAVORITES / TOAST / CARDS
   ============================================================ */
let FAV=new Set();
try{FAV=new Set(JSON.parse(localStorage.getItem('wv-fav')||'[]'))}catch(e){}
const saveFav=()=>{try{localStorage.setItem('wv-fav',JSON.stringify([...FAV]))}catch(e){}};

let tt;
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2600)};
const fmtN=n=>n>=1000?(n/1000).toFixed(1)+'k':n;

const card=p=>`<article class="card" data-id="${p.id}" style="aspect-ratio:${p.A[0]}/${p.A[1]}" tabindex="0" aria-label="${p.title}">
  <img alt="${p.title} wallpaper" width="${p.A[0]*40}" height="${p.A[1]*40}" data-lazy="${p.id}" decoding="async">
  <div class="ov">
    <div><h3>${p.title}</h3><small>${p.cat} · <span data-res="${p.id}">${p.res}</span> · <b data-c="${p.id}">${fmtN(p.dl)}</b> ↓</small></div>
    <div class="acts">
      <button class="ic fav${FAV.has(p.id)?' on':''}" data-act="fav" aria-label="Favorite ${p.title}">${I.h}</button>
      <button class="ic" data-act="dl" aria-label="Download ${p.title}">${I.d}</button>
    </div>
  </div>
</article>`;

const TH={};
const hasImage=p=>typeof p.image==='string'&&p.image.trim()!==''&&!p.image.includes('PASTE_IMAGE_URL');
const thumb=p=>TH[p.id]||(TH[p.id]=hasImage(p)?p.image:art(520,Math.round(520*p.A[1]/p.A[0]),p.cat,p.id*13+5).toDataURL('image/jpeg',.8));

const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;
  const im=e.target;io.unobserve(im);
  im.onload=()=>{
    im.classList.add('in');
    const p=W[+im.dataset.lazy];
    if(hasImage(p)&&im.naturalWidth&&im.naturalHeight){
      p.w=im.naturalWidth;p.h=im.naturalHeight;p.res=p.w+' × '+p.h;p.actualResolution=true;
      $$('[data-res="'+p.id+'"]').forEach(el=>el.textContent=p.res);
      im.width=p.w;im.height=p.h;
    }
  };
  im.onerror=()=>{im.classList.add('in');im.alt='Image unavailable: '+W[+im.dataset.lazy].title};
  im.src=thumb(W[+im.dataset.lazy]);
}),{rootMargin:'250px 400px'});

const lazy=r=>$$('img[data-lazy]:not([src])',r).forEach(i=>io.observe(i));
const fill=(sel,list,wrap)=>{
  const el=$(sel);if(!el)return;
  el.innerHTML=list.map(p=>wrap?`<div class="fw">${card(p)}</div>`:card(p)).join('');
  lazy(el);
};

fill('#featRow',W.filter(p=>p.A[0]>p.A[1]).slice(0,6),1);
fill('#trStrip',[...W].sort((a,b)=>b.tr-a.tr).slice(0,8));
fill('#newStrip',[...W].sort((a,b)=>b.id-a.id).slice(0,8));
fill('#popStrip',[...W].sort((a,b)=>b.dl-a.dl).slice(0,8));
fill('#premRow',W.filter(p=>p.prem),1);

// Category cards and filter chips are rendered automatically from W above.

/* ============================================================
   GALLERY
   ============================================================ */
const S={cat:'All',tab:'all',q:''};
const syncChips=()=>$$('.chip').forEach(c=>c.classList.toggle('on',c.dataset.cat===S.cat));

function gallery(){
  let l=W.filter(p=>(S.cat==='All'||p.cat===S.cat)&&(!S.q||(p.title+' '+p.cat).toLowerCase().includes(S.q)));
  if(S.tab==='latest')l=[...l].sort((a,b)=>b.id-a.id);
  if(S.tab==='trending')l=[...l].sort((a,b)=>b.tr-a.tr);
  if(S.tab==='popular')l=[...l].sort((a,b)=>b.dl-a.dl);

  const el=$('#mas');
  el.innerHTML=l.length?l.map(card).join(''):'<p class="empty">No wallpapers match your search.</p>';
  lazy(el);

  if(G&&l.length&&!SMALL){
    gsap.from($$('#mas .card'),{y:36,rotateX:-18,opacity:0,transformPerspective:800,duration:.55,stagger:.025,ease:'power3.out',clearProps:'transform,opacity'});
  }
}
gallery();

/* ============================================================
   DOWNLOAD
   ============================================================ */
async function download(p,fmt='jpg',btn){
  const T={jpg:'image/jpeg',png:'image/png',webp:'image/webp'}[fmt]||'image/jpeg';
  if(btn&&G)gsap.fromTo(btn,{scale:.88},{scale:1,duration:.7,ease:'elastic.out(1,.4)'});
  toast('Preparing '+p.title+'…');
  await new Promise(r=>setTimeout(r,60));

  let blob=null;
  try{
    if(hasImage(p)){
      // The image host must allow CORS for format conversion through canvas.
      const response=await fetch(p.image,{mode:'cors'});
      if(!response.ok)throw new Error('Image could not be fetched');
      const sourceBlob=await response.blob();
      const objectUrl=URL.createObjectURL(sourceBlob);
      try{
        const image=await new Promise((resolve,reject)=>{
          const im=new Image();
          im.onload=()=>resolve(im);
          im.onerror=()=>reject(new Error('Image could not be loaded'));
          im.src=objectUrl;
        });
        const canvas=document.createElement('canvas');
        canvas.width=image.naturalWidth;
        canvas.height=image.naturalHeight;
        const ctx=canvas.getContext('2d');
        if(fmt==='jpg'){
          ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);
        }
        ctx.drawImage(image,0,0);
        blob=await new Promise(resolve=>canvas.toBlob(resolve,T,.94));
      }finally{URL.revokeObjectURL(objectUrl)}
    }else{
      // Demo artwork is shown until you add a URL for this wallpaper.
      blob=await new Promise(resolve=>art(p.w,p.h,p.cat,p.id*13+5).toBlob(resolve,T,.92));
    }
  }catch(err){
    toast('Download failed. Use a direct image URL from a host that allows CORS.');
    return;
  }

  if(!blob){toast('Could not create the file. Please try again.');return}
  const ext=fmt==='png'?'png':fmt==='webp'?'webp':'jpg';
  const name=`Unique Art-${p.title.toLowerCase().replace(/\s+/g,'-')}.${ext}`;

  let dls=null;
  try{if(window.claude&&window.claude.use)dls=await window.claude.use('downloads')}catch(e){}
  try{
    if(dls){
      await dls.save({filename:name,data:await blob.arrayBuffer()});
    }else{
      const a=document.createElement('a'),u=URL.createObjectURL(blob);
      a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();
      setTimeout(()=>URL.revokeObjectURL(u),4000);
    }
  }catch(e){
    toast(e&&e.code==='declined'?'Download cancelled.':'Download unavailable in this view.');
    return;
  }

  p.dl++;
  $$('[data-c="'+p.id+'"]').forEach(b=>b.textContent=fmtN(p.dl));
  if(modalOpen&&M.ids[M.i]===p.id)modalInfo(p);
  toast('Downloaded '+name);
}

function toggleFav(p){
  FAV.has(p.id)?FAV.delete(p.id):FAV.add(p.id);
  saveFav();
  $$('.card[data-id="'+p.id+'"] .fav').forEach(b=>b.classList.toggle('on',FAV.has(p.id)));
  if(modalOpen&&M.ids[M.i]===p.id)$('#mfav').classList.toggle('on',FAV.has(p.id));
  toast(FAV.has(p.id)?'Added to favorites':'Removed from favorites');
}

/* ============================================================
   SCROLL LOCK / MENU / SEARCH / MODAL
   ============================================================ */
let menuOpen=false,modalOpen=false,searchOpen=false,lenis=null;

function syncLock(){
  const lock=menuOpen||modalOpen;
  document.documentElement.classList.toggle('lock',lock);
  if(lenis){lock?lenis.stop():lenis.start()}
}

/* --- mobile menu --- */
const menu=$('#menu'),burger=$('#burger');
function setMenu(open){
  menuOpen=open;
  menu.classList.toggle('open',open);
  burger.classList.toggle('on',open);
  burger.setAttribute('aria-expanded',open?'true':'false');
  burger.setAttribute('aria-label',open?'Close menu':'Menu');
  if(open)closeSearch();
  syncLock();
}
burger.addEventListener('click',()=>setMenu(!menuOpen));

/* --- search bar (attached below navbar) --- */
const sbar=$('#sbar'),q=$('#q'),sbtn=$('#sbtn');

function openSearch(){
  searchOpen=true;
  sbar.classList.add('open');
  sbtn.classList.add('on');
  sbtn.setAttribute('aria-expanded','true');
  if(menuOpen)setMenu(false);
  setTimeout(()=>q.focus({preventScroll:true}),220);
}
function closeSearch(){
  if(!searchOpen)return;
  searchOpen=false;
  sbar.classList.remove('open');
  sbtn.classList.remove('on');
  sbtn.setAttribute('aria-expanded','false');
  q.blur();
}
sbtn.addEventListener('click',()=>searchOpen?closeSearch():openSearch());
$('#sclose').addEventListener('click',closeSearch);

/* close search on outside click */
document.addEventListener('pointerdown',e=>{
  if(!searchOpen)return;
  if(sbar.contains(e.target)||sbtn.contains(e.target))return;
  closeSearch();
});

/* --- modal --- */
const M={ids:[],i:0};
let modalUrlActive=false;
function setWallpaperUrl(id, push=false){
  const u=new URL(location.href);
  u.searchParams.set('wallpaper',String(id));
  if(push)history.pushState({wallpaperModal:true,id},'',u);
  else history.replaceState({wallpaperModal:true,id},'',u);
}
function clearWallpaperUrl(){
  const u=new URL(location.href);
  u.searchParams.delete('wallpaper');
  history.replaceState({},'',u);
  modalUrlActive=false;
}
function modalInfo(p){
  const resolution=hasImage(p)&&!p.actualResolution? 'Loading original resolution…' : 'Original resolution: '+p.res;
  $('#mm').textContent=p.cat+' · '+resolution+' · '+p.dl.toLocaleString()+' downloads';
}

function showM(dir=0){
  const p=W[M.ids[M.i]],[w,h]=dims(p.A,1300);
  $('#mt').textContent=p.title;
  modalInfo(p);
  $('#mfav').classList.toggle('on',FAV.has(p.id));
  const im=$('#mimg');
  im.alt=p.title+' wallpaper';
  im.onload=()=>{
    if(hasImage(p)&&im.naturalWidth&&im.naturalHeight){
      p.w=im.naturalWidth;p.h=im.naturalHeight;p.res=p.w+' × '+p.h;p.actualResolution=true;
      modalInfo(p);
      $$('[data-res="'+p.id+'"]').forEach(el=>el.textContent=p.res);
    }
  };
  im.onerror=()=>{$('#mm').textContent=p.cat+' · Could not load image'};
  im.src=hasImage(p)?p.image:art(w,h,p.cat,p.id*13+5).toDataURL('image/jpeg',.88);
  if(G)gsap.fromTo(im,{opacity:0,x:dir*70,rotateY:-dir*18,transformPerspective:1000},{opacity:1,x:0,rotateY:0,duration:.5,ease:'power3.out'});
}

function openM(ids,id){
  M.ids=ids;M.i=Math.max(0,ids.indexOf(id));
  const alreadyLinked=new URL(location.href).searchParams.has('wallpaper');
  setWallpaperUrl(id,!alreadyLinked&&!modalUrlActive);
  modalUrlActive=true;
  modalOpen=true;syncLock();
  showM();
  const m=$('#modal');
  m.classList.add('open');m.setAttribute('aria-hidden','false');
  if(G)gsap.fromTo('.mbox',{scale:.88,rotateX:10,opacity:0,transformPerspective:1000},{scale:1,rotateX:0,opacity:1,duration:.5,ease:'power3.out'});
  $('#mx').focus({preventScroll:true});
}

function closeM(){
  const m=$('#modal');
  m.classList.remove('open');m.setAttribute('aria-hidden','true');
  modalOpen=false;syncLock();
  if(modalUrlActive)clearWallpaperUrl();
}

const stepM=d=>{
  M.i=(M.i+d+M.ids.length)%M.ids.length;
  const p=W[M.ids[M.i]];
  setWallpaperUrl(p.id,false);
  showM(d);
};

$('#mx').onclick=closeM;
$('#mp').onclick=()=>stepM(-1);
$('#mnx').onclick=()=>stepM(1);
$('#mdl').onclick=e=>download(W[M.ids[M.i]],$('#mf').value,e.currentTarget);
$('#mfav').onclick=()=>toggleFav(W[M.ids[M.i]]);
$('#modal').addEventListener('click',e=>{
  if(e.target.id==='modal'||e.target.classList.contains('stage'))closeM();
});

// Browser Back closes the preview; a direct ?wallpaper=ID link opens that wallpaper.
addEventListener('popstate',()=>{
  if(modalOpen){
    const m=$('#modal');
    m.classList.remove('open');m.setAttribute('aria-hidden','true');
    modalOpen=false;syncLock();modalUrlActive=false;
  }
});
const requestedWallpaper=new URL(location.href).searchParams.get('wallpaper');
if(requestedWallpaper!==null){
  const id=Number(requestedWallpaper);
  if(Number.isInteger(id)&&W.some(p=>p.id===id)){
    openM(W.map(p=>p.id),id);
    // The page was opened directly with this URL; don't create a duplicate history entry.
    modalUrlActive=true;
  }
}

/* swipe in modal */
let sx=0,sy=0;
$('#modal').addEventListener('touchstart',e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
$('#modal').addEventListener('touchend',e=>{
  if(!modalOpen)return;
  const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;
  if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy))stepM(dx<0?1:-1);
},{passive:true});

addEventListener('keydown',e=>{
  if(modalOpen){
    if(e.key==='Escape')closeM();
    if(e.key==='ArrowLeft')stepM(-1);
    if(e.key==='ArrowRight')stepM(1);
    return;
  }
  if(e.key==='Escape'){
    if(searchOpen)closeSearch();
    if(menuOpen)setMenu(false);
    return;
  }
  if(e.key==='Enter'&&e.target.classList&&e.target.classList.contains('card'))e.target.click();
});

/* ============================================================
   SMOOTH SCROLL (desktop only — native is faster on mobile)
   ============================================================ */
if(!RM&&window.Lenis&&window.gsap&&!MOBILE){
  lenis=new Lenis({lerp:.1,smoothWheel:true});
  gsap.registerPlugin(ScrollTrigger);
  lenis.on('scroll',ScrollTrigger.update);
  gsap.ticker.add(t=>lenis.raf(t*1000));
  gsap.ticker.lagSmoothing(0);
}else if(window.gsap&&window.ScrollTrigger){
  gsap.registerPlugin(ScrollTrigger);
}

const go=h=>{
  const el=$(h);if(!el)return;
  if(lenis)lenis.scrollTo(el,{offset:-70,duration:1.3});
  else el.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'});
};

/* ============================================================
   DELEGATED CLICKS
   ============================================================ */
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-go],[data-act],[data-cat],[data-tab],.card');
  if(!t)return;

  if(t.dataset.go){
    e.preventDefault();
    if(menuOpen)setMenu(false);
    closeSearch();
    go(t.dataset.go);
    return;
  }
  if(t.dataset.cat){
    S.cat=t.dataset.cat;syncChips();gallery();
    closeSearch();
    if(t.classList.contains('cat'))go('#explore');
    return;
  }
  if(t.dataset.tab){
    S.tab=t.dataset.tab;
    $$('.tab').forEach(b=>b.classList.toggle('on',b===t));
    gallery();
    return;
  }
  const cd=t.closest('.card');
  if(!cd)return;
  const p=W[+cd.dataset.id];
  if(!p)return;
  if(t.dataset.act==='fav')return toggleFav(p);
  if(t.dataset.act==='dl')return download(p,'jpg',t);

  const scope=cd.closest('[data-list]')||document;
  openM($$('.card',scope).map(c=>+c.dataset.id),p.id);
});

/* search input */
let sTimer;
q.addEventListener('input',e=>{
  clearTimeout(sTimer);
  const v=e.target.value.trim().toLowerCase();
  sTimer=setTimeout(()=>{
    S.q=v;gallery();
    if(v&&scrollY>window.innerHeight*.5)go('#explore');
  },200);
});
q.addEventListener('keydown',e=>{
  if(e.key==='Enter'){
    e.preventDefault();
    closeSearch();
    go('#explore');
  }
});

/* newsletter */
$('#nl').addEventListener('submit',e=>{
  e.preventDefault();
  if(!/^\S+@\S+\.\S+$/.test($('#em').value.trim()))return toast('Please enter a valid email address.');
  e.target.reset();
  toast('You’re on the list! (demo form — nothing is sent)');
});

/* nav shadow on scroll — rAF throttled */
let sTicking=false;
const nav=$('#nav');
addEventListener('scroll',()=>{
  if(sTicking)return;
  sTicking=true;
  requestAnimationFrame(()=>{nav.classList.toggle('sc',scrollY>60);sTicking=false});
},{passive:true});

const setActive=id=>$$('.links a').forEach(a=>a.classList.toggle('active',a.dataset.go==='#'+id));

/* close menu when resizing up to desktop */
matchMedia('(min-width:901px)').addEventListener('change',e=>{if(e.matches&&menuOpen)setMenu(false)});

/* ============================================================
   TILT + GLOW CURSOR (single tracked element — fast)
   ============================================================ */
if(FINE){
  let lastTilt=null;
  const reset=el=>{el.classList.remove('tl');el.style.removeProperty('--rx');el.style.removeProperty('--ry')};

  addEventListener('pointermove',e=>{
    const c=e.target.closest&&e.target.closest('.card,.cat');
    if(lastTilt&&lastTilt!==c){reset(lastTilt);lastTilt=null}
    if(!c)return;
    const b=c.getBoundingClientRect();
    const px=(e.clientX-b.left)/b.width-.5,py=(e.clientY-b.top)/b.height-.5;
    c.classList.add('tl');
    c.style.setProperty('--rx',(-py*13)+'deg');
    c.style.setProperty('--ry',(px*13)+'deg');
    c.style.setProperty('--mx',(px+.5)*100+'%');
    c.style.setProperty('--my',(py+.5)*100+'%');
    lastTilt=c;
  },{passive:true});

  if(G){
    const cx=gsap.quickTo('#cur','x',{duration:.6,ease:'power3'});
    const cy=gsap.quickTo('#cur','y',{duration:.6,ease:'power3'});
    addEventListener('pointermove',e=>{cx(e.clientX);cy(e.clientY)},{passive:true});
  }
}

/* ============================================================
   SCROLL MOTION
   ============================================================ */
function motion(){
  if(!G||!window.ScrollTrigger)return;

  $$('.rv').forEach(el=>gsap.from(el,{
    y:80,rotateX:-30,opacity:0,transformPerspective:900,transformOrigin:'50% 100%',
    duration:1,ease:'power3.out',
    scrollTrigger:{trigger:el,start:'top 90%',once:true}
  }));

  if(!SMALL){
    $$('.fw').forEach((el,i)=>gsap.fromTo(el,
      {rotateY:i%2?40:-40,rotateX:22,z:-400,y:130,opacity:0},
      {rotateY:0,rotateX:0,z:0,y:0,opacity:1,ease:'none',
       scrollTrigger:{trigger:el,start:'top 100%',end:'top 55%',scrub:1}}));
  }

  gsap.set('.cat',{opacity:0});
  ScrollTrigger.batch('.cat',{
    start:'top 92%',once:true,
    onEnter:b=>gsap.fromTo(b,
      {rotateY:-70,z:-250,opacity:0,transformPerspective:900},
      {rotateY:0,z:0,opacity:1,stagger:.05,duration:.85,ease:'back.out(1.4)',clearProps:'transform,opacity'})
  });

  if(!SMALL){
    $$('.orb').forEach(o=>gsap.to(o,{
      y:-(+o.dataset.s)*320,ease:'none',
      scrollTrigger:{trigger:o.parentElement,start:'top bottom',end:'bottom top',scrub:true}
    }));
  }

  gsap.to('.hero-copy',{y:-110,opacity:0,scale:.94,ease:'none',
    scrollTrigger:{trigger:'#home',start:'top top',end:'bottom top',scrub:true}});

  gsap.fromTo('.about-card',{scale:.82,rotateX:20,opacity:.25},
    {scale:1,rotateX:0,opacity:1,ease:'none',
     scrollTrigger:{trigger:'#about',start:'top 88%',end:'top 40%',scrub:1}});

  $$('[data-n]').forEach(el=>{
    const o={v:0};
    gsap.to(o,{v:+el.dataset.n,duration:1.8,ease:'power2.out',
      scrollTrigger:{trigger:el,start:'top 92%',once:true},
      onUpdate:()=>el.textContent=Math.round(o.v).toLocaleString()+(el.dataset.s||'')});
  });

  $$('header[id],section[id]').forEach(s=>ScrollTrigger.create({
    trigger:s,start:'top 55%',end:'bottom 55%',
    onToggle:st=>st.isActive&&setActive(s.id)
  }));

  gsap.from('.hero h1 span',{yPercent:120,rotateX:-80,opacity:0,stagger:.13,duration:1.2,ease:'power4.out'});
  gsap.from('.hero p,.hero .btn',{y:28,opacity:0,delay:.65,duration:.9,stagger:.14,ease:'power3.out'});

  /* horizontal pin — desktop only */
  gsap.matchMedia().add('(min-width:900px)',()=>{
    document.documentElement.classList.add('pin');
    const tr=$('#popStrip');
    const dist=()=>tr.scrollWidth-innerWidth+80;
    gsap.to(tr,{x:()=>-dist(),ease:'none',
      scrollTrigger:{trigger:'#hz',start:'top top',end:()=>'+='+dist(),pin:true,scrub:1,invalidateOnRefresh:true,anticipatePin:1}});
    return()=>document.documentElement.classList.remove('pin');
  });

  if(FINE)$$('.mag').forEach(b=>{
    b.addEventListener('pointermove',e=>{
      const r=b.getBoundingClientRect();
      gsap.to(b,{x:(e.clientX-r.left-r.width/2)*.28,y:(e.clientY-r.top-r.height/2)*.28,duration:.3});
    });
    b.addEventListener('pointerleave',()=>gsap.to(b,{x:0,y:0,duration:.7,ease:'elastic.out(1,.4)'}));
  });

  addEventListener('load',()=>ScrollTrigger.refresh());
}

/* ============================================================
   THREE.JS HERO
   ============================================================ */
function hero3d(){
  if(!window.THREE)return;
  const cv=$('#gl'),hero=$('#home');
  let R;
  try{
    R=new THREE.WebGLRenderer({canvas:cv,antialias:!MOBILE,alpha:true,powerPreference:'high-performance'});
  }catch(e){return}

  R.setPixelRatio(Math.min(devicePixelRatio,MOBILE?1.25:1.75));

  const sc=new THREE.Scene();
  const cam=new THREE.PerspectiveCamera(50,1,.1,100);
  const res=[];

  /* stars */
  const n=MOBILE?350:1500;
  const pos=new Float32Array(n*3);
  for(let i=0;i<n*3;i++)pos[i]=(Math.random()-.5)*(i%3===2?24:36);
  const pg=new THREE.BufferGeometry();
  pg.setAttribute('position',new THREE.BufferAttribute(pos,3));
  const pm=new THREE.PointsMaterial({size:.045,color:0x9fd8ff,transparent:true,opacity:.85,depthWrite:false,blending:THREE.AdditiveBlending});
  const pts=new THREE.Points(pg,pm);
  sc.add(pts);res.push(pg,pm);

  /* glow sprite texture */
  const gc=document.createElement('canvas');gc.width=gc.height=128;
  const gx=gc.getContext('2d');
  const gr=gx.createRadialGradient(64,64,0,64,64,64);
  gr.addColorStop(0,'rgba(255,255,255,.9)');gr.addColorStop(1,'rgba(255,255,255,0)');
  gx.fillStyle=gr;gx.fillRect(0,0,128,128);
  const gt=new THREE.CanvasTexture(gc);res.push(gt);

  [[0x8b5cff,-4,2,-4,9],[0x22d3ee,4,-2,-5,10],[0x3b82ff,0,0,-6,12]].forEach(([c,x,y,z,s])=>{
    const m=new THREE.SpriteMaterial({map:gt,color:c,transparent:true,opacity:.5,blending:THREE.AdditiveBlending,depthWrite:false});
    const sp=new THREE.Sprite(m);
    sp.position.set(x,y,z);sp.scale.set(s,s,1);
    sc.add(sp);res.push(m);
  });

  /* floating art cards */
  const grp=new THREE.Group();sc.add(grp);
  const geo=new THREE.PlaneGeometry(2.6,1.62);
  const eg=new THREE.EdgesGeometry(geo);
  res.push(geo,eg);
  const cards=[];

  /* YOUR 4 HERO BACKGROUND IMAGES:
     Replace these paths with your own image paths or direct image URLs.
     Example: "Pic/my-wallpaper-1.jpg"
     Leave a value as "" to use the built-in generated background art.
  */
  const HERO_CARD_IMAGES=[
    "Pic/Futuristic Neon Countdown Grid - Copy (2).png",
    "Pic/Futuristic Neon Countdown Grid - Copy (3).png",
    "Pic/Futuristic Neon Countdown Grid - Copy.png",
    "Pic/Futuristic Neon Countdown Grid.png"
  ];
  const textureLoader=new THREE.TextureLoader();

  [[-3.6,1.1,0,.35],[0,.1,1.4,0],[3.6,-.4,.2,-.35],[-2.6,-1.9,1,.2],[2.9,2.1,-1.2,-.25],[-6.2,-.6,-1.6,.5],[6.3,1.3,-1.8,-.5]]
  .forEach(([x,y,z,ry],i)=>{
    if(MOBILE&&i>3)return;
    let t;
    const customImage=HERO_CARD_IMAGES[i];
    if(i<4&&customImage){
      t=textureLoader.load(customImage,()=>{R.render(sc,cam);},undefined,()=>{
        console.warn('Could not load hero background image:',customImage);
      });
      t.colorSpace=THREE.SRGBColorSpace||THREE.sRGBEncoding;
    }else{
      t=new THREE.CanvasTexture(art(448,280,CATS[(i*3+1)%CATS.length],i*17+9));
    }
    const m=new THREE.MeshBasicMaterial({map:t,transparent:true,opacity:.95});
    const mesh=new THREE.Mesh(geo,m);
    const lm=new THREE.LineBasicMaterial({color:i%2?0x22d3ee:0x8b5cff});
    mesh.add(new THREE.LineSegments(eg,lm));
    mesh.position.set(x,y,z);mesh.rotation.y=ry;
    mesh.userData={y,ph:i*1.3};
    grp.add(mesh);cards.push(mesh);
    res.push(t,m,lm);
  });

  const st={p:0},mouse={x:0,y:0},clock=new THREE.Clock();
  let vis=true,raf=0;

  const size=()=>{
    const w=hero.clientWidth,h=hero.clientHeight;
    R.setSize(w,h,false);
    cam.aspect=w/h;cam.updateProjectionMatrix();
  };
  size();
  addEventListener('resize',size,{passive:true});

  if(FINE)addEventListener('pointermove',e=>{
    mouse.x=e.clientX/innerWidth*2-1;
    mouse.y=e.clientY/innerHeight*2-1;
  },{passive:true});

  function frame(){
    const t=clock.getElapsedTime();
    grp.rotation.y+=(mouse.x*.32-grp.rotation.y)*.05;
    grp.rotation.x+=(mouse.y*.18-grp.rotation.x)*.05;
    grp.position.y=st.p*2.4;
    cam.position.x+=(mouse.x*.55-cam.position.x)*.03;
    cam.position.y+=(-mouse.y*.35-cam.position.y)*.03;
    cam.position.z=(cam.aspect<1?15:9)-st.p*4+Math.sin(t*.3)*.22;
    cam.lookAt(0,0,0);
    for(let i=0;i<cards.length;i++){
      const c=cards[i];
      c.position.y=c.userData.y+Math.sin(t*.8+c.userData.ph)*.17;
      c.rotation.x=Math.sin(t*.5+c.userData.ph)*.05;
    }
    pts.rotation.y=t*.02+st.p*.5;
    R.render(sc,cam);
  }

  const loop=()=>{
    if(!vis||document.hidden){raf=0;return}
    frame();raf=requestAnimationFrame(loop);
  };
  const start=()=>{if(!raf&&!RM&&vis&&!document.hidden)raf=requestAnimationFrame(loop)};

  new IntersectionObserver(([e])=>{vis=e.isIntersecting;start()},{threshold:0}).observe(hero);
  document.addEventListener('visibilitychange',start);

  if(G&&window.ScrollTrigger){
    gsap.to(st,{p:1,ease:'none',
      scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:true}});
  }

  frame();start();

  addEventListener('pagehide',()=>{
    cancelAnimationFrame(raf);
    res.forEach(r=>r.dispose&&r.dispose());
    R.dispose();
  });
}

/* ===== THEME SWITCH + BACK TO TOP ===== */
const themeToggle=$('#themeToggle');
const applyTheme=light=>{
  document.body.classList.toggle('light',light);
  if(themeToggle){
    themeToggle.textContent=light?'☾':'☼';
    themeToggle.setAttribute('aria-label',light?'Switch to dark mode':'Switch to light mode');
    themeToggle.title=light?'Switch to dark mode':'Switch to light mode';
  }
  try{localStorage.setItem('unique-art-theme',light?'light':'dark')}catch(e){}
};
let savedTheme='dark';
try{savedTheme=localStorage.getItem('unique-art-theme')||'dark'}catch(e){}
applyTheme(savedTheme==='light');
if(themeToggle)themeToggle.addEventListener('click',()=>applyTheme(!document.body.classList.contains('light')));

const backTop=$('#backTop');
const updateBackTop=()=>{
  if(backTop)backTop.classList.toggle('show',window.scrollY>420);
};
addEventListener('scroll',updateBackTop,{passive:true});
updateBackTop();
if(backTop)backTop.addEventListener('click',()=>{
  if(window.lenis&&typeof window.lenis.scrollTo==='function')window.lenis.scrollTo(0,{duration:1.1});
  else window.scrollTo({top:0,behavior:'smooth'});
});

/* boot */
motion();
hero3d();

})();

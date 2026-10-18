/* Dóra Pribeli – közös script: nyelvváltó, háttér, projektlista, animációk.
   Ezt általában nem kell szerkesztened; a tartalom a tartalom.js-ben van. */
/* ---------- Language toggle ---------- */
(function(){
  var root=document.documentElement;
  // Az oldal címe a <body data-title-en="…" data-title-hu="…"> attribútumokból jön
  var titles={en:document.body.dataset.titleEn||document.title,hu:document.body.dataset.titleHu||document.title};
  function set(l){
    root.dataset.lang=l; root.lang=l; document.title=titles[l];
    document.querySelectorAll(".lang button").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.set===l)});
    try{localStorage.setItem("lang",l)}catch(e){}
  }
  var saved=null; try{saved=localStorage.getItem("lang")}catch(e){}
  set(saved||((navigator.language||"").toLowerCase().indexOf("hu")===0?"hu":"en"));
  document.querySelectorAll(".lang button").forEach(function(b){b.addEventListener("click",function(){set(b.dataset.set)})});
})();

/* ---------- Decorative background layer (injected on every page) ---------- */
(function(){
  if(document.querySelector(".bg"))return;
  var d=document.createElement("div");d.className="bg";d.setAttribute("aria-hidden","true");
  d.innerHTML='<div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div>'+
    '<svg class="geo g2" id="geo2" viewBox="-110 -110 220 220"></svg>'+
    '<svg class="geo g3" id="geo3" viewBox="-110 -110 220 220"></svg>'+
    '<svg class="flora top" id="vines" viewBox="0 0 1440 210" preserveAspectRatio="xMidYMin slice"></svg>'+
    '<svg class="flora left" id="fernL" viewBox="0 0 520 640"></svg>'+
    '<svg class="flora right" id="fernR" viewBox="0 0 520 640"></svg>'+
    '<canvas id="spores"></canvas>';
  document.body.insertBefore(d,document.body.firstChild);
})();

/* ---------- Projects and posts from tartalom.js ---------- */
(function(){
  function bi(tag,obj,cls){ // one element per language
    var frag=document.createDocumentFragment();
    if(!obj)return frag;
    if(typeof obj==="string")obj={en:obj,hu:obj};
    ["en","hu"].forEach(function(l){var e=document.createElement(tag);e.lang=l;e.textContent=obj[l]||obj.en||"";if(cls)e.className=cls;frag.appendChild(e)});
    return frag;
  }
  var pl=document.getElementById("project-list");
  if(pl&&window.PROJECTS){
    PROJECTS.forEach(function(p){
      var card=document.createElement(p.link?"a":"div");
      if(p.link)card.href=p.link;
      card.className="card"+(p.featured?" feature":"");
      if(p.featured)card.style.gridColumn="1/-1";
      var body=card;
      if(p.featured){
        var th=document.createElement("div");th.className="thumb";
        if(p.embed){var fr=document.createElement("iframe");fr.src=p.embed;fr.loading="lazy";fr.tabIndex=-1;fr.setAttribute("aria-hidden","true");fr.title="";th.appendChild(fr)}
        else if(p.image){th.innerHTML='<img alt="" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0">';th.firstChild.src=p.image}
        else th.innerHTML='<canvas class="osc-thumb" aria-hidden="true"></canvas>';
        card.appendChild(th);body=document.createElement("div");body.className="body";card.appendChild(body);
      }else if(p.image){
        var cv=document.createElement("div");cv.className="cover";cv.innerHTML='<img alt="">';cv.firstChild.src=p.image;card.appendChild(cv);
      }
      if(p.tag){var t=document.createElement("div");t.className="tag";t.textContent=p.tag;body.appendChild(t)}
      body.appendChild(bi("h3",p.title));
      body.appendChild(bi("p",p.text));
      if(p.link){var m=document.createElement("span");m.className="more";m.appendChild(bi("span",p.linkText||{en:"Open →",hu:"Megnyitom →"}));body.appendChild(m)}
      pl.appendChild(card);
    });
  }
  var ul=document.getElementById("post-list");
  if(ul&&window.POSTS){
    POSTS.forEach(function(p){
      var li=document.createElement("li"),box=li;
      if(p.link){li.className="link";box=document.createElement("a");box.href=p.link;li.appendChild(box)}
      box.appendChild(bi("b",p.title));
      box.appendChild(p.link?bi("span",p.date||""):bi("span",{en:"Coming soon",hu:"Hamarosan"}));
      ul.appendChild(li);
    });
  }
})();

/* ---------- Kuramoto oscillators (hero + project thumbnail) ---------- */
(function(){
  function css(v){return getComputedStyle(document.documentElement).getPropertyValue(v).trim()}
  function hex(c){c=c.replace("#","");return[parseInt(c.slice(0,2),16),parseInt(c.slice(2,4),16),parseInt(c.slice(4,6),16)]}
  function mix(a,b,t){return"rgb("+a.map(function(x,i){return Math.round(x+(b[i]-x)*t)}).join(",")+")"}

  function sim(canvas,opts){
    if(!canvas)return;
    var ctx=canvas.getContext("2d"),N=opts.n,th=[],w=[],t=0,W,H,dpr;
    for(var i=0;i<N;i++){th.push(Math.random()*6.283);w.push(1+1.0*(Math.random()*2-1))}
    function size(){dpr=Math.min(devicePixelRatio||1,2);W=canvas.clientWidth;H=canvas.clientHeight;canvas.width=W*dpr;canvas.height=H*dpr}
    var lastS=null;
    size(); addEventListener("resize",function(){size();if(lastS&&!running)draw(lastS)});
    function step(dt){
      // coupling slowly swings between incoherent and synchronised
      var K=1.3+1.6*Math.sin(t*0.2),sx=0,sy=0;
      for(var i=0;i<N;i++){sx+=Math.cos(th[i]);sy+=Math.sin(th[i])}
      sx/=N;sy/=N;var R=Math.hypot(sx,sy),psi=Math.atan2(sy,sx);
      for(i=0;i<N;i++)th[i]+=dt*(w[i]+K*R*Math.sin(psi-th[i]));
      t+=dt;return{R:R,psi:psi};
    }
    function draw(s){
      lastS=s;
      var wake=hex(opts.dark?"#5cc8ff":css("--wake")),psy=hex(opts.dark?"#ff5fb2":css("--psy"));
      var line=opts.dark?"rgba(160,175,215,.18)":css("--line");
      ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
      var cx=W/2,cy=H/2,r=Math.min(W,H)*0.36;
      ctx.strokeStyle=line;ctx.lineWidth=1;ctx.beginPath();ctx.arc(cx,cy,r,0,6.283);ctx.stroke();
      for(var i=0;i<N;i++){
        var a=th[i],x=cx+r*Math.cos(a),y=cy+r*Math.sin(a);
        ctx.fillStyle=mix(wake,psy,(Math.sin(a)+1)/2);
        ctx.globalAlpha=.9;ctx.shadowColor=ctx.fillStyle;ctx.shadowBlur=10;ctx.beginPath();ctx.arc(x,y,opts.dot,0,6.283);ctx.fill();
      }
      ctx.globalAlpha=1;ctx.shadowBlur=0;
      var col=mix(psy,wake,s.R);
      ctx.strokeStyle=col;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx,cy);
      ctx.lineTo(cx+r*s.R*Math.cos(s.psi),cy+r*s.R*Math.sin(s.psi));ctx.stroke();
      ctx.fillStyle=col;ctx.beginPath();ctx.arc(cx,cy,3,0,6.283);ctx.fill();
      if(opts.label){
        ctx.font="12px 'IBM Plex Mono',monospace";ctx.fillStyle=opts.dark?"#8a93ab":css("--mute");ctx.textAlign="center";
        ctx.fillText("R = "+s.R.toFixed(2),cx,cy+r+28);
      }
    }
    var running=false,last=0;
    function loop(now){
      if(!running)return;
      var dt=Math.min((now-last)/1000,0.05);last=now;
      var s;for(var k=0;k<2;k++)s=step(dt/2);
      draw(s);requestAnimationFrame(loop);
    }
    function start(){running=true;last=performance.now();requestAnimationFrame(loop)}
    // Always animate, even when the visitor's system asks for reduced motion (owner's choice)
    start();
  }
  sim(document.getElementById("osc"),{n:64,dot:4.5,label:true});
  document.querySelectorAll(".osc-thumb").forEach(function(c){sim(c,{n:48,dot:3.5})});
})();

/* ---------- Night jungle: fractal ferns, dendrite trees, crystals, floating geometry, fireflies ---------- */
(function(){
  var NS="http://www.w3.org/2000/svg",still=false; // always animate (owner's choice), even with reduced motion
  var C=["#22d8f0","#14e39a","#a8ef3c","#3d55ff"];
  var seed=11;function rnd(){seed=(seed*16807)%2147483647;return(seed-1)/2147483646}
  function pick(){return C[Math.floor(rnd()*C.length)]}
  function f(n){return n.toFixed(1)}
  function P(x,y){return f(x)+" "+f(y)}
  function el(tag,attrs,parent){var e=document.createElementNS(NS,tag);for(var k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e}
  function glow(svg,dev){
    var d=el("defs",{},svg),fl=el("filter",{id:"glow-"+svg.id,x:"-50%",y:"-50%",width:"200%",height:"200%"},d);
    el("feGaussianBlur",{stdDeviation:dev||"3",result:"b"},fl);var m=el("feMerge",{},fl);
    el("feMergeNode",{"in":"b"},m);el("feMergeNode",{"in":"SourceGraphic"},m);
    return el("g",{filter:"url(#glow-"+svg.id+")"},svg);
  }
  function swayG(parent,x,y,amp){
    var g=el("g",{class:"sway"},parent);
    g.style.transformOrigin=f(x)+"px "+f(y)+"px";
    g.style.setProperty("--d",f(7+rnd()*7)+"s");g.style.setProperty("--dl",f(-rnd()*9)+"s");g.style.setProperty("--a",f(amp)+"deg");
    return g;
  }
  function line(stroke,w,d,parent,op){return el("path",{d:d,stroke:stroke,"stroke-width":w,fill:"none","stroke-linecap":"round","stroke-opacity":op||1},parent)}

  // Self-similar fern: every pinna is a smaller copy of the frond
  function fernPath(x,y,len,ang,bend,width,depth,n){
    var d="M"+P(x,y),px=x,py=y,a=ang,pts=[],sub="";
    for(var i=1;i<=n;i++){a+=bend/n;px+=Math.cos(a)*len/n;py+=Math.sin(a)*len/n;d+=" L"+P(px,py);pts.push([px,py,a])}
    for(i=1;i<n-1;i++){
      var p=pts[i],t=(i+1)/n,L=len*width*(1-t*.8);
      for(var s=-1;s<=1;s+=2){
        var sa=p[2]+s*.95;
        sub+=depth>0?" "+fernPath(p[0],p[1],L,sa,bend*.45,.34,depth-1,9)
                    :" M"+P(p[0],p[1])+" L"+P(p[0]+Math.cos(sa)*L,p[1]+Math.sin(sa)*L);
      }
    }
    return d+sub;
  }
  function fern(parent,x,y,len,ang,bend,col,width){
    var g=swayG(parent,x,y,1+rnd()*2);
    line(col,1,fernPath(x,y,len,ang,bend,width,1,22),g,.9);
  }

  // Binary dendrite tree, thinner at each generation, glowing nodes at the tips
  function dendrite(parent,x,y,len,ang,col,depth){
    var g=swayG(parent,x,y,.8+rnd()*1.2),segs=[],tips=[],spread=.38+rnd()*.14;
    (function grow(x,y,len,ang,k){
      var x2=x+Math.cos(ang)*len,y2=y+Math.sin(ang)*len;
      segs[k]=(segs[k]||"")+" M"+P(x,y)+" L"+P(x2,y2);
      if(k<depth){var j=(rnd()-.5)*.3;grow(x2,y2,len*(.7+rnd()*.1),ang-spread+j,k+1);grow(x2,y2,len*(.7+rnd()*.1),ang+spread+j,k+1)}
      else tips.push([x2,y2]);
    })(x,y,len,ang,0);
    segs.forEach(function(d,k){line(col,Math.max(.6,2.6-k*.3),d,g,.95)});
    tips.forEach(function(t){el("circle",{cx:f(t[0]),cy:f(t[1]),r:1.5,fill:"#fff","fill-opacity":.85},g)});
  }

  // Snowflake-like crystal: each arm branches into smaller arms
  function armPath(x,y,len,ang,depth){
    var d="M"+P(x,y)+" L"+P(x+Math.cos(ang)*len,y+Math.sin(ang)*len);
    if(depth>0)[.42,.75].forEach(function(k){
      var bx=x+Math.cos(ang)*len*k,by=y+Math.sin(ang)*len*k;
      d+=" "+armPath(bx,by,len*.36,ang-1.0472,depth-1)+" "+armPath(bx,by,len*.36,ang+1.0472,depth-1);
    });
    return d;
  }
  function crystal(parent,x,y,r,col,dur){
    var g=el("g",{transform:"translate("+P(x,y)+")"},parent),inner=el("g",{class:"spin"},g),d="";
    inner.style.setProperty("--d",(dur||40+rnd()*40).toFixed(0)+"s");
    for(var k=0;k<6;k++)d+=" "+armPath(0,0,r,k*1.0472,2);
    line(col,.9,d,inner);
    el("circle",{r:1.8,fill:"#fff"},inner);
  }

  function cluster(svg){
    var root=glow(svg),H=640;
    for(var i=0;i<3;i++)dendrite(root,40+rnd()*220,H+5,62+rnd()*36,-Math.PI/2+(rnd()-.5)*.5,pick(),7);
    for(i=0;i<6;i++)fern(root,20+rnd()*170,H+10,240+rnd()*300,-Math.PI/2-.2+rnd()*.75,.35+rnd()*.7,pick(),.22+rnd()*.08);
    crystal(root,120+rnd()*200,H-300-rnd()*160,18+rnd()*12,pick());
  }
  function vines(svg){
    var root=glow(svg);
    for(var i=0;i<14;i++){
      var x=40+i*100+rnd()*60,len=60+rnd()*140,col=pick(),g=swayG(root,x,0,2+rnd()*3);
      line(col,1,fernPath(x,0,len,Math.PI/2,(rnd()-.5)*.8,.16,0,14),g,.85);
      var ex=x+Math.cos(Math.PI/2)*len,ey=len;
      if(rnd()<.45)crystal(g,x,len+10,8+rnd()*5,C[(C.indexOf(col)+2)%4]);
      else el("circle",{cx:f(x),cy:f(len+3),r:2.5,fill:"#fff",stroke:col,"stroke-width":1.5},g);
    }
  }

  // Floating fractal geometry
  function squareSpiral(svg,col){
    var root=glow(svg,"2"),d="",r=100;
    for(var k=0;k<26;k++){
      var a=k*.12;d+="M";
      for(var j=0;j<4;j++){var t=a+j*Math.PI/2+Math.PI/4;d+=(j?" L":"")+P(Math.cos(t)*r,Math.sin(t)*r)}
      d+="Z ";r*=Math.cos(.12)/Math.cos(.12-0)*.94;
    }
    line(col,.7,d,root);
  }
  function koch(svg,col){
    var root=glow(svg,"2"),pts=[];
    for(var i=0;i<3;i++){var a=-Math.PI/2+i*2*Math.PI/3;pts.push([Math.cos(a)*100,Math.sin(a)*100])}
    function seg(p,q,k,out){
      if(!k){out.push(q);return}
      var dx=(q[0]-p[0])/3,dy=(q[1]-p[1])/3,a=[p[0]+dx,p[1]+dy],b=[p[0]+2*dx,p[1]+2*dy],
          c=[a[0]+dx*.5+dy*.866,a[1]+dy*.5-dx*.866];
      seg(p,a,k-1,out);seg(a,c,k-1,out);seg(c,b,k-1,out);seg(b,q,k-1,out);
    }
    [1,.62,.38].forEach(function(sc){
      var out=[pts[0]];for(i=0;i<3;i++)seg(pts[i],pts[(i+1)%3],4,out);
      line(col,.7,"M"+out.map(function(p){return P(p[0]*sc,p[1]*sc)}).join(" L")+"Z",root);
    });
  }

  cluster(document.getElementById("fernL"));
  cluster(document.getElementById("fernR"));
  vines(document.getElementById("vines"));
  squareSpiral(document.getElementById("geo2"),C[1]);
  koch(document.getElementById("geo3"),C[2]);

  // Fireflies / spores
  var cv=document.getElementById("spores"),ctx=cv.getContext("2d"),Pt=[],W,H,dpr;
  function size(){
    dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;
    var n=Math.round(Math.min(90,W*H/14000));Pt=[];
    for(var i=0;i<n;i++)Pt.push({x:rnd()*W,y:rnd()*H,r:.8+rnd()*1.8,c:C[i%4],vx:(rnd()-.5)*.2,vy:-.05-rnd()*.22,ph:rnd()*6.28,sp:.4+rnd()*1.4});
  }
  function draw(t){
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);ctx.globalCompositeOperation="lighter";
    Pt.forEach(function(p){
      if(!still){p.x+=p.vx+Math.sin(t/2600+p.ph)*.18;p.y+=p.vy;if(p.y<-12){p.y=H+12;p.x=rnd()*W}if(p.x<-12)p.x=W+12;if(p.x>W+12)p.x=-12}
      var a=.25+.75*Math.max(0,Math.sin(t/1000*p.sp+p.ph)),R=p.r*8;
      var g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,R);g.addColorStop(0,p.c);g.addColorStop(1,"rgba(0,0,0,0)");
      ctx.globalAlpha=a*.55;ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,R,0,6.283);ctx.fill();
      ctx.globalAlpha=a;ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(p.x,p.y,p.r*.6,0,6.283);ctx.fill();
    });
  }
  size();addEventListener("resize",size);
  if(still){draw(0);return}
  (function loop(t){draw(t);requestAnimationFrame(loop)})(0);
})();

/* ---------- Logo (still image of the 3D brain from the project) + favicon ---------- */
(function(){
  document.querySelectorAll(".logo").forEach(function(a){a.insertAdjacentHTML("afterbegin",'<img src="assets/logo.png" alt="" width="60" height="38">')});
  var ic=document.createElement("link");ic.rel="icon";ic.type="image/png";ic.href="assets/favicon.png";document.head.appendChild(ic);
})();

/* ---------- Floating "Support me" button (right side) with the Ko-fi donation panel ---------- */
(function(){
  var KOFI="https://ko-fi.com/dorapribeli";
  var btn=document.createElement("button");btn.type="button";btn.className="kofi-btn";btn.setAttribute("aria-expanded","false");
  btn.innerHTML='<span aria-hidden="true">☕</span> <span lang="en">Support me</span><span lang="hu">Támogass</span>';
  var panel=document.createElement("div");panel.className="kofi-panel";panel.hidden=true;
  panel.innerHTML='<div class="kofi-head"><a href="'+KOFI+'" target="_blank" rel="noopener"><span lang="en">Open on Ko-fi ↗</span><span lang="hu">Megnyitás a Ko-fin ↗</span></a>'+
    '<button type="button" class="kofi-close" aria-label="Close">×</button></div>';
  var frame=null;
  function open(v){
    if(v&&!frame){frame=document.createElement("iframe");frame.src=KOFI+"/?hidefeed=true&widget=true&embed=true";frame.title="Ko-fi";panel.appendChild(frame)}
    panel.hidden=!v;btn.setAttribute("aria-expanded",String(v));
  }
  btn.addEventListener("click",function(){open(panel.hidden)});
  panel.querySelector(".kofi-close").addEventListener("click",function(){open(false)});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")open(false)});
  document.body.appendChild(panel);document.body.appendChild(btn);
})();

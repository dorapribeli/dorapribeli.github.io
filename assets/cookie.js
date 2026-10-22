/* =========================================================
   Süti-banner + Google Analytics (csak hozzájárulás után)
   A GA azonosító itt van: GA_ID. A szövegek a TXT részben.
   ========================================================= */
(function(){
  // Beágyazva (iframe, pl. connectome.html?embed) nem mutatunk bannert és nem mérünk duplán
  try{ if (window.self !== window.top) return; }catch(e){ return; }
  var GA_ID = 'G-Q86MG2E4D5';
  var KEY = 'cookie-consent'; // 'yes' | 'no'

  var TXT = {
    hu:{title:'Sütik',
        body:'A Google Analytics-szel névtelen látogatottsági statisztikát gyűjtenék, hogy lássam, mi érdekli az olvasókat. Csak akkor kapcsolom be, ha engedélyezed.',
        more:'Részletek',
        details:'A Google Analytics sütiket tárol a böngésződben, és a Google (USA) szerverein dolgozza fel az adatokat (pl. megtekintett oldalak, eszköz típusa, hozzávetőleges hely). Hirdetésre nem használom. A döntésedet bármikor megváltoztathatod a lábléc „Süti-beállítások” linkjével.',
        yes:'Elfogadom', no:'Elutasítom', settings:'Süti-beállítások'},
    en:{title:'Cookies',
        body:'I’d like to use Google Analytics to collect anonymous visit statistics so I can see what readers find interesting. It only runs if you allow it.',
        more:'Details',
        details:'Google Analytics stores cookies in your browser and processes data on Google’s (US) servers (e.g. pages viewed, device type, approximate location). I don’t use it for advertising. You can change your choice any time via “Cookie settings” in the footer.',
        yes:'Accept', no:'Decline', settings:'Cookie settings'}
  };

  function get(){ try{ return localStorage.getItem(KEY); }catch(e){ return null; } }
  function set(v){ try{ localStorage.setItem(KEY, v); }catch(e){} }
  function lang(){
    var l = document.documentElement.getAttribute('data-lang') || document.documentElement.lang || '';
    if (!TXT[l]) l = (navigator.language||'').slice(0,2)==='hu' ? 'hu' : 'en';
    return l;
  }

  var loaded = false;
  function loadGA(){
    if (loaded) return; loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
    var s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }
  function clearGA(){
    var host = location.hostname, parts = host.split('.'), domains = [host, ''];
    for (var i = 0; i < parts.length - 1; i++) domains.push('.' + parts.slice(i).join('.'));
    document.cookie.split(';').forEach(function(c){
      var n = c.split('=')[0].trim();
      if (/^_ga/.test(n)) domains.forEach(function(d){
        document.cookie = n + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  var css = '.ck{position:fixed;left:16px;bottom:16px;z-index:60;max-width:420px;padding:18px 20px;border-radius:18px;'+
    'background:rgba(6,12,24,.86);backdrop-filter:blur(14px) saturate(140%);-webkit-backdrop-filter:blur(14px) saturate(140%);'+
    'border:1px solid rgba(34,216,240,.25);box-shadow:0 20px 60px -20px rgba(0,0,0,.8),0 0 40px -18px #22d8f0;'+
    'color:#eef3f7;font:14px/1.5 "Instrument Sans",system-ui,-apple-system,sans-serif;animation:ckup .4s ease-out}'+
    '@keyframes ckup{from{opacity:0;transform:translateY(12px)}}'+
    '@media (prefers-reduced-motion:reduce){.ck{animation:none}}'+
    '.ck[hidden]{display:none}'+
    '.ck .ck-t{font:12px "IBM Plex Mono",ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#22d8f0}'+
    '.ck p{margin:6px 0 12px;color:#8d9bb0}'+
    '.ck .ck-more{all:unset;cursor:pointer;color:#22d8f0;text-decoration:underline}'+
    '.ck .ck-row{display:flex;gap:8px;flex-wrap:wrap}'+
    '.ck .ck-b{all:unset;cursor:pointer;display:inline-flex;align-items:center;font:500 14px "Instrument Sans",system-ui,sans-serif;padding:9px 16px;border-radius:999px;'+
    'border:1px solid rgba(34,216,240,.35);background:rgba(6,12,24,.75);color:#eef3f7;transition:border-color .2s,box-shadow .2s}'+
    '.ck .ck-b:hover{border-color:#22d8f0;box-shadow:0 0 24px -6px #22d8f0}'+
    '.ck .ck-b.ck-y{background:linear-gradient(120deg,#22d8f0,#14e39a);color:#02121a;border-color:transparent;font-weight:600;box-shadow:0 0 30px -6px rgba(20,227,154,.7)}'+
    '.ck .ck-b:focus-visible,.ck .ck-more:focus-visible,.ck-open:focus-visible{outline:2px solid #22d8f0;outline-offset:2px}'+
    '.ck-open{all:unset;cursor:pointer;text-decoration:underline}'+
    '.ck-float{position:fixed;left:12px;bottom:10px;z-index:5;font:12px "IBM Plex Mono",monospace;color:#8d9bb0}'+
    '@media (max-width:600px){.ck{left:12px;right:12px;bottom:12px;max-width:none}}';

  var box, openLink;
  function render(){
    var t = TXT[lang()];
    if (box){
      box.querySelector('.ck-t').textContent = t.title;
      box.querySelector('.ck-body').textContent = t.body + ' ';
      box.querySelector('.ck-more').textContent = t.more;
      box.querySelector('.ck-det').textContent = t.details;
      box.querySelector('.ck-y').textContent = t.yes;
      box.querySelector('.ck-n').textContent = t.no;
      box.setAttribute('aria-label', t.title);
    }
    if (openLink) openLink.textContent = t.settings;
  }

  function build(){
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

    box = document.createElement('div');
    box.className = 'ck'; box.setAttribute('role','dialog'); box.hidden = true;
    box.innerHTML = '<div class="ck-t"></div><p><span class="ck-body"></span><button type="button" class="ck-more"></button></p>'+
      '<p class="ck-det" hidden></p><div class="ck-row"><button type="button" class="ck-b ck-y"></button><button type="button" class="ck-b ck-n"></button></div>';
    document.body.appendChild(box);
    box.querySelector('.ck-more').onclick = function(){ var d = box.querySelector('.ck-det'); d.hidden = !d.hidden; };
    box.querySelector('.ck-y').onclick = function(){ set('yes'); box.hidden = true; loadGA(); };
    box.querySelector('.ck-n').onclick = function(){
      var was = get() === 'yes'; set('no'); box.hidden = true;
      if (was || loaded){ clearGA(); location.reload(); }
    };

    // "Süti-beállítások" link a láblécbe (ha nincs lábléc, kis link a bal alsó sarokba)
    openLink = document.createElement('button');
    openLink.type = 'button'; openLink.className = 'ck-open';
    openLink.onclick = function(){ box.hidden = false; box.querySelector('.ck-y').focus(); };
    var spot = document.querySelector('footer span');
    if (spot){ spot.appendChild(document.createTextNode(' · ')); spot.appendChild(openLink); }
    else { openLink.classList.add('ck-float'); document.body.appendChild(openLink); }

    render();
    new MutationObserver(render).observe(document.documentElement, {attributes:true, attributeFilter:['data-lang','lang']});

    if (!get()) box.hidden = false;
  }

  if (get() === 'yes') loadGA();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();

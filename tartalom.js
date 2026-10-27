/* =========================================================
   TARTALOM – itt tudod hozzáadni a projekteket és az írásokat.
   Az oldal ebből a listából rajzolja ki a kártyákat – az angol oldal (en/) az "en",
   a magyar (hu/) a "hu" szövegeket használja. Ez a fájl közös a két nyelvnek.

   Szabályok, hogy ne romoljon el:
   - Minden szöveg idézőjelek "..." között van.
   - Minden { ... } blokk után vessző kell, ha jön még utána másik.
   - Ha a szövegben idézőjelet használnál, írd így: \"  (vagy használj „…” magyar idézőjelet)
   ========================================================= */


/* ---------------- PROJEKTEK ----------------
   Új projekt: másold le az egyik { ... } blokkot, és írd át.

   link      – hova vigyen a kártya (pl. "connectome.html" vagy "https://github.com/...")
   tag       – kis felirat a kártya tetején
   title     – cím angolul (en) és magyarul (hu)
   text      – 1–2 mondatos leírás
   linkText  – (nem kötelező) a link szövege
   image     – (nem kötelező) kép a kártyára, pl. "../kepek/projekt2.jpg" (a fő mappa kepek mappájába tedd)
   featured  – (nem kötelező) true = nagy, kiemelt kártya
   links     – (nem kötelező) több gomb a kártya alján, pl.
               links: [ { href: "a.html", text: { en: "…", hu: "…" } }, { href: "b.html", text: {…} } ]
               ilyenkor a „link” és a „linkText” nem kell
   embed     – (nem kötelező, csak kiemelt kártyánál) egy élő oldal beágyazva képként, pl. "connectome.html?embed"
*/
var PROJECTS = [

  {
    link: "connectome.html",
    tag: "Interactive · 3D · Kuramoto",
    featured: true,
    embed: "connectome.html?embed",
    title: {
      en: "Phase waves in the waking and psychedelic brain",
      hu: "Fázishullámok az éber és a pszichedelikus agyban"
    },
    text: {
      en: "A rotatable 3D brain network of 180 coupled oscillators. Switch between a waking and a psychedelic-like state and watch synchronised coalitions form and dissolve in real time.",
      hu: "Forgatható 3D agyhálózat 180 csatolt oszcillátorral. Válts éber és pszichedelikus-szerű állapot között, és nézd, ahogy a szinkron koalíciók valós időben születnek és szétesnek."
    },
    links: [
      { href: "connectome.html",         text: { en: "Open the visualisation →", hu: "Megnyitom a vizualizációt →" } },
      { href: "projekt-konnektom.html",  text: { en: "Read the write-up →",      hu: "A projekt leírása →" } }
    ]
  },

];


/* ---------------- ÍRÁSOK ----------------
   Új cikk: másold a _sablon/cikk-sablon-en.html fájlt az en/, a _sablon/cikk-sablon-hu.html
   fájlt a hu/ mappába, UGYANAZZAL az új névvel (pl. cikk-interocepcio.html), írd meg bennük
   a cikket, majd adj hozzá ide egy blokkot. A link csak a fájlnév (a nyelvi mappán belül marad).
*/
var POSTS = [

  {
    link: "cikk-konnektom.html",
    date: "2026",
    title: {
      en: "What is a connectome – and why does it matter?",
      hu: "Mi az a konnektom, és miért fontos?"
    }
  },

];

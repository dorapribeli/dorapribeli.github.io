/* =========================================================
   TARTALOM – itt tudod hozzáadni a projekteket és az írásokat.
   Az oldal ebből a listából rajzolja ki a kártyákat.

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
   image     – (nem kötelező) kép a kártyára, pl. "kepek/projekt2.jpg" (a kepek mappába tedd)
   featured  – (nem kötelező) true = nagy, kiemelt kártya
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
    linkText: { en: "Open the visualisation →", hu: "Megnyitom a vizualizációt →" }
  },

];


/* ---------------- ÍRÁSOK ----------------
   Új cikk: másold a _sablon/cikk-sablon.html fájlt a fő mappába új néven
   (pl. cikk-interocepcio.html), írd meg benne a cikket, majd adj hozzá ide egy blokkot.
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

# Dóra Pribeli – személyes weboldal

Kétnyelvű (EN/HU) oldal: bemutatkozás, kutatás, projektek, mozgásórák, írások és elérhetőség.
Egyszerű HTML/CSS/JavaScript, nem kell hozzá telepíteni semmit.

---

## 1. A mappa felépítése

```
weboldal/
├── index.html            ← a főoldal (bemutatkozás, kutatás, mozgás, kapcsolat)
├── tartalom.js           ← a PROJEKTEK és az ÍRÁSOK listája – ezt szerkeszted a legtöbbet
├── connectome.html       ← projekt: 3D fázishullám-konnektom
├── cikk-konnektom.html   ← írás: „Mi az a konnektom?”
├── assets/
│   ├── style.css         ← kinézet: színek, betűk, elrendezés
│   └── site.js           ← működés: nyelvváltó, háttér, kártyák (ehhez nem kell nyúlni)
├── _sablon/
│   └── cikk-sablon.html  ← üres minta új cikkhez vagy projektoldalhoz
└── README.md             ← ez a leírás
```

- **Minden, ami a fő mappában van, egy kattintható oldal.** A főoldalról minden kártya és link valódi oldalra vezet.
- Az **`_sablon`** mappa nem jelenik meg a weboldalon: a GitHub Pages kihagyja az aláhúzással (`_`) kezdődő mappákat.
- Ha képet szeretnél használni, hozz létre egy **`kepek`** mappát a fő mappában, és oda tedd a képeket.

---

## 2. Elindítás a saját gépeden

**A legegyszerűbb mód:** a Finderben kattints duplán az **`index.html`**-re. Megnyílik a böngésződben (Safari vagy Chrome), és minden működik: a menü, a nyelvváltó, a projektek és a cikkek is.

Ha módosítasz egy fájlt, mentsd el, és a böngészőben nyomj **Cmd + R**-t a frissítéshez.

### Szerkesztéshez ajánlott: Visual Studio Code

1. Töltsd le: https://code.visualstudio.com (ingyenes).
2. **File → Open Folder…**, és válaszd ki a `weboldal` mappát.
3. Bal oldalt kattints arra a fájlra, amit szerkeszteni szeretnél. Mentés: **Cmd + S**.
4. *(Nem kötelező)* Telepítsd a **Live Server** bővítményt: bal oldalt a négy kocka ikon, majd keresés: „Live Server”. Utána jobb klikk az `index.html`-en → **Open with Live Server**. Így a böngésző minden mentéskor magától frissül.

---

## 3. Feltöltés a GitHub Pagesre

### A) Első alkalommal, a böngészőből (nem kell hozzá semmit telepíteni)

1. Lépj be a https://github.com oldalra.
2. Jobb fent: **+ → New repository**.
   - **Repository name:** pontosan `FELHASZNALONEV.github.io` (a saját GitHub-felhasználóneveddel)
   - **Public**
   - Kattints a **Create repository** gombra.
3. Az üres repó oldalán kattints az **uploading an existing file** linkre (vagy: **Add file → Upload files**).
4. Nyisd meg a Finderben a `weboldal` mappát, jelöld ki **a teljes tartalmát** (Cmd + A), és húzd be a böngészőablakba.
   - Fontos, hogy a mappa **tartalmát** húzd be, ne magát a `weboldal` mappát. Az `index.html`-nek a repó legfelső szintjén kell lennie.
   - Az `assets` és a `_sablon` mappa is menjen fel; a GitHub megtartja a mappaszerkezetet.
5. Lent kattints a **Commit changes** gombra.
6. Menj a **Settings → Pages** menübe, és ellenőrizd:
   - **Source:** Deploy from a branch
   - **Branch:** `main`, mappa: `/ (root)` → **Save**
7. 1–2 perc múlva kész. Az **Actions** fülön zöld pipa jelzi. Az oldalad címe:

   **`https://FELHASZNALONEV.github.io`**

### B) Frissítés később

- **Böngészőből:** **Add file → Upload files**, húzd be a módosított fájl(oka)t, majd **Commit changes**. Az azonos nevű fájlt a GitHub felülírja.
  Ha egy almappában lévő fájlt módosítottál (pl. `assets/style.css`), előbb kattints be a repóban az `assets` mappába, és ott töltsd fel.
- **Kényelmesebben, GitHub Desktoppal** (ajánlott, ha sokat frissítesz):
  1. Töltsd le: https://desktop.github.com, és jelentkezz be.
  2. **File → Clone repository**, és válaszd a `FELHASZNALONEV.github.io` repót. Ez létrehoz a gépeden egy mappát.
  3. Ettől kezdve **ebben a mappában** szerkeszd az oldalt (másold bele egyszer a `weboldal` tartalmát).
  4. Szerkesztés után a GitHub Desktopban írj egy rövid üzenetet (pl. „új projekt”), majd kattints a **Commit to main**, végül a **Push origin** gombra.

### C) Saját domain (később)

Ha veszel egy domaint (pl. `valami.com`):
1. A repóban **Settings → Pages → Custom domain**: írd be a domaint, és kattints a **Save** gombra.
2. A domain-regisztrátornál állítsd be a GitHub által kért DNS-rekordokat (a GitHub leírja, melyeket).
3. Pipáld be az **Enforce HTTPS** opciót, amikor elérhetővé válik.

---

## 4. Szöveg átírása

Minden szöveg **kétszer** szerepel: angolul (`lang="en"`) és magyarul (`lang="hu"`). Az EN/HU gomb mindig csak az egyiket mutatja, ezért **mindkettőt** írd át:

```html
<h2 lang="en">From markets to minds</h2>
<h2 lang="hu">A piacoktól az elméig</h2>
```

Csak a `>` és a `<` közötti szöveget írd át. Keresés VS Code-ban: **Cmd + F**.

---

## 5. Új projekt hozzáadása

Nyisd meg a **`tartalom.js`**-t. A `PROJECTS` listában másold le a meglévő `{ … },` blokkot, és írd át:

```js
  {
    link: "https://github.com/FELHASZNALONEV/projekt",
    tag: "Python · EEG",
    title: {
      en: "EEG signatures of meditation",
      hu: "A meditáció EEG-mintázatai"
    },
    text: {
      en: "One or two sentences about the project.",
      hu: "Egy-két mondat a projektről."
    },
    image: "kepek/eeg.jpg"
  },
```

| Mező | Jelentés |
|---|---|
| `link` | Hova vigyen a kártya: saját aloldal (`projekt-eeg.html`), GitHub-repó, PDF (`kepek/poszter.pdf`) |
| `tag` | Kis felirat a kártya tetején |
| `title`, `text` | Cím és 1–2 mondatos leírás, angolul és magyarul |
| `image` | *(nem kötelező)* kép a `kepek` mappából |
| `featured: true` | *(nem kötelező)* nagy, kiemelt kártya |
| `linkText` | *(nem kötelező)* a link szövege |

A lista sorrendje egyben az oldalon látható sorrend is.

---

## 6. Új cikk vagy projektoldal

1. Másold a **`_sablon/cikk-sablon.html`**-t a **fő mappába**, új néven, pl. `cikk-interocepcio.html`.
   **A fájlnévben ne legyen ékezet és szóköz!**
2. Írd át benne:
   - a `<body data-title-en="…" data-title-hu="…">` sorban a böngészőfül címét,
   - az `ANGOL VÁLTOZAT` és a `MAGYAR VÁLTOZAT` részt.
3. A `tartalom.js` **`POSTS`** listájába adj hozzá egy blokkot:

```js
  {
    link: "cikk-interocepcio.html",
    date: "2026. november",
    title: {
      en: "Interoception: how the brain listens to the body",
      hu: "Interocepció: hogyan figyel az agy a testre?"
    }
  },
```

Projektoldalnál ugyanígy járj el, csak a `PROJECTS` listához add hozzá, és `link`-nek a saját fájl nevét írd be.

**Elemek, amiket a cikkben használhatsz:**

| Mit | Kód |
|---|---|
| Bekezdés | `<p>Szöveg</p>` |
| Alcím | `<h2>Alcím</h2>` |
| Félkövér / dőlt | `<strong>…</strong>` / `<em>…</em>` |
| Link | `<a href="https://…">szöveg</a>` |
| Kiemelt idézet | `<blockquote>…</blockquote>` |
| Kép | `<figure><img src="kepek/kep.jpg" alt="leírás"><figcaption>Képaláírás</figcaption></figure>` |
| Felsorolás | `<ul><li>első</li><li>második</li></ul>` |
| Kiemelt doboz | `<div class="panel">…</div>` |

---

## 7. Fotó, elérhetőségek, színek

**Fotó a bemutatkozóhoz:** tedd a képet a `kepek` mappába (pl. `foto.jpg`). Az `index.html`-ben keresd meg a `From markets to minds` címet, és az angol és a magyar cím **alá** szúrd be ezt a sort:

```html
<img src="kepek/foto.jpg" alt="Dóra Pribeli" style="border-radius:20px;max-width:320px;margin-bottom:8px">
```

**Instagram vagy LinkedIn:** az `index.html`-ben keresd meg ezt: `Később ide jöhet`. Ott vannak a kész gombok egy megjegyzésben. Írd be a felhasználóneved, majd töröld a `<!--` és a `-->` jelet a gombok elől és mögül.

**Színek:** az `assets/style.css` elején, a `:root { … }` részben:
- `--wake`: cián
- `--psy`: smaragdzöld
- `--lime`: savzöld
- `--violet`: indigó
- `--bg`, `--bg2`: háttér

A háttérben lévő páfrányok színei az `assets/site.js`-ben vannak (keresd: `var C=`).

---

## 8. Ha valami elromlik

- **Eltűntek a kártyák?** Valószínűleg hiányzik egy **vessző** a `}` után, vagy egy **idézőjel** a `tartalom.js`-ben.
  A hiba helyét így találod meg: a böngészőben **jobb klikk → Vizsgálat (Inspect) → Console**. A piros sor megmutatja a hibás sort.
- **Idézőjel a szövegben:** a `"` helyett használd a magyar `„…”` jeleket.
- **Visszavonás:** VS Code-ban **Cmd + Z**. A GitHubon minden korábbi változat megmarad (a repóban a **History** alatt).
- Nagyobb átalakítás előtt készíts másolatot a fájlról.

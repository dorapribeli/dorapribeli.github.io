# Dóra Pribeli – személyes weboldal

Kétnyelvű (EN/HU) oldal: bemutatkozás, kutatás, projektek, mozgásórák, írások és elérhetőség.
Egyszerű HTML/CSS/JavaScript, nem kell hozzá telepíteni semmit.

| | |
|---|---|
| **Élő oldal** | https://dorapribeli.github.io |
| **GitHub-repó** | https://github.com/dorapribeli/dorapribeli.github.io |
| **Mappa a gépeden** | `Documents/weboldal` |

A `Documents/weboldal` mappa össze van kötve a GitHub-repóval: amit itt módosítasz, azt egy feltöltéssel (lásd 3. pont) élesíted.

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
2. **File → Open Folder…**, és válaszd ki a `Documents/weboldal` mappát.
3. Bal oldalt kattints arra a fájlra, amit szerkeszteni szeretnél. Mentés: **Cmd + S**.
4. *(Nem kötelező)* Telepítsd a **Live Server** bővítményt: bal oldalt a négy kocka ikon, majd keresés: „Live Server”. Utána jobb klikk az `index.html`-en → **Open with Live Server**. Így a böngésző minden mentéskor magától frissül.

---

## 3. Változtatások feltöltése a GitHub Pagesre

Az oldal már fent van a **https://dorapribeli.github.io** címen, a GitHub Pages be van kapcsolva (`main` branch, `/ (root)`).
Ha módosítasz valamit, azt az alábbi módok egyikével töltöd fel. **1–2 perc múlva** frissül az élő oldal. Ha nem látod a változást, nyomj **Cmd + Shift + R**-t a böngészőben.

### A) Terminálból (3 parancs)

Nyisd meg a **Terminal** alkalmazást, és írd be:

```bash
cd ~/Documents/weboldal
git add -A
git commit -m "Új projekt: EEG"
git push
```

Az idézőjelek közé egy rövid leírást írj arról, mit változtattál. A fiókod már be van jelentkezve ezen a gépen, így jelszót nem kér.

Ha előtte meg akarod nézni, mit változtattál: `git status` (melyik fájlok) vagy `git diff` (pontosan mi; kilépés: `q`).

### B) GitHub Desktoppal (gombokkal)

1. Töltsd le: https://desktop.github.com, és jelentkezz be a `dorapribeli` fiókkal.
2. **File → Add local repository…**, és válaszd ki a `Documents/weboldal` mappát.
3. Ettől kezdve a változtatásaid bal oldalt megjelennek. Írj lent egy rövid üzenetet, majd kattints a **Commit to main**, végül a **Push origin** gombra.

### C) Böngészőből

A https://github.com/dorapribeli/dorapribeli.github.io oldalon: **Add file → Upload files**, húzd be a módosított fájlt, majd **Commit changes**. Almappában lévő fájlnál (pl. `assets/style.css`) előbb lépj be a repóban abba a mappába.

> Ha a böngészőből töltesz fel, a gépeden lévő mappa nem tud róla. A következő terminálos feltöltés előtt ezért futtasd: `git pull`.

### Saját domain (később)

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
    link: "https://github.com/dorapribeli/projekt",
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

- **Feltöltés után másnál még a régi kinézet látszik?** A böngészők 10 percig a régi `style.css` és `site.js` fájlt használhatják. Ha ezeket vagy a `tartalom.js`-t módosítod, a HTML-fájlokban (`index.html`, `cikk-*.html`) írd át a `?v=…` számot eggyel nagyobbra (pl. `?v=3` → `?v=4`). Így mindenki azonnal az újat kapja.

- **Eltűntek a kártyák?** Valószínűleg hiányzik egy **vessző** a `}` után, vagy egy **idézőjel** a `tartalom.js`-ben.
  A hiba helyét így találod meg: a böngészőben **jobb klikk → Vizsgálat (Inspect) → Console**. A piros sor megmutatja a hibás sort.
- **Idézőjel a szövegben:** a `"` helyett használd a magyar `„…”` jeleket.
- **Visszavonás:** VS Code-ban **Cmd + Z**. A GitHubon minden korábbi változat megmarad (a repóban a **History** alatt).
- Nagyobb átalakítás előtt készíts másolatot a fájlról.

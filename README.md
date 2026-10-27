# Dóra Pribeli – személyes weboldal

Kétnyelvű (EN/HU) oldal: bemutatkozás, kutatás, projektek, mozgásórák, írások és elérhetőség.
Egyszerű HTML/CSS/JavaScript, nem kell hozzá telepíteni semmit.

| | |
|---|---|
| **Élő oldal** | https://dorapribeli.github.io |
| **GitHub-repó** | https://github.com/dorapribeli/dorapribeli.github.io |


## 1. A mappa felépítése

```
weboldal/
├── index.html            ← csak átirányít az angol főoldalra (en/) – a Search Console-címke miatt NE töröld
├── en/                   ← ANGOL oldalak
│   ├── index.html            ← főoldal (bemutatkozás, kutatás, mozgás, kapcsolat)
│   ├── connectome.html       ← projekt: 3D fázishullám-konnektom
│   ├── cikk-konnektom.html   ← írás: „What is a connectome?”
│   └── projekt-konnektom.html ← projektleírás (képletek, eredmények, grafikon)
├── hu/                   ← MAGYAR oldalak – ugyanazokkal a fájlnevekkel, mint az en/ mappában
├── tartalom.js           ← a PROJEKTEK és az ÍRÁSOK listája (mindkét nyelv) – ezt szerkeszted a legtöbbet
├── projekt-konnektom.html, cikk-konnektom.html, connectome.html
│                         ← régi címek: átirányítanak az en/ változatra (a régi linkek miatt maradnak)
├── assets/
│   ├── style.css         ← kinézet: színek, betűk, elrendezés
│   ├── site.js           ← működés: nyelvváltó, háttér, kártyák (ehhez nem kell nyúlni)
│   ├── connectome.css/js ← a konnektom-szimuláció közös kódja (az en/ és a hu/ oldal is ezt használja)
│   └── cookie.js         ← süti-banner + Google Analytics
├── _sablon/
│   ├── cikk-sablon-en.html  ← üres angol minta új cikkhez (az en/ mappába másold)
│   └── cikk-sablon-hu.html  ← üres magyar minta (a hu/ mappába, ugyanazzal a névvel)
└── README.md             ← ez a leírás
```

**Két nyelv, két külön oldal:** az angol szöveg az `en/`, a magyar a `hu/` mappában van.
Ha valamit mindkét nyelven módosítasz (menü, lábléc, script-verzió), **mindkét fájlban** írd át.
Az EN/HU gomb a másik mappa azonos nevű fájljára visz, ezért egy oldal két változata mindig ugyanazt a nevet kapja.


# Kasia — portfolio graficzne

Odzyskana strona portfolio graficznego Kasi z autorską talią 54 kart, ilustracjami, identyfikacją wizualną i projektami do druku.

## Uruchomienie lokalne

```sh
python3 -m http.server 8000 --directory dist
```

Otwórz http://localhost:8000. Strona używa `fetch` do ładowania `data.json`, więc wymaga serwera HTTP. Nie wymaga instalacji zależności ani kompilacji.

## Pliki

- `dist/index.html`, `style.css`, `app.js` — strona i interakcje.
- `dist/data.json` — katalog projektów.
- `dist/assets/` — grafiki i mockupy WebP.
- `vercel.json` — konfiguracja publikacji katalogu `dist` na Vercel.

Prace i oznaczenia pochodzą z zachowanego eksportu portfolio; mockupy AI pozostają opisane w danych projektu.

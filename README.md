# Webbshop

En React-baserad webbshop byggd med Vite, som hämtar produktdata från DummyJSON API.

## Funktioner
- Produktlista med sökning och debounce
- Produktsidor med detaljerad information
- Kundvagn med borttagning och totalpris
- Kassa med orderbekräftelse
- Responsiv navbar med kategorifiltrering

## Teknik
- React
- React Router
- Vite
- DummyJSON API

## Installation och start
Kräver [Node.js](https://nodejs.org) (v18 eller senare).

1. Klona repot
2. Kör `npm install`
3. Kör `npm run dev`
4. Öppna `http://localhost:5173`

## Debounce
Debounce används i sökfunktionen för att undvika onödiga API-anrop vid varje tangenttryckning. Istället väntar den tills användaren slutat skriva.

## Felhantering
Try/catch används i useEffect för att fånga nätverksfel vid API-anrop.
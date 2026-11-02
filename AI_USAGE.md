# Mākslīgā intelekta izmantošana

**Vārds, uzvārds:** Aleksejs Škeļs  
**Izmantotais(-ie) MI rīks(-i):** Qwen AI

## Kam es izmantoju mākslīgo intelektu?

Galvenokārt izmantoju AI kā "konsultantu" — lai pārbaudītu savus risinājumus un saprastu, kā pareizi konfigurēt TypeScript stingro režīmu.

## Kuru kodu vai konfigurāciju būtiskā apjomā ģenerēja mākslīgais intelekts?

- Palīdzēja saprast `verbatimModuleSyntax` kļūdu un pareizo `import type` sintaksi
- Ieteica struktūru failiem (`types.ts`, `data.ts`, `render.ts`) — bet saturu rakstīju pats
- Parādīja, kā pareizi apstrādāt `localStorage` ar `try/catch`

## Kuru kodu vai konfigurāciju es uzrakstīju pats/pati vai būtiski pārveidoju?

- Viss HTML un Tailwind CSS — pārnests no 1. nedēļas un pielāgots
- Renderēšanas funkcijas (`render.ts`) — rakstīju pats, izmantojot `createElement` un `textContent`
- Formas validācijas loģika — pats pārbaudīju visus nosacījumus
- Filtru un navigācijas darbība — pārrakstīju no 1. nedēļas JS uz TypeScript
- Git commit vēsture — veidoju pats

## Viens MI ieteikums, kuru es noraidīju vai izmainīju

AI ieteica izmantot `innerHTML` ātrākai renderēšanai, bet es atteicos, jo uzdevumā bija prasība par drošību — izmantot `textContent`, lai novērstu XSS.

## Viena lieta, kuru es pārbaudīju pats/pati, nevis vienkārši uzticējos MI atbildei

Es manuāli pārbaudīju, ka ievadot `<b>test</b>` projekta nosaukumā, tas parādās kā teksts, nevis trekns. Vēl pārbaudīju `localStorage` — ierakstīju tur murgu un pārlādēju lapu, lai pārliecinātos, ka tā nesalūzt.
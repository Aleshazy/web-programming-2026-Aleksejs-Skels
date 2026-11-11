# Mākslīgā intelekta izmantošana

**Vārds, uzvārds:** Aleksejs Skels  
**Izmantotais(-ie) MI rīks(-i):** Qwen AI

## Kam es izmantoju mākslīgo intelektu?
Izmantoju AI, lai pareizi strukturētu LoadState<T> tipu un izveidotu drošas type guard funkcijas (isProject, isDeadline) API datu validācijai.

## Kuru kodu vai konfigurāciju būtiskā apjomā ģenerēja mākslīgais intelekts?
- Palīdzēja uzrakstīt getJson funkciju ar pareizu unknown tipa izmantošanu un 
esponse.ok pārbaudi.
- Ieteica struktūru FetchWeather funkcijai, lai pareizi mapotu Open-Meteo atbildi uz CurrentWeather interfeisu.

## Kuru kodu vai konfigurāciju es uzrakstīju pats/pati vai būtiski pārveidoju?
- Visu 
ender.ts loģiku, kas apstrādā loading, error un empty stāvokļus ar pareiziem ARIA atribūtiem.
- Formas validācijas loģiku un localStorage apstrādi.

## Viens MI ieteikums, kuru es noraidīju vai izmainīju
AI ieteica izmantot data as Project[] pēc JSON.parse, bet es noraidīju šo ieteikumu, jo uzdevuma noteikumi aizliedz as API datiem. Tā vietā es izmantoju type guard funkcijas, kas reāli pārbauda datus.

## Viena lieta, kuru es pārbaudīju pats/pati, nevis vienkārši uzticējos MI atbildei
Es manuāli pārbaudīju DevTools, bloķējot projects.json pieprasījumu. Pārliecinājos, ka lapa nerādās tukša, bet gan parāda kļūdas ziņojumu ar "Try again" pogu, kamēr pārējās sadaļas (piemēram, laikapstākļi) turpina strādāt.

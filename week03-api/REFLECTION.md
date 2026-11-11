# Individuālā refleksija

## 1. Kad fetch nemet kļūdu?
fetch nemet kļūdu, ja serveris atbild ar HTTP statusu 404 vai 500, jo tas uzskata šādas atbildes par "veiksmīgi saņemtām". Problēma ir tā, ka mēs mēģināsim parsēt HTML kļūdas lapu kā JSON, kas izraisīs kļūdu. Manā kodā to apstrādā rinda: if (!response.ok) { throw new Error(...) } failā api.ts.

## 2. any un unknown

esponse.json() atgriež Promise<any>, kas ir bīstami, jo TypeScript pārtrauc pārbaudīt tipus, un kļūdas var parādīties tikai izpildes laikā. Izmantojot const data: unknown, mēs piespiežam TypeScript pieprasīt tipu pārbaudi. Atšķirība no as Project[] ir tā, ka as tikai "apmāna" kompilatoru, bet type guard funkcija (isProject) reāli pārbauda, vai dati atbilst struktūrai.

## 3. Sveša API dati
Mēs pārveidojām Open-Meteo atbildi savā CurrentWeather tipā, lai izolētu mūsu lietotni no ārējā API iekšējās struktūras. Ja Open-Meteo rīt pārdēvē lauku 	emperature_2m uz 	emp, mums būs jāizmaina tikai viena rinda mapošanas funkcijā api.ts, nevis jāmeklē šis lauks visā lietotnes kodā.

## 4. Lietotāja skatījums
Es veicu pārbaudi DevTools, bloķējot projects.json pieprasījumu (Block request URL). Pirms stāvokļu pievienošanas lapa vienkārši salūztu vai rādītu tukšu ekrānu. Tagad lietotājs redz skaidru kļūdas ziņojumu ar "Try again" pogu, un pārējās sadaļas (termiņi, laikapstākļi) turpina normāli darboties.

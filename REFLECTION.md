# Individuālā refleksija

## 1. Ko deva tipi?
JavaScript ir dinamisks, un kļūdas parādās tikai izpildes laikā. TypeScript pievieno statisko tipu pārbaudi, kas kļūdas parāda jau kompilācijas brīdī. Šī darba laikā TypeScript man parādīja kļūdu TS1484, kad mēģināju importēt interfeisus parastajā veidā. Tā kā bija ieslēgts erbatimModuleSyntax, tas pieprasīja izmantot import type, ko es arī izlaboju.

## 2. 
ull un querySelector
TypeScript uzskata, ka querySelector var atgriezt 
ull, jo elements var nebūt DOM koka daļā vai tam var būt nepareizs ID. Savā kodā es to apstrādāju ar vienkāršu if (form) pārbaudi pirms notikumu klausītāja pievienošanas, lai izvairītos no 
ull kļūdām.

## 3. Dati no ārpuses
JSON.parse rezultātam nevar uzticēties, jo lietotājs var manuāli izmainīt localStorage datus, un tie vairs neatbildīs paredzētajai struktūrai. Tāpēc es izmantoju 	ry/catch. innerHTML ir bīstams, jo tas var izpildīt ļaunprātīgus skriptus (XSS uzbrukumi). 	extContent ir drošs, jo tas attēlo tekstu tieši tādu, kāds tas ir.

## 4. Jūsu vērtējums
TypeScript ir lieks maziem, vienkāršiem skriptiem vai ātriem prototipiem, kur tipu aprakstīšana aizņem vairāk laika nekā pats kods. Bet bez tā būtu grūti iztikt lielos projektos ar sarežģītiem datiem un formām, kur tipi palīdz saprast struktūru un novērš kļūdas pirms koda palaišanas.
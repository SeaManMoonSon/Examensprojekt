# Examensprojekt

## Översiktlig beskrivning
Den här applikationen ska användas i matsalen på Glimåkra Folkhögskola, för att ersätta matkupongerna. Tanken är att besökarna i matsalen ska kunna skriva in sig redan i kön för att på så sätt notera sin närvaro och betalning. Kökspersonalen ska kunna se vilka som har betalat, eller ska betala, för dagens mat.

## Tekniker och programspråk
- MongoDB
- Express
- React
- Node.js

## Samarbeten
Simon Månsson och Veronica Selenwall ska arbeta tillsammans i grupp med detta projekt, i nära samarbete med Glimåkra Folkhögskola. Simon kommer att fokusera på backend och Veronica på frontend. Vi kommer samarbeta och hjälpa varandra med alla delar av projektet.

## Kravspecifikation
### En användare ska kunna:
- Logga in med sitt personnummer och fyrsiffriga kod.
   - Den fyrsiffriga koden kommer besökarna att få välja på egen hand, utanför applikationen och fungera som ett lösenord
- Välja i en meny vad som önskas att köpa.
   - Efter val ska ett fönster visas där man ser pris och bekräftar sitt val. Därefter ska användaren tackas för sin beställning för att sedan loggas ut.

### En admin/kökspersonal ska kunna:
- Se vilka som betalat/registrerat sitt köp i en lista som uppdateras.
   - Namn, val och totalbelopp ska visas i det läget.
- Snabbt kunna söka upp användare för att assistera med saldo-korrigering och användarhistorik.
- Se, lägga till, redigera, och ta bort produkter på ett enkelt sätt.
   - Välja om produkten i fråga är för deltagare, personal eller alla. Detta påverkar vyn för de olika rollerna (t.ex. personalfika). 
- Med ett knapptryck kunna få datan på inköp som en fil för bokföring. 

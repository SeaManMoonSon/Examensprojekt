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
- Snabbt kunna få en överblick över användare för att assistera med saldo-korrigering och användarhistorik.
- Se, lägga till, redigera, och ta bort produkter på ett enkelt sätt.
   - Välja om produkten i fråga är för deltagare, personal eller alla. Detta påverkar vyn för de olika rollerna (t.ex. personalfika). 
- Med ett knapptryck kunna få datan på inköp som en fil för bokföring. 


### Extra
- Implementera Swish för betalning.
- Kunna betygsätta maten på vägen ut ur matsalen.

# GlimGrub

## Grundläggande steg i VSC(Visual Studio Code) innan du kan få igång applikationen
* Öppna VSC och skapa/välj en tom plats för projektet. Öppna en ny terminal i VSC och klona git-repot genom
att skriva <i>git clone github-repo-länk</i> och tryck enter.


* Navigera till rätt nivå i det nu klonade projektet genom att skriva följande i terminalen:
	* <i>cd Examensprojekt</i>, tryck enter.
	* <i>git checkout development</i>, tryck enter.
	* <i>cd GlimGrub</i>, tryck enter.

Du står nu på rätt ställe i projektet för att kunna fortsätta!

* Nu behöver du hämta och installera alla nödvändiga dependencies för att kunna köra applikationen. Detta görs genom att skriva följande i terminalen:
	* <i>cd client</i>, tryck enter.
	* <i>npm i</i>, tryck enter. 
	* <i>cd ..</i>, tryck enter.
	* <i>cd server</i>, tryck enter.
	* <i>npm i</i>, tryck enter.

Nu har du hämtat och installerat alla dependencies som krävs för applikationen!

* Skapa en ny fil i mappen GlimGrub i projektet och döp den till ".env". Här kommer så småningom alla hemligheter hamna!

## Skapa och sätt upp en databas för projektet.
### För att kunna använda applikationen behövs en databas. Följ länken https://www.mongodb.com för att komma till rätt ställe för detta. Följ sedan dessa steg:
* Skapa ett atlas-konto om du inte redan har ett genom att klicka på <i>Try Free</i> i högra hörnet på sidan.
* När du har skapat ett konto klickar du på <i>Projects</i> och sen <i>New Project</i> uppe till höger. Loggade du in med ett befintligt konto kan du bara skapa ett nytt projekt som vanligt.
* På sidan efter kan du bara gå vidare genom att välja <i>Create Project.</i>
* På följande sida borde du ha en stor grön knapp i mitten av skärmen som säger <i>Create</i>, klicka på den.
* För detta projektet räcker det gott och väl med gratisalternativet <i>M0</i>. Välj en som passar dig.
* Välj region efter preferens och namnge ditt cluster till vad du vill. Fortsätt genom att välja <i>Create</i>
* På följande sida kommer du ha olika alternativ. 
	* På den första väljer du <i>Username and Password</i> och skapar ett användarnamn och ett lösenord. Se till att komma ihåg ditt lösenord, skriv ner det! Klicka <i>Create User.</i>
	* På det andra alternativet väljer du <i>My Local Enviroment</i> och lägger till din IP-adress. Gå vidare genom att klicka <i>Finish and Close.</i>
* Klicka på ditt nya cluster och välj <i>CONNECT.</i>
* Välj <i>Drivers</i> under alternativet <i>Connect to your application.</i>
* Titta nu noga på punkt 3, där den säger vad du ska göra med din connection string. Denna sträng är din nyckel, var rädd om den. Kopiera och spara den!
* Stäng ner fönstret efter att du har noterat punkt 3 och kopierat din nyckel genom att klicka på <i>Close.</i> 

## Tillbaka till VSC
Nu behöver du skriva några saker i .env-filen du skapade tidigare. Skriv följande:
* PORT=4000
* SECRET=(skriv ett valfritt lösenord)
* MONGODB_URI="(KLISTRA IN DIN CONNECTION STRING HÄR! Var noga med att du följde stegen för vad du skulle göra med den i punkt 3 tidigare)"

Alla förberedelser är nu klara! För att nu testa att allt funkade och för att få igång applikationen behöver du återigen använda terminalen i VSC. 

* För enkelhetens skull så kan du öppna en ny terminal och skriva följande:
	* <i>cd Examensprojekt</i>, tryck enter.
	* <i>cd GlimGrub</i>, tryck enter.
	* <i>cd server</i>, tryck enter.
	* <i>npm run start</i>, tryck enter.

Om texten <i>Connected to database, Server started on port: 4000</i> nu dök upp i terminalen så funkade det!

* Öppna en ny terminal en sista gång och skriv följande:
   * <i>cd Examensprojekt</i>, tryck enter.
	* <i>cd GlimGrub</i>, tryck enter.
	* <i>cd client</i>, tryck enter.
	* <i>npm run start</i>, tryck enter.

Om allt nu funkade som det skulle så kommer nu applikation att öppnas i ett nytt fönster i din webbläsare. Hurra!
Om den inte öppnades automatiskt så kan du prova att öppna din webbläsare och gå till <i>localhost:3000.</i> 
Funkar det fortfarande inte så har något längs vägen blivit fel. Testa i så fall att göra om stegen eller kontakta mig så löser vi det ihop!

## OBSERVERA INNAN ANVÄNDNING(20/9-23)
### Denna applikationen kräver att användare skapas på databasnivå, då möjligheten att skapa nya användare inte ska kunna gå att utnyttja. I framtiden kanske det blir aktuellt att lägga till den funktionaliteten som admin i admin-läget, men så är alltså inte fallet i nuläget. Såhär skapar du användare på databasnivå:
   * Navigera till dina collections i ditt cluster som du skapat tidigare.
   * Välj <i>users</i> från menyn till vänster och klicka sedan <i>INSERT DOCUMENT</i> uppe till höger.
   * Rad 1, _id, ska du lämna som den är
   * Rad 2 ska se ut såhär: <i>name : Förnamn Efternamn</i> med typen <i>String</i>
   * Rad 3 ska se ut såhär: <i>ssn : Personnummer</i> med typen <i>String</i>
   * Rad 4 ska se ut såhär: <i>role : deltagare|personal|admin</i> med typen <i>String</i>
   * Rad 5 ska se ut såhär: <i>password : 0000</i> med typen <i>String</i>
   * Rad 6 ska se ut såhär: <i>balance : 0</i> med typen <i>String</i>
   * Klicka sedan den gröna knappen <i>Insert</i> för att slutföra.

### I nuläget kräver applikationen i admin-läget att det finns en "timestamp" i databasen, under collection "timestamps". Följ stegen för att skapa en sådan:
   * Navigera till dina collections i ditt cluster som du skapat tidigare.
   * Välj <i>timestamps</i> från menyn till vänster och klicka sedan <i>INSERT DOCUMENT</i> uppe till höger.
   * Rad 1, _id, ska du lämna som den är
   * Rad 2 ska se ut såhär: <i>timestamp : 0</i> med typen <i>String</i>
   * Klicka sedan den gröna knappen <i>Insert</i> för att slutföra.


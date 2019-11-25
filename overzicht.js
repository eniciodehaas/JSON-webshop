// zet maand woord op in nummer
// waarbij januari 0 geeft
// en december 11
const geefMaandNummer = (maand) => {
    let nummer;
    switch (maand) {
        case "januari":       nummer = 0; break;
        case "februari":      nummer = 1; break;
        case "maart":         nummer = 2; break;
        case "april":         nummer = 3; break;
        case "mei":           nummer = 4; break;
        case "juni":          nummer = 5; break;
        case "juli":          nummer = 6; break;
        case "augustus":      nummer = 7; break;
        case "september":     nummer = 8; break;
        case "oktober":       nummer = 9; break;
        case "november":      nummer = 10; break;
        case "december":      nummer = 11; break;
        default:              nummer = 0;
    }
    return nummer;
}


// maak functie die de text goed laat weergeven
const keerTekstOm = (string) => {
    if (string.indexOf(',') != -1) {
        let array = string.split(',');
        string = array[1] + ' ' + array[0];
    }
    return string;
}


// maak object voor de winkelwagen
// bevat toegevoegde items
// method om data op te halen uit local storage
// method om items te verwijderen
// method om items uit te voeren
// method om de totale prijs te berekenen
let winkelwagen = {
    items: [],

    halItemsOp: function() {
        let bestelling;
        if (localStorage.getItem('totaleBestelling') == null) {
            bestelling = [];
        } else {
            bestelling = JSON.parse(localStorage.getItem('totaleBestelling'));
            document.querySelector('.winkelwagen__aantal').innerHTML = bestelling.length;
        }
        bestelling.forEach( item => {
            this.items.push(item);
        })
        return bestelling;
    },

    // verwijder het item dat gelijk is aan de ean van het boek
    verwijderItem: function(ean) {
        this.items.forEach((item, index) => {
            if (item.ean == ean) {
                this.items.splice(index,1);
                ean = 1;
            }
        })
        localStorage.setItem('totaleBestelling', JSON.stringify(this.items));
        if (this.items.length > 0) {
            document.querySelector('.winkelwagen__aantal').innerHTML = this.items.length;
        } else {
            document.querySelector('.winkelwagen__aantal').innerHTML = null;
        }
        this.uitvoeren();
    },

    totaalPrijsBerekenen: function() {
        let totaal = 0;
        this.items.forEach( boek => {
            totaal += boek.prijs;
        });
        return totaal;
    },

    uitvoeren: function() {
        // uitvoer leegmaken
        document.getElementById('uitvoerBestelpagina').innerHTML = "";

        this.items.forEach( boek => {

            let boekSectie = document.createElement('section');
            boekSectie.className = 'besteld-boek';

            // afbeelding cover maken
            let cover = document.createElement('img');
            cover.className = 'besteld-boek__cover';
            cover.setAttribute('src', boek.cover);
            cover.setAttribute('alt', keerTekstOm(boek.titel));

            // titel van boek maken
            let boekTitel = document.createElement('h3');
            boekTitel.className = 'besteld-boek__titel';
            boekTitel.textContent = keerTekstOm(boek.titel);

            // prijs van boek maken
            let boekPrijs = document.createElement('div');
            boekPrijs.className = 'besteld-boek__prijs';
            boekPrijs.textContent = boek.prijs.toLocaleString('nl-NL', {currency: 'EUR', style: 'currency'});

            // verwijderknop maken
            let verwijderKnop = document.createElement('div');
            verwijderKnop.className = 'besteld-boek__verwijder';
            verwijderKnop.addEventListener('click', () => {
                this.verwijderItem(boek.ean);
            })

            // elementen toevoegen
            boekSectie.appendChild(cover);
            boekSectie.appendChild(boekTitel);
            boekSectie.appendChild(boekPrijs);
            boekSectie.appendChild(verwijderKnop);
            document.getElementById('uitvoerBestelpagina').appendChild(boekSectie);

        });
        // totaalprijs toevoegen
        let boekSectie = document.createElement('section');
        boekSectie.className = 'besteld-boek';

        // text voor de totale prijs
        let totaalTekst = document.createElement('div');
        totaalTekst.className = 'besteld-boek__totaal-tekst';
        totaalTekst.innerHTML = 'Totaal: ' 

        // prijs voor totale prijs
        let totaalPrijs = document.createElement('div');
        totaalPrijs.className = 'besteld-boek__totaal-prijs';
        totaalPrijs.textContent = this.totaalPrijsBerekenen().toLocaleString('nl-NL', {currency: 'EUR', style: 'currency'});

        boekSectie.appendChild(totaalTekst);
        boekSectie.appendChild(totaalPrijs);
        document.getElementById('uitvoerBestelpagina').appendChild(boekSectie);

    }
}

winkelwagen.halItemsOp();
winkelwagen.uitvoeren();

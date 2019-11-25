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
// method om items toe te voegen
// method om data op te halen uit local storage
// method om items te verwijderen
// method om items uit te voeren
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

            // elementen toevoegen
            boekSectie.appendChild(cover);
            boekSectie.appendChild(boekTitel);
            boekSectie.appendChild(boekPrijs);
            boekSectie.appendChild(verwijderKnop);
            document.getElementById('uitvoerBestelpagina').appendChild(boekSectie);

        });

    }
}

winkelwagen.halItemsOp();
winkelwagen.uitvoeren();

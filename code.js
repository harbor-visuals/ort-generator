let generateButton = document.querySelector('.generateButton')

generateButton.addEventListener('click', async () => {
    try {
        // JSON-Datei laden
        const response = await fetch('source/swiss_towns.json');
        const places = await response.json(); // Die Datei enthält ein Array von Orten
        
        // Zufälligen Ort auswählen
        const randomPlace = places[Math.floor(Math.random() * places.length)];
        randomPlacePLZ = randomPlace.PLZ;

        try {
            const response2 = await fetch(`https://api.zippopotam.us/ch/${randomPlacePLZ}`);
            const placeInfo = await response2.json();
            console.log(placeInfo);
            
            let longitude = placeInfo.places[0].longitude;
            let latitude = placeInfo.places[0].latitude;
            
            console.log(longitude)
            console.log(latitude)
            

            // let iframe = `<iframe width="425" height="350" src="https://www.openstreetmap.org/export/embed.html?bbox=${longitude}%2C${latitude}%2C${longitude}%2C${latitude}&amp;layer=mapnik" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/#map=13/${latitude}/${longitude}">Größere Karte anzeigen</a></small>`
            // let iframe = `<iframe width="425" height="350" src="https://www.openstreetmap.org/export/embed.html?bbox=${longitude}%2C${latitude}%2C${longitude}%2C${latitude}&amp;layer=mapnik&amp;marker=${latitude}%2C${longitude}" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/?mlat=${latitude}&amp;mlon=${longitude}#map=13/${latitude}/${longitude}">Größere Karte anzeigen</a></small>`
            let iframe = `<iframe width="425" height="350" src="https://www.openstreetmap.org/export/embed.html?bbox=5.674438476562501%2C45.583289756006316%2C10.772094726562502%2C48.03034580796616&amp;layer=mapnik&amp;marker=${latitude}%2C${longitude}" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/?mlat=${latitude}&amp;mlon=${longitude}#map=13/${latitude}/${longitude}">Größere Karte anzeigen</a></small>`

            map = document.querySelector('.map');
            map.innerHTML = '';
            map.innerHTML = iframe;

        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }

        // Ergebnis anzeigen
        document.querySelector('.info').innerHTML = `
            <h2>${randomPlace.Ortschaftsname}</h2>
            <p>Postleitzahl: ${randomPlace.PLZ}</p>
            <p>Gemeinde: ${randomPlace.Gemeindename}</p>
            <p>Kanton: ${randomPlace.Kantonskürzel}</p>
            <p>Sprache: ${randomPlace.Sprache}</p>
        `;
        
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        document.querySelector('.result').innerHTML = '<p>Es gab einen Fehler beim Abrufen der Daten.</p>';
    }
});
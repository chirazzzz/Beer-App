// variables
const urlBase = "https://api.punkapi.com/v2/beers";
const beersDiv = document.querySelector('.beers')

/* Create an async function called "getBeers" that uses fetch to get our beer data from the urlBase.
Render each beer name inside the div with the class of beers that currently exists in the HTML file. */

async function getBeers() {
    // fetch
    const beerPromise = await fetch(urlBase)
    const beers = await beerPromise.json()
    console.log(beers)
    let beerHtml = ""
    beers.forEach(beer => {
        beerHtml += `
            <div class="beer-wrapper card">
                <div class="beer">
                    <img class="beer-img" src="${beer.image_url}" alt="photo of ${beer.name}">
                    <h3>${beer.name}</h3>
                    <span class="beer-info">
                        <span>ABV: ${beer.abv}%</span>
                        <span>IBU: ${beer.ibu}</span>
                    </span>
                </div>
                <div class="beer-content">
                    <h2 class="beer-name">${beer.name}</h2>
                    <h3 class="beer-tagline">${beer.tagline}</h3>
                    <p class="beer-description">${beer.description}</p>
                    <p class="beer-pairings">Pair with: ${beer.food_pairing.join(', ') } </p>   
                </div>
            </div>
        `
    });

    beersDiv.innerHTML = beerHtml
}

getBeers()
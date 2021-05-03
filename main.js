// variables
const urlBase = "https://api.punkapi.com/v2/beers";
const filterABV = document.getElementById('filterABV')
let optionsABV = ""
let optionsIBU = ""

// filters
filterABV.addEventListener("change", e => {
    const value = e.target.value

    switch (value) {
        case "all":
            optionsABV = ""
            break;
/* abv_lt is a param from https://punkapi.com/documentation/v2 docs. 
abv_lt=4.6 Returns all beers with ABV less than 4.6 */
        case "weak":
            optionsABV = "abv_lt=4.6"
            break;
        case "medium":
// chose gt=4.5 and lt=6.5 because it'll return beers between 4.6% and 6.4%
            optionsABV = "abv_gt=4.5&abv_lt=6.9"
            break;
        case "strong":
            optionsABV = "abv_gt=6.8"
            break;
    }
    getBeers()
})

filterIBU.addEventListener("change", e => {
    const value = e.target.value

    switch (value) {
        case "all":
            optionsIBU = ""
            break;
        case "weak":
            optionsIBU = "ibu_lt=41"
            break;
        case "medium":
            optionsIBU = "ibu_gt=40&ibu_lt=75"
            break;
        case "strong":
            optionsIBU = "ibu_gt=74"
            break;
    }
    getBeers()
})

async function getBeers() {
    const url = `${urlBase}?${optionsABV}&${optionsIBU}`
    console.log(url)
    // fetch
    const beerPromise = await fetch(url)
    const beers = await beerPromise.json()
    
    // render data
    const beersDiv = document.querySelector('.beers')
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
                    <p class="  ">Pair with: ${beer.food_pairing.join(', ') } </p>   
                </div>
            </div>
        `
    });

    beersDiv.innerHTML = beerHtml
}

getBeers()
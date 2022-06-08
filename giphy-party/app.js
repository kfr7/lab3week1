
// *******GLOBAL CONSTANTS*****************
// TEMPORARY, create your own later
const API_KEY = 'nOjzgnRK5wSxGHruvjd3HVSux7Zxk46H';  // 
const GIF_LIMIT = 10;
const GIF_RATING = 'g';
const GIF_LANG = 'en';
// Step 7
let currentQueryTerm = ""
let currentPage = 0;
let offset = 0; 

// **********CREATE DOM REFERENCE****************
let GIFForm = document.querySelector("form");
let GIFGallery = document.querySelector("#GIFGallery");
let loadMoreButton = document.querySelector("#loadMoreButton");
let showPageAndAmount = document.querySelector("#showPageAndAmount");

// ********CREATE EVENT LISTENER FOR SUBMIT********
loadMoreButton.addEventListener("click", refreshPage);
GIFForm.addEventListener("submit", getDataAndDisplay);

// **************LOAD MORE EVENT FUNCTION************************
async function refreshPage(event)
{
    currentPage += 1;
    offset = GIF_LIMIT * currentPage;

    event.preventDefault();
    let jsonData = retrieveGIFInformation(currentQueryTerm);

    jsonData.then(value => putIntoHTML(value));
}

// **************SUBMIT EVENT FUNCTION************************
async function getDataAndDisplay(event)
{
    // THIS IS FROM THE NEW BRANCH "testBranch"

    // reset both values to initial state
    currentPage = 0;
    offset = 0;

    // Parameters needed...
    // api_key, q, limit, rating, lang

    event.preventDefault();
    
    // Get all needed information
    currentQueryTerm = event.target.inputBox.value.toLowerCase();
    let jsonData = retrieveGIFInformation(event.target.inputBox.value.toLowerCase());

    // console.log("Entered else (good) should put into HTML");
    // Pass through all needed information to put into index.html (web site)
    jsonData.then(value => putIntoHTML(value));
}

// *************GET ALL INFORMATION RELATED TO QUERY*****************
async function retrieveGIFInformation(queryValue, showTrending=false)
{
    let apiUrl = "";
    if (showTrending)
    {
        apiUrl = `http://api.giphy.com/v1/gifs/trending?`
        + `api_key=${API_KEY}`
        + `&limit=${GIF_LIMIT}`
        + `&offset=${offset}`
        + `&rating=${GIF_RATING}`
        + `&lang=${GIF_LANG}`;
    }
    else
    {
        apiUrl = `http://api.giphy.com/v1/gifs/search?`
        + `api_key=${API_KEY}`
        + `&q=${queryValue}`
        + `&limit=${GIF_LIMIT}`
        + `&offset=${offset}`
        + `&rating=${GIF_RATING}`
        + `&lang=${GIF_LANG}`;
    }

    try
    {
        let response = await fetch(apiUrl);
        let jsonData = await response.json();
        return jsonData;
    }
    catch(err)
    {
        console.error(err);
        return "";
    }
}

// *************SHOW GIFS IN HTML CONTENT*****************
function putIntoHTML(GIFData, homePage=false)
{
    // clear previous GIF's, if any
    GIFGallery.innerHTML  = "";

    // console.log("See if correctly printing what I want. Should be 400.");
    // console.log(GIFData["data"][0]["images"]["downsized"]["url"]);

    let arrayOfGIF = GIFData["data"];

    // Remove "Load More!" Button if initial submit or refresh returns empty page
    if (arrayOfGIF.length === 0)
    {
        // console.log("Recognized that it was empty");
        loadMoreButton.classList.add("hidden");
        showPageAndAmount.innerHTML = ``;
        return;
    }

    let count = 0;
    arrayOfGIF.forEach((entireGIF) =>
    {   
        GIFGallery.innerHTML += `<img src=${entireGIF["images"]["fixed_width_downsampled"]["url"]} alt=${entireGIF["title"]}/>`;
        count += 1;
    })
        // Here is where I REVEAL the button
    if (homePage)
    {
        showPageAndAmount.innerHTML = `<p>Home Page: Trending</p>`;   
    }
    else
    {
        loadMoreButton.classList.remove("hidden");
        showPageAndAmount.innerHTML = `<p>Page ${currentPage+1}: ${count} results shown</p>`;   
    }
}



window.onload = function () {
    let jsonData = retrieveGIFInformation("something", true);
    jsonData.then(value => putIntoHTML(value, true));

}
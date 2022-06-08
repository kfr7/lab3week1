
// *******GLOBAL CONSTANTS*****************
// TEMPORARY, create your own later
const API_KEY = 'nOjzgnRK5wSxGHruvjd3HVSux7Zxk46H';  // 
const GIF_LIMIT = 10;
const GIF_RATING = 'g';
const GIF_LANG = 'en';


// **********PROGRAM START****************
let GIFForm = document.querySelector("form");
let GIFGallery = document.querySelector("#GIFGallery");

GIFForm.addEventListener("submit", getDataAndDisplay);

async function getDataAndDisplay(event)
{
    console.log("Entered getDataAndDisplay");
    console.log("");
    console.log("Event looks like...");
    console.log(event);
    console.log("");
    // Parameters needed...
    // api_key
    // q
    // limit
    // rating
    // lang
    event.preventDefault();
    console.log("Now preventing the default.");
    let apiUrl = `http://api.giphy.com/v1/gifs/search?`
    + `api_key=${API_KEY}`
    + `&q=${event.target.inputBox.value.toLowerCase()}`
    + `&limit=${GIF_LIMIT}`
    + `&rating=${GIF_RATING}`
    + `&lang=${GIF_LANG}`

    console.log("");
    console.log(apiUrl);
    console.log("");
    try
    {
        console.log("Entered the try statement");
        console.log("");
        let response = await fetch(apiUrl);
        let jsonData = await response.json();
        console.log("About to insert into HTML");
        console.log("");
        putIntoHTML(jsonData);
        console.log("Successfully went through putIntoHTML function");
    }
    catch(err)
    {
        console.log("Broke out of the try into the catch...")
        console.log("");
        console.error(err);
    }
    

}

function putIntoHTML(GIFData)
{
    // clear previous GIF's, if any
    GIFGallery.innerHTML  = "";

    // console.log("See if correctly printing what I want. Should be 400.");
    // console.log(GIFData["data"][0]["images"]["downsized"]["url"]);
    let arrayOfGIF = GIFData["data"];
    arrayOfGIF.forEach((entireGIF) =>
    {
        GIFGallery.innerHTML += `<img src=${entireGIF["images"]["fixed_width_downsampled"]["url"]}/>`;
    })


}
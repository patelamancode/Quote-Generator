const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// trying different method to fetch api and also try to make their own proxy api for our own purpose


// async function getQuote(){
//     const proxyUrl = 'https://mighty-escarpment-32848.herokuapp.com/'

//     const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

//     try{
//         const response = await fetch(proxyUrl + apiUrl);
//         const data = await response.json();
//         authorText.innerText = data.quoteAuthor;
//         authorText.innerText = data.quoteText;
//     }catch(error){
//         getQuote();
//     }
// }


let apiQuotes = [];

// showing loader due to some fetching time of our api
// function loading() {
//     // show loading
//     quoteContainer.hidden = true;
//     loader.hidden = false;

//     // hide loading
//     quoteContainer.hidden = false;
//     loader.hidden = true;
// }

// show new quote from 1642 quotes
function newQuote() {
    // loading();
    // picking up a random quote from 1642 of api
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // check if author feild is null then replace it with unknown.
    if (quote.author===null){
        authorText.textContent = 'Unknown';
    }else{
        authorText.textContent = quote.author;
    }

    // check quote length if it's long then reduce fontsize
    if(quote.text.length > 80) {
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    // set quote, to hide the loader
    quoteText.textContent = quote.text;
    // complete();
}



// get quotes from api
async function getQuotes() {
    // loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch(error){
        // catch error here
    }
}

// tweet quotes on twitter and btn functioning
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    // for opening twitter in a new tab we use window object
    window.open(twitterUrl, '_blank');

}

// for our eventListner
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)

// on load api
getQuotes();
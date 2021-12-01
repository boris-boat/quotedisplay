const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')
// show loading
function  loading(){
    loader.hidden = false
    quoteContainer.hidden = true
}
// hide loading
function complete() {
if(!loader.hidden){
loader.hidden = true
quoteContainer.hidden = false
}
}
//get quote from api

async function getQuote() {
    loading()

//const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?'
try{
const response = await fetch(apiUrl)
const data = await response.json()
// if author is blank ili unknown set it to unknown
if(data.quoteAuthor === ''){
authorText.innerText = 'Unknown'
}
else{
    authorText.innerText = data.quoteAuthor
}
// reduce font size for long quotes
if(data.quoteText.lenght > 120){
quoteText.classList.add('long-quote')
} else {
    quoteText.classList.remove('long-quote')
}
quoteText.innerText = data.quoteText
complete()
}
// stop loading

catch (error) {
    getQuote()
}
}
//twitter function
function tweetQuote(){
    const quote = quoteText.innerText
    const author = authorText.innerText
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl,'_blank')
}
// eventlisteners
newQuoteBtn.addEventListener('click',getQuote)
twitterBtn.addEventListener('click', tweetQuote)

//on load
getQuote();

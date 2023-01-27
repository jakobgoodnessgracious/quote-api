const submitButton = document.getElementById('submit-quote');
const newQuoteContainer = document.getElementById('new-quote');
const quoteInput = document.getElementById('quote');
const personInput = document.getElementById('person');
const queryId = new URLSearchParams(window.location.search).get('id');
window.addEventListener('load', () => {
  if (queryId) {
    fetch(`/api/quotes/${queryId}`)
      .then(response => response.json())
      .then(({ quote }) => {
        quoteInput.innerHTML = quote.quote;
        person.value = quote.person;
      })
  }
});

submitButton.addEventListener('click', () => {
  const quote = document.getElementById('quote').value;
  const person = document.getElementById('person').value;

  fetch(`/api/quotes/${queryId}?quote=${quote}&person=${person}`, {
    method: 'PUT',
  })
    .then(response => response.json())
    .then(({ quote }) => {
      const newQuote = document.createElement('div');
      newQuote.innerHTML = `
    <h3>Congrats, your quote was edited!</h3>
    <div class="quote-text">${quote.quote}</div>
    <div class="attribution">- ${quote.person}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
      newQuoteContainer.innerHTML = '';
      newQuoteContainer.appendChild(newQuote);
    });
});

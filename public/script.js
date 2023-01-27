const fetchAllButton = document.getElementById('fetch-quotes');
const fetchRandomButton = document.getElementById('fetch-random');
const fetchByAuthorButton = document.getElementById('fetch-by-author');

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.querySelector('.quote');
const attributionText = document.querySelector('.attribution');

const resetQuotes = () => {
  quoteContainer.innerHTML = '';
}

const deleteQuote = (id) => {
  fetch(`/api/quotes/${id}`, { method: 'DELETE' })
    .then(response => {
      if (response.status === 204) {
        quoteContainer.innerHTML = `<p>Successfully deleted quote.</p>`;
      } else {
        renderError(response);
      }
    })
}

const renderError = response => {
  quoteContainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status}</p>
<p>${response.statusText}</p>`;
}

const renderQuotes = (quotes = []) => {
  resetQuotes();
  if (quotes.length > 0) {
    quotes.forEach(quote => {
      const newQuote = document.createElement('div');
      newQuote.className = 'single-quote';
      newQuote.innerHTML = `<div class="quote-text">${quote.quote}</div>
      <div><span class="attribution">- ${quote.person}</span><a class="action-link" href="javascript:deleteQuote(${quote.id})">Delete</a><a class="action-link" href="edit-quote.html?id=${quote.id}">Edit</a></div>`;
      quoteContainer.appendChild(newQuote);
    });
  } else {
    quoteContainer.innerHTML = '<p>Your request returned no quotes.</p>';
  }
}

fetchAllButton.addEventListener('click', () => {
  fetch('/api/quotes')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        renderError(response);
      }
    })
    .then(response => {
      renderQuotes(response.quotes);
    });
});

fetchRandomButton.addEventListener('click', () => {
  fetch('/api/quotes/random')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        renderError(response);
      }
    })
    .then(response => {
      renderQuotes([response.quote]);
    });
});

fetchByAuthorButton.addEventListener('click', () => {
  const author = document.getElementById('author').value;
  fetch(`/api/quotes?person=${author}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        renderError(response);
      }
    })
    .then(response => {
      renderQuotes(response.quotes);
    });
});

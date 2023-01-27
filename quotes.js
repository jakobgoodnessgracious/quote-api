const express = require('express');
const { quotes } = require('./data');
const { getRandomElement } = require('./utils');
// /api/quotes
const quotesRouter = express.Router();

quotesRouter.get('/', (req, res, next) => {
    if (req.query.person) {
        const quotesByPerson = quotes.filter(({person}) => person === req.query.person);
        res.send({ quotes: quotesByPerson });
    } else {
        res.send({ quotes });
    }
});

quotesRouter.get('/random', (req, res, next) => {
    res.send({ quote: getRandomElement(quotes) });
});

quotesRouter.post('/', (req, res, next) => {
    const {quote, person} = req.query;
    console.log('quote', quote, 'person', person);
    if (quote && person) {
        const highestIndex = quotes.sort(({id: thisId}, {id: nextId}) => {
            if (thisId > nextId) return -1;
            if (nextId > thisId) return 1;
            return 0;
        });
        quotes.push({id: highestIndex + 1, quote, person});
        res.status(201).send({quote: quotes[quotes.length - 1]});
    } else {
        res.status(400).send('Quote and Person properties not both supplied.')
    }
});

quotesRouter.put('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const { quote, person } = req.query;
    const quoteIndex = quotes.findIndex((quote) => id === quote.id);
    if (!quote || !person) {
        res.status(400).send('Both Quote and Person must be supplied.')
    } else if (quoteIndex !== -1) {
        quotes[quoteIndex] = {id, quote, person};
        res.send({quote: quotes[id]});
    } else {
        res.status(404).send('Id does not exist.');
    }
})

quotesRouter.delete('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const quoteIndex = quotes.findIndex((quote) => id === quote.id);

    if (quoteIndex !== -1) {
        quotes.splice(quoteIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Id does not exist.');
    }
})

module.exports = quotesRouter;
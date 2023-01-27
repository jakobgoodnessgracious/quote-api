const express = require('express');
const quotesRouter = require('./quotes');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.use('/api/quotes', quotesRouter);


app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
});
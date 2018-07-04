const functions = require('firebase-functions');
const express = require('express');
const engines = require('consolidate');

const app = express();

app.engine('ejs', engines.handlebars);

app.set('views', './views');

app.set('view engine', 'ejs');

app.get('/', (request, response) => {
    response.render('index');
});

 exports.app = functions.https.onRequest(app);

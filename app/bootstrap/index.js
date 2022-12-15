const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('flash');
const sessionStore = require('./session-handler/mysql')(session);

module.exports = app => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }));
    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, '../views'));
    app.use(express.static(path.join(__dirname, '../../public')));
    app.use(cookieParser());
    app.use(session({
        secret: 'Express Blog',
        store: sessionStore,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
        name: 'Express_Blog',
        unset: 'destroy'
    }));
    app.use(flash());
}
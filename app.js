if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require("express");
let port = process.env.PORT;
const app = express();
const passport = require('passport');
const helmet = require ('helmet');
const morgan = require ('morgan');
const flash = require('express-flash')
const session = require('express-session');
const initializePassport = require('./passport-config');
initializePassport(passport);

// Static Files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60*60*1000, httpOnly: true, secure: false, sameSite: false},
    resave: false,
    saveUninitialized: false,
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Templating Engine
app.set('views', './source/views');
app.set('view engine', 'ejs');

// Routes
const indexRouter = require('./source/routes/index');
const loginRouter = require('./source/routes/login');
const createUserRouter = require('./source/routes/register');
const dashboardRouter = require('./source/routes/dashboard');
const captionRouter = require('./source/routes/caption');
const logoutRouter = require('./source/routes/logout');

app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/caption', captionRouter);
app.use('/login', loginRouter);
app.use('/register', createUserRouter);
app.use('/logout', logoutRouter);


if (port == null || port == "") {
    port = 5000;
}

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});

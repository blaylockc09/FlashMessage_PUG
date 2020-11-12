/* Chris Blaylock
10/28/2020
WDD-3400 */

const express = require('express');
var cookieParser = require('cookie-parser');
const app = express();
var session = require('express-session');
var flash = require('express-flash');
var sessionStore = new session.MemoryStore;


app.set('view engine', 'pug');

app.use(cookieParser('secret'));
app.use(session({  
	resave: false,
    saveUninitialized: false,
	secret: 'keyboard cat', 
	cookie: { maxAge: 60000 }
}));

app.use(flash());

app.use(function(req, res, next){
    // if there's a flash message in the session request, make it available in the response, then delete it
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});


app.all('/session-flash', function( req, res ) {
    req.session.sessionFlash = {
        type: 'success',
		message: 'Logging in, Please wait'
		
	}
	
    res.redirect(301, '/')
});


app.get('/', (req, res) => { 
	res.render('index', { expressFlash: req.flash("success"), sessionFlash:res.locals.sessionFlash });
	
})

app.listen(3000)

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))


app.post('/submit', (req, res) => { 
	res.redirect('/session-Flash')
	console.log('Username: '+req.body.username)
	console.log('Password: '+req.body.password)
	
})

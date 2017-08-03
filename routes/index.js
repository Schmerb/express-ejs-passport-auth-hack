'use strict';

module.exports = function(app, passport) {
    
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Homepage with login / signup links
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    app.get('/', (req, res) => {
        let drinks = [
            { name: 'Bloody Mary', drunkness: 3 },
            { name: 'Martini', drunkness: 5 },
            { name: 'Scotch', drunkness: 10 }
        ];

        let tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";
        res.render('index', {
            drinks: drinks,
            tagline: tagline
        });
    });

    
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
    // Login - displays login form
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    app.get('/login', (req, res) => {

        // renders login page and passes flash data
        res.render('pages/login.ejs', {message: req.flash('loginMessage')});
    });



   
    // Will process login form
    // app.post('/login', do passport authentication here);
    




    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Signup - displays signup form
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    app.get('/signup', (req, res) => {

        // renders signup page and passes flash data
        res.render('pages/signup.ejs', {message: req.flash('signupMessage')});
    });




    // Will process signup form
    // app.post('/signup', do passport authentication here);
    


    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Profile page, middleware used to authenticate 
    // users before serving page
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('pages/profile.ejs', {
            user: req.user
        });
    });

    
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Logout
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    app.get('/logout', (req, res) => {
        res.logout();
        res.redirect('/'); // after logout, returns to homepage
    });


    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // route middleware to check if user is currently logged in
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/');
    }
}

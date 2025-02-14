const passport = require('passport');

// Google authentication
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

// Facebook authentication
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    }); 
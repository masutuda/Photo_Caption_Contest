const express = require('express');
const loginRouter = express.Router();
const { check, validationResult } = require('express-validator');
const passport = require('passport');


loginRouter.get('', async(req, res) => {
    if(req.user) {
        res.redirect('/dashboard')
    } else {{
        res.render('login')
    }}
});

loginRouter.post('', [
    check('email', 'Email is not valid')
        .exists()
        .isEmail()
        .normalizeEmail(),
    check('password', 'Invalid Password')
        .exists()
        .escape()
    ],
    async (req, res) => {
        const errors = validationResult(req).errors;

        if(errors.length > 0) {
            res.render('login', {errors});
        } else {
            try {
                passport.authenticate('local', {
                    successRedirect: './dashboard',
                    failureRedirect: './login',
                    //failureFlash: true
                })(req, res);
            } catch {
                res.status(500).send('error')
            }
        }
    });

module.exports = loginRouter;
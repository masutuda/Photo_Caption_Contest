const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const createUserRouter = express.Router();
const User = require('../../models').User;


createUserRouter.get('', async (req, res) => {
    if(req.user) {
        res.redirect('/dashboard')
    } else {{
        res.render('register')
    }}
});

createUserRouter.post('', [
    check('username', 'Username must be at least 5 and 15 characters long')
        .exists()
        .escape()
        .isLength({ min: 5, max: 15 }),
    check('firstName', 'Please enter your first name.')
        .exists()
        .escape(),
    check('lastName', 'Please enter your last name.')
        .exists()
        .escape(),
    check('email', 'Email is not valid')
        .exists()
        .isEmail()
        .normalizeEmail(),
    check('password', 'Invalid Password')
        .exists()
        .isStrongPassword()
    ], 
    async (req, res) => {

        const errors = validationResult(req).errors;
        if(req.body.email) {
            if(await User.findOne({
                where: { email: req.body.email }
            })) {
                errors.push({ msg: 'Email already registered'});
            }
        }
        

        if(errors.length > 0) {
            res.render('register', {errors});
        } else {
            try {
                const { username, firstName, lastName, email, password } = req.body;
                const salt = await bcrypt.genSalt(10);
            
                const hashedPassword = await bcrypt.hash(password, salt);

                User.create({
                    username: username,
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: hashedPassword
                })
                .then(user => {
                    res.redirect('/login');
                })
                .catch(err => res.send(err.message));
            } catch {
                res.status(500).send('error');
            }
        }
    }
);


module.exports = createUserRouter;
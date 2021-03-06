
const express = require('express');
const Router = express.Router();
const User = require('../model/userModel');

Router.get('/', (req, res) => {
    res.send("hello");
});

Router.get('/login', (req, res) => {
    res.render('users/login', { title: 'User Login' });

});



Router.get('/register', (req, res) => {
    res.render('users/register', { title: 'User Registerstion' });
});

Router.post('/register', (req, res) => {

    console.log(req.body.userName + ' ' + req.body.usereEmail + ' ' + req.body.userCountry + ' ' + req.body.userPasswor) //good

    //save to DB

    User.create({ //good
        user_name: req.body.userName,
        user_email: req.body.usereEmail,
        password: req.body.userPasswor,
        country: req.body.userCountry
    }, function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log(data);
    });

    //views
    res.send('user saved');//check why not working
});


Router.post('/login', (req, res) => {

    //need to check the user name and the password and return the _id 
    //and in the client i need to save _id to localstorage
    let userlog = req.body.userNameLogin;
    let passwordlog = req.body.passwordLogin;

    User.findOne({ user_name: userlog, password: passwordlog }, { _id: 1, user_name: 1, country: 1 }, (err, data) => {
        if (err) {
            return console.error(err);//error from DB
        }
        console.log(data);//good //data = { _id: 5b292ee72ad0582d00717cfb, user_name: amitay,country: 'Brasil' }
        //res.send("find user");
        if (data == null) {
            return console.error("user_name Or password wrong");
        }
        res.json(data);//send the found data in json
    });

});

module.exports = Router;
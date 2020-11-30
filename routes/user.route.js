// user.route.js

const router = require('express').Router();
let User = require('../models/user.model');
let bcrypt  =require("bcrypt");
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({ username });
    User.find({
        username: username
    }).exec().then( (username) =>{
        if (username.length >=1){
            return res.status(401).json({
                message:"username already no available"
            })        
        }else{
            bcrypt.hash(req.body.password,saltRound=10).then(hash=>{
                const user =new User({
                    username:req.body.username,
                    password:hash
                })
                user.save().then(result=>{
                    res.send(result);
                })
            })
        }
    }
    ).catch(err=>{
        res.send(err);
    })
})

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
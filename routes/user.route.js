// user.route.js

const router = require('express').Router();
let User = require('../models/user.model');
let bcrypt  =require("bcrypt");
const jwt = require("jsonwebtoken")

router.post('/login',async (req, res) => {
    let username = req.body.username
    let hash = await  bcrypt.hash(req.body.password,saltRound=10).then(hash => hash)
    User.findOne({username:username}).exec()
    .then(user=>{
        if(user){
            let accessToken;
            bcrypt.compare(req.body.password,user.password,(err,result)=>{
                console.log(result)
                if (err){
                    return res.status(401).json({
                        message:"Failed to login"
                    })
                }else if(result){
                     accessToken = jwt.sign({
                        username:req.body.username,
                    }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: process.env.ACCESS_TOKEN_LIFE
                    });
                    res.status(200).json({
                        accessToken,
                    })

                } else {
                    accessToken = jwt.sign({
                        username:req.body.username,                       
                    }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: process.env.ACCESS_TOKEN_LIFE
                    });
                    res.status(403).send({
                        message : "Forbidden"
                    })
                }
            })
        } else {
            res.status(404).json({
                message:"username or password incorrect",                              
            })
        }
    }).catch(err=>{
        res.status(500).send(err)
    }) 
});
router.post('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({ username });
    User.find({
        username: username
    }).exec().then( (username) =>{
        if (username.length >=1){
            return res.status(401).json({
                message:"username already not available"
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

router.post('/:id').get((req, res) => {
    // const username = req.body.username;
    // const newUser = new User({ username });
    User.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/:id').put((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;

let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt');
 const User = require('../models/user.model')

  exports.register = async (req, res) => {

    //Checking if the user is already in database
    const userExist = await User.findOne ({username: req.body.username})

    if(userExist) return res.status(400).send({message:'User already exists', user: userExist})
    const h = bcrypt.hashSync(req.body.password, 10);

    // creating a new user
    const user = new User({
      username:req.body.username,
      password:h
    })
      user.save().then((newUser)=>{
        res.status(200).send({
            user:newUser,
            message: "Registered successful"
        })
      }).catch((err)=>{
        res.status(400).send({error:err.message})
      })
  }
    //login
    
    exports.login  = async(req,res) =>{
      User.find({username: req.body.username})
      .exec()
      .then(user => {
          bcrypt.compare(req.body.password, user[0].password, function(err, result) {
              //let token
              if (result) {
                  let token
                    token = jwt.sign({
                    username:req.body.username,
                        }, process.env.ACCESS_TOKEN_SECRET, {
                            expiresIn: '5h' 
                        })
                     res.status(200).json({
                      message: "login in successfully",
                      token: token
                  })
              }
              else{
                  return res.status(400).send({
                      message: "username or password is incorrect"
                    })
              }
          });
      })
      .catch( error => {
          res.status(400).send({error: error.message})
      });

}
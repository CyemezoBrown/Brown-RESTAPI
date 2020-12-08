//process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const User = require('../models/user.model')
const request = require ('request')
const should = chai.should();

// const should = chai.should()
chai.use(chaiHttp)
const user = {
    username :"fidele0208",
    password:'fidele'
}
describe('Authentication',() =>{

    it('It should not register a user twice',(done)=>{
        const user = {
            username :"fidele0208",
            password:'fidele'
        }
        chai.request(server)
        .post('/api/user/register')
        .send(user)
        .end((err, res) =>{
            res.should.have.status(400);
            res.body.should.have.property('user');
            res.body.user.should.have.property('username').eql(user.username);
            res.body.should.have.property('message').eql('User already exists');
            done()
        })
    })


    it('It should register a user ', (done)=>{

        // remove the user from the database
            User.deleteOne({'username': user.username}).then(()=>{
                console.log('Deleted user');
                chai.request(server)
                .post('/api/user/register')
                .send(user)
                .end((err, res) =>{
                    res.should.have.status(200)
                    res.body.should.have.property('message').eql('Registered successful')
                    done()
                })
        
            }).catch((err)=>{
                console.log(err);
            })


    })
    it('It should LOGIN a user', (done) => {
        chai.request(server)
        .post('/api/user/login')
        .send(user)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message')
            res.body.should.have.property('token')
            token = res.body.token
            done()
        })
    })
    it('It should NOT LOGIN a user', (done) => {
        chai.request(server)
        .post('/api/user/login')
        .send({
            username: user.username, 
            password: user.username
        })
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql("username or password is incorrect")
            done();
        })
    })  
 })
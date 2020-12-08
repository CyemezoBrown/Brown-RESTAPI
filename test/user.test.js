//process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const User = require('../models/user.model')
const request = require ('request')
const { expect } = require('chai')

// const should = chai.should()
chai.use(chaiHttp)
const user = {
    username :"fidele0208",
    password:'fidele'
}
describe('Authentication',() =>{
    it('It should register a user',(done)=>{
        chai.request(server)
        .post('/api/user/register')
        .send(user)
        .end((err, res) =>{
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('user')
            res.body.should.have.property('mesage').eql('Registered successful')
            done()
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
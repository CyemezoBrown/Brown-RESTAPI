let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
const { should } = require("chai");

chai.use(chaiHttp);

describe('POST api/user/login', () => {
    it('it should login ', (done) => {
        const user = {
            username : "fidele322",
            password : "fidele"
        }
        chai.request(server)
        .post('/api/user/login')
        .send(user)
        .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.be.a('object');
          //  done();
        })
    });

    it('it should not login a user', (done) => {
        chai.request(server)
        .post('/api/user/login')
        .send({
            username : "fido",
            password: "fidele"
        })
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('message').eql("username or password incorrect")
            done();
        })
    })

    it('it should not login a user', (done) => {
        chai.request(server)
        .post('/api/user/login')
        .send({
            username : "fidele322",
            password: "fido"
        })
        .end((err, res) => {
            res.should.have.status(403);
            res.body.should.have.property('message').eql("Forbidden")
            done();
        })
    })

});
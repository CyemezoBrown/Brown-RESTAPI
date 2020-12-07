let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
const { expect } = require("chai");

//to hold token
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZpZGVsZTMyMiIsImlhdCI6MTYwNzMzMjgzOSwiZXhwIjoxNzI3MzMyODM5fQ.JWFqz9HA3nQ140xs_OXAfc4RIi7jm89ebQrsKMoj4Gw";
// to hold cuid
const cuid = "ckia02vx100000ntqfmos8wb1"

let articleID
chai.use(chaiHttp);
let should = chai.should();
 //test for Get all posts route
describe('GET api/posts', () => {
    it('it should GET all article', (done) => {
        chai.request(server)
        .get('/api/posts')
        .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    });
});
  
 // Test the GET (by id) route

describe('GET api/posts/cuid', () => {
    it('it should GET an article within a given CUID', (done) => {
        chai.request(server)
        .get('/api/posts/' + cuid)
        .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    });

    it('it should not GET an article within a given CUID', (done) => {
        chai.request(server)
        .get('/api/posts/ckia02vx100000ntqfmos8sdasv')
        .end((err, res) =>{
            res.should.have.status(500);
            res.body.should.be.a('object');
            done();
        })
    });
});

 //Test for creating an article

describe('POST api/posts/add', () => {
    it('POST/article should Post an article', (done)=>{
        const article = {
            "post":{
                "title":"ht",
                "content":"Hypertext Transfer Protocol (HTTP) is an application-layer protocol for transmitting hypermedia documents, such as HTML. It was designed for communication between web browsers and web servers"
            }
        }
        chai.request(server)
        .post('/api/posts/add')
        .set({authorization:token})
        .send(article)
        .end((err,res) =>{
        if(err) done(err)
            res.should.have.status(200) 
            res.body.should.be.a('object')
            aricleID = res.body.post.cuid
            done()
        })
    });
    it('POST/ should NOT Post an article', (done)=>{
        const article = {
            "post":{
                "title":"",
                "content":""
            }
        }
        chai.request(server)
        .post('/api/posts/add')
        .set("Authorization", token)
        .send(article)
        .end((err,res) =>{
        if(err) done(err)
            res.should.have.status(403) 
            res.body.should.be.a('object')
            res.body.should.have.property('message').eql('cannot post with empty field');
            aricleID = res.body.post.cuid
            done()
        })
    });
});


describe('PUT api/posts', () => {
    it('it should UPDATE an article within a given CUID', (done) => {
    const article = {
        "post":{
            "title":"http",
            "content":"Hypertext Transfer Protocol (HTTP) is an application-layer protocol for transmitting hypermedia documents, such as HTML. It was designed for communication between web browsers and web servers"
        }
    }
        chai.request(server)
        .put(`/api/posts/${aricleID}`)
        .set({authorization:token})
        .send(article)
        .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    });
    it('it should not UPDATE an article within a given CUID', (done) => {
        const article = {
            "post":{
                "title":"",
                "content":"Hypertext Transfer Protocol (HTTP) is an application-layer protocol for transmitting hypermedia documents, such as HTML. It was designed for communication between web browsers and web servers"
            }
        }
            chai.request(server)
            .put(`/api/posts/${aricleID}`)
            .set({authorization:token})
            .send(article)
            .end((err, res) =>{
                res.should.have.status(403);
                res.body.should.be.a('object');
                done();
            })
        });
});

describe('DELETE api/posts', () => {
    it('it should DELETE an article of a given CUID', (done) => {

        chai.request(server)
        .delete(`/api/posts/${articleID}`)
        .set({authorization:token})
        .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Post have been deleted');
            done();
        })
    });
});

// describe('Authentication', () => {
//     it('it should not  authenticate if token is invalid', (done) => {

//         chai.request(server)
//         .delete(`/api/posts/${articleID}`)
//         .set("Authorization", token)
//         .end((err, res) =>{
//             res.should.have.status(403);
//             res.body.should.be.a('object');
//             res.body.should.have.property('message').eql('Invalid token');
//             done();
//         })
//     });
//     it('it should not  authenticate if no token is invalid', (done) => {

//         chai.request(server)
//         .delete(`/api/posts/${articleID}`)
//         .set("Authorization", token)
//         .end((err, res) =>{
//             res.should.have.status(401);
//             res.body.should.be.a('object');
//             res.body.should.have.property('message').eql('Invalid token');
//             done();
//         })
//     });
// });



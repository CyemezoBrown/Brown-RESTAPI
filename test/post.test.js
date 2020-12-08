let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
const { expect } = require("chai");
const { restart } = require('nodemon');

//to hold token
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZpZGVsZTAyMDgiLCJpYXQiOjE2MDczOTk1NzksImV4cCI6MTcyNzM5OTU3OX0.bRIQVN5u6xPiOc_dul_TxUgmcAr4bdZJBoWLVOIkc_I";
// to hold cuid
const cuid = "ckia02vx100000ntqfmos8wb1"

let articleID="";
chai.use(chaiHttp);
let should = chai.should();
  
 // Test the GET (by id) route

describe('Articles', () => {


    it('it should GET all article', (done) => {
        chai.request(server)
        .get('/api/posts')
        .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    });

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

    it('POST/article should Post an article', (done)=>{
        const article = {
            "post":{
                "title":"http",
                "content":"Hypertext??"
            }
        }
        chai.request(server)
        .post('/api/posts/add')
        .set({authorization:token})
        .send(article)
        .end((err,res) =>{
        //if(err) done(err)
            res.should.have.status(200);
            res.body.should.have.property('post');
            res.body.post.should.have.property('title').eql('http');
            res.body.post.should.have.property('content').eql('Hypertext??');
            res.body.post.should.have.property('cuid')
            aricleID = res.body.post.cuid;
            console.log('ArticleID: '+aricleID)
            done();
        })
    });
    it('POST/ should NOT Post an article', (done)=>{
        const article = {
                "title":"",
                "content":""    
        }
        chai.request(server)
        .post('/api/posts/add')
        .set("Authorization", token)
        .send(article)
        .end((err,res) =>{
        // if(err) done()
            res.should.have.status(500) 
            res.body.should.be.a('object')
            res.body.should.have.property('err')
            done()
        })
    });


    it('it should UPDATE an article within a given CUID', (done) => {
        const article = {
            "post":{
                "title":"http",
                "content":"Hypertext"
            }
        }
            chai.request(server)
            .put(`/api/posts/${aricleID}`)
            .set({Authorization:token})
            .send(article)
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.have.property('post');
                res.body.post.should.have.property('title').eql('http');
                res.body.post.should.have.property('content').eql('Hypertext');
                res.body.post.should.have.property('cuid').eql(aricleID);
                done();
            })
        });
        // it('it should not UPDATE an article within a given CUID', (done) => {
        //     const article = {
        //         "post":{
        //             "title":"",
        //             "content":"Hypertext Transfer Protocol (HTTP) is an application-layer protocol for transmitting hypermedia documents, such as HTML. It was designed for communication between web browsers and web servers"
        //         }
        //     }
        //         chai.request(server)
        //         .put(`/api/posts/${aricleID}`)
        //         .set({authorization:token})
        //         .send(article)
        //         .end((err, res) =>{
        //             res.should.have.status(403);
        //             res.body.should.have.property('error').eql('title or content is empty');
        //             done();
        //         })
        //     });


            it('it should DELETE an article of a given CUID', (done) => {
                chai.request(server)
                .delete(`/api/posts/${aricleID}`)
                .set({authorization:token})
                .end((err, res) =>{
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('Post have been deleted');
                    done();
                })
            });
});



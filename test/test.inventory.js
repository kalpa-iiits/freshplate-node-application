const assert = require("assert");
const chai = require('chai')
const chaiHttp = require('chai-http')
let should = chai.should();

chai.use(chaiHttp);

var server = require('../server.js')


describe("Test to get inventory data", () => {
    it("Should return 200 status", (done) => {
        chai.request(server)
        .get('/api/inventory')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
        done();
        })
    });
});


describe("Test to get single inventory data", () => {
    it("Should return 200 status", (done) => {
        chai.request(server)
        .get('/api/inventory/12345')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
        done();
        })
    });
});
const assert = require("assert");
const chai = require('chai')
const chaiHttp = require('chai-http')
let should = chai.should();

chai.use(chaiHttp);

var server = require('../server.js')


describe("Update database from file", () => {
    it("Data should be inserted and 200 should be returned", (done) => {
        let json_data = {
            file: "data.json"
        }
        chai.request(server)
        .post('/api/file')
        .send(json_data)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        done();
        })
    });
});



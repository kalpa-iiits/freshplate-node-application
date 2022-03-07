const assert = require("assert");
const chai = require('chai')
const chaiHttp = require('chai-http')
let should = chai.should();

chai.use(chaiHttp);

var server = require('../server.js')


describe("Update data schedule time", () => {
    it("Data should be inserted and 200 should be returned", (done) => {
        chai.request(server)
        .get('/api/schedule')
        .end((err, res) => {
            res.should.have.status(200);
        done();
        })
    });
});



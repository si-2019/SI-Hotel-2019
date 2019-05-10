// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index');
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("kreiranje za predmet", () => {
    describe("POST /createAnketa", () => {
        it ("treba vratiti poruku OK", (done) => {
            const anketa = {
                datumIstekaAnkete: '2019-07-20',
                tipAnkete: 'javna anketa',
                idNapravio: 1,
                idPredmet: 4,
                opis: "opisss",
                naziv: "nazivvv",
            }
            chai.request(app)
                .post('/createAnketa')
                .send(anketa)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('message')
                    res.body.should.have.property('message').eql('OK')
                    done()
                })
        })
    });
});
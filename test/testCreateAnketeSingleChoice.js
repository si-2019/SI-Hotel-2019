// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index');
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("kreiranje ankete sa single-choice pitanjima", () => {
    describe("POST /createAnketa", () => {
        it ("treba vratiti poruku OK", (done) => {
            const anketa = {
                "datumIstekaAnkete": "2020-09-11",
                "tipAnkete": "anketa za predmet",
                "naziv": "anketica",
                "opisAnkete": "opis ankete",
                "idNapravio": "2",
                "pitanja": [
                 {
                      "tekstPitanja": "U kolko",
                      "vrstaPitanja": "single-choice",
                      "odgovori": [
                        "u dvanaest nula nula",
                        "u šesnest"
                      ]
                 }
                 
                ]
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
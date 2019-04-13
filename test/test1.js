// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index');
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Hotel", () => {
    describe("GET /hotel", () => {
        it ("treba vratit nesto bzvz", (done) => {
            chai.request(app)
                .get('/hotel')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    done()
                })
        })
      
        
    });
});
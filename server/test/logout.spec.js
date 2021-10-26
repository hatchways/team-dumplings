const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("/POST /auth/logout/", () => {
  it("it should return 200  and `logged out` message", (done) => {
    chai
      .request(app)
      .post(`/auth/logout/`)
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.have.eql("You have successfully logged out");
        done();
      });
  });
});

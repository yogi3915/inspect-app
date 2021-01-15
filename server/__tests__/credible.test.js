const { app } = require('../app');
const supertest = require("supertest");
 
const request = supertest(app);

let server;
beforeAll( async () => {
  try {
    server = await app.listen(4400);
    return server
  } catch (error) {
    throw error
  }
});

afterAll( async () => {
  await server.close();
})

describe("GET CREDIBILITY", () => {

  it("get credibility", (done) => {
    request.get('/')
      .send({
        query: `{credibility(company: "Astra Agro Lestari Tbk") { kpbn indoInvestments  }}`
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        console.log(res.body);
        // expect(res.status).toBe(200);
        done();
      })
  })

})

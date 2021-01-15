const { app } = require('../app');
const supertest = require("supertest");

/**
 * @jest-environment node
 */

const request = supertest(app);

let server;
beforeAll( async () => {
  try {
    server = await app.listen(4100);
    return server
  } catch (error) {
    throw error
  }
});

afterAll( async () => {
  await server.close();
})

describe("GET NEWS", () => {

  it("get indonesian news", (done) => {
    request.get('/')
      .send({
        query: `{articles(q: "corruption") {judul link poster tipe waktu}}`
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        console.log(res.body, res.status, "<< succes fetch news");
        // expect(res.status).toBe(200);
        done();
      })
  })


})
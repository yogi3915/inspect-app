const { app } = require('../app');
const supertest = require("supertest");
const { db } = require('../config/database')
 
const request = supertest(app);

let server;
beforeAll( async () => {
  try {
    server = await app.listen(4200);
    return server
  } catch (error) {
    throw error
  }
});

afterAll( async () => {
  await server.close();
})

describe('GET USER BY ID', () => {

  const newUser = {
    first_name: "Pengguna",
    last_name: "Pertama",
    email: "user@mail.com",
    password: "user",
    nationalin: "indonesian",
    birth_date: "01/01/2000",
    gender: "male",
  }

  let getId;

  beforeEach( async () => {
    const { result, insertedId } = await db.collection("Users").insertOne(newUser);
    getId = insertedId;
    return result
  })

  afterEach( async () => {
    await db.collection("Users").deleteOne({_id: getId})
  })

  it("get user success with status 200 and instance of object", (done) => {
    request.get('/')
      .send({
        query: `{ User(id: "${getId}"){_id, first_name, last_name, email, nationalin, birth_date, gender} }`
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        expect(res.body).toBeInstanceOf(Object);
        done();
      })
  });

  it("get user success with have property User with value object", (done) => {
    request.get('/')
      .send({
        query: `{ User(id: "${getId}"){_id, first_name, last_name, email, nationalin, birth_date, gender} }`
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.data).toHaveProperty("User", expect.any(Object));
        done();
      })
  });

  it("get user success with have all property", (done) => {
    request.get('/')
      .send({
        query: `{ User(id: "${getId}"){_id, first_name, last_name, email, nationalin, birth_date, gender} }`
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.data.User).toHaveProperty("first_name", expect.any(String));
        expect(res.body.data.User).toHaveProperty("last_name", expect.any(String));
        expect(res.body.data.User).toHaveProperty("email", expect.any(String));
        expect(res.body.data.User).toHaveProperty("nationalin", expect.any(String));
        expect(res.body.data.User).toHaveProperty("birth_date", expect.any(String));
        expect(res.body.data.User).toHaveProperty("gender", expect.any(String));
        done();
      })
  });

  it("get user fail cause dont match any user", (done) => {
    request.get('/')
      .send({
        query: `{ User(id: "5fd48f090d4d182be80670923"){_id, first_name, last_name, email, nationalin, birth_date, gender} }`
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.data.User).toBe(null);
        done()
      })
  })

  it("get user fail with respone body have property errors", (done) => {
    request.get('/')
      .send({
        query: `{ User(id: "5fd48f090d4d182be80670923"){_id, first_name, last_name, email, nationalin, birth_date, gender} }`
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toHaveProperty("errors", expect.any(Array));
        done()
      })
  })

  it("get user fail with respone errors have message", (done) => {
    request.get('/')
      .send({
        query: `{ User(id: "5fd48f090d4d182be80670923"){_id, first_name, last_name, email, nationalin, birth_date, gender} }`
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.errors[0].message).toBe("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
        done()
      })
  })

})

describe('REGISTER USER', () => {

  it("Register success with status 200 and instance of object", (done) => {
  
    request.post('/')
      .send({
        query: "mutation { Register(payload: { first_name: \"User\" last_name: \"user\" email: \"user@mail.com\" password: \"user\" nationalin: \"indonesian\" birth_date: \"01/01/2000\" gender: \"male\" role: \"user\"}) {_id first_name last_name email nationalin birth_date gender}}"
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        expect(res.body).toBeInstanceOf(Object);
        done();
      })
  })

  it("Register success validation", (done) => {
  
    request.post('/')
      .send({
        query: "mutation { Register(payload: { first_name: \"User\" last_name: \"user\" email: \"user@mail.com\" password: \"user\" nationalin: \"indonesian\" birth_date: \"01/01/2000\" gender: \"male\" role: \"user\"}) {_id first_name last_name email nationalin birth_date gender}}"
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.data.Register).toHaveProperty("_id", expect.any(String));
        expect(res.body.data.Register).toHaveProperty("first_name", expect.any(String));
        expect(res.body.data.Register).toHaveProperty("last_name", expect.any(String));
        expect(res.body.data.Register).toHaveProperty("email", expect.any(String));
        expect(res.body.data.Register).toHaveProperty("nationalin", expect.any(String));
        expect(res.body.data.Register).toHaveProperty("birth_date", expect.any(String));
        expect(res.body.data.Register).toHaveProperty("gender", expect.any(String));
        done();
      })
  })

  it("Register success with properti Register", (done) => {
    let idWantToDelete;
  
    request.post('/')
      .send({
        query: "mutation { Register(payload: { first_name: \"User\" last_name: \"user\" email: \"user@mail.com\" password: \"user\" nationalin: \"indonesian\" birth_date: \"01/01/2000\" gender: \"male\" role: \"user\"}) {_id first_name last_name email nationalin birth_date gender}}"
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        expect(res.body.data).toHaveProperty("Register", expect.any(Object));
        done();
      })
  })

  it("Register validation failed", (done) => {

    request.post('/')
      .send({
        query: "mutation { Register(payload: { first_name: 10 last_name: \"user\" email: \"user@mail.com\" password: \"user\" nationalin: \"indonesian\" birth_date: \"01/01/2000\" gender: \"male\"}) {_id first_name last_name email nationalin birth_date gender}}"
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(400)
        expect(res.body).toBeInstanceOf(Object);
        done();
      })

  })

})

describe("Login user", () => {

  it('Login success', (done) => {
    request.post('/')
      .send({
        query: "mutation { Login(payload: {email: \"user@mail.com\" password: \"user\"} ) { token } }"
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        expect(res.body).toBeInstanceOf(Object);
        done();
      })
  })

  it('Login success get token', (done) => {
    request.post('/')
    .send({
      query: "mutation { Login(payload: {email: \"user@mail.com\" password: \"user\"} ) { token } }"
    })
    .set("Accept", "application/json")
    .end((err, res) => {
      if (err) return done(err)
      const { token } = res.body.data.Login;
      // console.log(token);
      expect(token).toBe(token.toString());
      expect(res.body.data.Login).toHaveProperty("token", expect.any(String));
      done();
    })
  })

  it('Login fail cause wrong email', (done) => {
    request.post('/')
    .send({
      query: "mutation { Login(payload: {email: \"userAdmin@mail.com\" password: \"user\"} ) { token } }"
    })
    .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.errors[0]).toBeInstanceOf(Object)
        expect(res.body.errors[0].message).toBe("Cannot read property 'password' of null")
        done();
      })
  })

  it('Login fail cause wrong password', (done) => {
    request.post('/')
    .send({
      query: "mutation { Login(payload: {email: \"user@mail.com\" password: \"user1\"} ) { token } }"
    })
    .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.errors[0]).toHaveProperty("message", expect.any(String))
        done();
      })
  })

})

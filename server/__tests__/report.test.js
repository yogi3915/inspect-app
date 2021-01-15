const { app } = require('../app');
const supertest = require("supertest");
const { db } = require('../config/database');
 
const request = supertest(app);

let server;
beforeAll( async () => {
  try {
    server = await app.listen(4300);
    return server
  } catch (error) {
    throw error
  }
});

afterAll( async () => {
  await server.close();
  // db.collection('Reports').deleteMany()
})

describe("GET REPORTS", () => {

  const report = { 
    case: "abuse of assets",
    entity: "Provincial Government",
    province: "SUMATERA UTARA",
    city: "KAB. TAPANULI UTARA",
    dateHappened: "2020-12-17",
    description: "adwwad",
    isDocumentProvided: "",
    involvedPerson: ["adwaw"],
    personRole: "awdawd",
    isReported: "true",
    isKeepInTouch: "true",
    aboutInspectApp: "awdawd",
    UserEmail: "testing@mail.com",
    status: "Waiting for Submission"
  }

  let idWantToDelete

  beforeEach( async () => {
      const { insertedId, result } = await db.collection("Reports").insertOne(report);
      idWantToDelete = insertedId
      return result;
  })

  afterEach( async () => {
    await db.collection('Reports').deleteOne({_id: idWantToDelete})
  })

  it("get reports with status 200", (done) => {
    request.get('/')
      .send({
        query: `{reports { _id UserEmail case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch aboutInspectApp status}}`
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200);
        done();
      })
  })

  it("get reports contain property reports", (done) => {
    request.get('/')
      .send({
        query: `{reports { _id UserEmail case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch aboutInspectApp status }}`
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.data).toHaveProperty("reports", expect.any(Array));
        done();
      })
  })

  it("get reports with all property", (done) => {
    request.get('/')
      .send({
        query: `{reports { _id UserEmail case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch aboutInspectApp status }}`
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.data.reports[0]).toHaveProperty("_id", expect.any(String));
        expect(res.body.data.reports[0]).toHaveProperty("UserEmail", expect.any(String));
        expect(res.body.data.reports[0]).toHaveProperty("case", expect.any(String));
        expect(res.body.data.reports[0]).toHaveProperty("entity", expect.any(String));
        expect(res.body.data.reports[0]).toHaveProperty("province", expect.any(String));
        expect(res.body.data.reports[0]).toHaveProperty("city", expect.any(String));
        expect(res.body.data.reports[0]).toHaveProperty("dateHappened", expect.any(String));
        expect(res.body.data.reports[0]).toHaveProperty("description", expect.any(String));
        expect(res.body.data.reports[0]).toHaveProperty("isDocumentProvided", expect.any(String));
        expect(res.body.data.reports[0]).toHaveProperty("involvedPerson", expect.any(Array));
        expect(res.body.data.reports[0]).toHaveProperty("personRole", expect.any(String));
        expect(res.body.data.reports[0]).toHaveProperty("isReported", expect.any(String));
        expect(res.body.data.reports[0]).toHaveProperty("isKeepInTouch", expect.any(String));
        expect(res.body.data.reports[0]).toHaveProperty("aboutInspectApp", expect.any(String));
        expect(res.body.data.reports[0]).toHaveProperty("status", expect.any(String));
        done();
      })
  })

  it("failed get reports cause wrong field", (done) => {
    request.get('/')
      .send({
        query: `{reports { _id UserEmail1 case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch aboutInspectApp status }}`
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toHaveProperty("errors", expect.any(Array))
        done();
      })
  })

  it("failed get reports with status 400", (done) => {
    request.get('/')
      .send({
        query: `{reports { _id UserEmail1 case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch aboutInspectApp status }}`
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(400)
        done();
      })
  })

})

// teas2 

describe("GET REPORT BY ID", () => {

  const report = { 
    case: "abuse of assets",
    entity: "Provincial Government",
    province: "SUMATERA UTARA",
    city: "KAB. TAPANULI UTARA",
    dateHappened: "2020-12-17",
    description: "adwwad",
    isDocumentProvided: "",
    involvedPerson: ["adwaw"],
    personRole: "awdawd",
    isReported: "true",
    isKeepInTouch: "true",
    aboutInspectApp: "awdawd",
    UserEmail: "testing@mail.com",
    status: "Waiting for Submission"
  }

  let idWantToDelete

  beforeEach( async () => {
      const { insertedId, result } = await db.collection("Reports").insertOne(report);
      idWantToDelete = insertedId
      return result;
  })

  afterEach( async () => {
    await db.collection('Reports').deleteOne({_id: idWantToDelete})
  })

  it("success get report by id with all property", (done) => {
    request.get('/')
      .send({
        query: `{ report(_id: "${idWantToDelete}") { _id UserEmail case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch aboutInspectApp status } }`
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.data.report).toHaveProperty("_id", expect.any(String));
        expect(res.body.data.report).toHaveProperty("UserEmail", expect.any(String));
        expect(res.body.data.report).toHaveProperty("case", expect.any(String));
        expect(res.body.data.report).toHaveProperty("entity", expect.any(String));
        expect(res.body.data.report).toHaveProperty("province", expect.any(String));
        expect(res.body.data.report).toHaveProperty("city", expect.any(String));
        expect(res.body.data.report).toHaveProperty("dateHappened", expect.any(String));
        expect(res.body.data.report).toHaveProperty("description", expect.any(String));
        expect(res.body.data.report).toHaveProperty("isDocumentProvided", expect.any(String));
        expect(res.body.data.report).toHaveProperty("involvedPerson", expect.any(Array));
        expect(res.body.data.report).toHaveProperty("personRole", expect.any(String));
        expect(res.body.data.report).toHaveProperty("isReported", expect.any(String));
        expect(res.body.data.report).toHaveProperty("isKeepInTouch", expect.any(String));
        expect(res.body.data.report).toHaveProperty("aboutInspectApp", expect.any(String));
        expect(res.body.data.report).toHaveProperty("status", expect.any(String));
        done();
      })
  })

  it("success get report by id with respone data contain property report and value object", (done) => {
    request.get('/')
      .send({
        query: `{ report(_id: "${idWantToDelete}") { _id UserEmail case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch aboutInspectApp status } }`
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.data).toHaveProperty("report", expect.any(Object));
        done();
      })
  })

  it("success get report by id with status 200", (done) => {
    request.get('/')
      .send({
        query: `{ report(_id: "${idWantToDelete}") { _id UserEmail case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch aboutInspectApp status } }`
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200);
        done();
      })
  })

  it("failed get report by id cause id dont match with any report", (done) => {
    request.get('/')
      .send({
        query: `{ report(_id: "5fd592fc4cgcfe2628ca5f12") { _id UserEmail case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch aboutInspectApp status } }`
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.data.report).toBe(null);
        done();
      })
  })

  it("failed get report by id cause unknown agrument id", (done) => {
    request.get('/')
      .send({
        query: `{ report(id: "5fd592fc4cgcfe2628ca5f12") { _id UserEmail case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch aboutInspectApp status } }`
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toHaveProperty("errors", expect.any(Array))
        done();
      })
  })

  it("failed get report by id with status 400", (done) => {
    request.get('/')
      .send({
        query: `{ report(id: "5fd592fc4cgcfe2628ca5f12") { _id UserEmail case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch aboutInspectApp status } }`
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(400)
        done();
      })
  })

})


describe("INSERT NEW REPORT", () => {

  afterEach( async () => {
    db.collection('Reports').deleteOne({ "UserEmail" : "testing@mail.com" })
  })

  it("success insert report with status 200", (done) => {
    request.post('/')
      .send({
        query: "mutation {AddReport(payload: { UserEmail: \"testing@mail.com\" case: \"corruption\" entity: \"Indonesian\" province: \"DKI Jakarta\" city: \"Jakarta Pusat\" dateHappened: \"01/01/2020\" description: \"Sri Mulyani Heran, Tunjangan PNS Naik Tapi Masih Ada 'Suap'\" isDocumentProvided: \"true\" involvedPerson: [\"Sri mulyani\"] personRole: \"manager\" isReported: \"true\" isKeepInTouch: \"true\" aboutInspectApp: \"adad\" status: \"adad\" } ) { _id UserEmail case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch  }}"
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done();
      })
  })

  it("success insert report with validate", (done) => {
    request.post('/')
      .send({
        query: "mutation {AddReport(payload: { UserEmail: \"testing@mail.com\" case: \"corruption\" entity: \"Indonesian\" province: \"DKI Jakarta\" city: \"Jakarta Pusat\" dateHappened: \"01/01/2020\" description: \"Sri Mulyani Heran, Tunjangan PNS Naik Tapi Masih Ada 'Suap'\" isDocumentProvided: \"true\" involvedPerson: [\"Sri mulyani\"] personRole: \"manager\" isReported: \"true\" isKeepInTouch: \"true\" aboutInspectApp: \"adad\" status: \"adad\" } ) { _id UserEmail case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch  }}"
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        // console.log(res.body);
        expect(res.body.data.AddReport).toHaveProperty("_id", expect.any(String));
        expect(res.body.data.AddReport).toHaveProperty("UserEmail", expect.any(String));
        expect(res.body.data.AddReport).toHaveProperty("case", expect.any(String));
        expect(res.body.data.AddReport).toHaveProperty("entity", expect.any(String));
        expect(res.body.data.AddReport).toHaveProperty("province", expect.any(String));
        expect(res.body.data.AddReport).toHaveProperty("city", expect.any(String));
        expect(res.body.data.AddReport).toHaveProperty("dateHappened", expect.any(String));
        expect(res.body.data.AddReport).toHaveProperty("description", expect.any(String));
        expect(res.body.data.AddReport).toHaveProperty("isDocumentProvided", expect.any(String));
        expect(res.body.data.AddReport).toHaveProperty("involvedPerson", expect.any(Array));
        expect(res.body.data.AddReport).toHaveProperty("personRole", expect.any(String));
        expect(res.body.data.AddReport).toHaveProperty("isReported", expect.any(String));
        expect(res.body.data.AddReport).toHaveProperty("isKeepInTouch", expect.any(String));
        done();
      })
  })

  it("success insert report with respone body contain property AddReport", (done) => {
    request.post('/')
      .send({
        query: "mutation {AddReport(payload: { UserEmail: \"testing@mail.com\" case: \"corruption\" entity: \"Indonesian\" province: \"DKI Jakarta\" city: \"Jakarta Pusat\" dateHappened: \"01/01/2020\" description: \"Sri Mulyani Heran, Tunjangan PNS Naik Tapi Masih Ada 'Suap'\" isDocumentProvided: \"true\" involvedPerson: [\"Sri mulyani\"] personRole: \"manager\" isReported: \"true\" isKeepInTouch: \"true\" aboutInspectApp: \"adad\" status: \"adad\" } ) { _id UserEmail case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch  }}"
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.data).toHaveProperty("AddReport", expect.any(Object));
        done();
      })
  })

  it("failed insert report with status 400", (done) => {
    request.post('/')
      .send({
        query: "mutation {AddReport(payload: { UserID: \"5fd4fa8a2e6d3626001d530a\" case: \"corruption\" entity: \"Indonesian\" province: \"DKI Jakarta\" city: \"Jakarta Pusat\" dateHappened: \"01/01/2020\" description: \"Sri Mulyani Heran, Tunjangan PNS Naik Tapi Masih Ada 'Suap'\" isDocumentProvided: true involvedPerson: [\"Sri mulyani\"] personRole: \"manager\" isReported: true isKeepInTouch: true } ) { _id UserId case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch }}"
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(400)
        done();
      })
  })

  it("failed insert report cause validation error", (done) => {
    request.post('/')
      .send({
        query: "mutation {AddReport(payload: { UserId: 12345678901234 case: \"corruption\" entity: \"Indonesian\" province: \"DKI Jakarta\" city: \"Jakarta Pusat\" dateHappened: \"01/01/2020\" description: \"Sri Mulyani Heran, Tunjangan PNS Naik Tapi Masih Ada 'Suap'\" isDocumentProvided: true involvedPerson: [\"Sri mulyani\"] personRole: \"manager\" isReported: true isKeepInTouch: true } ) { _id UserId case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch }}"
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toHaveProperty("errors", expect.any(Array))
        done();
      })
  })

  it("failed insert report cause required field", (done) => {
    request.post('/')
      .send({
        query: "mutation {AddReport(payload: { UserId: \"5fd4fa8a2e6d3626001d530a\" case: \"corruption\" entity: \"Indonesian\" province: \"DKI Jakarta\" city: \"Jakarta Pusat\" dateHappened: \"01/01/2020\" description: \"Sri Mulyani Heran, Tunjangan PNS Naik Tapi Masih Ada 'Suap'\" isDocumentProvided: true involvedPerson: [\"Sri mulyani\"] personRole: \"manager\" isReported: true } ) { _id UserId case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch }}"
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toHaveProperty("errors", expect.any(Array))
        done();
      })
  })

})


// describe("UPDATE REPORT", () => {

//   const report = { 
//     case: "abuse of assets",
//     entity: "Provincial Government",
//     province: "SUMATERA UTARA",
//     city: "KAB. TAPANULI UTARA",
//     dateHappened: "2020-12-17",
//     description: "adwwad",
//     isDocumentProvided: "",
//     involvedPerson: ["adwaw"],
//     personRole: "awdawd",
//     isReported: "true",
//     isKeepInTouch: "true",
//     aboutInspectApp: "awdawd",
//     UserEmail: "testing@mail.com",
//     status: "Waiting for Submission"
//   }

//   let idWantToDelete

//   beforeEach( async () => {
//       const { insertedId, result } = await db.collection("Reports").insertOne(report);
//       idWantToDelete = insertedId
//       return result;
//   })

//   afterEach( async () => {
//     await db.collection('Reports').deleteOne({_id: idWantToDelete})
//   })

//   it("success update with status 200", (done) => {
//     request.post('/')
//       .send({
//         query: `mutation {UpdateReport(_id: "${idWantToDelete}", payload:  { UserEmail: \"testing@mail.com\" case: \"corruption\" entity: \"Indonesian\" province: \"DKI Jakarta\" city: \"Jakarta Pusat\" dateHappened: \"01/01/2020\" description: \"Sri Mulyani Heran, Tunjangan PNS Naik Tapi Masih Ada 'Suap'\" isDocumentProvided: \"true\" involvedPerson: [\"Sri mulyani\"] personRole: \"manager\" isReported: \"true\" isKeepInTouch: \"true\" aboutInspectApp: \"adad\" status: \"adad\" }) { _id UserEmail case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch }}`
//       })
//       .set("Accept", "application/json")
//       .end((err, res) => {
//         if (err) return done(err)
//         expect(res.status).toBe(200)
//         done();
//       })
//   })

//   it("success update with validate data", (done) => {
//     request.post('/')
//       .send({
//         query: `mutation {UpdateReport(_id: "${idWantToDelete}", payload:  { UserEmail: \"testing@mail.com\" case: \"corruption\" entity: \"Indonesian\" province: \"DKI Jakarta\" city: \"Jakarta Pusat\" dateHappened: \"01/01/2020\" description: \"Sri Mulyani Heran, Tunjangan PNS Naik Tapi Masih Ada 'Suap'\" isDocumentProvided: \"true\" involvedPerson: [\"Sri mulyani\"] personRole: \"manager\" isReported: \"true\" isKeepInTouch: \"true\" aboutInspectApp: \"adad\" status: \"adad\" }) { _id UserEmail case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch }}`
//       })
//       .set("Accept", "application/json")
//       .end((err, res) => {
//         if (err) return done(err)
//         expect(res.body.data.UpdateReport).toHaveProperty("_id", expect.any(String));
//         expect(res.body.data.UpdateReport).toHaveProperty("UserEmail", expect.any(String));
//         expect(res.body.data.UpdateReport).toHaveProperty("case", expect.any(String));
//         expect(res.body.data.UpdateReport).toHaveProperty("entity", expect.any(String));
//         expect(res.body.data.UpdateReport).toHaveProperty("province", expect.any(String));
//         expect(res.body.data.UpdateReport).toHaveProperty("city", expect.any(String));
//         expect(res.body.data.UpdateReport).toHaveProperty("dateHappened", expect.any(String));
//         expect(res.body.data.UpdateReport).toHaveProperty("description", expect.any(String));
//         expect(res.body.data.UpdateReport).toHaveProperty("isDocumentProvided", expect.any(String));
//         expect(res.body.data.UpdateReport).toHaveProperty("involvedPerson", expect.any(Array));
//         expect(res.body.data.UpdateReport).toHaveProperty("personRole", expect.any(String));
//         expect(res.body.data.UpdateReport).toHaveProperty("isReported", expect.any(String));
//         expect(res.body.data.UpdateReport).toHaveProperty("isKeepInTouch", expect.any(String));
//         done();
//       })
//   })

//   // it("success update with have property UpdateReport", (done) => {
//   //   request.post('/')
//   //     .send({
//   //       query: `mutation {UpdateReport(_id: "${idWantToDelete}", payload: { UserId: \"5fd48f090d4d182be806709c\" case: \"corruption\" entity: \"Indonesian\" province: \"DKI Jakarta\" city: \"Jakarta Pusat\" dateHappened: \"01/01/2020\" description: \"survei TII: 3 dari 10 Responden Bayar Suap Pelayanan Publik\" isDocumentProvided: true involvedPerson: [\"Sri mulyani\"] personRole: \"manager\" isReported: true isKeepInTouch: true }) { _id UserId case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch }}`
//   //     })
//   //     .set("Accept", "application/json")
//   //     .end((err, res) => {
//   //       if (err) return done(err)
//   //       expect(res.body.data).toHaveProperty("UpdateReport", expect.any(Object));
//   //       done();
//   //     })
//   // })

//   // it("failed update cause _id dont match with any report", (done) => {
//   //   request.post('/')
//   //     .send({
//   //       query: "mutation {UpdateReport(_id: \"5fd5b72cca4ca23b58071d2a\", payload: { UserId: \"5fd48f090d4d182be806709c\" case: \"corruption\" entity: \"Indonesian\" province: \"DKI Jakarta\" city: \"Jakarta Pusat\" dateHappened: \"01/01/2020\" description: \"survei TII: 3 dari 10 Responden Bayar Suap Pelayanan Publik\" isDocumentProvided: true involvedPerson: [\"Sri mulyani\"] personRole: \"manager\" isReported: true isKeepInTouch: true }) { _id UserId case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch }}"
//   //     })
//   //     .set("Accept", "application/json")
//   //     .end((err, res) => {
//   //       if (err) return done(err)
//   //       expect(res.body.data.UpdateReport).toBe(null);
//   //       done();
//   //     })
//   // })

//   // it("failed update cause validation error", (done) => {
//   //   request.post('/')
//   //     .send({
//   //       query: "mutation {UpdateReport(_id: \"5fd5b72cca4ca24b78071d2a\", payload: { UserId: \"5fd48f090d4d182be806709c\" case: 123456 entity: \"Indonesian\" province: \"DKI Jakarta\" city: \"Jakarta Pusat\" dateHappened: \"01/01/2020\" description: \"survei TII: 3 dari 10 Responden Bayar Suap Pelayanan Publik\" isDocumentProvided: true involvedPerson: [\"Sri mulyani\"] personRole: \"manager\" isReported: true isKeepInTouch: true }) { _id UserId case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch }}"
//   //     })
//   //     .set("Accept", "application/json")
//   //     .end((err, res) => {
//   //       if (err) return done(err)
//   //       expect(res.body).toHaveProperty("errors", expect.any(Array))
//   //       done();
//   //     })
//   // })
  
//   // it("failed update with status 400", (done) => {
//   //   request.post('/')
//   //     .send({
//   //       query: "mutation {UpdateReport(_id: \"5fd5b72cca4ca24b78071d2a\", payload: { UserId: \"5fd48f090d4d182be806709c\" case: 123456 entity: \"Indonesian\" province: \"DKI Jakarta\" city: \"Jakarta Pusat\" dateHappened: \"01/01/2020\" description: \"survei TII: 3 dari 10 Responden Bayar Suap Pelayanan Publik\" isDocumentProvided: true involvedPerson: [\"Sri mulyani\"] personRole: \"manager\" isReported: true isKeepInTouch: true }) { _id UserId case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch }}"
//   //     })
//   //     .set("Accept", "application/json")
//   //     .end((err, res) => {
//   //       if (err) return done(err)
//   //       expect(res.status).toBe(400)
//   //       done();
//   //     })
//   // })

// })

describe("DELETE REPORT", () => {

  const report = { 
    case: "abuse of assets",
    entity: "Provincial Government",
    province: "SUMATERA UTARA",
    city: "KAB. TAPANULI UTARA",
    dateHappened: "2020-12-17",
    description: "adwwad",
    isDocumentProvided: "",
    involvedPerson: ["adwaw"],
    personRole: "awdawd",
    isReported: "true",
    isKeepInTouch: "true",
    aboutInspectApp: "awdawd",
    UserEmail: "testing@mail.com",
    status: "Waiting for Submission"
  }

  let idWantToDelete

  beforeEach( async () => {
      const { insertedId, result } = await db.collection("Reports").insertOne(report);
      idWantToDelete = insertedId
      return result;
  })

  it("success delete report with status 200", (done) => {
    request.post('/')
      .send({
        query: `mutation {DeleteReport(_id: "${idWantToDelete}") { _id UserEmail case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch }}`
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done();
      })
  })

  it("success delete report with valid data", (done) => {
    request.post('/')
      .send({
        query: `mutation {DeleteReport(_id: "${idWantToDelete}") { _id UserEmail case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch }}`
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.data.DeleteReport).toHaveProperty("_id", expect.any(String));
        expect(res.body.data.DeleteReport).toHaveProperty("UserEmail", expect.any(String));
        expect(res.body.data.DeleteReport).toHaveProperty("case", expect.any(String));
        expect(res.body.data.DeleteReport).toHaveProperty("entity", expect.any(String));
        expect(res.body.data.DeleteReport).toHaveProperty("province", expect.any(String));
        expect(res.body.data.DeleteReport).toHaveProperty("city", expect.any(String));
        expect(res.body.data.DeleteReport).toHaveProperty("dateHappened", expect.any(String));
        expect(res.body.data.DeleteReport).toHaveProperty("description", expect.any(String));
        expect(res.body.data.DeleteReport).toHaveProperty("isDocumentProvided", expect.any(String));
        expect(res.body.data.DeleteReport).toHaveProperty("involvedPerson", expect.any(Array));
        expect(res.body.data.DeleteReport).toHaveProperty("personRole", expect.any(String));
        expect(res.body.data.DeleteReport).toHaveProperty("isReported", expect.any(String));
        expect(res.body.data.DeleteReport).toHaveProperty("isKeepInTouch", expect.any(String));
        done();
      })
  })

  it("success delete report with get property DeleteReport", (done) => {
    request.post('/')
      .send({
        query: `mutation {DeleteReport(_id: "${idWantToDelete}") { _id UserEmail case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch }}`
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.data).toHaveProperty("DeleteReport", expect.any(Object));
        done();
      })
  })

  it("failed delete cause id dont match with any report", (done) => {
    request.post('/')
      .send({
        query: `mutation {DeleteReport(_id: "5fd5b75753ffd64b788d0dee") { _id UserEmail case entity province city dateHappened description isDocumentProvided involvedPerson personRole isReported isKeepInTouch }}`
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.data.DeleteReport).toBe(null)
        done();
      })
  })

})
